const express = require('express')
const Products = require("./classes/products")
const { engine } = require('express-handlebars')

const app = express()
const PORT = 8080

app.use('/static', express.static(__dirname + '/public'));
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const listaProductos = new Products()

app.get('/', (req, res) => {
    try {
        res.render('home')
    }
    catch (err) {
        res.status(400).send(err)
    }
})

app.get('/productos', (req, res) => {
    try {
        const allProducts = listaProductos.getAllProducts()
        res.render('productos', {allProducts})
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