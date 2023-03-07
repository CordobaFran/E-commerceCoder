const path = require('path')

const { fork } = require('child_process')
const forked = fork(path.resolve(__dirname, '../routes/random/numerosRandom.js'))

const randomForked = (req, res) => {
    const qty = () => {
        if (req.query.cant){
            return req.query.cant
        } else {
            return 100000000
        }
    }

    forked.send(parseInt(qty()))
    forked.once('message', msg => {
       return res.json(msg)
    })
}

module.exports = randomForked