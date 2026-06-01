type SchemaColumn = {
  name: string;
  type: string;
  notnull: boolean;
  pk?: boolean;
};

export function mergeCaseSchema(
  fromApi: Record<string, SchemaColumn[]> | null | undefined,
  fromCase: Record<string, SchemaColumn[]> | null | undefined,
  tableNames?: string[]
): Record<string, SchemaColumn[]> {
  const names = tableNames?.length
    ? tableNames
    : [
        ...new Set([
          ...Object.keys(fromApi || {}),
          ...Object.keys(fromCase || {}),
        ]),
      ];

  const schema: Record<string, SchemaColumn[]> = {};
  for (const table of names) {
    const apiCols = fromApi?.[table];
    const caseCols = fromCase?.[table];
    if (apiCols?.length) schema[table] = apiCols;
    else if (caseCols?.length) schema[table] = caseCols;
  }
  return schema;
}
