// Equilibrium Press: optional, read-only GitHub Pages deep links to native CAD files.
// Only model IDs in the deployed same-origin catalog may load. No remote code or credentials.
export function validModelId(id) {
  return typeof id === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) && id.length <= 80;
}
export function modelProjectPath(id) {
  if (!validModelId(id)) throw new Error("Invalid published model ID");
  return `models/${id}/project.json`;
}
export async function openPublishedModel(api, id, { base, fetchFile = fetch } = {}) {
  const projectPath = modelProjectPath(id);
  const site = base ?? new URL("./", window.location.href);
  const catalogURL = new URL("models/library.json", site);
  const manifestResponse = await fetchFile(catalogURL, { cache: "no-store" });
  if (!manifestResponse.ok) throw new Error("The model catalog is unavailable");
  const catalog = await manifestResponse.json();
  const entry = Array.isArray(catalog.models) ? catalog.models.find(m => m.id === id && m.published !== false) : null;
  if (!entry || entry.project !== projectPath) throw new Error("Unknown published model");
  const projectURL = new URL(projectPath, site);
  if (projectURL.origin !== catalogURL.origin) throw new Error("Only same-origin project files are supported");
  const response = await fetchFile(projectURL, { cache: "no-store" });
  if (!response.ok) throw new Error("Project file is unavailable");
  const length = Number(response.headers?.get?.("content-length") || 0);
  if (length > 8 * 1024 * 1024) throw new Error("Project exceeds the 8 MB loader limit");
  const text = await response.text();
  if (text.length > 8 * 1024 * 1024) throw new Error("Project exceeds the 8 MB loader limit");
  let project;
  try { project = JSON.parse(text); } catch { throw new Error("Project file is not JSON"); }
  if (project?.app !== "jumpstart-3d" || project?.version !== 1 || !Array.isArray(project?.doc?.bodies))
    throw new Error("Project is not native JumpStart 3D JSON");
  await api.load(project);
  api.fit();
  return entry;
}
function readyToOpen(app, limitMs = 30000) {
  const started = Date.now();
  return new Promise((resolve, reject) => {
    function check() {
      if (app.projects?.started) return resolve();
      if (Date.now() - started > limitMs) return reject(new Error("The editor has not finished loading"));
      setTimeout(check, 80);
    }
    check();
  });
}
export function initEquilibriumDeepLinks(app) {
  const id = new URLSearchParams(window.location.search).get("project");
  if (id == null) return; // normal JumpStart UI remains unchanged
  const load = async () => {
    try {
      if (!validModelId(id)) throw new Error("Invalid published model ID");
      await readyToOpen(app);
      const entry = await openPublishedModel(window.JS3D, id);
      app.toast("Opened GitHub model: " + entry.title);
    } catch (err) {
      app.toast("Cannot open published model: " + (err?.message || String(err)), "error");
    }
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", load, { once: true });
  else setTimeout(load, 0);
}
