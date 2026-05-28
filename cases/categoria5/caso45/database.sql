-- attendants
CREATE TABLE attendants (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  employee_id TEXT NOT NULL,
  store TEXT NOT NULL,
  flagged_complaints INTEGER NOT NULL
);

INSERT INTO attendants (id, name, employee_id, store, flagged_complaints) VALUES
  (1, 'Willian Tavares', 'ATD-001', 'Loja Shopping Iguatemi', 0),
  (2, 'Jacqueline Mota', 'ATD-002', 'Loja Shopping Iguatemi', 1),
  (3, 'Evandro Prado', 'ATD-003', 'Loja Centro', 4),
  (4, 'Simone Luz', 'ATD-004', 'Loja Centro', 0);

-- sim_swap_requests
CREATE TABLE sim_swap_requests (
  id INTEGER PRIMARY KEY,
  phone_number TEXT NOT NULL,
  cpf TEXT NOT NULL,
  approved_by INTEGER NOT NULL,
  request_date TEXT NOT NULL,
  store TEXT NOT NULL
);

INSERT INTO sim_swap_requests (id, phone_number, cpf, approved_by, request_date, store) VALUES
  (1, '11-97700-5544', '200.300.400-50', 3, '2026-04-14 11:30', 'Loja Centro'),
  (2, '11-98800-1122', '600.700.800-90', 1, '2026-04-13 14:00', 'Loja Shopping Iguatemi'),
  (3, '11-96600-3344', '010.020.030-40', 4, '2026-04-10 09:15', 'Loja Centro');

-- auth_tokens
CREATE TABLE auth_tokens (
  id INTEGER PRIMARY KEY,
  phone_number TEXT NOT NULL,
  token_type TEXT NOT NULL,
  sent_at TEXT NOT NULL
);

INSERT INTO auth_tokens (id, phone_number, token_type, sent_at) VALUES
  (1, '11-97700-5544', 'sms_banco_alpha', '2026-04-14 11:45'),
  (2, '11-97700-5544', 'sms_banco_beta', '2026-04-14 12:10'),
  (3, '11-97700-5544', 'sms_banco_gama', '2026-04-14 12:30');

-- bank_events
CREATE TABLE bank_events (
  id INTEGER PRIMARY KEY,
  cpf TEXT NOT NULL,
  event_type TEXT NOT NULL,
  amount REAL,
  event_time TEXT NOT NULL
);

INSERT INTO bank_events (id, cpf, event_type, amount, event_time) VALUES
  (1, '200.300.400-50', 'reset_senha', NULL, '2026-04-14 11:50'),
  (2, '200.300.400-50', 'transferencia_pix', 18000, '2026-04-14 12:00'),
  (3, '200.300.400-50', 'transferencia_pix', 22000, '2026-04-14 12:15'),
  (4, '200.300.400-50', 'transferencia_pix', 9500, '2026-04-14 12:35');
