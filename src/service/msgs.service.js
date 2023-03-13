const MsgsDAOs = require('../daos/msgsFactory')
const { loggerError } = require('../utils/logger')


class MsgsService {
    constructor() {
        this.msgsDAOs = new MsgsDAOs()
        // this.createMsgs()
        // this.getAllMsgs()
    }

    async getAllMsgs() {
        try {
            const msgsGet = await this.msgsDAOs.getAll()
            return msgsGet

        } catch (error) {
            loggerError.error(error)
        }
    }

    async createMsgs(msg) {
        try {
            const msgsPost = await this.msgsDAOs.create(msg)
            return msgsPost
            
        } catch (error) {
            loggerError.error(error)
        }
    }
}

module.exports = { MsgsService }