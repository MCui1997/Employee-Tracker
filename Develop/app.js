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

            case "View All Employees by Manager":
            viewEmployeeManager();
            console.log("Employees viewed by manager!\n");
            break; 

            case "Add Employee":
            addEmployee();
            break; 

            case "Remove Employee":
            
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
  LEFT JOIN employee m
    ON m.id = e.manager_id
  ORDER BY d.id`


  connection.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);  
    init(); 
    
  });
}

  // Function to view the employees by manager ================================================
  function viewEmployeeManager() {

    var query =
    `SELECT e.manager_id, m.first_name AS manager_first, m.last_name AS manager_last, e.first_name, e.last_name
    FROM employee e
    LEFT JOIN role r
      ON e.role_id = r.id
    LEFT JOIN department d
      ON d.id = r.department_id
    LEFT JOIN employee m
      ON m.id = e.manager_id
    ORDER BY e.manager_id`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      console.table(res);  
      init(); 
      
    });
  }
  

  //function to add employees ======================================================
  function addEmployee() {

    //First query to get role info
    var query =
    `SELECT r.id, r.title, r.salary
      FROM role r`
  
    var query2 = `SELECT e.first_name, e.last_name, e.role_id 
      FROM employee e`
      

      //First query for role
  connection.query(query, function (err, res) {
    if (err) throw err;

    const roleChoices = res.map(({ id, title, salary }) => ({
      value: id + ` ${title}`, title: `${title}`, salary: `${salary}`
    }));

    //Second query for manager id
  connection.query(query2,function(err,res){

    if (err) throw err;

    const managerChoices = res.map(({ first_name, last_name, role_id }) => ({
      value: role_id + ` ${first_name}` + ` ${last_name}`, first_name: `${first_name}`, last_name: `${last_name}`
    }));

  

    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?"
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?"
        },
        {
          type: "list",
          name: "roleID",
          message: "What is the employee's role?",
          choices: roleChoices
        },
        {
          type: "list",
          name: "managerID",
          message: "Who is this employee's manager?",
          choices: managerChoices

        }
      ])
      .then(function (response) {
  
        var query = `INSERT INTO employee SET ?`
        // when finished prompting, insert a new item into the db with that info
        connection.query(query,
          {
            first_name: response.first_name,
            last_name: response.last_name,
            role_id : parseInt(response.roleID),
            manager_id : parseInt(response.managerID)
          },
          function (err, res) {
            if (err) throw err;

            init();
          });
    
      })
    })
  });

}

//function to delete employees =======================================================
   
    

  //Call init function at start
  init();

