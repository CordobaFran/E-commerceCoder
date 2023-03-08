const productsCreate = require('../service/productsFaker.service')
const { loggerError } = require('../utils/logger')

const productsFaker = async (req, res, next) => {

    res.status(200).json(await productsCreate(req.query.cant))

}

module.exports = productsFaker

