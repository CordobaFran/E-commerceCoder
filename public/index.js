const socket = io.connect()
let denormalizado

// ----------------------  CART PRODUCT DELETE ------------------------

const deleteProductCart = document.querySelectorAll(`.product__delete__cart`)
deleteProductCart.forEach(el => {
    el.addEventListener('click', async (event) => {
        event.preventDefault()
        const href = document.getElementById(el.id).closest("a").getAttribute("href")

        let miModal = new bootstrap.Modal(document.getElementById('miModal'));
        miModal.show()

        document.querySelector('#miModal .modal-footer .btn-danger').addEventListener('click', async () => {
            // Realizar la acción deseada
            await deleteRouteCart(`/cart${href}`, {}, "DELETE")
            miModal.hide()
        });
    })
})

const deleteRouteCart = async (url, body = {}, method = "DELETE") => {

    try {
        const options = {
            method: method,
            headers: {},
            body: JSON.stringify(body)
        }

        const response = await fetch(url, options)
        if (!response.ok) {
            throw new Error(`No se pudo realizar la accion ${response.status}`)
        } else {
            let toastLiveExample = document.getElementById('liveToast')
            let toast = new bootstrap.Toast(toastLiveExample)
            toast.show()
            setTimeout(() => {
                window.location.href = "/cart"
            }, 3000);
        }

    } catch (error) {
        console.error(error);
    }
}

// ----------------------  PRODUCTS EDIT AND DELETE ------------------------


const deleteProduct = document.querySelectorAll(`.product__delete`)
deleteProduct.forEach(el => {
    el.addEventListener('click', async (event) => {
        event.preventDefault()
        const href = document.getElementById(el.id).closest("a").getAttribute("href")

        let miModal = new bootstrap.Modal(document.getElementById('miModal'));
        miModal.show()

        document.querySelector('#miModal .modal-footer .btn-primary').addEventListener('click', async () => {
            // Realizar la acción deseada
            await deleteRoute(href, {}, "DELETE")
            miModal.hide()
        });
    })
})

const editProduct = document.querySelectorAll(`.product__edit`)
editProduct.forEach(el => {
    el.addEventListener('click', (event) => {
        event.preventDefault()
        const href = document.getElementById(el.id).closest("a").getAttribute("href")
        window.location.href = `${href}/edit`
    })
})

const deleteRoute = async (url, body = {}, method = "DELETE") => {

    try {
        const options = {
            method: method,
            headers: {},
            body: JSON.stringify(body)
        }

        const response = await fetch(url, options)

        if (!response.ok) {
            throw new Error(`No se pudo realizar la accion ${response.status}`)
        } else {
            let toastLiveExample = document.getElementById('liveToast')
            let toast = new bootstrap.Toast(toastLiveExample)
            toast.show()
            setTimeout(() => {
                window.location.href = "/user"
            }, 3000);
        }

    } catch (error) {
        console.error(error);
    }
}


//form edit

const form = document.forms.namedItem('editForm')
if (form) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault()
        const formData = new FormData(form)

        const href = form.getAttribute("id")

        const dataObj = {};
        for (let [key, value] of formData.entries()) {
            dataObj[key] = value;
        }

        const jsonData = JSON.stringify(dataObj);

        try {
            const options = {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            }

            const response = await fetch(`/product/${href}/edit`, options)

            if (!response.ok) {
                throw new Error(`No se pudo realizar la accion ${response.status}`)
            } else {
                let toastLiveExample = document.getElementById('liveToast')
                let toast = new bootstrap.Toast(toastLiveExample)
                toast.show()
                setTimeout(() => {
                    window.location.href = "/user"
                }, 3000);
            }

        } catch (error) {
            console.error(error);
        }
    })
}



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


