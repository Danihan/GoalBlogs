const express = require('express')

module.exports = function commentRoutes ({ commentController, middlewares: { guarded } }) {
  const app = new express.Router()

  app.put('/', async (req, res) => {
    const { user } = req
    const { postId, postSlug, content } = req.body

    const data = await commentController.createComment(user, postId, postSlug, content)

    res.json({ success: true, data })
  })

  return app
}
