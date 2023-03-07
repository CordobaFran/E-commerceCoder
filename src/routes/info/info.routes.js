const { Router } = require("express")
const routerInfo = Router()

const { serverInfo, serverData } = require("../../controller/info.controller")

routerInfo.get('/info', serverInfo)
routerInfo.get('/datos', serverData)

module.exports = routerInfo