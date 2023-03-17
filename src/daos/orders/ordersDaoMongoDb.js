const ContenedorMongoDb = require('../../containers/contenedorMongoDb.js')

module.exports = class OrdersDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super('orders')
    }

    async getByOrderNum(num) {
        return await this.Model.findOne({ orderNum: num })
    }
}
