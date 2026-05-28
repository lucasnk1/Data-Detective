-- flights
CREATE TABLE flights (
  id INTEGER PRIMARY KEY,
  destination TEXT NOT NULL,
  gate TEXT NOT NULL,
  departure TEXT NOT NULL
);

INSERT INTO flights (id, destination, gate, departure) VALUES
  (1, 'Lisboa', 'G12', '2026-05-02 21:50'),
  (2, 'Miami', 'B04', '2026-05-02 22:30'),
  (3, 'Buenos Aires', 'A11', '2026-05-02 20:15');

-- passengers
CREATE TABLE passengers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  passport TEXT NOT NULL,
  age INTEGER NOT NULL,
  height_cm INTEGER
);

INSERT INTO passengers (id, name, passport, age, height_cm) VALUES
  (1, 'André Cunha', 'BR-00112233', 55, 170),
  (2, 'Márcio Beltrão', 'BR-00445566', 38, 182),
  (3, 'Sérgio Lopes', 'BR-00778899', 41, 175),
  (4, 'Wagner Assis', 'BR-00334455', 29, 168);

-- tickets
CREATE TABLE tickets (
  id INTEGER PRIMARY KEY,
  passenger_id INTEGER NOT NULL,
  flight_id INTEGER NOT NULL,
  seat TEXT NOT NULL,
  checkin_time TEXT
);

INSERT INTO tickets (id, passenger_id, flight_id, seat, checkin_time) VALUES
  (1, 1, 1, '14A', '2026-05-02 19:10'),
  (2, 2, 1, '22C', '2026-05-02 20:55'),
  (3, 3, 1, '7B', '2026-05-02 18:30'),
  (4, 4, 2, '11D', '2026-05-02 20:00');

-- passport_control
CREATE TABLE passport_control (
  id INTEGER PRIMARY KEY,
  passport TEXT NOT NULL,
  gate TEXT NOT NULL,
  scan_time TEXT NOT NULL,
  flagged INTEGER NOT NULL
);

INSERT INTO passport_control (id, passport, gate, scan_time, flagged) VALUES
  (1, 'BR-00112233', 'G12', '2026-05-02 21:20', 0),
  (2, 'BR-00445566', 'G12', '2026-05-02 21:30', 0),
  (3, 'BR-00778899', 'G12', '2026-05-02 21:25', 0),
  (4, 'BR-00334455', 'B04', '2026-05-02 22:05', 0);
