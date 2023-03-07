// const Container = require('../containers/Container')
const productos = require('../src/daos/productosFactory')
const { generarProducto } = require('../src/utils/generadorDeProductos')

module.exports = class ApiProductosMock extends productos {
    constructor() {
        super()
    }

    async popular(cant = 5) {
        const nuevos = []
        for (let i = 0; i < cant; i++) {
            const nuevoProducto = generarProducto()
            const guardado = this.create(nuevoProducto)
            nuevos.push(await guardado)
        }
        return nuevos
    }
}