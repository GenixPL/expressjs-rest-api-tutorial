const express = require('express')
const morgan = require('morgan')
const app = express()
const mysql = require('mysql')

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

app.get('/user/:id', (req, res) => {
    const connection = mysql.createConnection({
         host: 'localhost',
         user: 'root',
         password: 'sample1234',
         database: 'example_users',
    })

    const userId = req.params.id
    // const queryString = 'SELECT * FROM users WHERE id = ' + userId // (without [] in connection.query)
    const queryString = 'SELECT * FROM users WHERE id = ?'
    connection.query(queryString, [userId], (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
            res.end()
            return
        }

        const users = rows.map((row) => {
            return {
                NAME: row.name,
                ID: row.id,
            }
        })

        res.json(users) // rows
    })

    // res.end()
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