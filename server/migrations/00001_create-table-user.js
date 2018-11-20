
exports.up = async function (/** @type {import('knex')} */ knex) {
  return knex.schema.createTable('user', function (table) {
    table.increments()
    table.string('email')
    table.string('password')
    table.timestamps(true, true)
  })
}

exports.down = async function (/** @type {import('knex')} */ knex) {
  return knex.schema.dropTable('user')
}
