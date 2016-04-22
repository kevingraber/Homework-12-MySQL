# Homework-12-MySQL
This app is a command line storefront built using Node.js and mySQL. Click on the image below for a working demonstration.

<a href="http://www.youtube.com/watch?feature=player_embedded&v=7HHlWyQNprA
" target="_blank"><img src="http://img.youtube.com/vi/7HHlWyQNprA/0.jpg" 
alt="mySQL Homework" width="480" height="360" border="10" /></a>

This app has 3 different functionalities:

1. Customer
2. Manager
3. Executive

###Customer

In the customer portion of the app, users are presented with a list of items that they can purchase. After being prompted for the ID of the item they want and the quantity, they are given the order total and the appropriate amount is subtracted from the database. The sale amount is also added to it's respective department's total sales. 

###Manager

In the manager app the user is presented with 4 options:

1. View Products for Sale
  * Displays a list of all products for sale.
2. View Low Inventory
  * Displays a list of products with 5 or less items left in inventory.
3. Add to Inventory
  * Allows the user to add more inventory to an already existing item.
3. Add New Product
  * Allows the user to add a completely new product to the database.

###Executive

In the executive app the user is presented with 2 options:

1. View Product Sales by Department
  * Allows the user to slect a department by ID and displays all relevant information about that department's sales.
2. Create New Department
 * Allows the user to add a new department to the database after inputting all required information.