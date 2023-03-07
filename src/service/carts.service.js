const { loggerError } = require('../utils/logger')
const CartsDAOs = require('../daos/carritosFactory')

class CartsService {
    constructor() {
        this.cartsDAOs = new CartsDAOs()
    }

    async getAllCarts() {
        try {
            return await this.cartsDAOs.getAll()

        } catch (error) {
            loggerError.error(error)
        }
    }

    async getCartById(id) {
        try {
            const cart = await this.cartsDAOs.getById(id)
            return cart

        } catch (error) {
            loggerError.error(error)
        }
    }

    async createCart(cart) {
        try {
            const newProduct = {
                ...cart,
                addedDate: Date.now()
            }
            const newcartCreate = await this.cartsDAOs.create(newProduct)
            return newcartCreate

        } catch (error) {
            loggerError.error(error)
        }
    }

    async updateCart(id, productId, action) {

        let cart = await this.getCartById(id)
        let products = cart.productos

        if (action === "add"){
            const productsModified = [...products, productId]
            cart.productos = productsModified

        } else {
            const indexOfProduct = products.indexOf(productId)
            indexOfProduct > -1 ? products.splice(indexOfProduct, 1) : null
        }

        try {
            const updatedCart = await this.cartsDAOs.update(id, cart)
            return updatedCart

        } catch (error) {
            loggerError.error(error)
        }
    }

    async deleteCart(id) {
        try {
            const deletedCart = await this.cartsDAOs.delete(id)
            return deletedCart

        } catch (error) {
            loggerError.error(error)
        }
    }
}

module.exports = { CartsService }