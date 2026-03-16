import React from "react";
import { RetroWindow } from "./RetroWindow";
import { SqlEditor } from "./SqlEditor";
import { ResultsTable } from "./ResultsTable";
import { api } from "@/lib/api";

const lessons = [
  {
    id: "select",
    title: "SELECT",
    text:
      "Pense em uma tabela como uma planilha. SELECT é como dizer: \"me mostre essas colunas e essas linhas\".\n\n" +
      "Se você usar SELECT * está pedindo: \"me mostre tudo\".\nExemplo:\nSELECT * FROM people",
    exercise: {
      prompt: "Liste todas as pessoas da tabela 'people'.",
      starter: "SELECT *\nFROM people",
      check: (rows: any[], columns: string[]) =>
        columns.includes("name") && rows.length >= 5,
    },
  },
  {
    id: "where",
    title: "WHERE",
    text:
      "WHERE é como um filtro. Primeiro você pega a tabela, depois diz quais linhas quer ver.\n\n" +
      "Exemplo:\nSELECT * FROM vehicles WHERE plate LIKE 'DDT%';",
    exercise: {
      prompt: "Encontre veículos com placa começando com 'DDT'.",
      starter: "SELECT *\nFROM vehicles\nWHERE plate LIKE 'DDT%'",
      check: (rows: any[]) => rows.length >= 1,
    },
  },
  {
    id: "like",
    title: "LIKE (% e _)",
    text:
      "LIKE é um jeito de dizer \"parecido com\" em textos.\n\n" +
      "Curingas (leia como máscaras):\n" +
      "- % = qualquer quantidade de letras\n" +
      "- _ = exatamente 1 letra\n\n" +
      "Exemplos simples:\n" +
      "SELECT * FROM vehicles WHERE plate LIKE 'DDT%';\n" +
      "SELECT * FROM vehicles WHERE plate LIKE 'DDT-____';",
    exercise: {
      prompt: "Encontre placas no formato 'DDT-____' (4 números).",
      starter: "SELECT *\nFROM vehicles\nWHERE plate LIKE 'DDT-____'",
      check: (rows: any[]) => rows.length >= 1,
    },
  },
  {
    id: "order-by",
    title: "ORDER BY",
    text:
      "ORDER BY é só \"ordenar\". Você pega o resultado e diz em qual coluna quer ordenar.\n\n" +
      "Exemplo:\nSELECT * FROM people ORDER BY age DESC;",
    exercise: {
      prompt: "Liste pessoas ordenadas por idade (maior para menor).",
      starter: "SELECT *\nFROM people\nORDER BY age DESC",
      check: (rows: any[]) => rows.length >= 3,
    },
  },
  {
    id: "group-by",
    title: "GROUP BY",
    text:
      "GROUP BY junta linhas parecidas para você contar ou somar coisas.\n\n" +
      "Exemplo:\nSELECT city, COUNT(*) AS total FROM people GROUP BY city;",
    exercise: {
      prompt: "Conte quantas pessoas existem por cidade.",
      starter: "SELECT city, COUNT(*) AS total\nFROM people\nGROUP BY city",
      check: (rows: any[], columns: string[]) => columns.includes("total") && rows.length >= 1,
    },
  },
  {
    id: "join",
    title: "JOIN",
    text:
      "JOIN é \"juntar tabelas\". Imagine duas planilhas que você gruda lado a lado usando uma coluna em comum.\n\n" +
      "Exemplo:\nSELECT p.name, v.plate FROM people p JOIN vehicles v ON v.owner_id = p.id;",
    exercise: {
      prompt: "Mostre nome e placa (people + vehicles).",
      starter:
        "SELECT p.name, v.plate\nFROM people p\nJOIN vehicles v ON v.owner_id = p.id",
      check: (rows: any[], columns: string[]) => columns.includes("plate") && rows.length >= 1,
    },
  },
];

export function TutorialWindow({
  open,
  onClose,
  token,
  defaultPos,
  zIndex,
  onFocus,
}: {
  open: boolean;
  onClose: () => void;
  token: string;
  defaultPos?: { x: number; y: number };
  zIndex?: number;
  onFocus?: () => void;
}) {
  const [lessonId, setLessonId] = React.useState(lessons[0].id);
  const lesson = lessons.find((l) => l.id === lessonId)!;

  const [sql, setSql] = React.useState(lesson.exercise.starter);
  const [columns, setColumns] = React.useState<string[]>([]);
  const [rows, setRows] = React.useState<any[]>([]);
  const [msg, setMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) return;
    setSql(lesson.exercise.starter);
    setColumns([]);
    setRows([]);
    setMsg(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId, open]);

  async function run() {
    setMsg(null);
    const r = await api.runQuery(token, 1, sql);
    if (!r.ok) {
      setMsg(r.error);
      return;
    }
    setColumns(r.columns);
    setRows(r.rows);

    const ok = lesson.exercise.check(r.rows, r.columns);
    setMsg(ok ? "Exercício concluído! ✅" : "Ainda não. Tente ajustar a query.");
  }

  if (!open) return null;

  return (
    <RetroWindow
      title="📘 Tutorial SQL"
      onClose={onClose}
      width={860}
      height={540}
      defaultPos={defaultPos || { x: 160, y: 70 }}
      zIndex={zIndex}
      onFocus={onFocus}
      minWidth={640}
      minHeight={420}
    >
      <div className="grid h-full grid-cols-[220px_1fr] gap-2">
        <div className="dd-inset h-full overflow-auto p-2">
          <div className="text-xs font-bold">Tópicos</div>
          <div className="mt-2 flex flex-col gap-2">
            {lessons.map((l) => (
              <button
                key={l.id}
                className={`dd-btn text-left ${l.id === lessonId ? "font-bold" : ""}`}
                onClick={() => setLessonId(l.id)}
              >
                {l.title}
              </button>
            ))}
          </div>
        </div>

        <div className="flex h-full flex-col gap-2">
          <div className="dd-inset p-2 text-xs whitespace-pre-wrap">
            <div className="text-sm font-bold">{lesson.title}</div>
            <div className="mt-1">{lesson.text}</div>
          </div>

          <div className="flex items-center justify-between gap-2 text-xs">
            <div>
              <span className="font-bold">Desafio:</span> {lesson.exercise.prompt}
            </div>
            <button className="dd-btn" onClick={run}>
              Executar SQL
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-2 overflow-hidden">
            <div className="flex-1 overflow-hidden">
              <SqlEditor value={sql} onChange={setSql} />
            </div>

            <div className="text-xs">
              {msg ? <div className="font-bold">{msg}</div> : <div className="opacity-60"> </div>}
            </div>

            <div className="h-44 overflow-hidden">
              <ResultsTable columns={columns} rows={rows} />
            </div>
          </div>
        </div>
      </div>
    </RetroWindow>
  );
}

