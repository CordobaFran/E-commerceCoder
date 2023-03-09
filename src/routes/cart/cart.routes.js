const { Router } = require('express')
const router = Router()

const { cartsAll, cartId, cartCheckout, cartAddproduct } = require('../../controller/carts.controller')

//Momentaneamente esta ruta esta para desarrollo
router.get('/', cartsAll)

router.get('/:id', cartId)

router.put('/:id', cartAddproduct)

router.post('/:id', cartCheckout)

module.exports = router