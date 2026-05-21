import React from "react";
import { RetroWindow } from "./RetroWindow";
import { api } from "@/lib/api";

type CaseEntry = {
  id: number;
  title: string;
  unlocked: boolean;
  slug?: string;
  categoryId?: string;
  categoryTitle?: string;
};

type CaseGroup = {
  id: string;
  title: string;
  cases: CaseEntry[];
};

export function CasesWindow({
  open,
  onClose,
  token,
  onOpenCase,
  refreshToken,
  defaultPos,
  zIndex,
  onFocus,
}: {
  open: boolean;
  onClose: () => void;
  token: string;
  onOpenCase: (id: number) => void;
  refreshToken?: number;
  defaultPos?: { x: number; y: number };
  zIndex?: number;
  onFocus?: () => void;
}) {
  const [loading, setLoading] = React.useState(false);
  const [cases, setCases] = React.useState<CaseEntry[]>([]);
  const [categories, setCategories] = React.useState<CaseGroup[]>([]);
  const [expandedCategoryId, setExpandedCategoryId] = React.useState<string | null>(null);
  const [xp, setXp] = React.useState(0);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) return;
    setLoading(true);
    api
      .listCases(token)
      .then((r) => {
        if (!r.ok) return setErr(r.error);
        setCases((r as any).cases || []);
        setCategories((r as any).categories || []);
        setXp(r.xp);
        setErr(null);
        setExpandedCategoryId((current) => current || ((r as any).categories?.[0]?.id ?? null));
      })
      .finally(() => setLoading(false));
  }, [open, token, refreshToken]);

  if (!open) return null;

  return (
    <RetroWindow
      title="📁 Casos"
      onClose={onClose}
      width={380}
      height={300}
      defaultPos={defaultPos}
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
            {(categories.length
              ? categories
              : [
                  {
                    id: "categoria1",
                    title: "Categoria 1",
                    cases: cases.filter((item) => (item.categoryId || "categoria1") === "categoria1")
                  }
                ]
            ).map((category) => {
              const isOpen = expandedCategoryId === category.id;
              return (
                <div key={category.id} className="space-y-2">
                  <button
                    type="button"
                    className="dd-btn w-full text-left font-bold uppercase tracking-wide"
                    onClick={() => setExpandedCategoryId(isOpen ? null : category.id)}
                    title={isOpen ? "Fechar categoria" : "Abrir categoria"}
                  >
                    <span className="flex items-center justify-between">
                      <span>{category.title}</span>
                      <span className="text-xs opacity-70">{isOpen ? "−" : "+"}</span>
                    </span>
                  </button>

                  {isOpen ? (
                    <div className="flex flex-col gap-2 pl-1">
                      {category.cases.length ? (
                        category.cases.map((c) => (
                          <button
                            type="button"
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
                        ))
                      ) : (
                        <div className="text-xs opacity-60">Sem casos nesta categoria.</div>
                      )}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
        <div className="text-[11px] opacity-70">
          Dica: comece pelo Caso 1. Execute queries com <span className="dd-mono">SELECT</span>.
        </div>
      </div>
    </RetroWindow>
  );
}

