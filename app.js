const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('dev'))


app.listen(3003, () => {
    console.log('server is up')
})

app.get('/', (req, res) => {
    res.send('get method')
})

app.get('/users', (req, res) => {
    res.send(users)
})


const users = [
    {
        id: 0,
        name: 'First user'
    },
    {
        id: 1,
        name: 'Second user'
    },
    {
        id: 2,
        name: 'Third user'
    },
]