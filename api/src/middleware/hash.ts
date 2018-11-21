import * as bcrypt from 'bcryptjs'

class Hash {
  public hashingPassword() {
    return async password => {
      return await bcrypt.hash(password, await bcrypt.genSalt(10))
    }
  }
}

export default new Hash().hashingPassword()
