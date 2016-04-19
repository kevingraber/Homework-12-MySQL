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
console.log("Welcome to Kevin's Store!");
console.log(" ");
console.log("We have the following products for sale:");
console.log(" ");

connection.query('SELECT * FROM products', function(err, rows) {
	if (err) throw err;
	for (var i = 0; i < rows.length; i++) {
		console.log("Item ID: " + rows[i].ItemID + " Name: " + rows[i].ProductName + " Price: $" + rows[i].Price);
	};
	var schema = {
		properties: {
			itemid: {
				description: 'What is the ID of the product you want?'
			},
			quantity: {
				description: 'How many would you like?'
			}
		}
	}
	prompt.get(schema, function(err, result) {
		// console.log(rows[result.itemid]);
		if (rows[result.itemid - 1].StockQuantity < result.quantity) {
			console.log("Insufficient Quantity");
		} else {
			var orderPrice = (rows[result.itemid-1].Price * result.quantity);
			var department = rows[result.itemid-1].DepartmentName;
			console.log("Yerp we can do that!");
			console.log("Your order costs: $" + orderPrice);
			console.log("Thanks for shopping at Kevin's Store!");

			connection.query('SELECT * FROM Departments', function(err, rows){
				connection.query('UPDATE Departments SET TotalSales = TotalSales + ' + orderPrice + ' WHERE DepartmentName ="' + department + '"', function(err, res){
					if (err) throw err;
				});	
			});
			

			var newQuantity = ( rows[result.itemid - 1].StockQuantity - result.quantity);
			connection.query('UPDATE products SET StockQuantity=' + newQuantity + ' WHERE ItemID=' + result.itemid + ';', function(err, res) {
				if (err) throw err;
			});

		};
	});
});