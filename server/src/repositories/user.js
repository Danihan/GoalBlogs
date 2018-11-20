const Repository = require('./base')

class UserRepository extends Repository {
  constructor ({ db }) {
    super({ db, table: 'user' })
  }
}

module.exports = UserRepository
