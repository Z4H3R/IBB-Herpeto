# Copilot instructions for IBB-Herpeto

Purpose
- Guide automated assistants (Copilot / AI agents) to make safe, consistent edits in this repository.

Build / Test / Lint
- No build system, test framework, or linter is present in this repo.
- Quick local preview: serve the repo root and open index.html in a browser:
  - Python: python -m http.server 8000
  - Node (if installed): npx http-server -p 8000

High-level architecture
- Single-page static web app (index.html) that bundles markup, styles, JavaScript and the entire dataset.
- Mapping: Leaflet is loaded from CDN; the application uses a global `data` JS variable containing a GeoJSON FeatureCollection.
- Data model: each feature.properties includes:
  - Cod_patrat: grid code (e.g., 1kmE5291N2471)
  - Regiune: region name
  - Species properties: species names as keys with values "YES" or "NO"
  - centroid_lon / centroid_lat: precomputed centroid coordinates
  - geometry: MultiPolygon coordinates
- UI: sidebar filters (regions, species), search box (by Cod_patrat), and map markers/polygons drawn from `data`.
- There is no backend or separate JS/CSS assets; all logic and data are inline in index.html.

Key conventions and rules for AI-assisted changes
- Do not rewrite or substantially reformat index.html in automated edits unless the change is limited, tested, and documented in the PR.
- Preserve exact property keys (species names, Cod_patrat, centroid_lon/lat). Downstream code depends on these strings.
- Species property values are uppercase "YES"/"NO". Keep that exact format when editing data or code that checks values.
- When adding or removing species, update all code references (UI lists, filter logic, popup builders) in the same PR.
- Large data edits: prefer editing a canonical GeoJSON/CSV source and regenerate the embedded `data` variable. Commit regenerated index.html with a short explanation of the data source and transformation.
- Avoid in-place minification/obfuscation. Keep whitespace and readable JS when possible to ease review.
- If adding tests or tooling, include commands in this file and update the README.

Files and AI-config integration
- No repository-level AI assistant config files detected to incorporate (CLAUDE.md, AGENTS.md, .cursorrules, etc.).
- If such files are added later, include their constraints and approval workflows in this document.

PR guidance for AI-generated changes
- Any automated change touching the embedded dataset must include:
  1) A short human-written description of the data source and why the change was made.
  2) A regenerated index.html (or a migration script) so reviewers can validate the transformation.
  3) A visual smoke-check: screenshots or a short video showing the app still loads and filters work.
- For UI or code changes, run the local preview and confirm no console errors before opening the PR.

Contact / follow-ups
- When unsure about changing dataset format or property names, fail-safe: do not make the change and request human review in the PR description.

---
Generated/updated by Copilot assistant.

MCP servers / Playwright
- Playwright is configured with a basic test and CI workflow in this repository.
- Local setup & common commands:
  - Install dependencies: npm ci
  - Start a local static server: npm start (serves at http://localhost:8000)
  - Run Playwright tests locally: npm test
- Structure:
  - playwright.config.ts: Playwright configuration; uses a webServer that serves the repo root on port 8000.
  - tests/playwright/: Playwright test files. Example: tests/playwright/example.spec.ts
  - package.json: scripts for start and test and devDependencies (playwright, http-server).
  - .github/workflows/playwright.yml: CI workflow that installs dependencies, Playwright browsers, and runs npm test.

If you'd like further adjustments (additional tests, headful runs, recording artifacts, or different ports), say which area to cover.