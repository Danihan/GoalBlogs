
exports.up = async function (/** @type {import('knex')} */ knex) {
  return knex.schema.createTable('post', function (table) {
    table.increments()
    table.integer('userId').unsigned().notNullable().references('user.id')
    table.string('title')
    table.string('slug')
    table.text('content')
    table.timestamps(true, true)
  })
}

exports.down = async function (/** @type {import('knex')} */ knex) {
  return knex.schema.dropTable('post')
}
