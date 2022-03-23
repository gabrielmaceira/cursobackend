const fs = require("fs")

module.exports = class Messages {

  constructor(fileName) {
    this.fileName = fileName;
  }

  async save(message) {
    let initialData = [];

    try {
      const fileData = await fs.promises.readFile(this.fileName, 'utf-8')
      try {
        initialData = JSON.parse(fileData)
      }
      catch (err) {
        console.log(err)
        console.log("The file has incorrect data - starting over")
        try {
          await fs.promises.writeFile(`${this.fileName}.bak`, fileData)
          console.log("Backup file saved")
        }
        catch (err) {
          console.log(err)
        }
      }
    }
    catch (err) {
      console.log(err)
    }

    try {
      initialData.push({ mail: message.mail, timestamp: message.timestamp, text: message.text })
      await fs.promises.writeFile(this.fileName, JSON.stringify(initialData))
    }
    catch (err) {
      throw new Error(err)
    }
  }

  async getAll() {
    try {
      const fileData = await fs.promises.readFile(this.fileName, 'utf-8')
      const parsedData = JSON.parse(fileData)

      return parsedData
    }
    catch (err) {
      console.log(err)
    }
  }

}