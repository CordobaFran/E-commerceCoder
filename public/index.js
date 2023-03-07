const socket = io.connect()
let denormalizado


const addProduct = () => {
    const newProduct = {
        "product": document.getElementById("product").value,
        "value": document.getElementById("value").value,
        "urlImg": document.getElementById("urlImg").value
    }
    socket.emit('add-product', newProduct)

    return false
}

const renderProducts = (data) => {
    if (data) {
        const html = data.map((el) => {
            if (el.urlImg == null || el.urlImg == "") {
                return (`
                <a href=${el._id}>
                    <tr>
                        <td class="px-5">
                            <a href=/product/${el._id}>
                                ${el.product}
                            </a>
                        </td>
                        <td class="px-5">
                            ${el.value}
                        </td>
                        <td class="px-5">
                            <img src="${"https://ferreteriaelpuente.com.ar/wp-content/uploads/2015/08/sin-imagen.png"}" class="h-auto" style="object-fit: cover; width: 75px;">
                        </td>
                    </tr>
                </a>
                `)
            } else {
                return (`
                <tr>
                    <td class="px-5">
                        <a href=/product/${el._id}>                
                            ${el.product}
                        </a>                
                    </td>
                        <td class="px-5">
                            ${el.value}
                        </td>
                        <td class="px-5">
                            <img src="${el.urlImg}" class="h-auto" style="object-fit: cover; width: 75px;">
                        </td>
                </tr>
                `)
            }
        }).join(" ")
        if (document.getElementById('products')) {
            document.getElementById('products').innerHTML = html
        }
    } else {
        console.warn("No hay productos")
    }
}

socket.on("products-sv", data => {
    renderProducts(data)
})

//----Carritos----
const renderCarts = (cartsData) => {

    const html = cartsData.map((el) => {
        return (`
        <tr>
            <td class="px-5">
                ${cartsData.indexOf(el)}
            </td>
            <td class="px-5">
                <a href="./cart/${el._id}">${el._id}</a>
            </td>
        </tr>
        `)
    }).join(" ")


    if (document.getElementById('carts')) {
        document.getElementById('carts').innerHTML = html
    }
}

socket.on("carts", data => {
    renderCarts(data)
})

//----Chat----

const sendMessage = () => {
    const date = new Date().toLocaleString()
    const newMessage = {
        author: {
            "email": document.getElementById('email').value,
            "name": document.getElementById('name').value,
            "lastname": document.getElementById('lastname').value,
            "age": document.getElementById('age').value,
            "alias": document.getElementById('alias').value,
            "avatar": document.getElementById('avatar').value,
        },
        "message": document.getElementById('message').value,
        "date": date
    }
    document.getElementById('message').value = ""

    const denormalizedMsgs = denormalizado.posts[0].messages
    denormalizedMsgs.push(pushNewMsg(newMessage))

    const posts = {
        id: "999",
        posts: [
            {
                id: 1,
                author: denormalizado.posts[0].author,
                messages: denormalizedMsgs
            }]
    }

    const normalizedMsgs = normalizr.normalize(posts, post)

    socket.emit('new-message', normalizedMsgs)
    return false
}

const renderMessages = (data) => {
    let ownMsg

    if (document.getElementById('messages')) {
        const email = document.getElementById('email').value

        const html = data.map((el) => {
            if (email == el.author.email) {
                ownMsg = { "align": "text-end", "color": "bg-info" }
            } else {
                ownMsg = { "align": "text-start", "color": "bg-secondary" }
            }
            return (`
            <div class=${ownMsg.align}>
                <div class='${ownMsg.color} p-2 mx-2 textBox'>
                    <stroke class="fw-bold fs-6">${el.author.alias}</stroke> <br>
                    <span class="fs-6 fw-light font-monospace msj">${el.message}</span><br>
                    <span class="d-flex flex-row-reverse time">${el.date}</span>
                </div>
            </div>
            `)
        }).join("<br>")

        document.getElementById('messages').innerHTML = html

        let messageBody = document.querySelector('#messages');
        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight
    }
}
// ---------------------- PUSH NEW MSJ TO MSJS ------------------------

const pushNewMsg = (newMsg) => {
    const denormalizedMsgs = denormalizado.posts[0].messages
    const lastId = denormalizedMsgs[denormalizedMsgs.length - 1].id + 1
    newMsg = { id: lastId, ...newMsg }
    return newMsg
}

// ---------------------- SCHEMA NORMALIZR ------------------------

const user = new normalizr.schema.Entity('users', {}, { idAttribute: "email" })
const message = new normalizr.schema.Entity('messages')
const comment = new normalizr.schema.Entity('comments', {
    author: user,
    messages: message
})
const article = new normalizr.schema.Entity('articles', {
    author: user,
    messages: [comment]
})
const post = new normalizr.schema.Entity('posts', {
    posts: [article]
})

// ----------------------  SEND DATA TO SERVER ------------------------

socket.on('messages', data => {
    denormalizado = normalizr.denormalize(data.normalizedChatpost.result, post, data.normalizedChatpost.entities)
    renderMessages(denormalizado.posts[0].messages)
    // console.log(denormalizado);
})


socket.on('messages-sv', data => {
    denormalizado = normalizr.denormalize(data.normalizedChatpost.result, post, data.normalizedChatpost.entities)
    // console.log(data, "sv");
    renderMessages(denormalizado.posts[0].messages)
})