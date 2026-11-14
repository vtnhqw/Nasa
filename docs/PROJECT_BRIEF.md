# CODEX MASTER PROMPT — NASA SPACE APPS CHALLENGE 2026

## PROJECT: MARS SURVIVAL
### An Interactive NASA Data-Powered Marswalk Planner and Habitat Survival Simulator

You are a senior full-stack engineer, geospatial data scientist, planetary scientist, scientific software engineer, and award-winning UI/UX designer.

Your task is to **BUILD A COMPLETE, FUNCTIONAL, DEPLOYABLE WEB APPLICATION**, not just create a plan, documentation, or mockup.

This application is being developed for the **NASA International Space Apps Challenge 2026**, under the official challenge:

**Interplanetary Survival Guide: Martian Map**

The application must help users explore real Mars geography, assess environmental hazards, plan astronaut exploration routes, and simulate how an astronaut habitat could survive for 120 Martian solar days (sols).

The project must prioritize:

1. Real NASA scientific data
2. Scientific honesty and traceability
3. Visually impressive interactive 3D Mars
4. Functional exploration and mission-planning tools
5. Responsive, professional UI/UX
6. Meaningful interaction between scientific data and simulation
7. Reliable deployment
8. Clear documentation of sources and assumptions

This is a time-limited hackathon project. Build the strongest functional MVP first, then implement advanced features.

---

# 1. MANDATORY WORKING INSTRUCTIONS

You are operating as an autonomous coding agent inside the project repository.

Do not stop after producing a development plan.

You must:

- Inspect the existing repository before making changes.
- Determine whether a project already exists.
- Preserve useful existing code.
- Create the application if the repository is empty.
- Install required dependencies when permitted.
- Implement actual working features.
- Download authentic NASA datasets when network access is available.
- Write data-processing scripts.
- Run appropriate tests.
- Fix errors.
- Run a production build.
- Document incomplete features accurately.
- Prepare the project for deployment.

Do not ask unnecessary clarification questions.

Make reasonable technical decisions independently and document them.

When external network access is unavailable:

1. Check whether required datasets are already stored locally.
2. Attempt access through documented alternative NASA endpoints.
3. Implement reusable data-import and processing scripts.
4. Create clear dataset download instructions.
5. Implement an explicit **Data Unavailable** state for missing scientific data.
6. Never invent NASA measurements or present fake data as real.
7. Continue building functional parts of the application.

**Critical rule:** Never silently substitute mock data for NASA measurements.

Synthetic values are allowed only for clearly labeled UI development or simulation demonstrations, and must never be represented as observational NASA data.

---

# 2. PRODUCT VISION

Build a premium-looking interactive Mars mission planning application.

The user should be able to:

1. View a rotating 3D Mars globe.
2. Rotate, zoom, and inspect the planet.
3. Switch between globe and flat-map views.
4. Select a landing or habitat location.
5. Read actual NASA geographical information about that location.
6. View different scientific data layers.
7. Plan a route for an astronaut Marswalk.
8. Understand terrain and environmental hazards.
9. Choose a habitat survival equipment kit.
10. Simulate resource consumption over 120 sols.
11. Identify causes of mission failure.
12. Compare different landing and habitat locations.
13. Inspect the NASA sources behind the displayed information.

The application should answer two questions:

**Where can astronauts safely explore on Mars?**

**What equipment and resources would be needed to survive there?**

The end product should feel like a futuristic NASA mission control interface, with polished animations, readable scientific information, and meaningful interactions.

---

# 3. TECHNOLOGY STACK

Preferred stack:

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Three Fiber
- Three.js
- Drei
- Zustand for application state
- Recharts for scientific charts
- Lucide React for icons
- Framer Motion or Motion for transitions

### Flat-map system

Use Leaflet or another suitable mapping library that supports planetary coordinate handling.

Do not assume Earth-based Web Mercator tiles and coordinate systems work correctly for Mars.

### Data processing

- Python 3
- NumPy
- Rasterio
- GDAL where appropriate
- xarray where useful
- Scientific raster and geospatial processing tools

### Testing

- Vitest for unit tests
- React Testing Library where useful
- Playwright for browser interaction tests if feasible

### Deployment

- Vercel
- Netlify
- Or equivalent static hosting

Avoid adding a backend unless technically necessary.

The application should ideally operate as a static deployment with locally processed scientific datasets.

---

# 4. DATA INTEGRITY ARCHITECTURE

This is one of the most important requirements.

Every displayed scientific measurement must belong to one of three categories.

### Category A — NASA OBSERVED

A value directly obtained from NASA scientific data.

Examples:

- MOLA elevation
- Orbital imagery
- Instrument-recorded temperature
- Rover radiation measurements

### Category B — DERIVED

A value calculated from observations.

Examples:

- Terrain slope
- Estimated travel difficulty
- Route elevation gain
- Solar energy estimate
- Terrain hazard score

### Category C — SIMULATED

A value produced by an engineering model or a user-configurable assumption.

Examples:

- Oxygen consumption
- Habitat power requirements
- Water usage
- Equipment reliability
- Survival duration

These categories must be clearly distinguishable throughout the UI.

Each scientific layer should include metadata:

```ts
type DataCategory = "observed" | "derived" | "simulated";

type ScientificMetadata = {
  sourceName: string;
  agency: string;
  mission?: string;
  instrument?: string;
  productName?: string;
  sourceUrl: string;
  downloadUrl?: string;
  observationPeriod?: string;
  resolution?: string;
  units: string;
  category: DataCategory;
  processingMethod?: string;
  limitations?: string[];
  licenseOrUsageTerms?: string;
};
```

Provide a **Data Provenance** panel where users can inspect these details.

If data is missing, display:

"NASA DATA UNAVAILABLE FOR THIS LOCATION"

Do not display a made-up value.

Never present an estimated or simulated value as directly measured NASA data.

---

# 5. REAL NASA DATA SOURCES

Use authentic scientific data.

Prefer the resources linked by the official 2026 challenge statement. Verify that the selected NASA sources satisfy the challenge's eligibility requirements.

## Dataset A — Mars Global Imagery

Primary source:

NASA Mars Trek

https://trek.nasa.gov/

Mars Trek mapping API documentation:

https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=mars

Requirements:

- Retrieve publicly available Mars imagery.
- Identify an appropriate global raster or image layer.
- Use it as the globe texture.
- Reuse consistent map imagery in the flat-map interface.
- Preserve image attribution.
- Record the product and layer name.
- Respect any service usage limits.

If directly using WMTS tiles on the globe is unnecessarily complex, generate a legal local texture from a suitable source product.

The final deployed app should not rely entirely on external map services.

## Dataset B — Mars Elevation

Primary source:

NASA Mars Global Surveyor

Mars Orbiter Laser Altimeter (MOLA)

Archive:

https://pds-geosciences.wustl.edu/missions/mgs/megdr.html

Requirements:

1. Download a scientifically appropriate elevation product.
2. Inspect the file format and coordinate conventions.
3. Convert it to a convenient analysis format.
4. Sample geographical locations correctly.
5. Store elevation in meters.
6. Preserve the documented elevation reference datum.
7. Support elevation lookup by latitude and longitude.
8. Calculate terrain slopes.
9. Support basic route elevation profiles.

Important:

- MOLA elevation is actual NASA data.
- Slope is derived from MOLA and must be labeled derived.
- Do not confuse planetary longitude conventions.
- Mars uses different geodetic assumptions from Earth.
- Use appropriate Mars radius and distance calculations.
- Check whether elevation grids use planetocentric or planetographic latitude.
- Verify whether the source uses east-positive or west-positive longitude.
- Do not calculate slope using raw degrees as if they were meters.

Create a Python processing script such as:

`data_pipeline/process_mola.py`

Generate compact assets that the frontend can consume.

## Dataset C — Water Ice

Relevant missions and projects:

- Mars Odyssey
- SHARAD aboard Mars Reconnaissance Orbiter
- NASA-supported Subsurface Water Ice Mapping (SWIM)

Resource:

https://swim.psi.edu/SWIM4MIMProducts.php

Requirements:

- Retrieve actual georeferenced water ice mapping products if available.
- Document which product and version were used.
- Preserve geographic coverage and no-data masks.
- Display evidence or likelihood of subsurface ice where supported.
- Clearly distinguish ice detection from estimated accessibility.
- Never claim that ice is immediately extractable.
- Never assume all Mars coordinates have water ice observations.

If precise depth or distance-to-ice cannot be obtained reliably, omit those numerical claims.

Use the following fallback wording:

"Subsurface ice evidence available; extractability not established."

Implement this as a real scientific map layer when possible.

## Dataset D — Temperature

Potential NASA sources:

- Mars Global Surveyor Thermal Emission Spectrometer
- Mars Reconnaissance Orbiter Mars Climate Sounder
- Curiosity Rover Environmental Monitoring Station

Requirements:

- Use downloaded observational datasets, where practical.
- Preserve geographical and temporal coverage.
- Distinguish ground, near-surface air, and atmospheric-profile temperature measurements.
- Do not treat rover measurements as global observations.
- Do not interpolate across all Mars locations without documenting the method.
- Include units and observation periods.

If a valid global temperature grid cannot be processed in the available time, use a clearly labeled reference dataset for specific sites or exclude numerical global temperature estimates from the MVP.

## Dataset E — Radiation

Primary scientific reference:

Curiosity Rover Radiation Assessment Detector (RAD)

Requirements:

- Find and cite authentic NASA or PDS RAD results.
- Use a published surface radiation reference where applicable.
- Do not claim RAD measured radiation at every Mars location.
- Do not automatically modify radiation by altitude without a defensible model.
- Mark extrapolated or modeled values as estimates.
- Explicitly communicate limitations.

Surface radiation is not a simple function of elevation alone.

## Dataset F — Dust and Weather

Potential sources:

- NASA Mars orbiter dust observations
- TES dust opacity records
- MRO atmospheric observations

Requirements:

- Use historical observations where available.
- Do not manufacture real-time dust forecasts.
- Clearly distinguish seasonal climatology from current conditions.
- Provide hypothetical storm scenarios as user-controlled simulation events.

## Dataset G — Real Mars Sites

Include verified coordinates for a small set of significant Mars landing sites, such as:

- Jezero Crater / Perseverance
- Gale Crater / Curiosity
- Utopia Planitia / Viking 2
- Elysium Planitia / InSight

Verify all coordinates from official mission sources.

Do not invent coordinates.

---

# 6. DATA PROCESSING PIPELINE

Create a reproducible Python pipeline.

Suggested structure:

```text
data_pipeline/
  README.md
  requirements.txt
  download_data.py
  process_mola.py
  process_ice.py
  process_temperature.py
  generate_manifest.py
  validate_data.py
```

Expected output:

```text
public/
  data/
    manifest.json
    mola/
    ice/
    temperature/
    landing-sites.json
  textures/
    mars-globe.webp
```

Only generate files for data actually obtained.

The manifest must report which datasets are installed, their source URLs, versions, processing history, and limitations.

### Geospatial requirements

Use a resolution appropriate for a lightweight web application.

A coarse grid of approximately 2° spacing may be acceptable for global overview visualization.

However, **2° resolution is much too coarse for local Marswalk hazard analysis**.

Therefore:

- Use coarse global grids for overview.
- Use higher-resolution regional MOLA data for detailed site analysis when available.
- Otherwise provide route-scale warnings that the data is too coarse to establish walkability.

Do not invent meter-scale terrain precision from kilometer-scale data.

Implement:

- Coordinate normalization
- Longitude wrapping
- Latitude bounds
- No-data handling
- Grid interpolation where scientifically appropriate
- Metadata reporting
- Grid unit tests

Use compact storage so the web app loads quickly.

If data is large, divide it into regional assets or tiles.

Do not commit massive uncompressed raw NASA datasets to Git.

---

# 7. CORE FEATURE — INTERACTIVE 3D MARS

Build a visually impressive 3D Mars globe.

Requirements:

- Accurate spherical geometry
- Real Mars texture
- Smooth rotation
- Drag-to-rotate interaction
- Zoom controls
- Optional gentle auto-rotation
- Location selection
- Accurate raycast-to-latitude/longitude conversion
- Visible landing-site markers
- Selected-location pin
- Hover feedback
- Appropriate lighting
- Subtle atmospheric visual effect if scientifically presented as artistic styling

Provide smooth performance on ordinary laptops.

Support touch interaction when practical.

Display coordinates and location information.

The user should be able to click any location on Mars and select it as a candidate mission site.

When the user selects a location:

1. Update the shared application state.
2. Display coordinates.
3. Query available scientific grids.
4. Update elevation and ice information.
5. Update mission-planning and simulation inputs.
6. Display missing-data warnings where applicable.

Never allow the UI to silently display stale measurements from a previous location.

---

# 8. CORE FEATURE — GLOBE TO FLAT MAP

Implement a transition between globe and flat-map views.

Preferred behavior:

- User clicks "Unfold Mars".
- Globe rotates into a recognizable view.
- Transition reveals a flat Mars map.
- Selected coordinates persist.
- Selected pins remain aligned.
- User can return to the globe.

If a true mesh-unfolding animation is difficult, use a polished crossfade, rotation, scaling, and map reveal.

Prioritize correctness over an elaborate animation.

The two map views must agree on coordinate positions.

Implement map layers where available:

- NASA imagery
- MOLA elevation
- Derived slope
- Water ice evidence
- Landing sites
- User-selected routes

Add a layer control panel.

Provide an opacity control for overlays where useful.

---

# 9. CORE FEATURE — MARSWALK ROUTE PLANNER

This is a high-priority feature.

The official challenge is focused on mapping and planning exploration activity on Mars.

Allow users to choose:

- Starting location
- Destination
- Optional intermediate waypoint

Display:

- Route distance
- Estimated travel time
- Elevation change
- Elevation profile
- Terrain slope
- Approximate travel difficulty
- Environmental warnings

Use Mars-specific geometry and distance calculations.

### Basic implementation

Start with a direct geodesic route between selected locations.

Sample MOLA elevations along it.

Calculate:

- Total distance
- Net elevation change
- Approximate cumulative ascent and descent
- Terrain slope based on available resolution

Clearly label any route traversability assessment as approximate.

### Advanced implementation

If sufficient terrain resolution and time are available:

Use a route-search algorithm such as A* over a regional cost grid.

A possible cost function:

```text
route_cost =
  distance_cost
  + slope_penalty
  + terrain_hazard_penalty
  + uncertainty_penalty
```

Do not claim a route is safe without adequate data.

If only low-resolution MOLA is available, label the route:

"Preliminary route assessment — not suitable for operational astronaut navigation."

### Marswalk resource model

Estimate:

- Travel duration
- Oxygen consumption
- Energy consumption
- Remaining EVA support resources

These estimates must use configurable assumptions.

Provide a default Marswalk duration limit, clearly identified as an illustrative engineering assumption rather than a NASA operational standard.

---

# 10. CORE FEATURE — 120-SOL HABITAT SURVIVAL SIMULATOR

Implement a real deterministic simulation engine.

The simulation must have working calculations.

Do not create decorative graphs with hardcoded random values.

A sol is a Martian solar day, approximately 24 hours, 39 minutes, and 35 seconds.

Simulate up to 120 sols.

### User-selectable equipment kits

Create three starting configurations:

1. Small Exploration Kit
2. Standard Research Habitat
3. Advanced Survival Habitat

Each kit must have configurable parameters:

- Initial oxygen reserve
- Initial water reserve
- Food supply
- Battery capacity
- Solar panel capacity
- Habitat heating demand
- Oxygen production capability
- Water recycling efficiency
- Life-support power demand

These kit specifications are **illustrative engineering scenarios**, not actual NASA mission hardware specifications.

Present them accordingly.

### Simulation state

```ts
type SimulationState = {
  sol: number;
  oxygenKg: number;
  waterKg: number;
  foodKg: number;
  batteryKWh: number;
  cumulativeRadiationMsv: number | null;
  powerGeneratedKWh: number;
  powerConsumedKWh: number;
  habitatTemperatureStatus: "nominal" | "warning" | "critical";
  survivalStatus: "operational" | "failed";
  failureReason?: string;
};
```

### Simulation logic

Each sol:

1. Calculate available solar energy.
2. Account for latitude and seasonal solar geometry.
3. Apply selected dust scenario.
4. Calculate habitat power demands.
5. Account for life-support power consumption.
6. Model battery charging and discharging.
7. Consume oxygen, water, and food.
8. Apply recycling and production subject to installed capabilities.
9. Calculate heating requirements where scientifically supported.
10. Accumulate radiation exposure only when a defensible model or reference scenario is available.
11. Check mission failure conditions.
12. Save the state for every sol.

### Critical modeling principle

Never create resources from nothing.

For example:

- Oxygen production requires a specified feedstock and energy input.
- Water extraction requires access, equipment, and energy.
- Recycling cannot exceed physically valid limits.
- Battery charge cannot exceed capacity.
- Power generation cannot be negative.
- Available resources cannot become negative without triggering failure.

Do not claim that oxygen must always be produced from water. Oxygen production technology and feedstock must be explicitly selected and modeled.

Use physically consistent units.

### Survival outputs

Show:

- Maximum modeled survival duration
- First failure reason
- Remaining oxygen
- Remaining water
- Remaining food
- Available battery charge
- Power generation and demand
- Optional cumulative radiation exposure
- Mission status

If a configuration lasts the full simulation, display:

"Survived 120 sols in this model"

Do not claim that it guarantees real-world survival.

### Scientific caveat

Add a visible statement:

"This is an educational engineering simulation informed by NASA observations. Results depend on simplified models and user-selected assumptions and are not operational predictions."

---

# 11. SIMULATION INTERACTION

Provide a day-by-day timeline.

Users should be able to:

- Press Play
- Pause
- Restart
- Drag the sol slider
- Change equipment configurations
- Change the selected landing location
- Enable a hypothetical dust storm
- Inspect mission events

Use a deterministic simulation engine.

If the inputs do not change, the results must be reproducible.

Store all computed sol states in memory.

Scrubbing the timeline must not generate inconsistent results.

Charts should show meaningful values over time.

Possible charts:

- Oxygen reserve
- Water reserve
- Food reserve
- Battery state
- Power balance
- Optional accumulated radiation dose

Implement an event log.

Example event types:

- Power deficit
- Low oxygen
- Water shortage
- Habitat heating warning
- Equipment failure
- Dust scenario activated
- Mission terminated

The event log must be generated by actual simulation conditions.

Do not hardcode fake events such as "Sol 23: ice is 38 km away" unless that distance was calculated from a verified dataset and meaningful geographic method.

---

# 12. ADDITIONAL FEATURE — COMPARE MARS LOCATIONS

Create a comparison interface.

Allow users to compare two selected locations.

Display:

- Latitude and longitude
- Elevation
- Available water ice evidence
- Derived slope
- Available temperature observations
- Terrain hazards
- Estimated survival performance
- Data availability and uncertainty

Example comparison:

Jezero Crater vs. Gale Crater.

Use actual processed NASA values.

Do not invent measurements.

If a measurement is unavailable, show "Not available".

The comparison should help users understand why location affects mission feasibility.

---

# 13. ADDITIONAL FEATURE — MARS SEASON CLOCK

Implement an optional Mars seasonal indicator.

Use a defensible Mars solar longitude (Ls) calculation or a verified published ephemeris.

Prefer a reliable Mars time/season reference such as NASA's Mars24 documentation.

If an accurate season calculation cannot be verified, omit the automated season clock.

Do not display an unverified dust storm season countdown as a confirmed forecast.

Seasonal climatology is not equivalent to current weather.

---

# 14. USER INTERFACE DESIGN

Create a visually striking, premium-quality interface.

### Visual identity

Theme:

**Futuristic Mars Mission Control**

Color palette:

- Deep space black
- Charcoal
- Warm Martian orange
- Rust red
- Muted sand
- Soft white
- Scientific cyan accents

Style:

- Professional
- Cinematic
- Modern
- Scientific
- Minimal but information-rich
- Inspired by spacecraft mission-control systems

Do not make the interface cluttered.

### Main application structure

Desktop layout:

**Top navigation**

- App logo
- Explore Mars
- Marswalk Planner
- Survival Simulator
- Compare Sites
- Data Sources

**Left panel**

- Scientific layers
- Selected location
- Map controls

**Center**

- Large interactive 3D Mars globe or flat map

**Right panel**

- Coordinates
- Scientific measurements
- Terrain risk
- Environmental overview
- Data provenance access

**Bottom panel**

- Mission timeline
- Resource gauges
- Simulation controls
- Event log

Mobile layout:

- Full-width interactive map
- Collapsible information panels
- Accessible controls
- Responsive charts

### Quality requirements

- Loading indicators
- Error states
- Empty states
- Accessible buttons
- Keyboard support
- Responsive layout
- Clear chart labels
- Consistent spacing
- Smooth but restrained animations
- No horizontal overflow on mobile
- Reasonable performance

Support reduced-motion preferences.

Do not sacrifice usability for visual effects.

---

# 15. APPLICATION ARCHITECTURE

Organize the project cleanly.

Suggested structure:

```text
src/
  app/
    App.tsx
  components/
    layout/
    globe/
    map/
    science/
    simulation/
    charts/
    ui/
  features/
    marswalk/
    survival/
    comparison/
  data/
    loaders/
    metadata/
  lib/
    coordinates/
    geospatial/
    simulation/
  hooks/
  store/
  types/
  styles/

data_pipeline/
  download_data.py
  process_mola.py
  process_ice.py
  process_temperature.py
  generate_manifest.py
  validate_data.py

public/
  data/
  textures/

tests/
```

Use reusable components.

Separate:

- UI rendering
- NASA data loading
- Geospatial calculations
- Simulation calculations
- State management
- Data provenance

Avoid putting the entire application into one giant React component.

Use TypeScript types for scientific measurements and simulation state.

---

# 16. DATA ACCESS AND FALLBACK STRATEGY

At the beginning of implementation:

1. Test access to NASA Mars Trek.
2. Test access to the MOLA archive.
3. Test access to available SWIM products.
4. Check local repository data assets.
5. Identify workable formats and file sizes.
6. Record successful downloads.

Create a data availability report:

```text
DATA AVAILABILITY

Mars imagery:
Source:
Status:
Format:
Resolution:

MOLA elevation:
Source:
Status:
Format:
Resolution:

SWIM ice mapping:
Source:
Status:
Format:
Coverage:

Temperature:
Source:
Status:
Format:
Coverage:

Radiation:
Source:
Status:
Limitations:
```

If a source is unavailable, do not block the entire application.

Continue implementing the parts supported by data already obtained.

The minimum acceptable scientific integration should include:

- Authentic Mars imagery
- Authentic MOLA elevation data
- Correct location sampling
- Clearly documented sources

SWIM integration is the next priority.

If even the minimum datasets cannot be obtained due to network restrictions, clearly report that scientific integration is incomplete. Do not describe the project as fully NASA-data-powered until real files are integrated and validated.

---

# 17. TESTING REQUIREMENTS

Implement meaningful tests.

### Geospatial tests

- Longitude normalization
- Latitude boundaries
- Planetary coordinate conversion
- Globe click coordinate conversion
- Mars great-circle distance
- Correct no-data handling
- MOLA elevation lookup
- Slope calculations
- Site coordinate consistency
- Sampling across the 0°/360° meridian

### Simulation tests

- Resources decrease with consumption.
- Recycling does not exceed valid limits.
- Power never appears from nowhere.
- Batteries respect capacity.
- Failure occurs when required resources are exhausted.
- Simulation results are deterministic.
- Changing equipment kits changes results.
- Dust scenario affects solar power.
- Timeline scrubbing returns consistent states.
- Simulations stop at 120 sols.

### Application tests

- Globe loads.
- Location selection works.
- Globe-to-map transition works.
- Real data panels update after pin selection.
- Route planning produces results.
- Simulation controls function.
- Data-source links work.
- Missing datasets produce honest fallback states.

Run TypeScript checks, tests, and production build.

Fix errors before finalizing.

---

# 18. HACKATHON DOCUMENTATION

Create:

`README.md`

Include:

- Project overview
- Official challenge
- Problem statement
- Proposed solution
- Core features
- Technology stack
- Setup instructions
- Development instructions
- Data-processing instructions
- Deployment instructions
- Scientific limitations
- Screenshots where available
- Team information placeholders

Create:

`DATA_SOURCES.md`

For each dataset include:

- NASA mission
- Instrument
- Dataset name
- Source URL
- Download date
- Processing method
- Resolution
- Units
- Coverage
- Usage terms
- Limitations

Create:

`MODEL_ASSUMPTIONS.md`

Explain:

- Habitat kits
- Resource consumption assumptions
- Production efficiencies
- Power model
- Radiation treatment
- Heating model
- Failure rules
- Interpretation of simulation results

Create:

`SUBMISSION.md`

Include a ready-to-edit draft with:

1. Project summary
2. Problem being solved
3. How the solution addresses the challenge
4. How NASA data was used
5. Technical architecture
6. Innovation and impact
7. Model limitations
8. References
9. GitHub repository URL placeholder
10. Deployment URL placeholder
11. Pitch video URL placeholder
12. AI assistance disclosure

Create:

`PITCH_SCRIPT.md`

Write a compelling 2–3-minute demo script featuring:

1. The Mars globe
2. A real landing site
3. NASA elevation information
4. The Marswalk route planner
5. Ice evidence
6. The 120-sol simulation
7. A comparison between two sites
8. The NASA data-source panel

Only describe features that actually work.

---

# 19. DEVELOPMENT PRIORITY

Implement in this order.

## PHASE 1 — WORKING APPLICATION

- Initialize project
- Build design system
- Create responsive application shell
- Add navigation and layout
- Implement app state
- Create basic Mars globe
- Implement map selection

Verify that the application runs.

## PHASE 2 — REAL NASA DATA

- Obtain authentic Mars imagery
- Download MOLA elevation data
- Process geospatial rasters
- Generate compact local assets
- Build data loaders
- Implement location sampling
- Display actual elevation measurements
- Add source metadata

This phase is mandatory for the scientific MVP.

## PHASE 3 — MARSWALK PLANNER

- Route endpoints
- Distance calculations
- Elevation profile
- Derived terrain slope
- Preliminary hazard warnings
- Optional route improvement

## PHASE 4 — SURVIVAL SIMULATOR

- Equipment kits
- Resource model
- Power model
- 120-sol calculation
- Failure detection
- Timeline playback
- Charts
- Event logs

## PHASE 5 — ADDITIONAL DATA

- SWIM ice layer
- Verified site coordinates
- Temperature observations where feasible
- Radiation reference information
- Seasonal and hypothetical dust scenarios

## PHASE 6 — FINAL POLISH

- Globe-to-map transition
- Comparison interface
- UI animations
- Mobile responsiveness
- Data provenance panel
- Documentation
- Tests
- Production build

Do not spend too much time polishing before core features work.

---

# 20. DEFINITION OF DONE

The project is complete when:

- The app runs locally.
- The production build succeeds.
- The 3D Mars globe works.
- The map displays authentic Mars imagery.
- Users can select a location.
- Actual NASA elevation is correctly sampled.
- Scientific values display sources.
- Missing data is handled clearly.
- The Marswalk planner calculates a real route assessment using available terrain data.
- The survival simulator produces deterministic results.
- Users can change equipment kits.
- The simulation supports 120 sols.
- Charts are calculated from simulation state.
- The app is responsive.
- The repository contains setup instructions.
- Scientific assumptions are documented.
- Sources are properly cited.
- A hackathon submission draft is prepared.

Features depending on unavailable datasets should be documented as incomplete rather than falsely marked complete.

---

# 21. FINAL EXECUTION INSTRUCTIONS

Begin implementation immediately.

First inspect the repository and environment.

Then:

1. Establish the application architecture.
2. Verify NASA dataset accessibility.
3. Create and run the project.
4. Integrate authentic NASA imagery and MOLA elevation.
5. Implement the interactive globe and map.
6. Implement the Marswalk planner.
7. Implement the 120-sol survival simulator.
8. Add additional scientific layers where available.
9. Complete the interface.
10. Run tests and fix errors.
11. Run a production build.
12. Prepare deployment instructions and submission documentation.

Work incrementally.

Do not create a mockup and stop.

Do not replace scientific datasets with plausible-looking fabricated values.

Do not claim features are working without testing them.

If network access or tooling blocks one feature, document the limitation and continue with the next achievable feature.

At the end, provide:

- A summary of implemented features
- The actual NASA datasets successfully integrated
- Data processing and validation results
- Commands for running the application
- Test and build results
- Known limitations
- Deployment steps
- Remaining tasks before submission

**Your goal is to deliver the strongest possible functional, scientifically credible, visually compelling NASA Space Apps Challenge project within the available development time.**

START BUILDING NOW.