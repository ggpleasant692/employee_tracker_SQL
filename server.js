const inquirer = require('inquirer');
const express = require('express');
const { Pool } = require('pg');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pool = new Pool({
    user: 'kodlegend',
    password: 'touchdown#86',
    host: 'localhost',
    database: 'employee_db'
});

// Connect to the database
pool.connect()
    .then(() => console.log(`Connected to the employee_db database.`))
    .catch(err => console.error('Connection error', err.stack));

// Main menu function to prompt user for actions
const mainMenu = async () => {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Update employee manager',
                'View employees by manager',
                'View employees by department',
                'Delete a department',
                'View department budget',
                'Exit'
            ],
        },
    ]);

    // Handle user action
    switch (action) {
        case 'View all departments':
            await viewDepartments();
            break;
        case 'View all roles':
            await viewRoles();
            break;
        case 'View all employees':
            await viewEmployees();
            break;
        case 'Add a department':
            await addDepartment();
            break;
        case 'Add a role':
            await addRole();
            break;
        case 'Add an employee':
            await addEmployee();
            break;
        case 'Update an employee role':
            await updateEmployeeRole();
            break;
        case 'Update employee manager':
            await updateEmployeeManager();
            break;
        case 'View employees by manager':
            await viewEmployeesByManager();
            break;
        case 'View employees by department':
            await viewEmployeesByDepartment();
            break;
        case 'Delete a department':
            await deleteDepartment();
            break;
        case 'View department budget':
            await viewDepartmentBudget();
            break;
        case 'Exit':
            process.exit();
    }
};

// Function to fetch and display all departments
const viewDepartments = async () => {
    try {
        const results = await pool.query('SELECT * FROM departments');
        console.table(results.rows);
    } catch (error) {
        console.error('Error fetching departments:', error);
    } finally {
        mainMenu();
    }
};

// Function to fetch and display all roles
const viewRoles = async () => {
    try {
        const results = await pool.query('SELECT * FROM roles');
        console.table(results.rows);
    } catch (error) {
        console.error('Error fetching roles:', error);
    } finally {
        mainMenu();
    }
};

// Function to fetch and display all employees
const viewEmployees = async () => {
    try {
        const results = await pool.query('SELECT * FROM employees');
        console.table(results.rows);
    } catch (error) {
        console.error('Error fetching employees:', error);
    } finally {
        mainMenu();
    }
};

// Function to add a new department
const addDepartment = async () => {
    const { departmentName } = await inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Enter the name of the new department:',
        },
    ]);
    await pool.query('INSERT INTO departments (name) VALUES ($1)', [departmentName]);
    console.log('Department added successfully.');
    mainMenu();
};

// Function to add a new role
const addRole = async () => {
    const departments = await pool.query('SELECT * FROM departments');
    const { roleName, salary, departmentId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'Enter the name of the new role:',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for the role:',
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'Select a department for this role:',
            choices: departments.rows.map(dep => ({ name: dep.name, value: dep.id })),
        },
    ]);
    await pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [roleName, salary, departmentId]);
    console.log('Role added successfully.');
    mainMenu();
};

// Function to add a new employee
const addEmployee = async () => {
    const roles = await pool.query('SELECT * FROM roles');
    const { firstName, lastName, roleId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the employee’s first name:',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the employee’s last name:',
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'Select a role for this employee:',
            choices: roles.rows.map(role => ({ name: role.title, value: role.id })),
        },
    ]);
    await pool.query('INSERT INTO employees (first_name, last_name, role_id) VALUES ($1, $2, $3)', [firstName, lastName, roleId]);
    console.log('Employee added successfully.');
    mainMenu();
};

// Function to update an employee's role
const updateEmployeeRole = async () => {
    const employees = await pool.query('SELECT * FROM employees');
    const roles = await pool.query('SELECT * FROM roles');
    const { employeeId, newRoleId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Select an employee to update:',
            choices: employees.rows.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id })),
        },
        {
            type: 'list',
            name: 'newRoleId',
            message: 'Select the new role for this employee:',
            choices: roles.rows.map(role => ({ name: role.title, value: role.id })),
        },
    ]);
    await pool.query('UPDATE employees SET role_id = $1 WHERE id = $2', [newRoleId, employeeId]);
    console.log('Employee role updated successfully.');
    mainMenu();
};

// Function to update an employee's manager
const updateEmployeeManager = async () => {
    const employees = await pool.query('SELECT * FROM employees');
    const { employeeId, managerId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Select the employee to update:',
            choices: employees.rows.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
        },
        {
            type: 'list',
            name: 'managerId',
            message: 'Select the new manager:',
            choices: employees.rows.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
        },
    ]);
    await pool.query('UPDATE employees SET manager_id = $1 WHERE id = $2', [managerId, employeeId]);
    console.log('Employee manager updated successfully.');
    mainMenu();
};

// Function to view employees by manager
const viewEmployeesByManager = async () => {
    const managers = await pool.query('SELECT * FROM employees WHERE manager_id IS NULL'); // Fetch managers
    const { managerId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'managerId',
            message: 'Select a manager to view their employees:',
            choices: managers.rows.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
        },
    ]);
    const employees = await pool.query('SELECT * FROM employees WHERE manager_id = $1', [managerId]);
    console.table(employees.rows); // Display employees
    mainMenu();
};

// Function to view employees by department
const viewEmployeesByDepartment = async () => {
    const departments = await pool.query('SELECT * FROM departments');
    const { departmentId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'departmentId',
            message: 'Select a department to view employees:',
            choices: departments.rows.map(dep => ({ name: dep.name, value: dep.id }))
        },
    ]);
    const employees = await pool.query('SELECT * FROM employees WHERE role_id IN (SELECT id FROM roles WHERE department_id = $1)', [departmentId]);
    console.table(employees.rows); // Display employees
    mainMenu();
};

// Function to delete a department
const deleteDepartment = async () => {
    const departments = await pool.query('SELECT * FROM departments');
    const { departmentId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'departmentId',
            message: 'Select a department to delete:',
            choices: departments.rows.map(dep => ({ name: dep.name, value: dep.id }))
        },
    ]);

    // First, delete roles associated with this department
    await pool.query('DELETE FROM roles WHERE department_id = $1', [departmentId]);

    // Then, delete the department
    await pool.query('DELETE FROM departments WHERE id = $1', [departmentId]);
    console.log('Department and associated roles deleted successfully.');
    mainMenu();
};

// Function to view the total budget of a department
const viewDepartmentBudget = async () => {
    const departments = await pool.query('SELECT * FROM departments');
    const { departmentId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'departmentId',
            message: 'Select a department to view its budget:',
            choices: departments.rows.map(dep => ({ name: dep.name, value: dep.id }))
        },
    ]);
    const budget = await pool.query('SELECT SUM(salary) AS total_budget FROM roles WHERE department_id = $1', [departmentId]);
    console.log(`Total budget for the department: $${budget.rows[0].total_budget}`);
    mainMenu();
};

// Start the application
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    mainMenu();
});