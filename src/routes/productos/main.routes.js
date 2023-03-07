const { Router } = require('express')
const router = Router()

const { getProducts, getProductId, editProduct, deleteProduct, getOnlyProducts, getNewProduct } = require('../../controller/products.controller')

router.get("/products", getOnlyProducts)

router.get("/products/new", getNewProduct)

router.get("/", getProducts)

router.get("/product/:id", getProductId)

router.put("/:id", editProduct)

router.delete("/:id", deleteProduct)

module.exports = router