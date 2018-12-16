const express = require('express')

module.exports = function dashboardRoutes ({ postController, middlewares: { paramPostHandle: middlewareParamPostHandle } }) {
  const app = new express.Router()

  app.get('/posts', async (req, res) => {
    const posts = await postController.listPostsForEditing(req.user)

    res.json({ success: true, data: posts })
  })

  return app
}
