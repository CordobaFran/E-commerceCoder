const { UsersService } = require('../service/users.service')
const usersService = new UsersService()

const nodeMailer = require('../utils/nodemailer')
const { createHash } = require('../middleware/passport.middleware')

const registerRootGet = async (req, res) => {
    res.render('register')
}

const registerPost = async (req, res) => {

    const { username, password, email, admin, name, age, phoneNumber, address, profileUrl } = req.body

    if (!req.file) {
        profilePicture = profileUrl
    } else {
        let filePath = req.file.path
        let publicFilePath = filePath.substring(6)
        profilePicture = publicFilePath
    }

    const userExists = await usersService.findEmailAndUser(username, email)

    if (userExists) {
        // return res.status(301).json({ error: "user or email exists" })
        const error = `
        <div style="margin: 20px">
            <h1>username or e-mail exists</h1>
            <p>Use other username or e-mail</p>
            <a href="javascript:window.history.back()"> Back to Register</a>
        </div>
        `
        return res.send(error)
        // res.end()
    }

    const newUser = {
        username,
        email,
        password: createHash(password),
        admin,
        name,
        age,
        phoneNumber,
        address,
        profilePicture
    }

    nodeMailer(newUser)
    usersService.createUser(newUser)

    // const access_token = generateToken(newUser)
    res.redirect('/auth/login')
    // res.json({ access_token })
}

module.exports = {
    registerRootGet,
    registerPost
}

// router.post("/register", passport.authenticate('register', {
//     successRedirect: '/auth/login',
//     failureRedirect: '/auth/register'
// }))