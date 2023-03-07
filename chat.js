const { normalizedChatpost, denormalizedChatPost } = require('./src/utils/schemaNormalizr')
const { loggerConsole, loggerError, loggerWarn } = require('./src/utils/logger')
const util = require('util')
const fs = require('fs')
const db = './db/chatMsg.json'
// let chatMsg = require('./db/chatMsg')
// createDb()

function print(text = "", objeto) {
    loggerConsole.info(text, util.inspect(objeto, false, 12, true))
}
class Chat {
    constructor(table) {
        this.table = table
        this.file = db
    }
    async getMsj() {
        try {
            return { normalizedChatpost }
        } catch (error) {
            loggerError.error(error);
        }
    }

    async addMsj(newMsj) {
        const denormalized = denormalizedChatPost(newMsj)
        try {
            fs.writeFile(this.file, JSON.stringify(denormalized, "", 2), error => {
                if (error) {
                    loggerError.error(error)
                } else {
                    loggerWarn.warn("Datos Guardados")
                }
            })
        } catch (error) {
            loggerError.error(error);
        }
    }
}

module.exports = Chat
