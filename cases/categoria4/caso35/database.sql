-- players
CREATE TABLE players (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  cpf TEXT NOT NULL,
  country TEXT NOT NULL
);

INSERT INTO players (id, name, cpf, country) VALUES
  (1, 'Bruno Cavalcante', '123.456.789-00', 'Brasil'),
  (2, 'Priscila Nakamura', '234.567.890-11', 'Brasil'),
  (3, 'Hélio Santana', '345.678.901-22', 'Brasil'),
  (4, 'Yara Pinheiro', '456.789.012-33', 'Brasil');

-- deposits_casino
CREATE TABLE deposits_casino (
  id INTEGER PRIMARY KEY,
  player_id INTEGER NOT NULL,
  amount REAL NOT NULL,
  deposit_date TEXT NOT NULL
);

INSERT INTO deposits_casino (id, player_id, amount, deposit_date) VALUES
  (1, 1, 5000, '2026-03-01'),
  (2, 1, 3000, '2026-03-10'),
  (3, 2, 2000, '2026-03-05'),
  (4, 3, 500000, '2026-03-01'),
  (5, 4, 8000, '2026-03-08');

-- bets
CREATE TABLE bets (
  id INTEGER PRIMARY KEY,
  player_id INTEGER NOT NULL,
  amount REAL NOT NULL,
  bet_date TEXT NOT NULL
);

INSERT INTO bets (id, player_id, amount, bet_date) VALUES
  (1, 1, 800, '2026-03-01'),
  (2, 1, 1200, '2026-03-02'),
  (3, 1, 500, '2026-03-11'),
  (4, 2, 1800, '2026-03-06'),
  (5, 3, 4000, '2026-03-02'),
  (6, 3, 4000, '2026-03-03'),
  (7, 4, 7500, '2026-03-09');

-- cashouts
CREATE TABLE cashouts (
  id INTEGER PRIMARY KEY,
  player_id INTEGER NOT NULL,
  amount REAL NOT NULL,
  cashout_date TEXT NOT NULL
);

INSERT INTO cashouts (id, player_id, amount, cashout_date) VALUES
  (1, 1, 4200, '2026-03-15'),
  (2, 2, 1500, '2026-03-12'),
  (3, 3, 490000, '2026-03-05'),
  (4, 4, 7800, '2026-03-14');
