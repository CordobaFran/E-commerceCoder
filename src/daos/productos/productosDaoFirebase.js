const ContenedorFirebase = require( '../../containers/contenedorFirebase.js')

module.exports = class ProductosDaoFirebase extends ContenedorFirebase {
    constructor(){
        super('productos')
    }
}

// const fire = new ContenedorFirebase('productos').create()
// fire