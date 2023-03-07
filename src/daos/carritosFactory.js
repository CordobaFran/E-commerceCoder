const config = require("../config.js");
const CarritoDaoFirebase = require("./carritos/carritoDaoFirebase.js");
const CarritoDaoMongoDb = require("./carritos/carritoDaoMongoDb.js")
const CarritoDaoArchivo = require("./carritos/carritoDaoArchivo.js")
const CarritoDaoMemoria = require("./carritos/carritoDaoMemoria.js")

let database = config.database
let carritos

switch (database) {
    case "firebase":
        carritos = class MainCarritosDao extends CarritoDaoFirebase {
            constructor() {
                super()
            }
        }
        break;
    case "mongo":
        carritos = class MainCarritoDao extends CarritoDaoMongoDb {
            constructor() {
                super()
            }
        }
        break;
    case "archivo":
        carritos = class MainCarritoDao extends CarritoDaoArchivo {
            constructor() {
                super()
            }
        }
        break;
    case "memoria":
        carritos = class MainCarritoDao extends CarritoDaoMemoria {
            constructor() {
                super()
            }
        }
        break;
    default:
        break;
}

module.exports = carritos