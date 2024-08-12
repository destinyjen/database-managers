-- Insert departments into the 'department' table
INSERT INTO department (department_name)
VALUES 
    ('Engineering'),       
    ('Marketing'),          
    ('Human Resources');     

-- Insert roles into the 'roles' table with associated salaries and department IDs
INSERT INTO roles (title, salary, department_id)
VALUES 
    ('Software Engineer', 11000, 1),      
    ('Marketing Manager', 80000, 2),     
    ('HR Specialist', 70000, 3);          

-- Insert employees into the 'employee' table with their respective role IDs
INSERT INTO employee (first_name, last_name, role_id)
VALUES 
    ('John', 'Doe', 1),      
    ('Jane', 'Smith', 3),     
    ('Michael', 'Johnson', 2);