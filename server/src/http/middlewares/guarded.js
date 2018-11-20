module.exports = function middlewareGuardedCreator () {
  return async function middlewareGuarded (req, res, next) {
    if (!req.user) {
      res.status(403).json({ message: 'Forbidden' })
      return
    }

    next()
  }
}
