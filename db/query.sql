USE employees_db;

    SELECT
        department.id 'ID',
        department.name 'Department'
    FROM department;

    SELECT 
        position.id 'ID',
        position.name 'Position'
    FROM position;

    SELECT 
        employee.id 'ID', 
        CONCAT_WS(' ', employee.first_name, employee.last_name) 'Name', 
        position.title 'Job',
        department.name 'Department',
        position.salary 'Salary',
        CONCAT_WS(' ', m.first_name, m.last_name) 'Manager'
    FROM department 
    JOIN position ON department.id=position.department_id
    JOIN employee ON position.id=employee.position_id
    LEFT JOIN employee AS m ON m.id = employee.manager_id;
