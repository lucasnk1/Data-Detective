const fs = require("fs");
const path = require("path");

function resolveCasesDir() {
  if (process.env.CASES_DIR) {
    const envDir = path.resolve(process.env.CASES_DIR);
    if (fs.existsSync(envDir)) return envDir;
  }

  const candidates = [
    path.join(__dirname, "..", "..", "cases"),
    path.join(process.cwd(), "..", "cases"),
    path.join(process.cwd(), "cases"),
  ];

  for (const dir of candidates) {
    const resolved = path.resolve(dir);
    if (fs.existsSync(resolved)) return resolved;
  }

  return path.resolve(candidates[0]);
}

module.exports = { resolveCasesDir };
