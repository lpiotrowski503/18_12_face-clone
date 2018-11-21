import * as express from 'express'
import auth from '../../middleware/auth'
import async from '../../middleware/async'
import { Request, Response } from 'express'
import { Post } from '../../models/post'
//
// ──────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: D A S H B O A R D   C O N T R O L L E R : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────
//
class Dashboard {
  private router = express.Router()
  private post
  private posts

  private validatePostData(post) {
    if (!post) throw new Error('No post Data')
    if (!post.title) throw new Error('No post title')
    if (!post.article) throw new Error('No post article')
    if (!post.user.nick) throw new Error('No post author')
  }

  private createPostModel(post) {
    this.post = new Post(post)
  }

  private async savePost() {
    await this.post.save()
  }

  private async editPost(id, post) {
    await Post.findByIdAndUpdate(id, {
      title: post.title,
      article: post.article
    })
  }

  private async removePost(id) {
    await Post.findByIdAndRemove(id)
  }

  private async getPosts() {
    this.posts = await Post.find({}).sort({ date: -1 })
  }

  private editRequest(user) {
    this.posts.forEach(post => {
      if (post.author._id === user._id) post.editable = true
      post.author = post.author.nick
    })
  }

  public controller() {
    this.router.get(
      '/posts',
      auth,
      async(
        async (req: Request, res: Response) => {
          await this.getPosts()
          this.editRequest(req.body.user)
          res.json({ posts: this.posts })
        },
        (error, req: Request, res: Response) => {
          res.status(400).json({ error: error.message })
        }
      )
    )

    this.router.post(
      '/post',
      auth,
      async(
        async (req: Request, res: Response) => {
          this.validatePostData(req.body)
          this.createPostModel({
            title: req.body.title,
            article: req.body.article,
            author: {
              _id: req.body.user._id,
              nick: req.body.user.nick
            }
          })
          await this.savePost()
          res.json({ post: true })
        },
        (error, req: Request, res: Response) => {
          res.status(400).json({ error: error.message })
        }
      )
    )

    this.router.put(
      '/post/:id',
      auth,
      async(
        async (req: Request, res: Response) => {
          await this.editPost(req.params.id, req.body)
          res.json({ post: true })
        },
        (error, req: Request, res: Response) => {
          res.status(400).json({ error: error.message })
        }
      )
    )

    this.router.delete(
      '/post/:id',
      auth,
      async(
        async (req: Request, res: Response) => {
          await this.removePost(req.params.id)
          res.json({ post: true })
        },
        (error, req: Request, res: Response) => {
          res.status(400).json({ error: error.message })
        }
      )
    )
    return this.router
  }
}

export default new Dashboard().controller()
