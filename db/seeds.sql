
INSERT INTO departments (name) VALUES ('Engineering');
INSERT INTO departments (name) VALUES ('Finance');
INSERT INTO departments (name) VALUES ('Legal');

INSERT INTO roles (title, salary, department_id) VALUES ('Software Engineer', 80000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('System Analyst', 75000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Accountant', 65000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('Financial Analyst', 95000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('Corporate Lawyer', 65000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('John', 'Berry', 1, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Bob', 'Harris', 1, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Vicky', 'Smith', 2, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Vince', 'Goldman', 2, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Harold', 'Smith', 1, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Cameron', 'Simpson', 3, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Holly', 'Franklin', 2, 2);
