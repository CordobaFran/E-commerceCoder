const { Router } = require('express')
const router = Router()

const passport = require('passport')

const { loginUsernamePost, loginRootGet, loginWithGithub, loginGetTokenGithub, logoutGet } = require('../../controller/login.controller')

//------------------------------LOGIN------------------------------//

router.get("/login", loginRootGet)

router.post("/login", loginUsernamePost)

router.get('/github', passport.authenticate('github', loginWithGithub))

router.get('/githubcallback', passport.authenticate('github', {
    failureRedirect: '/auth/login'
}), loginGetTokenGithub)

//------------------------------LOGOUT------------------------------//

router.get("/logout", logoutGet )

module.exports = router


