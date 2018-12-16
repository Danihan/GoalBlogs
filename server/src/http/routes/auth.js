const express = require('express')

module.exports = function authRoutes ({ authService }) {
  const app = new express.Router()

  app.post('/login/email', async (req, res) => {
    const { email, password } = req.body

    if (email && password) {
      const token = await authService.loginWithEmailAndPassword({ email, password })

      if (token) {
        res.json({
          success: true,
          token
        })
      }
    }

    res.json({ success: false })
  })

  app.post('/register/email', async (req, res) => {
    const { email, password } = req.body

    if (email && password) {
      const result = await authService.registerWithEmailAndPassword({ email, password })

      return res.json({ success: result })
    }

    res.json({ success: false })
  })

  return app
}
