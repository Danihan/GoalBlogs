require('dotenv').load()

module.exports = {
  client: 'pg',

  connection: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 5432,
    database: process.env.DATABASE_DB,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
  },

  pool: {
    min: 2,
    max: 10
  },

  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations'
  },

  asyncStackTraces: true
}
