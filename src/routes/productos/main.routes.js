const { Router } = require('express')
const router = Router()

const uploadMulter = require('../../middleware/multer.middleware');

const { getProducts, getProductId, editProduct, deleteProduct, getOnlyProducts, getNewProduct, getProductByCategory, postProducts, getEditProduct } = require('../../controller/products.controller')

router.get("/products", getOnlyProducts)

router.get("/products/new", getNewProduct)

router.post("/products/new",uploadMulter.single('file'), postProducts)

router.get("/product/category", getProductByCategory)

router.get("/product/:id", getProductId)

router.get("/product/:id/edit", getEditProduct)

router.put("/product/:id/edit",uploadMulter.single('file'), editProduct)

router.delete("/product/:id", deleteProduct)

router.get("/", getProducts)


module.exports = router