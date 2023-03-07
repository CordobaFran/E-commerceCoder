const normalizr = require('normalizr')
const { schema, normalize, denormalize } = normalizr

// const chatMsjs = require("../db/chatMsg")
const util = require('util')

const fs = require('fs')
const { loggerConsole } = require('./logger')
const chatMsjsJson = './db/chatMsg.json'

function print(text = "", objeto) {
    loggerConsole.Info(text, util.inspect(objeto, false, 12, true))
}

const user = new schema.Entity('users', {}, { idAttribute: "email" })
const message = new schema.Entity('messages')
const comment = new schema.Entity('comments', {
    author: user,
    messages: message
})
const article = new schema.Entity('articles', {
    author: user,
    messages: [comment]
})
const post = new schema.Entity('posts', {
    posts: [article]
})


const chatMsjs = JSON.parse(fs.readFileSync(chatMsjsJson))

const normalizedChatpost = normalize(chatMsjs, post)
const denormalizedChatPost = (data = normalizedChatpost) => denormalize(data.result, post, data.entities)

// print("NORMALIZADO", normalizedChatpost);
// print("DENORMALIZADO", denormalizedChatPost);

module.exports = { normalizedChatpost, denormalizedChatPost, post }
