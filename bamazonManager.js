//VARIABLES AND REQUIRE=====================================
//Inquirer
var inquirer = require("inquirer");
//CLI Table
var Table = require("cli-table");
//Chalk
var chalk = require("chalk")
//MySQL
var mysql = require("mysql");
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
    menuOptions();
});

//MENU OPTIONS===========================================
function menuOptions() {
    inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "Please select a task from the options below:",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
        }
    ])
        .then(function (response) {
            switch (response.options) {
                case "View Products for Sale":
                    displayAll();
                    break;
                case "View Low Inventory":
                    displayInventory();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    addProduct();
                    break;
                case "Exit":
                    exit();
                    break;
            }
        })
}

//ALL PRODUCTS FOR SALE================================
function displayAll() {
    // Select table
    connection.query("SELECT * FROM products", function (err, res) {
        //Set up table column headings and widths
        var table = new Table({
            head: ["ID", "Product", "Department", "Price", "Quanity"],
            colwidths: [10, 25, 25, 10, 14]
        })
        //Loop through table columns and push to table
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, "$" + parseFloat(res[i].price).toFixed(2), res[i].stock_quantity])
        }
        console.log(table.toString());
        menuOptions();
    })
}
//LOW INVENTORY=========================================
function displayInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        //Set up table column headings and widths
        var table = new Table({
            head: ["ID", "Product", "Department", "Price", "Quanity"],
            colwidths: [10, 25, 25, 10, 14]
        })
        //Loop through table columns and push to table
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, "$" + parseFloat(res[i].price).toFixed(2), res[i].stock_quantity])
        }
        console.log(table.toString());
        menuOptions();
    })
}

//ADD TO INVENTORY======================================
function addInventory() {
    inquirer.prompt([
        {
            name: "addID",
            type: "input",
            message: "What item would you like to add stock to?"
        },
        {
            name: "addQ",
            type: "input",
            message: "How much would you like to add to the stock quantity?",
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
    ]).then(function (response) {
        // Pushes new stock to database.
        connection.query("SELECT * FROM products", function (err, res) {
            var chosenItem;
            // Gets product who's stock needs to be updated.
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id === parseInt(response.addID)) {
                    chosenItem = res[i];
                }
            }
            // Adds new stock to existing stock.
            var updatedStock = parseInt(chosenItem.stock_quantity) + parseInt(response.addQ);
            console.log(chalk.magenta("\nYour item is restocked.\n"));
            // Updates stock for selected product in database.
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: updatedStock
            }, {
                item_id: response.addID
            }], function (err, res) {
                if (err) throw err;
                else {
                    menuOptions();
                }
            });
        });
    });
};

//ADD NEW PRODUCT========================================
function addProduct() {
    inquirer.prompt([
        {
            type: "input",
            name: "productName",
            message: "What product would you like to add?"

        },
        {
            type: "list",
            name: "productDepartment",
            message: "Which department does the product belong to?",
            choices: ["Brass Accessories", "Cases", "Mouthpieces", "Mutes"]
        },
        {
            type: "input",
            name: "price",
            message: "What is the price of the product?",
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
            name: "quantity",
            message: "How much quantity would you like to add?",
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
            connection.query("INSERT INTO products SET ?",
                {
                    product_name: response.productName,
                    department_name: response.productDepartment,
                    price: response.price,
                    stock_quantity: response.quantity
                },
                function (err) {
                    if (err) throw err;
                    console.log("Item successfully added");
                    displayAll();
                }
            );
        })
}

//EXIT=====================================
function exit() {
    connection.end();
}
