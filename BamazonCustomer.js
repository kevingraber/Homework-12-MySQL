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
		console.log("Item ID: " + rows[i].ItemID + " Name: " + rows[i].ProductName + " Price: " + rows[i].Price);
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
			console.log("Yerp we can do that!")
			console.log("Your order costs: $" + (rows[result.itemid-1].Price * result.quantity))
			console.log("Thanks for shopping at Keivn's Store!")
		};
	});
});