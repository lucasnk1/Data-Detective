const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

export type ApiOk<T> = { ok: true } & T;
export type ApiErr = { ok: false; error: string };

async function request<T>(
  path: string,
  opts: RequestInit & { token?: string } = {}
): Promise<ApiOk<T> | ApiErr> {
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

