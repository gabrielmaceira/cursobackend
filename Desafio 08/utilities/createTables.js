const { mariaDBOptions } = require('../options/mariaDB')
const knexMariaDB = require('knex')(mariaDBOptions)

const { sqlite3Options } = require('../options/sqlite3')
const knexSqlite3 = require('knex')(sqlite3Options)

knexMariaDB.schema.createTable("productos", table => {
    table.increments('id')
    table.string("title", 50)
    table.float('price')
    table.string('thumbnail', 255)
})
    .then(() => "Table productos created successfully")
    .catch(err => { console.log(err); throw err })
    .finally(() => knexMariaDB.destroy())

knexSqlite3.schema.createTable("mensajes", table => {
    table.increments('id')
    table.string("mail", 255)
    table.timestamp('timestamp')
    table.string('text', 255)
})
    .then(() => "Table mensajes created successfully")
    .catch(err => { console.log(err); throw err })
    .finally(() => knexMariaDB.destroy())