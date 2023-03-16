const { ProductsService } = require('../service/products.service')
const productos = new ProductsService()


const getNewProduct = async (req, res) => {
    res.render('productAdd')
}

const getOnlyProducts = async (req, res) => {

    const products = await productos.getAllProducts()

    res.json({ products })
}

const getProducts = async (req, res) => {

    const products = await productos.getAllProducts()
    const userId = req.user._id
    // const username = users.find(user => user.id === req.session.passport.user).username
    !req.user ? username = "no definido" : username = req.user.username

    res.render('main', { products, username, userId })
    // res.json( {products}) 
}

const getProductId = async (req, res) => {
    const cartId = req.user.cartId

    const id = req.params.id
    const product = await productos.getProductById(id)

    res.render('productDetail', { product, cartId })
    // res.json(await productos.getProductById(id))
}

const getProductByCategory = async (req, res) => {
    const category = req.query.cat
    const productByCat = await productos.getProductByUserCategory(category)

    res.status(201).render('productsCategory', { productByCat, category })
}

const postProducts = async (req,res) => {
    const userId = req.user._id
    let product = req.body
    
    if (!req.file) {
        productPic = product.urlImg
    } else {
        let filePath = req.file.path
        let publicFilePath = filePath.substring(6)
        productPic = publicFilePath
    }

    product = {
        ...product,
        urlImg: productPic,
        author: userId
    }
    await productos.createProduct(product)

    res.status(201).redirect(`/user?id=${userId}`)
}

const getEditProduct = async (req, res) => {
    const id = req.params.id
    const cartId = req.user.cartId
    const product = await productos.getProductById(id)
    res.render('productEdit', { product, cartId })
}

const editProduct = async (req, res) => {
    const id = req.params.id
    const productData = req.body
    res.json(await productos.updateProduct(id, productData))
}

const deleteProduct = async (req, res) => {
    const id = req.params.id
    res.json(await productos.deleteProduct(id))
}

module.exports = {
    getProducts,
    getProductId,
    editProduct,
    deleteProduct,
    getOnlyProducts,
    getNewProduct,
    getProductByCategory,
    postProducts,
    getEditProduct
}