-- guests
CREATE TABLE guests (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  room INTEGER NOT NULL,
  checkin_date TEXT NOT NULL,
  checkout_date TEXT
);

INSERT INTO guests (id, name, room, checkin_date, checkout_date) VALUES
  (1, 'Paulo Esteves', 304, '2026-04-12', NULL),
  (2, 'Renata Duarte', 210, '2026-04-12', '2026-04-13'),
  (3, 'Cláudia Pinto', 118, '2026-04-11', '2026-04-13'),
  (4, 'Tereza Lemos', 305, '2026-04-12', NULL),
  (5, 'Marcos Aguiar', 401, '2026-04-10', '2026-04-13');

-- room_access
CREATE TABLE room_access (
  id INTEGER PRIMARY KEY,
  room INTEGER NOT NULL,
  card_id TEXT NOT NULL,
  access_time TEXT NOT NULL,
  direction TEXT NOT NULL
);

INSERT INTO room_access (id, room, card_id, access_time, direction) VALUES
  (1, 304, 'CARD-001', '2026-04-12 22:15', 'entrada'),
  (2, 304, 'CARD-001', '2026-04-12 23:50', 'saida'),
  (3, 304, 'CARD-009', '2026-04-13 00:47', 'entrada'),
  (4, 304, 'CARD-009', '2026-04-13 01:38', 'saida'),
  (5, 304, 'CARD-001', '2026-04-13 01:55', 'entrada'),
  (6, 210, 'CARD-002', '2026-04-12 23:10', 'entrada'),
  (7, 401, 'CARD-005', '2026-04-12 22:00', 'entrada');

-- calls
CREATE TABLE calls (
  id INTEGER PRIMARY KEY,
  from_room INTEGER NOT NULL,
  to_number TEXT NOT NULL,
  call_time TEXT NOT NULL,
  duration_sec INTEGER NOT NULL
);

INSERT INTO calls (id, from_room, to_number, call_time, duration_sec) VALUES
  (1, 304, '21-98800-4411', '2026-04-12 23:30', 142),
  (2, 304, '21-98800-4411', '2026-04-13 01:05', 8),
  (3, 210, '11-97700-2200', '2026-04-13 00:20', 310),
  (4, 305, '21-91111-0000', '2026-04-13 01:10', 55);

-- staff
CREATE TABLE staff (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  card_id TEXT NOT NULL,
  shift TEXT NOT NULL
);

INSERT INTO staff (id, name, role, card_id, shift) VALUES
  (1, 'Fábio Nunes', 'Manutenção', 'CARD-009', 'noturno'),
  (2, 'Sandra Reis', 'Recepção', 'CARD-010', 'noturno'),
  (3, 'Jorge Tavares', 'Segurança', 'CARD-011', 'noturno'),
  (4, 'Patrícia Melo', 'Limpeza', 'CARD-012', 'diurno');
