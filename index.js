const inquirer = require("inquirer");

const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    password: "computersaysno1",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

const track = async () => {
  console.log("Welcome to our awesome company!");

  inquirer
    .prompt({
      message: "What would you like to do?",
      type: "list",
      name: "question",
      choices: [
        "View departments",
        "View positions",
        "View employees",
        "Add department",
        "Add position",
        "Add an employee",
        "Update a position",
        "Quit",
      ],
    })
    .then((answers) => {
      switch (answers.question) {
        case "View departments":
          console.log("Showing all departments");
          departments();
          break;

        case "View positions":
          console.log("Showing all positions");
          positions();
          break;

        case "View employees":
          console.log("Showing all employees");
          employees();
          break;

        case "Add department":
          console.log("Adding a department");
          addDepartment();
          break;

        case "Add position":
          console.log("Adding a position");
          addPosition();
          break;

        case "Add an employee":
          console.log("Adding an employee");
          addEmployee();
          break;

        case "Update a position":
          console.log("Updated a position");
          employeePosition();
          break;

        default:
          console.log("GoodBye!");
      }
    });
};

track();

function departments() {
  const query = `SELECT * FROM department`;

  db.query(query, function (err, data) {
    if (err) throw err;
    console.table(data);
    track();
  });
}
function positions() {
  const query = `SELECT * FROM department JOIN empposition ON department.id=empposition.department_id`;

  db.query(query, function (err, data) {
    if (err) throw err;
    console.table(data);
    track();
  });
}

function employees() {
  const query = `SELECT employee.id 'ID', employee.first_name 'First Name', employee.last_name 'Last Name', empposition.title 'Job',department.name 'Department', empposition.salary 'Salary', CONCAT_WS(' ', m.first_name, m.last_name) 'Manager' FROM department JOIN empposition ON department.id=empposition.department_id JOIN employee ON empposition.id=employee.empposition_id LEFT JOIN employee AS m ON m.id = employee.manager_id`;

  db.query(query, function (err, data) {
    if (err) throw err;
    console.table(data);
    track();
  });
}



// Function to add a new department //
function addDepartment() {
  inquirer
    .prompt({
      message: "What is the name of the new department?",
      type: "input",
      name: "name",
    })
    .then((answers) => {
      const query = `INSERT INTO department (name) VALUES (?)`;

      db.query(query, [answers.name], 
        function (err, data) {
        if (err) throw err;
        console.table(data);
        track();
      });
    });
}

// Function to add a new position //
async function addPosition() {
  const departmentA = `SELECT * FROM department`;
  db.query(departmentA, function (err, data) {
    if (err) throw err;
    console.table(data);
  inquirer
    .prompt([
      {
        message: "What is the new positions name?",
        type: "input",
        name: "name",
      },
      {
        message: "What is the new positions salary",
        type: "number",
        name: "salary",
      },
      {
        message: "What department id is the new position in?",
        type: "number",
        name: "department",
      },
    ])
    .then((answers) => {
      const query = "INSERT INTO empposition (title, salary, department_id) VALUES (?,?,?)";
      

      db.query(
        query, [answers.name, answers.salary, answers.department],
        function (err, data) {
          if (err) throw err;
          console.table(data);
          track();
        }
      );
    });
});
}

function addEmployee() {
    const positionA = `SELECT * FROM empposition`;
  db.query(positionA, function (err, data) {
    if (err) throw err;
    console.table(data);


  //employees.push("None");

  inquirer
    .prompt([
      {
        message: "What is the new employee's first name?",
        type: "input",
        name: "firstName",
      },
      {
        message: "What is the new employee's last name?",
        type: "input",
        name: "lastName",
      },
      {
        message: "What is the new employee's new position id?",
        type: "number",
        name: "position",
      },
      {
        message: "Who is the new employee's new manager id?",
        type: "number",
        name: "manager",
      },
    ])
    .then((answers) => {
      const query = `INSERT INTO employee (first_name, last_name, empposition_id, manager_id) VALUES (?,?,?,?)`;
      if (answers.manager == "None") {
        answers.manager = 0;
      }
      db.query(
        query, [answers.firstName, answers.lastName, answers.position, answers.manager],
        function (err, data) {
          if (err) throw err;
          console.table(data);
          track();
        }
      );
    });
}); 
}

function employeePosition() {
    const viewEmployees = `SELECT * FROM employee`;
  db.query(viewEmployees, function (err, data) {
    if (err) throw err;
    console.table(data);
  inquirer
    .prompt([
      {
        message: "Which employee id would you like to update?",
        type: "number",
        name: "name",
      },
      {
        message: "What position id should this employee have?",
        type: "number",
        name: "position",
      },
    ])
    .then((answers) => {
      const query = `UPDATE employee SET empposition_id = (?) WHERE employee.id = (?)`;

      db.query(
        query,
        [`${answers.position}`, `${answers.name}`],
        function (err, data) {
          if (err) throw err;
          console.table(data);
          track();
        }
      );
    });
});
}

