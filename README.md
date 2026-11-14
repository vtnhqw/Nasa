# MARS SURVIVAL
**Explore. Navigate. Survive.**

An educational Marswalk mission-planning website for the user-provided NASA Space Apps challenge brief, “Interplanetary Survival Guide: Martian Map”. Globe exploration, a localized Jezero map and a deterministic habitat simulator share planetary coordinates. See [PROJECT.md](PROJECT.md) for progress, pending QA and deferred data work.

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
1. Explore the globe or unfold the flat map. Select coordinates with the map or keyboard-accessible coordinate fields.
2. Pick a verified Jezero rover stop. This fills a destination and selects the landing location as the default start.
3. Adjust route start, optional waypoint, destination and EVA assumptions.
4. Read the elevation profile, resource calculation and uncertainty warnings. Open/export the mission briefing.
5. Visit Habitat Survival to change kits, simulate a hypothetical storm and scrub the sol timeline.
6. Compare sites or inspect original data sources.

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

The application is deployment-ready as a static build but has not been published. Browser visual QA remains pending due to unavailable browser automation access.

## Team and credits
Team name: [add]. Members and roles: [add]. NASA/JPL/GSFC/USGS/ASU and instrument teams are credited in the manifest and source documentation. This is an independent project with no NASA endorsement. AI assistance is disclosed in [SUBMISSION.md](SUBMISSION.md).
