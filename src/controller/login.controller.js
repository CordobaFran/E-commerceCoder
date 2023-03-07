const { UsersService } = require('../service/users.service')
const usersService = new UsersService()

const { generateToken } = require('../middleware/JWTgenerate.middleware')

const loginRootGet = async (req, res) => {
    // console.log(req.header('authorization'));
    res.clearCookie('authorization')
    res.render('login')
}

const loginUsernamePost = async (req, res) => {
    const { username, password } = req.body
    const loginSuccessUser = await usersService.validPassAndUser(username, password)

    if (await !loginSuccessUser) {
        // return res.json({ error: "Credenciales invalidas" })
        const error = `
        <div style="margin: 20px">
            <h1> Invalid username or password</h1>
            <a href="javascript:window.history.back()"> Back to Login</a>
        </div>
        `
        return res.send(error)
    }

    const { password: pass, ...userWithoutPass } = loginSuccessUser
    const access_token = generateToken(userWithoutPass)

    // res.header('authorization', [access_token]).json({ access_token })
    res.cookie("authorization", access_token)
    res.status(200).redirect('/')
}

const loginWithGithub = { scope: ['user:email'] }

const loginGetTokenGithub = async (req, res) => {
    const access_token = generateToken(req.user)
    res.status(201).cookie("authorization", access_token).redirect('/')
}

const logoutGet = async (req, res) => {
    res.clearCookie("authorization")
    res.render('logout')
}


module.exports = {
    loginUsernamePost,
    loginRootGet,
    loginWithGithub,
    loginGetTokenGithub,
    logoutGet
}

// router.post('/login', (req, res) => {
//     try {
//         const { username, password } = req.body
//         const user = users.find(user => user.username === username)

//         if(!user){
//             return res.status(401).send('Usuario no existente')
//         }

//         if(user.password !== password) {
//             return res.status(401).send('password erroneo')
//         }

//         req.session.user = username
//         req.session.admin = true
//         res.status(200).redirect('/')

//     } catch (error) {
//         console.log(error);
//     }
// })
