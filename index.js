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
        "Update a manager",
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

        case "Add a department":
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

        case "Update a manager":
          console.log("Updated a manager");
          employeeManager();
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
  const query = `SELECT * FROM department JOIN position ON department.id=position.department_id`;

  db.query(query, function (err, data) {
    if (err) throw err;
    console.table(data);
    track();
  });
}

function employees() {
  const query = `SELECT employee.id 'ID', employee.first_name 'First Name', employee.last_name 'Last Name', position.title 'Job',department.name 'Department', position.salary 'Salary', CONCAT_WS(' ', m.first_name, m.last_name) 'Manager' FROM department JOIN position ON department.id=position.department_id JOIN employee ON position.id=employee.position_id LEFT JOIN employee AS m ON m.id = employee.manager_id`;

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
    .then(({ name }) => {
      const query = `INSERT INTO department (name) VALUES (?)`;

      db.query(query, name, function (err, data) {
        if (err) throw err;
        console.log(data);
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
        type: "input",
        name: "salary",
      },
      {
        message: "What department id is the new position in?",
        type: "input",
        name: "department",
      },
    ])
    .then((answers) => {
      const query = `INSERT INTO position (title, salary, department_id) VALUES (?,?,?)`;

      db.query(
        query,
        [`${answers.name}`, `${answers.salary}`, `${answers.department}`],
        function (err, data) {
          if (err) throw err;
          console.log(data);
          track();
        }
      );
    });
});
}

function addEmployee() {
  const positions = position.map((position) => {
    return {
      name: position.Title,
      value: position.ID,
    };
  });
  const employees = employeeA.map((employee) => {
    return {
      name: employee.Name,
      value: employee.ID,
    };
  });
  employees.push("None");

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
        message: "What is the new employee's new position?",
        type: "list",
        name: "position",
        choices: positions,
      },
      {
        message: "Who is the new employee's new manager?",
        type: "list",
        name: "manager",
        choices: employees,
      },
    ])
    .then((answers) => {
      const query = `INSERT INTO employee (first_name, last_name, position_id, manager_id) VALUES (?,?,?,?)`;
      if (answers.manager == "None") {
        answers.manager = 0;
      }
      db.query(
        query,
        [
          `${answers.firstName}`,
          `${answers.lastName}`,
          `${answers.position}`,
          `${answers.manager}`,
        ],
        function (err, data) {
          if (err) throw err;
          console.log(data);
          track();
        }
      );
    });
}

function employeePosition() {
  const viewEmployees = employeeA.map((employee) => {
    return {
      name: employee.Name,
      value: employee.ID,
    };
  });
  const viewPositions = positionA.map((position) => {
    return {
      name: position.Title,
      value: position.ID,
    };
  });
  inquirer
    .prompt([
      {
        message: "Which employee would you like to update?",
        type: "list",
        name: "name",
        choices: viewEmployees,
      },
      {
        message: "What position should this employee have?",
        type: "list",
        name: "job",
        choices: viewPositions,
      },
    ])
    .then((answers) => {
      const query = `UPDATE employee SET position_id = (?) WHERE employee.id = (?)`;

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
}

