module.exports = function middlewareParamPostHandleCreator () {
  return async function middlewareParamPostHandle (req, res, next, postHandle) {
    req.params.postHandle = { raw: postHandle }

    if (typeof postHandle !== 'string' || postHandle.length === 0) {
      return next()
    }

    const split = postHandle.split('-')

    if (split.length < 2) {
      return next()
    }

    const id = split.pop()
    const slug = split.join('-')

    req.params.postHandle.id = id
    req.params.postHandle.slug = slug

    next()
  }
}
