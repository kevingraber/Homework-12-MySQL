var mysql = require('mysql');
var password = require('./password.js');
var prompt = require('prompt');
var Table = require('cli-table');

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
	if (result.option == 1) {
		console.log(" ")
		console.log("===== View Product Sales by Department =====")
		console.log(" ")

		connection.query('SELECT * FROM departments', function(err, rows){
			if (err) throw err;

			var table = new Table({
				head: ['ID', 'Name', 'Overhead', 'Sales', 'Profit'], 
				colWidths: [10, 15, 10, 10, 10]
			})

			for (var i = 0; i < rows.length; i ++) {

				var tr = [];

				tr.push(rows[i].DepartmentID)
				tr.push(rows[i].DepartmentName)
				tr.push(rows[i].OverHeadCosts)
				tr.push(rows[i].TotalSales)
				tr.push((rows[i].TotalSales - rows[i].OverHeadCosts))

				table.push(tr)

			}

			console.log(table.toString())

		})

	} else if (result.option == 2) {
		console.log(" ")
		console.log("===== Create New Department =====")
		console.log(" ")

		var schema = {
			properties: {
				depName: {
					description: 'Enter Department Name'
				},
				costs: {
					description: 'Enter Overhead Costs'
				},
				sales: {
					description: 'Enter Total Sales'
				}
			}
		}

		prompt.get(schema, function(err, result){

			connection.query('INSERT INTO departments (DepartmentName, OverHeadCosts, TotalSales) VALUES ("'+result.depName+'", "'+result.costs+'", '+result.sales+');', function(err, res) {
				if (err) throw err;
				console.log(" ")
				console.log("New Department Successfully Added!")
			});

		});

	} else {
		console.log('Invalid Input')
	}
})