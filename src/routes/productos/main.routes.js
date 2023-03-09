const { Router } = require('express')
const router = Router()

const uploadMulter = require('../../middleware/multer.middleware');

const { getProducts, getProductId, editProduct, deleteProduct, getOnlyProducts, getNewProduct, getProductByCategory, postProducts } = require('../../controller/products.controller')

router.get("/products", getOnlyProducts)

router.get("/products/new", getNewProduct)

router.post("/products/new",uploadMulter.single('file'), postProducts)

router.get("/product/category", getProductByCategory)

router.get("/product/:id", getProductId)

router.get("/", getProducts)

router.put("/:id", editProduct)

router.delete("/:id", deleteProduct)

module.exports = router