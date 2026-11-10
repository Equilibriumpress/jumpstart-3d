# Equilibrium Press: JumpStart 3D agent workflow

Goal: ChatGPT makes native, editable JumpStart 3D model files; GitHub stores the projects; GitHub Pages displays them using the original browser editor. GitHub Actions are not part of model authoring or model publication.

1. Preserve upstream JumpStart 3D. Read `src/README.md`, `BRIDGE.md`, `mcp/README.md`, and `skills/jumpstart-3d/SKILL.md` before changing geometry.
2. ChatGPT directly creates `models/<slug>/project.json` in the documented native `{app:"jumpstart-3d",version:1,doc:...}` format. `recipe.json` is an optional, reproducible source representation, not a requirement for Pages runtime rendering.
3. Keep each geometric part named and editable. Use supported primitive, group, sketch, feature and transformation structures. Keep dimensional claims and assumptions separate.
4. Update `models/library.json`; `preview` is optional (`null` means the library displays a placeholder). Never invent a screenshot or promise an unbuilt GLB. The browser can display a native project and export a GLB using the existing kernel.
5. Validate document structure, unique IDs, matrices, all source references, catalog paths and geometry bounds before a PR. If a genuine in-app render is available, inspect it and fix CAD errors. Report unverified runtime rendering explicitly.
6. Create a feature branch and PR, review the actual changes and merge without requiring GitHub Actions checks. No changes to `main` outside PRs.
7. Public Pages hosting is static: for model updates, publish the changed files to the actual Pages source branch or directory. The old `.github/workflows/deploy-pages.yml` requires Actions and is not part of this workflow. See `docs-equilibrium/PAGES.md` for the one-time branch-based migration.
8. The original CAD editor, licensing, security restrictions and model storage remain intact. No GitHub credentials in public browser JavaScript. Do not embed third-party geometry without permission.
