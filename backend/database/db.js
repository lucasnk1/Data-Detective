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

function removeLegacyDatabases() {
  const legacyNames = ["data_detective.db", "data_detective.db-shm", "data_detective.db-wal"];
  for (const name of legacyNames) {
    const filePath = path.join(DB_DIR, name);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        console.log(`[Database] Removido banco legado: ${name}`);
      } catch (err) {
        console.warn(`[Database] Não foi possível remover ${name}:`, err.message);
      }
    }
  }
}

function initDb() {
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
  removeLegacyDatabases();

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
  const casesDirExists = fs.existsSync(casesDir);
  console.log(`[Database] casesDir=${casesDir} exists=${casesDirExists}`);
  if (!casesDirExists) {
    throw new Error(
      `[Database] Pasta cases não encontrada em ${casesDir}. Rode: node scripts/sync-cases.mjs`
    );
  }
  initAllCaseDatabases(getDb);
}

module.exports = { getDb, getCaseDb, initDb };
