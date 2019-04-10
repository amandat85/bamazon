//VARIABLES AND REQUIRE=====================================
//dotenv
require("dotenv").config();
//MySQL
var mysql = require("mysql");

//CONNECTION================================================
var connection = mysql.createConnection({
    host: "localhost",

    // Port
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: process.env.ROOT_PASSWORD,
    database: "bamazon_db"
});

//Check connection
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;