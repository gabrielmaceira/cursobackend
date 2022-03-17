const express = require('express')
const Products = require("./classes/products")
const pug = require('pug')

const app = express()
const PORT = 8080

app.use('/static', express.static(__dirname + '/public'));
app.set('views', './views');
app.set('view engine', 'pug')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const listaProductos = new Products()

app.get('/productos', (req, res) => {
    try {
        const allProducts = listaProductos.getAllProducts()
        res.render('home', {allProducts})
    }
    catch (err) {
        res.status(400).send(err)
    }
})

app.post('/productos', (req, res) => {
    console.log(req.body)
    try {
        listaProductos.addProduct(req.body)
        const allProducts = listaProductos.getAllProducts()
        res.render('home', {allProducts})
    }
    catch (err) {
        res.status(400).send(err.message)
    }
})

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))