const express = require('express')
const morgan = require('morgan')
const app = express()
const parser = require('body-parser')
const router = require('./routes/user.js')

app.use(morgan('dev'))
app.use(express.static('./public'))
app.use(parser.urlencoded({extended: false}))
app.use(router)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log('server is up')
})


app.get('/', (req, res) => {
    res.send('root path')
})
