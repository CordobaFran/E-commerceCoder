const { options } = require('../../options/options')
// const { serializeUser } = require('passport')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GithubStrategy = require('passport-github2').Strategy
const bcrypt = require('bcrypt')

const { users } = require('../../db/users')
const { loggerWarn } = require('../utils/logger')

const createHash = (password) => {
    // console.log(password);
    return bcrypt.hashSync(
        password,
        bcrypt.genSaltSync(10),
        null)
}

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)//pasword es el del formulario y user.password el traido de la nube
}

passport.use('github', new GithubStrategy(options.GITHUB_STRATEGY, (req, accessToken, refreshToken, profile, done) => {
    // console.log(profile._json);
    // console.log(accessToken);

    const userData = {
        id: profile.id,
        username: profile._json.name,
        email: profile._json.email,
        admin: true
    }

    req.user = userData

    return done(null, userData)
}
))

passport.use('login', new LocalStrategy(
    (username, password, done) => {

        let user = users.find(user => user.username === username)
        // console.log(users);
        if (!user) {
            loggerWarn.warn(`User Not Found with username ${username}`);
            return done(null, false)
        }

        return done(null, user)
    }
))

passport.use('register', new LocalStrategy({
    passReqToCallback: true
},
    (req, username, password, done) => {

        let user = users.find(user => user.username === username)
        // console.log(user);
        if (user) {
            loggerWarn.warn(`User ${username} already exists`);
            return done(null, false, { message: 'user already exists' })
        }

        const { admin } = req.body
        var isTrueSet = (admin === 'true') //convierte el string de true and false en un boolean

        const newUser = {
            id: users.length + 1,
            username,
            password: createHash(password),
            admin: isTrueSet
        }

        users.push(newUser)

        return done(null, newUser)

    })
)

//nos guarda el id del usuario en la session
passport.serializeUser((user, done) => {
    done(null, user)
})

// toma el id que esta en las sessions
// si esta ok deja pasar al usuario y continuar con la auth
passport.deserializeUser((id, done) => {
    // let user = users.find(user => user.id === id)
    // console.log(id)
    done(null, id)
})

module.exports = {
    passport,
    createHash,
    isValidPassword
}

