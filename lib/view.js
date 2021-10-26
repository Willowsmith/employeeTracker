const inquirer = require("inquirer");
const db = require('../config/connection');

function departments(){
    return new Promise((resolve, reject) => {
        const query = `SELECT department.id 'ID', department.name 'Department'FROM department`

        db.query(query, (err,data) => {
            if(err){
                console.log("Whoops, thats not right. Try again.");
                reject(err)
            }
            resolve(console.table(data));
        });
    })
};

function positions() {
    return new Promise((resolve, reject) => {
        const query = `SELECT position.id 'ID',position.title 'Job Title',department.name 'Department',position.salary 'Salary' FROM department JOIN position ON department.id=position.department_id`

        db.query(query, (err,data) => {
            if(err){
                console.log("Whoops, thats not right. Try again.");
                reject(err)
            }
            resolve(console.table(data));
        });
    })
};

function employees() {
    return new Promise((resolve, reject) => {
        const query = `SELECT employee.id 'ID', employee.first_name 'First Name', employee.last_name 'Last Name', position.title 'Job',department.name 'Department', position.salary 'Salary', CONCAT_WS(' ', m.first_name, m.last_name) 'Manager' FROM department JOIN position ON department.id=position.department_id JOIN employee ON position.id=employee.position_id LEFT JOIN employee AS m ON m.id = employee.manager_id`

        db.query(query, (err,data) => {
            if(err){
                console.log("Whoops, thats not right. Try again.");
                reject(err)
            }
            resolve(console.table(data));
        });
    })
};

//  Function to view employees by manager //
function nmemployees() {
    return new Promise((resolve, reject) => {
        const viewEmployees = employeeA.map(employee => {
            return {
                name:employee.Name,
                value:employee.ID
            }
        })
        viewEmployees.push("None");
        inquirer.prompt(
            {
                message: "Which manager would you like to view employee data on?",
                type: "list",
                name: "manager",
                choices: viewEmployees
        }).then((answers) => {
            const query = `SELECT employee.id 'ID', CONCAT_WS(' ', employee.first_name, employee.last_name) 'Name', position.title 'Job',department.name 'Department', position.salary 'Salary',CONCAT_WS(' ', m.first_name, m.last_name) 'Manager'FROM department JOIN position ON department.id=position.department_id JOIN employee ON position.id=employee.position_id LEFT JOIN employee AS m ON m.id = employee.manager_id WHERE employee.manager_id = ?`
            
            db.query(query, answers.manager, (err,data) => {
                if(err){
                    console.log("Whoops, thats not right. Try again.");
                    console.log(err)
                    reject(err)
                }
                console.log('showing non-management employees!');
                resolve(console.table(data))
            });
        });
    })
};

// Function to show employees by department //
function empDepartment() {
    return new Promise((resolve, reject) => {
        const viewDepartments = departmentA.map(department => {
            return {
                name:department.Department,
                value:department.ID
            }
        })
        inquirer.prompt(
            {
                message: "What is the name of the Department whose employees you want to see?",
                type: "list",
                name: "department",
                choices: viewDepartments
        }).then((answers) => {
            const query = `SELECT employee.id 'ID', CONCAT_WS(' ', employee.first_name, employee.last_name) 'Name', position.title 'Job',department.name 'Department', position.salary 'Salary',CONCAT_WS(' ', m.first_name, m.last_name) 'Manager'FROM department JOIN position ON department.id=position.department_id JOIN employee ON position.id=employee.position_id LEFT JOIN employee AS m ON m.id = employee.manager_id WHERE position.department_id = ?`
            
            db.query(query, answers.department, (err,data) => {
                if(err){
                    console.log("Whoops, thats not right. Try again.");
                    console.log(err)
                    reject(err)
                }
                console.log('Showing employees by depatment.');
                resolve(console.table(data));
            });
        });
    })
};
         

module.exports = { departments, positions, employees, nmemployees, empDepartment };