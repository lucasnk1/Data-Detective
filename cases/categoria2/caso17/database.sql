-- it_staff
CREATE TABLE it_staff (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  username TEXT NOT NULL,
  profile TEXT NOT NULL
);

INSERT INTO it_staff (id, name, username, profile) VALUES
  (1, 'Augusto Leite', 'aleite', 'suporte'),
  (2, 'Fernanda Cruz', 'fcruz', 'suporte'),
  (3, 'Marcelo Viana', 'mviana', 'admin'),
  (4, 'Patrícia Saes', 'psaes', 'admin');

-- server_access
CREATE TABLE server_access (
  id INTEGER PRIMARY KEY,
  username TEXT NOT NULL,
  server TEXT NOT NULL,
  access_time TEXT NOT NULL,
  action TEXT NOT NULL
);

INSERT INTO server_access (id, username, server, access_time, action) VALUES
  (1, 'mviana', 'backup-server', '2026-04-22 03:10', 'write'),
  (2, 'psaes', 'backup-server', '2026-04-22 09:00', 'read'),
  (3, 'aleite', 'helpdesk-server', '2026-04-22 08:30', 'read'),
  (4, 'mviana', 'backup-server', '2026-04-22 03:11', 'execute'),
  (5, 'fcruz', 'helpdesk-server', '2026-04-22 10:00', 'read');

-- alerts
CREATE TABLE alerts (
  id INTEGER PRIMARY KEY,
  triggered_by TEXT NOT NULL,
  alert_type TEXT NOT NULL,
  triggered_at TEXT NOT NULL
);

INSERT INTO alerts (id, triggered_by, alert_type, triggered_at) VALUES
  (1, 'mviana', 'acesso_fora_horario', '2026-04-22 03:10'),
  (2, 'mviana', 'execucao_suspeita', '2026-04-22 03:11'),
  (3, 'aleite', 'multiplas_tentativas', '2026-04-21 15:40');

-- schedules
CREATE TABLE schedules (
  id INTEGER PRIMARY KEY,
  staff_id INTEGER NOT NULL,
  work_date TEXT NOT NULL,
  shift TEXT NOT NULL
);

INSERT INTO schedules (id, staff_id, work_date, shift) VALUES
  (1, 1, '2026-04-22', 'diurno'),
  (2, 2, '2026-04-22', 'diurno'),
  (3, 3, '2026-04-22', 'diurno'),
  (4, 4, '2026-04-22', 'diurno'),
  (5, 3, '2026-04-21', 'diurno');
