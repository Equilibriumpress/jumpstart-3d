// Equilibrium Press: trusted headless generation using the upstream CLI; no new CAD engine.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile as execFileCb } from "node:child_process";
import { promisify } from "node:util";
const execFile = promisify(execFileCb);
const root = resolve(fileURLToPath(new URL("../", import.meta.url)));
const catalog = JSON.parse(readFileSync(join(root, "models/library.json"), "utf8"));
const only = process.argv.find(x => x.startsWith("--id="))?.slice(5);
const chosen = catalog.models.filter(m => !only || m.id === only);
if (!chosen.length) throw new Error("No model for ID: " + only);
if (!existsSync(join(root, "docs/index.html"))) throw new Error("Run npm run build first: docs/index.html is missing");
for (const m of chosen) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(m.id)) throw new Error("invalid model ID");
  const recipe = join(root, "models", m.id, "recipe.json");
  const project = join(root, "models", m.id, "project.json");
  const preview = join(root, "models", m.id, "preview.png");
  const cli = join(root, "mcp/cli.mjs");
  if (!existsSync(recipe)) throw new Error("Missing recipe: " + m.id);
  const opts = { cwd: root, maxBuffer: 1024 * 1024 * 5, timeout: 20 * 60 * 1000 };
  console.log("Building " + m.id);
  await execFile(process.execPath, [cli, "build", recipe, "--export", "json", "--out", project, "--check", "--app", join(root, "docs")], opts);
  const saved = JSON.parse(readFileSync(project, "utf8"));
  if (saved.app !== "jumpstart-3d" || !saved.doc?.bodies?.length) throw new Error("Not a native project: " + m.id);
  saved.doc.name = m.title;
  writeFileSync(project, JSON.stringify(saved, null, 2) + "\n");
  await execFile(process.execPath, [cli, "shot", project, preview, "--width", "1000", "--app", join(root, "docs")], opts);
}
console.log("Generated " + chosen.length + " project(s) and screenshots");
