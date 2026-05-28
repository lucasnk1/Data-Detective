-- applicants
CREATE TABLE applicants (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  cpf TEXT NOT NULL,
  registered_city TEXT NOT NULL
);

INSERT INTO applicants (id, name, cpf, registered_city) VALUES
  (1, 'Adriano Pires', '010.020.030-40', 'Curitiba'),
  (2, 'Monica Teles', '050.060.070-80', 'Rio de Janeiro'),
  (3, 'Jesuíno Braga', '090.100.110-20', 'Fortaleza'),
  (4, 'Lara Nogueira', '130.140.150-60', 'Brasília');

-- loan_applications
CREATE TABLE loan_applications (
  id INTEGER PRIMARY KEY,
  applicant_id INTEGER NOT NULL,
  amount_requested REAL NOT NULL,
  applied_at TEXT NOT NULL,
  status TEXT NOT NULL
);

INSERT INTO loan_applications (id, applicant_id, amount_requested, applied_at, status) VALUES
  (1, 1, 12000, '2026-04-10 14:25', 'aprovado'),
  (2, 2, 25000, '2026-04-11 03:10', 'em_analise'),
  (3, 3, 8000, '2026-04-12 10:40', 'aprovado'),
  (4, 4, 15000, '2026-04-13 09:00', 'aprovado');

-- geo_checks
CREATE TABLE geo_checks (
  id INTEGER PRIMARY KEY,
  application_id INTEGER NOT NULL,
  ip_city TEXT NOT NULL,
  ip_address TEXT NOT NULL
);

INSERT INTO geo_checks (id, application_id, ip_city, ip_address) VALUES
  (1, 1, 'Curitiba', '200.10.20.30'),
  (2, 2, 'Manaus', '177.99.88.77'),
  (3, 3, 'Fortaleza', '189.55.66.77'),
  (4, 4, 'Brasília', '200.22.33.44');

-- behavior_scores
CREATE TABLE behavior_scores (
  id INTEGER PRIMARY KEY,
  application_id INTEGER NOT NULL,
  score INTEGER NOT NULL,
  flags TEXT
);

INSERT INTO behavior_scores (id, application_id, score, flags) VALUES
  (1, 1, 85, NULL),
  (2, 2, 12, 'horario_atipico,localizacao_divergente,velocidade_preenchimento_suspeita'),
  (3, 3, 78, NULL),
  (4, 4, 91, NULL);
