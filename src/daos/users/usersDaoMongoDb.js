const ContenedorMongoDb = require('../../containers/contenedorMongoDb.js')
const { isValidPassword } = require('../../middleware/passport.middleware')

const { loggerError } = require('../../utils/logger.js')

module.exports = class UsersDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super('users')
    }
    
    async findUserAndEmail(username, email) {
        try {
             const userAndEmailExists = await this.Model.findOne(
                {
                    $or: [
                        { username: username },
                        { email: email }
                    ]
                }
            )
            
            return userAndEmailExists

        } catch (error) {
            loggerError.error(error);
        }
    }

    async validUserAndPass(user, pass) {

        try {
            const userExists = await this.Model.findOne({username: user})    

            if (userExists && isValidPassword(userExists, pass)) {
                return userExists._doc
            }

        } catch (error) {
            loggerError.error(error);
        }
    }
}