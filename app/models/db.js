const mysql = require("mysql");
const dbConfig = require("../config/db.config");

const connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: '',
    database: 'yo'
});

connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database");
})

module.exports = connection;
