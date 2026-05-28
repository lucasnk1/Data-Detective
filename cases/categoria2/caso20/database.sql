-- access_roles
CREATE TABLE access_roles (
  id INTEGER PRIMARY KEY,
  role_name TEXT NOT NULL,
  can_export INTEGER NOT NULL
);

INSERT INTO access_roles (id, role_name, can_export) VALUES
  (1, 'Medico', 1),
  (2, 'Administrador', 1),
  (3, 'Recepcionista', 0),
  (4, 'TI', 1);

-- staff
CREATE TABLE staff (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  username TEXT NOT NULL,
  role_id INTEGER NOT NULL
);

INSERT INTO staff (id, name, username, role_id) VALUES
  (1, 'Dr. Paulo Serrano', 'pserrano', 1),
  (2, 'Aline Mendes', 'amendes', 3),
  (3, 'Dr. Vanessa Queiroz', 'vqueiroz', 1),
  (4, 'Robson Teles', 'rteles', 4);

-- download_log
CREATE TABLE download_log (
  id INTEGER PRIMARY KEY,
  username TEXT NOT NULL,
  filename TEXT NOT NULL,
  file_size_mb REAL NOT NULL,
  downloaded_at TEXT NOT NULL
);

INSERT INTO download_log (id, username, filename, file_size_mb, downloaded_at) VALUES
  (1, 'rteles', 'pacientes_backup.zip', 48.2, '2026-04-25 23:55'),
  (2, 'pserrano', 'relatorio_mensal.pdf', 2.1, '2026-04-25 14:30'),
  (3, 'vqueiroz', 'exames_abril.csv', 5.8, '2026-04-24 10:15'),
  (4, 'rteles', 'logs_sistema.txt', 0.8, '2026-04-25 09:00');

-- external_connections
CREATE TABLE external_connections (
  id INTEGER PRIMARY KEY,
  username TEXT NOT NULL,
  destination_ip TEXT NOT NULL,
  connected_at TEXT NOT NULL,
  data_sent_mb REAL NOT NULL
);

INSERT INTO external_connections (id, username, destination_ip, connected_at, data_sent_mb) VALUES
  (1, 'rteles', '45.33.99.210', '2026-04-26 00:02', 48.1),
  (2, 'pserrano', '192.168.0.1', '2026-04-25 14:35', 0.1),
  (3, 'vqueiroz', '192.168.0.1', '2026-04-24 10:20', 0.2);
