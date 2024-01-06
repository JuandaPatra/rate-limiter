const express = require('express')
const cors = require('cors')
const rateLimiter = require('express-rate-limit')
require('dotenv').config()

const PORT = process.env.PORT || 5000

const app = express()


// rate limiter 
const limiter =rateLimiter({
    windowMs:10 * 60 * 1000,
    max :10
})
app.use(limiter)
app.set('trust proxy',1)

app.use('/api', require('./routes'))

app.use(cors())


app.listen(PORT, ()=>console.log(`magic happens in ${process.env.PORT}`))