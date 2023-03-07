const { options } = require('../../options/options')

const jwt = require('jsonwebtoken')
const { generateToken } = require('./JWTgenerate.middleware')

async function auth(req, res, next) {
    const authHeader = req.cookies["authorization"]
    // console.log(authHeader);
    
    if (!authHeader) {
        return res.status(401).json({
            error: 'not authenticated'
        })
    }
    
    const token = authHeader

    //REGENERATE TOKEN ON REFRESH
    if (token) {
        const newTk = generateToken(jwt.decode(token).data)
        res.cookie('authorization', newTk)
    }

    jwt.verify(token, options.JWT_PRIVATE_KEY, async (err, decoded) => {
        if (err) {
            res.clearCookie('authorization')
            return res.status(403).json({
                error: ' not authorized'
            })
        }
        req.user = decoded.data

        next()
    })
}

module.exports = {
    auth
}