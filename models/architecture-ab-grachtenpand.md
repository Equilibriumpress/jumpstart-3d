# A/B CAD-realism experiment: Amsterdam canal house

A: `models/test-grachtenpand` (59 individual bodies, original unmodified design). B: `models/test-grachtenpand-realistisch` (separate new model).

B contains 8 **Boolean-subtracted masonry window openings**, an entrance recess, glazing set behind the original front plane, deep stone reveals, stepped Dutch gable, chimney and quoins. Original JS3D `texture()` adds slate and bricks height-maps, without a new renderer.

The CAD pipeline builds native editable JSON, real 1000px viewport PNGs, and GLB exports. Compare `models/grachtenpand-ab-compare.png` after CI generation. Images use the standard original JumpStart screenshot camera and auto-fit; framing might differ slightly. These are **real viewport screenshots**, not the separate photorealistic Render utility. Models are unpublished pending visual review. Evaluate geometry, textured roof, masonry depths, and performance before merging.
