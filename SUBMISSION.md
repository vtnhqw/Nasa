# MARS SURVIVAL — submission draft

**Team:** [name and members]
**Challenge:** Interplanetary Survival Guide: Martian Map
**Event:** NASA Space Apps 2026, as specified in the supplied brief. Independently confirm the official challenge page and eligibility before submission.

## Summary
MARS SURVIVAL connects Mars exploration to science-driven excursion planning. Users choose a verified Perseverance rover location, inspect orbital imagery and regional elevation, then evaluate a preliminary Marswalk against configurable time, oxygen and battery constraints. A secondary deterministic habitat tool explores resource tradeoffs over 120 sols.

## Problem and solution
Planetary data can be difficult to translate into a comprehensible mission decision. This interface connects a scientific objective, location, route, evidence and uncertainty in one workflow. It explicitly distinguishes observations, derived products and engineering scenarios. The most important output can be a warning that the available data is inadequate.

## NASA data use
- Viking MDIM2.1 color imagery provides global context.
- MGS MOLA MEGDR topography is sampled for elevation, profiles and regional gradients.
- MRO CTX optical imagery provides local Jezero context.
- NASA/JPL Perseverance waypoint coordinates provide three verified science destinations.
- TES thermal-inertia rendered imagery adds regional environmental context. It is not used as a local temperature or safety measurement.
See DATA_SOURCES.md and public/data/manifest.json for products, processing, provenance and limitations.

## Architecture and impact
Static React/TypeScript application; Three.js globe, equirectangular flat map, shared Zustand state, Recharts plots, pure geospatial and deterministic simulation functions, Python data preparation. The downloadable briefing records the assumptions alongside results. The educational contribution is transparent decision support with uncertainty visible throughout.

## Limitations
Global MOLA is too coarse for local obstacle avoidance or certified walkability. Direct routes do not avoid hazards. TES is a rendered overview without numeric thermal lookup. Water ice, air temperature, radiation and surface photographs remain unavailable. Habitat kits and EVA constraints are illustrative. Browser visual QA and independent scientific review are still required. No claim of operational readiness or NASA endorsement.

## Project links
- GitHub repository: [add]
- Deployed website: [pending — OpenAI hosting cancelled by user]
- Seven-slide browser deck: public/demo.html (local; hosting and visual QA pending)
- Original NASA references: DATA_SOURCES.md

## AI/SI assistance disclosure
OpenAI Codex assisted with application code, unit/component tests, data preparation scripts, documentation and draft narration. The team must review scientific interpretations, source attribution, model limitations and submission claims. No AI-generated image or synthetic measurement is represented as NASA observational data.

## Before submitting
Confirm official deadline/time zone and demo constraints against the event portal; the supplied brief states November 15, 2026 at 11:59 PM in the Local Event time zone, but this has not been independently verified. Complete browser QA, publish a public project/demo URL, fill team details, and test access while signed out. All required text should be English.
