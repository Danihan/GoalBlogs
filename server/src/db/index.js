const knex = require('knex')
const knexConfig = require('../../knexfile')

module.exports = async function db (config = knexConfig) {
  const db = knex(knexConfig)

  await db.raw('SELECT 1')

  return db
}
