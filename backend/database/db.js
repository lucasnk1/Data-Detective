const path = require("path");
const fs = require("fs");
const Database = require("better-sqlite3");
const { resolveCasesDir } = require("../lib/paths");

const DB_DIR = __dirname;

const dbs = new Map();

function getDb(caseId) {
  if (!caseId) {
    // Banco compartilhado para usuários e autenticação
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

function initDb() {
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
  
  // 1. Inicializa o banco de dados compartilhado (usuários)
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

  // 2. Inicializa dinamicamente o banco de dados individual de cada caso
  const casesDir = resolveCasesDir();
  console.log(`[Database] casesDir=${casesDir} exists=${fs.existsSync(casesDir)}`);
  if (fs.existsSync(casesDir)) {
    const categories = fs.readdirSync(casesDir).filter(name => name.startsWith("categoria"));
    for (const cat of categories) {
      const catPath = path.join(casesDir, cat);
      const caseDirs = fs.readdirSync(catPath).filter(name => name.startsWith("caso"));
      for (const caseDir of caseDirs) {
        const casePath = path.join(catPath, caseDir);
        const sqlFile = path.join(casePath, "database.sql");
        const jsonFile = path.join(casePath, "case.json");
        
        if (fs.existsSync(sqlFile) && fs.existsSync(jsonFile)) {
          try {
            const caseMeta = JSON.parse(fs.readFileSync(jsonFile, "utf8"));
            const caseId = Number(caseMeta.id);
            if (!caseId) continue;
            
            // Abre/cria o banco de dados individual deste caso
            const caseDb = getDb(caseId);
            caseDb.pragma("journal_mode = WAL");
            
            const tables = caseMeta.tables || [];
            
            // Verifica se todas as tabelas deste caso existem
            let missing = false;
            for (const table of tables) {
              const exists = caseDb.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?").get(table);
              if (!exists) {
                missing = true;
                break;
              }
            }
            
            // Se alguma tabela estiver faltando, executa o script SQL para inicializar o caso
            if (missing) {
              console.log(`[Database] Inicializando tabelas para o caso ${caseId}: ${caseMeta.title || caseDir}`);
              const sqlContent = fs.readFileSync(sqlFile, "utf8");
              caseDb.transaction(() => {
                caseDb.exec(sqlContent);
              })();
            }
          } catch (err) {
            console.error(`Erro ao carregar banco do caso ${caseDir}:`, err);
          }
        }
      }
    }
  }
}

module.exports = { getDb, initDb };

