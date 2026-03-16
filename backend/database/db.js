const path = require("path");
const fs = require("fs");
const Database = require("better-sqlite3");

const DB_DIR = __dirname;
const DB_PATH = path.join(DB_DIR, "data_detective.db");

let db;

function getDb() {
  if (!db) db = new Database(DB_PATH);
  return db;
}

function initDb() {
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
  const db = getDb();

  db.pragma("journal_mode = WAL");

  // Usuários (bem simples, projeto educacional)
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // Banco principal dos casos (um único DB pro projeto inteiro, simplão)
  db.exec(`
    CREATE TABLE IF NOT EXISTS people (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER,
      city TEXT,
      occupation TEXT
    );

    CREATE TABLE IF NOT EXISTS crime_reports (
      id INTEGER PRIMARY KEY,
      date TEXT NOT NULL,
      location TEXT NOT NULL,
      victim_name TEXT NOT NULL,
      summary TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS interviews (
      id INTEGER PRIMARY KEY,
      person_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      transcript TEXT NOT NULL,
      FOREIGN KEY(person_id) REFERENCES people(id)
    );

    CREATE TABLE IF NOT EXISTS vehicles (
      id INTEGER PRIMARY KEY,
      owner_id INTEGER NOT NULL,
      plate TEXT NOT NULL,
      model TEXT NOT NULL,
      color TEXT NOT NULL,
      FOREIGN KEY(owner_id) REFERENCES people(id)
    );

    -- Caso 2 - Fraude Financeira
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      department TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      company TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY,
      employee_id INTEGER NOT NULL,
      account_id INTEGER NOT NULL,
      amount REAL NOT NULL,
      date TEXT NOT NULL,
      FOREIGN KEY(employee_id) REFERENCES employees(id),
      FOREIGN KEY(account_id) REFERENCES accounts(id)
    );

    -- Caso 3 - Ataque Hacker
    CREATE TABLE IF NOT EXISTS login_logs (
      id INTEGER PRIMARY KEY,
      employee_id INTEGER NOT NULL,
      time TEXT NOT NULL,
      ip TEXT NOT NULL,
      FOREIGN KEY(employee_id) REFERENCES employees(id)
    );

    CREATE TABLE IF NOT EXISTS server_access (
      id INTEGER PRIMARY KEY,
      employee_id INTEGER NOT NULL,
      resource TEXT NOT NULL,
      time TEXT NOT NULL,
      FOREIGN KEY(employee_id) REFERENCES employees(id)
    );

    -- Caso 4 - Vazamento de Espionagem
    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      classification TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS document_access (
      id INTEGER PRIMARY KEY,
      employee_id INTEGER NOT NULL,
      document_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      FOREIGN KEY(employee_id) REFERENCES employees(id),
      FOREIGN KEY(document_id) REFERENCES documents(id)
    );

    CREATE TABLE IF NOT EXISTS external_contacts (
      id INTEGER PRIMARY KEY,
      employee_id INTEGER NOT NULL,
      company TEXT NOT NULL,
      FOREIGN KEY(employee_id) REFERENCES employees(id)
    );
  `);

  // Seed mínimo (idempotente)
  const hasPeople = db.prepare("SELECT COUNT(*) AS c FROM people").get().c > 0;
  if (!hasPeople) {
    const insertPerson = db.prepare(
      "INSERT INTO people (id, name, age, city, occupation) VALUES (?, ?, ?, ?, ?)"
    );

    const people = [
      [1, "Marina Rocha", 32, "São Paulo", "Jornalista"],
      [2, "Bruno Lima", 41, "São Paulo", "Segurança"],
      [3, "Carlos Nogueira", 28, "São Paulo", "Entregador"],
      [4, "Dra. Paula Menezes", 45, "São Paulo", "Médica"],
      [5, "Ricardo Viana", 36, "São Paulo", "Advogado"],
      [6, "Sofia Martins", 30, "São Paulo", "Analista de Dados"],
      [7, "Igor Batista", 39, "São Paulo", "Técnico de TI"],
      [8, "Vítor Salles", 27, "São Paulo", "Barista"]
    ];

    const tx = db.transaction(() => {
      for (const p of people) insertPerson.run(...p);
      db.prepare(
        "INSERT INTO crime_reports (id, date, location, victim_name, summary) VALUES (?, ?, ?, ?, ?)"
      ).run(
        1,
        "2026-03-10",
        "Beco da Aurora, Centro",
        "Ricardo Viana",
        "Vítima encontrada às 22:40. Sem sinais de arrombamento. Um veículo foi visto deixando o local rapidamente."
      );

      db.prepare(
        "INSERT INTO interviews (id, person_id, date, transcript) VALUES (?, ?, ?, ?)"
      ).run(
        1,
        1,
        "2026-03-10",
        "Eu ouvi um carro acelerando e vi uma pessoa de jaqueta preta perto do beco."
      );

      db.prepare(
        "INSERT INTO interviews (id, person_id, date, transcript) VALUES (?, ?, ?, ?)"
      ).run(
        2,
        2,
        "2026-03-10",
        "Trabalho ali perto. Vi um sedã prata com placa começando com 'DDT' saindo na contramão."
      );

      db.prepare(
        "INSERT INTO interviews (id, person_id, date, transcript) VALUES (?, ?, ?, ?)"
      ).run(
        3,
        7,
        "2026-03-10",
        "O Ricardo estava nervoso nos últimos dias. Falava que alguém tinha acesso às coisas dele."
      );

      const insertVehicle = db.prepare(
        "INSERT INTO vehicles (id, owner_id, plate, model, color) VALUES (?, ?, ?, ?, ?)"
      );
      insertVehicle.run(1, 6, "DDT-4021", "Sedã", "Prata");
      insertVehicle.run(2, 3, "SPX-1180", "Moto", "Preta");
      insertVehicle.run(3, 5, "DDT-1199", "Hatch", "Vermelho");
      insertVehicle.run(4, 7, "TIQ-7777", "SUV", "Preto");

      // Caso 2 - Fraude Financeira
      const insertEmp = db.prepare(
        "INSERT INTO employees (id, name, department) VALUES (?, ?, ?)"
      );
      insertEmp.run(1, "Carlos Mendes", "Finance");
      insertEmp.run(2, "Ana Ribeiro", "Finance");
      insertEmp.run(3, "Bruno Costa", "Accounting");
      insertEmp.run(4, "Juliana Prado", "Compliance");

      const insertAcc = db.prepare(
        "INSERT INTO accounts (id, name, company) VALUES (?, ?, ?)"
      );
      insertAcc.run(201, "Orion Trade", "Orion Trade");
      insertAcc.run(202, "NovaTech", "NovaTech");
      insertAcc.run(203, "Blue Horizon", "Blue Horizon");

      const insertTx = db.prepare(
        "INSERT INTO transactions (id, employee_id, account_id, amount, date) VALUES (?, ?, ?, ?, ?)"
      );
      insertTx.run(1, 1, 201, 9000, "2024-05-10");
      insertTx.run(2, 1, 201, 12000, "2024-05-11");
      insertTx.run(3, 2, 202, 500, "2024-05-12");
      insertTx.run(4, 1, 201, 15000, "2024-05-13");
      insertTx.run(5, 3, 203, 800, "2024-05-13");

      // Caso 3 - Ataque Hacker
      const insertLogin = db.prepare(
        "INSERT INTO login_logs (id, employee_id, time, ip) VALUES (?, ?, ?, ?)"
      );
      insertLogin.run(1, 1, "09:10", "192.168.0.10");
      insertLogin.run(2, 3, "23:45", "88.201.44.2");
      insertLogin.run(3, 2, "10:00", "192.168.0.12");
      insertLogin.run(4, 4, "09:20", "192.168.0.14");

      const insertAccess = db.prepare(
        "INSERT INTO server_access (id, employee_id, resource, time) VALUES (?, ?, ?, ?)"
      );
      insertAccess.run(1, 3, "client_database", "23:50");
      insertAccess.run(2, 1, "dev_notes", "11:00");
      insertAccess.run(3, 4, "project_docs", "10:20");

      // Caso 4 - Vazamento de Espionagem
      const insertDoc = db.prepare(
        "INSERT INTO documents (id, title, classification) VALUES (?, ?, ?)"
      );
      insertDoc.run(1, "Drone Prototype", "Secret");
      insertDoc.run(2, "Budget Plan", "Internal");
      insertDoc.run(3, "Missile Guidance", "Top Secret");

      const insertDocAccess = db.prepare(
        "INSERT INTO document_access (id, employee_id, document_id, date) VALUES (?, ?, ?, ?)"
      );
      insertDocAccess.run(1, 2, 1, "2024-04-01");
      insertDocAccess.run(2, 4, 3, "2024-04-02");
      insertDocAccess.run(3, 1, 2, "2024-04-02");
      insertDocAccess.run(4, 4, 1, "2024-04-03");

      const insertContact = db.prepare(
        "INSERT INTO external_contacts (id, employee_id, company) VALUES (?, ?, ?)"
      );
      insertContact.run(1, 4, "Nova Defense");
      insertContact.run(2, 2, "University Lab");
    });

    tx();
  }
}

module.exports = { getDb, initDb, DB_PATH };

