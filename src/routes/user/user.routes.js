const { Router } = require('express')
const router = Router()

const userController = require("../../controller/user.controller");

router.get("/", userController)

module.exports = router