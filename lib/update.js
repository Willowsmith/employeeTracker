const inquirer = require("inquirer");
const db = require('../config/connection');

// UPDATE EMPLOYEE JOB//
function employeePosition(){
    return new Promise((resolve, reject) => {
        const viewEmployees = employeeA.map(employee => {
            return {
                name:employee.Name,
                value:employee.ID
            }
        })
        const viewPositions = positionA.map(position => {
            return {
                name:position.Title,
                value:position.ID
            }
        })
        inquirer.prompt([
            {
                message: "Which employee would you like to update?",
                type: "list",
                name: "name",
                choices: viewEmployees,
            }, {
                message: "What position should this employee have?",
                type: "list",
                name: "job",
                choices: viewPositions
            }
        ]).then((answers) => {
            const query = `UPDATE employee SET position_id = (?) WHERE employee.id = (?)`
            
            db.query(query, [`${answers.position}`, `${answers.name}`], (err,data) => {
                if(err){
                    console.log("Whoops, thats not right. Try again.");
                    reject(err);
                } else {
                    resolve(console.log("Showing employee's position."));
                }
            });
        })
    })
}
    
// //UPDATE EMPLOYEE MANAGER
function employeeManager(){
    return new Promise((resolve, reject) => {
        const viewEmployee1 = employeeA.map(employee => {
            return {
                name:employee.Name,
                value:employee.ID
            }
        })
        const viewEmployee2 = employeeA.map(employee => {
            return {
                name:employee.Name,
                value:employee.ID
            }
        })
        viewEmployee2.push("None");
        inquirer.prompt([
            {
                message: "Which employee would you like to update?",
                type: "list",
                name: "name",
                choices: viewEmployee1,
            },{
                message: "Who is the employee's manager?",
                type: "list",
                name: "manager",
                choices: viewEmployee2
            }
        ]).then((answers) => {
            const query = `UPDATE employee SET manager_id = (?) WHERE employee.id = (?)`
            if(answers.manager =="None") {
                answers.manager = 0;
            }
            db.query(query, [`${answers.manager}`, `${answers.name}`], (err,data) => {
                if(err){
                    console.log("Whoops, thats not right. Try again.");
                    reject(err);
                } else {
                    resolve(console.log("Showing employee's manager."));
                }
            });
        })
    })
}   



module.exports = { employeePosition, employeeManager };