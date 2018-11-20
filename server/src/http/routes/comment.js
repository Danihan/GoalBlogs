const express = require('express')

module.exports = function commentRoutes ({ middlewares: { guarded } }) {
  const app = new express.Router()

  return app
}
