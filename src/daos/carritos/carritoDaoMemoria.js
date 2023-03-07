const { loggerError, loggerWarn } = require("../../utils/logger.js")
const ContenedorMemoria = require( "../../containers/contenedorMemoria.js")

class CarritoDaoMemoria extends ContenedorMemoria {
    constructor(){
        super()
    }

    addToCart(product, id){
        
        const cart = this.cartOrProducts.find(element => {
            return element.id === parseInt(id)
        })

        if (cart.productos && cart.productos.length > 0){
            const lastId = cart.productos[cart.productos.length -1].id + 1
            cart.productos.push({id: lastId, ...product})
            return {msj: "product added"}
        } else {
            cart.productos = [{id: 1, ...product}]
            loggerWarn.warn("product added");
            return {msj: "product added"}
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
            return {msj:"products deleted"}
        } else {
            return {msj: "product not found"}
        }

    }
}

module.exports = CarritoDaoMemoria