USE employees_db;

    SELECT
        department.id 'ID',
        department.name 'Department'
    FROM department;

    SELECT 
        empposition.id 'ID',
        empposition.name 'Position'
    FROM position;

    SELECT 
        employee.id 'ID', 
        CONCAT_WS(' ', employee.first_name, employee.last_name) 'Name', 
        empposition.title 'Job',
        department.name 'Department',
        position.salary 'Salary',
        CONCAT_WS(' ', m.first_name, m.last_name) 'Manager'
    FROM department 
    JOIN empposition ON department.id=empposition.department_id
    JOIN employee ON empposition.id=employee.empposition_id
    LEFT JOIN employee AS m ON m.id = employee.manager_id;
