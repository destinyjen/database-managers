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
            [employee.first_name, employee.last_name, employee.role_id]
        );
        console.log("New Employee Successfully Added!");
    } 
    catch (error) {
        console.error(error); //Log any errors
    }
}




