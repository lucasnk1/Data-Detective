import React from "react";
import { RetroWindow } from "./RetroWindow";
import { SqlEditor } from "./SqlEditor";
import { ResultsTable } from "./ResultsTable";
import { SchemaViewer } from "./SchemaViewer";
import { api } from "@/lib/api";

export function CaseWindow({
  open,
  onClose,
  token,
  caseId,
  defaultPos,
  zIndex,
  onFocus,
}: {
  open: boolean;
  onClose: () => void;
  token: string;
  caseId: number;
  defaultPos?: { x: number; y: number };
  zIndex?: number;
  onFocus?: () => void;
}) {
  const [caseData, setCaseData] = React.useState<any>(null);
  const [schema, setSchema] = React.useState<any>(null);
  const [sql, setSql] = React.useState(
    "SELECT *\nFROM people\nLIMIT 10"
  );
  const [columns, setColumns] = React.useState<string[]>([]);
  const [rows, setRows] = React.useState<any[]>([]);
  const [msg, setMsg] = React.useState<string | null>(null);
  const [xp, setXp] = React.useState<number | null>(null);
  const [queryCount, setQueryCount] = React.useState<number | null>(null);
  const [selectedSuspect, setSelectedSuspect] = React.useState<string>("");
  const [answerMsg, setAnswerMsg] = React.useState<string | null>(null);
  const [caseSolved, setCaseSolved] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    api.getCase(token, caseId).then((r) => {
      if (r.ok) setCaseData(r.case);
    });
    api.schema(token, caseId).then((r) => {
      if (r.ok) setSchema(r.schema);
    });
  }, [open, token, caseId]);

  async function run() {
    try {
      setMsg(null);
      const r = await api.runQuery(token, caseId, sql);
      if (!r.ok) {
        setMsg(r.error);
        return;
      }
      setColumns(r.columns);
      setRows(r.rows);
      setXp(r.xp);
      setQueryCount(r.progress?.queryCount ?? null);
      // neste modo, resolução final vem pela enquete
    } catch (e: any) {
      const message = e?.message ? String(e.message) : "Erro inesperado ao executar SQL.";
      setMsg(message);
    }
  }

  async function submitAnswer() {
    if (!selectedSuspect) {
      setAnswerMsg("Selecione um suspeito antes de confirmar.");
      return;
    }
    const r = await api.answerCase(token, caseId, selectedSuspect);
    if (!r.ok) {
      setAnswerMsg(r.error);
      return;
    }
    setXp(r.xp);
    if (r.correct) {
      setCaseSolved(true);
      setAnswerMsg("Caso encerrado! Você acertou o suspeito e ganhou XP.");
    } else {
      setAnswerMsg("Resposta errada. Tente novamente, agente.");
    }
  }

  // Reset de estado quando abre outro caso ou reabre janela
  React.useEffect(() => {
    setColumns([]);
    setRows([]);
    setMsg(null);
    setQueryCount(null);
    setSelectedSuspect("");
    setAnswerMsg(null);
    setCaseSolved(false);
  }, [caseId, open]);

  if (!open) return null;

  const title = caseData?.title ? caseData.title : `Caso ${caseId}`;

  return (
    <RetroWindow
      title={title}
      onClose={onClose}
      width={980}
      height={560}
      defaultPos={defaultPos || { x: 60, y: 40 }}
      zIndex={zIndex}
      onFocus={onFocus}
    >
      <div className="flex h-full flex-col gap-2">
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="opacity-80">
            {caseSolved ? (
              <span className="font-bold text-green-800">Caso encerrado.</span>
            ) : (
              "Use SQL para investigar as pistas, depois responda à enquete."
            )}
          </div>
          <div className="flex items-center gap-2">
            {queryCount !== null ? (
              <div className="dd-inset px-2 py-1">
                Queries (caso): <span className="font-bold">{queryCount}</span>
              </div>
            ) : null}
            <button className="dd-btn" onClick={run}>
              Executar SQL
            </button>
          </div>
        </div>

        {msg ? (
          <div className={`text-xs ${msg.startsWith("Erro") ? "text-red-700" : ""}`}>
            {msg}
          </div>
        ) : null}

        <div className="grid h-[calc(100%-56px)] grid-cols-[1.15fr_1.7fr_0.9fr] gap-2">
          {/* ESQUERDA: narrativa + objetivo + enquete */}
          <div className="dd-inset h-full overflow-auto p-2 text-xs">
            <div className="text-sm font-bold">Narrativa</div>
            <div className="mt-2 whitespace-pre-wrap">
              {caseData?.narrative?.texto ||
                "Carregando relatório..."}
            </div>
            <div className="mt-3">
              <div className="font-bold">Objetivo</div>
              <div className="mt-1 opacity-90">
                {caseData?.objective ||
                  "Descubra o suspeito principal usando SQL."}
              </div>
            </div>

            {caseData?.initialClue ? (
              <div className="mt-3">
                <div className="font-bold">Pista inicial</div>
                <div className="mt-1 opacity-90">{caseData.initialClue}</div>
              </div>
            ) : null}

            {caseData?.poll ? (
              <div className="mt-4 border-t border-black/20 pt-2">
                <div className="font-bold mb-1">Enquete final</div>
                <div className="mb-2">
                  {caseData.poll.question ||
                    "Com base nas pistas, escolha o principal suspeito."}
                </div>
                <div className="flex flex-col gap-1">
                  {caseData.poll.options?.map((opt: string) => (
                    <label key={opt} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`suspect-${caseId}`}
                        value={opt}
                        checked={selectedSuspect === opt}
                        onChange={() => setSelectedSuspect(opt)}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
                <button className="dd-btn mt-2 w-full" onClick={submitAnswer}>
                  Confirmar resposta
                </button>
                {answerMsg ? (
                  <div
                    className={`mt-2 text-xs ${
                      answerMsg.startsWith("Caso encerrado") ? "text-green-800" : ""
                    }`}
                  >
                    {answerMsg}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          {/* CENTRO: editor + resultados (com scroll interno) */}
          <div className="flex h-full flex-col gap-2">
            <div className="flex-1 min-h-[160px] overflow-hidden">
              <SqlEditor value={sql} onChange={setSql} />
            </div>
            <div className="h-44 overflow-hidden">
              <ResultsTable columns={columns} rows={rows} />
            </div>
          </div>

          {/* DIREITA: schema */}
          <SchemaViewer schema={schema} />
        </div>
      </div>
    </RetroWindow>
  );
}

