-- employees
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL
);

INSERT INTO employees (id, name, department) VALUES
  (1, 'Rafael Lima', 'Developer'),
  (2, 'Camila Torres', 'Security'),
  (3, 'Diego Martins', 'SysAdmin'),
  (4, 'Paula Alves', 'Developer');

-- login_logs
CREATE TABLE login_logs (
  id INTEGER PRIMARY KEY,
  employee_id INTEGER NOT NULL,
  time TEXT NOT NULL,
  ip TEXT NOT NULL
);

INSERT INTO login_logs (id, employee_id, time, ip) VALUES
  (1, 1, '09:10', '192.168.0.10'),
  (2, 3, '23:45', '88.201.44.2'),
  (3, 2, '10:00', '192.168.0.12'),
  (4, 4, '09:20', '192.168.0.14');

-- server_access
CREATE TABLE server_access (
  id INTEGER PRIMARY KEY,
  employee_id INTEGER NOT NULL,
  resource TEXT NOT NULL,
  time TEXT NOT NULL
);

INSERT INTO server_access (id, employee_id, resource, time) VALUES
  (1, 3, 'client_database', '23:50'),
  (2, 1, 'dev_notes', '11:00'),
  (3, 4, 'project_docs', '10:20');

