-- properties
CREATE TABLE properties (
  id INTEGER PRIMARY KEY,
  address TEXT NOT NULL,
  type TEXT NOT NULL,
  market_value REAL NOT NULL
);

INSERT INTO properties (id, address, type, market_value) VALUES
  (1, 'Av. Beira Mar Norte, 1800, apto 401', 'Apartamento', 2400000),
  (2, 'Rua Bocaiúva, 900, casa', 'Casa', 1800000),
  (3, 'Rua Felipe Schmidt, 300, apto 202', 'Apartamento', 1200000);

-- buyers
CREATE TABLE buyers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  cpf TEXT NOT NULL,
  occupation TEXT NOT NULL
);

INSERT INTO buyers (id, name, cpf, occupation) VALUES
  (1, 'Luciana Saraiva', '100.200.300-40', 'Empresária'),
  (2, 'Gilberto Meireles', '500.600.700-80', 'Motorista de Aplicativo'),
  (3, 'Débora Furtado', '900.100.200-30', 'Médica'),
  (4, 'Samuel Braga', '400.500.600-70', 'Advogado');

-- sales
CREATE TABLE sales (
  id INTEGER PRIMARY KEY,
  property_id INTEGER NOT NULL,
  buyer_id INTEGER NOT NULL,
  sale_price REAL NOT NULL,
  payment_method TEXT NOT NULL,
  sale_date TEXT NOT NULL
);

INSERT INTO sales (id, property_id, buyer_id, sale_price, payment_method, sale_date) VALUES
  (1, 1, 2, 2400000, 'especie', '2026-02-10'),
  (2, 2, 1, 1800000, 'especie', '2026-03-05'),
  (3, 3, 3, 1200000, 'financiamento', '2026-04-01');

-- income_reports
CREATE TABLE income_reports (
  id INTEGER PRIMARY KEY,
  buyer_id INTEGER NOT NULL,
  declared_monthly_income REAL NOT NULL,
  report_year INTEGER NOT NULL
);

INSERT INTO income_reports (id, buyer_id, declared_monthly_income, report_year) VALUES
  (1, 1, 45000, 2025),
  (2, 2, 3200, 2025),
  (3, 3, 38000, 2025),
  (4, 4, 22000, 2025);
