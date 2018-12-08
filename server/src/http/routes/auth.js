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

  return app
}
