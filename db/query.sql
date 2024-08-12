SELECT department.department_name AS department, employee.first_name
FROM employee
LEFT JOIN roles ON employee.role_id = roles.id
LEFT JOIN department ON roles.department_id = department.id
ORDER BY department.department_name;