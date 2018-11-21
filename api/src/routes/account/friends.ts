import * as express from 'express'
import { Request, Response } from 'express'
import auth from '../../middleware/auth'
//
// ──────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: A C C O U N T   F R I E N D S   C O N T R O L L E R : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────────────
//
class Friends {
  router = express.Router()

  controller() {
    this.router.get('/', auth, async (req: Request, res: Response) => {
      res.json({
        friends: req.body
      })
    })
    return this.router
  }
}

export default new Friends().controller()
