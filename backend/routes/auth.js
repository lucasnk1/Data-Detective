const express = require("express");
const { getDb } = require("../database/db");
const { createSession } = require("../auth/sessionStore");

const router = express.Router();

router.post("/register", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ ok: false, error: "Informe usuário e senha." });
  }

  const db = getDb();
  try {
    const info = db
      .prepare("INSERT INTO users (username, password) VALUES (?, ?)")
      .run(username.trim(), String(password));
    const user = { id: info.lastInsertRowid, username: username.trim() };
    const token = createSession(user);
    return res.json({ ok: true, token, user });
  } catch (e) {
    if (String(e).includes("UNIQUE")) {
      return res.status(409).json({ ok: false, error: "Este usuário já existe." });
    }
    return res.status(500).json({ ok: false, error: "Erro ao criar conta." });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ ok: false, error: "Informe usuário e senha." });
  }

  const db = getDb();
  const row = db
    .prepare("SELECT id, username, password FROM users WHERE username = ?")
    .get(username.trim());
  if (!row || String(row.password) !== String(password)) {
    return res.status(401).json({ ok: false, error: "Usuário ou senha inválidos." });
  }

  const user = { id: row.id, username: row.username };
  const token = createSession(user);
  return res.json({ ok: true, token, user });
});

module.exports = router;

