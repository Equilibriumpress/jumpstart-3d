# ChatGPT → GitHub → JumpStart 3D on GitHub Pages

## Operating model

ChatGPT authors the **native** `project.json` directly. GitHub versions that JSON and `models/library.json`. JumpStart 3D running in the visitor's browser loads the saved model. There is no required GitHub Actions job, Node build, cloud geometry generation or pre-rendered GLB for each model.

## Publish a model

1. Inspect `BRIDGE.md` and the native project format.
2. Create `models/<slug>/project.json` as a valid `{app:"jumpstart-3d",version:1,doc:{...}}` document, with named parts and native geometry nodes.
3. Optionally store `recipe.json`, metadata and reference documents alongside it.
4. Add a catalog entry in `models/library.json`. Use `preview:null` if no genuine viewport screenshot exists.
5. Check JSON syntax, catalog paths, IDs, dimensions and supported node types. When possible, open the JSON in the actual JumpStart 3D browser editor and inspect geometry.
6. Commit to a feature branch, open a PR and merge after review. **Never treat GitHub Actions as part of this workflow.**
7. Copy the changed `models/` files to the active **static Pages source** branch or directory, if distinct from the source branch. The Pages editor is a static application.
8. Verify the model at `https://equilibriumpress.github.io/jumpstart-3d/?project=<slug>`. Do not claim the model has deployed until the Pages source is updated.

## Existing code

`src/equilibrium-loader.js` is already able to fetch a catalog and a native project and pass the object to `JS3D.load()`. The original application performs geometry processing in the browser.

The repository's old Pages workflow currently rebuilds `docs/` with GitHub Actions, and `docs/` is gitignored. See `docs-equilibrium/PAGES.md` for the required one-time static publishing migration. The model creation process must not depend on that workflow.

The original CAD engine, public source licensing and local browser editing behavior are unchanged.
