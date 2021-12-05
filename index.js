const inquirer = require('inquirer');
const view = require('./lib/view');
const add = require ('./lib/add');
const array = require ('./lib/arrays');
const update = require ('./lib/update');


const track = async () => {
    console.log('Welcome to our awesome company!')



    inquirer.prompt({
        message: "What would you like to do?",
        type: "list",
        name: "question",
        choices:['View dempartments', 'View positions', 'View employees', 'View managers', 'View non-managment', 'Add a department', 'Add position', 'Add an employee', 'Update an employee',"Quit"]
    }).then( (answers) => {
        switch (answers.question) {
            case "View departments":
                console.log("Showing all departments");
                view.departments();
                
            case "View positions":
                console.log("Showing all positions");
                view.positions();
                
            case "View employees":
                console.log("Showing all employees");
                view.employees();
                
            case "View managers":
                console.log("Showing all managers");
                view.managers();
                
            case "View non-managment":
                console.log("Showing all non-manager employees");
                view.nmemployees();
                
            case "View employees by department":
                console.log("Showing employees by department");
                view.empDepartment();
                
            case "Add a department":
                console.log("Adding a department");
                add.department();
                break;
            case "Add a position":
                console.log("Adding a position");
                add.position();
                
            case "Add an employee":
                console.log("Adding an employee");
                add.employee();
                
            case "Update an employee":
                console.log("Updated an employee");
                update.employee();
                
            case "Update a position":
                console.log("Updated a position");
                update.employeeRole()
                
            case "Update a manager": 
                console.log("Updated a manager");
                update.employeeManager()
                
            default:
                console.log('GoodBye!');
        };
    });
};

track();