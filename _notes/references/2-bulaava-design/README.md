# Bulaava Walima Invitation

A static HTML/CSS/JavaScript replica of the Bulaava Walima invitation. It preserves the source's cream-and-violet visual language, door-knock entry sequence, scroll reveals, parallax, countdown, English/Urdu toggle, text-size control, and desktop phone presentation. All personal details are placeholders.

## Preview

From the repository root:

```bash
python3 -m http.server 8765
```

Open `http://localhost:8765/bulaava-replica/site/`.

There is no build step. Google Fonts are loaded from a CDN, so the first load needs internet access. All other behavior is in `site/assets/js/main.js`.

## Structure

```text
bulaava-replica/
├── site/
│   ├── index.html                  single-page invitation
│   └── assets/
│       ├── css/global.css          tokens, reset, shell, overlays, phone chrome
│       ├── js/main.js              interaction, i18n, date, countdown, desktop stage
│       └── img/                    door, venue, medallion, ornament, favicon
├── README.md
├── AGENTS.md
├── METADATA.md
└── PAGES_AND_SECTIONS.md
```

The `components/` and `sample-pages/` buckets from the broader HTML-template convention are not included; this project ships the working site only.

## Controls

- Knock the door three times, or use **Skip**.
- Switch between English and Urdu with **اردو / English**.
- Cycle text sizes with **Aa**.
- On desktop, the invitation runs inside a scaled phone frame; the page background uses the blurred courtyard image.
- `?embed=1` renders the invitation without the desktop frame for use inside an iframe.

## Notes

The event data, names, phone numbers, and venue are fictional placeholders. The design is a study of the original invitation; verify rights before reusing its imagery or copy commercially.

See [PAGES_AND_SECTIONS.md](PAGES_AND_SECTIONS.md) for the page inventory and [AGENTS.md](AGENTS.md) for editing rules.
