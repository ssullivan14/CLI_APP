var mysql = require("mysql");
var inquirer = require ("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    //port
    port: 8080,

    //username
    user: "root",

    //password
    password: "mysq!Fr33man",
    database: "bamazon"
});

//connect to mysql server and sql database
connection.connect(function(err) {
    // if (err) throw err;
    console.log("connected as id " + connection.threadID);
//run start function after the connection is made to prompt the user
});

//function which prompts the user for what action to take