# A/B CAD-realism experiment: Amsterdam canal house

A: `models/test-grachtenpand` (59 individual bodies, original unmodified design). B: `models/test-grachtenpand-realistisch` (separate new model).

B contains 8 **Boolean-subtracted masonry window openings**, an entrance recess, glazing set behind the original front plane, deep stone reveals, stepped Dutch gable, chimney and quoins. Original JS3D `texture()` adds slate and bricks height-maps, without a new renderer.

The CAD pipeline builds native editable JSON, real 1000px viewport PNGs, and GLB exports. Compare `models/grachtenpand-ab-compare.png` after CI generation. Images use the standard original JumpStart screenshot camera and auto-fit; framing might differ slightly. These are **real viewport screenshots**, not the separate photorealistic Render utility. Models are unpublished pending visual review. Evaluate geometry, textured roof, masonry depths, and performance before merging.


## Confirmed generated results

The native CAD builder, original photo-style Render UI and GLB exporter completed successfully in GitHub Actions.
- A: 59 editable native bodies, original unmodified model.
- B: 156 editable native bodies, with a genuine group of Boolean openings.
- B has a native `bricks` mesh texture on the façade and a native `slate` mesh texture on the roof.
- Photo renders: `models/grachtenpand-ab-render-A.png` and `models/grachtenpand-ab-render-B.png`, rendered by the original Advanced → Simulate → Render tool.
- Comparison image: `models/grachtenpand-ab-vergelijking.png`, combining both original output PNGs.
- Source previews: `models/test-grachtenpand/preview.png` and `models/test-grachtenpand-realistisch/preview.png`.
- Enhanced editable model: `models/test-grachtenpand-realistisch/project.json`, with export `model.glb`.

The models are illustrative, not photogrammetry or measured architecture. The two renderings use identical settings (Low, sun, daylight, 4:3) and a camera fitted to each object. Review the image before treating it as a visually superior design. No merge or public publication is part of this experiment.
