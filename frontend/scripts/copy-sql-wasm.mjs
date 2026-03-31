import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, "..");

const src = resolve(projectRoot, "node_modules", "sql.js", "dist", "sql-wasm.wasm");
const dest = resolve(projectRoot, "public", "sql-wasm.wasm");

if (!existsSync(src)) {
  console.error("[prepare-sql-wasm] Arquivo fonte não encontrado:", src);
  process.exit(1);
}

mkdirSync(dirname(dest), { recursive: true });
copyFileSync(src, dest);
console.log("[prepare-sql-wasm] Copiado para:", dest);
