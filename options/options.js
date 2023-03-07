const yargs = require('yargs/yargs')(process.argv.slice(2))
// const args = yargs
// .default({
//     port: 8080
// })
// .alias({
//     p: "port"
// })
// .argv
const args = yargs.argv

require('dotenv').config()
// console.log("args", args._[1]);

const options = {
    // PORT: args.port,
    PORT: args._[0] || process.env.PORT,
    MODE: args._[1] || process.env.MODE,
    SECRETKEY_SESSION: process.env.SECRETKEY_SESSION,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
    GITHUB_STRATEGY: {
        clientID: process.env.GH_CLIENT_ID,
        clientSecret: process.env.GH_CLIENT_SECRET,
        callbackURL: process.env.GH_CALLBACK_CLIENT
    },
    mysql: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'ecommerce'
        }
    },
    sqlite: {
        client: 'sqlite3',
        connection: {
            filename: process.env.SQLITE_CONNECTION_PATH,
        },
        userNullAsDefault: true
    },
    mongoDb: {
        connection: process.env.MONGODB_CONNECTION_URL,
    },
    configAtlasSession: {
        mongoUrl: process.env.MONGOATLAS_URL,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
    },
    twilio: {
        sid: process.env.TWILIO_SID,
        token: process.env.TWILIO_TOKEN,
        smsActivated: false,
        wsapActivated: false
    }
}

module.exports = {
    options
}