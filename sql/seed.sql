USE employees_db;

INSERT INTO departments(name)
VALUES ('Sales'),
('Finance'),
('IT'),
('HR'),
('Accounts');


INSERT INTO roles (title, salary, department_id)
VALUES ('Engineer', 6000, 3),
('Manager', 7000, 2),
('Director', 9000, 5),
('Vice President', 12000, 4),
('Intern', 9000, 1);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Shweta', 'Sharma', 1, NULL),
('Rajeev', 'Kumar', 3, 1),
('Angel', 'Danley', 2, 2),
('Sam', 'John', 5, 1),
('Ryan', 'Smith', 4, 2);


