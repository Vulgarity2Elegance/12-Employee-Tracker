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
    console.log(
        `
        ███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗    
        ██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝    
        █████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗      
        ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝      
        ███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗    
        ╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝    
                                                                                 
        ████████╗██████╗  █████╗  ██████╗██╗  ██╗███████╗██████╗                 
        ╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗                
           ██║   ██████╔╝███████║██║     █████╔╝ █████╗  ██████╔╝                
           ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗                
           ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║                
           ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝                
                                                                                 
        
        `
    );
    start();
});

// Start Employee Trackerit
function start() {
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
                break;
            case "View":
                view();
                break;
            default:
                console.log(`
                   ██████╗ ██╗   ██╗███████╗    ██╗
                   ██╔══██╗╚██╗ ██╔╝██╔════╝    ██║
                   ██████╔╝ ╚████╔╝ █████╗      ██║
                   ██╔══██╗  ╚██╔╝  ██╔══╝      ╚═╝
                   ██████╔╝   ██║   ███████╗    ██╗
                   ╚═════╝    ╚═╝   ╚══════╝    ╚═╝

                `);
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
        choices: ["Department", "Role", "Employee"],
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
        choices: [
            "All Employees",
            "All Employees by Department",
            "All Employees by Manager",
            "All Departments",
            "All Roles",
            "The total utilized budget of a department",
        ],
    }).then((answer) => {
        switch (answer.View) {
            case "All Employees":
                viewAllEmployees();
                break;
            case "All Employees by Department":
                viewEmplByDept();
                break;
            case "All Employees by Manager":
                viewEmplByMgr();
                break;
            case "All Departments":
                viewAllDepartments();
                break;
            case "All Roles":
                viewAllRoles();
                break;
            default:
                viewBudget();
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
                "What is the ID of the new department that you would like to add? (Sales = 1; Engineering = 2; Finance = 3; Legal = 4;)",
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
                console.log("");
                console.table(res);
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
                console.log("");
                console.table(res);
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
                console.log("");
                console.table(res);
                console.log("Successfully added an new employee!");
            }
        );
        start();
    });
}

// Destroying a department, a role, and an employee respectively
async function removeDepartment() {
    await prompt({
        type: "input",
        name: "department",
        message:
            "What is the name of the department that you would like to remove?",
    }).then((answer) => {
        const query = `DELETE FROM department WHERE name = ?`;
        connection.query(query, [answer.department], (err, res) => {
            if (err) throw err;
            console.log("");
            console.log("Successfully deleted the selected department!");
        });
        start();
    });
}

async function removeRole() {
    await prompt({
        type: "input",
        name: "role",
        message: "What is the name of the role that you would like to remove?",
    }).then((answer) => {
        const query = `DELETE FROM role WHERE title = ?`;
        connection.query(query, [answer.role], (err, res) => {
            if (err) throw err;
            console.log("");
            console.log("Successfully deleted the selected role!");
        });
        start();
    });
}

async function removeEmployee() {
    await prompt({
        type: "input",
        name: "employeeID",
        message:
            "What is the ID of the employee that you would like to remove?",
    }).then((answer) => {
        const query = `DELETE FROM employee WHERE id = ?`;
        connection.query(query, [answer.employeeID], (err, res) => {
            if (err) throw err;
            console.log("");
            console.log("Successfully deleted the selected employee!");
        });
        start();
    });
}

// Update employee roles
async function updateEmployeeRoles() {
    await prompt([
        {
            type: "input",
            name: "employeeID",
            message:
                "Which employee that you would like to change? (Please enter the ID of the Employee.)",
        },
        {
            type: "input",
            name: "roleID",
            message: "Which role would you like to assign to the employee?",
        },
    ]).then((answer) => {
        const query = `UPDATE employee SET role_id = ? WHERE id = ?`;
        connection.query(
            query,
            [answer.roleID, answer.employeeID],
            (err, res) => {
                if (err) throw err;
                console.log("");
                console.table(res);
                console.log(
                    "Successfully updated the slected employee's role!"
                );
            }
        );
        start();
    });
}

// Update employee manager
async function updateEmployeeManagers() {
    await prompt([
        {
            type: "input",
            name: "employeeID",
            message: "Which employee that you would like to change?",
        },
        {
            type: "input",
            name: "managerID",
            message: "Which manager would you like to assign to the employee?",
        },
    ]).then((answer) => {
        const query = `UPDATE employee SET manager_id = ? WHERE id = ?`;
        connection.query(
            query,
            [answer.managerID, answer.employeeID],
            (err, res) => {
                if (err) throw err;
                console.log("");
                console.table(res);
                console.log(
                    "Successfully updated the slected employee's manager!"
                );
            }
        );
        start();
    });
}

// Reading all departments, all employees and and all roles respectively
async function viewAllEmployees() {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, name AS department, role.salary, manager_id AS manager FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department ON (department.id = role.department_id)`;
    await connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("");
        console.table(res);
    });
    start();
}

async function viewAllDepartments() {
    await connection.query(`SELECT * FROM department;`, (err, res) => {
        if (err) throw err;
        console.log("");
        console.table(res);
    });
    start();
}

async function viewAllRoles() {
    const query = `SELECT role.id, role.title, role.salary, name AS department FROM role INNER JOIN department ON (role.department_id = department.id)`;
    await connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("");
        console.table(res);
    });
    start();
}

// Reading all employees by either Department or Manager
async function viewEmplByDept() {
    await prompt({
        type: "list",
        name: "department",
        message: "Which department would you like to view?",
        choices: ["Sales", "Engineering", "Finance", "Legal"],
    }).then((answer) => {
        const query = `SELECT employee.id, first_name, last_name, role.title, name AS department, role.salary, manager_id AS manager FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department ON (department.id = role.department_id) WHERE department.name = ?;`;
        connection.query(query, [answer.department], (err, res) => {
            if (err) throw err;
            console.log("");
            console.table(res);
        });
        start();
    });
}

async function viewEmplByMgr() {
    await prompt({
        type: "list",
        name: "manager",
        message:
            "Which manager would you like to view? (John Doe [Sales Lead] = 1; Ashley Rodriguez [Lead Engineer] = 3; Malia Brown [Account Manager] = 5; Tom Allen [Legal Team Lead] = 7;)",
        choices: ["1", "3", "5", "7"],
    }).then((answer) => {
        const query = `SELECT employee.id, first_name, last_name, role.title, name AS department, role.salary, manager_id AS manager FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department ON (department.id = role.department_id) WHERE manager_id = ?;`;
        connection.query(query, [answer.manager], (err, res) => {
            if (err) throw err;
            console.log("");
            console.table(res);
        });
        start();
    });
}

// View the total utilized budget of a department -- ie the combined salaries of all employees in that department
function viewBudget() {
    const query = `SELECT name AS department, SUM (DISTINCT salary) AS budget FROM department INNER JOIN role ON (department.id = role.department_id) INNER JOIN employee ON (role.id = employee.role_id) GROUP BY name ORDER BY budget DESC`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("");
        console.table(res);
    });
    start();
}
