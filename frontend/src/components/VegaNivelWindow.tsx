import React from "react";
import { RetroWindow } from "./RetroWindow";

type Nivel = "iniciante" | "intermediario" | "avancado";

export function VegaNivelWindow({
  open,
  onClose,
  onPickNivel,
  defaultPos,
  zIndex,
  onFocus,
}: {
  open: boolean;
  onClose: () => void;
  onPickNivel: (n: Nivel) => void;
  defaultPos?: { x: number; y: number };
  zIndex?: number;
  onFocus?: () => void;
}) {
  if (!open) return null;

  return (
    <RetroWindow
      title="Operador Vega — Definir nível de SQL"
      onClose={onClose}
      width={420}
      height={260}
      defaultPos={defaultPos || { x: 560, y: 120 }}
      zIndex={zIndex}
      onFocus={onFocus}
      resizable={false}
    >
      <div className="flex h-full flex-col gap-3">
        <div className="dd-inset flex-1 p-2 text-sm">
          <div className="font-bold">Operador Vega:</div>
          <div className="mt-1">
            Para calibrar suas missões, escolha seu nível de conhecimento em SQL:
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button className="dd-btn" onClick={() => onPickNivel("iniciante")}>
            Iniciante
          </button>
          <button className="dd-btn" onClick={() => onPickNivel("intermediario")}>
            Intermediário
          </button>
          <button className="dd-btn" onClick={() => onPickNivel("avancado")}>
            Avançado
          </button>
        </div>

        <div className="text-[11px] opacity-70">
          Você pode mudar isso depois em <span className="font-bold">Configurações</span>.
        </div>
      </div>
    </RetroWindow>
  );
}

