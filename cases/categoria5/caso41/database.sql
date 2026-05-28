-- accounts
CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  account_number TEXT NOT NULL,
  holder_name TEXT NOT NULL,
  cpf TEXT NOT NULL,
  open_date TEXT NOT NULL,
  open_method TEXT NOT NULL
);

INSERT INTO accounts (id, account_number, holder_name, cpf, open_date, open_method) VALUES
  (1, 'CC-ORIG-2021', 'Carla Drummond', '777.888.999-00', '2021-06-15', 'presencial'),
  (2, 'CC-FRAUD-2026', 'Carla Drummond', '777.888.999-00', '2026-02-10', 'online'),
  (3, 'CC-POUP-2023', 'Bruno Almada', '111.222.333-44', '2023-03-01', 'presencial'),
  (4, 'CC-EMP-2024', 'Sônia Bastos', '555.666.777-88', '2024-11-20', 'online');

-- transactions
CREATE TABLE transactions (
  id INTEGER PRIMARY KEY,
  account_number TEXT NOT NULL,
  description TEXT NOT NULL,
  amount REAL NOT NULL,
  tx_date TEXT NOT NULL
);

INSERT INTO transactions (id, account_number, description, amount, tx_date) VALUES
  (1, 'CC-FRAUD-2026', 'Compra ecommerce - eletronicos', 4800, '2026-02-12'),
  (2, 'CC-FRAUD-2026', 'Compra ecommerce - joias', 7200, '2026-02-13'),
  (3, 'CC-FRAUD-2026', 'Solicitacao emprestimo pessoal', 30000, '2026-02-14'),
  (4, 'CC-ORIG-2021', 'Pagamento fatura', 320, '2026-02-10'),
  (5, 'CC-ORIG-2021', 'TEd recebido - salario', 5200, '2026-02-05');

-- logins
CREATE TABLE logins (
  id INTEGER PRIMARY KEY,
  account_number TEXT NOT NULL,
  ip_address TEXT NOT NULL,
  device_id TEXT NOT NULL,
  login_time TEXT NOT NULL
);

INSERT INTO logins (id, account_number, ip_address, device_id, login_time) VALUES
  (1, 'CC-ORIG-2021', '177.52.10.201', 'DEV-HOME-01', '2026-02-10 08:30'),
  (2, 'CC-FRAUD-2026', '45.88.201.99', 'DEV-UNKN-77', '2026-02-12 02:15'),
  (3, 'CC-FRAUD-2026', '45.88.201.99', 'DEV-UNKN-77', '2026-02-13 03:40'),
  (4, 'CC-FRAUD-2026', '45.88.201.99', 'DEV-UNKN-77', '2026-02-14 01:55');

-- devices_fp
CREATE TABLE devices_fp (
  id INTEGER PRIMARY KEY,
  device_id TEXT NOT NULL,
  known_fraud INTEGER NOT NULL,
  first_seen TEXT NOT NULL
);

INSERT INTO devices_fp (id, device_id, known_fraud, first_seen) VALUES
  (1, 'DEV-HOME-01', 0, '2021-06-15'),
  (2, 'DEV-UNKN-77', 1, '2026-01-20');
