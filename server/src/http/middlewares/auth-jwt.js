module.exports = function middlewareAuthJwtCreator ({ authService }) {
  return async function middlewareAuthJwt (req, res, next) {
    req.user = null

    const authorizationHeader = req.header('Authorization')

    if (authorizationHeader) {
      const authorizationHeaderSplit = authorizationHeader.split('Bearer ', 2)

      if (authorizationHeaderSplit.length === 2) {
        const jwtToken = authorizationHeaderSplit[1]

        const user = await authService.verifyToken(jwtToken)
        req.user = user
      }
    }

    next()
  }
}
