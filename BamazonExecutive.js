var mysql = require('mysql');
var password = require('./password.js');
var prompt = require('prompt');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: password,
	database: 'bamazon'
});

connection.connect();
prompt.start();

console.log(" ");
console.log("Welcome to Kevin's Store Executive Application!");
console.log(" ");
console.log("Select an option to continue:");
console.log(" ");
console.log("1) View Product Sales by Department");
console.log("2) Create New Department");
console.log(" ");

prompt.get('option', function(err, result){
	
})