const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const routes = require('./routes')

module.exports = async function http () {
  return new Promise((resolve, reject) => {
    const app = express()

    app.use(cors())
    app.use(helmet())

    app.use(bodyParser.json())

    app.use(routes())

    const httpPort = process.env.HTTP_PORT || 8080
    app.listen(httpPort, resolve)
  })
}
