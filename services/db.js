const mysql = require('mysql')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "contacts_app",
    multipleStatements: true,


}) 

connection.connect((err) => {
    if(err) throw err
    console.log('My sql Connected...')
})

module.exports = connection;