-- onboarding_sessions
CREATE TABLE onboarding_sessions (
  id INTEGER PRIMARY KEY,
  session_id TEXT NOT NULL,
  device_id TEXT NOT NULL,
  cpf_informed TEXT NOT NULL,
  started_at TEXT NOT NULL
);

INSERT INTO onboarding_sessions (id, session_id, device_id, cpf_informed, started_at) VALUES
  (1, 'SESS-A1', 'MOB-1001', '100.200.300-40', '2026-03-20 10:00'),
  (2, 'SESS-A2', 'MOB-2002', '500.600.700-80', '2026-03-21 14:30'),
  (3, 'SESS-A3', 'MOB-9999', '900.100.200-30', '2026-03-22 02:15'),
  (4, 'SESS-A4', 'MOB-3003', '300.400.500-60', '2026-03-23 09:45');

-- video_metadata
CREATE TABLE video_metadata (
  id INTEGER PRIMARY KEY,
  session_id TEXT NOT NULL,
  brightness_variation REAL NOT NULL,
  blink_count INTEGER NOT NULL,
  head_movement INTEGER NOT NULL
);

INSERT INTO video_metadata (id, session_id, brightness_variation, blink_count, head_movement) VALUES
  (1, 'SESS-A1', 8.4, 6, 1),
  (2, 'SESS-A2', 7.1, 4, 1),
  (3, 'SESS-A3', 0.9, 0, 0),
  (4, 'SESS-A4', 9.2, 7, 1);

-- fraud_signals
CREATE TABLE fraud_signals (
  id INTEGER PRIMARY KEY,
  session_id TEXT NOT NULL,
  signal_type TEXT NOT NULL,
  detected_at TEXT NOT NULL
);

INSERT INTO fraud_signals (id, session_id, signal_type, detected_at) VALUES
  (1, 'SESS-A3', 'brightness_too_low', '2026-03-22 02:15'),
  (2, 'SESS-A3', 'no_blinks_detected', '2026-03-22 02:15'),
  (3, 'SESS-A3', 'no_head_movement', '2026-03-22 02:15');

-- opened_accounts
CREATE TABLE opened_accounts (
  id INTEGER PRIMARY KEY,
  session_id TEXT NOT NULL,
  account_number TEXT NOT NULL,
  holder_cpf TEXT NOT NULL
);

INSERT INTO opened_accounts (id, session_id, account_number, holder_cpf) VALUES
  (1, 'SESS-A1', 'CC-DIG-0091', '100.200.300-40'),
  (2, 'SESS-A2', 'CC-DIG-0092', '500.600.700-80'),
  (3, 'SESS-A3', 'CC-DIG-0093', '900.100.200-30'),
  (4, 'SESS-A4', 'CC-DIG-0094', '300.400.500-60');
