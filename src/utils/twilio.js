const twilio = require('twilio')
const { loggerError } = require('./logger')
const options = require('../../options/options')


const { sid, token, smsActivated, wsapActivated } = options.options.twilio

async function twilioSms(sellData) {
    const accountSid = sid
    const authToken = token

    const client = twilio(accountSid, authToken)

    const { username } = sellData

    if (smsActivated) {
        try {
            await client.messages.create({
                body: `Felicidades ${username}, Tu pedido ya se encuentra en proceso!`,
                from: '+12766246170',
                to: '+541136456799'
            })


        } catch (error) {
            loggerError.error(error)
        }
    }
}

async function twilioWsap(sellData) {
    const accountSid = sid
    const authToken = token

    const client = twilio(accountSid, authToken)

    const { username, email, products } = sellData

    const productsToWsp = products.map(el => {
        const { producto, qty } = el
        return `${producto}: ${qty} unidades`
    }).join("\n\t\t\t\t\t\t\t\t")

    if (wsapActivated) {
        try {
            await client.messages.create({
                body: `
        Se realizó un pedido nuevo de: 
            *Usuario:* ${username}
            *E-mail:* ${email}
            *pedido:* 
                ${productsToWsp}`,

                from: 'whatsapp:+14155238886',
                to: 'whatsapp:+5491136456799'
            })

        } catch (error) {
            loggerError.error(error)
        }
    }

}

module.exports = {
    twilioSms,
    twilioWsap
}

