-- stolen_vehicles
CREATE TABLE stolen_vehicles (
  id INTEGER PRIMARY KEY,
  plate TEXT NOT NULL,
  model TEXT NOT NULL,
  color TEXT NOT NULL,
  reported_at TEXT NOT NULL,
  owner_name TEXT NOT NULL
);

INSERT INTO stolen_vehicles (id, plate, model, color, reported_at, owner_name) VALUES
  (1, 'LKJ-4490', 'Corolla', 'Preto', '2026-05-05 14:00', 'Vera Lúcia Paes');

-- radar_log
CREATE TABLE radar_log (
  id INTEGER PRIMARY KEY,
  radar_id TEXT NOT NULL,
  plate TEXT NOT NULL,
  speed_kmh INTEGER NOT NULL,
  captured_at TEXT NOT NULL
);

INSERT INTO radar_log (id, radar_id, plate, speed_kmh, captured_at) VALUES
  (1, 'R-14', 'MNO-3322', 147, '2026-05-05 16:08'),
  (2, 'R-18', 'MNO-3322', 139, '2026-05-05 16:21'),
  (3, 'R-22', 'MNO-3322', 152, '2026-05-05 16:35'),
  (4, 'R-14', 'QPR-7810', 95, '2026-05-05 16:10'),
  (5, 'R-14', 'ZXW-0055', 88, '2026-05-05 16:05');

-- cloned_plates
CREATE TABLE cloned_plates (
  id INTEGER PRIMARY KEY,
  plate TEXT NOT NULL,
  legitimate_model TEXT NOT NULL,
  fraud_detected_at TEXT NOT NULL
);

INSERT INTO cloned_plates (id, plate, legitimate_model, fraud_detected_at) VALUES
  (1, 'MNO-3322', 'Uno', '2026-05-05 17:00');

-- gas_station_cams
CREATE TABLE gas_station_cams (
  id INTEGER PRIMARY KEY,
  station_name TEXT NOT NULL,
  plate TEXT NOT NULL,
  model_observed TEXT NOT NULL,
  observed_at TEXT NOT NULL
);

INSERT INTO gas_station_cams (id, station_name, plate, model_observed, observed_at) VALUES
  (1, 'Auto Posto Irmãos Rosa', 'MNO-3322', 'Corolla Preto', '2026-05-05 16:45'),
  (2, 'Posto Expresso 24h', 'QPR-7810', 'Gol Branco', '2026-05-05 16:50');
