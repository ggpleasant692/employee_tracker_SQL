DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- Switch to database
\c employee_db

CREATE TABLE IF NOT EXISTS departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL REFERENCES departments(id)
);

CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    role_id INTEGER NOT NULL REFERENCES roles(id),
    manager_id INTEGER REFERENCES employees(id)
);
