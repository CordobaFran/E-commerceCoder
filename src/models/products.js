const {Schema, model} = require ('mongoose')


const productCollection = 'products'

const productSchema = new Schema({
    product: { type: String, require: true, max: 100 },
    detail: { type: String, require: true, max: 150 },
    value: { type: Number, require: true },
    urlImg: { type: String, require: true },
    value: { type: Number, require: true },
    rating: {
        rate: {type: Number},
        count: {type: Number}
    },
    stock: {type: Number}
    
})

const ProductsModel = model(productCollection, productSchema)

module.exports = { ProductsModel }