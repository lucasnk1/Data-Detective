-- employees
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL
);

INSERT INTO employees (id, name, department) VALUES
  (1, 'Lucas Andrade', 'Engineering'),
  (2, 'Marina Duarte', 'Research'),
  (3, 'Felipe Rocha', 'Security'),
  (4, 'Renata Campos', 'Research');

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

