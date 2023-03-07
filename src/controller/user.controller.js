const { UsersService } = require('../service/users.service')
const usersService = new UsersService()

const userController = async (req, res) => {
    const userId = req.query.id
    const userData = await usersService.getUserById(userId)

    res.status(201).render('user', { userData })
    // res.status(201).json(userData)
}

module.exports = userController