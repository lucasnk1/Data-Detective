import React from "react";

export function ResultsTable({ columns, rows }: { columns: string[]; rows: any[] }) {
  return (
    <div className="dd-inset h-full overflow-auto">
      {rows.length === 0 ? (
        <div className="p-2 text-xs opacity-70">Nenhum resultado.</div>
      ) : (
        <table className="min-w-full text-xs">
          <thead>
            <tr className="bg-black/5">
              {columns.map((c) => (
                <th key={c} className="border-b border-black/10 px-2 py-1 text-left">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx} className={idx % 2 ? "bg-black/0" : "bg-black/5"}>
                {columns.map((c) => (
                  <td key={c} className="border-b border-black/10 px-2 py-1 align-top">
                    {String(r[c])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

