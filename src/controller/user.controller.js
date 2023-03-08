const { ProductsService } = require('../service/products.service')
const productsService = new ProductsService()

const { UsersService } = require('../service/users.service')
const usersService = new UsersService()

const userController = async (req, res) => {
    const userId = req.query.id
    const userData = await usersService.getUserById(userId)

    const userProducts = await productsService.getProductByUserId(userId)
    // const products = await productsService.getAllProducts()

    res.status(201).render('user', { userData, userProducts })
    // res.status(201).json({userData, userProducts})
}

module.exports = userController