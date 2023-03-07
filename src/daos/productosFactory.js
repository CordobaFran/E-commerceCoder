const config  = require( "../config.js");
const ProductosDaoFirebase  = require( "./productos/productosDaoFirebase.js");
const ProductosDaoMongoDb  = require( "./productos/productosDaoMongoDb.js")
const ProductosDaoArchivo  = require( "./productos/productosDaoArchivo.js")
const ProductosDaoMemoria  = require( "./productos/productosDaoMemoria.js")

let database = config.database
let productos

switch (database) {
    case "firebase":
        productos = class MainProductsDao extends ProductosDaoFirebase {
            constructor() {
                super()
            }
        }
        break;
    case "mongo":
        productos = class MainProductsDao extends ProductosDaoMongoDb {
            constructor() {
                super()
            }
        }
        break;
    case "archivo":
        productos = class MainProductsDao extends ProductosDaoArchivo {
            constructor() {
                super()
            }
        }
        break;
    case "memoria":
        productos = class MainProductsDao extends ProductosDaoMemoria {
            constructor() {
                super()
            }
        }
        break;
    default:
        break;
}

module.exports = productos