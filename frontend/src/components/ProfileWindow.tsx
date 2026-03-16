import React from "react";
import { RetroWindow } from "./RetroWindow";
import { api } from "@/lib/api";

function cargoPorXp(xp: number) {
  // Hierarquia simples por XP (100 XP ~ 1 nível)
  //  Nível 1-3   -> Data Detective Júnior
  //  Nível 4-6   -> Data Detective
  //  Nível 7-10  -> Investigador Sênior
  //  Nível 11+   -> Chefe de Investigação de Dados
  const level = Math.max(1, Math.floor(xp / 100) + 1);
  let cargo = "Data Detective Júnior";
  if (level >= 4 && level <= 6) cargo = "Data Detective";
  if (level >= 7 && level <= 10) cargo = "Investigador Sênior";
  if (level >= 11) cargo = "Chefe de Investigação de Dados";
  return { level, cargo };
}

function computeAchievements(progress: any) {
  const solved = progress?.solved || {};
  const entries = Object.values(solved) as any[];
  const finished = entries.filter((e) => e.finishedAt);

  const fast = finished.some((e) => e.finishedAt && e.startedAt && e.finishedAt - e.startedAt <= 5 * 60 * 1000);
  const fewQueries = finished.some((e) => typeof e.queryCount === "number" && e.queryCount <= 5);
  const streak3 = finished.length >= 3;
  const manyQueries = entries.reduce((a, e: any) => a + (e.queryCount || 0), 0) >= 50;
  const zeroHints = finished.length > 0 && entries.every((e: any) => (e.hintsUsed || 0) === 0);
  const singleCaseGrind = entries.some((e: any) => (e.queryCount || 0) >= 30);

  return [
    { id: "fast", title: "⚡ Solver Rápido", desc: "Resolver um caso em menos de 5 minutos", ok: fast },
    { id: "few", title: "🧠 Mestre das Queries", desc: "Resolver um caso com menos de 5 queries", ok: fewQueries },
    { id: "streak", title: "🔎 Detetive Persistente", desc: "Resolver 3 casos seguidos", ok: streak3 },
    { id: "many", title: "⌨️ Maratona de Queries", desc: "Executar 50 ou mais queries no total", ok: manyQueries },
    { id: "no-hints", title: "😎 Sem Rodinhas", desc: "Resolver pelo menos um caso sem usar nenhuma dica", ok: zeroHints },
    { id: "grinder", title: "🌀 Perdido na Query", desc: "Executar 30 ou mais queries em um único caso", ok: singleCaseGrind },
  ];
}

export function ProfileWindow({
  open,
  onClose,
  token,
  username,
  defaultPos,
  zIndex,
  onFocus,
}: {
  open: boolean;
  onClose: () => void;
  token: string;
  username: string;
  defaultPos?: { x: number; y: number };
  zIndex?: number;
  onFocus?: () => void;
}) {
  const [xp, setXp] = React.useState(0);
  const [progress, setProgress] = React.useState<any>(null);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) return;
    setErr(null);
    api.meProgress(token).then((r) => {
      if (!r.ok) return setErr(r.error);
      setProgress(r.progress);
      setXp(r.progress?.xp || 0);
    });
  }, [open, token]);

  if (!open) return null;

  const { level, cargo } = cargoPorXp(xp);
  const ach = computeAchievements(progress);
  const solvedCount = progress ? Object.values(progress.solved || {}).filter((e: any) => e.finishedAt).length : 0;
  const totalQueries = progress ? Object.values(progress.solved || {}).reduce((a: number, e: any) => a + (e.queryCount || 0), 0) : 0;

  return (
    <RetroWindow
      title="👤 Perfil do Agente"
      onClose={onClose}
      width={640}
      height={520}
      defaultPos={defaultPos || { x: 220, y: 80 }}
      zIndex={zIndex}
      onFocus={onFocus}
      minWidth={520}
      minHeight={420}
    >
      <div className="grid h-full grid-rows-[auto_1fr] gap-2">
        <div className="dd-inset p-2 text-sm">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-xs opacity-70">Nome</div>
              <div className="font-bold">{username || "Agente"}</div>
            </div>
            <div>
              <div className="text-xs opacity-70">Cargo</div>
              <div className="font-bold">{cargo}</div>
            </div>
            <div>
              <div className="text-xs opacity-70">Nível</div>
              <div className="font-bold">{level}</div>
            </div>
            <div>
              <div className="text-xs opacity-70">XP</div>
              <div className="font-bold">{xp}</div>
            </div>
          </div>
          {err ? <div className="mt-2 text-xs text-red-700">{err}</div> : null}
        </div>

        <div className="grid grid-cols-2 gap-2 overflow-hidden">
          <div className="dd-inset overflow-auto p-2 text-sm">
            <div className="font-bold mb-2">Conquistas</div>
            <div className="flex flex-col gap-2">
              {ach.map((a) => (
                <div key={a.id} className="dd-window p-2">
                  <div className="flex items-center justify-between">
                    <div className="font-bold">{a.title}</div>
                    <div className={`text-xs ${a.ok ? "text-green-700" : "opacity-60"}`}>
                      {a.ok ? "Concluída" : "Pendente"}
                    </div>
                  </div>
                  <div className="text-xs opacity-80">{a.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="dd-inset overflow-auto p-2 text-sm">
            <div className="font-bold mb-2">Estatísticas</div>
            <ul className="list-disc ml-5 text-sm">
              <li>
                <span className="font-bold">Casos resolvidos</span>: {solvedCount}
              </li>
              <li>
                <span className="font-bold">Total de queries</span>: {totalQueries}
              </li>
              <li>
                <span className="font-bold">Dicas usadas</span>:{" "}
                {progress
                  ? Object.values(progress.solved || {}).reduce((a: number, e: any) => a + (e.hintsUsed || 0), 0)
                  : 0}
              </li>
            </ul>
            <div className="mt-3 text-xs opacity-70">
              Observação: este projeto é educacional; as métricas são simples.
            </div>
          </div>
        </div>
      </div>
    </RetroWindow>
  );
}

