const multer = require('multer')

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/profiles/pictures')
    },
    filename: (req, file, cb) => {
        // console.log(file); 
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
    }
})

const uploadMulter = multer({
    storage: storage
})

module.exports = uploadMulter

