const crypto = require("crypto");

// Bem simples: token -> { userId, username }
const sessions = new Map();

function createToken() {
  return crypto.randomBytes(16).toString("hex");
}

function createSession(user) {
  const token = createToken();
  sessions.set(token, { userId: user.id, username: user.username });
  return token;
}

function getSession(token) {
  if (!token) return null;
  return sessions.get(token) || null;
}

module.exports = { createSession, getSession };

