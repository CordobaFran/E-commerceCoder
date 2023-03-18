const { OrderService } = require("../service/orders.service")
const orderService = new OrderService()


const getOrder = async (req, res) => {
    const id = req.params.id
    const order = await orderService.getOrderService(id)
    
    const products = order.products.map((el)=> {
        return {
            title: el.product,
            qty: el.qty
        }
    })
    
    const orderConfirm = {
        num: order.orderNum,
        products: products,
        email: order.email,
        status: order.status
    }

    res.status(201).render('order', { orderConfirm })
    // res.status(201).json({order: order})
}

const postOrder = async (req, res) => {
    const data = req.user
    const checkout = await orderService.checkout(data)
    const num = checkout

    res.status(201).redirect(`/order/${num}`)
}

module.exports = {
    getOrder,
    postOrder
}