# Model assumptions
All EVA and habitat inputs are educational engineering scenarios, not NASA operational standards. Pure calculations are deterministic. Outputs do not imply real survival or certified navigation.

## Coordinates and terrain
Planetocentric degrees, east-positive longitude normalized to [-180,180). Mean Mars sphere radius 3389.5 km. Routes are shortest great-circle segments, optionally through one user waypoint; no obstacle avoidance is performed. Antipodal endpoints use a deterministic great circle, one of infinitely many possible routes.

MOLA raster cells are centered at 89.875°N, 0.125°E with 0.25° spacing. Bilinear interpolation wraps longitude; unavailable contributing cells return null. Source MEGDR contains interpolated bins. All frontend interpolated values and slopes are derived. Regional slope uses central differences divided by Mars great-circle distances in meters. Polar slopes are unavailable. Cumulative ascent/descent are sums along the interpolated route and are highly resolution-dependent.

## EVA model
Defaults: two astronauts, 15 kg equipment per astronaut, base speed 2 km/h, 3 kg pooled oxygen, 8 kWh pooled battery, eight-hour limit, 20% reserve, 0.5-hour science stop. All configurable in the UI except fixed default consumption factors.

Effective speed = base speed / (1 + loadKg / 100). Time = distance / effective speed + science hours + regional ascent / 600 m per hour when elevation is available. The load/ascent relationship is illustrative, not a validated human-performance model. Missing elevation omits the ascent penalty and is warned. Oxygen use = hours × crew × 0.1 kg/h. Energy = hours × crew × 0.3 kW. Warnings are generated when duration or reserve limits are exceeded. There is no arbitrary safety score, no guaranteed safe route and no return journey unless waypoints/endpoints explicitly describe one.

## Habitat model
A sol is 24h 39m 35s. Up to 120 daily steps plus initial state are saved. First failed sol stops simulation. Initial batteries are full. Crew consumes 0.84 kg oxygen, 3 kg gross water and 0.62 kg food per person per sol; water loss is gross use × (1 − recovery fraction). Water recovery is an idealized same-sol balance, with energy included in the configured life-support demand. Food/oxygen cannot be recycled.

The three kits in `src/lib/simulation.ts` specify initial reserves, solar power, battery capacity, heating, life support, oxygen production and water recovery. UI parameters are validated and bounded. No water or food production, ice extraction or implicit equipment reliability is modeled.

### Power and production
Solar input uses the analytic daily integral of horizontal-array illumination for latitude and a fixed chosen solar longitude (Ls), using obliquity 25.19°. Solar capacity is a scenario rating at normal incidence under Mars illumination; no terrestrial-to-Mars irradiance conversion is implied. A fixed 0.75 yield factor represents aggregate losses. Eccentricity, seasonal progression, terrain shading, panel degradation and detailed irradiance are omitted. Ls is a scenario setting, not a current ephemeris.

A hypothetical storm applies 0.25 multiplier on sols 20–40. It is not an observation or forecast. Battery plus solar first supplies heating and life support. Remaining energy can produce oxygen at the configured kWh/kg, capped by the plant's daily capacity. Oxygen production is **ambient-CO₂ electrolysis**, requiring approximately 2.75 kg atmospheric CO₂ per kg O₂; capture/feedstock availability is assumed sufficient and plant energy includes intake. Carbon monoxide by-product handling is outside the model. No water is consumed in this selected oxygen-production pathway.

Energy used never exceeds energy available. Battery charge is capped; excess energy is curtailed. Solar energy is balanced across a whole sol, so day/night cycling and short-term peak power failures are not resolved. Heating demand is user-selected and not derived from unavailable temperature observations.

### Failure and interpretation
Fail on insufficient daily base power or exhausted oxygen, water or food. Resource amounts clamp to zero on failure. Depletion within a sol is not resolved; results report the first failed daily step. Heating status warns when daily solar is below base demand and becomes critical if base demand cannot be supplied. Events reflect these actual conditions. No radiation dose is accumulated. Latitude alone affects site-dependent power. Terrain/ice/radiation/temperature do not silently modify survival.

## Survival-location comparison
The home screen now defaults to one astronaut using the Small Exploration Kit. A selected pin runs the same deterministic habitat model. Completed sols exclude the first failed sol; reaching 120 sols means “at least 120 in the modeled window,” not a guaranteed maximum. Alternative sites are evaluated at ±1, ±5, ±15 and ±30 degrees latitude with unchanged longitude, omitting out-of-bounds latitudes. Candidates rank by completed sols, then distance. Only strict improvements are offered for preview. These are alternate starting-site scenarios with full original reserves, not an in-progress relocation simulation. Moving/travel costs and safety are not modeled.
