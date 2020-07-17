// require mysql, inquirer, and console.table
var mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

//Create connection
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "bangbangboomboombus",
  database: "employeeTrackerDB"
});

//If connection has error
connection.connect(function(err) {
  if (err) throw err;
});

//Prompting the user with inquirer=======================================================
function init() {

    inquirer
      .prompt({
        type: "list",
        name: "selection",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Employees by Department",
          "View All Employees by Manager",
          "Add Employee",
          "Remove Employees",
          "Update Employee Role",
          "Add Role",
          "End"]
      })
      .then(function ({selection}){

        switch (selection){

            case "View All Employees":
            viewEmployee();
            console.log("Employees viewed!\n");
            break; 

            case "View All Employees by Department":
            viewEmployeeDepartment();
            console.log("Employees viewed by department!\n");
            break; 

            case "End":
            console.log("Program Ended");
            connection.end();
            break;
        }
      })

      }


// Function to view the employees ================================================
function viewEmployee() {

    var query =
      `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role r
      ON e.role_id = r.id
    LEFT JOIN department d
      ON d.id = r.department_id
    LEFT JOIN employee m
      ON m.id = e.manager_id`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      console.table(res);  
      init(); 
      
    });
  }

  // Function to view the employees by department ================================================
function viewEmployeeDepartment() {

  var query =
  `SELECT d.id AS department_id, d.name AS department, e.first_name, e.last_name
  FROM employee e
  LEFT JOIN role r 
    ON e.role_id = r.id
  LEFT JOIN department d
    ON d.id = r.department_id
  GROUP BY d.id,d.name`


  connection.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);  
    init(); 
    
  });
}



  //Call init function at start
  init();

