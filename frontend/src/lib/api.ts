import { cases } from "./casesData";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : "");

export type ApiOk<T> = { ok: true } & T;
export type ApiErr = { ok: false; error: string };

async function request<T>(
  path: string,
  opts: RequestInit & { token?: string } = {}
): Promise<ApiOk<T> | ApiErr> {
  try {
    if (!API_BASE) {
      return await mockRequest(path, opts);
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (opts.token) headers.Authorization = `Bearer ${opts.token}`;
    const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
    const json = await res.json().catch(() => null);
    if (!json || typeof json.ok !== "boolean") {
      return { ok: false, error: "Resposta inválida do servidor." };
    }
    return json;
  } catch (e: any) {
    const message = e?.message ? String(e.message) : "Falha inesperada na comunicação com o servidor.";
    return { ok: false, error: message };
  }
}

// ---- Mock backend (browser only) ----
// This keeps the app working in Vercel without requiring a separate server.
// User accounts + progress are stored in localStorage.

type User = { username: string; password: string };

type Session = { token: string; username: string };

const STORAGE_USERS = "dd_users";
const STORAGE_SESSIONS = "dd_sessions";
const STORAGE_PROGRESS = "dd_progress";

function loadJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function createToken() {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

function getSession(token?: string): Session | null {
  if (!token) return null;
  const sessions: Record<string, Session> = loadJson(STORAGE_SESSIONS, {});
  return sessions[token] || null;
}

function setSession(session: Session) {
  const sessions: Record<string, Session> = loadJson(STORAGE_SESSIONS, {});
  sessions[session.token] = session;
  saveJson(STORAGE_SESSIONS, sessions);
}

function getUsers(): Record<string, User> {
  return loadJson(STORAGE_USERS, {});
}

function setUser(user: User) {
  const users = getUsers();
  users[user.username] = user;
  saveJson(STORAGE_USERS, users);
}

function getProgress(username: string) {
  const all = loadJson<Record<string, any>>(STORAGE_PROGRESS, {});
  if (!all[username]) {
    all[username] = { xp: 0, solved: {} };
    saveJson(STORAGE_PROGRESS, all);
  }
  return all[username];
}

function setProgress(username: string, progress: any) {
  const all = loadJson<Record<string, any>>(STORAGE_PROGRESS, {});
  all[username] = progress;
  saveJson(STORAGE_PROGRESS, all);
}

let cachedDb: any = null;
async function getSqlDb() {
  if (cachedDb) return cachedDb;
  const initSqlJs = (await import("sql.js")).default;
  const SQL = await initSqlJs({ locateFile: () => "/sql-wasm.wasm" });
  const db = new SQL.Database();

  db.run(`
    CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, password TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')));
    CREATE TABLE people (id INTEGER PRIMARY KEY, name TEXT NOT NULL, age INTEGER, city TEXT, occupation TEXT);
    CREATE TABLE crime_reports (id INTEGER PRIMARY KEY, date TEXT NOT NULL, location TEXT NOT NULL, victim_name TEXT NOT NULL, summary TEXT NOT NULL);
    CREATE TABLE interviews (id INTEGER PRIMARY KEY, person_id INTEGER NOT NULL, date TEXT NOT NULL, transcript TEXT NOT NULL);
    CREATE TABLE vehicles (id INTEGER PRIMARY KEY, owner_id INTEGER NOT NULL, plate TEXT NOT NULL, model TEXT NOT NULL, color TEXT NOT NULL);
    CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT NOT NULL, department TEXT NOT NULL);
    CREATE TABLE accounts (id INTEGER PRIMARY KEY, name TEXT NOT NULL, company TEXT NOT NULL);
    CREATE TABLE transactions (id INTEGER PRIMARY KEY, employee_id INTEGER NOT NULL, account_id INTEGER NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL);
    CREATE TABLE login_logs (id INTEGER PRIMARY KEY, employee_id INTEGER NOT NULL, time TEXT NOT NULL, ip TEXT NOT NULL);
    CREATE TABLE server_access (id INTEGER PRIMARY KEY, employee_id INTEGER NOT NULL, resource TEXT NOT NULL, time TEXT NOT NULL);
    CREATE TABLE documents (id INTEGER PRIMARY KEY, title TEXT NOT NULL, classification TEXT NOT NULL);
    CREATE TABLE document_access (id INTEGER PRIMARY KEY, employee_id INTEGER NOT NULL, document_id INTEGER NOT NULL, date TEXT NOT NULL);
    CREATE TABLE external_contacts (id INTEGER PRIMARY KEY, employee_id INTEGER NOT NULL, company TEXT NOT NULL);
  `);

  db.run(`
    INSERT INTO people (id, name, age, city, occupation) VALUES
      (1, 'Marina Rocha', 32, 'São Paulo', 'Jornalista'),
      (2, 'Bruno Lima', 41, 'São Paulo', 'Segurança'),
      (3, 'Carlos Nogueira', 28, 'São Paulo', 'Entregador'),
      (4, 'Dra. Paula Menezes', 45, 'São Paulo', 'Médica'),
      (5, 'Ricardo Viana', 36, 'São Paulo', 'Advogado'),
      (6, 'Sofia Martins', 30, 'São Paulo', 'Analista de Dados'),
      (7, 'Igor Batista', 39, 'São Paulo', 'Técnico de TI'),
      (8, 'Vítor Salles', 27, 'São Paulo', 'Barista');

    INSERT INTO crime_reports (id, date, location, victim_name, summary) VALUES
      (1, '2026-03-10', 'Beco da Aurora, Centro', 'Ricardo Viana', 'Vítima encontrada às 22:40. Sem sinais de arrombamento. Um veículo foi visto deixando o local rapidamente.');

    INSERT INTO interviews (id, person_id, date, transcript) VALUES
      (1, 1, '2026-03-10', 'Eu ouvi um carro acelerando e vi uma pessoa de jaqueta preta perto do beco.'),
      (2, 2, '2026-03-10', 'Trabalho ali perto. Vi um sedã prata com placa começando com ''DDT'' saindo na contramão.'),
      (3, 7, '2026-03-10', 'O Ricardo estava nervoso nos últimos dias. Falava que alguém tinha acesso às coisas dele.');

    INSERT INTO vehicles (id, owner_id, plate, model, color) VALUES
      (1, 6, 'DDT-4021', 'Sedã', 'Prata'),
      (2, 3, 'SPX-1180', 'Moto', 'Preta'),
      (3, 5, 'DDT-1199', 'Hatch', 'Vermelho'),
      (4, 7, 'TIQ-7777', 'SUV', 'Preto');

    INSERT INTO employees (id, name, department) VALUES
      (1, 'Carlos Mendes', 'Finance'),
      (2, 'Ana Ribeiro', 'Finance'),
      (3, 'Bruno Costa', 'Accounting'),
      (4, 'Juliana Prado', 'Compliance');

    INSERT INTO accounts (id, name, company) VALUES
      (201, 'Orion Trade', 'Orion Trade'),
      (202, 'NovaTech', 'NovaTech'),
      (203, 'Blue Horizon', 'Blue Horizon');

    INSERT INTO transactions (id, employee_id, account_id, amount, date) VALUES
      (1, 1, 201, 9000, '2024-05-10'),
      (2, 1, 201, 12000, '2024-05-11'),
      (3, 2, 202, 500, '2024-05-12'),
      (4, 1, 201, 15000, '2024-05-13'),
      (5, 3, 203, 800, '2024-05-13');

    INSERT INTO login_logs (id, employee_id, time, ip) VALUES
      (1, 1, '09:10', '192.168.0.10'),
      (2, 3, '23:45', '88.201.44.2'),
      (3, 2, '10:00', '192.168.0.12'),
      (4, 4, '09:20', '192.168.0.14');

    INSERT INTO server_access (id, employee_id, resource, time) VALUES
      (1, 3, 'client_database', '23:50'),
      (2, 1, 'dev_notes', '11:00'),
      (3, 4, 'project_docs', '10:20');

    INSERT INTO documents (id, title, classification) VALUES
      (1, 'Drone Prototype', 'Secret'),
      (2, 'Budget Plan', 'Internal'),
      (3, 'Missile Guidance', 'Top Secret');

    INSERT INTO document_access (id, employee_id, document_id, date) VALUES
      (1, 2, 1, '2024-04-01'),
      (2, 4, 3, '2024-04-02'),
      (3, 1, 2, '2024-04-02'),
      (4, 4, 1, '2024-04-03');

    INSERT INTO external_contacts (id, employee_id, company) VALUES
      (1, 4, 'Nova Defense'),
      (2, 2, 'University Lab');
  `);

  cachedDb = db;
  return db;
}

function isSafeReadOnlySql(sql: string | undefined) {
  const s = String(sql || "").trim();
  if (!s) return false;
  if (s.includes(";")) return false;
  const up = s.toUpperCase();
  if (!(up.startsWith("SELECT") || up.startsWith("WITH"))) return false;
  const forbidden = [
    "INSERT",
    "UPDATE",
    "DELETE",
    "DROP",
    "ALTER",
    "CREATE",
    "PRAGMA",
    "ATTACH",
    "DETACH",
    "VACUUM",
    "REINDEX"
  ];
  return !forbidden.some((kw) => up.includes(kw));
}

async function mockRequest<T>(path: string, opts: RequestInit & { token?: string }) {
  const token = opts.token;
  const session = getSession(token);

  // Auth endpoints
  if (path === "/auth/register" && opts.method === "POST") {
    const body = opts.body ? JSON.parse(String(opts.body)) : {};
    const username = String(body.username || "").trim();
    const password = String(body.password || "");
    if (!username || !password) return { ok: false, error: "Informe usuário e senha." };
    const users = getUsers();
    if (users[username]) return { ok: false, error: "Este usuário já existe." };
    setUser({ username, password });
    const token = createToken();
    setSession({ token, username });
    return { ok: true, token, user: { id: username.length, username } } as any;
  }

  if (path === "/auth/login" && opts.method === "POST") {
    const body = opts.body ? JSON.parse(String(opts.body)) : {};
    const username = String(body.username || "").trim();
    const password = String(body.password || "");
    if (!username || !password) return { ok: false, error: "Informe usuário e senha." };
    const users = getUsers();
    const user = users[username];
    if (!user || user.password !== password) {
      return { ok: false, error: "Usuário ou senha inválidos." };
    }
    const token = createToken();
    setSession({ token, username });
    return { ok: true, token, user: { id: username.length, username } } as any;
  }

  // All other endpoints require auth
  if (!session) return { ok: false, error: "Não autenticado." };

  // Cases / progress
  if (path === "/cases" && opts.method === "GET") {
    const prog = getProgress(session.username);
    const list = cases.map((c) => {
      const idx = cases.findIndex((x) => x.id === c.id);
      const prev = idx > 0 ? cases[idx - 1] : null;
      const prevSolved =
        !prev || (prog.solved[prev.id] && prog.solved[prev.id].finishedAt);
      return { id: c.id, title: c.title, unlocked: prevSolved, slug: c.slug };
    });
    return { ok: true, cases: list, xp: prog.xp } as any;
  }

  const caseMatch = path.match(/^\/cases\/(\d+)(?:\/(schema|query|answer))?$/);
  if (caseMatch) {
    const caseId = Number(caseMatch[1]);
    const c = cases.find((x) => x.id === caseId);
    if (!c) return { ok: false, error: "Caso não encontrado." };

    const prog = getProgress(session.username);
    if (!prog.solved[caseId]) {
      prog.solved[caseId] = {
        solvedObjectives: [],
        startedAt: Date.now(),
        finishedAt: null,
        queryCount: 0,
        hintsUsed: 0
      };
      setProgress(session.username, prog);
    }

    if (!caseMatch[2]) {
      return { ok: true, case: c } as any;
    }

    if (caseMatch[2] === "schema") {
      return { ok: true, schema: c.schema } as any;
    }

    if (caseMatch[2] === "query") {
      const body = opts.body ? JSON.parse(String(opts.body)) : {};
      const sql = String(body.sql || "").trim();
      if (!isSafeReadOnlySql(sql)) {
        return {
          ok: false,
          error:
            "Query inválida. Neste jogo, por segurança, só aceitamos SELECT (ou WITH) sem ponto e vírgula."
        };
      }
      try {
        const db = await getSqlDb();
        const res = db.exec(sql);
        const first = res[0] || { columns: [], values: [] };
        const columns: string[] = first.columns || [];
        const rows = (first.values || []).map((vals: any[]) => {
          const row: Record<string, any> = {};
          columns.forEach((col, idx) => (row[col] = vals[idx]));
          return row;
        });
        prog.solved[caseId].queryCount += 1;
        setProgress(session.username, prog);
        return {
          ok: true,
          columns,
          rows,
          solvedNow: [],
          progress: prog.solved[caseId],
          xp: prog.xp
        } as any;
      } catch (e: any) {
        return { ok: false, error: `Erro ao executar SQL: ${e.message}` };
      }
    }

    if (caseMatch[2] === "answer") {
      const body = opts.body ? JSON.parse(String(opts.body)) : {};
      const suspect = String(body.suspect || "").trim();
      if (!suspect) {
        return { ok: false, error: "Informe um suspeito." };
      }
      const correct = String(c.poll?.correct || "").trim();
      const isCorrect =
        correct && suspect.toLowerCase() === correct.toLowerCase();
      if (isCorrect) {
        if (!prog.solved[caseId].finishedAt) {
          prog.solved[caseId].finishedAt = Date.now();
          prog.xp += c.rewardXp || 200;
        }
        setProgress(session.username, prog);
        return { ok: true, correct: true, xp: prog.xp, progress: prog.solved[caseId] } as any;
      }
      return { ok: true, correct: false, xp: prog.xp, progress: prog.solved[caseId] } as any;
    }
  }

  return { ok: false, error: "Endpoint não encontrado." };
}

export const api = {
  register: (username: string, password: string) =>
    request<{ token: string; user: { id: number; username: string } }>(
      "/auth/register",
      { method: "POST", body: JSON.stringify({ username, password }) }
    ),
  login: (username: string, password: string) =>
    request<{ token: string; user: { id: number; username: string } }>(
      "/auth/login",
      { method: "POST", body: JSON.stringify({ username, password }) }
    ),
  listCases: (token: string) =>
    request<{ cases: Array<{ id: number; title: string; unlocked: boolean }>; xp: number }>(
      "/cases",
      { method: "GET", token }
    ),
  getCase: (token: string, id: number) =>
    request<{ case: any }>(`/cases/${id}`, { method: "GET", token }),
  schema: (token: string, id: number) =>
    request<{ schema: Record<string, Array<{ name: string; type: string; notnull: boolean }>> }>(
      `/cases/${id}/schema`,
      { method: "GET", token }
    ),
  runQuery: (token: string, id: number, sql: string) =>
    request<{
      columns: string[];
      rows: any[];
      solvedNow: string[];
      progress: any;
      xp: number;
    }>(`/cases/${id}/query`, {
      method: "POST",
      token,
      body: JSON.stringify({ sql }),
    }),
  meProgress: (token: string) =>
    request<{ progress: { xp: number; solved: Record<string, any> } }>("/cases/me/progress", {
      method: "GET",
      token,
    }),
  answerCase: (token: string, id: number, suspect: string) =>
    request<{ correct: boolean; xp: number; progress: any }>(`/cases/${id}/answer`, {
      method: "POST",
      token,
      body: JSON.stringify({ suspect }),
    }),
};

