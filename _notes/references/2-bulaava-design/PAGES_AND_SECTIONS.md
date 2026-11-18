# PAGES_AND_SECTIONS.md

## Pages

| Page | File | Purpose |
| --- | --- | --- |
| Invitation | `site/index.html` | Single-page Walima invitation with entry gate, desktop stage, and embed mode |

## Invitation Page Sections

| # | Section | id | What it contains | Behavior |
| --- | --- | --- | --- | --- |
| 1 | Hero | `esHero` | courtyard photo, hosts, couple names, scroll cue | entrance after gate, photo parallax, wordmark and controls |
| 2 | Bismillah & Verse | `bismillah` | bismillah, English/Urdu meanings, Qur'an 30:21 | scroll reveal, cream panel with corner ornaments |
| 3 | Venue Scene Band | `scene` | full-width venue-scene image | parallax and mask transition from cream to violet |
| 4 | Families | `families` | hosts, couple names, parentage | staggered reveals and script typography |
| 5 | Save the Date | `savedate` | medallion, weekday/day/month/year, time, Hijri date, calendar pill | rotating medallion, generated ICS download |
| 6 | Venue | `venue` | hall image, venue name, address, map and calendar pills | image reveal, external map link, ICS download |
| 7 | Schedule | `schedule` | evening timeline inside an arch card | staggered row reveals |
| 8 | Countdown | `countdown` | four rings for days/hours/minutes/seconds | live countdown and done state |
| 9 | Notes | `notes` | three practical guest notes | card reveals |
| 10 | Contacts | `contacts` | two contact cards with initials, phone, call, WhatsApp | tel and WhatsApp links |
| 11 | Footer | `footer` | dua, translation, signature, family name, brand | reveals over darkened courtyard image |

## Entry Layers

| Layer | id | Role |
| --- | --- | --- |
| Page loader | `esLoader` | logo, progress bar, minimum 1.5s, waits for fonts/images |
| Desktop stage | `es__stage` (`esPhone`) | blurred courtyard stage plus scaled 416x870 phone frame |
| Door gate | `esGate` | three-knock entry, animated knockers, swinging leaves, skip control |

## Layouts

- The page shell is `#esShell` (`.es__shell`) with a fixed utility control cluster.
- Desktop uses `#esPhoneScreen` as an iframe viewport and `es-embed` to suppress the stage.
- There are no decomposed `sample-pages/` or `layouts/` folders in this build; section markup lives directly in `site/index.html`.

## Interaction Checklist

- Door: three knocks, optional skip, reduced-motion fallback.
- Language: English/Urdu with RTL and localized names, venue, schedule, notes, contacts.
- Text size: 0.92 / 1 / 1.1 cycle without horizontal overflow at 390px.
- Desktop: 1440x900 phone stage, iframe opening, status-bar contrast changes.
- Embed: `?embed=1` hides the desktop stage and keeps the invitation full-screen.
- Calendar: `Add to calendar` downloads a generated `.ics` file.
