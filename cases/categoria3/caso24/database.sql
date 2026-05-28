-- inmates
CREATE TABLE inmates (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  registration TEXT NOT NULL,
  risk_level TEXT NOT NULL
);

INSERT INTO inmates (id, name, registration, risk_level) VALUES
  (1, 'Romualdo Faria', 'PEN-20180044', 'alto'),
  (2, 'Joaquim Seabra', 'PEN-20190112', 'medio'),
  (3, 'Ivan Terceiro', 'PEN-20200311', 'baixo');

-- agent_log
CREATE TABLE agent_log (
  id INTEGER PRIMARY KEY,
  agent_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  action TEXT NOT NULL,
  action_date TEXT NOT NULL,
  on_leave INTEGER NOT NULL
);

INSERT INTO agent_log (id, agent_id, name, action, action_date, on_leave) VALUES
  (1, 3, 'Valdir Uchôa', 'assinou_laudo_psicologico', '2026-04-20', 0),
  (2, 1, 'Sandro Albuquerque', 'revisao_de_prontuario', '2026-04-20', 0),
  (3, 4, 'Mirela Fontes', 'perito_responsavel_laudo', '2026-04-20', 1),
  (4, 2, 'Célia Drummond', 'aprovacao_saida_temporaria', '2026-04-19', 0);

-- temp_releases
CREATE TABLE temp_releases (
  id INTEGER PRIMARY KEY,
  inmate_id INTEGER NOT NULL,
  approved_by INTEGER NOT NULL,
  release_date TEXT NOT NULL,
  return_deadline TEXT NOT NULL,
  returned INTEGER NOT NULL
);

INSERT INTO temp_releases (id, inmate_id, approved_by, release_date, return_deadline, returned) VALUES
  (1, 1, 3, '2026-04-21', '2026-04-22', 0),
  (2, 2, 2, '2026-04-18', '2026-04-19', 1),
  (3, 3, 1, '2026-04-10', '2026-04-11', 1);

-- sightings
CREATE TABLE sightings (
  id INTEGER PRIMARY KEY,
  inmate_registration TEXT NOT NULL,
  location TEXT NOT NULL,
  sighting_time TEXT NOT NULL
);

INSERT INTO sightings (id, inmate_registration, location, sighting_time) VALUES
  (1, 'PEN-20180044', 'Rodoviária de Fortaleza', '2026-04-21 14:30'),
  (2, 'PEN-20180044', 'Posto de gasolina BR-116', '2026-04-21 17:00'),
  (3, 'PEN-20180044', 'Cidade de Juazeiro do Norte', '2026-04-21 20:45');
