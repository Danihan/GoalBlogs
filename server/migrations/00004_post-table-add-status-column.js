
exports.up = async function (/** @type {import('knex')} */ knex) {
  return knex.schema.alterTable('post', function (table) {
    table.enum('status', ['draft', 'published']).notNullable().defaultTo('draft')
  })
}

exports.down = async function (/** @type {import('knex')} */ knex) {
  return knex.schema.alterTable('post', function (table) {
    table.dropColumn('status')
  })
}
