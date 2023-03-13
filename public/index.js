const socket = io.connect()
let denormalizado

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

// ----------------------  CHAT FUNCTIONS ------------------------

const sendMessage = () => {

    const newMessage = document.getElementById('message').value

    socket.emit('new-message', newMessage)
    return false

}

// This function render the msg swapping the color and position if
// you are the user who sent the msg
const renderMessages = (data) => {
    let ownMsg

    if (document.getElementById('messages')) {
        const html = data.msgs.map((el) => {
            if (el.author.id == data.userId) {
                ownMsg = { "align": "text-end", "color": "bg-info" }
            } else {
                ownMsg = { "align": "text-start", "color": "bg-secondary" }
            }
            return (`
            <div class=${ownMsg.align}>
                <div class='${ownMsg.color} p-2 mx-2 textBox'>
                    <stroke class="fw-bold fs-6">${el.author.alias}</stroke> <br>
                    <span class="fs-6 fw-light font-monospace msj">${el.message}</span><br>
                    <span class="d-flex flex-row-reverse time">${date(el.date)}</span>
                </div>
            </div>
            `)
        }).join("<br>")

        document.getElementById('messages').innerHTML = html

        let messageBody = document.querySelector('#messages');
        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight
    }
}

const date = (datems) => {
    const date = new Date(datems)


    return date.toLocaleString()
}

// ----------------------  RECIVE MSGS FROM SERVER AT BEGINING ------------------------

socket.on('messages', async data => {
    renderMessages(data)
})

// ----------------------  RECIVE MSGS AFTER SENT MSG ------------------------

socket.on('messages-sv', data => {
    renderMessages(data)
})


//------------------------ Function to add product by socket -------------------------------
// const addProduct = () => {
//     const newProduct = {
//         "product": document.getElementById("product").value,
//         "value": document.getElementById("value").value,
//         "urlImg": document.getElementById("urlImg").value
//     }
//     socket.emit('add-product', newProduct)

//     return false
// }


//------------------------ Renderizado de productos en tiempo real -------------------------------

// const renderProducts = (data) => {
//     if (data) {
//         const html = data.map((el) => {
//             if (el.urlImg == null || el.urlImg == "") {
//                 return (`
//                 <a href=${el._id}>
//                     <tr>
//                         <td class="px-5">
//                             <a href=/product/${el._id}>
//                                 ${el.product}
//                             </a>
//                         </td>
//                         <td class="px-5">
//                             ${el.value}
//                         </td>
//                         <td class="px-5">
//                             <img src="${"https://ferreteriaelpuente.com.ar/wp-content/uploads/2015/08/sin-imagen.png"}" class="h-auto" style="object-fit: cover; width: 75px;">
//                         </td>
//                     </tr>
//                 </a>
//                 `)
//             } else {
//                 return (`
//                 <tr>
//                     <td class="px-5">
//                         <a href=/product/${el._id}>
//                             ${el.product}
//                         </a>
//                     </td>
//                         <td class="px-5">
//                             ${el.value}
//                         </td>
//                         <td class="px-5">
//                             <img src="${el.urlImg}" class="h-auto" style="object-fit: cover; width: 75px;">
//                         </td>
//                 </tr>
//                 `)
//             }
//         }).join(" ")
//         if (document.getElementById('products')) {
//             document.getElementById('products').innerHTML = html
//         }
//     } else {
//         console.warn("No hay productos")
//     }
// }

// socket.on("products-sv", data => {
//     renderProducts(data)
// })

// ---------------------- PUSH NEW MSJ TO MSJS ------------------------

// const pushNewMsg = (newMsg) => {
//     const denormalizedMsgs = denormalizado.posts[0].messages
//     const lastId = denormalizedMsgs[denormalizedMsgs.length - 1].id + 1
//     newMsg = { id: lastId, ...newMsg }
//     return newMsg
// }

// ---------------------- SCHEMA NORMALIZR ------------------------

// const user = new normalizr.schema.Entity('users', {}, { idAttribute: "email" })
// const message = new normalizr.schema.Entity('messages')
// const comment = new normalizr.schema.Entity('comments', {
//     author: user,
//     messages: message
// })
// const article = new normalizr.schema.Entity('articles', {
//     author: user,
//     messages: [comment]
// })
// const post = new normalizr.schema.Entity('posts', {
//     posts: [article]
// })