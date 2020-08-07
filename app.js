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

// ADD
function add() {
    prompt({
        type: "list",
        name: "Add",
        Message: "What would you like to add?",
        choices: ["Department", "Employee", "Role"],
    }).then((answer) => {
        switch (answer.Add) {
            case "Department":
                addDepartment();
                break;
            case "Employee":
                addEmployee();
                break;
            case "Role":
                addRole();
                break;
        }
    });
}

// DELETE
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
            case "Employee":
                removeEmployee();
                break;
            case "Role":
                removeRole();
                break;
        }
    });
}

// UPDATE
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

// VIEW
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
            case "Employee":
                viewEmployee();
                break;
            case "Role":
                viewRole();
                break;
        }
    });
}

// Department
function addDepartment() {
    prompt({
        name: "department",
        type: "input",
        message:
            "What is the name of the new department that you would like to add?",
    }).then((answer) => {
        const query = `INSERT INTO department (name) VALUES (?);`;
        connection.query(query, [answer.department], (err, res) => {
            if (err) throw err;
            console.log("Successfully added!");
        });
    });
}

function removeDepartment() {
    prompt({
        name: "department",
        type: "input",
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

function viewDepartment() {
    connection.query(`SELECT * FROM department;`, (err, res) => {
        if (err) throw err;
        console.table(res);
    });
}

// Employee
