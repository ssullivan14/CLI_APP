var mysql = require("mysql");
var inquirer = require("inquirer");
var cli = require('pixl-cli');
var productTable = [];


var connection = mysql.createConnection({
    host: "localhost",

    //port
    port: 3306,

    //username
    user: "root",

    //password
    password: "mysq!Fr33man!",
    database: "bamazon"
});

//connect to mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id");
    displayProducts();
   
});


function purchase(){
    inquirer
    .prompt([{
        name: "item_id",
        type: "input",
        message: "Select the item id of the product you would like to purchase:",
        filter: Number
    
    },
    {
        name: "quantity",
        type: "input",
        message: "How many of items would you like to purchase?",
        filter: Number
    }
    ])
    .then(function(input){
        var item = input.item_id;
        var quantity = input.quantity;
        console.log(item);
        connection.query("SELECT * FROM products WHERE item_id = " + item, function (err, data){
            if (err) throw err;
            // console.log(data);
            console.log("Item is in stock for purchase");
            var newQty = (data[0].stock_quantity - quantity);
            console.log(data[0].stock_quantity);
            updateQuantity(item, newQty);
            displayProducts();
        }) 
    })
}

function updateQuantity(pID, qty){
    connection.query("UPDATE products SET stock_quantity = " + qty + " WHERE item_id = " + pID,  function (err, data) {
        if (err) throw err;
    });
}

function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++){
          productTable.push([
              res[i].item_id,
              res[i].product_name,
              res[i].department_name,
              res[i].price,
              res[i].stock_quantity
          ]);
        }

        var table =  [
            ["item_id", "Product", "Department", "Price", "Quantity"],
             ...productTable
        ];
        console.log("\n")
        cli.print(
            cli.table(table) + "\n");
            productTable = []
            purchase();
    });
};

