# Equilibrium JumpStart 3D: GitHub Pages

This fork keeps the original JumpStart 3D editor, geometry engine, workers, and WebAssembly CAD runtime.

`npm run build` writes the static website to `docs/`. The directory is intentionally gitignored. The Pages workflow builds it on each push to `main`, uploads the full site as a Pages artifact, and deploys it without committing generated files.

Expected address: https://equilibriumpress.github.io/jumpstart-3d/

Repository administrator setup, once: open **Settings → Pages → Build and deployment** and select **GitHub Actions** as the source. The GitHub Actions workflow needs Pages permissions from the repository settings. This administrative action is outside the build itself.

The initial acceptance check is: load the editor at the Pages address, create a box, save a native JSON project, and export a GLB. This verifies the browser-side engine and project export; there is no server-side render step.

Keep the upstream `src/` tree and the existing tests intact. Model assets and deep links are added in later PRs.
