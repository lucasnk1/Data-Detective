-- inspectors
CREATE TABLE inspectors (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  badge TEXT NOT NULL,
  shift TEXT NOT NULL
);

INSERT INTO inspectors (id, name, badge, shift) VALUES
  (1, 'Marcos Vidal', 'INS-001', 'noturno'),
  (2, 'Edson Quirino', 'INS-002', 'noturno'),
  (3, 'Sônia Pacheco', 'INS-003', 'diurno'),
  (4, 'Nilton Barros', 'INS-004', 'noturno'),
  (5, 'Geraldo Matos', 'INS-005', 'diurno');

-- cargo_manifest
CREATE TABLE cargo_manifest (
  id INTEGER PRIMARY KEY,
  container_id TEXT NOT NULL,
  declared_content TEXT NOT NULL,
  operator_id INTEGER NOT NULL,
  last_edited TEXT NOT NULL
);

INSERT INTO cargo_manifest (id, container_id, declared_content, operator_id, last_edited) VALUES
  (1, 'CX-4471', 'Eletrônicos', 2, '2026-05-01 02:55'),
  (2, 'CX-4470', 'Têxteis', 4, '2026-05-01 01:10'),
  (3, 'CX-4469', 'Alimentos', 3, '2026-04-30 14:20'),
  (4, 'CX-4468', 'Autopeças', 2, '2026-04-30 11:00');

-- vehicle_log
CREATE TABLE vehicle_log (
  id INTEGER PRIMARY KEY,
  plate TEXT NOT NULL,
  dock INTEGER NOT NULL,
  entry_time TEXT NOT NULL,
  exit_time TEXT
);

INSERT INTO vehicle_log (id, plate, dock, entry_time, exit_time) VALUES
  (1, 'QRZ-8801', 7, '2026-05-01 02:10', NULL),
  (2, 'PLM-3345', 5, '2026-05-01 01:55', '2026-05-01 03:00'),
  (3, 'FTY-0022', 7, '2026-05-01 02:30', '2026-05-01 04:15'),
  (4, 'ZZK-1190', 3, '2026-05-01 03:50', '2026-05-01 04:30');

-- radio_log
CREATE TABLE radio_log (
  id INTEGER PRIMARY KEY,
  badge TEXT NOT NULL,
  message TEXT NOT NULL,
  timestamp TEXT NOT NULL
);

INSERT INTO radio_log (id, badge, message, timestamp) VALUES
  (1, 'INS-001', 'Iniciando ronda no Cais 7.', '2026-05-01 03:20'),
  (2, 'INS-002', 'Estou no Cais 7 conferindo manifesto.', '2026-05-01 03:25'),
  (3, 'INS-004', 'Cais 5 liberado. Indo para base.', '2026-05-01 03:10'),
  (4, 'INS-002', 'Sem ocorrências por aqui.', '2026-05-01 03:50');
