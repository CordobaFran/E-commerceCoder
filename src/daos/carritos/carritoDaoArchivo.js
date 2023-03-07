const ContenedorArchivo = require( "../../containers/contenedorArchivo.js");
const fs = require( 'fs');
const { loggerError, loggerWarn } = require("../../utils/logger.js");

class CarritosDaoArchivo extends ContenedorArchivo {
    constructor(){
        super("../db/cart.json")
    }

    addToCart(product, id){
        
        const cart = this.cartOrProducts.find(element => {
            return element.id === parseInt(id)
        })

        if (cart.productos && cart.productos.length > 0){
            const lastId = cart.productos[cart.productos.length -1].id + 1
            cart.productos.push({id: lastId, ...product})
        } else {
            cart.productos = [{id: 1, ...product}]
        }
        try {
            fs.writeFile(this.file, JSON.stringify(this.cartOrProducts,"", 2), 'utf-8', (err) => {
              if (err) {
                loggerError.error(err);
              } else {
                loggerWarn.warn('productos agregados');
              }
            })
        } catch (error) {
            loggerError.error(error);
        }
    }

    getProductsFromCart(id){

        const cart = this.cartOrProducts.find(element => {
            return element.id === parseInt(id)
        })
        
        try {
            if(cart && cart.productos){
                return cart.productos
            } else {
                return {msj: "Carrito no encontrado"}
            }
        } catch (error) {
            loggerError.error(error);
        }
    }

    removeFromCart(id, productsId){
        
        let exists = false
        const cart = this.cartOrProducts.find(element => {
            return element.id === parseInt(id)
        })

        const newProducts = productsId.map((productId) => {
            const products = cart.productos.find((el) => {
                return el.id === productId
            })
            products ? exists = true : exists = false
            
            const indexOfProduct = cart.productos.indexOf(products)
            cart.productos.splice(indexOfProduct, 1)
        })

        newProducts

        if (exists) {
            try {
                fs.writeFile(this.file, JSON.stringify(this.cartOrProducts, "", 2), 'utf-8', (err) => {
                    if (err) {
                        loggerError.error(err);
                    } else {
                        loggerWarn.warn('dato eliminado');
                    }
                })
    
            } catch (error) {
                loggerError.error(error);
            }
            return {msj:"products deleted"}
        } else {
            return {msj: "product not found"}
        }

    }
}

module.exports = CarritosDaoArchivo