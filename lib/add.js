const inquirer = require("inquirer");
const db = require('../config/connection');

// Function to add a new department //
function department(){

        inquirer.prompt({
            message: "What is the name of the new department?",
            type: "input",
            name: "name",
        }).then(({ name }) => {
            const query = `INSERT INTO department (name) VALUES (?)`

            db.query(query, name, (err,data) => {
                if(err){ 
                    console.log("Whoops, thats not right. Try again.");
                    console.log(err);
                }
                console.log("New department added!");
            });
        })

}

// Function to add a new position //
function position(){
    return new Promise((resolve, reject) => {
        const departments = departmentA.map(department => {
            return {
                name:department.Department,
                value:department.ID
            }
        })
        inquirer.prompt([
            {
                message: "What is the new positions name?",
                type: "input",
                name: "name",
            }, {
                message: "What is the new positions salary",
                type: "input",
                name: "salary",
            }, {
                message: "What is department is the new position in?",
                type: "list",
                name: "department",
                choices: departments,
            }
        ]).then((answers) => {
            const query = `INSERT INTO position (title, salary, department_id) VALUES (?,?,?)`
            
            db.query(query, [`${answers.name}`, `${answers.salary}`, `${answers.department}`], (err,data) => {
                if(err){
                    console.log("Whoops, thats not right. Try again.");
                    reject(err);
                } else {
                    resolve(console.log("New position added!"));
                }
            });
        })
    })
}


// Function to add a new employee // 
function employee(){
    return new Promise((resolve, reject) => {
        const positions = positionA.map(position => {
            return {
                name:position.Title,
                value:position.ID
            }
        })
        const employees = employeeA.map(employee => {
            return {
                name:employee.Name,
                value:employee.ID
            }
        })
        employees.push("None");
        
        inquirer.prompt([
            {
                message: "What is the new employee's first name?",
                type: "input",
                name: "firstName",
            }, {
                message: "What is the new employee's last name?",
                type: "input",
                name: "lastName",
            },{
                message: "What is the new employee's new position?",
                type: "list",
                name: "position",
                choices: positions,
            },{   
                message: "Who is the new employee's new manager?",
                type: "list",
                name: "manager",
                choices: employees
            }
        ]).then((answers) => {
            const query = `INSERT INTO employee (first_name, last_name, position_id, manager_id) VALUES (?,?,?,?)`
            if(answers.manager =="None") {
                answers.manager = 0;
            }
            db.query(query, [`${answers.firstName}`, `${answers.lastName}`, `${answers.position}`,`${answers.manager}`], (err,data) => {
                if(err){
                    console.log("Whoops, thats not right. Try again.")
                    console.log(err);
                    reject(err)
                } else {
                    resolve(console.log("New employee added!"));
                }
            });
        })
    })
}



module.exports = { department, position, employee };