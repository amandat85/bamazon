//VARIABLES AND REQUIRE=====================================
//Inquirer
var inquirer = require("inquirer");
//CLI Table
var Table = require("cli-table");
//Chalk
var chalk = require("chalk")
//MySQL
var mysql = require("mysql");
//Figlet
var figlet = require("figlet");
//dotenv
require("dotenv").config();

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

//WElCOME===================================================
figlet("The Rotary Valve", function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
    console.log("A store for all your brass instrument needs");

    //Start
    displayAll();
});
//DISPLAY PRODUCTS==========================================
function displayAll() {
    //Select table
    connection.query("SELECT * FROM products", function (err, res) {
        //Set up table column headings and widths
        var table = new Table({
            head: ["ID", "Product", "Department", "Price", "Quanity"],//extra row is for testing
            colwidths: [10, 25, 25, 10, 14, 14]
        })
        //Loop through table columns and push to table
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, "$" + parseFloat(res[i].price).toFixed(2), res[i].stock_quantity, res[i].product_sales.toFixed(2)])
        }
        console.log(table.toString());
        choice();
    })
}

//USER PURCHASE PROMPT======================================
function choice() {
    inquirer.prompt([
        {
            type: "input",
            name: "itemID",
            message: "What is the ID number of the item you would like to purchase?",
            validate: function (value) {
                if (!isNaN(value)) {
                    return true;
                }
                else {
                    console.log(chalk.red("Please enter a number."));
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "amount",
            message: "How much would you like to buy?",
            validate: function (value) {
                if (!isNaN(value)) {
                    return true;
                }
                else {
                    console.log(chalk.red("Please enter a number."));
                    return false;
                }
            }
        }
    ])
        .then(function (response) {
            var quantityDemand = parseInt(response.amount);
            var IDinput = response.itemID;
            order(IDinput, quantityDemand);
        })
}

//QUANTITY NOTIFICATION=====================================
function order(itemID, amount) {
    connection.query("Select * FROM products WHERE item_id = " + itemID, function (err, res) {
        if (err) throw err;
        if (res[0].stock_quantity >= amount) {
            // Update Price
            var customerPrice = amount * res[0].price;
            console.log(chalk.cyan("\nThank you for your order. The total cost is $" + customerPrice.toFixed(2) + ".\n"));
            connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: res[0].stock_quantity - amount,
                        product_sales: res[0].product_sales + customerPrice
                    },
                    {
                        item_ID: itemID
                    }
                ],
            )
            morePurchases();
        }
        else {
            console.log(chalk.cyan("\nInsufficient quantity, sorry we do not have enough " + res[0].product_name.toUpperCase() + " to complete your order.\n"));
            morePurchases();
        };

    });
};

//MORE PURCHASES?===========================================
function morePurchases() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to continue shopping?",
            name: "purchases"
        }
    ])
        .then(function (response) {
            if (response.purchases) {
                displayAll();
            }
            else {
                exit();
            }
        });
};

//GOODBYE===================================================
function exit() {
    connection.end();
    console.log(chalk.blue("\nThank you for shopping THE ROTARY VALVE. We hope to see you again soon. GoodBye\n"));
}
