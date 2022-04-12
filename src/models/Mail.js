const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function sendEmailConfirmationHTML(CustomerName, orderNro) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            .response{
                width: 100%;
                height: auto;
            }
        </style>
    </head>
    <body>
        <img src="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt0725a572113a296a/62508fcc4edd947eefb3d4ba/V_Cyber-RED_televisores_Mob2.jpg?auto=webp&quality=70&width=100p" class="responsive" alt="">
    </body>
    </html>`
}

function getMessage(emailParams) {
    return{
        to:emailParams.toEmail,
        from: 'juan.1701812756@ucaldas.edu.co',
        subject:'Confirmacion orden de compra de BLACKFRIDAY',
        text:`Hola ${emailParams.CustomerName}, te enviamos las imagenes de los productos comprados`, 
        html: sendEmailConfirmationHTML(
            emailParams.CustomerName,
            emailParams.orderNro
        )
    }
}

async function sendOrder(emailParams) {
    try {
        await sgMail.send(getMessage(emailParams))
        return { message: 'Confirmacion de compra enviada'}
    } catch (err) {
        const message = 'No se pudo enviar la orden de compra.Valide los errores'
        console.log(message);
        console.log(err);
        if (err.response) console.error(err.response.body);
        return { message}
    }
}