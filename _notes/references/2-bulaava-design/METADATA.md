# METADATA.md

Machine-readable map of the Bulaava Walima invitation template.

## Identity

- Template root: `/home/bug/Documents/local_projects/skill_test/bulaava-replica`
- Type: static single-page invitation, HTML + CSS + vanilla JS
- Page: `site/index.html`
- Class prefix: `.es__` / `.es--`
- Entry mode: three-knock door gate, `?embed=1` for iframe mode
- Languages: English (`en`), Urdu (`ur`)
- Text-size states: `sm` 0.92, `md` 1, `lg` 1.1 via `--ts-user`

## Files

| Path | Role |
| --- | --- |
| `site/index.html` | all markup, section-scoped styles, loader, desktop stage, gate |
| `site/assets/css/global.css` | tokens, reset, shell, shared components, loader/gate/phone CSS |
| `site/assets/js/main.js` | data, rendering, i18n, door, parallax, countdown, calendar, desktop |
| `site/assets/img/door-left.webp` | left door leaf |
| `site/assets/img/door-right.webp` | right door leaf |
| `site/assets/img/door-ring-left.webp` | left door knocker |
| `site/assets/img/door-ring-right.webp` | right door knocker |
| `site/assets/img/courtyard-night.jpg` | hero photo and blurred desktop stage |
| `site/assets/img/venue-scene.webp` | cream-to-violet scene band |
| `site/assets/img/venue-hall.webp` | venue card image |
| `site/assets/img/tea-medallion.webp` | save-the-date medallion |
| `site/assets/img/rose-divider.webp` | shared rose divider |
| `site/assets/img/corner-ornament.webp` | bismillah panel corners |
| `site/assets/img/favicon.svg` | favicon |

## Page and Sections

| Order | id | class | Description |
| --- | --- | --- | --- |
| 0 | `esLoader` | `es__loader` | entry loader, min 1.5s, max 12s |
| 0 | `esPhone` | `es__phone` | desktop-only phone chrome and iframe |
| 1 | `esHero` | `es__hero` | hero photo, hosts, couple names, scroll cue |
| 2 | `bismillah` | `es__bismillah` | bismillah, translations, Qur'an 30:21 |
| 3 | `scene` | `es__scene` | full-width venue scene band with parallax |
| 4 | `families` | `es__families` | family hosts, couple names, parentage |
| 5 | `savedate` | `es__savedate` | medallion, date, Hijri line, calendar |
| 6 | `venue` | `es__venue` | venue photo, address, map/calendar pills |
| 7 | `schedule` | `es__schedule` | arch card timeline |
| 8 | `countdown` | `es__countdown` | four SVG progress rings |
| 9 | `notes` | `es__notes` | three guest guidance cards |
| 10 | `contacts` | `es__contacts` | contact cards, call and WhatsApp actions |
| 11 | `footer` | `es__footer` | dua, signature, brand, copyright |
| overlay | `esGate` | `es__gate` | door, knock prompt, skip control |

All section styles are inline above their section. Search for `SECTION:` in `site/index.html`.

## Design Tokens

| Token | Value |
| --- | --- |
| `--es-bg` | `#2b1845` |
| `--es-bg-deep` | `#06030c` |
| `--es-text` | `#f8eefa` |
| `--es-muted` | `rgba(248,238,250,0.68)` |
| `--es-card` | `rgba(255,255,255,0.06)` |
| `--es-border` | `rgba(228,191,233,0.32)` |
| `--es-accent` | `#e4bfe9` |
| `--es-button` | `#e4bfe9` |
| `--es-button-text` | `#2b1845` |
| `--es-cream-1` | `#f8efcf` |
| `--es-cream-2` | `#f4e1bf` |
| `--es-ink` | `#2d2233` |
| `--es-ink-muted` | `rgba(45,34,51,0.7)` |
| `--es-gold` | `#6b4208` |
| `--es-violet` | `#4a1d6d` |
| `--es-font-display` | Cormorant Garamond, Georgia, serif |
| `--es-font-body` | Jost, system-ui, sans-serif |
| `--es-font-script` | Allison, cursive |
| `--es-font-arabic` | Rakkas, serif |
| `--es-font-noto` | Noto Sans Arabic, sans-serif |
| `--es-font-elmessiri` | El Messiri, Noto Sans Arabic, sans-serif |
| `--es-shadow-phone` | `0 0 90px rgba(8,2,18,0.65), 0 0 0 1px rgba(233,201,208,0.2)` |

## Event Data

| Field | Value |
| --- | --- |
| `title` | Hamza & Ayesha |
| `functionName` | Walima |
| `groomFull` | Hamza Khan |
| `brideFull` | Ayesha Amin |
| `hosts` | Mr and Mrs A. R. Khan |
| `groomParents` | Mr and Mrs A. R. Khan |
| `brideParents` | Mr and Mrs M. Amin |
| `iso` | `2026-12-03T18:00:00+05:00` |
| `time` | `6:00 pm` |
| `venue` | `Emerald Hall 8` |
| `address` | `Emerald Banquet Hall, Garden Avenue, Lahore, Pakistan` |
| `area` | `Garden Town, Lahore` |
| `mapLink` | Google Maps search for Emerald Banquet Hall, Garden Avenue, Lahore |
| `hijriOffset` | `null`; auto `-1` in `Asia/Karachi`, otherwise `0` |

Urdu variants exist for names, parents, venue, address, area, family name, signature, contact names, and initials.

## JavaScript Map

| Function | Responsibility |
| --- | --- |
| `hijriDate()` | Umm al-Qura date via `Intl.DateTimeFormat` with timezone offset |
| `renderDate()` | date labels, Hijri line, `data-field="dateShort"` |
| `renderSchedule()` | schedule rows from `SCHEDULE[lang]` |
| `renderNotes()` | note cards from `NOTES[lang]` |
| `renderContacts()` | contact cards, initial paddles, phone/WhatsApp links |
| `applyLang()` | dictionary pass, `data-field` pass, `dir`, fonts, controls |
| `setSize()` / `updateControls()` | text-size cycle and accessibility labels |
| `setupDoorSizing()` | door plate and ring geometry |
| `playKnock()` / `tone()` | Web Audio knock synthesis |
| `knockRing()` / `shakeDoor()` | knocker and door WAAPI animations |
| `onKnock()` / `openGate()` / `skipGate()` | three-knock state machine |
| `observeReveals()` | IntersectionObserver reveal system |
| `ensurePhone()` / `scalePhone()` | desktop iframe and phone scaling |
| `syncDesktop()` | desktop/embed mode switching |
| `reportBar()` | `postMessage` status-bar contrast to parent |
| `updateParallax()` | hero, scene, medallion, venue, footer parallax |
| `setupCountdown()` | countdown rings and done state |
| `buildCalendar()` | generated ICS download link |
| `startLoader()` / `finishLoader()` | font/image-gated loader |

## State Classes

| State | Meaning |
| --- | --- |
| `es-js` | JavaScript is available |
| `es-desktop` | desktop phone-stage mode |
| `es-embed` | rendered inside iframe without chrome |
| `es--entered` | gate opened; hero intro runs |
| `es--locked` | body scroll locked during gate |
| `es--ur` | Urdu/RTL mode |
| `es-reduced` | reduced-motion mode |
| `is-open`, `is-gone` | gate opening/finished |
| `is-light` | phone status bar uses light-section contrast |
| `is-sm`, `is-md`, `is-lg` | text-size labels on the Aa pill |

## External Dependencies

- Google Fonts link in `site/index.html`: Allison, Cormorant Garamond, El Messiri, Jost, Noto Sans Arabic, Rakkas, Syne.
- No JS libraries. No build artifacts. No backend.

## Documentation Set

- `README.md` — human overview and preview
- `AGENTS.md` — editing rules and verification
- `METADATA.md` — this machine-readable map
- `PAGES_AND_SECTIONS.md` — page inventory
