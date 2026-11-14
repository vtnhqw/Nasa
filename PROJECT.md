# MARS SURVIVAL — project status

Updated 15 November 2026. Latest user decision: **finish the website first; defer further data research/integration to a later session.** Preserve existing assets. Do not spend more tokens finding datasets unless asked.

## Current website
- React/TypeScript static Vite application, dark mission-control layout and responsive CSS.
- Interactive Three.js Mars globe with selection and orbital controls; flat equirectangular map with zoom, real Jezero CTX patch, pins and geodesic routes.
- Verified Jezero rover-stop destinations, coordinate entry, mission objective, start/destination/optional waypoint.
- Route distance, regional MOLA profile and slope, configurable crew/load/speed/O2/energy/EVA/science-time/reserve assumptions.
- Calculated warnings, mission briefing, downloadable JSON briefing.
- Deterministic 120-sol habitat model, three kits, adjustable equipment, storm scenario, timeline and resource charts.
- Site comparison and provenance cards; honest missing-data displays.

## Assets already acquired (keep these)
NASA Viking color mosaic, MOLA MEGT90N000CB 4 ppd topography, Jezero CTX optical mosaic, rendered TES thermal-inertia overview, and selected NASA Perseverance rover waypoint coordinates. See DATA_SOURCES.md and public/data/manifest.json.

Do not describe TES as local temperature or a numeric thermal grid. Do not describe coarse MOLA as safe walking terrain. Do not make promises about missing ice, air temperature, radiation or surface panoramas.

## Next website work
1. Run `npm install` if needed, then `npm run dev`.
2. Browser visual/interaction QA on desktop and mobile is still required. Automated browser access was unavailable in this session; Chrome control was not approved. Component tests do not verify WebGL rendering or visual alignment.
3. Check globe texture/pin alignment, local CTX bounds, map selection, touch controls and mobile overflow in a real browser.
4. Optional polish: drag-pan for the flat map, route endpoint editing, persistent saved missions, surface image viewer after data verification.
5. Deployment: `npm run build`, publish `dist/` using Vercel/Netlify. No deployment account or public URL created.

## Deferred data work — only resume when requested
- Independently verify downloaded raster coordinate alignment at known landmarks and source permissions/attribution.
- High-resolution Jezero DEM and meaningful local slope/obstacle analysis.
- A regional numeric thermal/geology/spectral dataset; current TES is overview context only.
- SWIM ice mapping (origin was unavailable); preserve coverage/no-data if added.
- Location/time-qualified temperature and radiation reference observations.
- Verified, locally accessible surface photography; current NASA panorama retrieval returned HTTP 403.
- Official challenge year, page, eligibility, submission deadline and demo rules need independent confirmation. Requirements presently come from user-provided briefs.
- Broader pipeline regression checks and raw download reproducibility on another machine.

## Submission tasks
Fill team, repository, deployed URL and public demo fields in SUBMISSION.md. Follow the 30-second demo script or seven-slide outline in DEMO_30_SECONDS.md after browser QA. No operational safety claims.

## QA and publication follow-up
- Regression fixed: a manually changed route destination no longer inherits an unrelated science target in its briefing/export.
- Workflow steps now navigate to their named sections; briefing step opens the briefing. Hazard/briefing steps require a route.
- Seven-slide browser presentation added at `/demo.html`, with keyboard navigation, print support and a timed 30-second playback. This is a presentation of implemented features, not a recorded browser walkthrough.
- Browser QA/recording remain blocked: no connected browser surface; Google Chrome computer-use access was not approved on retry. Do not describe desktop/mobile visuals as verified.
- Sites project registered; exact identity is in `.openai/hosting.json`. Check deployment result before claiming publication.
