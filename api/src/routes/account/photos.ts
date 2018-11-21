import * as express from 'express'
import { Request, Response } from 'express'
// ────────────────────────────────────────────────────────────────────────────────
import auth from '../../middleware/auth'
//
// ────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: A C C O U N T   P H O T O S   C O N T R O L L E R : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────
//
class Photos {
  private router = express.Router()

  public controller() {
    this.router.get('/', auth, async (req: Request, res: Response) => {
      res.json({ photos: true })
    })

    return this.router
  }
}

export default new Photos().controller()
