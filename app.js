const express = require('express')
const morgan = require('morgan')
const app = express()
const mysql = require('mysql')
const parser = require('body-parser')

app.use(morgan('dev'))
app.use(express.static('./public'))
app.use(parser.urlencoded({extended: false}))


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sample123',
    database: 'users_example',
})


app.listen(3003, () => {
    console.log('server is up')
})


app.get('/', (req, res) => {
    res.send('get method')
})

app.get('/users', (req, res) => {
    const queryString = 'SELECT * FROM users'
    connection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
            res.end()
            return
        }

        res.send(rows)
    })

})

app.get('/user/:id', (req, res) => {
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


app.post('/user_create', (req, res) => {
    const userName = req.body.name_field
    const queryString = 'INSERT INTO users (name) VALUES (?)'
    connection.query(queryString, [userName], (err, results, fields) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
            res.end()
            return
        }

        // res.sendStatus(200) // can't send two sends at the same time
        // in order to check fields, we have to user debugger sometimes 
        // (e.g. for 'results.insertId')
        res.send('User was added (' + results.insertId + ')')
    })
})