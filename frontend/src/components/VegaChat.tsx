import React from "react";
import { RetroWindow } from "./RetroWindow";

type Nivel = "iniciante" | "intermediario" | "avancado";

export function VegaChat({
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
  const [picked, setPicked] = React.useState<Nivel | null>(null);

  if (!open) return null;

  return (
    <RetroWindow
      title="Operador Vega — Chat do Guia"
      onClose={onClose}
      width={320}
      height={240}
      defaultPos={defaultPos || { x: 780, y: 420 }}
      zIndex={zIndex}
      onFocus={onFocus}
    >
      <div className="flex h-full flex-col gap-2">
        <div className="dd-inset flex-1 p-2 text-sm">
          <div className="font-bold">Operador Vega:</div>
          <div className="mt-1">
            Olá, agente. Antes de começarmos, qual é o seu nível de conhecimento em SQL?
          </div>
          {picked ? (
            <div className="mt-2">
              <span className="font-bold">Você:</span>{" "}
              {picked === "iniciante"
                ? "Iniciante"
                : picked === "intermediario"
                  ? "Intermediário"
                  : "Avançado"}
            </div>
          ) : null}
        </div>

        <div className="flex gap-2">
          <button
            className="dd-btn flex-1"
            onClick={() => {
              setPicked("iniciante");
              onPickNivel("iniciante");
            }}
          >
            Iniciante
          </button>
          <button
            className="dd-btn flex-1"
            onClick={() => {
              setPicked("intermediario");
              onPickNivel("intermediario");
            }}
          >
            Intermediário
          </button>
          <button
            className="dd-btn flex-1"
            onClick={() => {
              setPicked("avancado");
              onPickNivel("avancado");
            }}
          >
            Avançado
          </button>
        </div>
      </div>
    </RetroWindow>
  );
}

