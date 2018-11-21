import * as express from 'express'
import { Request, Response } from 'express'
import auth from '../../middleware/auth'
import async from '../../middleware/async'
import validate from '../../middleware/validate'
import jwt from '../../middleware/jwt'
import hash from '../../middleware/hash'
import { User } from '../../models/user'
//
// ──────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: A C C O U N T   A B O U T   C O N T R O L L E R : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────────
//
class About {
  private router = express.Router()
  private user

  private async createUser(id, user) {
    this.user = user
    this.user.user = undefined
    this.user.confirmPassword = undefined
    this.user._id = id
    this.user.password = await hash(this.user.password)
  }

  private async updateAccount(data) {
    await User.findByIdAndUpdate(data._id, data)
  }

  public controller() {
    this.router.get(
      '/',
      auth,
      async(
        async (req: Request, res: Response) => {
          req.body.user.friends = undefined
          res.json({
            about: {
              user: req.body.user
            }
          })
        },
        (error, req: Request, res: Response) => {
          res.status(400).json({ error: error.message })
        }
      )
    )

    this.router.put(
      '/:id',
      auth,
      async(
        async (req: Request, res: Response) => {
          validate(req.body)
          await this.createUser(req.params.id, req.body)
          await this.updateAccount(req.body)
          res.json({ token: jwt(this.user) })
        },
        (error, req: Request, res: Response) => {
          res.status(400).json({ error: error.message })
        }
      )
    )
    return this.router
  }
}

export default new About().controller()
