const Repository = require('./base')

class PostRepository extends Repository {
  constructor ({ db }) {
    super({ db, table: 'post' })
  }
}

module.exports = PostRepository
