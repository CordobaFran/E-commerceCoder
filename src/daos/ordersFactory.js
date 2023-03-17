const config  = require( "../config.js");
const OrdersDaoMongoDb  = require( "./orders/ordersDaoMongoDb")

let database = config.database
let orders

switch (database) {
    default:
        orders = class MainOrdersDao extends OrdersDaoMongoDb {
            constructor() {
                super()
            }
        }
        break;
}

module.exports = orders