const fs = require("fs")
const Contenedor = require('./Contenedor')

const tests = async () => {
    console.log("****** TESTS ******")

    const miCOntainer = new Contenedor("./productos.txt")

    console.log("****** SAVE ******")
    console.log(await miCOntainer.save({
        title: 'Escuadra',
        price: 123.45,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
    }))
    console.log(await miCOntainer.save({
        title: 'Calculadora',
        price: 234.56,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
    }))
    console.log(await miCOntainer.save({
        title: 'Globo Terráqueo',
        price: 345.67,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
    }))

    console.log("****** GETBYID ******")
    console.log(await miCOntainer.getById(1))
    console.log(await miCOntainer.getById(2))
    console.log(await miCOntainer.getById(3))
    console.log(await miCOntainer.getById(99999999))

    console.log("****** GETALL ******")
    console.log(await miCOntainer.getAll())

    console.log("****** DELETEBYID ******")
    await miCOntainer.deleteById(2)
    console.log(await miCOntainer.getAll())

    console.log("****** DELETEALL ******")
    await miCOntainer.deleteAll()
    console.log(await miCOntainer.getAll())
}

const testIncorrectData = async () => {
    console.log("****** FILE WITH INCORRECT DATA ******")

    const miCOntainerInc = new Contenedor("./productosBadPrevData.txt")

    await fs.promises.writeFile(miCOntainerInc.fileName, "HOLA")

    console.log("****** SAVE ******")
    console.log(await miCOntainerInc.save({
        title: 'Escuadra',
        price: 123.45,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
    }))

    console.log("****** GETALL ******")
    console.log(await miCOntainerInc.getAll())
}

const runningTestCases = async () => {
    await tests()
    await testIncorrectData()
}

runningTestCases();
