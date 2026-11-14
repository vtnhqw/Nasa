# CODEX CONTINUATION PROMPT — OFFICIAL NASA CHALLENGE CONTEXT & REQUIREMENTS

## IMPORTANT: READ THIS BEFORE CONTINUING DEVELOPMENT

I am providing the complete official NASA Space Apps Challenge 2026 description for the challenge we are entering.

This is additional context for the MARS SURVIVAL application described in my previous master prompt.

**Do not restart the project, discard existing implementation, or create a separate application.**

Continue working in the existing repository.

Treat this message as an update to the product requirements, feature priorities, and scientific objectives.

If any feature priorities in the previous prompt conflict with this message, follow the priorities defined here.

---

# 1. OFFICIAL NASA CHALLENGE INFORMATION

**Challenge:** Interplanetary Survival Guide: Martian Map

**Event:** NASA International Space Apps Challenge 2026

**Difficulty:** Intermediate

**Subjects:**
- Human Exploration
- Mars
- Planets & Moons
- Software
- Space Exploration

## Official Challenge Description

NASA has explored Mars robotically for decades, collecting extensive data about the planet's surface, atmosphere, geology, radiation environment, and other conditions.

Future human explorers will require maps that combine information from multiple NASA science missions to help them:

- Understand the terrain around their landing site.
- Plan routes between scientific destinations.
- Identify obstacles and environmental hazards.
- Understand relevant environmental conditions.
- Conduct scientific investigations.
- Transport equipment and supplies.
- Navigate safely during surface exploration.
- Complete mission objectives efficiently.

The challenge is to develop a layered, integrated visualization of a specific location or route on Mars.

The solution must combine NASA scientific information into an interface that could realistically assist astronauts during a Marswalk.

Existing products such as NASA JPL Mars Trek and planetary geological maps provide useful regional and global information.

However, the opportunity is to create a more localized, integrated, mission-oriented experience for astronauts exploring specific regions.

## Central Challenge Objective

Build a map, tool, or interface an astronaut could use to plan and conduct a surface exploration mission on Mars.

Use NASA data and tools.

The solution should prioritize astronaut safety, navigation, scientific exploration, and meaningful integration of multiple datasets.

The official challenge suggests considering at least three different data types, such as:

1. Optical imagery
2. Topographic information
3. Thermal observations
4. Spectral measurements
5. Geophysical measurements
6. Atmospheric observations
7. Radiation measurements
8. Chemical measurements

The application should integrate these layers rather than simply display unrelated information.

The challenge also encourages:

- Selecting meaningful science objectives.
- Choosing locations with substantial NASA observations.
- Including useful route planning.
- Avoiding major surface obstacles.
- Considering spacesuit and equipment mobility limitations.
- Including imagery from the astronaut's point of view.
- Considering robotic assistance and crew teamwork.

These suggestions are not all mandatory requirements. Implement the ones that improve a credible working solution.

---

# 2. REVISED PRODUCT DIRECTION

The existing project name remains:

**MARS SURVIVAL**

Suggested tagline:

**Explore. Navigate. Survive.**

Our application must now be organized around three connected systems.

## SYSTEM A — MARS EXPLORATION MAP

An interactive Mars globe and localized mapping interface powered by real NASA observations.

## SYSTEM B — MARSWALK MISSION PLANNER

The primary challenge-solving feature.

Astronauts select science destinations, plan routes, evaluate terrain hazards, and assess mission feasibility.

## SYSTEM C — HABITAT SURVIVAL SIMULATOR

A secondary feature that explores long-term mission resource constraints using NASA observations and clearly documented engineering assumptions.

The three systems should share selected locations, geographic information, and scientific datasets.

The Marswalk planner must take priority over the 120-sol simulator if development time is limited.

---

# 3. SCIENTIFIC MISSION SCENARIOS

Introduce realistic science-driven exploration missions.

The application must not be just a map with arbitrary pins.

Each mission should answer a scientific question.

Start with one fully implemented mission scenario.

## Recommended Mission 1 — Jezero Crater

**Mission:** Explore the region associated with the Perseverance rover mission.

**Scientific objective:**
Investigate terrain and geological features relevant to understanding Mars's ancient environmental history.

Possible exploration targets include:

- Ancient delta deposits
- Sedimentary formations
- Geological boundaries
- Verified Perseverance exploration locations

Use authentic NASA mission information to identify relevant scientific destinations.

Do not fabricate geological targets or claim a site has a feature without evidence.

## Optional Mission 2 — Gale Crater

**Mission:** Explore terrain associated with the Curiosity rover.

**Scientific objective:**
Investigate layered geological formations and past environmental conditions.

Possible science targets include verified locations around Mount Sharp.

If implementing boxwork formations, use NASA documentation to confirm the coordinates and geographic context.

Do not invent site coordinates.

## Mission Selection

The user should be able to:

1. Choose an available mission region.
2. View its scientific objective.
3. Inspect verified science points of interest.
4. Select a destination.
5. Plan an exploration route.
6. Examine hazards along the route.
7. Review the scientific purpose of the excursion.

Only enable scenarios supported by successfully integrated datasets.

---

# 4. NEW PRIMARY FEATURE — MARSWALK MISSION BUILDER

Create a mission-building interface.

Allow users to configure:

- Mission region
- Science objective
- Starting point
- Destination
- Optional waypoints
- Astronaut count
- Estimated equipment load
- Available oxygen
- Available energy
- Maximum EVA duration

Clearly label astronaut and equipment parameters as illustrative planning assumptions unless supported by specific sourced equipment specifications.

The planner should return:

- Planned route
- Route distance
- Terrain elevation profile
- Slope hazards
- Estimated travel duration
- Estimated resource consumption
- Remaining EVA resources
- Identified safety concerns
- Scientific destinations included
- Data quality and confidence information

For example:

A user might choose a verified science destination in Jezero Crater and request a route from a selected nearby starting point.

The application should analyze the route using NASA MOLA elevation data and any additional local terrain products available.

Avoid presenting low-resolution orbital terrain as sufficient for operational astronaut navigation.

Display a warning when data resolution is inadequate.

---

# 5. NEW FEATURE — SCIENCE POINTS OF INTEREST

Create a Points of Interest layer.

Each science location should have:

- Name
- Latitude and longitude
- Scientific relevance
- Mission source
- Associated NASA observation
- Available imagery
- Link to supporting NASA information
- Geographic uncertainty where applicable

Examples:

- Verified rover landing sites
- Geological formations
- Ancient delta regions
- Crater features
- Rover-observed sedimentary structures

Clicking a science point should open an information panel explaining:

1. What is located there?
2. Why is it scientifically interesting?
3. Which NASA mission explored or observed it?
4. Why might astronauts want to investigate it?
5. What hazards or limitations are known?

Do not use invented points of interest.

---

# 6. MULTI-LAYER SCIENTIFIC MAP

The map should support at least three scientifically useful data types where verified data can be obtained and processed.

Prioritize:

**Layer 1 — Optical imagery**

Use authentic Mars imagery to show the surface.

**Layer 2 — Topography**

Use MOLA elevation and appropriate higher-resolution local datasets where available.

**Layer 3 — Geological or thermal context**

Prefer a georeferenced geological, thermal, or spectral dataset applicable to the selected mission region.

Examples include NASA planetary geological mapping resources or mission instrument products.

If the third geospatial layer cannot be integrated reliably, use another verified, location-relevant data type and clearly document its limitations.

Water ice evidence can be an additional layer, but it is not automatically useful for every localized Marswalk.

Radiation reference values can provide environmental context, but a single Curiosity RAD measurement must not be represented as a global radiation map.

Each data layer must:

- Have a legitimate source.
- Be georeferenced correctly.
- Support visible location-specific information where appropriate.
- Include units and coverage details.
- Preserve no-data areas.
- Include an explanation of its practical importance.
- Distinguish observations from derived estimates.

Do not label the project as having integrated three scientific layers unless three real data products are genuinely present and functioning.

---

# 7. TERRAIN SAFETY AND HAZARD ANALYSIS

Improve the Marswalk planner with risk assessment.

Possible hazards:

- Steep terrain
- High cumulative elevation gain
- Long walking distance
- Limited visibility of terrain details
- Low-quality terrain data
- Inadequate EVA oxygen reserves
- Insufficient EVA duration
- Potential environmental hazards supported by relevant observations

Implement clear warnings.

Examples:

"High slope detected along the sampled route."

"Available elevation resolution is too coarse to evaluate individual rocks."

"Estimated EVA duration exceeds configured mission limits."

"Scientific observation data unavailable for part of this route."

Warnings must originate from calculations or verified evidence.

Do not generate arbitrary risk scores without documenting their calculation.

Any astronaut safety score is an educational decision-support indicator, not a certified NASA operational safety assessment.

---

# 8. ROUTE COMPARISON

Where the terrain information is adequate, show multiple possible routes.

For example:

- Shortest route
- Lower-slope route
- Science-priority route

Compare:

- Distance
- Travel duration
- Cumulative ascent
- Derived terrain difficulty
- Estimated resource consumption
- Scientific objectives covered

If enough data is unavailable for a meaningful alternative-route calculation, display only the verified preliminary route and explain why.

Never generate visually different routes with fabricated scientific values.

---

# 9. ASTRONAUT PERSPECTIVE MODE

Add a practical exploration view.

Where verified NASA surface imagery exists:

- Display rover photographs relevant to the selected region.
- Connect images to documented observation locations where possible.
- Include a caption and source.
- Explain what the astronaut might expect to see.

Avoid using unrelated rover images as if they were captured at the selected pin.

If authentic location-specific surface imagery is unavailable, show an explicit unavailable state.

Do not fabricate a photorealistic astronaut view and label it NASA imagery.

This feature is optional after the core map and route planner work.

---

# 10. SPACESUIT AND MISSION CONSTRAINTS

Model how mission equipment influences EVA feasibility.

Suggested parameters:

- Astronaut count
- Equipment load
- Walking speed
- EVA oxygen supply
- Battery capacity
- Maximum EVA time
- Reserve requirements

Use reasonable engineering assumptions and document them in MODEL_ASSUMPTIONS.md.

Do not describe assumed values as actual NASA operational standards.

Possible modeling relationships:

- Longer routes require more travel time.
- Steeper routes increase an estimated effort penalty.
- Heavier equipment may reduce travel speed.
- Resource use increases with mission duration.
- Science activities require additional stationary time.

Include reasonable user-configurable parameters.

Avoid precision that cannot be supported by available data.

---

# 11. RETAIN THE EXISTING 120-SOL SIMULATOR

Keep the previously specified habitat survival simulator.

Do not remove it.

However, it should be clearly presented as a secondary tool under a separate section or tab.

Its calculations must remain deterministic and transparent.

Its connection to the selected Mars location should use the integrated NASA data where scientifically appropriate.

Do not claim that selecting a different location necessarily changes survival duration unless the model uses defensible location-dependent variables.

If a relevant environmental measurement is missing, provide a clearly labeled scenario input instead.

The survival simulator must distinguish:

- NASA measurements
- Derived environmental estimates
- Engineering assumptions
- Simulation outputs

---

# 12. RECOMMENDED USER EXPERIENCE

The user journey should look like this:

### Step 1 — Explore Mars

Open the application and view the rotating 3D Mars globe.

### Step 2 — Select a Mission Region

Choose Jezero Crater or another verified region.

### Step 3 — View Scientific Layers

Inspect terrain imagery, elevation, and additional available data.

### Step 4 — Select a Scientific Objective

Choose a verified point of interest associated with a NASA mission.

### Step 5 — Plan the Marswalk

Select a starting point, destination, and optional waypoints.

### Step 6 — Evaluate Safety

Review slope hazards, distance, elevation, EVA resource assumptions, and data limitations.

### Step 7 — Explore the Survival Scenario

Open the 120-sol simulator and examine the consequences of different habitat configurations.

### Step 8 — Compare and Explain

Compare alternatives and review the NASA data sources behind the decisions.

This experience should be intuitive enough for non-specialists while providing credible scientific context.

---

# 13. REVISED MVP PRIORITIES

Prioritize development in this exact order:

**P0 — Mandatory**

1. Working responsive web application
2. Functional Mars globe or map
3. Genuine NASA Mars surface imagery
4. Genuine MOLA elevation integration
5. Verified mission region and science destinations
6. Functional route selection
7. Route distance and elevation analysis
8. Scientific data provenance
9. Clearly documented uncertainty and limitations

**P1 — Strongly Recommended**

10. Third authentic scientific layer relevant to the chosen region
11. Terrain hazard warnings
12. Configurable EVA mission parameters
13. EVA resource calculations
14. Route comparison when data supports it
15. Polished globe-to-map transition

**P2 — Additional Features**

16. 120-sol habitat survival simulator
17. Surface photography viewer
18. Additional mission regions
19. Seasonal context
20. Advanced animations
21. Expanded scientific comparisons

If the project already contains functional P2 features, preserve them unless they are broken or scientifically misleading.

Do not remove completed features unnecessarily.

---

# 14. USER INTERFACE UPDATE

The application should now visually emphasize astronaut exploration.

Use a premium futuristic mission-control dashboard design.

Main sections:

- Explore Mars
- Mission Builder
- Scientific Layers
- Marswalk Route Planner
- Safety Analysis
- Habitat Survival
- Data Sources

The Mars map remains the main visual centerpiece.

Add a mission progress workflow:

**Select Region → Select Science Target → Plan Route → Review Hazards → Mission Briefing**

The mission briefing should summarize:

- Scientific objective
- Mission destination
- Planned route
- Distance
- Estimated duration
- Estimated resource requirements
- Key hazards
- Relevant NASA observations
- Important uncertainty and missing data

Build this as a polished, readable dashboard.

---

# 15. SCIENTIFIC VALIDITY REQUIREMENTS

Do not make claims beyond what the datasets support.

In particular:

- MOLA elevation cannot establish individual rock hazards at coarse resolution.
- Rover temperature observations cannot automatically be applied globally.
- Radiation measurements from one rover cannot be treated as a global radiation grid.
- Historical dust observations are not current forecasts.
- Subsurface ice evidence does not automatically mean accessible drinking water.
- Maps and overlays must use consistent planetary coordinate systems.
- Planetary distance calculations must use Mars parameters, not Earth's.
- Science point coordinates must be verified.
- Derived slope must account for spatial resolution.
- Apparent terrain safety must not be confused with operational certification.

The application is an educational mission-planning prototype.

Include a scientific disclaimer:

"This tool is a research-inspired educational prototype using NASA data and simplified mission-planning models. It is not certified for operational spaceflight navigation or astronaut safety decisions."

---

# 16. HACKATHON SUBMISSION REQUIREMENTS

The project will be submitted to NASA Space Apps Challenge 2026.

According to the provided global project submission guide:

- Submission deadline: November 15, 2026, 11:59 PM in the Local Event time zone.
- The official Project Demo must be a video no longer than 30 seconds OR a slide deck with no more than seven slides.
- The demo must be publicly accessible.
- The submission must explain how NASA data was used.
- The team must provide a final project link.
- Required project information must be written in English.
- AI/SI usage must be disclosed in the appropriate submission field.
- All sources and third-party resources must be credited.

Update the previously requested PITCH_SCRIPT.md.

Create:

**DEMO_30_SECONDS.md**

It should contain a 30-second demo script that shows:

0–5 seconds:
Introduce MARS SURVIVAL and the NASA challenge.

5–12 seconds:
Show the Mars map and genuine NASA scientific layers.

12–21 seconds:
Select a science destination and demonstrate route planning and safety analysis.

21–27 seconds:
Show the habitat survival simulator, if functional.

27–30 seconds:
Explain the project's impact.

If the survival simulator is not ready, spend those seconds highlighting the NASA data provenance and mission briefing.

Also prepare a seven-slide alternative outline.

Do not state that a demo feature works unless it has been verified.

---

# 17. WHAT TO DO NOW

Continue from the current repository state.

Your immediate tasks:

1. Inspect existing files and implementation progress.
2. Compare current features against these updated requirements.
3. Identify which P0 features are already working.
4. Identify missing P0 requirements.
5. Continue implementation, prioritizing missing P0 requirements.
6. Integrate genuine NASA datasets.
7. Test the coordinate conversions and route calculations.
8. Implement the science-oriented mission workflow.
9. Preserve existing working survival simulation functionality.
10. Update documentation and submission materials.
11. Run tests and a production build.
12. Report the actual implemented features and missing data.

Do not create another high-level plan and stop.

Do not restart the application.

Do not pretend data is real if it is synthetic.

Do not substitute unrelated map imagery or invented measurements.

Do not use mock scientific values in the final production experience.

**The final goal is a functioning, visually impressive, scientifically credible NASA data-driven Marswalk planning application that genuinely addresses the official challenge.**

Continue implementing the existing MARS SURVIVAL project now.