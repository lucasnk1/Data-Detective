-- employees
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  department TEXT NOT NULL
);

INSERT INTO employees (id, name, email, department) VALUES
  (1, 'Viviane Nobre', 'viviane@vetora.com', 'RH'),
  (2, 'Thiago Brant', 'thiago@vetora.com', 'TI'),
  (3, 'Cecília Alves', 'cecilia@vetora.com', 'Financeiro'),
  (4, 'Rodrigo Penna', 'rodrigo@vetora.com', 'Comercial'),
  (5, 'Larissa Vaz', 'larissa@vetora.com', 'RH');

-- email_log
CREATE TABLE email_log (
  id INTEGER PRIMARY KEY,
  sender_email TEXT NOT NULL,
  recipient_email TEXT NOT NULL,
  sent_at TEXT NOT NULL,
  device_id TEXT NOT NULL,
  has_link INTEGER NOT NULL
);

INSERT INTO email_log (id, sender_email, recipient_email, sent_at, device_id, has_link) VALUES
  (1, 'viviane@vetora.com', 'larissa@vetora.com', '2026-04-20 09:10', 'DEV-001', 0),
  (2, 'thiago@vetora.com', 'viviane@vetora.com', '2026-04-20 11:47', 'DEV-007', 1),
  (3, 'cecilia@vetora.com', 'rodrigo@vetora.com', '2026-04-20 10:30', 'DEV-003', 0),
  (4, 'rodrigo@vetora.com', 'larissa@vetora.com', '2026-04-20 14:00', 'DEV-004', 0);

-- vpn_sessions
CREATE TABLE vpn_sessions (
  id INTEGER PRIMARY KEY,
  employee_id INTEGER NOT NULL,
  device_id TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT
);

INSERT INTO vpn_sessions (id, employee_id, device_id, start_time, end_time) VALUES
  (1, 2, 'DEV-007', '2026-04-20 11:30', '2026-04-20 12:15'),
  (2, 1, 'DEV-001', '2026-04-20 09:00', '2026-04-20 18:00'),
  (3, 3, 'DEV-003', '2026-04-20 08:30', '2026-04-20 17:30'),
  (4, 4, 'DEV-004', '2026-04-20 10:00', '2026-04-20 16:00');

-- devices
CREATE TABLE devices (
  id INTEGER PRIMARY KEY,
  device_id TEXT NOT NULL,
  owner_id INTEGER NOT NULL,
  type TEXT NOT NULL
);

INSERT INTO devices (id, device_id, owner_id, type) VALUES
  (1, 'DEV-001', 1, 'Notebook'),
  (2, 'DEV-002', 5, 'Desktop'),
  (3, 'DEV-003', 3, 'Notebook'),
  (4, 'DEV-004', 4, 'Notebook'),
  (5, 'DEV-007', 2, 'Notebook');
