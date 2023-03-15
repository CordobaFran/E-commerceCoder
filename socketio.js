const app = require('./app')

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const { CartsService } = require('./src/service/carts.service')
const cartsService = new CartsService('carritos')

const { loggerConsole, loggerError } = require('./src/utils/logger')

const { MsgsService } = require('./src/service/msgs.service')
const msgs = new MsgsService()


io.on('connection', async socket => {
    const messages = await msgs.getAllMsgs()
    const carts = await cartsService.getAllCarts()

    loggerConsole.info("usuario conectado");


    socket.emit("messages", { msgs: messages, userId: userId(socket.handshake.headers.cookie) })

    socket.on("new-message", async (data) => {
        await msgs.createMsgs(await userNewMsg(socket.handshake.headers.cookie, data))
        io.sockets.emit("messages-sv", await msgs.getAllMsgs()) // render msg after new msg
    })

    socket.emit("carts", carts)
})

//----------------- MSGS AND USER FUNCTIONS -------------------

const userNewMsg = (cookies, msg) => {
    try {
        if (cookies) {
            const userChatCookie = cookies
                .split('; ')
                .find(row => row.startsWith('userChat='))
                .split('=')[1];

            const userChatObj = JSON.parse(decodeURIComponent(userChatCookie))

            const newMsg = {
                author: userChatObj,
                message: msg,
                date: Date.now()
            }
            return newMsg

        } else {
            return null
        }

    } catch (error) {
        loggerError.error(error)
        return null
    }

}

const userId = (cookies) => {
    try {
        if (cookies) {
            const userChatCookie = cookies
                .split('; ')
                .find(row => row.startsWith('userChat='))
                .split('=')[1];

            const userChatObj = JSON.parse(decodeURIComponent(userChatCookie))
            console.log(userChatObj);

            return userChatObj.id

        } else {
            return null
        }

    } catch (error) {
        loggerError.error(error)
        return null
    }
}

module.exports = {
    io,
    httpServer
}