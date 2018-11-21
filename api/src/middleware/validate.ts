class Validate {
  public regExEmail = /^([a-z\d.-_]+)@([a-z\d-_]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/

  public validate() {
    return user => {
      if (!user) throw new Error('No user Data')
      if (!this.regExEmail.test(user.email)) throw new Error('wrong email')
      if (!user.password) throw new Error('wrong password')
      if (user.password !== user.confirmPassword)
        throw new Error('passwords aren`t the same')
    }
  }
}

export default new Validate().validate()
