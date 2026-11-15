## Latest UI cleanup — 2026-11-15

- Clear first-click instruction and “Your location” labels on both maps.
- Updated estimates are announced and linked from beneath the map, including on mobile.
- Results answer How long? / Why this long? / What could help? in three distinct cards.
- Before/after comparisons show durations, coordinates and the changed assumption; longitude-only changes explicitly explain unchanged survival. The 120-sol upper window remains labeled “at least”.
- Removed retired walk planner, guided-walk and standalone comparison/science panels, route simulation, route state and overlays, unused geometry helpers/types, unused POI fetch, and 337 unused CSS rules. Scientific assets remain available for future data work.
- Local changes only; no deployment. Browser visual QA remains unavailable in this session. Component tests and production build provide functional checks.

# MARS SURVIVAL — current product direction

## Latest user correction: survival from any Mars location
The user explicitly rejected the walk-planning emphasis. The primary experience must be:
1. Click any location on Mars.
2. See how long an astronaut with the chosen shelter/resources can survive in the model.
3. Explain the first resource or power constraint.
4. Compare alternative locations and explain whether their modeled duration improves.

No automatic walking route, rover-destination wizard or primary “Start planning a walk” action. Keep navigation visible and simple, including on mobile.

## Implemented now
- Survival map is the home screen. A result appears after a map selection or coordinate submission.
- One astronaut by default, with configurable equipment, season, dust and resources.
- Completed sols and first failed sol are distinguished; 120 sols is a simulation horizon, not maximum lifespan.
- Cause explanation, power balance and end reserves update with the selected point.
- Alternative starting sites at ±1°, ±5°, ±15°, ±30° latitude are compared with identical starting resources. Only strictly better modeled durations receive a preview action.
- Navigation has visible Survival map and Data & limitations buttons. Settings and selected pin persist across these tabs.
- Existing detailed timeline is available below the main result using the same settings.
- 33 unit/component tests passed. Production build passed; browser visual verification remains pending.

## Scientific limits that must remain explicit
The current location-dependent variable is solar geometry from latitude and a fixed chosen season. Longitude does not affect survival. Elevation is contextual and is not used to fabricate temperature or radiation effects. Local temperature, extractable ice and radiation data are not integrated. Heating remains an input, no ice extraction occurs, and no radiation dose is modeled.

The alternative-site comparison does not include travel time, travel supplies, terrain obstacles or moving the habitat. It compares static initial conditions, not a real survival-preserving relocation plan. Sites may be hundreds to thousands of kilometers away. Do not label them safe or tell users to move there operationally. More rigorous travel-aware relocation is future work.

## Hosting preference
LOCAL ONLY. The user cancelled OpenAI hosting. Do not publish or recreate a Sites deployment without a new explicit request. The old online copy was not deleted because the connector offers no delete/unpublish operation. See docs/RETIRED_HOSTING.md.

## Deferred work
Browser QA, local temperature/ice/radiation observations, high-resolution terrain, travel-aware relocation, and independent model/scientific review. Further dataset research remains deferred by the user.

## Historical notes — superseded where they conflict with the direction above

# LOCAL-ONLY — USER HOSTING PREFERENCE

OpenAI hosting was cancelled by the user. Do not publish or recreate a Sites deployment. Local configuration removed; the existing remote copy has NOT been deleted because the connector lacks a deletion tool. See docs/RETIRED_HOSTING.md.

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

## Deployment result
- Version 1 deployed successfully: https://mars-survival-mission-control.jauntypond131.chatgpt.site
- Seven-slide demo: https://mars-survival-mission-control.jauntypond131.chatgpt.site/demo.html
- Access: owner-only. Automatic approval review rejected changing access to public without explicit public-sharing authorization. Do not retry based only on “continue.”
- Verification: 24 unit/component tests pass; TypeScript and production build pass. Three.js bundle still emits a size warning.
- Pending: desktop/mobile visual QA and browser walkthrough recording (Chrome computer use not approved). Public demo access requires explicit user approval.

## UX repair pass
- Explore and Mission Builder now have distinct purposes. Explore offers a starter mission; Mission Builder uses a three-step flow and destination selector.
- Readable controls, larger touch targets, keyboard navigation, clearer map layers and a responsive two-column workspace replace the dense three-panel opening screen.
- Route picking scrolls to the map and can be cancelled. The flat map supports pointer drag-pan and arrow-key panning; rotation is disabled in flat mode.
- Fractional crew input cannot crash calculations; empty/invalid number drafts show validation and restore the last valid value on blur.
- Custom habitat edits are labeled as custom. Zero-distance routes warn that another destination is needed.
- Regression coverage includes starter mission, reset, briefing, tab navigation, fractional crew and clearing inputs.
- Visual verification is still pending because browser control was previously denied. No claim of complete operational readiness; unavailable datasets remain deferred.

## Beginner interface update
- Home has one primary action: Start planning a walk.
- Planning is a real three-screen flow: choose a destination, check supplies, calculate/read results.
- No preset destination or automatically drawn route on entry.
- Four main supply fields; advanced assumptions hidden until requested.
- Plain-language results distinguish time/oxygen/battery sufficiency from unknown terrain safety.
- Readable .txt download; maps and technical charts are optional expandable sections.
- Local-only change. No deployment to the retired OpenAI host. 28 tests and TypeScript/production build pass; browser visual QA remains pending.

## GitHub Pages deployment — 2026-11-15

The user now explicitly requests GitHub Pages publication, superseding the local-only preference for this deployment. OpenAI hosting remains retired. Added an Actions deployment workflow and base-aware image/data loading for the `/Nasa/` repository path. Local validation: 26 tests pass and the Pages production build succeeds. Publication status is reported separately after checking GitHub.
