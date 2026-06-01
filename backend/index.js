const express = require("express");
const cors = require("cors");
const fs = require("fs");

const { initDb } = require("./database/db");
const { resolveCasesDir } = require("./lib/paths");
const authRoutes = require("./routes/auth");
const caseRoutes = require("./routes/cases");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

initDb();

app.get("/", (_req, res) => {
  const casesDir = resolveCasesDir();
  res.json({
    ok: true,
    name: "Data Detective API",
    version: "per-case-db",
    casesDir,
    casesDirExists: fs.existsSync(casesDir),
  });
});

app.use("/auth", authRoutes);
app.use("/cases", caseRoutes);

app.listen(PORT, () => {
  console.log(`[Data Detective] API rodando em http://localhost:${PORT}`);
});

