const fs = require("fs");
const path = require("path");
const { resolveCasesDir } = require("../lib/paths");

/** @type {Map<number, { meta: object, sqlFile: string }>} */
const caseRegistry = new Map();

function loadCaseRegistry() {
  if (caseRegistry.size > 0) return caseRegistry;

  const casesDir = resolveCasesDir();
  if (!fs.existsSync(casesDir)) return caseRegistry;

  for (const cat of fs.readdirSync(casesDir).filter((n) => n.startsWith("categoria"))) {
    const catPath = path.join(casesDir, cat);
    for (const caseDir of fs.readdirSync(catPath).filter((n) => n.startsWith("caso"))) {
      const casePath = path.join(catPath, caseDir);
      const jsonFile = path.join(casePath, "case.json");
      const sqlFile = path.join(casePath, "database.sql");
      if (!fs.existsSync(jsonFile) || !fs.existsSync(sqlFile)) continue;

      try {
        const meta = JSON.parse(fs.readFileSync(jsonFile, "utf8"));
        const caseId = Number(meta.id);
        if (caseId) caseRegistry.set(caseId, { meta, sqlFile });
      } catch (err) {
        console.error(`[Database] Erro ao registrar caso ${caseDir}:`, err.message);
      }
    }
  }

  return caseRegistry;
}

function getTableNames(db) {
  return db
    .prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
    )
    .all()
    .map((r) => r.name);
}

function dropAllTables(db, tableNames) {
  for (const name of tableNames) {
    const safe = String(name).replace(/"/g, '""');
    db.exec(`DROP TABLE IF EXISTS "${safe}"`);
  }
}

function seedCaseDatabase(caseDb, sqlFile) {
  const sqlContent = fs.readFileSync(sqlFile, "utf8");
  caseDb.exec(sqlContent);
}

function ensureCaseDatabase(caseDb, caseId) {
  const entry = loadCaseRegistry().get(caseId);
  if (!entry) return;

  const expected = entry.meta.tables || [];
  if (!expected.length) return;

  const existing = getTableNames(caseDb);
  const missing = expected.filter((t) => !existing.includes(t));

  if (missing.length === 0) return;

  if (existing.length > 0) {
    console.log(
      `[Database] Reinicializando caso ${caseId} (faltam: ${missing.join(", ")})`
    );
    dropAllTables(caseDb, existing);
  } else {
    console.log(`[Database] Inicializando caso ${caseId}: ${entry.meta.title || caseId}`);
  }

  seedCaseDatabase(caseDb, entry.sqlFile);
}

function initAllCaseDatabases(getDb) {
  loadCaseRegistry();
  for (const [caseId, { meta }] of caseRegistry) {
    const caseDb = getDb(caseId);
    caseDb.pragma("journal_mode = WAL");
    ensureCaseDatabase(caseDb, caseId);
  }
}

function mergeSchema(fromJson, fromDb, tableNames) {
  const names = tableNames?.length
    ? tableNames
    : [...new Set([...Object.keys(fromJson || {}), ...Object.keys(fromDb || {})])];

  const schema = {};
  for (const table of names) {
    const dbCols = fromDb?.[table];
    const jsonCols = fromJson?.[table];
    if (dbCols?.length) {
      schema[table] = dbCols;
    } else if (jsonCols?.length) {
      schema[table] = jsonCols;
    }
  }
  return schema;
}

module.exports = {
  loadCaseRegistry,
  ensureCaseDatabase,
  initAllCaseDatabases,
  mergeSchema,
  getTableNames,
};
