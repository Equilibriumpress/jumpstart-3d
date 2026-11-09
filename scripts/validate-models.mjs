// Equilibrium Press: validate committed CAD catalog and native project formats without a browser.
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { checkRecipe } from "../mcp/recipe.mjs";
const root = resolve(fileURLToPath(new URL("../", import.meta.url)));
const modelDir = join(root, "models");
const catalog = JSON.parse(readFileSync(join(modelDir, "library.json"), "utf8"));
const ids = new Set();
const ensurePath = (p) => {
  if (typeof p !== "string" || !/^models\/[a-z0-9-]+\/[a-z0-9.-]+$/.test(p)) throw new Error("unsafe model path: " + p);
  const abs = resolve(root, p);
  if (relative(modelDir, abs).startsWith("..")) throw new Error("path leaves models/: " + p);
  return abs;
};
if (catalog.schemaVersion !== 1 || !Array.isArray(catalog.models)) throw new Error("invalid models/library.json");
for (const model of catalog.models) {
  const { id, title, project, recipe, preview } = model;
  if (typeof id !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || ids.has(id)) throw new Error("invalid/duplicate model id: " + id);
  ids.add(id);
  if (!title || typeof title !== "string") throw new Error(id + ": title missing");
  for (const [key, path] of Object.entries({ project, recipe })) {
    if (path !== `models/${id}/${key}.json`) throw new Error(id + ": invalid " + key + " path");
    if (!existsSync(ensurePath(path))) throw new Error(id + ": missing " + path);
  }
  const recipeObj = JSON.parse(readFileSync(ensurePath(recipe), "utf8"));
  checkRecipe(recipeObj);
  const projectObj = JSON.parse(readFileSync(ensurePath(project), "utf8"));
  if (projectObj.app !== "jumpstart-3d" || projectObj.version !== 1 || !projectObj.doc || !Array.isArray(projectObj.doc.bodies) || projectObj.doc.bodies.length < 1) throw new Error(id + ": invalid native project");
  for (const body of projectObj.doc.bodies) {
    if (!body.id || !body.node || !Array.isArray(body.m) || body.m.length !== 16 || !body.m.every(Number.isFinite)) throw new Error(id + ": invalid body");
  }
  if (preview !== null && preview !== undefined) {
    if (preview !== `models/${id}/preview.png`) throw new Error(id + ": invalid preview path");
    const abs = ensurePath(preview);
    if (!existsSync(abs) || statSync(abs).size < 8) throw new Error(id + ": missing preview");
  }
}
console.log("Validated " + ids.size + " native CAD models");
