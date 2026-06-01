const path = require("path");
const fs = require("fs");
const Database = require("better-sqlite3");
const { resolveCasesDir } = require("../lib/paths");
const { initAllCaseDatabases, ensureCaseDatabase } = require("./caseSeed");

const DB_DIR = __dirname;

const dbs = new Map();

function getDb(caseId) {
  if (!caseId) {
    const sharedPath = path.join(DB_DIR, "data_detective_shared.db");
    if (!dbs.has("shared")) {
      dbs.set("shared", new Database(sharedPath));
    }
    return dbs.get("shared");
  }

  const key = String(caseId);
  if (!dbs.has(key)) {
    const dbPath = path.join(DB_DIR, `data_detective_case_${caseId}.db`);
    dbs.set(key, new Database(dbPath));
  }
  return dbs.get(key);
}

function getCaseDb(caseId) {
  const caseDb = getDb(caseId);
  ensureCaseDatabase(caseDb, caseId);
  return caseDb;
}

function initDb() {
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

  const sharedDb = getDb();
  sharedDb.pragma("journal_mode = WAL");
  sharedDb.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  const casesDir = resolveCasesDir();
  console.log(`[Database] casesDir=${casesDir} exists=${fs.existsSync(casesDir)}`);
  initAllCaseDatabases(getDb);
}

module.exports = { getDb, getCaseDb, initDb };
