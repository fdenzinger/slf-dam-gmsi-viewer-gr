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
    "modal.howToRead.green": "<strong>Grün (GMSI ≥ 0.4):</strong> sehr gute Bedingungen – hier sind gute Radarmessungen wahrscheinlich.",
    "modal.howToRead.yellow": "<strong>Gelb (GMSI 0.2–0.4):</strong> Messungen sind möglich, Ergebnisse sollten aber mit Vorsicht interpretiert werden.",
    "modal.howToRead.red": "<strong>Rot (GMSI &lt; 0.2):</strong> schlechte Bedingungen – gute Messungen sind schwieriger zu erhalten, und Bewegungen können leicht übersehen werden oder sind schwer zu interpretieren. Ganz unmöglich sind Messungen aber nicht.",
    "modal.howToRead.none": "<strong>Ohne Farbe:</strong> keine Daten. Das sind Gebiete im Radarschatten oder mit Layover-Verzerrung sowie Gebiete, in denen die Radarbilder schon nach 6&nbsp;Tagen nicht mehr zuverlässig vergleichbar sind.",
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

    "verdict.blocked.title": "Nicht sichtbar",
    "verdict.blocked.text": "Dieser Ort ist von allen Satellitenbahnen aus nicht einsehbar (Layover oder Radarschatten). Hier ist mit Sentinel-1 keine Messung möglich.",
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
    "legend.gmsi.blocked": "Nicht sichtbar (Layover/Shadow)",
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
    "modal.howToRead.green": "<strong>Verde (GMSI ≥ 0,4):</strong> condizioni molto buone – qui sono probabili buone misurazioni radar.",
    "modal.howToRead.yellow": "<strong>Giallo (GMSI 0,2–0,4):</strong> le misurazioni sono possibili, ma i risultati vanno interpretati con cautela.",
    "modal.howToRead.red": "<strong>Rosso (GMSI &lt; 0,2):</strong> condizioni sfavorevoli – è più difficile ottenere buone misurazioni, e i movimenti possono essere facilmente trascurati o difficili da interpretare. Le misurazioni non sono però del tutto impossibili.",
    "modal.howToRead.none": "<strong>Senza colore:</strong> nessun dato. Si tratta di zone in ombra radar o con distorsione da layover, nonché di zone in cui le immagini radar non sono più confrontabili in modo affidabile già dopo 6&nbsp;giorni.",
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

    "verdict.blocked.title": "Non visibile",
    "verdict.blocked.text": "Questo punto non è visibile da nessuna orbita del satellite (layover od ombra radar). Qui con Sentinel-1 non è possibile alcuna misurazione.",
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
    "legend.gmsi.blocked": "Non visibile (layover/ombra)",
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
    "modal.howToRead.green": "<strong>Green (GMSI ≥ 0.4):</strong> very good conditions – good radar measurements are likely here.",
    "modal.howToRead.yellow": "<strong>Yellow (GMSI 0.2–0.4):</strong> measurements are possible, but results should be interpreted with caution.",
    "modal.howToRead.red": "<strong>Red (GMSI &lt; 0.2):</strong> poor conditions – good measurements are harder to obtain, and movements can be easily missed or difficult to interpret. Measurements are not entirely impossible, though.",
    "modal.howToRead.none": "<strong>No colour:</strong> no data. These are areas in radar shadow or with layover distortion, as well as areas where the radar images are no longer reliably comparable after just 6&nbsp;days.",
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

    "verdict.blocked.title": "Not visible",
    "verdict.blocked.text": "This location cannot be seen from any satellite track (layover or radar shadow). No measurement is possible here with Sentinel-1.",
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
    "legend.gmsi.blocked": "Not visible (layover/shadow)",
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
