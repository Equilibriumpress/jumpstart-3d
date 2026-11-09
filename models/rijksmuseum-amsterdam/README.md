# Rijksmuseum Amsterdam - editable 3D architectural study

This is an original, stylized three-dimensional study of the Rijksmuseum in Amsterdam, inspired by the public building described by the Rijksmuseum.

The 19th-century building by Pierre Cuypers combines brick, contrasting natural-stone bands, twin towers, pitched slate roofs, a central through-passage, long side galleries and two glazed courtyards. The model makes these architectural features legible as separate native JumpStart CAD solids.

This is **not** a measured reconstruction and is **not** suitable for fabrication, structural work or architectural surveying. The proportions are approximate and the detail is selectively simplified.

## Native editable parts

- Twin entrance and rear towers with pyramidal spires, cornices, glazing and finials
- Main entrance with a traversable central ground-level passage and an arch of individual voussoirs
- Brick galleries around two glazed courtyards
- Pitched slate roofs, side dormers, window bays, masonry bands and corner pavilions
- Low presentation plinth and a continuous passage route

All components are individually named and editable using the original JumpStart 3D editor. Colors are simple procedural materials, with no photos, copyrighted textures or third-party meshes.

## Reproduction

Source recipe: `recipe.json`, using allowlisted `window.JS3D` bridge calls.

Canonical editable deliverable: `project.json`, generated through `node scripts/build-models.mjs --id=rijksmuseum-amsterdam` in a trusted Chromium-based environment. The action also generates `preview.png`. Printable checks are intentionally disabled for this multi-component architectural display, while every generated solid must build without CAD errors.

## References

- [Rijksmuseum, the building](https://www.rijksmuseum.nl/en/visit/inside-the-museum/the-building)
- [Wikimedia Commons: exterior architectural references](https://commons.wikimedia.org/wiki/Category:Rijksmuseum_Amsterdam_-_Main_Building)

Author: Equilibrium Press, 2026. Original procedural geometry.
