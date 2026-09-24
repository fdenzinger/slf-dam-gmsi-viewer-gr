# GMSI Graubünden – web viewer

Browser viewer for the Ground Motion Sensitivity Index (GMSI, Jacquemart & Manconi 2025) in canton Graubünden. Shows where Sentinel-1 InSAR can and cannot monitor ground motion. Developed within the DAM project (WP1), SLF.

Static site (HTML/JS/CSS, no build step). The GeoTIFF data is hosted on Zenodo (record ID set in `app.js`, `ZENODO_RECORD_ID`) and streamed via HTTP range requests.

Run locally: `python3 -m http.server 8000`, then open http://localhost:8000.

Data: GMSI © Jacquemart & Manconi (2025); Copernicus Sentinel-1 (ESA); basemaps © swisstopo.

License: to be defined.
