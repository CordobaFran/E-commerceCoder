const { CartsService } = require ('../service/carts.service')
const cart = new CartsService('carritos')

const cartsAll = async (req, res) => {

    const carts = await cart.getAllCarts()
    let cartExists = false
    await !carts ? cartExists = false : cartExists = true

    res.status(200).render('cart', { cartExists, carts })
    // res.json(carts)
}

const cartId = async (req, res) => {
    let cartExists = false
    
    const id = req.user.cartId
    const { productsFull } = await cart.getCartById(id)

    const products = productsFull
    await !productsFull ? cartExists = false : cartExists = true

    res.render('userCart', await { cartExists, id, products })
    // res.json(cartById)
}

const cartAddproduct = async (req, res) => {
    const id = req.params.id
    const productAdded = req.body
    await cart.updateCart(id, productAdded, "add")
    res.json({msj: "product added"})
}

const cartDeleteproduct = async (req, res) => {
    const cartId = req.user.cartId
    const productId = req.params.id
    await cart.updateCart(cartId, productId, "delete")
    res.json({msj: "product deleted"})
}

module.exports = {
    cartsAll,
    cartId,
    cartAddproduct,
    cartDeleteproduct
}