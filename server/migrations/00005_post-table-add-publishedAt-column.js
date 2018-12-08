
exports.up = async function (/** @type {import('knex')} */ knex) {
  return knex.schema.alterTable('post', function (table) {
    table.timestamp('publishedAt').nullable()
  })
}

exports.down = async function (/** @type {import('knex')} */ knex) {
  return knex.schema.alterTable('post', function (table) {
    table.dropColumn('publishedAt')
  })
}
