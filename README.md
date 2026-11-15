# MARS SURVIVAL
**Explore. Navigate. Survive.**

An educational Mars location and survival-model website for the user-provided NASA Space Apps challenge brief, “Interplanetary Survival Guide: Martian Map”. Globe exploration, a localized Jezero map and a deterministic habitat simulator share planetary coordinates. See [PROJECT.md](PROJECT.md) for progress, pending QA and deferred data work.

## Run
Requires Node.js 20.19+ or 22.12+ (developed with Node 24).

```sh
npm install
npm run dev
```
Open the printed localhost URL. To check and build:

```sh
npm test
npm run typecheck
npm run build
npm run preview
```

## Use
1. Open the local website and click any point on the Mars globe or flat map. Coordinate entry is also available.
2. Read the survival estimate, why it ends, and whether another tested location lasts longer with the same setup.
3. Change equipment, astronaut count, season or supplies to see the effect. The model assumes a pressurized shelter.
4. If a better tested starting site exists, preview it. The comparison excludes travel costs and does not establish that relocation is possible or safe.
5. Expand the day-by-day view to inspect resources over time. Use Data & limitations to inspect sources.

The current app centers survival from arbitrary coordinates. Older walk-planning components remain in source for reference but are not the main user flow.

## Architecture
React 19, TypeScript, Vite, React Three Fiber/Three/Drei, Zustand, Recharts and Lucide. CSS handles the responsive interface without a backend. `src/lib/geo.ts`, `route.ts` and `simulation.ts` are pure calculation modules; `src/components` contains the interface. Scientific assets ship under `public/` for static hosting. Google Fonts are optional; system fonts are fallbacks.

## Data and limitations
See [DATA_SOURCES.md](DATA_SOURCES.md), [MODEL_ASSUMPTIONS.md](MODEL_ASSUMPTIONS.md), the in-app Data Sources tab, and [data_pipeline/README.md](data_pipeline/README.md). Existing data assets are included; downloading again is unnecessary to run the website. Further scientific integration is deferred at the user's request.

MOLA is a global 0.25° overview. Its derived route profile cannot resolve local rocks, cliffs or walkability. CTX imagery improves visual context but is not a high-resolution DEM. TES imagery is a rendered thermal-inertia overview, not air temperature. No real-time weather, extractable-ice estimate or radiation dose is supplied. Habitat kits and EVA assumptions are illustrative, not NASA hardware specifications.

This tool is a research-inspired educational prototype using NASA data and simplified mission-planning models. It is not certified for operational spaceflight navigation or astronaut safety decisions.

## Deployment
A production build produces `dist/`; no server, credentials or runtime environment variables are required.
- Vercel: import the repository, choose Vite, build command `npm run build`, output `dist`.
- Netlify: build command `npm run build`, publish directory `dist` (configuration included).
- Other static hosts: upload the contents of `dist/` and serve at the domain root.

The project is now local-only at the user’s request. Run `npm run dev` and use the printed localhost URL. The local demo is at `/demo.html`. The former remote copy still requires deletion through the hosting service; local configuration has been removed. Browser visual QA remains pending due to unavailable browser automation access.

## Team and credits
Team name: [add]. Members and roles: [add]. NASA/JPL/GSFC/USGS/ASU and instrument teams are credited in the manifest and source documentation. This is an independent project with no NASA endorsement. AI assistance is disclosed in [SUBMISSION.md](SUBMISSION.md).

## GitHub Pages

The `.github/workflows/pages.yml` workflow tests, builds and publishes on pushes to `main`.
Target address: https://vtnhqw.github.io/Nasa/
Repository Settings → Pages → Source must be **GitHub Actions** if automatic enablement is unavailable.
Public imagery and data are resolved using Vite's deployment base, including paths inside dataset metadata.

To check the same build locally:

```sh
npm run build -- --base /Nasa/
npm run preview -- --base /Nasa/
```

## Contributing

Issues and pull requests are welcome. Please run `npm test` and `npm run build` before opening a pull request.
