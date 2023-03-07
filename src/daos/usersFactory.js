const config = require("../config.js");

const UsersDaoMongoDb = require("./users/usersDaoMongoDb.js")


let database = config.database
let users

// se comenta hasta que se creen los daos coorespondientes 
// a cada tipo de persistencia

switch (database) {
    // case "firebase":
    //     users = class MainCarritosDao extends CarritoDaoFirebase {
    //         constructor() {
    //             super()
    //         }
    //     }
    //     break;
    case "mongo":
        users = class MainUsersDao extends UsersDaoMongoDb {
            constructor() {
                super()
            }
        }
        break;
    // case "archivo":
    //     users = class MainCarritoDao extends CarritoDaoArchivo {
    //         constructor() {
    //             super()
    //         }
    //     }
    //     break;
    // case "memoria":
    //     users = class MainCarritoDao extends CarritoDaoMemoria {
    //         constructor() {
    //             super()
    //         }
    //     }
    //     break;
    default:
        break;
}

module.exports = users