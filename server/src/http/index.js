const express = require('express')
const middlewares = require('./middlewares')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const routes = require('./routes')

module.exports = async function http ({ authService, userService, postService, commentService }) {
  return new Promise((resolve, reject) => {
    const app = express()

    if (process.env.SIMULATED_LAG_IN_MS) {
      const lagInMs = parseInt(process.env.SIMULATED_LAG_IN_MS)

      if (lagInMs < 1) {
        console.error(`SIMULATED_LAG_IN_MS must be over 0ms (got ${lagInMs})`)
        process.exit(1)
      }

      app.use((req, res, next) => {
        setTimeout(next, lagInMs)
      })
    }

    app.use(cors())
    app.use(helmet())

    app.use(bodyParser.json())

    app.use(middlewares.authJwt({ authService }))

    app.use(routes({ authService, userService, postService, commentService, middlewares }))

    const httpPort = process.env.HTTP_PORT || 8080
    app.listen(httpPort, resolve)
  })
}
