const { faker } = require('@faker-js/faker')
const { loggerError } = require('./logger')

const { lorem, commerce, image } = faker

const { UsersService } = require('../service/users.service')
const userService = new UsersService()
faker.locale = 'es'

async function generarProducto() {
    return {
        product: commerce.productName(),
        detail: lorem.paragraph(),
        value: commerce.price(),
        urlImg: image.image(),
        rating: {
            rate: numbers().rate,
            count: numbers().count
        },
        stock: numbers().stock,
        author: await randomUsersIds(),
        category: randomCategory()
    }
}

const numbers = () => {
    const rate = Math.floor(Math.random() * 6)
    const count = Math.floor(Math.random() * 200)
    const stock = Math.floor(Math.random() * 150)
    return { rate, count, stock }
}

const randomUsersIds = async () => {
    try {
        const users = await userService.getAllUsers()
        const usersIds = users.map(user => user._id)

        const usersRegistered = usersIds.length
        const randomIndex = Math.floor(Math.random() * usersRegistered)

        return await usersIds[randomIndex]

    } catch (error) {
        loggerError.error(error)
    }
}

const randomCategory = () => {
    return Math.ceil(Math.random() * 10)
}

module.exports = { generarProducto }