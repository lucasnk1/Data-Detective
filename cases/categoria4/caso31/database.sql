-- companies
CREATE TABLE companies (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  cnpj TEXT NOT NULL,
  sector TEXT NOT NULL,
  employees_count INTEGER NOT NULL
);

INSERT INTO companies (id, name, cnpj, sector, employees_count) VALUES
  (1, 'Eventos Estelar Ltda', '11.222.333/0001-44', 'Eventos', 0),
  (2, 'Construtech SP', '55.666.777/0001-88', 'Construção', 32),
  (3, 'Agro Norte Ltda', '99.000.111/0001-22', 'Agronegócio', 18);

-- owners
CREATE TABLE owners (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  cpf TEXT NOT NULL,
  politically_exposed INTEGER NOT NULL
);

INSERT INTO owners (id, name, cpf, politically_exposed) VALUES
  (1, 'Osvaldo Cintra', '044.555.666-77', 1),
  (2, 'Berenice Távora', '088.999.111-22', 0),
  (3, 'Antônio Macedo', '033.444.555-66', 0),
  (4, 'Sueli Corrêa', '077.888.999-00', 0);

-- accounts
CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  account_number TEXT NOT NULL,
  holder_type TEXT NOT NULL,
  holder_id TEXT NOT NULL
);

INSERT INTO accounts (id, account_number, holder_type, holder_id) VALUES
  (1, 'CC-001', 'PJ', '11.222.333/0001-44'),
  (2, 'CC-002', 'PF', '044.555.666-77'),
  (3, 'CC-003', 'PF', '088.999.111-22'),
  (4, 'CC-004', 'PF', '033.444.555-66'),
  (5, 'CC-005', 'PF', '077.888.999-00'),
  (6, 'CC-100', 'PF', '011.222.333-44'),
  (7, 'CC-101', 'PF', '055.666.777-88'),
  (8, 'CC-102', 'PF', '099.000.111-22');

-- transfers
CREATE TABLE transfers (
  id INTEGER PRIMARY KEY,
  origin_account TEXT NOT NULL,
  destination_account TEXT NOT NULL,
  amount REAL NOT NULL,
  transfer_date TEXT NOT NULL
);

INSERT INTO transfers (id, origin_account, destination_account, amount, transfer_date) VALUES
  (1, 'CC-100', 'CC-001', 300000, '2026-01-10'),
  (2, 'CC-101', 'CC-001', 280000, '2026-01-10'),
  (3, 'CC-102', 'CC-001', 220000, '2026-01-10'),
  (4, 'CC-001', 'CC-002', 750000, '2026-01-11'),
  (5, 'CC-001', 'CC-003', 30000, '2026-01-11'),
  (6, 'CC-001', 'CC-004', 10000, '2026-01-11'),
  (7, 'CC-001', 'CC-005', 5000, '2026-01-11');
