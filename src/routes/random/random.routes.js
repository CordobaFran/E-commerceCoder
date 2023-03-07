const { Router } = require('express')
const randomRoutes = Router()

const randomForked = require('../../controller/random.controller')

randomRoutes.get('/randoms', randomForked)

module.exports = randomRoutes