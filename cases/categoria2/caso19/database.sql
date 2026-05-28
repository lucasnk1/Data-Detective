-- terminals
CREATE TABLE terminals (
  id INTEGER PRIMARY KEY,
  terminal_id TEXT NOT NULL,
  location TEXT NOT NULL,
  status TEXT NOT NULL
);

INSERT INTO terminals (id, terminal_id, location, status) VALUES
  (1, 'TRM-0088', 'Supermercado CentroMar, Recife', 'comprometido'),
  (2, 'TRM-0089', 'Farmácia Saúde Total, Recife', 'normal'),
  (3, 'TRM-0091', 'Posto Shell BR-101, Recife', 'normal'),
  (4, 'TRM-0045', 'Shopping Tacaruna, Recife', 'normal');

-- technicians
CREATE TABLE technicians (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  region TEXT NOT NULL,
  certified INTEGER NOT NULL
);

INSERT INTO technicians (id, name, region, certified) VALUES
  (1, 'Humberto Gomes', 'Norte', 1),
  (2, 'Silvana Reis', 'Sul', 1),
  (3, 'Fausto Bandeira', 'Nordeste', 1),
  (4, 'Cristina Lago', 'Nordeste', 1);

-- maintenance_log
CREATE TABLE maintenance_log (
  id INTEGER PRIMARY KEY,
  terminal_id TEXT NOT NULL,
  technician_id INTEGER NOT NULL,
  service_date TEXT NOT NULL,
  notes TEXT
);

INSERT INTO maintenance_log (id, terminal_id, technician_id, service_date, notes) VALUES
  (1, 'TRM-0088', 3, '2026-04-10', 'Troca de bobina e limpeza'),
  (2, 'TRM-0089', 4, '2026-04-11', 'Atualização de firmware'),
  (3, 'TRM-0088', 1, '2026-03-20', 'Revisão preventiva'),
  (4, 'TRM-0091', 2, '2026-04-09', 'Revisão preventiva'),
  (5, 'TRM-0045', 3, '2026-04-08', 'Substituição de teclado');

-- fraudulent_transactions
CREATE TABLE fraudulent_transactions (
  id INTEGER PRIMARY KEY,
  card_last4 TEXT NOT NULL,
  terminal_id TEXT NOT NULL,
  amount REAL NOT NULL,
  transaction_date TEXT NOT NULL
);

INSERT INTO fraudulent_transactions (id, card_last4, terminal_id, amount, transaction_date) VALUES
  (1, '4821', 'TRM-0088', 320.00, '2026-04-13'),
  (2, '7703', 'TRM-0088', 580.50, '2026-04-14'),
  (3, '2295', 'TRM-0088', 210.00, '2026-04-15'),
  (4, '9910', 'TRM-0088', 450.00, '2026-04-16'),
  (5, '6634', 'TRM-0088', 195.00, '2026-04-17');
