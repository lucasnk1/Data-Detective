-- crypto_users
CREATE TABLE crypto_users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  cpf TEXT NOT NULL,
  wallet_id TEXT NOT NULL
);

INSERT INTO crypto_users (id, name, cpf, wallet_id) VALUES
  (1, 'Ítalo Brandão', '111.111.111-11', 'W-0055'),
  (2, 'Mariana Siqueira', '222.222.222-22', 'W-0102'),
  (3, 'Dênis Rocha', '333.333.333-33', 'W-0210'),
  (4, 'Fernanda Ávila', '444.444.444-44', 'W-0315');

-- flagged_wallets
CREATE TABLE flagged_wallets (
  id INTEGER PRIMARY KEY,
  wallet_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  flagged_at TEXT NOT NULL
);

INSERT INTO flagged_wallets (id, wallet_id, reason, flagged_at) VALUES
  (1, 'W-0055', 'layering_detectado', '2026-03-15'),
  (2, 'W-0055', 'volume_atipico', '2026-03-15');

-- crypto_transactions
CREATE TABLE crypto_transactions (
  id INTEGER PRIMARY KEY,
  from_wallet TEXT NOT NULL,
  to_wallet TEXT NOT NULL,
  amount_brl REAL NOT NULL,
  tx_time TEXT NOT NULL
);

INSERT INTO crypto_transactions (id, from_wallet, to_wallet, amount_brl, tx_time) VALUES
  (1, 'W-0055', 'W-0102', 380000, '2026-03-10 10:05'),
  (2, 'W-0055', 'W-0210', 420000, '2026-03-10 10:08'),
  (3, 'W-0055', 'W-0315', 310000, '2026-03-10 10:12'),
  (4, 'W-0055', 'W-0401', 290000, '2026-03-10 10:15'),
  (5, 'W-0055', 'W-0512', 260000, '2026-03-10 10:19'),
  (6, 'W-0102', 'W-0600', 375000, '2026-03-11 14:00');

-- withdrawals
CREATE TABLE withdrawals (
  id INTEGER PRIMARY KEY,
  wallet_id TEXT NOT NULL,
  bank_account TEXT NOT NULL,
  amount_brl REAL NOT NULL,
  withdrawal_date TEXT NOT NULL
);

INSERT INTO withdrawals (id, wallet_id, bank_account, amount_brl, withdrawal_date) VALUES
  (1, 'W-0102', 'CC-AA11', 370000, '2026-03-12'),
  (2, 'W-0210', 'CC-BB22', 415000, '2026-03-12'),
  (3, 'W-0315', 'CC-CC33', 305000, '2026-03-12'),
  (4, 'W-0401', 'CC-DD44', 285000, '2026-03-12'),
  (5, 'W-0512', 'CC-EE55', 255000, '2026-03-12');
