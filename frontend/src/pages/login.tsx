import React from "react";
import { useRouter } from "next/router";
import { api } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    const token = window.localStorage.getItem("dd_token");
    if (token) router.replace("/desktop");
  }, [router]);

  async function doLogin() {
    setLoading(true);
    setErr(null);
    const r = await api.login(username, password);
    setLoading(false);
    if (!r.ok) return setErr(r.error);
    window.localStorage.setItem("dd_token", r.token);
    window.localStorage.setItem("dd_user", r.user.username);
    router.push("/desktop");
  }

  async function doRegister() {
    setLoading(true);
    setErr(null);
    const r = await api.register(username, password);
    setLoading(false);
    if (!r.ok) return setErr(r.error);
    window.localStorage.setItem("dd_token", r.token);
    window.localStorage.setItem("dd_user", r.user.username);
    router.push("/desktop");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--dd-bg)] p-6">
      <div className="dd-window w-full max-w-md">
        <div className="dd-titlebar flex h-8 items-center px-2 text-sm font-bold">
          Data Detective OS — Login
        </div>
        <div className="p-4 text-sm">
          <div className="mb-3 text-xs opacity-80">
            Projeto educacional. Conta e senha são só para simular o login.
          </div>

          <div className="grid gap-3">
            <label className="grid gap-1">
              <span className="text-xs font-bold">Usuário</span>
              <input
                className="dd-inset px-2 py-1 outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ex: agente123"
              />
            </label>
            <label className="grid gap-1">
              <span className="text-xs font-bold">Senha</span>
              <input
                className="dd-inset px-2 py-1 outline-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
              />
            </label>
          </div>

          {err ? <div className="mt-3 text-xs text-red-700">{err}</div> : null}

          <div className="mt-4 flex gap-2">
            <button className="dd-btn flex-1" onClick={doLogin} disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
            <button className="dd-btn flex-1" onClick={doRegister} disabled={loading}>
              Criar Conta
            </button>
          </div>

          <div className="mt-4 text-[11px] opacity-70">
            Dica: Sua conta é salva localmente no navegador.
          </div>
        </div>
      </div>
    </div>
  );
}

