require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_ACCOUNT_TOKEN
const twilio_client =  require('twilio')(accountSid,authToken)
const phone_number = process.env.TWILIO_PHONE_NUMBER
const { Router } = require('express');
const express = require('express');
const {logErrors,errorHandler, boomErrorHandler} = require('./src/handlers/error.handler.js')
const app = express();
const routerApi = Router()


twilio_client.messages
    .create({
        body:'Prueba de twilio.Programacion III. U de Caldas - 2022',
        from: phone_number,
        to :'+573133186248'
    })
    .then((message)=>{console.log(message.sid);})

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.post('/api/email/confirmacion', async (req, res, next) =>{
    try {
        res.json(await email.sendOrder(req.body))
    } catch (error) {
        next(error)
    }
})

app.use((err,req, res, next)=>{
    const statusCode = err.statusCode || 500
    console.error(err.message, err.stack);
    res.status(statusCode).json({message:err.message})
    return
})

app.use(express.json());
app.use(logErrors)
app.use(errorHandler)
app.use(boomErrorHandler)

routerApi(app)