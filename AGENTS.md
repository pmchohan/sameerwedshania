# AGENTS.md — Sameer & Hania digital wedding invitation

Read this file fully at the start of every session. It is the source of truth for scope, skills and conventions. If the owner's instruction conflicts with it, the owner wins; then update this file.

## 1. Project

A one-page, animated, **mobile-first** React site that replaces printed wedding cards. Each guest gets a personal link (`https://<domain>/<code>`) and sees only their own name and the events they are invited to. Three functions exist: **Mehndi**, **Barat**, **Walima**.

Almost every guest will open it on a phone, usually from a WhatsApp link. Design and test for mobile first; desktop must work but is secondary.

## 2. Requirements (from the owner)

1. React, single page, no navigation menu. Guests only scroll.
2. A proper opening animation before any content. Prefer something unique to this wedding; fall back to a card/envelope opening if no strong idea survives review.
3. Scroll-triggered animation throughout, plus a visible cue telling guests to scroll.
4. `/` asks for an invitation code. `/<code>` shows that guest's invitation (example: `/achunp` for Ali).
5. One config file decides which routes exist (one per guest) and holds all content: couple, event dates/times/venues, guests.
6. Everyone sees the opening, the couple (who weds whom) and their own name. Event sections appear only for events that guest is invited to.
7. Venue location pins for each event.
8. Fancy but readable fonts. Welcoming, luxurious, royal, elegant, with a Pakistani/desi character.
9. No rust, beige or cream, nor shades of them (details in section 7).

## 3. Skills (`.agents/skills`)

Nine skills are installed (checked 2026-11-10). Use them by phase:

| Skill | Role | When |
|---|---|---|
| `impeccable` | **Design lead.** Concept, layout, type, colour, motion, responsive, polish, audit. Treat this surface as **Experience** mode (the artifact leads, the interface recedes). | `context` once per session, then `init` (PRODUCT.md) and `shape` (plan). Then `new-work` for the visual world, `typeset`, `colorize`, `animate`, `adapt`; `delight` sparingly. Finish with `polish`, `audit`, `harden`, `critique`. Read `reference/craft-floor.md` before **every** UI edit. Run `document` once the design settles to write DESIGN.md. |
| `frontend-dev` | **Structure.** Folder layout, config-driven routes as data, route guard, naming, tokens, a11y basics, lazy loading. | At scaffold and whenever adding a route, page or shared component. Applied scaled down: see section 8. |
| `ponytail` (level `full`) | **Code restraint.** Smallest complete change; no speculative abstraction, options or dependencies. One small test for non-trivial logic. End each coding reply with what was skipped and any risk. | Every coding task. It limits code and dependencies, never visual ambition or anything the owner asked for. |

**Not used here**

- `design-taste-frontend`: do not load it or run its scripts or finish gate. It targets company, product and shop sites and its rules contradict this brief (flat grounds, no gradients or scenes on non-tech pages, photograph-led pages, copy and address rules for business sites). Its blocking Stop-hook gate would fail an invitation.
- `caveman`, `caveman-help`, `caveman-discover`: not relevant. Replies stay normal-length and plain.
- `caveman-commit`: only when the owner asks for a commit message.
- `caveman-compress`: never run on this file (it sends file text to a model provider and this file should stay readable).

Notes: `impeccable`'s launcher may download a binary on first run (needs network). If it fails, follow its documented fallback and read PRODUCT.md / DESIGN.md directly. `frontend-dev` refers to `scripts/check-*.py`, but that folder is missing; do its Quality Checklist by hand. PRODUCT.md and DESIGN.md live at the repo root, beside this file.

## 4. Working order

1. `git status`; never commit unless asked. Run `impeccable context`, then `init` to capture PRODUCT.md (audience: wedding guests on phones; tone; anti-references).
2. `shape`: short plan covering the opening concept, section sequence, event layout, scroll cue, code-entry screen, desktop treatment.
   **Checkpoint:** show the owner the opening concept and palette direction (a description or one static mock) before building everything.
3. Scaffold `project/` (Vite + React + TypeScript), config, types, validation, route table, guard, and tests for the pure logic.
4. Build in this order: code entry, opening, hero, event sections, closing. One shared `Reveal` primitive for scroll animation.
5. `animate`, `adapt`, `polish`; then `audit` and `harden`; one `critique`; fix findings.
6. Verify against section 9 and report.

## 5. Repo layout and the config contract

The app lives in `project/` (currently empty; run all npm commands there). `_notes/` is the owner's; keep build output out of it.

```
project/
├── public/                       favicon, og image, host rewrite file (_redirects or vercel.json)
└── src/
    ├── config/
    │   ├── invitation.config.ts  THE file the owner edits: couple, events, guests
    │   ├── types.ts
    │   └── validate.ts           sanity checks (also unit-tested)
    ├── routes/index.ts           route table built from config; data only, no JSX
    ├── middleware/InviteMiddleware.tsx   resolves guest from the URL code; unknown goes to "/"
    ├── layouts/SiteLayout/
    ├── pages/guest/
    │   ├── CodeEntry/            "/"
    │   └── Invitation/           "/<code>"  sections/{Opening,Hero,Events,Closing}
    ├── components/{atoms,ornaments,motion,maps}/
    ├── hooks/                    useReveal, ...
    ├── theme/                    CSS-variable tokens, font setup
    ├── utils/                    formatDate, formatTime, code normalisation
    ├── App.tsx
    └── main.tsx
```

One generic event component driven by props. No `MehndiSection.tsx`-style files; per-event differences come from data and theme tokens.

```ts
type EventKey = 'mehndi' | 'barat' | 'walima';

export const couple = { groom: 'Sameer', bride: 'Hania' };

export const events: Record<EventKey, {
  title: string;        // 'Mehndi'
  titleUr?: string;     // 'مہندی'
  date: string;         // 'YYYY-MM-DD'
  time: string;         // 'HH:mm' (24h in config, shown as 7:00 PM)
  venue: { name: string; address: string; mapUrl: string }; // paste a Google Maps share link
  dressCode?: string;
  note?: string;
}>;

export const guests: {
  code: string;         // URL path, lowercase [a-z0-9-], unique, e.g. 'achunp'
  name: string;         // 'Ali' or 'The Khan Family'
  events: EventKey[];   // at least one
  note?: string;        // optional personal line
}[];
```

`validate.ts` rejects: duplicate codes (case-insensitive), codes outside `[a-z0-9-]`, guests with no events, unknown event keys, invalid dates or times, non-https `mapUrl`. Seed the config with obvious placeholders (`TODO` in venue names); never invent real-looking venues or dates.

## 6. Behaviour rules

**Routing.** Route table is `/` plus one route per guest from config. Unknown paths show CodeEntry with a gentle "that code didn't match" message; never reveal valid codes or how many exist. The host must rewrite all paths to `index.html`; add the rewrite file for the chosen host.

**Code input.** Trim, lowercase and strip spaces before matching. Use `autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="go"`. Large, thumb-friendly field and button, with a real `<label>` and an `aria-live` error.

**Visibility (hard rule).** Everything rendered on a guest's page (sections, hero subtitle, date line, footer, `<title>`) is derived only from that guest's own events. Never show a date range, count or teaser that hints at events they are not invited to. Event sections render in fixed order Mehndi, Barat, Walima, regardless of the order in config.

**Hero.** Couple's names, "weds", `Dear {name}`, optional `note`, then the scroll cue.

**Dates and times.** Format from the Y-M-D parts (or with `timeZone: 'UTC'`). Never format via local-time `new Date('YYYY-MM-DD')`: guests abroad would see the wrong day. Cover this with a test.

**Maps.** Each event gets a "View on map" button using `venue.mapUrl`, opened with `target="_blank" rel="noopener"`. No embedded iframe, no map SDK, no API key.

**Privacy reality.** This is a static site: the whole config (every code, every guest, every event) ships in the JS bundle. Codes are an unlisted-link convenience, not access control. Keep anything private out of the config. If real secrecy is ever needed, the fix is a tiny serverless endpoint returning one guest's payload; do not build it now.

## 7. Design direction

Welcoming, luxurious, royal, elegant, unmistakably Pakistani. Draw on Mughal architecture (arches, jharokha, jali lattice, the mehrab arch), buti and phool-patti motifs, zari/gota edging, fanoos lanterns and diyas. Ornament frames the content and never competes with it.

**Opening animation.**
- Gated by a tap/swipe on a real `<button>`, with a clear "tap to open" prompt. No blank screen while assets load.
- Leading concept to validate in `shape`: **Darwaza**, a pair of ornate arched doors with jali panels and a gold monogram seal that swing open to reveal the invitation. Alternatives: a royal farman scroll unrolling; a fanoos/diya lighting that reveals the arch. Fallback: envelope/card opening.
- About 3 to 4 seconds from tap to content; the hero is usable immediately after. `prefers-reduced-motion` gets a short cross-fade only.

**Scroll.**
- A visible cue on the hero (animated chevron plus a short label) that appears about a second after opening and fades once the guest scrolls. It is not navigation.
- Reveals use IntersectionObserver, animate `transform` and `opacity` only, run once per element, stagger lightly, and finish within about 600 ms. Parallax only on decorative layers. No scroll-jacking and no pinned sections that trap a thumb.
- Each event gets roughly one mobile screen (`min-height: 100svh`): title (and Urdu title), date, time, venue, address, map button, dress code/note.

**Palette (hard bans).**
- Banned families: rust, terracotta, burnt orange, brick, copper, bronze, beige, sand, tan, khaki, camel, taupe/greige, cream, ivory, champagne, parchment, oatmeal, buff, and any warm or yellow-tinted off-white or brown-leaning neutral.
- Use deep jewel grounds (emerald, peacock/teal, midnight ink-blue, deep plum/wine) with clean cool whites (pearl). Reds lean crimson, ruby or rose, never orange-red.
- Gold only as a clear, bright yellow-gold. Muted or "antique" gold reads beige. Gold gradients must not pass through mid-brown stops (dark-to-gold blends go bronze); keep ramps between bright and light gold, or use flat gold.
- Check textures, photos, SVGs and the og image too. Paper, linen and parchment textures are out.
- Text contrast at least 4.5:1 (gold on dark included), 3:1 for large text.
- The exact palette, and whether each function gets its own accent, is decided in `shape`/`colorize` and recorded in DESIGN.md.

**Typography.**
- At most three families: a display face, a calm text face, and an Urdu (Nastaliq) face if Urdu is used. Pairing decided in `typeset`.
- Script/calligraphic faces only for the couple's names and short flourishes, at 40px or larger on a 390px screen. Dates, times, venues and addresses use the plain text face at 16px or larger with comfortable leading.
- Urdu: `lang="ur" dir="rtl"`. **Never** apply `letter-spacing` or `text-transform` to Arabic-script text (it breaks joining). Give generous line-height so Nastaliq marks are not clipped. Check rendering on Android Chrome and iOS Safari. If a Bismillah header is used, place it high on the page, never animate it letter by letter, never crop or overlap it.
- Self-host fonts (for example `@fontsource`), subset, `font-display: swap`, preload the display face. No third-party font requests at runtime.

**Mobile first.**
- Design at 390x844. Verify 320, 360, 390, 412, 430, then 768 and 1280+. On desktop use a centred phone-width column over a decorative backdrop or a considered scale-up (decided in `adapt`); never a stretched mobile layout.
- Use `svh`/`dvh`, not `vh`; `viewport-fit=cover` with safe-area insets; tap targets at least 44x44; no hover-only interactions; no horizontal scroll.
- Test in WhatsApp and Instagram in-app browsers as well as Chrome Android and Safari iOS. Test on a real phone with `npm run dev -- --host`.

**Performance.** Target first paint of the opening under about 2 s on a mid-range Android over 4G and an initial load of roughly 250 KB gzipped or less (JS, CSS, fonts). Prefer inline/optimised SVG and CSS ornaments over raster; images as WebP/AVIF. Animate only `transform` and `opacity`; avoid animating blur, filters, large shadows or `background-position`; `will-change` only on elements that are animating.

## 8. Engineering conventions

- **Stack:** Vite, React, TypeScript, React Router. One styling system (CSS variables as tokens plus plain CSS or CSS Modules; pick one and stay with it).
- **Dependencies (ponytail):** react, react-dom, react-router-dom, `@fontsource/*`, vitest to start. Animation is CSS plus a small `useReveal` hook; add `motion` only for choreography CSS cannot express cleanly. Anything else needs a one-line reason in the reply.
- **`frontend-dev` as applied:** routes are `.ts` data with no JSX; the guard is middleware; components are generic and organised by type; tokens, not magic values; CapitalCase components, `useX` hooks, camelCase data/util files.
- **Lazy loading:** guests land directly on `/<code>`, so Opening and Hero stay in the initial bundle. Lazy-load only below-the-fold sections or heavy art, and only if the size target needs it.
- **Waived from `frontend-dev`** (single-purpose app, ponytail): role groups beyond `guest`, layouts beyond `SiteLayout`, Redux/store (use React state or context), Playwright snapshot and axe suites, one test per component.
- **Tests (Vitest):** config validation, code normalisation, guest-to-visible-events filter (including fixed order), date/time formatting (including a timezone-shift case), route-table generation. UI is verified visually per section 9.
- **Head:** `lang="en"`, `viewport-fit=cover`, `theme-color`, `robots: noindex,nofollow`, and generic og tags ("Sameer & Hania — you're invited"). Link previews cannot be per-guest on a static host. The og image must obey the palette bans.
- **Accessibility:** semantic landmarks and headings, visible focus, labelled inputs, ornaments `aria-hidden`, reduced motion honoured.
- **Commands (in `project/`):** `npm run dev`, `npm run build`, `npm run preview`, `npm test`. `.gitignore`: `node_modules`, `dist`, `.env*`.

## 9. Definition of done

- `/` shows the code prompt; a wrong code gives a friendly message; a right code plays the opening, then hero, then only the invited events.
- Config contains test guests for walima-only, all three, and two events. For each, the rendered DOM and text contain no names, dates or venues of events they are not invited to.
- Screenshots at 320, 390, 430, 768 and 1280: no horizontal scroll, no clipped Urdu, readable contrast.
- Checked on a real phone and in the WhatsApp in-app browser, with reduced motion on, and with CPU/network throttled.
- Colour audit: no banned hue in CSS, SVG, raster assets or the og image.
- `npm run build` is clean, tests pass, bundle is near the target.
- Final reply states what was built, plus the ponytail closing line (what was skipped, any risk).

## 10. Open items and assumptions (update as resolved)

- Names assumed from the repo name: **Sameer** (groom) and **Hania** (bride). Confirm spelling and order.
- Dates, times, venues, dress codes and the guest list have not been provided; the config starts with `TODO` placeholders.
- Opening concept (Darwaza) is a proposal, pending the section 4 checkpoint.
- Hosting and domain are undecided (affects the SPA rewrite file).
- Urdu accents (Bismillah header, Urdu event names) are assumed welcome; confirm.
- No Chrome or Chromium was on PATH at setup. Visual checks need a browser: use whatever the owner has installed, or ask before downloading Playwright's Chromium.
- Out of scope unless asked: RSVP form, backend, music, photo gallery, countdown, add-to-calendar, analytics, admin UI, languages beyond Urdu accents.

## 11. Git and replies

- Do not commit or push unless asked. When asked, use Conventional Commits in the `caveman-commit` style (imperative, subject 50 characters or fewer).
- Explain config changes in plain language; the owner edits `invitation.config.ts` directly.
- Update this file when a decision changes.
