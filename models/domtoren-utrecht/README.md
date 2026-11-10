# Domtoren Utrecht — 1:500 editable architecture study

Model height: **224.64 mm** based on the City of Utrecht's published full height of **112.32 m**. Vertical segment and outside width sources are documented in [sources.md](sources.md) and [dimensions.json](dimensions.json). The model is an architectural massing study, **not** a measured or construction-grade reconstruction.

## PR 2 content

- Lower square with a *true three-dimensional, continuous pointed passage* cut through the base (roof-shaped triangular crown is deliberately provisional).
- Representative lower corner buttresses, bands and pointed facade recess silhouettes.
- Upper square with four physical deep recesses, corner shafts and illustrative clock faces.
- Square-to-octagon transition, eight *distinct* open lantern supports, crown platform and finials.
- Eight-sided pyramidal spire and vane to 224.64 mm at 1:500.

The native JSON is the canonical editable model. The GLB is a visual export, not a substitute for the CAD source. The source recipe uses only allowlisted bridge calls. All modeled elements retain separate names where geometry permits. The two boolean groups remain editable and can be ungrouped to revise passage/recess profiles.

## Verification

Run `npm ci`, `npm ci --prefix mcp`, `npm run build`, `npx playwright install chromium`, then `node scripts/build-models.mjs --id=domtoren-utrecht`, `node scripts/validate-models.mjs`, and `node mcp/cli.mjs export models/domtoren-utrecht/project.json models/domtoren-utrecht/model.glb --app docs`.

Review the actual viewport image `preview.png` at three angles before progressing to PR 3. The 3D model emphasizes architectural openings rather than photograph textures.

## Limits

The pier positions, octagonal detailing, wall depth, clock locations, lancets and decorative elements still need tracing from plans and elevations. Not asserted as precise. Not designed for standalone FDM printing without a subsequent manifold/support assessment.
