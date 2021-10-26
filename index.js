const inquirer = require('inquirer');
const view = require('./lib/view');
const add = require ('./lib/add');
const array = require ('./lib/arrays');
const update = require ('./lib/update');


const track = async () => {
    console.log('Welcome to our awesome company!')

    let departmentA = await array.getDepartmentArray()
    let employeeA = await array.getEmployeeArray()
    let positionA = await array.getPositionArray()


    inquirer.prompt({
        message: "What would you like to do?",
        type: "list",
        name: "question",
        choices:['View dempartments', 'View positions', 'View employees', 'View managers', 'View non-managment', 'Add a department', 'Add position', 'Add an employee', 'Update an employee',"Quit"]
    }).then(async (answers) => {
        switch (answers.question) {
            case "View departments":
                console.log("Showing all departments");
                await view.departments();
                return track();
            case "View positions":
                console.log("Showing all positions");
                await view.positions();
                return track();
            case "View employees":
                console.log("Showing all employees");
                await view.employees();
                return track();
            case "View managers":
                console.log("Showing all managers");
                await view.managers();
                return track();
            case "View non-managment":
                console.log("Showing all non-manager employees");
                await view.nmemployees();
                return track();
            case "View employees by department":
                console.log("Showing employees by department");
                await view.empDepartment();
                return track();
            case "Add a department":
                console.log("Adding a department");
                await add.department();
                return track();
            case "Add a position":
                console.log("Adding a position");
                await add.position();
                return track();
            case "Add an employee":
                console.log("Adding an employee");
                await add.employee();
                return track();
            case "Update an employee":
                console.log("Updated an employee");
                await update.employee();
                return track();
            case "Update a position":
                console.log("Updated a position");
                await update.employeeRole()
                return track();
            case "Update a manager": 
                console.log("Updated a manager");
                await update.employeeManager()
                return track();
            default:
                console.log('GoodBye!');
        };
    });
};

track();