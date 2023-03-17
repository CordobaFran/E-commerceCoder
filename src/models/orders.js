const { Schema, model } = require('mongoose')


const orderCollection = 'orders'

const productSchema = new Schema({
    productId: { type: String },
    product: { type: String },
    qty: { type: Number }
})

const orderSchema = new Schema({
    orderNum: { type: Number },
    products: [productSchema],
    date: { type: Number },
    status: { type: String },
    userEmail: { type: String },
    userId: { type: String }
})

const ordersModel = model(orderCollection, orderSchema)

module.exports = { ordersModel }