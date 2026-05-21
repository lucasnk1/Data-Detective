import case1 from "../../../cases/categoria1/caso1/case.json";
import case2 from "../../../cases/categoria2/caso1/case.json";
import case3 from "../../../cases/categoria2/caso2/case.json";
import case4 from "../../../cases/categoria2/caso3/case.json";
import case5 from "../../../cases/categoria3/caso1/case.json";
import case6 from "../../../cases/categoria2/caso4/case.json";
import case7 from "../../../cases/categoria2/caso5/case.json";

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

export const cases: CaseData[] = [case1, case2, case3, case4, case5, case6, case7] as CaseData[];

const categoryOrder = ["categoria1", "categoria2", "categoria3", "categoria4", "categoria5"] as const;
const categoryTitles: Record<(typeof categoryOrder)[number], string> = {
  categoria1: "Homicídios",
  categoria2: "Crimes Cibernéticos",
  categoria3: "Fugas",
  categoria4: "Crimes Financeiros",
  categoria5: "Espionagem"
};

export const categories = categoryOrder.map((id) => ({
  id,
  title: categoryTitles[id],
  cases: cases.filter((item) => item.category?.id === id)
}));
