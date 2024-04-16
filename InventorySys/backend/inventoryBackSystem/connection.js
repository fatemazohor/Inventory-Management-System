const mysql = require('mysql');
var connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "1234",
    database: "books"
});

connection.connect((err) => {
    if(!err) {
        console.log("Connected to mysql.");
    } else {
        console.log(err);
    }

});
module.exports = connection;