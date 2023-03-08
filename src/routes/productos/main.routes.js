const { Router } = require('express')
const router = Router()

const { getProducts, getProductId, editProduct, deleteProduct, getOnlyProducts, getNewProduct, getProductByCategory } = require('../../controller/products.controller')

router.get("/products", getOnlyProducts)

router.get("/products/new", getNewProduct)

router.get("/product/category", getProductByCategory)

router.get("/product/:id", getProductId)

router.get("/", getProducts)

router.put("/:id", editProduct)

router.delete("/:id", deleteProduct)

module.exports = router