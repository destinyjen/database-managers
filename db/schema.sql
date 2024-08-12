-- Drop the 'store_db' database if it exists
DROP DATABASE IF EXISTS store_db;

-- Create a new database named 'store_db'
CREATE DATABASE store_db;

-- Connect to the 'store_db' database
\c store_db;

-- Create the 'department' table
CREATE TABLE department (
    id SERIAL PRIMARY KEY,                   
    department_name VARCHAR(30) UNIQUE NOT NULL 
);

-- Create the 'roles' table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,                   
    title VARCHAR(30) UNIQUE NOT NULL,       
    salary DECIMAL NOT NULL,                 
    department_id INTEGER NOT NULL,          
    FOREIGN KEY (department_id) REFERENCES department(id) 
);

-- Create the 'employee' table
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,                   
    first_name VARCHAR(30) NOT NULL,         
    last_name VARCHAR(30) NOT NULL,         
    role_id INTEGER NOT NULL,               
    manager_id INTEGER,                     
    FOREIGN KEY (role_id) REFERENCES roles(id), 
    FOREIGN KEY (manager_id) REFERENCES employee(id) 
);
