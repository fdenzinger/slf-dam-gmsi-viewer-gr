// GMSI Graubünden – standalone browser viewer
// No server required: the project folder is loaded via drag-and-drop or a
// folder picker, and rasters are read directly as local Files/Blobs
// (avoids the file:// CORS restriction that blocks fetch() of sibling files).

if (typeof proj4 !== "undefined") {
  proj4.defs(
    "EPSG:2056",
    "+proj=somerc +lat_0=46.9524055555556 +lon_0=7.43958333333333 +k_0=1 " +
    "+x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs"
  );
}

// Zenodo rate-limits anonymous requests (~133 per minute per IP) and geotiff.js
// has no retry logic, so a 429 would show up as blank tiles. Wait for the
// window to reset (X-RateLimit-Reset is exposed to cross-origin scripts) and
// retry instead.
(function () {
  const nativeFetch = window.fetch.bind(window);
  window.fetch = async function (input, init) {
    const url = typeof input === "string" ? input : input && input.url;
    if (!url || !url.startsWith("https://zenodo.org/")) return nativeFetch(input, init);
    for (let attempt = 0; ; attempt++) {
      const resp = await nativeFetch(input, init);
      if (resp.status !== 429 || attempt >= 3) return resp;
      const reset = Number(resp.headers.get("x-ratelimit-reset"));
      const wait = reset ? reset * 1000 - Date.now() + 500 : 2000 * (attempt + 1);
      await new Promise((r) => setTimeout(r, Math.min(Math.max(wait, 1000), 65000)));
    }
  };
})();

const state = {
  map: null,
  mode: "easy",
  layers: {}, // file -> { manifest, leafletLayer, checked }
  basemaps: {}, // "hillshade" | "grau" | "swissimage" -> Leaflet layer
  currentBasemap: "grau",
};

// ---------------------------------------------------------------- custom EPSG:2056 (LV95) CRS
//
// The GMSI rasters are natively EPSG:2056. Rather than reprojecting that
// data (lossy, and re-warping per pixel at render time is far too slow --
// tried it, ~65k proj4 calls per tile), the map itself is set up to run
// natively in EPSG:2056: swisstopo's WMS (not WMTS -- WMTS is pre-tiled in
// EPSG:3857 only) can render any layer directly in EPSG:2056 on request,
// and every Leaflet "tile" is then, by construction, already an exact
// rectangle in the GMSI data's own CRS. So GeoTiffColorLayer goes back to
// a plain 2-corner bbox read per tile: fast, and correct at every zoom
// level (no rectangle-in-one-CRS-isn't-a-rectangle-in-another distortion).
const LV95_RESOLUTIONS = [650, 500, 250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1, 0.5, 0.25, 0.1];
const LV95_ORIGIN_X = 2420000;
const LV95_ORIGIN_Y = 1350000;

const CRS_LV95 = L.extend({}, L.CRS.Earth, {
  code: "EPSG:2056",
  wrapLng: undefined,
  projection: {
    project: function (latlng) {
      const p = proj4("EPSG:4326", "EPSG:2056", [latlng.lng, latlng.lat]);
      return new L.Point(p[0], p[1]);
    },
    unproject: function (point) {
      const ll = proj4("EPSG:2056", "EPSG:4326", [point.x, point.y]);
      return new L.LatLng(ll[1], ll[0]);
    },
    bounds: L.bounds([2420000, 1030000], [2900000, 1350000]),
  },
  transformation: new L.Transformation(1, -LV95_ORIGIN_X, -1, LV95_ORIGIN_Y),
  scale: function (zoom) {
    const i = Math.floor(zoom);
    const base = LV95_RESOLUTIONS[Math.min(i, LV95_RESOLUTIONS.length - 1)];
    if (zoom === i || i >= LV95_RESOLUTIONS.length - 1) return 1 / base;
    const next = LV95_RESOLUTIONS[i + 1];
    const frac = zoom - i;
    return 1 / (base + frac * (next - base));
  },
  zoom: function (scale) {
    const res = 1 / scale;
    const R = LV95_RESOLUTIONS;
    for (let i = 0; i < R.length - 1; i++) {
      if (res <= R[i] && res >= R[i + 1]) {
        return i + Math.log(R[i] / res) / Math.log(R[i] / R[i + 1]);
      }
    }
    return res > R[0] ? 0 : R.length - 1;
  },
  infinite: true,
});

function swissWms(layerName, extraOpts) {
  return L.tileLayer.wms("https://wms.geo.admin.ch/", Object.assign({
    layers: layerName,
    format: "image/png",
    transparent: false,
    version: "1.3.0",
    maxZoom: LV95_RESOLUTIONS.length - 1,
    zIndex: 0,
  }, extraOpts || {}));
}

const SWISSTOPO_GRAU = swissWms("ch.swisstopo.pixelkarte-grau", { attribution: "© swisstopo" });
const SWISSTOPO_SWISSIMAGE = swissWms("ch.swisstopo.swissimage", { attribution: "© swisstopo" });
// ground (bare terrain) vs surface (incl. vegetation/buildings) hillshades,
// served on demand from swisstopo instead of shipping a local raster --
// cuts the download size a lot for a basemap most people leave in the
// background
const SWISSTOPO_ALTI3D_HILLSHADE = swissWms("ch.swisstopo.swissalti3d-reliefschattierung", {
  attribution: "swissALTI3D &copy; swisstopo",
});
const SWISSTOPO_SURFACE3D_HILLSHADE = swissWms("ch.swisstopo.swisssurface3d-reliefschattierung-multidirektional", {
  attribution: "swissSURFACE3D &copy; swisstopo",
});

function setBasemap(name) {
  const prev = state.basemaps[state.currentBasemap];
  if (prev && state.map.hasLayer(prev)) state.map.removeLayer(prev);
  state.currentBasemap = name;
  const next = state.basemaps[name];
  if (next) next.addTo(state.map);
}

// single entry point for both the sidebar radios and the on-map control,
// so the two stay in sync no matter which one the user touches
function chooseBasemap(name) {
  setBasemap(name);
  document.querySelectorAll(".basemap-control-item").forEach((el) => {
    el.classList.toggle("active", el.dataset.value === name);
  });
}

// small Leaflet control (bottom-left, like the classic basemap-switcher
// pattern) so the basemap can be changed without opening the sidebar
const BasemapControl = L.Control.extend({
  options: { position: "bottomleft" },
  onAdd: function () {
    const container = L.DomUtil.create("div", "leaflet-bar basemap-control");
    const button = L.DomUtil.create("a", "basemap-control-btn", container);
    button.href = "#";
    button.title = "Hintergrundkarte wechseln";
    button.setAttribute("role", "button");
    button.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 24 24">' +
      '<path d="M12 3L2 9l10 6 10-6-10-6z" fill="#1c1e21"/>' +
      '<path d="M2 13l10 6 10-6" fill="none" stroke="#1c1e21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M2 17.5l10 6 10-6" fill="none" stroke="#1c1e21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
      "</svg>";

    const menu = L.DomUtil.create("div", "basemap-control-menu hidden", container);
    const options = [
      { value: "grau", label: "Landeskarte grau" },
      { value: "swissimage", label: "SWISSIMAGE" },
      { value: "alti3d", label: "Relief swissALTI3D (Gelände)" },
      { value: "surface3d", label: "Relief swissSURFACE3D (Oberfläche)" },
    ];
    options.forEach((opt) => {
      const item = L.DomUtil.create("div", "basemap-control-item", menu);
      item.textContent = opt.label;
      item.dataset.value = opt.value;
      item.classList.toggle("active", opt.value === state.currentBasemap);
      item.addEventListener("click", () => {
        chooseBasemap(opt.value);
        menu.classList.add("hidden");
      });
    });

    L.DomEvent.disableClickPropagation(container);
    L.DomEvent.disableScrollPropagation(container);
    button.addEventListener("click", (e) => {
      e.preventDefault();
      menu.classList.toggle("hidden");
    });
    return container;
  },
});

// ---------------------------------------------------------------- click-to-query

async function readRasterValue(leafletLayer, latlng) {
  const tiff = leafletLayer._tiff;
  const nodata = leafletLayer._nodata;
  const [x, y] = proj4("EPSG:4326", "EPSG:2056", [latlng.lng, latlng.lat]);
  try {
    const rasters = await tiff.readRasters({
      bbox: [x - 5, y - 5, x + 5, y + 5],
      width: 1,
      height: 1,
      resampleMethod: "nearest",
      fillValue: nodata,
    });
    const v = rasters[0][0];
    if (v === nodata || v === undefined || v === null || Number.isNaN(v)) return null;
    return v;
  } catch (err) {
    return null;
  }
}

async function onMapClick(e) {
  const latlng = e.latlng;
  const popup = L.popup({ maxWidth: 280 }).setLatLng(latlng).setContent("Lade …").openOn(state.map);

  const rows = [];

  const composite = state.layers["GMSI_GR_composite.tif"];
  if (composite) {
    const v = await readRasterValue(composite.leafletLayer, latlng);
    if (v !== null) rows.push(`<div><strong>GMSI Übersicht:</strong> ${v.toFixed(2)} – ${gmsiLabel(v)}</div>`);
  }

  const bestOrbit = state.layers["GMSI_GR_best_orbit.tif"];
  if (bestOrbit) {
    const v = await readRasterValue(bestOrbit.leafletLayer, latlng);
    if (v !== null) {
      const track = ORBIT_INDEX_ORDER[Math.round(v)];
      if (track) rows.push(`<div><strong>Bester Track:</strong> ${track}</div>`);
    }
  }

  // any currently visible (checked) per-track GMSI or shadow/layover layers
  for (const file in state.layers) {
    const entry = state.layers[file];
    if (!entry.checked || entry.manifest.group === 1 || !entry.leafletLayer) continue;
    if (entry.manifest.kind === "gmsi") {
      const v = await readRasterValue(entry.leafletLayer, latlng);
      if (v !== null) rows.push(`<div>GMSI ${entry.manifest.label}: ${v.toFixed(2)} – ${gmsiLabel(v)}</div>`);
    } else if (entry.manifest.kind === "shadow") {
      const v = await readRasterValue(entry.leafletLayer, latlng);
      if (v !== null) rows.push(`<div>${entry.manifest.label} (Shadow/Layover): ${shadowLayoverLabel(v)}</div>`);
    }
  }

  popup.setContent(
    rows.length
      ? `<div class="point-popup">${rows.join("")}</div>`
      : `<div class="point-popup">Keine Daten an dieser Stelle.</div>`
  );
}

// ---------------------------------------------------------------- file collection

function findMatches(fileList) {
  const byName = new Map();
  for (const f of fileList) byName.set(f.name, f);
  const found = {};
  const missing = [];
  for (const entry of LAYER_MANIFEST) {
    if (byName.has(entry.file)) found[entry.file] = byName.get(entry.file);
    else missing.push(entry.file);
  }
  return { found, missing };
}

async function traverseDataTransferItems(items) {
  const files = [];
  function traverse(entry) {
    return new Promise((resolve) => {
      if (entry.isFile) {
        entry.file((file) => { files.push(file); resolve(); }, () => resolve());
      } else if (entry.isDirectory) {
        const reader = entry.createReader();
        const readBatch = () => {
          reader.readEntries(async (entries) => {
            if (entries.length === 0) { resolve(); return; }
            await Promise.all(entries.map(traverse));
            readBatch();
          }, () => resolve());
        };
        readBatch();
      } else {
        resolve();
      }
    });
  }
  const entries = [];
  for (const item of items) {
    if (item.kind === "file") {
      const entry = item.webkitGetAsEntry ? item.webkitGetAsEntry() : null;
      if (entry) entries.push(entry);
      else { const f = item.getAsFile(); if (f) files.push(f); }
    }
  }
  await Promise.all(entries.map(traverse));
  return files;
}

// ---------------------------------------------------------------- layer building
// (buildLeafletLayer / fitBounds logic lives in geotiff-layer.js's makeGeoTiffLayer)

// options.lazyFetch(entry) -> Promise<File>: when given, layers that weren't
// in fileList are registered as not-yet-loaded placeholders and fetched the
// first time the user switches them on (see loadLazyLayer)
async function loadProject(fileList, options = {}) {
  const lazyFetch = options.lazyFetch || null;
  const statusEl = document.getElementById("load-status");
  const { found, missing } = findMatches(fileList);
  const foundCount = Object.keys(found).length;

  if (foundCount === 0) {
    statusEl.className = "error";
    statusEl.textContent =
      "Keine passenden GMSI-Dateien im ausgewählten Ordner gefunden.\n" +
      "Bitte den Ordner „GMSI_GR_product“ (oder „rasters“) auswählen.";
    return;
  }

  statusEl.className = "";
  statusEl.textContent = lazyFetch ? "Lade Übersicht …" : `Lade ${foundCount} von ${LAYER_MANIFEST.length} Ebenen …`;

  state.map = L.map("map", { crs: CRS_LV95, zoomSnap: 1, zoomDelta: 1, zoomControl: true, attributionControl: true });
  new BasemapControl().addTo(state.map);

  // small logo-link control factory: an image wrapped in a link that opens
  // in a new tab, used for both the SLF logo (top-right) and the DAM
  // project logo (bottom-right)
  function makeLogoLinkControl(position, src, href, extraClass) {
    const Ctrl = L.Control.extend({
      options: { position },
      onAdd: function () {
        const link = L.DomUtil.create("a", "map-logo-link" + (extraClass ? " " + extraClass : ""));
        link.href = href;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        const img = L.DomUtil.create("img", "map-logo", link);
        img.src = src;
        img.alt = "";
        L.DomEvent.disableClickPropagation(link);
        return link;
      },
    });
    return new Ctrl();
  }

  makeLogoLinkControl("topright", "slf-logo.png", "https://www.slf.ch/en/", "slf-logo-link").addTo(state.map);
  makeLogoLinkControl(
    "bottomright",
    "icon.png",
    "https://www.slf.ch/en/projects/displacement-anomaly-maps/",
    "dam-logo-link"
  ).addTo(state.map);

  // open all matched rasters in parallel: fromBlob() only reads the TIFF
  // header/IFDs (a few KB), so this is fast regardless of file size; actual
  // pixel data is read lazily, per visible tile, by GeoTiffColorLayer.
  const entriesToLoad = LAYER_MANIFEST.filter((entry) => found[entry.file]);
  const built = await Promise.all(
    entriesToLoad.map(async (entry) => {
      try {
        const { layer, latLngBounds } = await makeGeoTiffLayer(found[entry.file], entry.kind);
        return { entry, layer, latLngBounds };
      } catch (err) {
        console.error("Fehler beim Laden von", entry.file, err);
        return null;
      }
    })
  );

  state.basemaps.grau = SWISSTOPO_GRAU;
  state.basemaps.swissimage = SWISSTOPO_SWISSIMAGE;
  state.basemaps.alti3d = SWISSTOPO_ALTI3D_HILLSHADE;
  state.basemaps.surface3d = SWISSTOPO_SURFACE3D_HILLSHADE;

  // IMPORTANT: establish a valid view (fitBounds/setView) BEFORE adding any
  // tile layer to the map. The map has no defined center/zoom yet at this
  // point; a GridLayer added to a view-less map computes tile URLs against
  // that undefined state, and those bogus tiles then stay wrongly cached
  // under whatever tile key later coincides with a real one once the view
  // is actually set -- silently showing blank/misplaced tiles forever.
  const builtByFile = {};
  for (const r of built) if (r) builtByFile[r.entry.file] = r;

  let fitBoundsTarget = null;
  for (const entry of LAYER_MANIFEST) {
    const r = builtByFile[entry.file];
    if (r) {
      state.layers[entry.file] = { manifest: entry, leafletLayer: r.layer, checked: !!entry.defaultOn };
      if (entry.defaultOn && !fitBoundsTarget) fitBoundsTarget = r.latLngBounds;
    } else if (lazyFetch) {
      state.layers[entry.file] = { manifest: entry, leafletLayer: null, checked: false, lazyFetch: () => lazyFetch(entry) };
    }
  }

  if (fitBoundsTarget) {
    state.map.fitBounds(fitBoundsTarget, { animate: false });
  } else {
    state.map.setView([46.8, 9.6], 9, { animate: false });
  }

  for (const file in state.layers) {
    const l = state.layers[file];
    if (l.checked && l.leafletLayer) l.leafletLayer.addTo(state.map);
  }
  setBasemap(state.currentBasemap);
  state.map.on("click", onMapClick);

  if (!lazyFetch && missing.length) {
    statusEl.textContent = `Geladen. Nicht gefunden (übersprungen): ${missing.join(", ")}`;
  }

  buildSidebar();
  setMode("easy");

  document.getElementById("loader").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  setTimeout(() => state.map.invalidateSize(), 50);
}

// ---------------------------------------------------------------- sidebar UI

// Downloads + opens a not-yet-loaded layer the first time it's switched on.
// Adds it to the map only if it's still ticked once the download finishes.
async function loadLazyLayer(file) {
  const entry = state.layers[file];
  if (!entry || entry.loading || entry.leafletLayer) return;
  entry.loading = true;
  if (entry.statusEl) entry.statusEl.textContent = "lädt …";
  try {
    const rasterFile = await entry.lazyFetch();
    const { layer } = await makeGeoTiffLayer(rasterFile, entry.manifest.kind);
    entry.leafletLayer = layer;
    if (entry.statusEl) entry.statusEl.textContent = "";
    if (entry.checked) layer.addTo(state.map);
  } catch (err) {
    console.error("Fehler beim Laden von", file, err);
    entry.checked = false;
    if (entry.checkboxEl) entry.checkboxEl.checked = false;
    if (entry.statusEl) entry.statusEl.textContent = "Fehler beim Laden";
  } finally {
    entry.loading = false;
    updateLegend();
  }
}

async function toggleLayer(file, on) {
  const entry = state.layers[file];
  if (!entry) return;
  entry.checked = on;
  if (on && !entry.leafletLayer) {
    updateLegend();
    await loadLazyLayer(file);
    return;
  }
  if (entry.leafletLayer) {
    if (on) entry.leafletLayer.addTo(state.map);
    else state.map.removeLayer(entry.leafletLayer);
  }
  updateLegend();
}

function buildSidebar() {
  const tree = document.getElementById("layer-tree");
  tree.innerHTML = "";

  const groups = {};
  for (const file in state.layers) {
    const entry = state.layers[file];
    const g = entry.manifest.group;
    if (g === 0) continue; // hillshade: not user-toggleable
    if (!groups[g]) groups[g] = [];
    groups[g].push({ file, ...entry });
  }

  Object.keys(groups).sort().forEach((g) => {
    const groupDiv = document.createElement("div");
    groupDiv.className = "layer-group";
    groupDiv.dataset.group = g;

    const title = document.createElement("div");
    title.className = "layer-group-title";
    title.textContent = GROUP_LABELS[g];
    groupDiv.appendChild(title);

    groups[g].forEach(({ file, manifest, checked }) => {
      const row = document.createElement("label");
      row.className = "layer-row";

      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = checked;
      cb.addEventListener("change", () => toggleLayer(file, cb.checked));
      state.layers[file].checkboxEl = cb; // so setMode() can keep the DOM in sync later

      const swatch = document.createElement("span");
      swatch.className = "swatch";
      swatch.style.background = swatchColorFor(manifest);

      const label = document.createElement("span");
      label.textContent = manifest.label;

      row.appendChild(cb);
      row.appendChild(swatch);
      row.appendChild(label);

      const status = document.createElement("span");
      status.className = "layer-status";
      state.layers[file].statusEl = status;
      row.appendChild(status);

      if (manifest.kind !== "orbit" && TRACK_INFO[manifest.label] && TRACK_INFO[manifest.label].hinweis) {
        const note = document.createElement("span");
        note.title = TRACK_INFO[manifest.label].hinweis;
        note.textContent = " ⓘ";
        note.style.color = "#999";
        row.appendChild(note);
      }

      groupDiv.appendChild(row);
    });

    tree.appendChild(groupDiv);
  });
}

function swatchColorFor(manifest) {
  if (manifest.kind === "orbit") return "linear-gradient(90deg,#3C7AA9,#5ACDEE,#4FAE62,#F36976,#CEB848)";
  if (manifest.kind === "gmsi") return "#1A9641";
  if (manifest.kind === "shadow") return "#5A5A5A";
  return "#999";
}

function updateLegend() {
  const legend = document.getElementById("legend");
  legend.innerHTML = "";

  const visibleKinds = new Set();
  for (const file in state.layers) {
    const entry = state.layers[file];
    if (entry.checked && entry.manifest.kind !== "hillshade") visibleKinds.add(entry.manifest.kind);
  }

  if (visibleKinds.size === 0) return;

  const heading = document.createElement("h2");
  heading.textContent = "Legende";
  legend.appendChild(heading);

  if (visibleKinds.has("gmsi")) legend.appendChild(legendBlock("GMSI", GMSI_LEGEND));
  if (visibleKinds.has("orbit")) legend.appendChild(legendBlock("Track", bestOrbitLegend()));
  if (visibleKinds.has("shadow")) legend.appendChild(legendBlock("Shadow/Layover", SHADOW_LEGEND));
}

function legendBlock(title, items) {
  const block = document.createElement("div");
  block.className = "legend-block";
  const t = document.createElement("div");
  t.style.fontWeight = "600";
  t.style.marginBottom = "4px";
  t.textContent = title;
  block.appendChild(t);
  items.forEach(({ color, label }) => {
    const row = document.createElement("div");
    row.className = "legend-row";
    const sw = document.createElement("span");
    sw.className = "swatch";
    sw.style.background = color;
    const lbl = document.createElement("span");
    lbl.textContent = label;
    row.appendChild(sw);
    row.appendChild(lbl);
    block.appendChild(row);
  });
  return block;
}

function setMode(mode) {
  state.mode = mode;
  document.getElementById("mode-easy").classList.toggle("active", mode === "easy");
  document.getElementById("mode-expert").classList.toggle("active", mode === "expert");

  document.querySelectorAll("#layer-tree .layer-group").forEach((el) => {
    const g = el.dataset.group;
    el.classList.toggle("hidden", mode === "easy" && g !== "1");
  });

  if (mode === "easy") {
    // clean, single-layer view: force everything except the composite off,
    // and keep every checkbox's DOM state in sync -- not just group 1's --
    // otherwise switching back to Erweitert shows stale "checked" boxes for
    // layers that were actually turned off here
    for (const file in state.layers) {
      const entry = state.layers[file];
      if (entry.manifest.group === 0) continue;
      const shouldBeOn = entry.manifest.group === 1;
      if (entry.checked !== shouldBeOn) {
        entry.checked = shouldBeOn;
        if (entry.leafletLayer) {
          if (shouldBeOn) entry.leafletLayer.addTo(state.map);
          else state.map.removeLayer(entry.leafletLayer);
        }
      }
      if (entry.checkboxEl) entry.checkboxEl.checked = shouldBeOn;
    }
  }
  updateLegend();
}

// ---------------------------------------------------------------- wiring

// ---------------------------------------------------------------- location search (swisstopo)

const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
let searchDebounce = null;

function stripTags(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || "";
}

async function runSearch(query) {
  if (!query || query.length < 2) {
    searchResults.classList.add("hidden");
    searchResults.innerHTML = "";
    return;
  }
  try {
    const url =
      "https://api3.geo.admin.ch/rest/services/api/SearchServer?type=locations&limit=8" +
      "&origins=gg25,address,district,kantone,zipcode&searchText=" +
      encodeURIComponent(query);
    const resp = await fetch(url);
    if (!resp.ok) return;
    const data = await resp.json();
    const items = (data.results || []).filter((r) => r.attrs && r.attrs.lat && r.attrs.lon);

    searchResults.innerHTML = "";
    if (items.length === 0) {
      searchResults.classList.add("hidden");
      return;
    }
    items.forEach((r) => {
      const row = document.createElement("div");
      row.className = "search-result";
      row.textContent = stripTags(r.attrs.label);
      row.addEventListener("click", () => {
        if (state.map) state.map.setView([r.attrs.lat, r.attrs.lon], 14);
        searchInput.value = stripTags(r.attrs.label);
        searchResults.classList.add("hidden");
      });
      searchResults.appendChild(row);
    });
    searchResults.classList.remove("hidden");
  } catch (err) {
    console.warn("Ortssuche fehlgeschlagen:", err);
  }
}

searchInput.addEventListener("input", () => {
  clearTimeout(searchDebounce);
  const query = searchInput.value.trim();
  searchDebounce = setTimeout(() => runSearch(query), 300);
});
document.addEventListener("click", (e) => {
  if (!document.getElementById("search-box").contains(e.target)) {
    searchResults.classList.add("hidden");
  }
});

document.getElementById("mode-easy").addEventListener("click", () => setMode("easy"));
document.getElementById("mode-expert").addEventListener("click", () => setMode("expert"));

const infoModal = document.getElementById("info-modal");
document.getElementById("info-btn").addEventListener("click", () => infoModal.classList.remove("hidden"));
document.getElementById("info-modal-close").addEventListener("click", () => infoModal.classList.add("hidden"));
infoModal.addEventListener("click", (e) => { if (e.target === infoModal) infoModal.classList.add("hidden"); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") infoModal.classList.add("hidden"); });

const dropzone = document.getElementById("dropzone");
const pickBtn = document.getElementById("pick-folder-btn");
const pickInput = document.getElementById("pick-folder-input");

pickBtn.addEventListener("click", () => pickInput.click());
pickInput.addEventListener("change", (e) => {
  if (e.target.files.length) loadProject(Array.from(e.target.files));
});

dropzone.addEventListener("dragover", (e) => { e.preventDefault(); dropzone.classList.add("dragover"); });
dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
dropzone.addEventListener("drop", async (e) => {
  e.preventDefault();
  dropzone.classList.remove("dragover");
  const statusEl = document.getElementById("load-status");
  statusEl.className = "";
  statusEl.textContent = "Lese Ordner …";
  const files = await traverseDataTransferItems(e.dataTransfer.items);
  loadProject(files);
});

// ---------------------------------------------------------------- optional: auto-load over http(s)
// When this page is served over http/https (e.g. by the bundled
// serve_and_open.py launcher instead of opened directly as a file://
// double-click), sibling files can be fetched normally (no CORS
// restriction applies to a real http origin), so the whole project can
// load with zero clicks. Opened directly via file://, this is skipped and
// the manual picker/drag-drop above is used instead.
// GitHub Pages deployment: the raster data lives on Zenodo (files this
// large can't go through git/GitHub Pages directly -- see PUBLISHING.txt),
// while the app itself is this static site. Fill in the record ID after
// publishing the Zenodo upload.
const ZENODO_RECORD_ID = "22937496";
const RASTER_BASE_URL = `https://zenodo.org/api/records/${ZENODO_RECORD_ID}/files/`;

// The COGs are streamed with HTTP range requests, so "loading" a layer only
// reads its header (a few requests) and then fetches tile data as the map
// needs it. The composite is shown at start and best-orbit feeds the click
// popup, so those two are opened up front; the other layers are only opened
// when someone switches them on (saves rate-limit budget too).
const remoteSource = (entry) => ({ name: entry.file, url: `${RASTER_BASE_URL}${entry.file}/content` });
const isEagerLayer = (entry) => entry.defaultOn || entry.kind === "orbit";

async function tryAutoLoadOverHttp() {
  if (!location.protocol.startsWith("http")) return false;

  dropzone.classList.add("hidden");
  const msg = document.getElementById("auto-loading-msg");
  msg.classList.remove("hidden");
  const statusEl = document.getElementById("load-status");

  const eager = LAYER_MANIFEST.filter(isEagerLayer);
  try {
    // one tiny ranged request: if the record is unreachable, fall back to the
    // manual picker instead of showing an empty map
    const probe = await fetch(remoteSource(eager[0]).url, { headers: { Range: "bytes=0-15" } });
    if (!probe.ok) throw new Error(`HTTP ${probe.status}`);
  } catch (err) {
    console.warn("Auto-load: Daten nicht erreichbar:", err);
    msg.classList.add("hidden");
    dropzone.classList.remove("hidden");
    statusEl.className = "error";
    statusEl.textContent = "Automatisches Laden fehlgeschlagen. Bitte Ordner manuell auswählen.";
    return false;
  }

  msg.classList.add("hidden");
  await loadProject(eager.map(remoteSource), { lazyFetch: async (entry) => remoteSource(entry) });
  return true;
}

tryAutoLoadOverHttp();

// ---------------- collapsible sidebar ----------------
// Starts collapsed on narrow screens (phones) so the map gets the full screen.
(function () {
  const btn = document.getElementById("sidebar-toggle");
  const narrow = window.matchMedia("(max-width: 700px)");
  const setCollapsed = (collapsed) => {
    document.body.classList.toggle("sidebar-collapsed", collapsed);
    btn.setAttribute("aria-expanded", String(!collapsed));
    // on wide screens the map area grows/shrinks with the sidebar
    setTimeout(() => state.map && state.map.invalidateSize(), 300);
  };
  const toggle = (e) => {
    e.preventDefault();
    setCollapsed(!document.body.classList.contains("sidebar-collapsed"));
  };
  btn.addEventListener("click", toggle);
  // on phones, tapping the map (or dragging it) while the drawer is open closes it
  // (the Leaflet map is created later, so listen on the DOM element)
  document.getElementById("map").addEventListener("pointerdown", () => {
    if (narrow.matches && !document.body.classList.contains("sidebar-collapsed")) setCollapsed(true);
  });
  setCollapsed(narrow.matches);
  const onChange = (e) => setCollapsed(e.matches);
  narrow.addEventListener ? narrow.addEventListener("change", onChange) : narrow.addListener(onChange);
})();
