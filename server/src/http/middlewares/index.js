const authJwt = require('./auth-jwt')
const guarded = require('./guarded')
const paramPostHandle = require('./param-post-handle')

module.exports = {
  authJwt,
  guarded,
  paramPostHandle
}
