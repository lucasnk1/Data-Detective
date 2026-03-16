import React from "react";
import { RetroWindow } from "./RetroWindow";
import { api } from "@/lib/api";

export function CasesWindow({
  open,
  onClose,
  token,
  onOpenCase,
  defaultPos,
  zIndex,
  onFocus,
}: {
  open: boolean;
  onClose: () => void;
  token: string;
  onOpenCase: (id: number) => void;
  defaultPos?: { x: number; y: number };
  zIndex?: number;
  onFocus?: () => void;
}) {
  const [loading, setLoading] = React.useState(false);
  const [cases, setCases] = React.useState<Array<any>>([]);
  const [xp, setXp] = React.useState(0);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) return;
    setLoading(true);
    api
      .listCases(token)
      .then((r) => {
        if (!r.ok) return setErr(r.error);
        setCases(r.cases);
        setXp(r.xp);
        setErr(null);
      })
      .finally(() => setLoading(false));
  }, [open, token]);

  if (!open) return null;

  return (
    <RetroWindow
      title="📁 Casos"
      onClose={onClose}
      width={380}
      height={300}
      defaultPos={defaultPos || { x: 120, y: 100 }}
      zIndex={zIndex}
      onFocus={onFocus}
    >
      <div className="flex h-full flex-col gap-2">
        <div className="text-xs">
          XP atual: <span className="font-bold">{xp}</span>
        </div>
        <div className="dd-inset flex-1 overflow-auto p-2">
          {loading ? <div className="text-xs opacity-70">Carregando...</div> : null}
          {err ? <div className="text-xs text-red-700">{err}</div> : null}
          <div className="flex flex-col gap-2">
            {cases.map((c) => (
              <button
                key={c.id}
                className="dd-btn text-left"
                onClick={() => (c.unlocked ? onOpenCase(c.id) : null)}
                disabled={!c.unlocked}
                title={c.unlocked ? "Abrir caso" : "Bloqueado"}
              >
                <div className="font-bold">{c.title}</div>
                <div className="text-xs opacity-70">
                  {c.unlocked ? "Disponível" : "Bloqueado (em breve)"}
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="text-[11px] opacity-70">
          Dica: comece pelo Caso 1. Execute queries com <span className="dd-mono">SELECT</span>.
        </div>
      </div>
    </RetroWindow>
  );
}

