// const Carritos = require('../daos/carritosDao')
const { child } = require('winston')

const { CartsService } = require ('../service/carts.service')
const cart = new CartsService('carritos')

const { ProductsService } = require('../service/products.service')
const productos = new ProductsService()

const nodeMailerCart = require('../utils/nodemailer-cartConfirm')

const { twilioSms, twilioWsap } = require('../utils/twilio')


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

const cartCheckout = async (req, res) => {
    const { username, email, cartId } = req.user
    const { productsFull } = await cart.getCartById(cartId)

    const products = productsFull

    const sellData = {
        username,
        email,
        products
    }

    nodeMailerCart(sellData)
    twilioWsap(sellData)
    twilioSms(sellData)

    await cart.updateCart(cartId, [], "deleteAll")

    res.redirect('/')
    // res.json({ msj: "checkout Ok" })
}


module.exports = {
    cartsAll,
    cartId,
    cartCheckout,
    cartAddproduct,
    cartDeleteproduct
}