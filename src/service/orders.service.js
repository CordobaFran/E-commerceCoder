const OrdersDAOs = require('../daos/ordersFactory')
const { CartsService } = require('../service/carts.service')
const { loggerError } = require('../utils/logger')

const nodeMailerCart = require('../utils/nodemailer-cartConfirm')
const { twilioWsap, twilioSms } = require('../utils/twilio')

class OrderService {
    constructor() {
        this.ordersDAOs = new OrdersDAOs()
        this.cartsService = new CartsService()
    }

    async getOrderService(id) {
        return await this.ordersDAOs.getByOrderNum(id)
    }

    async createOrder(data) {
        let orderId = 0

        orderId == 0 ? orderId += 1 : orderId = 0
        const { productsFull } = await this.cartsService.getCartById(data.cartId)
        const remapProductsFull = await productsFull.map((el) => {
            return {
                productId: el.id,
                product: el.product,
                qty: el.qty
            }
        })

        const order =
        {
            orderNum: orderId,
            products: remapProductsFull,
            date: Date.now(),
            status: "generada",
            userEmail: data.email,
            userId: data._id
        }

        const createOrder = await this.ordersDAOs.create(order)
            .then(async (item) => {
                const orderNum = await this.ordersDAOs.getById(item.id)
                return orderNum.orderNum
            }).catch((error) => {
                loggerError.error(error)
            })
           
        return createOrder
    }

    async checkout(data) {
        const { username, email, cartId } = data

        const { productsFull } = await this.cartsService.getCartById(cartId)
        const products = productsFull

        const orderCreate = await this.createOrder(data)
        orderCreate

        const orderNum = await orderCreate

        const sellData = {
            username,
            email,
            products
        }

        nodeMailerCart(sellData)
        twilioWsap(sellData)
        twilioSms(sellData)

        await this.cartsService.updateCart(cartId, [], "deleteAll")

        return orderNum
    }
}

module.exports = { OrderService }