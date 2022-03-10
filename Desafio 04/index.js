const express = require('express')
const { Router } = express
const Products = require("./classes/products")

const app = express()
const router = Router()

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

app.use('/api/productos', router)
app.use('/static', express.static(__dirname + '/public'));
app.use(express.json())
router.use(express.json())
app.use(express.urlencoded({ extended: true }))
router.use(express.urlencoded({ extended: true }))

const listaProductos = new Products()

router.get('/', (req, res) => {
    try {
        const allProducts = listaProductos.getAllProducts()
        res.send(allProducts)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

router.get('/:id', (req, res) => {
    try {
        const id = Number(req.params.id)
        const foundItem = listaProductos.getProduct(id)
        res.send(foundItem)
    }
    catch (err) {
        res.status(400).send(err.message)
    }
})

router.post('/', (req, res) => {
    console.log(req.body)
    try {
        const newProduct = listaProductos.addProduct(req.body)
        res.send(newProduct)
    }
    catch (err) {
        res.status(400).send(err.message)
    }
})

router.put('/:id', (req, res) => {
    console.log(req.params)
    console.log(req.body)
    try {
        listaProductos.updateProduct(Number(req.params.id), req.body)
        res.send("El producto fue actualizado exitosamente!")
    }
    catch (err) {
        res.status(400).send(err.message)
    }
})

router.delete('/:id', (req, res) => {
    try {
        listaProductos.deleteProduct(Number(req.params.id))
        res.send("El producto fue borrado exitosamente!")
    }
    catch (err) {
        res.status(400).send(err.message)
    }
})