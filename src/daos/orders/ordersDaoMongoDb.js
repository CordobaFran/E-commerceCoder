const ContenedorMongoDb = require('../../containers/contenedorMongoDb.js')

module.exports = class OrdersDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super('orders')
    }

    async getByOrderNum(num) {
        return await this.Model.findOne({ orderNum: num })
    }

    async createOrderNumDaos() {
        return await this.Model.findOne({},{},{ sort: { 'date': -1 } }, (err, lastDoc) => {
            return lastDoc
        }).clone()
    }
}
