# Domtoren Utrecht — geometry contract

## Sources and scale

- Published total: 112.32 m = 224.64 mm at 1:500.
- First square: 0–77.20 mm; external width approximately 38.60 mm.
- Second square: 77.20–136.16 mm; external width approximately 32.68 mm.
- Octagonal transition to ~138 mm; lantern to approximately 190 mm. Historical tiers and transition figures are not entirely consistent, so these are **approximate**.
- Spire tip 213.50 mm; finial/vane 224.64 mm.
- Passage width ~8.26 mm, provisional apex 20.50 mm.
- Real geometry holes, not just painted shapes, for the principal gateway and upper facade openings. Separate 8 open lantern piers.

## PR 2: native model published as data

- ChatGPT directly authors `project.json` in the format defined by `BRIDGE.md`.
- `recipe.json` is retained as an auditable optional source.
- Named editable objects and boolean cut groups survive in native JSON.
- Confirm all IDs and transformations, dimensional scale, catalog paths and project schema before merge.
- Real screenshot is optional; `preview:null` instructs the library to show a placeholder. Never pass an illustration off as a viewport capture.
- A live Pages runtime/geometry verification is a separate check. No GitHub Actions requirement.

## PR 3 scope

Replace approximate tracery, lancets, clock locations and ornament profiles using elevation drawings. Test in the actual browser CAD engine and capture genuine screenshots. Full-print manifold quality and photorealistic materials are separate tasks.
