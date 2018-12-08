const Repository = require('./base')

class PostRepository extends Repository {
  constructor ({ db }) {
    super({ db, table: 'post' })
  }

  async getLatestPublishedPosts () {
    return this._db.table(this._table).select('*').where({ status: 'published' }).orderBy('publishedAt', 'DESC')
  }
}

module.exports = PostRepository
