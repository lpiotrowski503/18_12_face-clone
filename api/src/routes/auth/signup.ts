import * as express from 'express'
import { Request, Response } from 'express'
import { User } from '../../models/user'
import async from '../../middleware/async'
import validate from '../../middleware/validate'
import hash from '../../middleware/hash'
//
// ────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: R E G I S T E R   U S E R   C O N T R O L E R : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────
//
class Signup {
  private router = express.Router()
  private user

  private async createUserModel(user) {
    this.user = new User(user)
    this.user.password = await hash(this.user.password)
  }

  private async saveUser() {
    await this.user.save()
  }

  private dbErrorHandler(error) {
    if ((error.name = 'MongoError' && error.code === 11000))
      error.message = 'The user already exist'
  }

  public controller() {
    return this.router.post(
      '/',
      async(
        async (req: Request, res: Response) => {
          validate(req.body)
          await this.createUserModel(req.body)
          await this.saveUser()
          res.json({ signup: true })
        },
        (error, req: Request, res: Response) => {
          this.dbErrorHandler(error)
          res.status(400).json({ error: error.message })
        }
      )
    )
  }
}

export default new Signup().controller()
