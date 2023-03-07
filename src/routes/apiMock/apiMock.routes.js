const { Router } = require('express')
const router = Router()

const productsFaker = require('../../controller/productsFaker.controller')
const randomForked = require('../../controller/random.controller')

router.get('/productos-test', productsFaker)
router.get('/randoms', randomForked)

module.exports = router