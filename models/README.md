# GitHub model library

The `models/` tree is the durable repository of editable native JumpStart 3D files. `library.json` is the sole source of catalog entries and deep-link slugs.

Each `models/<id>/` directory contains:
- `recipe.json`: supported declarative JumpStart bridge calls; preserve when adding model variants.
- `project.json`: editable native project envelope (`{app:"jumpstart-3d",version:1,doc:…}`); opened with `await JS3D.load(data)`.
- `metadata.json`: project authorship and provenance.
- `preview.png` when generated: an actual CAD viewport screenshot, not an invented illustration.

Use hyphenated lowercase IDs. Never publish secrets, unlicensed assets, or scripts in a public model. `recipe.json` is model data, not browser-executed JavaScript. Only allowlisted CLI bridge calls are permitted.

The application continues saving local edits into IndexedDB; a GitHub project is a published version. Export a project JSON and submit a PR to publish changes.
