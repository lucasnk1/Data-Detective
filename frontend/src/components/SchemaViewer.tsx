import React from "react";

export function SchemaViewer({
  schema,
}: {
  schema: Record<string, Array<{ name: string; type: string; notnull: boolean; pk?: boolean }>> | null;
}) {
  if (!schema) return <div className="text-xs opacity-70">Carregando schema...</div>;

  const tables = Object.keys(schema);
  return (
    <div className="dd-inset h-full overflow-auto p-2">
      <div className="mb-2 text-xs font-bold">Schema do Banco</div>
      {tables.map((t) => (
        <div key={t} className="mb-3">
          <div className="text-xs font-bold">{t}</div>
          <ul className="ml-3 mt-1 list-disc text-xs">
            {schema[t].map((c) => (
              <li key={c.name}>
                <span className="font-bold">
                  {c.name}
                  {c.pk ? " (PK)" : ""}
                </span>{" "}
                <span className="opacity-70">
                  ({c.type}
                  {c.notnull ? ", NOT NULL" : ""})
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

