const ContenedorArchivo = require("../../containers/contenedorArchivo.js")

module.exports = class ProductosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super("../db/productos.json")
    }
}

