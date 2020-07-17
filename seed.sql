USE employeeTrackerDB;

INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Marketing");
INSERT INTO department (name)
VALUES ("Legal");


INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Cui", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jackie", "Chan", 2, 1);
