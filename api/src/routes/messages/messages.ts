import * as express from 'express'
import { Request, Response } from 'express'

class Messages {
  router = express.Router()

  controller() {
    this.router.get('/', async (req: Request, res: Response) => {
      const response = await Promise.resolve('messages')
      res.send(response)
    })

    this.router.get('/:id', async (req: Request, res: Response) => {
      const response = await Promise.resolve(req.params.id + ' - message')
      res.send(response)
    })

    return this.router
  }
}

export default new Messages().controller()
