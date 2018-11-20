const Repository = require('./base')

class CommentRepository extends Repository {
  constructor ({ db }) {
    super({ db, table: 'comment' })
  }
}

module.exports = CommentRepository
