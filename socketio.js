const app = require('./app')

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const { ProductsService } = require('./src/service/products.service')
const productsService = new ProductsService()

const { CartsService } = require('./src/service/carts.service')
const cartsService = new CartsService('carritos')

const Chat = require('./chat')
const { loggerConsole } = require('./src/utils/logger')
const msjs = new Chat("chat")

io.on('connection', async socket => {
    const products = await productsService.getAllProducts()
    const messages = await msjs.getMsj()
    const carts = await cartsService.getAllCarts()

    loggerConsole.info("usuario conectado");
    socket.emit("products-sv", products)
    socket.on('add-product', async (data) => {
        await productsService.createProduct(data)
        io.sockets.emit('products-sv', await productsService.getAllProducts())
    }
    )
    socket.emit("messages", messages)
    socket.on("new-message", async (data) => {
        await msjs.addMsj(data)
        io.sockets.emit("messages-sv", await msjs.getMsj())
    })
    socket.emit("carts", carts)
    // socket.on("new-message", async (data) => {
    //     await msjs.addMsj(data)
    //     io.sockets.emit("messages-sv", await msjs.getMsj())
    // })

})

module.exports = {
    io,
    httpServer
}