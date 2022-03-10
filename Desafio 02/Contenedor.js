const fs = require("fs")

module.exports = class Contenedor {

  constructor(fileName) {
    this.fileName = fileName;
  }

  save = async (item) => {
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
      const id = initialData.length === 0 ? 1 : initialData[initialData.length - 1].id + 1

      initialData.push({ ...item, id })

      await fs.promises.writeFile(this.fileName, JSON.stringify(initialData))

      return id;
    }
    catch (err) {
      throw new Error(err)
    }
  }

  getById = async (providedId) => {
    try {
      const fileData = await fs.promises.readFile(this.fileName, 'utf-8')
      const parsedData = JSON.parse(fileData)

      const foundItem = parsedData.find(item => item.id === providedId)
      return foundItem ? foundItem : null
    }
    catch (err) {
      console.log(err)
    }
  }

  getAll = async () => {
    try {
      const fileData = await fs.promises.readFile(this.fileName, 'utf-8')
      const parsedData = JSON.parse(fileData)

      return parsedData
    }
    catch (err) {
      console.log(err)
    }
  }

  deleteById = async (providedId) => {
    try {
      const fileData = await fs.promises.readFile(this.fileName, 'utf-8')
      const parsedData = JSON.parse(fileData)

      const filteredData = parsedData.filter(item => item.id !== providedId)

      await fs.promises.writeFile(this.fileName, JSON.stringify(filteredData))
    }
    catch (err) {
      console.log(err)
    }
  }

  deleteAll = async () => {
    try {
      await fs.promises.writeFile(this.fileName, "[]")
    }
    catch (err) {
      console.log(err)
    }
  }

}