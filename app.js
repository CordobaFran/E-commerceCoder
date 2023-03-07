
// const { authMiddleware } = require('./src/middleware/auth.middleware')
const { options } = require('./options/options')

const express = require('express')
const app = express()
const session = require('express-session')
const cookieParser = require('cookie-parser')
// const MongoStore = require('connect-mongo')

const handlebars = require('express-handlebars')

const routerProducts = require('./src/routes/apiMock/apiMock.routes')
const mainProducts = require('./src/routes/productos/main.routes.js')
const routerLogin = require('./src/routes/login/login.routes')
const routerRegister = require('./src/routes/register/register.routes')
const routerInfo = require('./src/routes/info/info.routes')
const randomRoutes = require('./src/routes/random/random.routes')
const routerCart = require('./src/routes/cart/cart.routes')
const apiMockProducts = require('./src/routes/apiMock/apiMock.routes')


const { passport } = require('./src/middleware/passport.middleware')
const { checkAuth } = require('./src/middleware/checkAuth.middleware.js')
const { auth } = require('./src/middleware/JWTauth.middleware')

require('dotenv').config()


app.engine('hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials/'
    })
)

app.set('view engine', 'hbs');
app.set('views', './views')

app.use(session({
    secret: options.SECRETKEY_SESSION,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 1000 * 60 * 10
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
}))

// app.use(session({
//     secret: process.env.SECRET,
//     store: MongoStore.create(options.configAtlasSession),
//     resave: true,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 1000 * 60 * 10
//     }
// }))

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())

app.use('/api', randomRoutes)
app.use('/api', routerProducts)
app.use('/api', apiMockProducts)
app.use('/auth', routerLogin)
app.use('/auth', routerRegister)
app.use('/cart',auth, routerCart)
app.use('/', routerInfo)
app.use('/', auth, mainProducts)
// app.use('/', mainProducts)

module.exports = app