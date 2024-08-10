// Import required modules (inquier for user prompts, pg for PostgreSQL database interaction, dotenv for loading environment variables)
const inquirer = require("inquirer");
const { Pool } = require('pg');
require("dotenv").config(); 

// Pool instance for PostgreSQL database connection using environment variables
const pool = new Pool(
    {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: 'localhost',
        database: process.env.DB_NAME,
    },
    console.log(`Connected to the store_db Database!`) // console.log a message to confirm successful connection
);

// Create a function to add in a new employee

async function addEmployee() {
    // Prompt user for employee information

    const employee = await inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Enter employee's first name:"
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter employee's last name:"
        },
        {
            type: "input",
            name: "role_id",
            message: "Enter employee's role ID:"
        },
    ]);

    // Reconstruct the answers object
    const { first_name, last_name, role_id } = employee;

    // Insert new employee into the database
    try {
        const result = await pool.query(
            `INSERT INTO employee (first_name, last_name, role_id) VALUES ($1, $2, $3) RETURNING *`,
            [first_name, last_name, role_id]
        );
        console.log("New Employee Successfully Added!");
    } 
    catch (error) {
        console.error(error); //Log any errors
    }
}

// Create a function to update an employee's role
async function updateEmployeeRole() {
    // Prompt user for employee details and new role ID
    const employee = await inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Enter employee's first name:"
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter employee's last name:"
        },
        {
            type: "input",
            name: "role_id",
            message: "Enter employee's new role ID:"
        },
    ]);

    // Reconstruct the employee object
    const { first_name, last_name, role_id } = employee;

    // Update the employee's role in the database
    try {
        const result = await pool.query(
            `UPDATE employee SET role_id = $1 WHERE first_name = $2 AND last_name = $3 RETURNING *`,
            [role_id, first_name, last_name]
        );
        console.log(`Employee successfully updated for ${first_name} ${last_name}!`);
    } 
    catch (error) {
        console.error(error); //Log any errors
    }
}

// Function to add a new role
async function addRole() {
    // Prompt user for role details
    const questions = [
        {
            type: "input",
            name: "title",
            message: "Enter the new roles title:"
        },
        {
            type: "input",
            name: "salary",
            message: "Enter the new role salary:"
        },
        {
            type: "input",
            name: "department_id",
            message: "Enter the new role department ID:"
        },
    ];

    try {
        const role = await inquirer.prompt(questions);
          // Reconstruct the role object
        const { title, salary, department_id } = role;

        // Insert the new role into the database
        const result = await pool.query(
            `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *`,
            [title, salary, department_id]
        );
        console.log("New Role Successfully Added!");
    } catch (error) {
        console.error(error); //Log any errors
    }
}

// Create a function to add a new department
async function addDepartment() {
    try {
        // Prompt user for department name
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'department_name',
                message: "What is the name of your new department?",
            }
        ]);

        const departmentName = answers.department_name;

        try {
            // Insert the new department into the database
            const result = await pool.query(
                'INSERT INTO department (department_name) VALUES ($1)',
                [departmentName]
            );
            console.log("New Department Successfully Added!");
        } catch (error) {
            console.error(error); // Log any errors
        }
    } catch (error) {
        console.error(error); // Log any errors
    }
}

// Create a function to view all roles
async function viewRoles() {
    try {
        // Query the database for all roles
        const result = await pool.query('SELECT * FROM role');
        console.table(result.rows);
    } catch (error) {
        console.error(error); // Log any errors
    }
}






