# GitHub Pages without Actions

## Intended architecture

ChatGPT makes `models/<id>/project.json` and updates `models/library.json` in a GitHub PR. The existing JumpStart 3D browser editor loads native project JSON and renders geometry locally. GitHub Actions are **not** needed for each model.

## One-time hosting requirement

The CURRENT repository still has an Actions-based Pages deploy workflow at `.github/workflows/deploy-pages.yml`, and `/docs/` is gitignored. Consequently **a merge to main alone does not publish newly created models at the Pages site**.

To remove Actions fully:

1. Build the existing static JumpStart editor one time in a trusted local environment using the original `npm run build` (the CAD engine remains unchanged).
2. Commit the full static `docs/` output, including `models/library.json`, native project JSON and the browser workers/WASM, into a dedicated Pages publishing branch such as `gh-pages` (as branch root).
3. In Settings → Pages → Build and deployment, switch source to **Deploy from a branch**, choose `gh-pages` and root `/`. This one-time repository setting cannot be inferred from the Git tree.
4. For each later ChatGPT-created model, commit only the new/changed `models/**` files and catalog to `main` and then sync the same files to the Pages source branch. No app rebuild, CI, Actions or server-side rendering is needed per model.
5. Verify the live catalog and URL after the Pages source updates.

Until this static branch is created and configured, the model's files exist in GitHub but there is **no confirmed refreshed Pages deployment**. The Pages URL is a target, not proof of publication.

## Browser behavior

The current editor uses the safe same-origin `models/library.json` and `models/<id>/project.json` paths. It invokes `JS3D.load(project)` and renders in the browser. Keep the original application, workers, OpenCascade runtime, notices and licences.
