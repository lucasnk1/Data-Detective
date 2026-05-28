-- branches
CREATE TABLE branches (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL
);

INSERT INTO branches (id, name, city) VALUES
  (1, 'Agência Centro', 'São Paulo'),
  (2, 'Agência Paulista', 'São Paulo'),
  (3, 'Agência Lapa', 'São Paulo'),
  (4, 'Agência Tatuapé', 'São Paulo'),
  (5, 'Agência ABC', 'Santo André');

-- individuals
CREATE TABLE individuals (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  cpf TEXT NOT NULL,
  known_associate_of TEXT
);

INSERT INTO individuals (id, name, cpf, known_associate_of) VALUES
  (1, 'Edmilson Prates', '001.001.001-01', NULL),
  (2, 'Naiara Botelho', '002.002.002-02', '066.066.066-06'),
  (3, 'Rômulo Esteves', '066.066.066-06', NULL),
  (4, 'Clarice Andrade', '004.004.004-04', NULL),
  (5, 'Josefa Lima', '005.005.005-05', '066.066.066-06'),
  (6, 'Paulo Henrique Sá', '006.006.006-06', '066.066.066-06'),
  (7, 'Ana Carvalho', '007.007.007-07', '066.066.066-06');

-- beneficiary_account
CREATE TABLE beneficiary_account (
  id INTEGER PRIMARY KEY,
  account_number TEXT NOT NULL,
  company_name TEXT NOT NULL,
  cnpj TEXT NOT NULL,
  real_owner_cpf TEXT NOT NULL
);

INSERT INTO beneficiary_account (id, account_number, company_name, cnpj, real_owner_cpf) VALUES
  (1, 'CC-IMPORT', 'Global Import Comercial Ltda', '22.333.444/0001-55', '066.066.066-06');

-- deposits
CREATE TABLE deposits (
  id INTEGER PRIMARY KEY,
  depositor_cpf TEXT NOT NULL,
  branch_id INTEGER NOT NULL,
  destination_account TEXT NOT NULL,
  amount REAL NOT NULL,
  deposit_date TEXT NOT NULL
);

INSERT INTO deposits (id, depositor_cpf, branch_id, destination_account, amount, deposit_date) VALUES
  (1, '002.002.002-02', 1, 'CC-IMPORT', 9400, '2026-04-05'),
  (2, '005.005.005-05', 2, 'CC-IMPORT', 9200, '2026-04-05'),
  (3, '006.006.006-06', 3, 'CC-IMPORT', 9500, '2026-04-05'),
  (4, '007.007.007-07', 4, 'CC-IMPORT', 8900, '2026-04-05'),
  (5, '002.002.002-02', 5, 'CC-IMPORT', 9300, '2026-04-05'),
  (6, '005.005.005-05', 1, 'CC-IMPORT', 9100, '2026-04-05'),
  (7, '001.001.001-01', 1, 'CC-OUTRAS', 45000, '2026-04-05');
