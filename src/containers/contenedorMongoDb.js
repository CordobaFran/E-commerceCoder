const mongoose = require('mongoose')
const config = require('../config.js')
const { loggerConsole, loggerError, loggerWarn } = require('../utils/logger')

const { ProductsModel } = require('../models/products')
const { CartsModel } = require('../models/carts')
const { UsersModel } = require('../models/users')


class Products {
    constructor(collection = 'products') {

        this.collection = collection
        this.Model = ProductsModel

        if (mongoose.connection.readyState === 0) {
            return this.connect()
        }

        if (collection === 'carritos') {
            this.Model = CartsModel

        } else if (collection === 'users') {
            this.Model = UsersModel

        } else {
            this.Model = ProductsModel
        }
    }

    connect() {
        try {
            mongoose.connect(config.mongo.URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            loggerConsole.info('Mongo db connected');

        } catch (error) {
            loggerError.error(error);
        }
    }

    //Create document
    async create(item) {
        try {
            const newItem = new this.Model(item)

            const itemSave = await newItem.save()
            .then((item)=>{
                return item._id;
            }).catch((error)=>{
                loggerError.error(error)
            })

            loggerWarn.warn(` ${this.collection} added`);
            return { status: ` ${this.collection} added`, id: itemSave }

        } catch (error) {
            loggerError.error(error);
        }
    }
    //Read All
    async getAll() {
        try {
            let items = await this.Model.find({})
            return items

        } catch (error) {
            loggerError.error(error);
        }
    }
    //Read by Id
    async getById(id) {
        try {
            let items = await this.Model.findOne({ _id: id })
            return items

        } catch (error) {
            loggerError.error(error);
        }
    }
    //Update Product
    async update(id, params) {
        try {
            let items = await this.Model.updateOne({ _id: id }, { $set: params })
            loggerWarn.warn('Edited', items);
            return { status: "modified" }

        } catch (error) {
            loggerError.error(error);
        }
    }
    //Delete Product
    async delete(id) {
        try {
            let items = await this.Model.deleteOne({ _id: id })
            loggerWarn.warn(` ${this.collection} deleted`, items);
            return { status: `${this.collection} ${id} deleted` }

        } catch (error) {
            loggerError.error(error);
        }
    }

    async deleteall() {
        try {
            await this.Model.deleteMany({})
            return { status: ` All ${this.collection} deleted` }

        } catch (error) {
            loggerError.error(error);
        }
    }


}

module.exports = Products
