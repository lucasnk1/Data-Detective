-- employees
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL
);

INSERT INTO employees (id, name, department) VALUES
  (1, 'Carlos Mendes', 'Finance'),
  (2, 'Ana Ribeiro', 'Finance'),
  (3, 'Bruno Costa', 'Accounting'),
  (4, 'Juliana Prado', 'Compliance');

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

-- documents
CREATE TABLE documents (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  classification TEXT NOT NULL
);

INSERT INTO documents (id, title, classification) VALUES
  (1, 'Drone Prototype', 'Secret'),
  (2, 'Budget Plan', 'Internal'),
  (3, 'Missile Guidance', 'Top Secret');

-- document_access
CREATE TABLE document_access (
  id INTEGER PRIMARY KEY,
  employee_id INTEGER NOT NULL,
  document_id INTEGER NOT NULL,
  date TEXT NOT NULL
);

INSERT INTO document_access (id, employee_id, document_id, date) VALUES
  (1, 2, 1, '2024-04-01'),
  (2, 4, 3, '2024-04-02'),
  (3, 1, 2, '2024-04-02'),
  (4, 4, 1, '2024-04-03');

-- external_contacts
CREATE TABLE external_contacts (
  id INTEGER PRIMARY KEY,
  employee_id INTEGER NOT NULL,
  company TEXT NOT NULL
);

INSERT INTO external_contacts (id, employee_id, company) VALUES
  (1, 4, 'Nova Defense'),
  (2, 2, 'University Lab');
