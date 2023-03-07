const { Router } = require('express')
const router = Router()

const { registerRootGet, registerPost } = require('../../controller/register.controller');
const uploadMulter = require('../../middleware/multer.middleware');


//------------------------------Register------------------------------//

router.get("/register", registerRootGet)

router.post("/register", uploadMulter.single('file'), registerPost)

module.exports = router