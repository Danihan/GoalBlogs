const express = require('express')
const authRoutes = require('./auth')
const commentRoutes = require('./comment')
const postRoutes = require('./post')

module.exports = function routes ({ authService, commentService, commentController, postService, userService, postController, middlewares }) {
  const app = new express.Router()

  app.use('/auth', authRoutes({ authService, middlewares }))
  app.use('/comment', commentRoutes({ commentService, commentController, middlewares }))
  app.use('/post', postRoutes({ postService, postController, middlewares }))

  return app
}
