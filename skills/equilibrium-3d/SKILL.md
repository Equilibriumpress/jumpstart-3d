---
name: equilibrium-3d
description: Author editable native JumpStart 3D files with ChatGPT, store them in GitHub and open them in the existing Pages editor without requiring Actions.
---

# Equilibrium 3D: ChatGPT → GitHub → Pages

Read `AGENTS.md`, `BRIDGE.md` and the original JumpStart 3D agent skill first.

1. Determine documented dimensions, model scale, geometry and coordinate conventions. Distinguish measured and illustrative features.
2. Directly author `models/<id>/project.json` according to the supported native format in `BRIDGE.md`, including named bodies, matrices and supported node structures. Preserve separately editable components.
3. Optionally store a declarative `recipe.json` as the reproducible source, but Pages opens `project.json`, not the recipe.
4. Statistically verify JSON, references, unique body IDs, matrix elements, allowed primitives and critical dimensions. Use the genuine in-browser JumpStart view for visual geometry checks when available.
5. Publish the model by updating `models/library.json`. Set `preview:null` until an actual CAD screenshot exists, never make up a screenshot.
6. Commit the files on a feature branch, review the PR and merge after available checks. **Do not trigger or require GitHub Actions** for model creation.
7. The Pages deployment source must already contain the static JumpStart app. Update its `models/` files when the site is branch-published. A new PR on `main` alone does not update an old Actions-deployed Pages artifact.
8. Give the Pages URL only after verifying that the model has been published and opens. Do not claim live publication from a GitHub merge alone.

The native project is the editable handoff. GLB/STL/STEP exports happen in the original browser editor.
