# Data sources

Existing assets retained. Further data work deferred; see PROJECT.md.

## Viking VIS Global Color Mosaic

Status: installed. Category: observed.

Source: https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0/WMTSCapabilities.xml

- mission: Viking 1 and 2
- instrument: VIS
- productName: Mars_Viking_MDIM21_ClrMosaic_global_232m
- downloadDate: 2026-11-15
- resolution: 2048 × 1024 overview, 0.17578125°/pixel; source mosaic 232 m/pixel
- units: rendered RGB imagery
- processingMethod: 32 level-2 WMTS tiles stitched in row/column order; WebP quality 90; no synthetic fill.
- licenseOrUsageTerms: Credit original agency and instrument teams; NASA media usage guidelines apply; no NASA endorsement.
- Limitation: Color composite, not calibrated reflectance.
- Limitation: Overview is too coarse to identify local obstacles.

## MGS MOLA MEGDR

Status: installed. Category: observed.

Source: https://pds-geosciences.wustl.edu/missions/mgs/megdr.html

- mission: Mars Global Surveyor
- instrument: MOLA
- productName: MEGT90N000CB.IMG v2.0
- downloadDate: 2026-11-15
- resolution: 0.25° (4 pixels/degree), approximately 14.8 km north–south
- units: m above GMM3 mgm1025 areoid (degree/order 50)
- observationPeriod: 1997-09-15 to 2001-06-30
- processingMethod: MSB signed int16 converted losslessly to little-endian; no resampling.
- licenseOrUsageTerms: Credit original agency and instrument teams; NASA media usage guidelines apply; no NASA endorsement.
- Limitation: Source product includes interpolation where no shots fall in a cell.
- Limitation: Frontend interpolation and slope are derived; not individual MOLA shots.
- Limitation: Not suitable for local walkability assessment.

## MRO CTX controlled Jezero mosaic

Status: installed. Category: observed.

Source: https://trek.nasa.gov/tiles/Mars/EQ/JEZ_ctx_B_soc_008_orthoMosaic_6m_Eqc_latTs0_lon0/1.0.0/WMTSCapabilities.xml

- mission: Mars Reconnaissance Orbiter
- instrument: CTX
- productName: JEZ_ctx_B_soc_008_orthoMosaic_6m_Eqc_latTs0_lon0
- downloadDate: 2026-11-15
- resolution: approximately 10 m/pixel overview from 6 m/pixel source
- units: rendered optical intensity
- processingMethod: Thirty level-12 WMTS tiles stitched with unchanged bounds.
- licenseOrUsageTerms: Credit original agency and instrument teams; NASA media usage guidelines apply; no NASA endorsement.
- Limitation: Optical imagery alone does not establish astronaut traversability.
- Limitation: Local high-resolution DEM not installed.

## MGS TES Global Thermal Inertia

Status: installed. Category: derived.

Source: https://trek.nasa.gov/tiles/Mars/EQ/TES_Thermal_Inertia/1.0.0/WMTSCapabilities.xml

- mission: Mars Global Surveyor
- instrument: TES
- productName: TES_Thermal_Inertia; Putzig et al. 2005
- downloadDate: 2026-11-15
- resolution: 1024 × 512 display overview (0.3515625°/pixel); original product 20 ppd (~3 km)
- units: rendered thermal-inertia context; scalar values not imported
- processingMethod: Eight level-1 NASA rendered tiles stitched losslessly, preserving transparency. Product thermal inertia is itself inferred from TES observations.
- licenseOrUsageTerms: Credit original agency and instrument teams; NASA media usage guidelines apply; no NASA endorsement.
- Limitation: Not a temperature map or weather forecast.
- Limitation: Display colors are not decoded to physical values.
- Limitation: Overview only; not useful for local route decisions within Jezero.
- Limitation: No site-specific thermal hazard or heating demand inferred.

## NASA JPL Perseverance rover localization

Status: installed. Category: observed.

Source: https://mars.nasa.gov/mmgis-maps/M20/Layers/json/M20_waypoints.json

- mission: Mars 2020
- instrument: rover localization
- productName: M20_waypoints.json snapshot; selected sols 13, 180, 420
- downloadDate: 2026-11-15
- resolution: Waypoint coordinates; uncertainty not supplied
- units: planetocentric degrees east/north
- processingMethod: Selected exact source waypoint coordinates; no geology assigned beyond verified rover stops.
- licenseOrUsageTerms: Credit original agency and instrument teams; NASA media usage guidelines apply; no NASA endorsement.
- Limitation: Not live rover positions.
- Limitation: Rover traverse is not a certified astronaut route.
- Limitation: Linked panorama availability depends on NASA server; retrieval returned HTTP 403.

## SWIM4MIM

Status: unavailable. Category: derived.

Source: https://swim.psi.edu/SWIM4MIMProducts.php

- units: ice consistency
- licenseOrUsageTerms: Credit original agency and instrument teams; NASA media usage guidelines apply; no NASA endorsement.
- Limitation: Download origin returned HTTP 523; no local georeferenced ice raster.
- Limitation: Extractability is not established.

## NASA planetary atmospheric archives

Status: unavailable. Category: observed.

Source: https://pds-atmospheres.nmsu.edu/

- units: K
- licenseOrUsageTerms: Credit original agency and instrument teams; NASA media usage guidelines apply; no NASA endorsement.
- Limitation: No validated temperature observations imported.

## Curiosity RAD

Status: unavailable. Category: observed.

Source: https://science.nasa.gov/mission/msl-curiosity/science/instruments/rad/

- units: mSv
- licenseOrUsageTerms: Credit original agency and instrument teams; NASA media usage guidelines apply; no NASA endorsement.
- Limitation: No local radiation dataset or dose model installed.
- Limitation: RAD observations at Gale must not be mapped globally.
