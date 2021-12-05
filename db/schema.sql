DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE position(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY
    title VARCHAR(30),
    salary FLOAT,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    position_id INT, 
    FOREIGN KEY (position_id) REFERENCES position(id) ON DELETE SET NULL,
    manager_id INT,
    FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE SET NULL
);