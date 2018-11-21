import * as express from 'express'
import * as bcrypt from 'bcryptjs'
import * as nodemailer from 'nodemailer'
import jwt from '../../middleware/jwt'
import async from '../../middleware/async'
import auth from '../../middleware/auth'
import hash from '../../middleware/hash'
import { Request, Response } from 'express'
import { User } from '../../models/user'
//
// ──────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: L O G G I N G   U S E R   C O N T R O L E R : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────
//
class Login {
  private router = express.Router()
  private user
  private isMatch

  private async findUserByEmail(email) {
    this.user = await User.findOne({
      email: email
    })
    if (!this.user) throw new Error('The user doesn`t exist')
  }

  private async comparePassword(password, hashPassword) {
    this.isMatch = await bcrypt.compare(password, hashPassword)
    if (!this.isMatch) throw new Error('Wrong password')
  }

  private mailBody() {
    return `<html lang="pl">
              <head>
                  <meta charset="UTF-8">
              </head>
              <body>
                <h2>Witaj ${this.user.nick}</h2>
                <h5>Aby zresetować hasło naciśni na 
                  <span>
                    <a href = 'https://faceclone.herokuapp.com/auth/login?token=${jwt(
                      this.user
                    )}'>
                    link
                    </a>
                  </span>
                </h3>
              </body>
            </html>`
  }

  private transporter() {
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'faceclone503@gmail.com',
        pass: 'face503clone'
      }
    })
  }

  private mailOptions() {
    return {
      from: '"Faceclone" <faceclone503@gmail.com>',
      to: this.user.email,
      subject: 'Nowe Hasło',
      text: 'text',
      html: this.mailBody()
    }
  }

  private async sendMail() {
    await this.transporter().sendMail(this.mailOptions())
  }

  private async reset(id, password) {
    await User.findByIdAndUpdate(id, {
      password: await hash(password)
    })
  }

  public controller() {
    this.router.post(
      '/',
      async(
        async (req: Request, res: Response) => {
          await this.findUserByEmail(req.body.email)
          await this.comparePassword(req.body.password, this.user.password)
          res.json({ token: jwt(this.user) })
        },
        (error, req: Request, res: Response) => {
          res.status(400).json({ error: error.message })
        }
      )
    )
    this.router.post(
      '/forget',
      async(
        async (req: Request, res: Response) => {
          await this.findUserByEmail(req.body.email)
          await this.sendMail()
          res.json({ forget: req.body })
        },
        (error, req: Request, res: Response) => {
          res.status(400).json({
            response: {
              error: error.message,
              forget: req.body
            }
          })
          // res.status(400).json({ error: error.message })
        }
      )
    )

    this.router.get(
      '/forget/:token',
      auth,
      async(
        async (req: Request, res: Response) => {
          console.log(req.body)
          res.json({
            _id: req.body.user._id
          })
        },
        (error, req: Request, res: Response) => {
          res.status(400).json({ error: error.message })
        }
      )
    )

    this.router.put(
      '/forget/:id',
      async(
        async (req: Request, res: Response) => {
          await this.reset(req.params.id, req.body.password)
          res.json({
            reset: {
              id: req.params.id,
              password: req.body.password
            }
          })
        },
        (error, req: Request, res: Response) => {
          res.status(400).json({ error: error.message })
        }
      )
    )

    return this.router
  }
}

export default new Login().controller()
