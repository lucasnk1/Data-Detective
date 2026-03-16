import React from "react";
import { RetroWindow } from "./RetroWindow";

type Msg = { from: "vega" | "user"; text: string };

function answer(userText: string) {
  const t = userText.toLowerCase();

  if (t.includes("select")) {
    return (
      "SELECT busca dados.\n\n" +
      "Exemplo:\nSELECT *\nFROM people\nLIMIT 10"
    );
  }
  if (t.includes("where")) {
    return (
      "WHERE filtra linhas.\n\n" +
      "Exemplo:\nSELECT *\nFROM vehicles\nWHERE plate LIKE 'DDT%'"
    );
  }
  if (t.includes("join")) {
    return (
      "JOIN combina tabelas.\n\n" +
      "Exemplo:\nSELECT p.name, v.plate\nFROM people p\nJOIN vehicles v ON v.owner_id = p.id"
    );
  }
  if (t.includes("erro") || t.includes("não funciona") || t.includes("nao funciona")) {
    return (
      "Me diga a query e a mensagem de erro.\n\n" +
      "Dica: neste jogo só aceitamos SELECT (ou WITH) e sem ';' por segurança."
    );
  }
  if (t.includes("ddt") || t.includes("placa")) {
    return (
      "Boa! Você pode começar buscando placas que começam com 'DDT'.\n\n" +
      "Dica:\nSELECT * FROM vehicles WHERE plate LIKE 'DDT%'"
    );
  }
  if (t.includes("schema") || t.includes("tabela") || t.includes("coluna")) {
    return (
      "Olhe o painel de Schema à direita.\n\n" +
      "No Caso 1: people, crime_reports, interviews, vehicles."
    );
  }

  return (
    "Posso ajudar com SQL e com o caso.\n\n" +
    "Pergunte algo como: 'Como uso WHERE?', 'Como faço JOIN?', ou 'Qual a dica do Caso 1?'."
  );
}

export function GuideChatbotWindow({
  open,
  onClose,
  defaultPos,
  zIndex,
  onFocus,
}: {
  open: boolean;
  onClose: () => void;
  defaultPos?: { x: number; y: number };
  zIndex?: number;
  onFocus?: () => void;
}) {
  const [msgs, setMsgs] = React.useState<Msg[]>([
    {
      from: "vega",
      text:
        "Olá, agente. Eu sou o Operador Vega.\n" +
        "Estou aqui pra tirar dúvidas e te dar dicas (sem entregar tudo de graça).",
    },
  ]);
  const [text, setText] = React.useState("");

  function send() {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMsgs((m) => [...m, { from: "user", text: trimmed }, { from: "vega", text: answer(trimmed) }]);
    setText("");
  }

  if (!open) return null;

  return (
    <RetroWindow
      title="Chat do Guia — Operador Vega"
      onClose={onClose}
      width={380}
      height={320}
      defaultPos={defaultPos || { x: 760, y: 260 }}
      zIndex={zIndex}
      onFocus={onFocus}
      minWidth={320}
      minHeight={240}
    >
      <div className="flex h-full flex-col gap-2">
        <div className="dd-inset flex-1 overflow-auto p-2 text-xs whitespace-pre-wrap">
          {msgs.map((m, i) => (
            <div key={i} className="mb-2">
              <span className="font-bold">{m.from === "user" ? "Você" : "Vega"}:</span>{" "}
              {m.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="dd-inset flex-1 px-2 py-1 text-xs outline-none"
            placeholder="Digite sua dúvida..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
          />
          <button className="dd-btn text-xs" onClick={send}>
            Enviar
          </button>
        </div>
      </div>
    </RetroWindow>
  );
}

