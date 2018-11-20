class Repository {
  constructor ({ db, table }) {
    /** @type {import('knex')} */
    this._db = db
    this._table = table
  }

  async find (where) {
    return this._db.table(this._table).select('*').where(where)
  }

  async findOne (where) {
    return this._db.table(this._table).select('*').where(where).first()
  }

  async findById (id) {
    return this.findOne({ id })
  }

  async insert (data, returning = 'id') {
    return this._db.table(this._table).returning(returning).insert(data)
  }

  async update (where, data) {
    return this._db.table(this._table).where(where).update(data)
  }

  async updateById (id, data) {
    return this.update({ id }, data)
  }

  async delete (where) {
    return this._db.table(this._table).where(where).delete()
  }

  async deleteById (id) {
    return this.delete({ id })
  }
}

module.exports = Repository
