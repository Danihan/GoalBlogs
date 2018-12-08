const express = require('express')

module.exports = function postRoutes ({ postService }) {
  const app = new express.Router()

  app.put('/', async (req, res) => {
    const { title, content, status } = req.body

    const data = await postService.createPost(req.user, title, content, status)

    res.json({ success: true, data })
  })

  app.get('/', async (req, res) => {
    const data = await postService.listPosts()

    res.json({ success: true, data })
  })

  app.get('/:postHandle', async (req, res) => {
    const split = req.params.postHandle.split('-')
    const id = split.pop()
    const slug = split.join('-')

    const data = await postService.viewPost(slug, id)

    res.json({ success: true, data })
  })

  app.get('/:postHandle/edit', async (req, res) => {
    const split = req.params.postHandle.split('-')
    const id = split.pop()
    const slug = split.join('-')

    const data = await postService.getPostForEditing(slug, id)
    res.json({ success: true, data })
  })

  app.put('/:postHandle/edit', async (req, res) => {
    const split = req.params.postHandle.split('-')
    const id = split.pop()
    const slug = split.join('-')

    const { title, content, status } = req.body

    const data = await postService.updatePost(req.user, slug, id, title, content, status)

    res.json({ success: true, data })
  })

  return app
}
