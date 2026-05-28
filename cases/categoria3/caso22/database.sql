-- documents
CREATE TABLE documents (
  id INTEGER PRIMARY KEY,
  cpf TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  reported_stolen INTEGER NOT NULL,
  report_date TEXT
);

INSERT INTO documents (id, cpf, owner_name, reported_stolen, report_date) VALUES
  (1, '321.654.987-00', 'João Evangelista', 0, NULL),
  (2, '111.222.333-44', 'Renato Fraga', 1, '2026-04-28'),
  (3, '555.666.777-88', 'Ciro Sampaio', 0, NULL),
  (4, '999.888.777-66', 'Leandro Mota', 0, NULL);

-- crossings
CREATE TABLE crossings (
  id INTEGER PRIMARY KEY,
  document_id TEXT NOT NULL,
  post TEXT NOT NULL,
  crossing_time TEXT NOT NULL,
  direction TEXT NOT NULL
);

INSERT INTO crossings (id, document_id, post, crossing_time, direction) VALUES
  (1, '111.222.333-44', 'PF-07', '2026-04-30 04:42', 'saida'),
  (2, '321.654.987-00', 'PF-01', '2026-04-30 06:10', 'saida'),
  (3, '555.666.777-88', 'PF-07', '2026-04-29 22:00', 'entrada'),
  (4, '999.888.777-66', 'PF-03', '2026-04-30 05:30', 'saida');

-- vehicles_log
CREATE TABLE vehicles_log (
  id INTEGER PRIMARY KEY,
  plate TEXT NOT NULL,
  post TEXT NOT NULL,
  pass_time TEXT NOT NULL,
  plate_readable INTEGER NOT NULL
);

INSERT INTO vehicles_log (id, plate, post, pass_time, plate_readable) VALUES
  (1, 'XXX-0000', 'PF-07', '2026-04-30 04:40', 0),
  (2, 'ABC-1234', 'PF-01', '2026-04-30 06:08', 1),
  (3, 'GHY-9901', 'PF-03', '2026-04-30 05:28', 1),
  (4, 'DEF-5678', 'PF-07', '2026-04-29 21:58', 1);

-- alerts
CREATE TABLE alerts (
  id INTEGER PRIMARY KEY,
  cpf TEXT NOT NULL,
  alert_type TEXT NOT NULL,
  issued_at TEXT NOT NULL
);

INSERT INTO alerts (id, cpf, alert_type, issued_at) VALUES
  (1, '111.222.333-44', 'documento_roubado', '2026-04-28 10:00'),
  (2, '111.222.333-44', 'suspeito_foragido', '2026-04-29 18:00');
