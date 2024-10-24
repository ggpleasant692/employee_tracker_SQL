class Employee {
    constructor(firstName, lastName, roleId, managerId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleId = roleId;
        this.managerId = managerId;
    }
}

class Role {
    constructor(title, salary, departmentId) {
        this.title = title;
        this.salary = salary;
        this.departmentId = departmentId;
    }
}

class Department {
    constructor(name) {
        this.name = name;
    }
}

module.exports = { Employee, Role, Department };