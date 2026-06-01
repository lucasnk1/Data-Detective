const SQL_KEYWORDS = new Set([
  "select",
  "from",
  "where",
  "join",
  "inner",
  "left",
  "right",
  "full",
  "cross",
  "on",
  "and",
  "or",
  "not",
  "null",
  "as",
  "with",
  "recursive",
  "union",
  "all",
  "distinct",
  "group",
  "by",
  "having",
  "order",
  "limit",
  "offset",
  "case",
  "when",
  "then",
  "else",
  "end",
  "is",
  "in",
  "like",
  "between",
  "exists",
  "true",
  "false",
  "asc",
  "desc",
]);

/** Extrai nomes de tabelas após FROM / JOIN (suficiente para o jogo). */
function extractReferencedTables(sql) {
  const withoutStrings = String(sql).replace(/'([^']|'')*'/g, " ").replace(/"([^"]|"")*"/g, " ");
  const tables = new Set();
  const re = /\b(?:FROM|JOIN)\s+([a-zA-Z_][a-zA-Z0-9_]*)/gi;
  let match;
  while ((match = re.exec(withoutStrings))) {
    const name = match[1].toLowerCase();
    if (!SQL_KEYWORDS.has(name)) tables.add(name);
  }
  return tables;
}

function validateSqlTables(sql, allowedTables) {
  const allowed = new Set((allowedTables || []).map((t) => t.toLowerCase()));
  if (!allowed.size) return { ok: true };

  const referenced = extractReferencedTables(sql);
  const forbidden = [...referenced].filter((t) => !allowed.has(t));
  if (forbidden.length === 0) return { ok: true };

  return {
    ok: false,
    error: `Tabela(s) não disponível(is) neste caso: ${forbidden.join(", ")}. Use apenas: ${[...allowed].join(", ")}.`,
  };
}

module.exports = { extractReferencedTables, validateSqlTables };
