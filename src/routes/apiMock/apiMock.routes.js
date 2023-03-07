const { Router } = require('express')
const router = Router()

const productsFaker = require('../../controller/productsFaker.controller')

router.get('/productos-test', productsFaker)

module.exports = router