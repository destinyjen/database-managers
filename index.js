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
            message: "Enter the employee's first name:"
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter the employee's last name:"
        },
        {
            type: "input",
            name: "role_id",
            message: "Enter the employee's role ID:"
        },
    ]);

