const { prompt } = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Yozi-41313",
    database: "employee_trackerDB",
});

connection.connect((err) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});
