const express = require("express");
const { getDb } = require("../database/db");
const { getSession } = require("../auth/sessionStore");
const { cases } = require("../game/casesData");
const { getProgress } = require("../game/progressStore");

const router = express.Router();

function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const session = getSession(token);
  if (!session) return res.status(401).json({ ok: false, error: "Não autenticado." });
  req.session = session;
  req.token = token;
  next();
}

function isSafeReadOnlySql(sql) {
  const s = String(sql || "").trim();
  if (!s) return false;
  // uma única instrução
  if (s.includes(";")) return false;
  const up = s.toUpperCase();
  if (!(up.startsWith("SELECT") || up.startsWith("WITH"))) return false;

  const forbidden = ["INSERT", "UPDATE", "DELETE", "DROP", "ALTER", "CREATE", "PRAGMA", "ATTACH", "DETACH", "VACUUM", "REINDEX"];
  return !forbidden.some((kw) => up.includes(kw));
}

function getSchema(db, onlyTables) {
  const tables = db
    .prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
    )
    .all()
    .map((r) => r.name)
    .filter((name) => !onlyTables || onlyTables.includes(name));
  const schema = {};
  for (const t of tables) {
    schema[t] = db.prepare(`PRAGMA table_info(${t})`).all().map((c) => ({
      name: c.name,
      type: c.type,
      notnull: !!c.notnull,
      pk: !!c.pk
    }));
  }
  return schema;
}

router.use(requireAuth);

router.get("/", (req, res) => {
  const userId = req.session.userId;
  const prog = getProgress(userId);
  const list = cases.map((c) => {
    const idx = cases.findIndex((x) => x.id === c.id);
    const prev = idx > 0 ? cases[idx - 1] : null;
    const prevSolved =
      !prev || (prog.solved[prev.id] && prog.solved[prev.id].finishedAt);
    return {
      id: c.id,
      title: c.title,
      unlocked: prevSolved,
      slug: c.slug
    };
  });
  res.json({ ok: true, cases: list, xp: prog.xp });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const c = cases.find((x) => x.id === id);
  if (!c) return res.status(404).json({ ok: false, error: "Caso não encontrado." });
  res.json({ ok: true, case: c });
});

router.get("/:id/schema", (req, res) => {
  const id = Number(req.params.id);
  const c = cases.find((x) => x.id === id);
  if (!c) return res.status(404).json({ ok: false, error: "Caso não encontrado." });
  const db = getDb();
  res.json({ ok: true, schema: getSchema(db, c.tables) });
});

router.post("/:id/query", (req, res) => {
  const caseId = Number(req.params.id);
  const c = cases.find((x) => x.id === caseId);
  if (!c) return res.status(404).json({ ok: false, error: "Caso não encontrado." });

  const sql = req.body?.sql;
  if (!isSafeReadOnlySql(sql)) {
    return res.status(400).json({
      ok: false,
      error:
        "Query inválida. Neste jogo, por segurança, só aceitamos SELECT (ou WITH) sem ponto e vírgula."
    });
  }

  const db = getDb();
  try {
    const stmt = db.prepare(String(sql));
    const rows = stmt.all();
    const columns = rows.length ? Object.keys(rows[0]) : [];

    // métricas por caso (apenas contagem de queries; resolução vem via enquete)
    const userId = req.session.userId;
    const prog = getProgress(userId);
    if (!prog.solved[caseId]) {
      prog.solved[caseId] = {
        solvedObjectives: [],
        startedAt: Date.now(),
        finishedAt: null,
        queryCount: 0,
        hintsUsed: 0
      };
    }
    prog.solved[caseId].queryCount += 1;

    return res.json({
      ok: true,
      columns,
      rows,
      solvedNow: [],
      progress: prog.solved[caseId],
      xp: prog.xp
    });
  } catch (e) {
    return res.status(400).json({ ok: false, error: `Erro ao executar SQL: ${e.message}` });
  }
});

router.get("/me/progress", (req, res) => {
  const prog = getProgress(req.session.userId);
  res.json({ ok: true, progress: prog });
});

router.post("/:id/answer", (req, res) => {
  const caseId = Number(req.params.id);
  const c = cases.find((x) => x.id === caseId);
  if (!c) return res.status(404).json({ ok: false, error: "Caso não encontrado." });

  const suspect = String(req.body?.suspect || "").trim();
  if (!suspect) {
    return res.status(400).json({ ok: false, error: "Informe um suspeito." });
  }

  const correct = String(c.poll?.correct || "").trim();
  const isCorrect =
    correct &&
    suspect.toLowerCase() === correct.toLowerCase();

  const prog = getProgress(req.session.userId);
  if (!prog.solved[caseId]) {
    prog.solved[caseId] = {
      solvedObjectives: [],
      startedAt: Date.now(),
      finishedAt: null,
      queryCount: 0,
      hintsUsed: 0
    };
  }

  if (isCorrect) {
    if (!prog.solved[caseId].finishedAt) {
      prog.solved[caseId].finishedAt = Date.now();
      prog.xp += c.rewardXp || 200;
    }
    return res.json({
      ok: true,
      correct: true,
      xp: prog.xp,
      progress: prog.solved[caseId]
    });
  }

  return res.json({ ok: true, correct: false, xp: prog.xp, progress: prog.solved[caseId] });
});

module.exports = router;

