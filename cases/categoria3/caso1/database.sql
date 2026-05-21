-- people
CREATE TABLE people (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER,
  city TEXT,
  occupation TEXT
);

INSERT INTO people (id, name, age, city, occupation) VALUES
  (1, 'Marina Rocha', 32, 'São Paulo', 'Jornalista'),
  (2, 'Bruno Lima', 41, 'São Paulo', 'Segurança'),
  (3, 'Carlos Nogueira', 28, 'São Paulo', 'Entregador'),
  (4, 'Dra. Paula Menezes', 45, 'São Paulo', 'Médica'),
  (5, 'Ricardo Viana', 36, 'São Paulo', 'Advogado'),
  (6, 'Sofia Martins', 30, 'São Paulo', 'Analista de Dados'),
  (7, 'Igor Batista', 39, 'São Paulo', 'Técnico de TI'),
  (8, 'Vítor Salles', 27, 'São Paulo', 'Barista');

-- vehicles
CREATE TABLE vehicles (
  id INTEGER PRIMARY KEY,
  owner_id INTEGER NOT NULL,
  plate TEXT NOT NULL,
  model TEXT NOT NULL,
  color TEXT NOT NULL
);

INSERT INTO vehicles (id, owner_id, plate, model, color) VALUES
  (1, 6, 'DDT-4021', 'Sedã', 'Prata'),
  (2, 3, 'SPX-1180', 'Moto', 'Preta'),
  (3, 5, 'DDT-1199', 'Hatch', 'Vermelho'),
  (4, 7, 'TIQ-7777', 'SUV', 'Preto');

-- interviews
CREATE TABLE interviews (
  id INTEGER PRIMARY KEY,
  person_id INTEGER NOT NULL,
  date TEXT NOT NULL,
  transcript TEXT NOT NULL
);

INSERT INTO interviews (id, person_id, date, transcript) VALUES
  (1, 1, '2026-03-10', 'Eu ouvi um carro acelerando e vi uma pessoa de jaqueta preta perto do beco.'),
  (2, 2, '2026-03-10', 'Trabalho ali perto. Vi um sedã prata com placa começando com ''DDT'' saindo na contramão.'),
  (3, 7, '2026-03-10', 'O Ricardo estava nervoso nos últimos dias. Falava que alguém tinha acesso às coisas dele.'),
  (4, 8, '2026-03-11', 'No estacionamento, ouvi alguém comentar que o carro SPX-1180 era do Carlos Nogueira.');