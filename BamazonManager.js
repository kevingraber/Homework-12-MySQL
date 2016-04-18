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
console.log("Welcome to Kevin's Store Management Application!");
console.log(" ");
console.log("Select an option to continue:");
console.log(" ");
console.log("1) View Products For Sale");
console.log("2) View Low Inventory");
console.log("3) Add to Inventory");
console.log("4) Add New Product");
console.log(" ");


	prompt.get('option', function(err, result) {
		if (result.option == 1) {
			console.log(" ")
			console.log("===== Products For Sale =====")
			console.log(" ")
			connection.query('SELECT * FROM products', function(err, rows) {
				if (err) throw err;
				for (var i = 0; i < rows.length; i++) {
					console.log("Item ID: " + rows[i].ItemID + " Name: " + rows[i].ProductName + " Price: $" + rows[i].Price + " Quantity: " + rows[i].StockQuantity);
				};
			});
		} else if (result.option == 2) {
			console.log(" ")
			console.log("===== Low Inventory =====")
			console.log(" ")

			connection.query('SELECT * FROM products WHERE StockQuantity <= 5', function(err, rows) {
				if (err) throw err;
				for (var i = 0; i < rows.length; i++) {
					console.log("Item ID: " + rows[i].ItemID + " Name: " + rows[i].ProductName + " Price: $" + rows[i].Price + " Quantity: " + rows[i].StockQuantity);
				};
			});

		} else if (result.option == 3) {
			console.log(" ")
			console.log("===== Add to Inventory =====")
			console.log(" ")
			console.log("Here is the current inventory for reference:")

			connection.query('SELECT * FROM products', function(err, rows) {
				if (err) throw err;
				for (var i = 0; i < rows.length; i++) {
					console.log("Item ID: " + rows[i].ItemID + " Name: " + rows[i].ProductName + " Quantity: " + rows[i].StockQuantity);
				};
				console.log(" ");
				var schema = {
					properties: {
						itemid: {
							description: 'What is the ID of the product?'
						},
						quantity: {
							description: 'How many would you like to add?',
							type: 'number'
						}
					}
				}
				prompt.get(schema, function(err, result){
					var newTotal = rows[result.itemid-1].StockQuantity + result.quantity;
					connection.query('UPDATE products SET StockQuantity="'+newTotal+'" WHERE ItemID="'+result.itemid+'"', function(err, res) {
						if (err) throw err;
						console.log(" ")
						console.log("Inventory Successfully Updated!")
						console.log(" ")
						console.log(result.quantity + " units have been added to " + rows[result.itemid-1].ProductName)
						console.log('There are now '+newTotal+' units of '+rows[result.itemid-1].ProductName)
					});
				});
			});

			console.log(" ");

		} else if (result.option == 4) {

		} else {
			console.log("Invalid Input")
		};
	});


// connection.query('SELECT * FROM products', function(err, rows) {
// 	if (err) throw err;
// 	prompt.get('option', function(err, result) {
// 		if (result.option == 1) {
// 			console.log(" ")
// 			console.log("===== Products For Sale =====")
// 			console.log(" ")
// 			for (var i = 0; i < rows.length; i++) {
// 				console.log("Item ID: " + rows[i].ItemID + " Name: " + rows[i].ProductName + " Price: $" + rows[i].Price + " Quantity: " + rows[i].StockQuantity);
// 			};
// 		} else if (result.option == 2) {
// 			console.log(" ")
// 			console.log("===== Low Inventory =====")
// 			console.log(" ")
// 			for (var i = 0; i < rows.length; i++) {
// 				if ()
// 				console.log("Item ID: " + rows[i].ItemID + " Name: " + rows[i].ProductName + " Price: $" + rows[i].Price + " Quantity: " + rows[i].StockQuantity);
// 			};
// 		} else if (result.option == 3) {

// 		} else if (result.option == 4) {

// 		} else {
// 			console.log("Invalid Input")
// 		};
// 	});
// });