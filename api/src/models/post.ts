import * as mongoose from 'mongoose'

class PostModel {
  private postSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    article: {
      type: String,
      required: true
    },
    author: {
      type: Object,
      required: true
    },
    editable: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    }
  })

  public post = mongoose.model('Post', this.postSchema)
}
export const Post = new PostModel().post
