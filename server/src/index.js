const initDb = require('./db')
const initHttp = require('./http')

const UserRepository = require('./repositories/user')
const CommentRepository = require('./repositories/comment')
const PostRepository = require('./repositories/post')

const AuthService = require('./services/auth')
const UserService = require('./services/user')
const CommentService = require('./services/comment')
const PostService = require('./services/post')

async function main () {
  const db = await initDb()

  const userRepo = new UserRepository({ db })
  const commentRepo = new CommentRepository({ db })
  const postRepo = new PostRepository({ db })

  const authService = new AuthService({ userRepo, secret: 'REPLACEME' })
  const userService = new UserService({ userRepo })
  const postService = new PostService({ postRepo })
  const commentService = new CommentService({ commentRepo })

  const http = await initHttp({ authService, userService, postService, commentService })

  return {
    db,
    http
  }
}

module.exports = main
