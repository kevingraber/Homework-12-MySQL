var mysql = require('mysql');
var password = require('./password.js');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: password,
	database: 'bamazon'
});

connection.connect();

console.log(" ");
console.log("Welcome to Kein's Store!");
console.log(" ");
console.log("We have the following products for sale:");
console.log(" ");

connection.query('SELECT * FROM products', function(err, rows) {
	if (err) throw err;
	for (var i = 0; i < rows.length; i++) {
		console.log("Item ID: " + rows[i].ItemID + " Name: " + rows[i].ProductName + " Price: " + rows[i].Price);
	}
	// console.log(rows[0])
})