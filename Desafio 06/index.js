const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const Products = require("./classes/products")
const Messages = require("./classes/messages")

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const PORT = 8080

app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const listaProductos = new Products()
const messageList = new Messages("./chatmessages.txt")

io.on('connection', socket => {
    console.log('Nuevo cliente conectado!')

    const allProducts = listaProductos.getAllProducts()
    io.sockets.emit('productList', { allProducts });

    const allMessages = () => {
        messageList.getAll().then(retrievedMessages => {
            io.sockets.emit('messages', retrievedMessages)
        })
    }

    allMessages()

    socket.on('new-product', data => {
        try {
            listaProductos.addProduct(data)
            const allProducts = listaProductos.getAllProducts()
            io.sockets.emit('productList', { allProducts });
        }
        catch (err) {
            console.log(err.message)
        }

        io.sockets.emit('productList', { allProducts });
    });

    socket.on('new-message', message => {
        try {
            messageList.save(message).then(() => allMessages())
            
        }
        catch (err) {
            console.log(err.message)
        }
    });

})

const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor HTTP con Websockets escuchando en el puerto ${connectedServer.address().port}`)
})

connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
