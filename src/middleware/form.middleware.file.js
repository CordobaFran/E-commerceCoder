const multer = require('multer')
const path = require('path')


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        // console.log(file); 
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

// let storage = multer.memoryStorage()

const upload = multer({
    storage: storage
})


const file = (req, res, next) => {
    upload.single("file")
    // console.log(req.file);
    // const file = req.file
    // if(!file){
    //     const error = new Error('upload a file')
    //     error.httpStatusCode = 400
    //     return next(error)
    // }
    // // console.log(req);
    // res.send(file)
    next()
}

module.exports = {
    file
}