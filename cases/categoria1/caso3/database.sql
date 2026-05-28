-- members
CREATE TABLE members (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  plan TEXT NOT NULL,
  join_date TEXT NOT NULL
);

INSERT INTO members (id, name, plan, join_date) VALUES
  (1, 'Leonardo Carvalho', 'Premium', '2025-01-10'),
  (2, 'Bianca Torres', 'Basic', '2025-06-22'),
  (3, 'Rafael Moura', 'Premium', '2024-11-05'),
  (4, 'Camila Dias', 'Basic', '2026-01-15'),
  (5, 'Gustavo Ferraz', 'Staff', '2024-03-01');

-- access_log
CREATE TABLE access_log (
  id INTEGER PRIMARY KEY,
  member_id INTEGER NOT NULL,
  entry_time TEXT NOT NULL,
  exit_time TEXT
);

INSERT INTO access_log (id, member_id, entry_time, exit_time) VALUES
  (1, 1, '2026-04-15 06:02', NULL),
  (2, 3, '2026-04-15 06:08', '2026-04-15 07:45'),
  (3, 5, '2026-04-15 06:00', NULL),
  (4, 4, '2026-04-15 07:30', '2026-04-15 08:20'),
  (5, 2, '2026-04-15 08:00', '2026-04-15 09:10');

-- workout_sessions
CREATE TABLE workout_sessions (
  id INTEGER PRIMARY KEY,
  member_id INTEGER NOT NULL,
  date TEXT NOT NULL,
  locker_number INTEGER NOT NULL,
  personal_id INTEGER
);

INSERT INTO workout_sessions (id, member_id, date, locker_number, personal_id) VALUES
  (1, 1, '2026-04-15', 17, 5),
  (2, 3, '2026-04-15', 22, NULL),
  (3, 1, '2026-04-14', 17, 5),
  (4, 2, '2026-04-14', 9, NULL);

-- lockers
CREATE TABLE lockers (
  id INTEGER PRIMARY KEY,
  number INTEGER NOT NULL,
  status TEXT NOT NULL,
  last_used_by INTEGER
);

INSERT INTO lockers (id, number, status, last_used_by) VALUES
  (1, 17, 'forcado', 1),
  (2, 22, 'normal', 3),
  (3, 9, 'normal', 2),
  (4, 5, 'normal', 5);
