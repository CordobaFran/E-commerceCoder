
const fs = require( "fs" )
const { loggerConsole, loggerError, loggerWarn } = require('../utils/logger')
// const { readFile } = require('fs/promises')

class ContenedorArchivo {
    constructor(file) {
        this.file = file

        try {
            this.cartOrProducts = fs.readFileSync(this.file, 'utf-8')
            this.cartOrProducts = JSON.parse(this.cartOrProducts)
        } catch (error) {
            this.cartOrProducts = []
        }
    }

    create(productAdded) {
        let lastId
        if (this.cartOrProducts.length) {
            lastId = this.cartOrProducts[this.cartOrProducts.length - 1].id + 1;
        } else {
            lastId = 1
        }

        this.cartOrProducts.push({ "id": lastId, "product": productAdded.product })
        let newProduct = this.cartOrProducts
        try {
            fs.writeFile(this.file, JSON.stringify(newProduct, "", 2), 'utf-8', (err) => {
                if (err) {
                    loggerError.error(err);
                } else {
                    loggerWarn.warn('archivo editado');
                }
            })

        } catch (error) {
            loggerError.error(error);
        }
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

            let products = this.cartOrProducts
            try {
                fs.writeFile(this.file, JSON.stringify(products, "", 2), 'utf-8', (err) => {
                    if (err) {
                        loggerError.error(err);
                    } else {
                        loggerWarn.warn('archivo editado');
                    }
                })

            } catch (error) {
                loggerError.error(error);
            }

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

            let products = this.cartOrProducts
            try {
                fs.writeFile(this.file, JSON.stringify(products, "", 2), 'utf-8', (err) => {
                    if (err) {
                        loggerError.error(err);
                    } else {
                        loggerWarn.warn('dato eliminado');
                    }
                })

            } catch (error) {
                loggerError.error(error);
            }

            return { msj: "deleted" }

        }
    }
}

module.exports = ContenedorArchivo