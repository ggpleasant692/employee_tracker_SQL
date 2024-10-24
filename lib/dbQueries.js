const db = require('../db/connection');

const viewDepartments = () => {
    return db.query('SELECT * FROM department');
};

const viewRoles = () => {
    return db.query('SELECT role.id, title, salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id');
};

const viewEmployees = () => {
    return db.query('SELECT employee.id, first_name, last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id');
};

const addDepartment = (name) => {
    return db.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

// Add other CRUD functions...

module.exports = { viewDepartments, viewRoles, viewEmployees, addDepartment };