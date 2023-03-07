const { Schema, model } = require('mongoose')

const productCollection = 'carts'

const productSchema = new Schema({
    productos: { type: Array }
})

const CartsModel = model(productCollection, productSchema)

module.exports = { CartsModel }