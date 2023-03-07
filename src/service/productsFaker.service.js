const ApiProductosMock = require('../../api/productos')
const apiProductos = new ApiProductosMock()
const { loggerError } = require('../utils/logger')

const productsCreate = async (qty, next)=>{
    try {

        await apiProductos.deleteall()
        await apiProductos.popular(qty)
        return await apiProductos.getAll()

    } catch (error) {

        loggerError.error(error)
        next(error)

    }
}

module.exports = productsCreate