const { loggerError } = require('../utils/logger')
const UsersDAOs = require('../daos/usersFactory')
const CartsDAOs = require('../daos/carritosFactory')

class UsersService {
    constructor() {
        this.usersDAOs = new UsersDAOs()
        this.cartsDAOs = new CartsDAOs()
    }

    async getAllUsers() {
        try {
            return await this.usersDAOs.getAll()

        } catch (error) {
            loggerError.error(error)
        }
    }

    async getUserById(id) {
        try {
            const user = await this.usersDAOs.getById(id)
            return user

        } catch (error) {
            loggerError.error(error)
        }
    }

    async createUser(userData) {
        try {
            const newCart = await this.cartsDAOs.create([]) // crea un nuevo carrito al crear un usuario y extrae su id

            const newUser = {
                ...userData,
                cartId: newCart.id, // se guarda el id del carrito en el usuario
                addedDate: Date.now()

            }
            const newUserCreate = await this.usersDAOs.create(newUser)
            return newUserCreate

        } catch (error) {
            loggerError.error(error)
        }
    }

    async updateUser(id, user) {
        try {
            const updatedUser = await this.usersDAOs.update(id, user)
            return updatedUser

        } catch (error) {
            loggerError.error(error)
        }
    }

    async deleteUser(id) {
        try {
            const deletedUser = await this.usersDAOs.delete(id)
            return deletedUser

        } catch (error) {
            loggerError.error(error)
        }
    }

    async findEmailAndUser(username, email) {
        try {
            const find = await this.usersDAOs.findUserAndEmail(username, email)
            return find
            
        } catch (error) {
            loggerError.error(error)
        }
    }

    async validPassAndUser(user, pass) {
        try {
            const valid = await this.usersDAOs.validUserAndPass(user, pass)
            return valid

        } catch (error) {
            loggerError.error(error)
        }
    }
}

module.exports = { UsersService }