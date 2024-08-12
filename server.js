// Import the required modules
const inquirer = require('inquirer'); // For user prompts
// Import functions from 'functions' module & index.js
const { addDepartment, viewDepartments, addRole, viewRoles, updateEmployeeRole, addEmployee, viewEmployees } = require('./index');

// Create an array of questions for the user
const questions = [
    {
        type: 'list', // Type of prompt
        name: 'departmentList', // Name of the answer object
        message: 'How would you like to proceed?:', // Message to display to the user
        choices: [ // List of choices
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit"
        ],
    }
]

// Initialize the application
function init() {
    // Prompt the user with the defined questions
    inquirer.prompt(questions).then((answers) => {
        // Check which choice was selected and call the corresponding function
        if (answers.departmentList === "View All Departments") {
            viewDepartments(init);
        }
        if (answers.departmentList === "View All Roles") {
            viewRoles(init);
        }
        if (answers.departmentList === "Add Department") {
            addDepartment(init);
        }
        if (answers.departmentList === "View All Employees") {
            viewEmployees(init);
        }
        if (answers.departmentList === "Add Employee") {
            addEmployee(init);
        }
        if (answers.departmentList === "Update Employee Role") {
            updateEmployeeRole(init);
        }
        if (answers.departmentList === "Add Role") {
            addRole(init);
        }
        // Exit the program if the user chooses to quit
        if (answers.departmentList === "Quit") {
            console.log("Returning to main terminal...");
        }
    })
};

// Start the application
init();

