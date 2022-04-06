const { sqlite3Options } = require('../options/sqlite3')

module.exports = class Messages {

  async save(message) {
    const knex = require('knex')(sqlite3Options)
    try {
      const inserted = await knex("mensajes")
        .insert({ mail: message.mail, timestamp: message.timestamp, text: message.text })
      knex.destroy()
    }
    catch (err) {
      throw new Error(err.message)
    }
  }

  async getAll() {
    const knex = require('knex')(sqlite3Options)
    try {
      const allMessages = await knex.from("mensajes").select("*")
      knex.destroy()
      return allMessages
    }
    catch (err) {
      throw new Error(err.message)
    }
  }

}