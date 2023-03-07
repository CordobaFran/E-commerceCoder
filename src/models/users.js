const {Schema, model} = require ('mongoose')

const productCollection = 'users'

const productSchema = new Schema({
    username: { type: String, require: true, max: 100 },
    email: { type: String, require: true, max: 150 },
    password: { type: String, require: true },
    admin: { type: Boolean, require: true },
    name: { type: String, require: true, max: 100 },
    age: { type: Number, require: true, min: 18, max: 120 },
    phoneNumber: { type: Number, require: true },
    address: { type: String, require: true, max: 100 },
    profilePicture: { type: String, require: true, max: 1000},
    cartId: {type: String},
    addedDate: {type: Number}
})

const UsersModel = model(productCollection, productSchema)

module.exports = { UsersModel }