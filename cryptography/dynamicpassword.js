const cron = require('node-cron')
const fs = require('fs')
const jwt = require('jsonwebtoken')
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const secretKey = process.env.JWT_SECRET_KEY;

cron.schedule ('0 0 * * 0',() => {
    const newSecretKey  =  generateNewSecretKey()

    updateSecretKey(newSecretKey)


    console.log('secret key rotated')
})

const generateNewSecretKey = () => {
    return (Math.random() * 100).toString(36).slice(-16)
}
const updateSecretKey = (newSecretKey) => {
    process.env.JWT_SECRET_KEY = newSecretKey;
}

