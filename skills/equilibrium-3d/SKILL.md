---
name: equilibrium-3d
description: Create and publish editable native JumpStart 3D CAD models through GitHub and Pages.
---

# Equilibrium 3D: authoring skill

Read repository `AGENTS.md`, original `skills/jumpstart-3d/SKILL.md`, `BRIDGE.md` and `mcp/README.md` before modifying model sources.

## Model workflow
1. Translate the request into measurable geometry (mm, named parts, colours, constraints). Ask only for specifications that make geometry impossible otherwise.
2. Choose a kebab-case stable slug; add `models/<slug>/recipe.json` in the documented recipe schema. Prefer one named solid per editable part. Use `needs` to pin minimum JS3D bridge version.
3. Use only safe, allowlisted recipe calls. Never embed arbitrary execution code or secrets in published JSON.
4. Run `node scripts/validate-models.mjs` before a model build.
5. In the trusted environment, run `node scripts/build-models.mjs --id=<slug>` to produce the native `project.json` and real `preview.png`. A model branch may use `.github/workflows/model-build.yml` for this.
6. Confirm `JS3D.load(project)` works, geometry reports no error, exported GLB is nonempty, and a true screenshot displays expected parts.
7. Update `models/library.json` with the project path, preview path, description and tags. Open a PR, report actual CI outcomes; merge only after success.
8. Output the Pages URL `https://equilibriumpress.github.io/jumpstart-3d/?project=<slug>` after deployment is confirmed. Do not pretend Pages is live before activation.

## Design and compatibility
- Preserve upstream UI and CAD pipeline. Add optional integration outside the editor.
- The native project JSON is the handoff format; a GLB is optional export, not an editable replacement.
- Models in the public GitHub repo are public. Do not add third-party geometry without permission.
- The original agent skill and existing tools remain available. MCP is optional for this workflow.
