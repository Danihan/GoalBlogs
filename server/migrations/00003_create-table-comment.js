
exports.up = async function (/** @type {import('knex')} */ knex) {
  return knex.schema.createTable('comment', function (table) {
    table.increments()
    table.integer('userId').unsigned().notNullable().references('user.id')
    table.integer('postId').unsigned().notNullable().references('post.id')
    table.string('content')
    table.timestamps(true, true)
  })
}

exports.down = async function (/** @type {import('knex')} */ knex) {
  return knex.schema.dropTable('comment')
}
