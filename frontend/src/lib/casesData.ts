import case1 from "../../../cases/categoria1/caso1/case.json";
import case11 from "../../../cases/categoria2/caso11/case.json";
import case12 from "../../../cases/categoria2/caso12/case.json";
import case13 from "../../../cases/categoria2/caso13/case.json";
import case14 from "../../../cases/categoria2/caso14/case.json";
import case15 from "../../../cases/categoria2/caso15/case.json";
import case21 from "../../../cases/categoria3/caso21/case.json";

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

export const cases: CaseData[] = [case1, case11, case12, case13, case14, case15, case21] as CaseData[];

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
