const mysql = require("mysql");
const { prompt } = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Yozi-41313",
    database: "employee_trackerDB",
});

connection.connect((err) => {
    if (err) throw err;
    start();
});

// Start Employee Trackerit
function start() {
    console.log(
        `
        ___  ___ ___  ____   _       ___   __ __    ___    ___     
        /  _]|   |   ||    \ | |     /   \ |  |  |  /  _]  /  _]    
       /  [_ | _   _ ||  o  )| |    |     ||  |  | /  [_  /  [_     
      |    _]|  \_/  ||   _/ | |___ |  O  ||  ~  ||    _]|    _]    
      |   [_ |   |   ||  |   |     ||     ||___, ||   [_ |   [_     
      |     ||   |   ||  |   |     ||     ||     ||     ||     |    
      |_____||___|___||__|   |_____| \___/ |____/ |_____||_____|    
       ______  ____    ____     __  __  _    ___  ____              
      |      ||    \  /    |   /  ]|  |/ ]  /  _]|    \             
      |      ||  D  )|  o  |  /  / |  ' /  /  [_ |  D  )            
      |_|  |_||    / |     | /  /  |    \ |    _]|    /             
        |  |  |    \ |  _  |/   \_ |     \|   [_ |    \             
        |  |  |  .  \|  |  |\     ||  .  ||     ||  .  \            
        |__|  |__|\_||__|__| \____||__|\_||_____||__|\_|            
                                                                    
        
        `
    );
    prompt([
        {
            type: "list",
            name: "Action",
            Message: "What would you like to do?",
            choices: ["Add", "Delete", "Update", "View", "Quit"],
        },
    ]).then((answer) => {
        switch (answer.Action) {
            case "Add":
                add();
                break;
            case "Delete":
                remove();
                break;
            case "Update":
                update();
            case "View":
                view();
                break;
            default:
                console.log("Bye~");
                process.exit();
        }
    });
}

// Executing four types of Queries: creating, destroying, updating and reading
// Creating
function add() {
    prompt({
        type: "list",
        name: "Add",
        Message: "What would you like to add?",
        choices: ["Department", "Role", "Employee"],
    }).then((answer) => {
        switch (answer.Add) {
            case "Department":
                addDepartment();
                break;
            case "Role":
                addRole();
                break;
            case "Employee":
                addEmployee();
                break;
        }
    });
}

// Destroying
function remove() {
    prompt({
        type: "list",
        name: "Remove",
        Message: "What would you like to remove?",
        choices: ["Department", "Employee", "Role"],
    }).then((answer) => {
        switch (answer.Remove) {
            case "Department":
                removeDepartment();
                break;
            case "Role":
                removeRole();
                break;
            case "Employee":
                removeEmployee();
                break;
        }
    });
}

// Updating
function update() {
    prompt({
        type: "list",
        name: "Update",
        Message: "What would you like to update?",
        choices: ["Employee roles", "Employee Managers"],
    }).then((answer) => {
        switch (answer.Update) {
            case "Employee roles":
                updateEmployeeRoles();
                break;
            case "Employee Managers":
                updateEmployeeManagers();
                break;
        }
    });
}

// Reading
function view() {
    prompt({
        type: "list",
        name: "View",
        Message: "What would you like to view?",
        choices: ["Department", "Employee", "Role", "All Employees by Manager"],
    }).then((answer) => {
        switch (answer.View) {
            case "Department":
                viewDepartment();
                break;
            case "Role":
                viewRole();
                break;
            case "Employee":
                viewEmployee();
                break;
        }
    });
}

// Creating a department, an employee and a role respectively
async function addDepartment() {
    await prompt([
        {
            type: "number",
            name: "departmentID",
            message:
                "What is the ID of the new department that you would like to add?",
        },
        {
            type: "input",
            name: "department",
            message:
                "What is the name of the new department that you would like to add?",
        },
    ]).then((answer) => {
        const query = `INSERT INTO department (id, name) VALUES (?, ?);`;
        connection.query(
            query,
            [answer.departmentID, answer.department],
            (err, res) => {
                if (err) throw err;
                console.log("Successfully added a new department!");
            }
        );
        start();
    });
}

async function addRole() {
    await prompt([
        {
            type: "number",
            name: "roleID",
            message:
                "What is the ID of the new role? (Sales Lead = 1; Salesperson = 2; Lead Engineer = 3; Software Engineer = 4; Account Manager = 5; Accountant = 6; Legal Team Lead = 7; Lawyer = 8; Junior Software Engineer = 9; )",
        },
        {
            type: "input",
            name: "role",
            message: "What is the title of the new Role?",
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the new Role?",
        },
        {
            type: "number",
            name: "departmentID",
            message:
                "What is the Department Id of the new Role? (Sales = 1; Engineering = 2; Finance = 3; Legal = 4;)",
        },
    ]).then((answer) => {
        const query = `INSERT INTO role (id, title, salary, department_id) VALUES (?, ?, ?, ?);`;
        connection.query(
            query,
            [answer.roleID, answer.role, answer.salary, answer.departmentID],
            (err, res) => {
                if (err) throw err;
                console.log("Successfully added a role!");
            }
        );
        start();
    });
}

async function addEmployee() {
    await prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the first name of the new employee?",
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the last name of the new employee?",
        },
        {
            type: "number",
            name: "roleID",
            message:
                "What is the role ID of the new employee? (Sales Lead = 1; Salesperson = 2; Lead Engineer = 3; Software Engineer = 4; Account Manager = 5; Accountant = 6; Legal Team Lead = 7; Lawyer = 8; Junior Software Engineer = 9; )",
        },
        {
            type: "number",
            name: "managerID",
            message:
                "What is the manager ID of the new employee? (John Doe [Sales Lead] = 1; Ashley Rodriguez [Lead Engineer] = 3; Malia Brown [Account Manager] = 5; Tom Allen [Legal Team Lead] = 7;) ",
        },
    ]).then((answer) => {
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`;
        connection.query(
            query,
            [
                answer.firstName,
                answer.lastName,
                answer.roleID,
                answer.managerID,
            ],
            (err, res) => {
                if (err) throw err;
                console.log("Successfully added an new employee!");
            }
        );
        start();
    });
}

// Destroying a department, an employee and a role respectively
function removeDepartment() {
    prompt({
        type: "input",
        name: "department",
        message:
            "What is the name of the department that you would like to remove?",
    }).then((answer) => {
        const query = `DELETE FROM department WHERE name = ?`;
        connection.query(query, [answer.department], (err, res) => {
            if (err) throw err;
            console.log("Successfully deleted!");
        });
    });
}

// Reading all departments, all employees and and all roles respectively
function viewDepartment() {
    connection.query(`SELECT * FROM department;`, (err, res) => {
        if (err) throw err;
        console.table(res);
    });
}
