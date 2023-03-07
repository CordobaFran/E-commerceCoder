const ContenedorFirebase  = require( '../../containers/contenedorFirebase.js')
const admin  = require( 'firebase-admin')
const { loggerWarn, loggerError } = require('../../utils/logger.js')

class CarritoDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('carritos')
    }

    async addToCart(product, id) {
        const productsOfCart = await this.getProductsFromCart(id)

        try {

            let lastId
            if (productsOfCart.length && productsOfCart.length > 0) {
                lastId = productsOfCart[productsOfCart.length - 1].id + 1
            } else {
                lastId = 1
            }

            const doc = this.query.doc(id)
            await doc.update({ productos: admin.firestore.FieldValue.arrayUnion({id: lastId, ...product}) })
            loggerWarn.warn(`documento actualizado`, product);
            return { status: "modified" }

        } catch (error) {
            loggerError.error(error);
        }
    }

    async getProductsFromCart(id) {
        try {
            const queryDoc = this.query.doc(id)
            const doc = await queryDoc.get()
            const document = await doc.data()
            return document.productos

        } catch (error) {
            loggerError.error(error);
        }
    }

    async removeFromCart(id, productsId) {

        try {
            const doc = this.query.doc(id)
                await doc.update({ productos: admin.firestore.FieldValue.arrayRemove(productsId) })
                loggerWarn.warn(`documento actualizado`);
                return { status: "modified" }
            
        } catch (error) {
            loggerError.error(error);
        }

    }

}

module.exports = CarritoDaoFirebase
