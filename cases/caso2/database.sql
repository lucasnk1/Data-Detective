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

-- accounts
CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL
);

INSERT INTO accounts (id, name, company) VALUES
  (201, 'Orion Trade', 'Orion Trade'),
  (202, 'NovaTech', 'NovaTech'),
  (203, 'Blue Horizon', 'Blue Horizon');

-- transactions
CREATE TABLE transactions (
  id INTEGER PRIMARY KEY,
  employee_id INTEGER NOT NULL,
  account_id INTEGER NOT NULL,
  amount REAL NOT NULL,
  date TEXT NOT NULL
);

INSERT INTO transactions (id, employee_id, account_id, amount, date) VALUES
  (1, 1, 201, 9000, '2024-05-10'),
  (2, 1, 201, 12000, '2024-05-11'),
  (3, 2, 202, 500, '2024-05-12'),
  (4, 1, 201, 15000, '2024-05-13'),
  (5, 3, 203, 800, '2024-05-13');

