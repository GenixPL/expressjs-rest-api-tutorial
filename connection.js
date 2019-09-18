const mysql = require('mysql')

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'sample123',
//     database: 'example_users',
// })

// it's better to use a pool of connections istead of a single connection
// (not needed in small, simple apps)
// https://www.guidearea.com/best-database-practices-single-connection-vs-connection-pool/ 
const connection = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-iron-east-02.cleardb.net',
    user: 'b68e2064709296',
    password: 'c7cb2362',
    database: 'heroku_35e9a9a60bbfe9c',
})

module.exports = connection