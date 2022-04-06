const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const Container = require("./classes/container")
const Messages = require("./classes/messages")

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const PORT = 8080

app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const listaProductos = new Container()
const messageList = new Messages("./chatmessages.txt")

io.on('connection', socket => {
    console.log('Nuevo cliente conectado!')

    const getProducts = async () => {
        const allProducts = await listaProductos.getAllProducts()
        io.sockets.emit('productList', { allProducts });
    }

    const allMessages = () => {
        messageList.getAll().then(retrievedMessages => {
            io.sockets.emit('messages', retrievedMessages)
        })
    }

    getProducts()
    allMessages()

    socket.on('new-product', async data => {
        try {
            await listaProductos.addProduct(data)
            getProducts()
        }
        catch (err) {
            console.log(err.message)
        }
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
