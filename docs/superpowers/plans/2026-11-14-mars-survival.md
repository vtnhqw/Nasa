# Mars Survival Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement task-by-task.

**Goal:** Deliver a functional, scientifically traceable Mars exploration and survival MVP.
**Architecture:** Static React application with local NASA raster assets. Pure geospatial and deterministic simulation modules feed shared Zustand state and independent UI panels.
**Tech Stack:** React, TypeScript, Vite, Three/Fiber/Drei, Zustand, Recharts, Python.
**Spec:** docs/PROJECT_BRIEF.md

## Global Constraints
- Never substitute synthetic values for NASA observations.
- 120-sol maximum; modeled resources and finite energy budgets.
- Planetocentric east-positive coordinates, Mars radius 3389.5 km.
- Coarse MOLA cannot establish astronaut walkability.
- Prepare static deployment; user requested deployment instructions, not a hosting account publication.

## Review Focus
- Missing or corrupt assets must not leave stale scientific readings.
- Dateline crossing routes must follow the short great circle.
- Energy-limited production must not create free oxygen.
- Polar solar inputs and invalid configuration must remain finite.
- Globe/map pins and scientific sampling must share coordinates.

### Task 1: Geospatial engine
Files: src/lib/geo.ts, src/types/index.ts, tests/geo.test.ts.
Interfaces: normalizeLon, toVector/fromVector, distanceKm, geodesic, sampleGrid, slopeDegrees.
- [ ] Write tests for meridians, bounds, vectors, no-data, interpolation, distance, polar slopes.
- [ ] Run npm test; establish missing implementation failure.
- [ ] Implement pure functions and rerun suite.

### Task 2: Resource engine
Files: src/lib/simulation.ts, tests/simulation.test.ts.
Interface: simulate(config, location) returns immutable sol records and condition-driven events.
- [ ] Test resource conservation, power limits, deterministic results, failure, storm and 120-sol cap.
- [ ] Implement validated input model; verify npm test.

### Task 3: Scientific assets
Files: data_pipeline/, public/data/, public/textures/, DATA_SOURCES.md.
- [ ] Acquire and verify real imagery, MOLA labels and rasters, optional SWIM.
- [ ] Process with provenance and validation scripts. No invented data files.
- [ ] Confirm frontend binary dimensions and known site samples.

### Task 4: Application
Files: src/components/, src/app/, src/store/, tests/app.test.tsx.
- [ ] Build shell, globe/flat view, shared selection, raster panels, routes, simulation timeline, comparison and provenance.
- [ ] Test meaningful UI interactions and missing data state.
- [ ] Verify browser where available, responsive layout and errors.

### Task 5: Delivery
Files: README.md, MODEL_ASSUMPTIONS.md, SUBMISSION.md, PITCH_SCRIPT.md, deployment configuration.
- [ ] Document actual features and unavailable data.
- [ ] Run full tests, Python validation, TypeScript and production build.
- [ ] Independent review and fix material findings.
