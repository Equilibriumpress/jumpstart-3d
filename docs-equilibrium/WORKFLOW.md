# ChatGPT → GitHub → JumpStart 3D on GitHub Pages

## Purpose

This fork operates the original JumpStart 3D editor unchanged. ChatGPT authors declarative CAD recipes; GitHub stores those recipes, native project JSON and verified screenshots. GitHub Pages serves editable published models.

## Create a new model

1. Work from a feature branch, preferably `equilibrium/model-<slug>`.
2. Read `AGENTS.md` and `skills/equilibrium-3d/SKILL.md`, preserving the original JumpStart skills.
3. Create `models/<slug>/recipe.json` with allowlisted JS3D calls (as documented in `mcp/README.md`). Add its catalog entry to `models/library.json`.
4. Run the existing CLI in a trusted build environment to produce `project.json` and real `preview.png`: `node scripts/build-models.mjs --id=<slug>`. The `model-build.yml` workflow can run this for model feature branches after browser dependencies are installed.
5. Validate geometry and generated assets. Review the model preview. Open and merge a PR only after all checks pass.
6. Once the Pages deployment succeeds, open `https://equilibriumpress.github.io/jumpstart-3d/?project=<slug>`, or browse `https://equilibriumpress.github.io/jumpstart-3d/library/`.

## Browser behavior

A project URL fetches `models/library.json`, verifies the ID and same-origin project path, then calls the documented `JS3D.load(project)`. Invalid or unknown IDs fail closed. Normal visits without a project parameter use the original editor without change.

Edits in the original editor are saved locally to IndexedDB as before. To publish an edited version, export the native JSON and submit a GitHub PR. No personal access token or GitHub write credential is exposed in the public app.

## Hosting and licensing

Pages deploys static output from the original build script, not a custom renderer. It has no server-side 3D execution. GitHub Actions may use Node and Chromium as a trusted source-build / test environment. Before the first deploy, repository settings must select Pages source **GitHub Actions**.

Keep the original software attribution and AGPL-3.0 licence obligations for this fork. All models in a public GitHub repo are public.
