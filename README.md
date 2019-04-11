# Bamazon
An Amazon-like storefront with MySQL. 

## Repository
https://github.com/amandat85/bamazon

## Tools, Technology and Languages Used
* Node.js
* JavaScript
* mySQL
* npm mysql
* npm dotenv
* npm chalk
* npm figlet
* npm inquirer
* npm cli-table

## Setup Files and Database
 1. Clone/download the repository from the following github page: https://github.com/amandat85/bamazon
 2. Create a .gitignore file. In this .gitignore file add the following file names:
    ```
    .DS_Store
    node_modules
    ```
3. You will also need access to mySQL server https://dev.mysql.com/downloads/mysql/
4. You will also need access to mySQL Workbench or a similar application to run mySQL code https://www.mysql.com/products/workbench/     

## Setup NODE and NPM
1. Check that you have node.js and node package manager (npm) installed. To do this open the terminal and type `node -v` and then `npm -v`. If a version number shows up, you have it installed. If nothing shows up then you need to do some installations. To install node.js and npm you can simply install node and it will take care of both: https://nodejs.org/en/
2. Next, navigate to the directory holding the cloned or downloaded the bamazon repository.
3. When in th repository directory run `npm install`
4. This should install the following node modules and their dependencies:
    * chalk
    * figlet
    * inquirer
    * dotenv
    * mySQL

Make sure to navigate to the proper directory in the terminal. This will likely be a folder called `bamazon.` You'll need to be in this directory to run the program.

## Challenge 1 - Customer
View this video demo: https://drive.google.com/file/d/19VOnQ60ksc_sDUicK5H8I8V6napbhB1r/view
1. To run Bamazon Customer you will need to run `node bamazonCustomer.js` in the terminal
2. To purchase a product enter the product's id number and the total quantity for purchase.
3. If there isn't enough quantity of the item in stock, the purchase will not go through.

## Challenge 2 - Manager
View this video demo https://drive.google.com/file/d/1AxSOLF5WI0dmaj4S1GAP-xocvCO_Ql9r/view
1. To run Bamazon Manager you will need to run `node bamazonManager.js`in the terminal.
2. As the manager, you will have a list of 4 items to choose from.
3. `View Products for Sale`will display all items in the inventory available for purchase.
4. `View Low Inventory` will display all items that have less than five (5) items in stock.
5. `Add to Inventory` will allow the manager to add stock to the inventory by specifying the item ide of the product and the quantity to add to the stock.
6. `Add New Product` will allow the manager to add a brand new product to the inventory by specifying the name of the item, the department the item belongs to, the cost of the item and the number of stock of the item.

## Challenge 3 - Supervisor
View this video demo https://drive.google.com/file/d/1oxdha9pd0B3vUiAwX_3cRRaF2_dopll7/view
1. To run Bamazon Manager you will need to run `node bamazonSupervisor.js`in the terminal.
2. As the supervisor you will have a list of 2 items to choose from.
3. `View Products Sales by Department` will display the over head costs and profit for each department.
4. `Create New Department` allows the Supervisor to create a new department by specifying the name of the department and the over head costs for that department.


Press Ctrl + C to exit the application at anytime.