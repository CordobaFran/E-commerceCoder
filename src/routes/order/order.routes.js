const { Router } = require('express')
const router = Router()

const { getOrder, postOrder } = require('../../controller/orders.controller')

router.get('/order/:id', getOrder)
router.post('/order', postOrder) 

module.exports = router