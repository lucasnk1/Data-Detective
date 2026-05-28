-- agents
CREATE TABLE agents (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  employee_id TEXT NOT NULL,
  access_level TEXT NOT NULL
);

INSERT INTO agents (id, name, employee_id, access_level) VALUES
  (1, 'Aparecida Santos', 'EMP-0011', 'operador'),
  (2, 'Nelson Quirino', 'EMP-0022', 'supervisor'),
  (3, 'Graça Tavares', 'EMP-0033', 'operador'),
  (4, 'Márcio Daltro', 'EMP-0044', 'operador');

-- beneficiaries
CREATE TABLE beneficiaries (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  cpf TEXT NOT NULL,
  status TEXT NOT NULL,
  last_updated_by INTEGER
);

INSERT INTO beneficiaries (id, name, cpf, status, last_updated_by) VALUES
  (1, 'Hermínio Costa', '101.202.303-40', 'ativo', 2),
  (2, 'Dalva Ferreira', '505.606.707-80', 'ativo', 2),
  (3, 'Aristides Nunes', '909.010.111-20', 'ativo', 2),
  (4, 'Otávio Lima', '131.415.161-70', 'ativo', 1);

-- death_registry
CREATE TABLE death_registry (
  id INTEGER PRIMARY KEY,
  cpf TEXT NOT NULL,
  death_date TEXT NOT NULL,
  registry_office TEXT NOT NULL
);

INSERT INTO death_registry (id, cpf, death_date, registry_office) VALUES
  (1, '101.202.303-40', '2025-08-14', 'Cartório Belém PA'),
  (2, '505.606.707-80', '2025-09-02', 'Cartório Belém PA'),
  (3, '909.010.111-20', '2025-11-30', 'Cartório Marabá PA');

-- payments
CREATE TABLE payments (
  id INTEGER PRIMARY KEY,
  cpf TEXT NOT NULL,
  amount REAL NOT NULL,
  payment_date TEXT NOT NULL,
  bank_account TEXT NOT NULL
);

INSERT INTO payments (id, cpf, amount, payment_date, bank_account) VALUES
  (1, '101.202.303-40', 1412, '2026-01-05', 'CC-88991'),
  (2, '101.202.303-40', 1412, '2026-02-05', 'CC-88991'),
  (3, '505.606.707-80', 1412, '2026-01-05', 'CC-88991'),
  (4, '505.606.707-80', 1412, '2026-02-05', 'CC-88991'),
  (5, '909.010.111-20', 1412, '2026-01-05', 'CC-88991'),
  (6, '131.415.161-70', 1412, '2026-01-05', 'CC-77880');
