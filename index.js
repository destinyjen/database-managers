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

async function addEmployee(cb) {
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
    }finally{
        cb();
    }
}

// Create a function to update an employee's role
async function updateEmployeeRole(cb) {
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
    }finally{
        cb();
    }
}

// Function to add a new role
async function addRole(cb) {
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
    }finally{
        cb();
    }
}

// Create a function to add a new department
async function addDepartment(cb) {
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
    }finally{
        cb();
    }
}

// Create a function to view all roles
async function viewRoles(cb) {
    try {
        // Query the database for all roles
        const result = await pool.query('SELECT title, salary, department_name FROM roles JOIN department ON department.id = roles.department_id');
        console.table(result.rows);
    } catch (error) {
        console.error(error); // Log any errors
    }finally{
        cb();
    }
}

// Create a function to view all employees
async function viewEmployees(cb) {
    try {
        // Query the database for all employees
        const result = await pool.query(`SELECT employee.first_name, employee.last_name, roles.title, roles.salary, department.department_name, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name
        FROM employee
        JOIN roles ON employee.role_id = roles.id
        JOIN department ON department.id = roles.department_id
        LEFT JOIN employee manager ON manager.id = employee.manager_id;
        `);
        console.table(result.rows);
    } catch (error) {
        console.error(error); // Log any errors
    }finally{
        cb();
    }
}

// Create a function to view all departments
async function viewDepartments(cb) {
    try {
        // Query the database for all departments
        const result = await pool.query('SELECT * FROM department');
        console.table(result.rows);
    } catch (error) {
        console.error(error); // Log any errors
    }finally{
        cb();
    }
}

// Export the functions for use in other modules
module.exports = { addDepartment, viewDepartments, addRole, viewRoles, updateEmployeeRole, addEmployee, viewEmployees };







