import * as jwt from 'jsonwebtoken'
import * as config from 'config'

class Jwt {
  public createToken() {
    return user => {
      return jwt.sign({ data: user }, config.get('jwtPrivateKey'), {
        expiresIn: '2h'
      })
    }
  }
}

export default new Jwt().createToken()
