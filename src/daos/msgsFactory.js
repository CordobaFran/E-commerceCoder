const config = require("../config");
const MsgsDaoMongoDb = require("./msgs/msgsDaoMongoDb");


let database = config.database
let msgs


switch (database) {

    case "mongo":
        msgs = class MsgsDAOs extends MsgsDaoMongoDb {
            constructor() {
                super()
            }
        }
        break;

    default:
        break;
}

module.exports = msgs