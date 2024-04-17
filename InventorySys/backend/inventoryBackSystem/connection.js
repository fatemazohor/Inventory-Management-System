const mysql = require('mysql');
const env = require('dotenv').config();
var connection = mysql.createConnection({
    port: process.env.MYSQL_PORT,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
    // port: 3306,
    // host: "localhost",
    // user: "root",
    // password: "1234",
    // database: "inventory_management"
});

connection.connect((err) => {
    if(!err) {
        console.log("Connected to mysql.");
    } else {
        console.log(err);
    }

});
module.exports = connection;