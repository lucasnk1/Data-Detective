const fs = require("fs");
const path = require("path");

const backendDir = path.resolve(__dirname, "..");
const dest = path.join(backendDir, "cases");

const sources = [
  path.join(backendDir, "..", "cases"),
  path.join(process.cwd(), "..", "cases"),
  path.join(process.cwd(), "cases"),
];

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dst, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

let ok = false;
for (const src of sources) {
  const resolved = path.resolve(src);
  if (!fs.existsSync(resolved)) continue;
  if (path.resolve(dest) === resolved) {
    ok = true;
    break;
  }
  if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true, force: true });
  copyDir(resolved, dest);
  console.log(`[sync-cases] Copiado ${resolved} -> ${dest}`);
  ok = true;
  break;
}

if (!fs.existsSync(dest)) {
  console.error("[sync-cases] ERRO: pasta cases não encontrada.");
  process.exit(1);
}

const categories = fs.readdirSync(dest).filter((n) => n.startsWith("categoria"));
console.log(`[sync-cases] OK — ${categories.length} categorias`);
process.exit(ok || fs.existsSync(dest) ? 0 : 1);
