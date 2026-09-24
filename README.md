# GMSI Graubünden – Web-Viewer

Browser-Viewer für den Ground Motion Sensitivity Index (GMSI, Jacquemart & Manconi 2025) im Kanton Graubünden. Er zeigt, wo sich Bodenbewegungen mit Sentinel-1-Radar (InSAR) überwachen lassen und wo nicht.

Entstanden im Rahmen des DAM-Projekts (WP1), SLF.

## Aufbau

Reine statische Website (HTML/JS/CSS, keine Build-Schritte, kein Server nötig):

- **App**: dieses Repository, veröffentlicht via GitHub Pages.
- **Rasterdaten** (~1 GB GeoTIFF/COG, EPSG:2056): liegen auf Zenodo, nicht im Repository (GitHub blockiert Dateien über 100 MB). Beim Start lädt die App nur die Übersicht und „Bester Track“ (~300 MB); die übrigen Ebenen werden erst heruntergeladen, wenn sie unter „Erweitert“ eingeschaltet werden.
- **Hintergrundkarten**: swisstopo WMS in EPSG:2056 (Landeskarte grau, SWISSIMAGE, Relief swissALTI3D / swissSURFACE3D).

Die Karte läuft nativ in LV95 (EPSG:2056), dem Koordinatensystem der GMSI-Daten – dadurch ist keine Umprojektion der Rasterdaten nötig.

## Inbetriebnahme

Die Rasterdaten liegen auf Zenodo (Record [22937496](https://zenodo.org/records/22937496), CC-BY-4.0); die Record-ID steht in `app.js` (`ZENODO_RECORD_ID`). Veröffentlichung via GitHub Pages: siehe [`PUBLISHING.txt`](PUBLISHING.txt).

## Lokal ausprobieren

```
python3 -m http.server 8000
```

und `http://localhost:8000` öffnen. Wird `index.html` direkt per Doppelklick geöffnet, erscheint stattdessen ein Ordner-Dialog, in den ein lokaler `rasters/`-Ordner mit den 12 GeoTIFFs gezogen werden kann.

## Bedienung

- **Standard**: nur die GMSI-Übersicht (bester Wert aller Tracks).
- **Erweitert**: zusätzlich „Bester Track pro Pixel“, GMSI pro Track und Shadow/Layover pro Track.
- Klick auf die Karte zeigt die Werte am Punkt; die Ortssuche nutzt die swisstopo-Suche.
- Der Button „Was zeigt diese Karte – und was nicht?“ erklärt Bedeutung und Grenzen des Index in einfacher Sprache.

## Quellen und Attribution

- GMSI: Jacquemart & Manconi (2025)
- Copernicus Sentinel-1-Daten (ESA)
- swisstopo (Hintergrundkarten, swissALTI3D, swissSURFACE3D)

## Lizenz

Noch festzulegen.
