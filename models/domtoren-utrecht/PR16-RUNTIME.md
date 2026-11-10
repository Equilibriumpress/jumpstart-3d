# PR 16 — Live CAD-test en echte preview

De oorspronkelijke PR 15 valideerde alleen native JSON. Deze aanvullende publicatie sluit de browsercontrole af.

- Site: https://equilibriumpress.github.io/jumpstart-3d/?project=domtoren-utrecht
- Browser: Chromium met software-WebGL, service worker uitgeschakeld tijdens de test
- Opbouw: 715/715 native CAD-bodies kregen een bounding box
- Geometriefouten gemeld door JS3D: 0
- Native screenshot: `await JS3D.screenshotDataURL({fit:true,width:750})`
- Bestand: `models/domtoren-utrecht/preview.png` (292531 bytes)
- De bibliotheek toont voortaan deze echte screenshot. De oorspronkelijke `schematic.svg` blijft optioneel.

De controle bevestigt het technisch laden van geometrie, geen fotorealistische nauwkeurigheid. Er is geen mesh-/3MF-/GLB-eindtest en geen driedelige fotogrammetrische gevelvergelijking uitgevoerd. Na merge synchroniseren we gewijzigde bestanden direct met `gh-pages`; geen Actions.
