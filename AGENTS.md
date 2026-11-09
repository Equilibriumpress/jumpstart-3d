# Equilibrium Press: JumpStart 3D agent workflow

Goal: ChatGPT authors editable 3D CAD designs, GitHub stores recipes and native project JSON, and GitHub Pages opens models in the unmodified JumpStart editor.

Authority:
1. Keep upstream JumpStart 3D source and engine intact. Read `src/README.md`, `BRIDGE.md`, `mcp/README.md`, and `skills/jumpstart-3d/SKILL.md` before CAD changes.
2. Use `models/library.json` as the published catalog and `models/<id>/recipe.json` as the source of a model.
3. Prefer the allowlisted declarative recipe format, rather than arbitrary JavaScript. Parametric geometry uses existing `window.JS3D` calls.
4. Generate native `project.json` with `node mcp/cli.mjs build models/<id>/recipe.json --export json --out models/<id>/project.json --check` and the real viewport image with `node mcp/cli.mjs shot models/<id>/project.json models/<id>/preview.png --width 1000`. Requires `npm ci`, `npm ci --prefix mcp`, `npm run build` and Playwright Chromium in the trusted builder.
5. Validate catalog, recipe and project before publishing. Fail on geometry errors or absent native files. Inspect a screenshot of any significant CAD changes.
6. Make a feature branch, open a PR, check GitHub Actions, then merge only after checks succeed. No direct editing of main. Never put GitHub tokens into the Pages browser.
7. Published Pages models are read-only source snapshots. Users may edit in the original editor and save locally. Publishing changes uses a new PR.
8. Retain AGPL-3.0-only notices and upstream attribution. Never replace the CAD kernel, build pipeline or original project storage just for this workflow.

See `skills/equilibrium-3d/SKILL.md` and `models/README.md`.
