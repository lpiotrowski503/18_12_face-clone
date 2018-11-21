import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import * as config from 'config'
// ────────────────────────────────────────────────────────────────────────────────
import async from './async'
// ────────────────────────────────────────────────────────────────────────────────

class Auth {
  private token
  private decoded

  public auth() {
    return async(
      (req: Request, res: Response, next: NextFunction) => {
        this.token = req.header('x-auth-token')
        this.decoded = jwt.verify(this.token, config.get('jwtPrivateKey'))

        // TODO remove password from req.body.user.password with lodash
        req.body.user = this.decoded.data
        req.body.user.password = undefined
        next()
      },
      (err, req: Request, res: Response) => {
        res.status(400).json({ invalidToken: true })
      }
    )
  }
}
export default new Auth().auth()
