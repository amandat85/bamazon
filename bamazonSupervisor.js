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
    menuOptionsSup();
});

//MENU OPTIONS====================================
function menuOptionsSup() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Please select an option:",
            choices: ["View Product Sales by Department", "Create New Department", "Exit"]
        }
    ])
        .then(function (response) {
            //Switch Case
            switch (response.choice) {
                case "View Product Sales by Department":
                    departmentSales();
                    break;
                case "Create New Department":
                    newDepartment();
                    break;
                case "Exit":
                    exit();
                    break;
            }
        })
}
//SALES BY DEPARTMENT=========================================
function departmentSales() {
    connection.query("SELECT departments.department_id, departments.department_name, departments.overhead_costs, SUM(products.product_sales) AS total_products_sales, SUM(products.product_sales) - overhead_costs AS difference FROM departments INNER JOIN products ON departments.department_name = products.department_name GROUP BY department_name, department_id, overhead_costs", function (err, res) {
        console.log(err);
        //Set up table column headings and widths
        var table = new Table({
            head: ["ID", "Department", "Over Head Costs", "Product Sales", "Total Profits"],
            colwidths: [10, 25, 25 ,25, 25]
        })
        //Loop through table columns and push to table
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].department_id, res[i].department_name, "$" + res[i].overhead_costs.toFixed(2), "$" + res[i].total_products_sales.toFixed(2), "$" + res[i].difference])
        }
        console.log(table.toString());
        menuOptionsSup();
    })
}

//CREATE NEW DEPARTMENT=========================
function newDepartment(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What department would you like to create?"
        },
        {
            type: "input",
            name: "cost",
            message: "What is the over head cost of running this department?"
        }
    ]).then(function(response) {
        connection.query(
            "INSERT INTO departments SET ?",
            [{
                department_name: response.name,
                overhead_costs: parseFloat(response.cost).toFixed(2),
            }],
            function(err, res){
                if (err) throw err
                console.log(response.name + " has been added to the store.")
                menuOptionsSup();
            }
        )
    })
}

//GOODBYE===================================================
function exit(){
    connection.end();
    console.log("GoodBye.");
}