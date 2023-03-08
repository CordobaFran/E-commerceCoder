const ContenedorMongoDb = require('../../containers/contenedorMongoDb.js')
const { loggerError } = require('../../utils/logger.js')

module.exports = class ProductosDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super('products')
    }

    async getProductByUserId(userId) {
        try {
            let productsById = await this.Model.find({ author: userId })
            return productsById

        } catch (error) {
            loggerError.error(error)
        }
    }
}

// const CreateMongo = new ContenedorMongoDb().createProduct({name: 'peras', value: 125, detail: 'En la pera', urlImg: "https://elegifruta.com.ar/onepage/wp-content/uploads/2017/08/propiedades-de-la-pera.jpg"})
// CreateMongo
// const ReadMongo = new ContenedorMongoDb().getAll()
// ReadMongo
// const readIdMongo = new ContenedorMongoDb().getById("636381a4a5847f6e4a0ec6d7")
// readIdMongo
// const updateMongo = new ContenedorMongoDb().update("636381a4a5847f6e4a0ec6d7", {name: 'manzanas'})
// updateMongo
// const deleteMongo = new ContenedorMongoDb().delete("636385ec4df8ea948c52e03b")
// deleteMongo
