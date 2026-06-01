import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const casesDir = path.resolve(__dirname, "../../cases");
const outFile = path.resolve(__dirname, "../src/lib/casesData.ts");

const categoryOrder = [
  "categoria1",
  "categoria2",
  "categoria3",
  "categoria4",
  "categoria5",
];
const categoryTitles = {
  categoria1: "Homicídios",
  categoria2: "Crimes Cibernéticos",
  categoria3: "Fugas",
  categoria4: "Lavagem de Dinheiro",
  categoria5: "Fraude de Identidade",
};

const imports = [];
const caseVars = [];

for (const cat of categoryOrder) {
  const catPath = path.join(casesDir, cat);
  if (!fs.existsSync(catPath)) continue;
  const dirs = fs
    .readdirSync(catPath, { withFileTypes: true })
    .filter((e) => e.isDirectory() && e.name.startsWith("caso"))
    .map((e) => e.name)
    .sort((a, b) => {
      const na = Number(a.replace("caso", ""));
      const nb = Number(b.replace("caso", ""));
      return na - nb;
    });
  for (const dir of dirs) {
    const jsonPath = path.join(catPath, dir, "case.json");
    if (!fs.existsSync(jsonPath)) continue;
    const meta = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    const varName = `case${meta.id}`;
    const rel = `../../../cases/${cat}/${dir}/case.json`;
    imports.push(`import ${varName} from "${rel}";`);
    caseVars.push(varName);
  }
}

caseVars.sort((a, b) => Number(a.replace("case", "")) - Number(b.replace("case", "")));

const content = `${imports.join("\n")}

type CaseSchemaField = {
  name: string;
  type: string;
  notnull: boolean;
  pk?: boolean;
};

export type CaseData = {
  id: number;
  slug: string;
  title: string;
  category: { id: string; title: string };
  narrative: { titulo: string; texto: string };
  objective: string;
  initialClue: string;
  tables: string[];
  schema: Record<string, CaseSchemaField[]>;
  poll: { question: string; options: string[]; correct: string };
  rewardXp: number;
};

export const cases: CaseData[] = [${caseVars.join(", ")}] as CaseData[];

const categoryOrder = ${JSON.stringify(categoryOrder)} as const;
const categoryTitles: Record<(typeof categoryOrder)[number], string> = {
  categoria1: "Homicídios",
  categoria2: "Crimes Cibernéticos",
  categoria3: "Fugas",
  categoria4: "Lavagem de Dinheiro",
  categoria5: "Fraude de Identidade",
};

export const categories = categoryOrder.map((id) => ({
  id,
  title: categoryTitles[id],
  cases: cases.filter((item) => item.category?.id === id),
}));
`;

fs.writeFileSync(outFile, content);
console.log(`Gerado ${outFile} com ${caseVars.length} casos.`);
