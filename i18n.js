// Minimal i18n: a flat {de, it, en} string dictionary, a t(key, vars) lookup
// with {placeholder} substitution, and applyStaticTranslations() which
// fills every [data-i18n]/[data-i18n-html]/[data-i18n-title]/
// [data-i18n-placeholder]/[data-i18n-aria-label] element from it. German is
// the fallback if a key is ever missing in another language.
// Loaded first (before layers.js/app.js) so t() is available wherever
// labels are built.

const LANG_STORAGE_KEY = "gmsi-gr-lang";
const DEFAULT_LANG = "de";

const I18N = {
  de: {
    "app.title": "GMSI Graubünden",
    "app.subtitle": "Ground Motion Sensitivity Index – Kanton Graubünden",
    "loader.autoLoading": "Lade automatisch …",
    "dropzone.title": "Projektordner hierher ziehen",
    "dropzone.hint": "(der Ordner „GMSI_GR_product“, oder mindestens der Unterordner „rasters“)",
    "dropzone.or": "– oder –",
    "dropzone.pickButton": "Ordner auswählen",
    "search.type.peak": "Gipfel",
    "search.type.pass": "Pass",
    "search.type.lake": "See",
    "search.type.glacier": "Gletscher",
    "search.type.place": "Ort",
    "search.type.ridge": "Grat",
    "search.type.valley": "Tal",
    "search.type.name": "Flurname",
    "search.type.municipality": "Gemeinde",
    "search.type.zip": "PLZ",
    "search.type.district": "Bezirk",
    "search.type.canton": "Kanton",
    "search.type.address": "Adresse",
    "search.placeholder": "Ort suchen (z. B. Chur, Davos) …",
    "mode.standard": "Standard",
    "mode.expert": "Erweitert",
    "info.button": "ℹ️ Was zeigt diese Karte – und was nicht?",
    "info.copyright": "© WSL Institute for Snow and Avalanche Research, SLF 2026",
    "sidebar.toggle": "Seitenleiste ein-/ausblenden",
    "lang.toggle": "Sprache wechseln",

    "modal.close": "Schliessen",
    "modal.whatShows.h": "Was zeigt diese Karte?",
    "modal.whatShows.body":
      "Der <strong>GMSI (Ground Motion Sensitivity Index)</strong> zeigt, wie gut sich ein Ort im " +
      "Kanton Graubünden mit Satellitenradar (Sentinel&#8209;1) auf Bodenbewegungen überwachen lässt – " +
      "zum Beispiel für Rutschungen, Sackungen oder andere Hangbewegungen. Der Wert reicht von " +
      "0 (ungeeignet) bis 1 (sehr gut geeignet) und liegt für jeden 10×10&nbsp;Meter grossen " +
      "Bildpunkt vor.",
    "modal.howToRead.h": "Wie ist die Karte zu lesen?",
    "modal.howToRead.green": "<strong>Blau (GMSI ≥ 0.4):</strong> sehr gute Bedingungen – hier sind gute Radarmessungen wahrscheinlich.",
    "modal.howToRead.yellow": "<strong>Orange (GMSI 0.2–0.4):</strong> Messungen sind möglich, Ergebnisse sollten aber mit Vorsicht interpretiert werden.",
    "modal.howToRead.red": "<strong>Rot (GMSI &lt; 0.2):</strong> schlechte Bedingungen – gute Messungen sind schwieriger zu erhalten, und Bewegungen können leicht übersehen werden oder sind schwer zu interpretieren. Ganz unmöglich sind Messungen aber nicht.",
    "modal.howToRead.blocked": "<strong>Grau (keine Messung möglich):</strong> Gebiete im Radarschatten oder mit Layover-Verzerrung sowie Gebiete, in denen die Radarbilder schon nach 6&nbsp;Tagen nicht mehr zuverlässig vergleichbar sind. Hier liefert kein Track einen GMSI-Wert.",
    "modal.howToRead.none": "<strong>Ohne Farbe:</strong> keine Daten – Gebiete ausserhalb von Graubünden sowie Seen.",
    "modal.redWarning.h": "Wichtig: Rot heisst nicht automatisch „keine Bewegung“",
    "modal.redWarning.intro": "Ein tiefer GMSI-Wert kann ganz unterschiedliche Ursachen haben – und die Karte allein zeigt nicht, welche davon zutrifft:",
    "modal.redWarning.li1": "Die Geometrie ist ungünstig, z.&nbsp;B. ein Steilhang, den der Satellit aus seiner Blickrichtung nicht gut einsehen kann.",
    "modal.redWarning.li2": "Die Erdoberfläche verändert sich rasch, sodass die Radarbilder schnell nicht mehr vergleichbar sind – z.&nbsp;B. durch Vegetation, Schnee oder Gletscher, aber auch durch eine Rutschung, die sich schnell bewegt.",
    "modal.redWarning.li3": "Beides trifft gleichzeitig zu.",
    "modal.redWarning.outro":
      "Das heisst: Ein tiefer Wert an einer bekannten oder vermuteten Rutschung kann selbst ein " +
      "Hinweis auf die Instabilität sein – nicht nur ein Zeichen für schlechte Messbedingungen. " +
      "Ein tiefer Wert bedeutet ausserdem nicht, dass Radarmessungen unmöglich sind – es wird nur " +
      "schwieriger, mehrere gute Radarbild-Paare zu erhalten, und die Bewegungswerte sind weniger " +
      "zuverlässig.",
    "modal.whatNot.h": "Was die Karte nicht zeigt",
    "modal.whatNot.li1": "Die Karte beruht auf <strong>Sommerdaten aus den Jahren 2018–2021</strong> und zeigt damit Bestfall-Bedingungen. Bei Schneebedeckung sind zuverlässige Messungen unabhängig vom GMSI-Wert in der Regel nicht möglich.",
    "modal.whatNot.li2": "Gebiete, die sich genau während 2018–2021 stark verändert haben, können in der Karte tiefere Werte zeigen, auch wenn sich die Bedingungen seither wieder verbessert haben.",
    "modal.howMade.h": "Wie wurde die Karte erstellt? (kurz erklärt)",
    "modal.howMade.intro":
      "Grundlage sind Radaraufnahmen des Satelliten <strong>Sentinel&#8209;1</strong> (Teil des europäischen " +
      "Erdbeobachtungsprogramms Copernicus, betrieben mit der Weltraumorganisation ESA). Er überfliegt die Schweiz regelmässig und liefert " +
      "seine Radarbilder frei und öffentlich zugänglich. Der GMSI kombiniert daraus drei Faktoren " +
      "pro Bildpunkt:",
    "modal.howMade.li1": "<strong>Datenzuverlässigkeit:</strong> Wie ähnlich sieht die Erdoberfläche auf Radarbildern über die Zeit hinweg aus? Verändert sie sich schnell (z.&nbsp;B. durch Vegetation, Schnee oder Bodenbewegung), nimmt diese Ähnlichkeit rasch ab.",
    "modal.howMade.li2": "<strong>Sichtbarkeit:</strong> Kann der Satellit den Ort überhaupt „sehen“, oder liegt er im Radarschatten bzw. wird durch steiles Gelände verzerrt (Layover)?",
    "modal.howMade.li3": "<strong>Messempfindlichkeit:</strong> Radar misst Bewegung nur in Blickrichtung des Satelliten. Ein Hang, der sich seitlich zum Satelliten bewegt, ist schwerer zu erfassen als einer, der sich direkt auf ihn zu oder von ihm weg bewegt.",
    "modal.howMade.outro":
      "Da mehrere Satelliten-Bahnen (Tracks) die Schweiz aus unterschiedlichen Richtungen " +
      "überfliegen, wird zusätzlich für jeden Bildpunkt festgehalten, welche Bahn dort die besten " +
      "Ergebnisse liefert. Ascending- und Descending-Tracks blicken von gegenüberliegenden " +
      "Seiten auf einen Hang und ergänzen sich. Ein Ort, der nur in einem einzigen Track gut " +
      "messbar ist, ist anfälliger als einer, der in mehreren Tracks gut messbar ist.",
    "modal.workflow.h": "Empfohlenes Vorgehen",
    "modal.workflow.li1": "<strong>Übersicht:</strong> Mit der GMSI-Übersicht prüfen, ob ein Gebiet grundsätzlich mit Radar überwacht werden kann.",
    "modal.workflow.li2": "<strong>Track wählen:</strong> Mit „Bester Track pro Pixel“ herausfinden, welche Satelliten-Bahn dort die besten Ergebnisse liefert.",
    "modal.workflow.li3": "<strong>GMSI pro Track:</strong> Die Karte dieser Bahn ansehen und prüfen, ob die Blickrichtung zur erwarteten Bewegungsrichtung des Hangs passt.",
    "modal.workflow.li4": "<strong>Shadow/Layover pro Track:</strong> Bei Unklarheiten prüfen, ob der Ort für diese Bahn im Radarschatten liegt oder durch Layover verzerrt ist.",
    "modal.source":
      "Quelle: Jacquemart &amp; Manconi (2025). Datengrundlage: Kohärenzbilder des Satelliten " +
      "Sentinel&#8209;1 (ESA/Copernicus), Sommer 2018–2021; digitales Höhenmodell (Gelände).",

    "basemap.switch": "Hintergrundkarte wechseln",
    "basemap.grau": "Landeskarte grau",
    "basemap.swissimage": "SWISSIMAGE",
    "basemap.alti3d": "Relief swissALTI3D (Gelände)",
    "basemap.surface3d": "Relief swissSURFACE3D (Oberfläche)",
    "share.copyLink": "Link zu dieser Ansicht kopieren",
    "share.promptTitle": "Link zu dieser Ansicht:",
    "share.copied": "Link kopiert",

    "verdict.blocked.title": "Keine Messung möglich",
    "verdict.blocked.text": "An diesem Ort liefert kein Track einen GMSI-Wert, weil er durch Layover oder Radarschatten nicht einsehbar ist. Hier ist mit Sentinel-1 keine Messung möglich.",
    "verdict.none.title": "Keine Daten",
    "verdict.none.text": "An dieser Stelle liegen keine Werte vor: entweder ausserhalb von Graubünden oder in keinem Track auswertbar (Radarschatten, Layover oder zu geringe Kohärenz).",
    "verdict.good.title": "Gut geeignet",
    "verdict.good.text": "Hier sind gute Radarmessungen mit Sentinel‑1 wahrscheinlich.",
    "verdict.mid.title": "Eingeschränkt geeignet",
    "verdict.mid.text": "Messungen sind möglich, die Ergebnisse sollten aber mit Vorsicht interpretiert werden.",
    "verdict.bad.title": "Schwierig",
    "verdict.bad.text": "Gute Messungen sind hier schwer zu erhalten. Ein tiefer Wert kann an der Geometrie liegen oder an einer sich rasch verändernden Oberfläche (z. B. Vegetation, Schnee, Gletscher oder eine Rutschung).",

    "summary.loadingAllTracks": "Lade alle Tracks …",
    "summary.table.track": "Track",
    "summary.table.direction": "Richtung",
    "summary.table.gmsi": "GMSI",
    "summary.shadowLayover": "Schatten/Layover",
    "summary.noData": "keine Daten",
    "summary.msg.none": "In keinem Track sind gute Werte (≥ 0.4) vorhanden.",
    "summary.msg.one": "Nur in einem Track gut messbar – das ist anfälliger als Orte, die in mehreren Tracks gut messbar sind.",
    "summary.msg.many": "In {good} von {total} Tracks gut messbar – die Messbarkeit ist robust.",
    "summary.loading": "Lade …",
    "summary.bestTrack": "Bester Track: ",
    "summary.compareAllBtn": "Alle Tracks vergleichen",
    "summary.elevation": " m ü. M.",
    "summary.note": "Basierend auf Sommerdaten 2018–2021. Bei Schneebedeckung sind zuverlässige Messungen in der Regel nicht möglich.",

    "load.noMatchingFiles": "Keine passenden GMSI-Dateien im ausgewählten Ordner gefunden.\nBitte den Ordner „GMSI_GR_product“ (oder „rasters“) auswählen.",
    "load.loadingOverview": "Lade Übersicht …",
    "load.loadingN": "Lade {found} von {total} Ebenen …",
    "load.loadedMissing": "Geladen. Nicht gefunden (übersprungen): {missing}",
    "load.layerLoading": "lädt …",
    "load.layerError": "Fehler beim Laden",
    "load.readingFolder": "Lese Ordner …",
    "load.autoFailed": "Automatisches Laden fehlgeschlagen. Bitte Ordner manuell auswählen.",

    "sidebar.opacity": "Transparenz",
    "sidebar.opacityAria": "Transparenz {label}",
    "legend.h": "Legende",
    "legend.gmsiTitle": "GMSI",
    "legend.trackTitle": "Track",
    "legend.shadowTitle": "Shadow/Layover",
    "legend.gmsi.green": "GMSI ≥ 0.4 – sehr gute Bedingungen",
    "legend.gmsi.yellow": "GMSI 0.2 – 0.4 – Messungen möglich, aber mit Vorsicht",
    "legend.gmsi.red": "GMSI < 0.2 – schlechte Bedingungen",
    "legend.gmsi.blocked": "Keine Messung möglich (Layover/Shadow)",
    "area.sizeWithData": "Fläche: {area} · davon mit Daten: {data}",
    "area.border": "Grenzgebiet: {pct} % der Fläche liegen ausserhalb von Graubünden oder auf einem See. Dort gibt es keine Daten. Die Prozentwerte beziehen sich nur auf die Fläche mit Daten.",
    "area.title": "Flächenauswertung",
    "area.drawBtn": "Fläche zeichnen und auswerten",
    "area.uploadBtn": "Fläche aus Datei laden (GeoJSON, GPKG, KML, KMZ)",
    "area.computing": "Wird berechnet …",
    "area.error": "Die Auswertung ist fehlgeschlagen. Bitte erneut versuchen.",
    "area.size": "Fläche: {area}",
    "area.class.good": "GMSI ≥ 0.4 – sehr gut",
    "area.class.mid": "GMSI 0.2–0.4 – mit Vorsicht",
    "area.class.bad": "GMSI < 0.2 – schlecht",
    "area.class.blocked": "Keine Messung möglich (Layover/Shadow)",
    "area.class.nodata": "Keine Daten (ausserhalb, See)",
    "area.sum.good": "Auf {good} % der Fläche sind die Bedingungen sehr gut. Die Fläche ist insgesamt gut für Radarmessungen geeignet.",
    "area.sum.mixed": "Nur auf {good} % der Fläche sind die Bedingungen sehr gut, auf {usable} % sind Messungen möglich. Die Eignung ist gemischt.",
    "area.sum.poor": "Auf {poor} % der Fläche sind Messungen schlecht oder nicht möglich. Radarmessungen sind hier nur eingeschränkt geeignet.",
    "area.sum.none": "In dieser Fläche liegen keine auswertbaren Werte vor.",
    "area.bestTracks": "Bester Track (Anteil der auswertbaren Fläche)",
    "area.note": "Auswertung auf dem 10-m-Raster mit dem besten Wert aller Tracks. Rot heisst nicht automatisch „keine Bewegung“.",
    "area.noteApprox": "Grosse Fläche: Auswertung mit ca. {cell} m Rasterweite, die Anteile sind Näherungswerte.",
    "area.hintDraw": "Eckpunkte anklicken. Doppelklick oder Enter schliesst die Fläche ab, Esc bricht ab.",
    "area.hintFinish": "Weiter klicken. Doppelklick, Enter oder ein Klick auf den ersten Punkt schliesst ab.",
    "area.hintMin": "Mindestens drei Punkte nötig.",
    "area.importNone": "Keine Polygone in der Datei gefunden.",
    "area.importError": "Datei konnte nicht gelesen werden (GeoJSON, GPKG, KML oder KMZ erwartet).",
    "area.importReading": "Datei wird gelesen …",
    "area.importCrs": "Koordinatensystem (EPSG:{srs}) wird nicht unterstützt. Bitte als WGS84 oder LV95 speichern.",
    "measure.btn": "Strecke messen",
    "measure.hintDraw": "Punkte anklicken. Doppelklick oder Enter beendet die Messung, Esc bricht ab.",
    "measure.hintFinish": "Weiter klicken. Doppelklick, Enter oder ein Klick auf den letzten Punkt beendet die Messung.",
    "measure.hintMin": "Mindestens zwei Punkte nötig.",
    "measure.horizontal": "Horizontale Länge (nicht entlang des Geländes)",
    "tour.button": "🧭 Kurzes Tutorial",
    "tour.next": "Weiter",
    "tour.prev": "Zurück",
    "tour.done": "Fertig",
    "tour.close": "Tutorial beenden",
    "tour.stepOf": "{n} / {total}",
    "tour.replay": "Demo wiederholen",
    "tour.offer.text": "Neu hier? Eine kurze Einführung zeigt dir die wichtigsten Funktionen.",
    "tour.offer.start": "Tutorial starten",
    "tour.offer.later": "Nicht jetzt",
    "tour.sidebar.title": "Seitenleiste",
    "tour.sidebar.text": "Links liegt die <strong>Seitenleiste</strong>. Hier legst du fest, <strong>was</strong> die Karte zeigt: Sprache, Ortssuche, Modus (Standard oder Erweitert), die Ebenen mit ihrer Transparenz und die Legende.",
    "tour.map.title": "Kartenbereich",
    "tour.map.text": "Rechts liegt der <strong>Kartenbereich</strong>. Hier siehst du das Ergebnis und arbeitest direkt auf der Karte: zoomen, Stellen abfragen, Flächen auswerten, Strecken messen, die Basiskarte wechseln und Ansichten teilen.",
    "tour.fold.title": "Seitenleiste ein- und ausklappen",
    "tour.fold.text": "Mit dem <strong>Pfeil</strong> am Rand klappst du die Seitenleiste ein und aus – so bekommt die Karte die ganze Breite.",
    "tour.lang.title": "Sprache",
    "tour.lang.text": "Oben links wechselst du die <strong>Sprache</strong> der Karte und aller Texte: Deutsch, Italienisch oder Englisch. Deine Wahl wird im Browser gemerkt.",
    "tour.zoom.title": "Zoomen und Verschieben",
    "tour.zoom.text": "Mit <strong>+</strong> und <strong>−</strong> zoomst du in die Karte hinein und wieder heraus. Das geht auch mit dem <strong>Mausrad</strong> oder mit zwei Fingern auf dem Touchscreen. <strong>Verschieben</strong> kannst du die Karte, indem du sie mit gedrückter Maustaste ziehst (am Touchscreen mit einem Finger).",
    "tour.layers.title": "Ebenen (Layer)",
    "tour.layers.text": "Eine Ebene ist eine Kartenschicht, die über der Basiskarte liegt. Hier schaltest du Ebenen an und aus. Jede Zeile ist eine Ebene mit Kontrollkästchen und Farbfeld. Die Ebenen sind in Gruppen geordnet (1, 2 …).",
    "tour.overview.title": "GMSI Übersicht",
    "tour.overview.text": "Das ist die Hauptkarte. Sie <strong>kombiniert alle Satellitenbahnen (Tracks)</strong>: An jeder Stelle zeigt sie den <strong>besten GMSI-Wert</strong>, den irgendein Track dort erreicht. Die Farben: <strong>Blau</strong> = sehr gute Bedingungen (GMSI ≥ 0.4), <strong>Orange</strong> = Messungen mit Vorsicht (0.2–0.4), <strong>Rot</strong> = schlechte Bedingungen (&lt; 0.2), <strong>Grau</strong> = in keinem Track eine Messung möglich (Layover/Shadow).",
    "tour.toggle.title": "Ebene an- und ausschalten",
    "tour.toggle.text": "Mit dem <strong>Kontrollkästchen</strong> blendest du die Ebene ein oder aus. Darunter stellt der <strong>Transparenz-Schieber</strong> ein, wie stark die Basiskarte durchscheint (0 % = deckend, 100 % = unsichtbar). Der Schieber erscheint nur bei eingeschalteten Ebenen.",
    "tour.modes.title": "Modus wechseln",
    "tour.modes.text": "Mit <strong>Standard / Erweitert</strong> wählst du die Ansicht. <strong>Standard</strong> ist die übersichtliche Ansicht für den Alltag: die kombinierte Übersicht und der beste Track. <strong>Erweitert</strong> ist für die Detailanalyse: Du siehst zusätzlich jeden Track einzeln samt Shadow/Layover-Flächen und kannst Ebenen frei kombinieren. Beim Wechsel zurück auf Standard werden die Track-Ebenen wieder ausgeschaltet.",
    "tour.standard.title": "Standard-Modus",
    "tour.standard.text": "<strong>Standard</strong> zeigt nur das Wichtigste: die <strong>Übersicht</strong> (bester Wert aller Satellitenbahnen) und auf Wunsch den <strong>besten Track pro Pixel</strong>. Beim Wechsel zu Standard werden alle anderen Ebenen ausgeschaltet.",
    "tour.best.title": "Bester Track pro Pixel",
    "tour.best.text": "Diese Ebene zeigt, <strong>welche Satellitenbahn (Track)</strong> an jeder Stelle den besten GMSI-Wert liefert. Jeder Track hat eine eigene Farbe, die du in der Legende findest. Das hilft bei der Wahl des Tracks für einen Hang.",
    "tour.legend.title": "Legende",
    "tour.legend.text": "Die Legende erklärt die Farben der eingeschalteten Ebenen: <strong>Blau</strong> = sehr gut, <strong>Orange</strong> = mit Vorsicht, <strong>Rot</strong> = schlecht, <strong>Grau</strong> = keine Messung möglich (Layover/Shadow). Sie passt sich an, wenn du Ebenen ein- oder ausschaltest.",
    "tour.expert.title": "Erweitert-Modus",
    "tour.expert.text": "<strong>Erweitert</strong> zeigt zusätzlich die Gruppen 3 und 4 mit Ebenen für einzelne Tracks. Jetzt kannst du <strong>mehrere Ebenen gleichzeitig</strong> einschalten, z. B. einen Track zusammen mit seinen Shadow-Flächen.",
    "tour.tracks.title": "GMSI pro Track",
    "tour.tracks.text": "Für jede Satellitenbahn gibt es eine eigene Ebene (z. B. <strong>A015</strong>, <strong>D066</strong>). <strong>A</strong> = aufsteigende Bahn (blickt nach Osten), <strong>D</strong> = absteigende Bahn (blickt nach Westen), die Zahl ist die Bahnnummer. Ein Hang, den ein Track schlecht sieht, erfasst oft ein anderer gut. Die Übersicht nimmt pro Pixel den besten Wert.",
    "tour.shadow.title": "Shadow/Layover pro Track",
    "tour.shadow.text": "Diese Ebenen zeigen in <strong>Grau</strong>, wo ein Track wegen der <strong>Hangausrichtung</strong> zum Satelliten nichts messen kann (Radarschatten oder Layover). Schaltest du die Ebene allein ein, siehst du diese Flächen am besten. Zusammen mit dem GMSI desselben Tracks erkennst du, warum dort Lücken sind.",
    "tour.search.title": "Ort suchen",
    "tour.search.text": "Gib einen Ort ein, z. B. eine Gemeinde, einen Gipfel, einen Pass oder einen See, und wähle einen Vorschlag: Die Karte springt dorthin. Die Vorschläge erscheinen schon beim Tippen.",
    "tour.point.title": "Einen Punkt prüfen",
    "tour.point.text": "Klicke irgendwo auf die Karte. Du erhältst eine Einschätzung für diese Stelle (Ampelfarbe und GMSI-Wert) und den besten Track.",
    "tour.compare.title": "Alle Tracks vergleichen",
    "tour.compare.text": "Im Popup vergleichst du mit <strong>„Alle Tracks vergleichen“</strong> die Satellitenbahnen an dieser Stelle: Pro Track siehst du den GMSI-Wert oder den Grund, warum keiner vorliegt (z. B. Radarschatten).",
    "tour.area.title": "Eine Fläche auswerten",
    "tour.area.text": "Mit dem <strong>Polygon-Symbol</strong> zeichnest du eine Fläche (Doppelklick schliesst ab). Mit dem <strong>Pfeil-Symbol</strong> kannst du stattdessen ein Polygon aus einer Datei hochladen (GeoJSON, GPKG, KML, KMZ). Die Auswertung zeigt, wie viel der Fläche gut, mit Vorsicht, schlecht oder nicht messbar ist, und welcher Track am besten passt.",
    "tour.measure.title": "Strecke messen",
    "tour.measure.text": "Mit dem <strong>Lineal</strong> misst du Strecken: Du klickst Punkte an und siehst an jedem die bisherige Länge, am Ende die Gesamtlänge. Doppelklick, Enter oder ein Klick auf den letzten Punkt beendet die Messung, Esc bricht ab. Gemessen wird die horizontale Länge, nicht die Strecke am Hang. Der <strong>Massstab</strong> unten links hilft bei der Einordnung.",
    "tour.base.title": "Basiskarte wechseln",
    "tour.base.text": "Unten links wechselst du die <strong>Basiskarte</strong> unter den Daten: die graue Landeskarte, das <strong>Luftbild</strong> (swissimage) oder Reliefdarstellungen. Das Luftbild hilft zu erkennen, was am Boden liegt (Wald, Fels, Gebäude), das Relief zeigt die Geländeform.",
    "tour.share.title": "Ansicht teilen",
    "tour.share.text": "Das <strong>Link-Symbol</strong> kopiert einen Link, der genau diese Ansicht wieder öffnet: Kartenausschnitt, eingeschaltete Ebenen, Basiskarte und der markierte Punkt. Praktisch zum Weitergeben.",
    "tour.note.title": "Wichtig zu wissen",
    "tour.note.text": "<strong>Rot heisst nicht automatisch „keine Bewegung“.</strong> Es zeigt nur, dass Radar hier schlecht misst, z. B. wegen Geometrie, Vegetation, Schnee, Gletschern oder schnellen Rutschungen. Mehr dazu in diesem Dialog.",
    "legend.shadow": "Keine Messung möglich (Radarschatten / Layover)",

    "layer.composite": "GMSI Übersicht (bester Wert aller Tracks)",
    "layer.bestOrbit": "Bester Track pro Pixel",
    "group.1": "1 – Übersicht",
    "group.2": "2 – Track wählen",
    "group.3": "3 – GMSI pro Track",
    "group.4": "4 – Shadow/Layover pro Track",

    "track.hinweis.a088": "nur sehr kleine Abdeckung (~1%) im Kantonsgebiet",
  },

  it: {
    "app.title": "GMSI Grigioni",
    "app.subtitle": "Ground Motion Sensitivity Index – Cantone dei Grigioni",
    "loader.autoLoading": "Caricamento automatico …",
    "dropzone.title": "Trascina qui la cartella del progetto",
    "dropzone.hint": "(la cartella «GMSI_GR_product», o almeno la sottocartella «rasters»)",
    "dropzone.or": "– oppure –",
    "dropzone.pickButton": "Scegli cartella",
    "search.type.peak": "Cima",
    "search.type.pass": "Passo",
    "search.type.lake": "Lago",
    "search.type.glacier": "Ghiacciaio",
    "search.type.place": "Località",
    "search.type.ridge": "Cresta",
    "search.type.valley": "Valle",
    "search.type.name": "Toponimo",
    "search.type.municipality": "Comune",
    "search.type.zip": "NPA",
    "search.type.district": "Distretto",
    "search.type.canton": "Cantone",
    "search.type.address": "Indirizzo",
    "search.placeholder": "Cerca un luogo (p. es. Coira, Davos) …",
    "mode.standard": "Standard",
    "mode.expert": "Avanzato",
    "info.button": "ℹ️ Cosa mostra questa carta – e cosa non mostra?",
    "info.copyright": "© WSL Institute for Snow and Avalanche Research, SLF 2026",
    "sidebar.toggle": "Mostra/nascondi barra laterale",
    "lang.toggle": "Cambia lingua",

    "modal.close": "Chiudi",
    "modal.whatShows.h": "Cosa mostra questa carta?",
    "modal.whatShows.body":
      "Il <strong>GMSI (Ground Motion Sensitivity Index)</strong> indica quanto bene un luogo nel " +
      "Cantone dei Grigioni può essere monitorato con il radar satellitare (Sentinel&#8209;1) per " +
      "individuare movimenti del terreno – per esempio frane, cedimenti o altri movimenti di versante. " +
      "Il valore va da 0 (non adatto) a 1 (molto adatto) ed è disponibile per ogni pixel di " +
      "10×10&nbsp;metri.",
    "modal.howToRead.h": "Come si legge la carta?",
    "modal.howToRead.green": "<strong>Blu (GMSI ≥ 0,4):</strong> condizioni molto buone – qui sono probabili buone misurazioni radar.",
    "modal.howToRead.yellow": "<strong>Arancione (GMSI 0,2–0,4):</strong> le misurazioni sono possibili, ma i risultati vanno interpretati con cautela.",
    "modal.howToRead.red": "<strong>Rosso (GMSI &lt; 0,2):</strong> condizioni sfavorevoli – è più difficile ottenere buone misurazioni, e i movimenti possono essere facilmente trascurati o difficili da interpretare. Le misurazioni non sono però del tutto impossibili.",
    "modal.howToRead.blocked": "<strong>Grigio (nessuna misurazione possibile):</strong> zone in ombra radar o con distorsione da layover, nonché zone in cui le immagini radar non sono più confrontabili in modo affidabile già dopo 6&nbsp;giorni. Qui nessun track fornisce un valore GMSI.",
    "modal.howToRead.none": "<strong>Senza colore:</strong> nessun dato – zone fuori dai Grigioni e laghi.",
    "modal.redWarning.h": "Importante: rosso non significa automaticamente «nessun movimento»",
    "modal.redWarning.intro": "Un valore GMSI basso può avere cause molto diverse – e la carta da sola non mostra quale si applichi:",
    "modal.redWarning.li1": "La geometria è sfavorevole, p.&nbsp;es. un pendio ripido che il satellite non riesce a osservare bene dalla sua angolazione.",
    "modal.redWarning.li2": "La superficie del terreno cambia rapidamente, per cui le immagini radar smettono presto di essere confrontabili – p.&nbsp;es. a causa della vegetazione, della neve o dei ghiacciai, ma anche di una frana che si muove velocemente.",
    "modal.redWarning.li3": "Entrambe le cose si verificano contemporaneamente.",
    "modal.redWarning.outro":
      "In altre parole: un valore basso in corrispondenza di una frana nota o presunta può essere " +
      "esso stesso un indizio di instabilità – non solo un segno di cattive condizioni di misurazione. " +
      "Un valore basso non significa inoltre che le misurazioni radar siano impossibili – diventa solo " +
      "più difficile ottenere diverse buone coppie di immagini radar, e i valori di movimento sono meno " +
      "affidabili.",
    "modal.whatNot.h": "Cosa non mostra la carta",
    "modal.whatNot.li1": "La carta si basa su <strong>dati estivi degli anni 2018–2021</strong> e mostra quindi condizioni ottimali. In presenza di copertura nevosa, misurazioni affidabili non sono generalmente possibili, indipendentemente dal valore GMSI.",
    "modal.whatNot.li2": "Le zone che sono cambiate molto proprio durante il periodo 2018–2021 possono mostrare valori più bassi sulla carta, anche se le condizioni sono migliorate nel frattempo.",
    "modal.howMade.h": "Come è stata creata la carta? (breve spiegazione)",
    "modal.howMade.intro":
      "La base sono immagini radar del satellite <strong>Sentinel&#8209;1</strong> (parte del programma " +
      "europeo di osservazione della Terra Copernicus, gestito con l'agenzia spaziale ESA). Sorvola regolarmente la Svizzera e " +
      "mette a disposizione le sue immagini radar in modo libero e pubblico. Il GMSI combina tre fattori " +
      "per ogni pixel:",
    "modal.howMade.li1": "<strong>Affidabilità dei dati:</strong> quanto si assomiglia la superficie del terreno nelle immagini radar nel tempo? Se cambia rapidamente (p.&nbsp;es. a causa di vegetazione, neve o movimenti del terreno), questa somiglianza diminuisce in fretta.",
    "modal.howMade.li2": "<strong>Visibilità:</strong> il satellite riesce a «vedere» il luogo, oppure questo si trova in ombra radar o è distorto da un terreno ripido (layover)?",
    "modal.howMade.li3": "<strong>Sensibilità di misura:</strong> il radar misura il movimento solo nella direzione di vista del satellite. Un pendio che si muove lateralmente rispetto al satellite è più difficile da rilevare di uno che si muove direttamente verso di esso o in allontanamento.",
    "modal.howMade.outro":
      "Poiché più orbite satellitari (track) sorvolano la Svizzera da direzioni diverse, per ogni " +
      "pixel viene inoltre registrato quale orbita fornisce lì i risultati migliori. Le orbite " +
      "ascendenti e discendenti osservano un versante da lati opposti e si completano a vicenda. Un " +
      "luogo misurabile correttamente su un'unica orbita è più vulnerabile di uno misurabile su più " +
      "orbite.",
    "modal.workflow.h": "Procedura consigliata",
    "modal.workflow.li1": "<strong>Panoramica:</strong> verificare con la panoramica GMSI se una zona può in linea di principio essere monitorata con il radar.",
    "modal.workflow.li2": "<strong>Scegliere l'orbita:</strong> usare «Migliore orbita per pixel» per scoprire quale orbita satellitare fornisce lì i risultati migliori.",
    "modal.workflow.li3": "<strong>GMSI per orbita:</strong> consultare la carta di quell'orbita e verificare se la direzione di vista corrisponde alla direzione di movimento attesa del versante.",
    "modal.workflow.li4": "<strong>Shadow/Layover per orbita:</strong> in caso di dubbi, verificare se il luogo si trova in ombra radar o è distorto da layover per quell'orbita.",
    "modal.source":
      "Fonte: Jacquemart &amp; Manconi (2025). Dati di base: immagini di coerenza del satellite " +
      "Sentinel&#8209;1 (ESA/Copernicus), estate 2018–2021; modello digitale del terreno.",

    "basemap.switch": "Cambia sfondo cartografico",
    "basemap.grau": "Carta nazionale grigia",
    "basemap.swissimage": "SWISSIMAGE",
    "basemap.alti3d": "Rilievo swissALTI3D (terreno)",
    "basemap.surface3d": "Rilievo swissSURFACE3D (superficie)",
    "share.copyLink": "Copia il link di questa vista",
    "share.promptTitle": "Link di questa vista:",
    "share.copied": "Link copiato",

    "verdict.blocked.title": "Nessuna misurazione possibile",
    "verdict.blocked.text": "In questo punto nessuna orbita fornisce un valore GMSI, perché è nascosto da layover od ombra radar. Qui con Sentinel-1 non è possibile alcuna misurazione.",
    "verdict.none.title": "Nessun dato",
    "verdict.none.text": "In questo punto non sono disponibili valori: o è fuori dai Grigioni, oppure non è valutabile su nessuna orbita (ombra radar, layover o coerenza troppo bassa).",
    "verdict.good.title": "Ben adatto",
    "verdict.good.text": "Qui sono probabili buone misurazioni radar con Sentinel‑1.",
    "verdict.mid.title": "Adatto con riserve",
    "verdict.mid.text": "Le misurazioni sono possibili, ma i risultati vanno interpretati con cautela.",
    "verdict.bad.title": "Difficile",
    "verdict.bad.text": "Qui è difficile ottenere buone misurazioni. Un valore basso può dipendere dalla geometria o da una superficie che cambia rapidamente (p. es. vegetazione, neve, ghiacciai o una frana).",

    "summary.loadingAllTracks": "Caricamento di tutte le orbite …",
    "summary.table.track": "Orbita",
    "summary.table.direction": "Direzione",
    "summary.table.gmsi": "GMSI",
    "summary.shadowLayover": "Ombra/Layover",
    "summary.noData": "nessun dato",
    "summary.msg.none": "Nessuna orbita mostra buoni valori (≥ 0,4).",
    "summary.msg.one": "Misurabile correttamente solo su un'orbita – più vulnerabile rispetto ai luoghi misurabili su più orbite.",
    "summary.msg.many": "Misurabile correttamente su {good} delle {total} orbite – la misurabilità è robusta.",
    "summary.loading": "Caricamento …",
    "summary.bestTrack": "Orbita migliore: ",
    "summary.compareAllBtn": "Confronta tutte le orbite",
    "summary.elevation": " m s.l.m.",
    "summary.note": "Basato su dati estivi 2018–2021. In presenza di copertura nevosa, misurazioni affidabili non sono generalmente possibili.",

    "load.noMatchingFiles": "Nessun file GMSI corrispondente trovato nella cartella selezionata.\nSelezionare la cartella «GMSI_GR_product» (o «rasters»).",
    "load.loadingOverview": "Caricamento della panoramica …",
    "load.loadingN": "Caricamento di {found} su {total} livelli …",
    "load.loadedMissing": "Caricato. Non trovati (ignorati): {missing}",
    "load.layerLoading": "caricamento …",
    "load.layerError": "Errore di caricamento",
    "load.readingFolder": "Lettura della cartella …",
    "load.autoFailed": "Il caricamento automatico non è riuscito. Selezionare la cartella manualmente.",

    "sidebar.opacity": "Trasparenza",
    "sidebar.opacityAria": "Trasparenza {label}",
    "legend.h": "Legenda",
    "legend.gmsiTitle": "GMSI",
    "legend.trackTitle": "Orbita",
    "legend.shadowTitle": "Ombra/Layover",
    "legend.gmsi.green": "GMSI ≥ 0,4 – condizioni molto buone",
    "legend.gmsi.yellow": "GMSI 0,2 – 0,4 – misurazioni possibili, ma con cautela",
    "legend.gmsi.red": "GMSI < 0,2 – condizioni sfavorevoli",
    "legend.gmsi.blocked": "Nessuna misurazione possibile (layover/ombra)",
    "area.sizeWithData": "Superficie: {area} · di cui con dati: {data}",
    "area.border": "Zona di confine: il {pct} % della superficie si trova fuori dai Grigioni o su un lago. Lì non ci sono dati. Le percentuali si riferiscono solo alla superficie con dati.",
    "area.title": "Valutazione dell'area",
    "area.drawBtn": "Disegnare e valutare un'area",
    "area.uploadBtn": "Caricare un'area da file (GeoJSON, GPKG, KML, KMZ)",
    "area.computing": "Calcolo in corso …",
    "area.error": "La valutazione non è riuscita. Riprovare.",
    "area.size": "Superficie: {area}",
    "area.class.good": "GMSI ≥ 0,4 – molto buono",
    "area.class.mid": "GMSI 0,2–0,4 – con cautela",
    "area.class.bad": "GMSI < 0,2 – sfavorevole",
    "area.class.blocked": "Nessuna misurazione possibile (layover/ombra)",
    "area.class.nodata": "Nessun dato (fuori area, lago)",
    "area.sum.good": "Sul {good} % della superficie le condizioni sono molto buone. Nel complesso l'area è adatta alle misurazioni radar.",
    "area.sum.mixed": "Solo sul {good} % della superficie le condizioni sono molto buone; sul {usable} % le misurazioni sono possibili. L'idoneità è mista.",
    "area.sum.poor": "Sul {poor} % della superficie le misurazioni sono sfavorevoli o impossibili. Le misurazioni radar sono qui adatte solo in modo limitato.",
    "area.sum.none": "In quest'area non sono disponibili valori valutabili.",
    "area.bestTracks": "Orbita migliore (quota della superficie valutabile)",
    "area.note": "Valutazione sul raster di 10 m con il valore migliore di tutte le orbite. Rosso non significa automaticamente «nessun movimento».",
    "area.noteApprox": "Area grande: valutazione con una risoluzione di circa {cell} m, le quote sono valori approssimati.",
    "area.hintDraw": "Cliccare i vertici. Doppio clic o Invio chiude l'area, Esc annulla.",
    "area.hintFinish": "Continuare a cliccare. Doppio clic, Invio o un clic sul primo punto chiude l'area.",
    "area.hintMin": "Servono almeno tre punti.",
    "area.importNone": "Nessun poligono trovato nel file.",
    "area.importError": "Impossibile leggere il file (atteso GeoJSON, GPKG, KML o KMZ).",
    "area.importReading": "Lettura del file …",
    "area.importCrs": "Il sistema di coordinate (EPSG:{srs}) non è supportato. Salvare in WGS84 o LV95.",
    "measure.btn": "Misurare una distanza",
    "measure.hintDraw": "Cliccare i punti. Doppio clic o Invio termina la misura, Esc annulla.",
    "measure.hintFinish": "Continuare a cliccare. Doppio clic, Invio o un clic sull'ultimo punto termina la misura.",
    "measure.hintMin": "Servono almeno due punti.",
    "measure.horizontal": "Lunghezza orizzontale (non lungo il terreno)",
    "tour.button": "🧭 Breve tutorial",
    "tour.next": "Avanti",
    "tour.prev": "Indietro",
    "tour.done": "Fine",
    "tour.close": "Chiudere il tutorial",
    "tour.stepOf": "{n} / {total}",
    "tour.replay": "Ripetere la demo",
    "tour.offer.text": "Nuovo qui? Una breve introduzione mostra le funzioni principali.",
    "tour.offer.start": "Avviare il tutorial",
    "tour.offer.later": "Non ora",
    "tour.sidebar.title": "Barra laterale",
    "tour.sidebar.text": "A sinistra c'è la <strong>barra laterale</strong>. Qui stabilisci <strong>cosa</strong> mostra la carta: lingua, ricerca dei luoghi, modalità (Standard o Avanzato), i livelli con la loro trasparenza e la legenda.",
    "tour.map.title": "Area della carta",
    "tour.map.text": "A destra c'è l'<strong>area della carta</strong>. Qui vedi il risultato e lavori direttamente sulla carta: zoom, interrogare punti, valutare aree, misurare distanze, cambiare la carta di base e condividere le viste.",
    "tour.fold.title": "Aprire e chiudere la barra laterale",
    "tour.fold.text": "Con la <strong>freccia</strong> sul bordo apri e chiudi la barra laterale – così la carta occupa tutta la larghezza.",
    "tour.lang.title": "Lingua",
    "tour.lang.text": "In alto a sinistra cambi la <strong>lingua</strong> della carta e di tutti i testi: tedesco, italiano o inglese. La tua scelta viene ricordata nel browser.",
    "tour.zoom.title": "Zoom e spostamento",
    "tour.zoom.text": "Con <strong>+</strong> e <strong>−</strong> ingrandisci e riduci la carta. Funziona anche con la <strong>rotella del mouse</strong> o con due dita sul touchscreen. Per <strong>spostare</strong> la carta la trascini tenendo premuto il tasto del mouse (sul touchscreen con un dito).",
    "tour.layers.title": "Livelli (layer)",
    "tour.layers.text": "Un livello è uno strato della carta sovrapposto alla carta di base. Qui attivi e disattivi i livelli. Ogni riga è un livello con casella di controllo e campione di colore. I livelli sono ordinati in gruppi (1, 2 …).",
    "tour.overview.title": "GMSI Panoramica",
    "tour.overview.text": "Questa è la carta principale. <strong>Combina tutte le orbite del satellite (track)</strong>: in ogni punto mostra il <strong>valore GMSI migliore</strong> raggiunto da un qualsiasi track. I colori: <strong>blu</strong> = condizioni molto buone (GMSI ≥ 0,4), <strong>arancione</strong> = misurazioni con cautela (0,2–0,4), <strong>rosso</strong> = condizioni sfavorevoli (&lt; 0,2), <strong>grigio</strong> = in nessun track è possibile una misurazione (layover/ombra).",
    "tour.toggle.title": "Attivare e disattivare un livello",
    "tour.toggle.text": "Con la <strong>casella di controllo</strong> mostri o nascondi il livello. Sotto, il <strong>cursore di trasparenza</strong> regola quanto traspare la carta di base (0 % = coprente, 100 % = invisibile). Il cursore compare solo per i livelli attivi.",
    "tour.modes.title": "Cambiare modalità",
    "tour.modes.text": "Con <strong>Standard / Avanzato</strong> scegli la vista. <strong>Standard</strong> è la vista semplice per l'uso quotidiano: la panoramica combinata e il track migliore. <strong>Avanzato</strong> serve all'analisi di dettaglio: vedi in più ogni track singolarmente con le aree di ombra/layover e puoi combinare liberamente i livelli. Tornando a Standard, i livelli dei track vengono disattivati.",
    "tour.standard.title": "Modalità Standard",
    "tour.standard.text": "<strong>Standard</strong> mostra solo l'essenziale: la <strong>panoramica</strong> (valore migliore di tutte le orbite) e, se vuoi, il <strong>track migliore per pixel</strong>. Passando a Standard, tutti gli altri livelli vengono disattivati.",
    "tour.best.title": "Track migliore per pixel",
    "tour.best.text": "Questo livello mostra <strong>quale orbita del satellite (track)</strong> fornisce il valore GMSI migliore in ogni punto. Ogni track ha un proprio colore, indicato nella legenda. Aiuta a scegliere il track per un versante.",
    "tour.legend.title": "Legenda",
    "tour.legend.text": "La legenda spiega i colori dei livelli attivi: <strong>blu</strong> = molto buono, <strong>arancione</strong> = con cautela, <strong>rosso</strong> = sfavorevole, <strong>grigio</strong> = nessuna misurazione possibile (layover/ombra). Si adatta quando attivi o disattivi i livelli.",
    "tour.expert.title": "Modalità Avanzato",
    "tour.expert.text": "<strong>Avanzato</strong> mostra in più i gruppi 3 e 4 con i livelli dei singoli track. Ora puoi attivare <strong>più livelli contemporaneamente</strong>, ad es. un track con le sue aree d'ombra.",
    "tour.tracks.title": "GMSI per track",
    "tour.tracks.text": "Per ogni orbita c'è un livello proprio (ad es. <strong>A015</strong>, <strong>D066</strong>). <strong>A</strong> = orbita ascendente (guarda verso est), <strong>D</strong> = orbita discendente (guarda verso ovest), il numero è il numero dell'orbita. Un versante che un track vede male è spesso ben coperto da un altro. La panoramica prende il valore migliore per pixel.",
    "tour.shadow.title": "Ombra/layover per track",
    "tour.shadow.text": "Questi livelli mostrano in <strong>grigio</strong> dove un track non può misurare nulla a causa dell'<strong>esposizione del versante</strong> rispetto al satellite (ombra radar o layover). Se attivi il livello da solo, queste aree si vedono meglio. Insieme al GMSI dello stesso track capisci perché lì ci sono lacune.",
    "tour.search.title": "Cercare un luogo",
    "tour.search.text": "Inserisci un luogo, ad es. un comune, una cima, un passo o un lago, e scegli un suggerimento: la carta salta lì. I suggerimenti compaiono già mentre scrivi.",
    "tour.point.title": "Verificare un punto",
    "tour.point.text": "Clicca in un punto qualsiasi della carta. Ottieni una valutazione per quel punto (colore e valore GMSI) e il track migliore.",
    "tour.compare.title": "Confrontare tutte le orbite",
    "tour.compare.text": "Nel popup, con <strong>«Confronta tutte le orbite»</strong> confronti le orbite del satellite in quel punto: per ogni track vedi il valore GMSI o il motivo per cui manca (ad es. ombra radar).",
    "tour.area.title": "Valutare un'area",
    "tour.area.text": "Con il <strong>simbolo del poligono</strong> disegni un'area (il doppio clic la chiude). Con il <strong>simbolo della freccia</strong> puoi invece caricare un poligono da un file (GeoJSON, GPKG, KML, KMZ). La valutazione mostra quanta parte dell'area è buona, con cautela, sfavorevole o non misurabile e quale track è il più adatto.",
    "tour.measure.title": "Misurare una distanza",
    "tour.measure.text": "Con il <strong>righello</strong> misuri distanze: clicchi dei punti e vedi la lunghezza finora a ogni punto e, alla fine, la lunghezza totale. Doppio clic, Invio o un clic sull'ultimo punto termina la misura, Esc annulla. Si misura la lunghezza orizzontale, non quella lungo il versante. La <strong>scala</strong> in basso a sinistra aiuta a orientarsi.",
    "tour.base.title": "Cambiare la carta di base",
    "tour.base.text": "In basso a sinistra cambi la <strong>carta di base</strong> sotto i dati: la carta nazionale grigia, l'<strong>ortofoto</strong> (swissimage) o rappresentazioni del rilievo. L'ortofoto aiuta a riconoscere cosa c'è al suolo (bosco, roccia, edifici), il rilievo mostra la forma del terreno.",
    "tour.share.title": "Condividere la vista",
    "tour.share.text": "Il <strong>simbolo del link</strong> copia un link che riapre esattamente questa vista: dettaglio della carta, livelli attivi, carta di base e punto selezionato. Utile per condividere.",
    "tour.note.title": "Da sapere",
    "tour.note.text": "<strong>Rosso non significa automaticamente «nessun movimento».</strong> Indica solo che qui il radar misura male, ad es. per la geometria, la vegetazione, la neve, i ghiacciai o frane veloci. Maggiori dettagli in questa finestra.",
    "legend.shadow": "Nessuna misurazione possibile (ombra radar / layover)",

    "layer.composite": "Panoramica GMSI (miglior valore di tutte le orbite)",
    "layer.bestOrbit": "Migliore orbita per pixel",
    "group.1": "1 – Panoramica",
    "group.2": "2 – Scegliere l'orbita",
    "group.3": "3 – GMSI per orbita",
    "group.4": "4 – Shadow/Layover per orbita",

    "track.hinweis.a088": "copertura molto ridotta (~1%) nel territorio cantonale",
  },

  en: {
    "app.title": "GMSI Graubünden",
    "app.subtitle": "Ground Motion Sensitivity Index – canton of Graubünden",
    "loader.autoLoading": "Loading automatically …",
    "dropzone.title": "Drag the project folder here",
    "dropzone.hint": "(the „GMSI_GR_product“ folder, or at least the „rasters“ subfolder)",
    "dropzone.or": "– or –",
    "dropzone.pickButton": "Choose folder",
    "search.type.peak": "Peak",
    "search.type.pass": "Pass",
    "search.type.lake": "Lake",
    "search.type.glacier": "Glacier",
    "search.type.place": "Place",
    "search.type.ridge": "Ridge",
    "search.type.valley": "Valley",
    "search.type.name": "Place name",
    "search.type.municipality": "Municipality",
    "search.type.zip": "Postcode",
    "search.type.district": "District",
    "search.type.canton": "Canton",
    "search.type.address": "Address",
    "search.placeholder": "Search for a place (e.g. Chur, Davos) …",
    "mode.standard": "Standard",
    "mode.expert": "Advanced",
    "info.button": "ℹ️ What does this map show – and what doesn't it show?",
    "info.copyright": "© WSL Institute for Snow and Avalanche Research, SLF 2026",
    "sidebar.toggle": "Show/hide sidebar",
    "lang.toggle": "Switch language",

    "modal.close": "Close",
    "modal.whatShows.h": "What does this map show?",
    "modal.whatShows.body":
      "The <strong>GMSI (Ground Motion Sensitivity Index)</strong> shows how well a location in " +
      "the canton of Graubünden can be monitored for ground motion using satellite radar (Sentinel&#8209;1) – " +
      "for example for landslides, subsidence or other slope movements. The value ranges from " +
      "0 (unsuitable) to 1 (very well suited) and is given for every 10×10&nbsp;metre " +
      "pixel.",
    "modal.howToRead.h": "How to read the map",
    "modal.howToRead.green": "<strong>Blue (GMSI ≥ 0.4):</strong> very good conditions – good radar measurements are likely here.",
    "modal.howToRead.yellow": "<strong>Orange (GMSI 0.2–0.4):</strong> measurements are possible, but results should be interpreted with caution.",
    "modal.howToRead.red": "<strong>Red (GMSI &lt; 0.2):</strong> poor conditions – good measurements are harder to obtain, and movements can be easily missed or difficult to interpret. Measurements are not entirely impossible, though.",
    "modal.howToRead.blocked": "<strong>Grey (no measurement possible):</strong> areas in radar shadow or with layover distortion, as well as areas where the radar images are no longer reliably comparable after just 6&nbsp;days. No track provides a GMSI value here.",
    "modal.howToRead.none": "<strong>No colour:</strong> no data – areas outside Graubünden and lakes.",
    "modal.redWarning.h": "Important: red doesn't automatically mean “no movement”",
    "modal.redWarning.intro": "A low GMSI value can have very different causes – and the map alone doesn't show which one applies:",
    "modal.redWarning.li1": "The geometry is unfavourable, e.&nbsp;g. a steep slope that the satellite cannot see well from its viewing angle.",
    "modal.redWarning.li2": "The ground surface changes quickly, so the radar images stop being comparable soon – e.&nbsp;g. due to vegetation, snow or glaciers, but also due to a landslide that is moving fast.",
    "modal.redWarning.li3": "Both apply at the same time.",
    "modal.redWarning.outro":
      "In other words: a low value at a known or suspected landslide can itself be a sign of " +
      "instability – not just a sign of poor measurement conditions. A low value also doesn't mean " +
      "that radar measurements are impossible – it just becomes harder to obtain several good radar " +
      "image pairs, and the movement values are less reliable.",
    "modal.whatNot.h": "What the map doesn't show",
    "modal.whatNot.li1": "The map is based on <strong>summer data from 2018–2021</strong> and therefore shows best-case conditions. With snow cover, reliable measurements are generally not possible regardless of the GMSI value.",
    "modal.whatNot.li2": "Areas that changed a lot specifically during 2018–2021 may show lower values on the map, even if conditions have since improved again.",
    "modal.howMade.h": "How was the map created? (brief explanation)",
    "modal.howMade.intro":
      "The basis is radar imagery from the <strong>Sentinel&#8209;1</strong> satellite (part of the European " +
      "Copernicus Earth observation programme, operated with the ESA space agency). It flies over Switzerland regularly and makes " +
      "its radar images freely and publicly available. The GMSI combines three factors " +
      "per pixel:",
    "modal.howMade.li1": "<strong>Data reliability:</strong> how similar does the ground surface look on radar images over time? If it changes quickly (e.&nbsp;g. due to vegetation, snow or ground motion), this similarity drops fast.",
    "modal.howMade.li2": "<strong>Visibility:</strong> can the satellite even “see” the location, or is it in radar shadow or distorted by steep terrain (layover)?",
    "modal.howMade.li3": "<strong>Measurement sensitivity:</strong> radar only measures motion in the satellite's line of sight. A slope that moves sideways relative to the satellite is harder to detect than one that moves directly towards or away from it.",
    "modal.howMade.outro":
      "Since several satellite orbits (tracks) fly over Switzerland from different directions, " +
      "the map also records, for every pixel, which track gives the best results there. " +
      "Ascending and descending tracks look at a slope from opposite sides and complement each " +
      "other. A location that is only well measurable on a single track is more vulnerable than " +
      "one that is well measurable on several tracks.",
    "modal.workflow.h": "Recommended workflow",
    "modal.workflow.li1": "<strong>Overview:</strong> use the GMSI overview to check whether an area can in principle be monitored with radar.",
    "modal.workflow.li2": "<strong>Choose a track:</strong> use “Best track per pixel” to find out which satellite track gives the best results there.",
    "modal.workflow.li3": "<strong>GMSI per track:</strong> look at that track's map and check whether its viewing direction matches the slope's expected direction of movement.",
    "modal.workflow.li4": "<strong>Shadow/Layover per track:</strong> if anything is unclear, check whether the location is in radar shadow or distorted by layover for that track.",
    "modal.source":
      "Source: Jacquemart &amp; Manconi (2025). Underlying data: coherence images from the " +
      "Sentinel&#8209;1 satellite (ESA/Copernicus), summer 2018–2021; digital terrain model.",

    "basemap.switch": "Switch basemap",
    "basemap.grau": "National map (grey)",
    "basemap.swissimage": "SWISSIMAGE",
    "basemap.alti3d": "Relief swissALTI3D (terrain)",
    "basemap.surface3d": "Relief swissSURFACE3D (surface)",
    "share.copyLink": "Copy link to this view",
    "share.promptTitle": "Link to this view:",
    "share.copied": "Link copied",

    "verdict.blocked.title": "No measurement possible",
    "verdict.blocked.text": "No track provides a GMSI value at this location because it is hidden by layover or radar shadow. No measurement is possible here with Sentinel-1.",
    "verdict.none.title": "No data",
    "verdict.none.text": "No values are available at this location: either outside Graubünden or not evaluable on any track (radar shadow, layover, or too little coherence).",
    "verdict.good.title": "Well suited",
    "verdict.good.text": "Good radar measurements with Sentinel‑1 are likely here.",
    "verdict.mid.title": "Suited with caveats",
    "verdict.mid.text": "Measurements are possible, but results should be interpreted with caution.",
    "verdict.bad.title": "Difficult",
    "verdict.bad.text": "Good measurements are hard to obtain here. A low value can be due to the geometry or to a rapidly changing surface (e.g. vegetation, snow, glaciers or a landslide).",

    "summary.loadingAllTracks": "Loading all tracks …",
    "summary.table.track": "Track",
    "summary.table.direction": "Direction",
    "summary.table.gmsi": "GMSI",
    "summary.shadowLayover": "Shadow/Layover",
    "summary.noData": "no data",
    "summary.msg.none": "No track has good values (≥ 0.4).",
    "summary.msg.one": "Only well measurable on a single track – that's more vulnerable than locations measurable on several tracks.",
    "summary.msg.many": "Well measurable on {good} of {total} tracks – measurability is robust.",
    "summary.loading": "Loading …",
    "summary.bestTrack": "Best track: ",
    "summary.compareAllBtn": "Compare all tracks",
    "summary.elevation": " m a.s.l.",
    "summary.note": "Based on summer data 2018–2021. With snow cover, reliable measurements are generally not possible.",

    "load.noMatchingFiles": "No matching GMSI files found in the selected folder.\nPlease select the „GMSI_GR_product“ folder (or „rasters“).",
    "load.loadingOverview": "Loading overview …",
    "load.loadingN": "Loading {found} of {total} layers …",
    "load.loadedMissing": "Loaded. Not found (skipped): {missing}",
    "load.layerLoading": "loading …",
    "load.layerError": "Error loading",
    "load.readingFolder": "Reading folder …",
    "load.autoFailed": "Automatic loading failed. Please select a folder manually.",

    "sidebar.opacity": "Opacity",
    "sidebar.opacityAria": "Opacity {label}",
    "legend.h": "Legend",
    "legend.gmsiTitle": "GMSI",
    "legend.trackTitle": "Track",
    "legend.shadowTitle": "Shadow/Layover",
    "legend.gmsi.green": "GMSI ≥ 0.4 – very good conditions",
    "legend.gmsi.yellow": "GMSI 0.2 – 0.4 – measurements possible, but with caution",
    "legend.gmsi.red": "GMSI < 0.2 – poor conditions",
    "legend.gmsi.blocked": "No measurement possible (layover/shadow)",
    "area.sizeWithData": "Area: {area} · of which with data: {data}",
    "area.border": "Border area: {pct} % of the area lies outside Graubünden or on a lake. There is no data there. The percentages refer only to the part with data.",
    "area.title": "Area assessment",
    "area.drawBtn": "Draw and assess an area",
    "area.uploadBtn": "Load an area from a file (GeoJSON, GPKG, KML, KMZ)",
    "area.computing": "Calculating …",
    "area.error": "The assessment failed. Please try again.",
    "area.size": "Area: {area}",
    "area.class.good": "GMSI ≥ 0.4 – very good",
    "area.class.mid": "GMSI 0.2–0.4 – with caution",
    "area.class.bad": "GMSI < 0.2 – poor",
    "area.class.blocked": "No measurement possible (layover/shadow)",
    "area.class.nodata": "No data (outside, lake)",
    "area.sum.good": "Conditions are very good on {good} % of the area. Overall the area is well suited to radar measurements.",
    "area.sum.mixed": "Conditions are very good on only {good} % of the area; measurements are possible on {usable} %. Suitability is mixed.",
    "area.sum.poor": "Measurements are poor or not possible on {poor} % of the area. Radar measurements are only of limited suitability here.",
    "area.sum.none": "This area contains no assessable values.",
    "area.bestTracks": "Best track (share of the assessable area)",
    "area.note": "Assessed on the 10 m grid using the best value of all tracks. Red doesn't automatically mean “no movement”.",
    "area.noteApprox": "Large area: assessed at about {cell} m grid spacing, so the shares are approximate.",
    "area.hintDraw": "Click the corner points. Double-click or Enter closes the area, Esc cancels.",
    "area.hintFinish": "Keep clicking. Double-click, Enter or a click on the first point closes the area.",
    "area.hintMin": "At least three points are needed.",
    "area.importNone": "No polygons found in the file.",
    "area.importError": "The file could not be read (GeoJSON, GPKG, KML or KMZ expected).",
    "area.importReading": "Reading file …",
    "area.importCrs": "The coordinate system (EPSG:{srs}) is not supported. Please save as WGS84 or LV95.",
    "measure.btn": "Measure distance",
    "measure.hintDraw": "Click points. Double-click or Enter ends the measurement, Esc cancels.",
    "measure.hintFinish": "Keep clicking. Double-click, Enter or a click on the last point ends the measurement.",
    "measure.hintMin": "At least two points are needed.",
    "measure.horizontal": "Horizontal length (not along the terrain)",
    "tour.button": "🧭 Quick tutorial",
    "tour.next": "Next",
    "tour.prev": "Back",
    "tour.done": "Done",
    "tour.close": "End tutorial",
    "tour.stepOf": "{n} / {total}",
    "tour.replay": "Replay demo",
    "tour.offer.text": "New here? A short introduction shows you the main features.",
    "tour.offer.start": "Start tutorial",
    "tour.offer.later": "Not now",
    "tour.sidebar.title": "Sidebar",
    "tour.sidebar.text": "On the left is the <strong>sidebar</strong>. This is where you decide <strong>what</strong> the map shows: language, place search, mode (Standard or Advanced), the layers with their transparency and the legend.",
    "tour.map.title": "Map area",
    "tour.map.text": "On the right is the <strong>map area</strong>. This is where you see the result and work directly on the map: zoom, query spots, assess areas, measure distances, change the basemap and share views.",
    "tour.fold.title": "Fold the sidebar away",
    "tour.fold.text": "The <strong>arrow</strong> on its edge folds the sidebar away and back – the map then gets the full width.",
    "tour.lang.title": "Language",
    "tour.lang.text": "At the top left you change the <strong>language</strong> of the map and all texts: German, Italian or English. Your choice is remembered in the browser.",
    "tour.zoom.title": "Zoom and pan",
    "tour.zoom.text": "<strong>+</strong> and <strong>−</strong> zoom the map in and out. The <strong>mouse wheel</strong> or two fingers on a touch screen work too. <strong>Pan</strong> the map by dragging it with the mouse button held down (one finger on a touch screen).",
    "tour.layers.title": "Layers",
    "tour.layers.text": "A layer is a map overlay on top of the basemap. This is where you switch layers on and off. Each row is a layer with a checkbox and a colour swatch. Layers are arranged in groups (1, 2 …).",
    "tour.overview.title": "GMSI overview",
    "tour.overview.text": "This is the main map. It <strong>combines all satellite tracks</strong>: at each location it shows the <strong>best GMSI value</strong> that any track reaches there. The colours: <strong>blue</strong> = very good conditions (GMSI ≥ 0.4), <strong>orange</strong> = measurements with caution (0.2–0.4), <strong>red</strong> = poor conditions (&lt; 0.2), <strong>grey</strong> = no measurement possible in any track (layover/shadow).",
    "tour.toggle.title": "Switch a layer on and off",
    "tour.toggle.text": "The <strong>checkbox</strong> shows or hides the layer. Below it, the <strong>transparency slider</strong> sets how much of the basemap shows through (0 % = opaque, 100 % = invisible). The slider only appears for layers that are switched on.",
    "tour.modes.title": "Switch mode",
    "tour.modes.text": "<strong>Standard / Advanced</strong> selects the view. <strong>Standard</strong> is the clear view for everyday use: the combined overview and the best track. <strong>Advanced</strong> is for detailed analysis: you also see every track on its own with its shadow/layover areas and can combine layers freely. Switching back to Standard turns the track layers off.",
    "tour.standard.title": "Standard mode",
    "tour.standard.text": "<strong>Standard</strong> shows only the essentials: the <strong>overview</strong> (best value of all satellite tracks) and, if you like, the <strong>best track per pixel</strong>. Switching to Standard turns all other layers off.",
    "tour.best.title": "Best track per pixel",
    "tour.best.text": "This layer shows <strong>which satellite track</strong> gives the best GMSI value at each location. Each track has its own colour, listed in the legend. It helps you choose the track for a slope.",
    "tour.legend.title": "Legend",
    "tour.legend.text": "The legend explains the colours of the layers that are switched on: <strong>blue</strong> = very good, <strong>orange</strong> = with caution, <strong>red</strong> = poor, <strong>grey</strong> = no measurement possible (layover/shadow). It adapts when you switch layers on or off.",
    "tour.expert.title": "Advanced mode",
    "tour.expert.text": "<strong>Advanced</strong> also shows groups 3 and 4 with layers for single tracks. You can now switch on <strong>several layers at once</strong>, e.g. a track together with its shadow areas.",
    "tour.tracks.title": "GMSI per track",
    "tour.tracks.text": "Each satellite track has its own layer (e.g. <strong>A015</strong>, <strong>D066</strong>). <strong>A</strong> = ascending pass (looks east), <strong>D</strong> = descending pass (looks west), the number is the track number. A slope one track sees poorly is often covered well by another. The overview takes the best value per pixel.",
    "tour.shadow.title": "Shadow/layover per track",
    "tour.shadow.text": "These layers show in <strong>grey</strong> where a track cannot measure anything because of the <strong>slope orientation</strong> relative to the satellite (radar shadow or layover). Switched on alone, these areas are easiest to see. Together with the GMSI of the same track you can tell why there are gaps.",
    "tour.search.title": "Find a place",
    "tour.search.text": "Enter a place, e.g. a municipality, a peak, a pass or a lake, and pick a suggestion: the map jumps there. Suggestions appear as you type.",
    "tour.point.title": "Check a point",
    "tour.point.text": "Click anywhere on the map. You get an assessment for that spot (traffic-light colour and GMSI value) and the best track.",
    "tour.compare.title": "Compare all tracks",
    "tour.compare.text": "In the popup, <strong>“Compare all tracks”</strong> compares the satellite tracks at this spot: for each track you see the GMSI value or the reason there is none (e.g. radar shadow).",
    "tour.area.title": "Assess an area",
    "tour.area.text": "Use the <strong>polygon symbol</strong> to draw an area (double-click closes it). Use the <strong>arrow symbol</strong> instead to upload a polygon from a file (GeoJSON, GPKG, KML, KMZ). The assessment shows how much of the area is good, with caution, poor or not measurable, and which track fits best.",
    "tour.measure.title": "Measure a distance",
    "tour.measure.text": "The <strong>ruler</strong> measures distances: click points to see the length so far at each one and the total at the end. Double-click, Enter or a click on the last point ends the measurement, Esc cancels. The horizontal length is measured, not the length along the slope. The <strong>scale bar</strong> at the bottom left helps with orientation.",
    "tour.base.title": "Change the basemap",
    "tour.base.text": "At the bottom left you change the <strong>basemap</strong> beneath the data: the grey national map, the <strong>aerial image</strong> (swissimage) or relief views. The aerial image helps to see what is on the ground (forest, rock, buildings), the relief shows the shape of the terrain.",
    "tour.share.title": "Share the view",
    "tour.share.text": "The <strong>link symbol</strong> copies a link that reopens exactly this view: map section, switched-on layers, basemap and the marked point. Handy for passing on.",
    "tour.note.title": "Good to know",
    "tour.note.text": "<strong>Red doesn't automatically mean “no movement”.</strong> It only shows that radar measures poorly here, e.g. because of geometry, vegetation, snow, glaciers or fast landslides. More on this in this dialog.",
    "legend.shadow": "No measurement possible (radar shadow / layover)",

    "layer.composite": "GMSI overview (best value across all tracks)",
    "layer.bestOrbit": "Best track per pixel",
    "group.1": "1 – Overview",
    "group.2": "2 – Choose track",
    "group.3": "3 – GMSI per track",
    "group.4": "4 – Shadow/Layover per track",

    "track.hinweis.a088": "only very small coverage (~1%) within the canton",
  },
};

function getLang() {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (stored && I18N[stored]) return stored;
  } catch (err) { /* private browsing / blocked storage: fall through to default */ }
  return DEFAULT_LANG;
}

let currentLang = getLang();

function t(key, vars) {
  let s = (I18N[currentLang] && I18N[currentLang][key]) ?? I18N[DEFAULT_LANG][key] ?? key;
  if (vars) for (const k in vars) s = s.replaceAll(`{${k}}`, vars[k]);
  return s;
}

// Fills every static data-i18n* element from the current language. Dynamic
// UI built in app.js (sidebar, legend, popups) re-reads t() directly on its
// own render path instead, since it's rebuilt from scratch each time anyway.
function applyStaticTranslations() {
  document.documentElement.lang = currentLang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    el.innerHTML = t(el.getAttribute("data-i18n-html"));
  });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    el.title = t(el.getAttribute("data-i18n-title"));
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
    el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria-label")));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
  });
}

function setLang(lang) {
  if (!I18N[lang] || lang === currentLang) return;
  currentLang = lang;
  try { localStorage.setItem(LANG_STORAGE_KEY, lang); } catch (err) { /* ignore */ }
  applyStaticTranslations();
  document.querySelectorAll(".lang-btn").forEach((el) => {
    el.classList.toggle("active", el.dataset.lang === lang);
  });
  if (typeof onLangChange === "function") onLangChange();
}

// initial paint: apply whatever language was stored (or the default) to the
// static markup and the toggle buttons before app.js builds anything dynamic
document.querySelectorAll(".lang-btn").forEach((el) => {
  el.classList.toggle("active", el.dataset.lang === currentLang);
  el.addEventListener("click", () => setLang(el.dataset.lang));
});
applyStaticTranslations();
