// npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

// Creating a connection to SQL

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as item_id" + connection.threadId)
    display_products();
});

function startUp() {
    console.log("Welcome to Bamazon!");
    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "Would you like to buy something?",
        choices:[
            "Select an item by ID",
            "Buy an item"
        ]
    }]).then(answers =>{
        if (answers.action == "Choose product by ID") {
            itemId();
        }
        if (answers.action == "Buy Product") {
            purchase();
        }
    })
}

function itemId() {
    console.log("purchase an item by ID?")
    console.log(itemId);
 var forSale =[{
     type: 'input',
     name: 'item_id',
     message: 'Would like to purchase something cool?'
 },
{
    type: 'input',
    name: 'item_qauntity',
    message: 'How many cool things would you like to buy?'
}];

inquirer.prompt(forSale).then(answers => {
    var query = connection.query(
        "SELECT * FROM bamazon_db.products",
        {
            item_id: answers.item_id,
            item_type: answers.item_qauntity,
        },
        function (err, res) {
            console.log("added " + answers.item_id + " thank you for your purchase!")
        }
    )
})
}

function display_products() {
    connection.query(
        "SELECT * FROM bamazon_db.products",
        function (err, products) {

            console.log(`product: ${products.item_id}| ${products.product_name} | price: ${products.price}`)
            for (let i = 0; i < products.length; i++) {
               
            }
            promptUser()
        }
    )

}

function promptUser() {
    inquirer.prompt([{
        type: "input",
        name: "ID",
        message: "Choose your product by ID. "
    }]).then(function (answer) {
        console.log(answer.ID);
        
        promptUse()
    
    })

}
function promptUse() {
    inquirer.prompt([{
        type: "input",
        name: "units",
        message: "How many units would like to order? "
    }]).then(function (answer) {
        console.log(answer.units)
      })
}