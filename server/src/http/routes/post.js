const express = require('express')

module.exports = function postRoutes ({ postController, middlewares: { paramPostHandle: middlewareParamPostHandle } }) {
  const app = new express.Router()

  app.param('postHandle', middlewareParamPostHandle())

  app.put('/', async (req, res) => {
    const { title, content, status } = req.body

    const data = await postController.createPost(req.user, title, content, status)

    res.json({ success: true, data })
  })

  app.get('/', async (req, res) => {
    const data = await postController.listPosts()

    res.json({ success: true, data })
  })

  app.get('/:postHandle', async (req, res) => {
    const { id, slug } = req.params.postHandle

    if (!id || !slug) {
      return res.json({ success: false })
    }

    const data = await postController.viewPost(id, slug)

    res.json({ success: true, data })
  })

  app.get('/:postHandle/edit', async (req, res) => {
    const { id, slug } = req.params.postHandle

    if (!id || !slug) {
      return res.json({ success: false })
    }

    const data = await postController.getPostForEditing(req.user, id, slug)

    res.json({ success: true, data })
  })

  app.put('/:postHandle/edit', async (req, res) => {
    const { id, slug } = req.params.postHandle

    if (!id || !slug) {
      return res.json({ success: false })
    }

    const { title, content, status } = req.body
    const data = await postController.updatePost(req.user, id, slug, title, content, status)

    res.json({ success: true, data })
  })

  return app
}
