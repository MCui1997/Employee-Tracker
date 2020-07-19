USE employeeTrackerDB;

INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Marketing");
INSERT INTO department (name)
VALUES ("Legal");


INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Software Engineer", 120000, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Marketer", 150000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Social Marketer", 120000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Lawyer", 120000, 3);



INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Michael", "Cui", 1, 1);
INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Joey", "Tribbiani", 2, 1);
INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Ross", "Geller", 5, 3);
INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Rachel", "Greene", 3, 4);
INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Monica", "Geller", 4, 4);
INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Chandler", "Bing", 5, 3);
