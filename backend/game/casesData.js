const fs = require("fs");
const path = require("path");

const CASES_DIR = path.join(__dirname, "..", "..", "cases");
const CATEGORY_ORDER = ["categoria1", "categoria2", "categoria3", "categoria4", "categoria5"];
const CATEGORY_TITLES = {
  categoria1: "Homicídios",
  categoria2: "Crimes Cibernéticos",
  categoria3: "Fugas",
  categoria4: "Lavagem de Dinheiro",
categoria5: "Fraude de Identidade"
};

function readCase(caseDir) {
  const caseFile = path.join(caseDir, "case.json");
  if (!fs.existsSync(caseFile)) return null;
  return JSON.parse(fs.readFileSync(caseFile, "utf8"));
}

function loadCategory(categoryId) {
  const categoryDir = path.join(CASES_DIR, categoryId);
  const cases = fs.existsSync(categoryDir)
    ? fs
        .readdirSync(categoryDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && entry.name.startsWith("caso"))
        .map((entry) => readCase(path.join(categoryDir, entry.name)))
        .filter(Boolean)
        .sort((a, b) => Number(a.id) - Number(b.id))
    : [];

  return {
    id: categoryId,
    title: CATEGORY_TITLES[categoryId] || categoryId,
    cases
  };
}

const categories = CATEGORY_ORDER.map(loadCategory);
const cases = categories.flatMap((category) => category.cases);

module.exports = { cases, categories, CATEGORY_ORDER };
