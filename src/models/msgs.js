const { Schema, model } = require('mongoose')


const msgsCollection = 'msgs'

const msgsSchema = new Schema({
    author: {
        id: { type: String, require: true },
        alias: { type: String, require: true, max: 150 },
        avatar: { type: String, require: true }
    },
    message: { type: String, require: true },
    date: { type: Number, require: true }
})

const MsgsModel = model(msgsCollection, msgsSchema)

module.exports = { MsgsModel }