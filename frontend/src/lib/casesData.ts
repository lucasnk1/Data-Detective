import case1 from "../../../cases/categoria1/caso1/case.json";
import case2 from "../../../cases/categoria1/caso2/case.json";
import case3 from "../../../cases/categoria1/caso3/case.json";
import case4 from "../../../cases/categoria1/caso4/case.json";
import case5 from "../../../cases/categoria1/caso5/case.json";
import case11 from "../../../cases/categoria2/caso11/case.json";
import case12 from "../../../cases/categoria2/caso12/case.json";
import case13 from "../../../cases/categoria2/caso13/case.json";
import case14 from "../../../cases/categoria2/caso14/case.json";
import case15 from "../../../cases/categoria2/caso15/case.json";
import case16 from "../../../cases/categoria2/caso16/case.json";
import case17 from "../../../cases/categoria2/caso17/case.json";
import case18 from "../../../cases/categoria2/caso18/case.json";
import case19 from "../../../cases/categoria2/caso19/case.json";
import case20 from "../../../cases/categoria2/caso20/case.json";
import case21 from "../../../cases/categoria3/caso21/case.json";
import case22 from "../../../cases/categoria3/caso22/case.json";
import case23 from "../../../cases/categoria3/caso23/case.json";
import case24 from "../../../cases/categoria3/caso24/case.json";
import case25 from "../../../cases/categoria3/caso25/case.json";
import case31 from "../../../cases/categoria4/caso31/case.json";
import case32 from "../../../cases/categoria4/caso32/case.json";
import case33 from "../../../cases/categoria4/caso33/case.json";
import case34 from "../../../cases/categoria4/caso34/case.json";
import case35 from "../../../cases/categoria4/caso35/case.json";
import case41 from "../../../cases/categoria5/caso41/case.json";
import case42 from "../../../cases/categoria5/caso42/case.json";
import case43 from "../../../cases/categoria5/caso43/case.json";
import case44 from "../../../cases/categoria5/caso44/case.json";
import case45 from "../../../cases/categoria5/caso45/case.json";

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

export const cases: CaseData[] = [case1, case2, case3, case4, case5, case11, case12, case13, case14, case15, case16, case17, case18, case19, case20, case21, case22, case23, case24, case25, case31, case32, case33, case34, case35, case41, case42, case43, case44, case45] as CaseData[];

const categoryOrder = ["categoria1","categoria2","categoria3","categoria4","categoria5"] as const;
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
