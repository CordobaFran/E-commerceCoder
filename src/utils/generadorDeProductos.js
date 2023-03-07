const { faker } = require('@faker-js/faker')

const { lorem, commerce, image } = faker

faker.locale = 'es'

function generarProducto() {
    return {
        product: commerce.productName(),
        detail: lorem.paragraph(),
        value: commerce.price(),
        urlImg: image.image(),
        rating: {
            rate: numbers().rate,
            count: numbers().count
        },
        stock: numbers().stock
    }
}

const numbers = () => {
    const rate = Math.floor(Math.random()*6)
    const count = Math.floor(Math.random()*200)
    const stock = Math.floor(Math.random()*150)
    return { rate, count, stock}
}

module.exports = { generarProducto }