const ContenedorMongo = require('../../containers/contenedorMongoDb.js')
const mongoose = require('mongoose')
const { loggerError } = require('../../utils/logger.js')

class CarritoDaoMongo extends ContenedorMongo {
    constructor() {
        super('carritos')
    }
    async addToCart(product, id) {

        const cart = await this.Model.findById(id)

        if (cart.productos && cart.productos.length > 0) {
            const lastId = cart.productos[cart.productos.length - 1]._id + 1
            cart.productos.push({ _id: lastId, ...product })
            await cart.save()
            return { msj: "product added" }
        } else {
            await cart.productos.push({ _id: 1, ...product })
            await cart.save();
            return { msj: "product added" }
        }
    }

    async getProductsFromCart(id) {
        try {
            let cart = await this.Model.findById(id)
            return cart.productos
        } catch (error) {
            loggerError.error(error);
        }
    }

    async removeFromCart(id, productsId) {

        try {
            const cart = await this.Model.findById(id)

            await this.Model.findOneAndUpdate({ _id: id }, { $pull: { "productos": { _id: parseInt(productsId[0]) } } }, { safe: true, upsert: true })
            cart.save()
            return { msj: "products deleted" }
        } catch (error) {
            loggerError.error(error)
            return { msj: "product not found" }
        }
    }
}

module.exports = CarritoDaoMongo