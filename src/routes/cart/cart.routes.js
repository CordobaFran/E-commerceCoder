const { Router } = require('express')
const router = Router()

const { cartsAll, cartId, cartCheckout, cartAddproduct, cartDeleteproduct } = require('../../controller/carts.controller')

//Momentaneamente esta ruta esta para desarrollo
router.get('/all', cartsAll)

router.get('/', cartId)

router.put('/:id', cartAddproduct)

router.post('/:id', cartCheckout)

router.delete('/product/:id', cartDeleteproduct)

module.exports = router