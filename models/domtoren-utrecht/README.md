# Domtoren Utrecht — native editable architecture study, 1:500

This is the native JumpStart 3D project authored by ChatGPT as `project.json`. GitHub stores the file and the existing JumpStart 3D Pages editor will display it once its static Pages model source has been updated. **No GitHub Actions or pre-rendered geometry are required for the model file.**

The model uses the City of Utrecht's published total height of 112.32 metres (224.64 mm at 1:500). It is an illustrative architectural massing reconstruction, not a measured survey. See `sources.md` and `dimensions.json`.

## What is modeled

- One genuinely cut-through, pointed-roof passage in the first square level
- Lower buttresses, bands and illustrative lancet recess silhouettes
- Second square level with four genuinely cut-in facade recesses
- Square-to-octagon transition
- Eight separate open-lantern pillars, capital bands, crown, pinnacles
- Eight-sided spire, finial and vane at the intended total model height

The parts remain native, named and editable. `recipe.json` is retained as a model-generation record; `project.json` is the actual runtime file.

## Verification status

Structural validation: completed for native envelope, ID uniqueness, body matrices, named geometry, octagonal-pier count, group cut structure and tip height. **In-app CAD rendering, boolean evaluation and printability are not yet verified**. A genuine CAD screenshot and GLB are not included. The library uses a placeholder until one is generated from the original editor.

## Remaining work

Detailed elevation tracing, exact facades, proper curved tracery and constructive profile work belong to PR 3. GLB and screenshots can be exported using the native app after a live browser load. The static Pages publication branch still needs to be configured or updated according to `docs-equilibrium/PAGES.md`.
