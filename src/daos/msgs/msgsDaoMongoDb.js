const ContenedorMongoDb = require('../../containers/contenedorMongoDb.js')
const { loggerError } = require('../../utils/logger.js')

module.exports = class MsgsDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super('msgs')
    }
}