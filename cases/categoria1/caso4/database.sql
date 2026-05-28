-- departments
CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  floor INTEGER NOT NULL
);

INSERT INTO departments (id, name, floor) VALUES
  (1, 'Financeiro', 12),
  (2, 'Jurídico', 12),
  (3, 'Comercial', 11),
  (4, 'TI', 10);

-- employees
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  department_id INTEGER NOT NULL,
  role TEXT NOT NULL
);

INSERT INTO employees (id, name, email, department_id, role) VALUES
  (1, 'Adriana Campos', 'adriana@nexum.com', 1, 'Diretora Financeira'),
  (2, 'Henrique Sá', 'henrique@nexum.com', 1, 'Analista'),
  (3, 'Priscila Dumont', 'priscila@nexum.com', 2, 'Advogada'),
  (4, 'Roberto Fonseca', 'roberto@nexum.com', 1, 'Gerente'),
  (5, 'Tatiane Luz', 'tatiane@nexum.com', 3, 'Vendedora');

-- building_access
CREATE TABLE building_access (
  id INTEGER PRIMARY KEY,
  employee_id INTEGER NOT NULL,
  floor INTEGER NOT NULL,
  access_time TEXT NOT NULL,
  direction TEXT NOT NULL
);

INSERT INTO building_access (id, employee_id, floor, access_time, direction) VALUES
  (1, 1, 12, '2026-04-18 08:30', 'entrada'),
  (2, 4, 12, '2026-04-18 08:45', 'entrada'),
  (3, 2, 12, '2026-04-18 09:00', 'entrada'),
  (4, 5, 11, '2026-04-18 09:15', 'entrada'),
  (5, 2, 12, '2026-04-18 18:50', 'saida'),
  (6, 5, 11, '2026-04-18 18:30', 'saida'),
  (7, 4, 12, '2026-04-18 20:55', 'saida'),
  (8, 1, 12, '2026-04-18 21:10', 'saida');

-- emails
CREATE TABLE emails (
  id INTEGER PRIMARY KEY,
  sender_email TEXT NOT NULL,
  recipient_email TEXT NOT NULL,
  sent_at TEXT NOT NULL,
  subject TEXT NOT NULL
);

INSERT INTO emails (id, sender_email, recipient_email, sent_at, subject) VALUES
  (1, 'roberto@nexum.com', 'adriana@nexum.com', '2026-04-16 17:22', 'Isso vai ter consequências'),
  (2, 'adriana@nexum.com', 'roberto@nexum.com', '2026-04-16 17:45', 'Re: Isso vai ter consequências'),
  (3, 'henrique@nexum.com', 'adriana@nexum.com', '2026-04-17 10:00', 'Relatório de abril'),
  (4, 'roberto@nexum.com', 'adriana@nexum.com', '2026-04-18 07:55', 'Última chance');
