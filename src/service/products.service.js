const { loggerError } = require('../utils/logger')
const ProductsDAOs = require('../daos/productosFactory')

class ProductsService {
    constructor() {
        this.productsDAOs = new ProductsDAOs()
    }

    async getAllProducts() {
        try {
            const productGet = await this.productsDAOs.getAll()
            const allProducts = productGet.map(data => {
                return {
                    id: data._id,
                    img: data.urlImg,
                    title: data.product,
                    price: data.value,
                    description: data.detail,
                    rating: {
                        rate: data.rating.rate,
                        count: data.rating.count
                    },
                    stock: data.stock,
                    category: data.category
                }
            })
            return allProducts

        } catch (error) {
            loggerError.error(error)
        }
    }

    async getProductById(id) {
        try {
            const productGet = await this.productsDAOs.getById(id)
            const product = {
                id: productGet._id,
                img: productGet.urlImg,
                title: productGet.product,
                price: productGet.value,
                description: productGet.detail,
                rating: {
                    rate: productGet.rating.rate,
                    count: productGet.rating.count
                },
                stock: productGet.stock,
                category: productGet.category
            }
            return product

        } catch (error) {
            loggerError.error(error)
        }
    }

    async getProductByUserId(userId) {
        try {
            const productGet = await this.productsDAOs.getProductByUserId(userId)

            const productByUser = productGet.map(data => {
                return {
                    id: data._id,
                    img: data.urlImg,
                    title: data.product,
                    price: data.value,
                    description: data.detail,
                    rating: {
                        rate: data.rating.rate,
                        count: data.rating.count
                    },
                    stock: data.stock
                }
            })
            return productByUser

        } catch (error) {
            loggerError.error(error)
        }
    }

    async getProductByUserCategory(category) {
        try {
            const productGet = await this.productsDAOs.getProductByCategory(category)
            const ProductsByCategory = productGet.map(data => {
                return {
                    id: data._id,
                    img: data.urlImg,
                    title: data.product,
                    price: data.value,
                    description: data.detail,
                    rating: {
                        rate: data.rating.rate,
                        count: data.rating.count
                    },
                    stock: data.stock,
                    category: data.category
                }
            })
            return ProductsByCategory

        } catch (error) {
            loggerError.error(error)
        }
    }

    async createProduct(product) {
        try {
            const newProduct = {
                ...product,
                addedDate: Date.now()
            }
            const newProductCreate = await this.productsDAOs.create(newProduct)
            return newProductCreate

        } catch (error) {
            loggerError.error(error)
        }
    }

    async updateProduct(id, product) {
        try {
            const updatedProduct = await this.productsDAOs.update(id, product)
            return updatedProduct

        } catch (error) {
            loggerError.error(error)
        }
    }

    async deleteProduct(id) {
        try {
            const deletedProduct = await this.productsDAOs.delete(id)
            return deletedProduct

        } catch (error) {
            loggerError.error(error)
        }
    }
}

module.exports = { ProductsService }