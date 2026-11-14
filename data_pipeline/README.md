# Scientific asset preparation

The website ships with processed assets. Do not redownload to run the app. Additional data work is deferred; see ../PROJECT.md.

Scripts: download_data.py, process_mola.py, process_imagery.py, generate_manifest.py. Read their CLI/options before execution. Raw data is ignored by Git; dependencies are in requirements.txt. Full end-to-end reproduction on another machine remains pending.

MOLA is a 1440×720 cell-centered 0.25° grid from MEGT90N000CB.IMG. Processing converts big-endian signed int16 to little-endian without resampling. Metadata records datum, nodata, extrema and checksum. Frontend interpolation is derived.

NASA Trek WMTS imagery is stitched in row/column order. Global images span −180..180 longitude, 90..−90 latitude. Local Jezero bounds are in public/data/jezero-imagery.json. TES is rendered context only, not numeric thermal inertia.

Run offline validation: `python3 data_pipeline/validate_data.py`.

No fabricated fallback datasets are generated. Ice, temperature, radiation and surface photos remain unavailable. See ../DATA_SOURCES.md and public/data/manifest.json.
