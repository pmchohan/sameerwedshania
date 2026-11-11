# Engineering conventions

## Stack and dependencies

- Vite, React, TypeScript, React Router. One styling system: CSS variables as tokens plus CSS Modules (or plain CSS); pick one and stay with it.
- Dependencies to start: `react`, `react-dom`, `react-router-dom`, `@fontsource/*`, `vitest`. Animation is CSS plus a small reveal hook. Add `motion` only for choreography CSS cannot express cleanly. Anything else needs a one-line reason in the reply.
- Guests land directly on `/<code>`, so the opening and hero stay in the first bundle. Lazy-load only below-the-fold sections, heavy art and the Urdu font, and only if the size target needs it.

## Components

One component per file, named exports, CapitalCase. Organise by type, not by page. Pages are thin: they compose sections. Sections are built from the components below.

```
project/src/
├── config/        invitation.config.ts, types.ts, validate.ts
├── i18n/          LanguageProvider, useLang, resolveLang, strings.ts, formatDate, formatTime
├── routes/        index.ts (route table from config, data only, no JSX)
├── middleware/    InviteMiddleware.tsx (code to guest; unknown goes to "/")
├── layouts/       SiteLayout/
├── pages/guest/
│   ├── CodeEntry/        CodeEntry.tsx, components/CodeForm
│   └── Invitation/       Invitation.tsx (owns the phase: closed, opening, open)
│       ├── sections/     Opening/ (Opening, DoorLeaf, Seal), HeroSection, EventsSection, ClosingSection
│       └── components/   ScrollCue
├── components/
│   ├── atoms/            Button, LinkButton
│   ├── controls/         LanguageToggle
│   ├── cards/            EventCard (generic, data-driven; used for all three events)
│   ├── maps/             MapButton
│   ├── motion/           Reveal
│   └── ornaments/        Mehrab, Jali, Divider, Sparkle
├── hooks/                useReveal, useScrollLock
├── theme/                tokens and font setup (CSS variables)
├── App.tsx               the only file that turns route data into router objects
└── main.tsx
```

Rules:

- Per-event differences (title, accent, ornament) come from data and theme tokens, not from `MehndiCard.tsx` style copies.
- Tokens, not magic values. No hex, px or font literals in component files.
- A new shared component lives in `components/<type>/`. A piece used by one page lives in that page's `components/`.

## `frontend-dev` as applied

Followed: routes as data, guard as middleware, generic components by type, naming, tokens, a11y basics.

Waived (single-purpose app, per ponytail): role groups beyond `guest`, layouts beyond `SiteLayout`, Redux or any store (use React state and context), Playwright snapshot and axe suites, one test per component, per-component README, fixtures and index files.

## Tests (Vitest)

Pure logic only:

- config validation
- code normalisation and guest lookup
- guest-to-visible-events filter, including fixed order, in English and Urdu
- date and time formatting, including a timezone-shift case
- language precedence
- route-table generation

UI is checked visually (see below). Run `git diff --check` before saying docs are done.

## Head and accessibility

- `<html lang dir>`, `viewport-fit=cover`, `theme-color`, `robots: noindex,nofollow`, generic og tags ("Sameer & Hania — you're invited"). Link previews cannot be per-guest on a static host. The og image must obey the palette bans.
- `<title>` is derived from the current guest and language only.
- Semantic landmarks and headings, visible focus, labelled inputs, ornaments `aria-hidden`, reduced motion honoured, maps open with `target="_blank" rel="noopener"`.
- No embedded map and no map SDK. The map button uses `venue.mapUrl`.

## Performance

Aim for first paint of the opening under about 2 s on a mid-range Android over 4G, and an initial load of about 250 KB gzipped or less (JS, CSS, first-load fonts). Report the Urdu font size separately. Prefer inline SVG and CSS ornaments over raster. Images as WebP or AVIF. Animate `transform` and `opacity`.

## Build output and hosting

- Hosting is GitHub Pages: the content of `project/dist` is published to the `gh-pages` branch. Today `dist/index.html` is only a deployment test page.
- Until the owner says to deploy, set Vite `build.outDir` to `dist-next` and gitignore it. To launch, switch to the owner's deploy method.
- GitHub Pages has no rewrites, so `/<code>` paths would 404. When development starts, add a build step that copies `index.html` to `404.html`.
- The domain is `sameerwedshania.qd.je`: put a `CNAME` file with that name in `public/` and keep Vite `base` as `/`.
- There is no `.gitignore` yet. Create one with `node_modules`, `dist-next` and `.env*`. Do not ignore `dist`.
- Commit PRODUCT.md, DESIGN.md, `.impeccable/config.json` and `.impeccable/surfaces/`. Do not gitignore `.impeccable/` as a whole.

## Commands (in `project/`)

`npm run dev`, `npm run build`, `npm run preview`, `npm test`. For a phone on the same network: `npm run dev -- --host`.

## Checking visually

This machine has Firefox but no Chrome or Chromium. Use Firefox headless for screenshots (`firefox --headless --screenshot <file> --window-size=390,844 <url>`; check flags with `firefox --help`). Ask before downloading a Playwright browser. Firefox is not WebKit, so the owner must check a real iPhone and a real Android phone, and the WhatsApp in-app browser.

## Definition of done

- `/` shows the code screen; a wrong code gives a friendly message; a right code plays the opening, then the hero, then only the invited events.
- Test guests (walima only, two events, all three) show no names, dates or venues of events they are not invited to, in English and Urdu.
- The language toggle works on every screen, persists, and never shifts or hides content.
- Screenshots at 320, 390, 430, 768 and 1280: no horizontal scroll, no clipped Urdu, readable contrast.
- Checked on a real phone and in the WhatsApp in-app browser, with reduced motion on, and with CPU and network throttled.
- Colour audit: no banned hue in CSS, SVG, raster assets or the og image.
- `npm run build` is clean, tests pass, size is near the target, Urdu font size reported.
- Final reply states what was built, then the ponytail closing line (what was skipped, any risk).
