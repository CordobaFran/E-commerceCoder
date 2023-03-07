
class ContenedorArchivo {
    constructor() {
        this.cartOrProducts = []
    }

    create(productAdded) {
        let lastId
        if (this.cartOrProducts.length) {
            lastId = this.cartOrProducts[this.cartOrProducts.length - 1].id + 1;
        } else {
            lastId = 1
        }

        this.cartOrProducts.push({ "id": lastId, "product": productAdded.product })
        return { msj: "data created" }
    }

    getAll() {
        return this.cartOrProducts
    }

    getById(id) {
        let product = this.cartOrProducts.find(element => {
            return element.id === parseInt(id)
        })

        if (product) {
            return product
        } else {
            return { "error": "producto no encontrado" }
        }
    }

    update(id, productEdited) {
        const product = this.cartOrProducts.find(element => {
            return element.id === parseInt(id)
        })

        if (product) {
            const indexOfProduct = this.cartOrProducts.indexOf(product)
            this.cartOrProducts[indexOfProduct] = { "id": product.id, ...product, ...productEdited }

            return { msj: "edited" }
        }
    }

    delete(id) {
        const product = this.cartOrProducts.find(element => {
            return element.id === parseInt(id)
        })

        if (product) {
            const indexOfProduct = this.cartOrProducts.indexOf(product)
            this.cartOrProducts.splice(indexOfProduct, 1)

            return { msj: "deleted" }

        }
    }
}

module.exports = ContenedorArchivo