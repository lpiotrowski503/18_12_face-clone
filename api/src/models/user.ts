import * as mongoose from 'mongoose'

class UserModel {
  private userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    nick: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    friends: {
      type: Array,
      default: []
    }
  })

  public user = mongoose.model('User', this.userSchema)
}
export const User = new UserModel().user
