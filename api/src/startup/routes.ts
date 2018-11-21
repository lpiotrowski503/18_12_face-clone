import * as path from 'path'
import { Request, Response } from 'express'
// ────────────────────────────────────────────────────────────────────────────────
import dashboard from '../routes/dashboard/dashboard'
import about from '../routes/account/about'
import friends from '../routes/account/friends'
import photos from '../routes/account/photos'
import messages from '../routes/messages/messages'
import login from '../routes/auth/login'
import signup from '../routes/auth/signup'

class Routes {
  routes(app) {
    app.use('/api/dashboard', dashboard)
    app.use('/api/account/about', about)
    app.use('/api/account/friends', friends)
    app.use('/api/account/photos', photos)
    app.use('/api/messages', messages)
    app.use('/api/auth/login', login)
    app.use('/api/auth/signup', signup)
    app.use('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../../public/index.html'))
    })
  }
}

export default new Routes().routes
