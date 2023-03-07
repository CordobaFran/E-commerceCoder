const { createTransport } = require("nodemailer");
const { loggerError } = require("./logger");

const DEST_MAIL = 'francocordobafs@gmail.com'

const TEST_MAIL = 'francocordobaservidor@gmail.com'

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: 'jswyydpfejxrmypc'
    },
    tls: {
        rejectUnauthorized: false
    }
});

async function nodeMailerCart(sellData) {

    const { username, email, products } = sellData

    const productsToMail = products.map(el => {
        const { producto, qty } = el
        return `
            <li>
                ${producto}: ${qty} unidades
            </li> 
    `
    }).join(" ")

    const mailOptions = {
        from: 'Servidor',
        to: DEST_MAIL,
        subject: `Nuevo pedido de ${username}`,
        html: `    <h1 style="color: blue;"> Nuevo pedido realizado </h1>
                    <p>Username: ${username}</p>
                    <p>email: ${email}</p>
                    <p>products:</p>
                    <ul>${productsToMail}</ul>
        `
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        info
    } catch (error) {
        loggerError.error(error)
    }
}

module.exports = nodeMailerCart
