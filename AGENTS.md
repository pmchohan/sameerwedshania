# AGENTS.md — Sameer & Hania digital wedding invitation

Read this file at the start of every session. If the owner's instruction conflicts with it, the owner wins; then update this file. Detail lives in `docs/`; section 2 says when to read each file.

## 1. What this is

A one-page, animated, mobile-first React site that replaces printed wedding cards. Each guest gets a personal link (`https://<domain>/<code>`) and sees only their own name and the events they are invited to (Mehndi, Barat, Walima), in English or Urdu. Almost everyone opens it on a phone, usually from a WhatsApp link. Design and test mobile first; desktop must work but is secondary.

## 2. Read before you work

| You are working on | Read first |
|---|---|
| Config, guests, routes, validation, who sees what | `docs/config.md` |
| Any visible text, the Urdu/English toggle, RTL, Urdu fonts, date and time wording | `docs/language.md` |
| Look and feel, opening animation, scroll motion, palette, type, mobile layout | `docs/design-brief.md` |
| Folders, components, dependencies, tests, performance, checks, definition of done | `docs/engineering.md` |

## 3. Owner requirements (source of truth)

1. React, one page, no navigation menu. Guests only scroll.
2. A real opening animation before any content. Prefer something unique to this wedding; fall back to a card/envelope opening only if no strong idea survives.
3. Scroll-triggered animation, plus a visible cue telling guests to scroll.
4. `/` asks for an invitation code. `/<code>` shows that guest's invitation (example: `/achunp` for Ali).
5. One config file decides which routes exist (one per guest) and holds all content: couple, events, dates, times, venues, guests.
6. Everyone sees the opening, the couple (who weds whom) and their own name. Event sections appear only for the events that guest is invited to.
7. A location pin (map button) for each venue.
8. An Urdu/English toggle. Easy to find, but quiet: it must not pull attention away from the invitation.
9. Fancy but readable fonts. Welcoming, luxurious, royal, elegant, with a Pakistani/desi character.
10. No rust, beige or cream, and no shades of them.
11. The site is built from many small components. Never as one big component or one big file.

## 4. Hard rules

- **Visibility.** Everything on a guest's page (text in both languages, hero, footer, `<title>`) comes only from that guest's own events. No date range, count or teaser hinting at events they are not invited to. Details in `docs/config.md`.
- **Components.** One component per file. A page is a thin composition of sections; sections are built from small reusable components. The three events share one generic, data-driven event component (they have the same shape; do not copy-paste three). Opening, hero, scroll cue, language toggle, reveal, map button, ornaments and the code form are each their own component. Component map in `docs/engineering.md`.
- **Palette.** No rust, terracotta, orange-brown, beige, sand, tan, khaki, cream, ivory, champagne or parchment, nor any warm off-white or brown-leaning neutral. Full rules in `docs/design-brief.md`.
- **Build output.** `project/dist` is the app build published to GitHub Pages through the `gh-pages` branch, so anything placed there can go public. The owner approved deployment on 2026-11-12. Build with `npm run build` and publish `project/dist` to `gh-pages`; do not redeploy without a new request (`docs/engineering.md`).
- **Git.** Do not commit or push unless asked. When asked, use Conventional Commits (imperative, subject 50 characters or fewer).
- **Privacy.** This is a static site: the whole config (every code, guest and event) ships in the JS bundle. Codes are an unlisted-link convenience, not access control. Keep anything truly private out of the config.
- **Urdu copy.** Agents may draft Urdu text but must flag it as needing a native reader's review. Never ship machine-written Urdu as final.

## 5. Skills (`.agents/skills`)

Nine skills are installed (checked 2026-11-11). Pick by phase:

| Skill | Role | When |
|---|---|---|
| `impeccable` | **Design lead.** Concept, layout, type, colour, motion, responsive, polish. Treat this surface as **Experience** mode (the artifact leads, the interface recedes). | `context` once per session. `init` for product facts only (it does not do visuals). `shape` for the plan. `new-work` for the visual world, seeded by `docs/design-brief.md`, which you read by hand (the file is not named `design.md` on purpose: Impeccable would treat that name as DESIGN.md). Then `typeset`, `animate`, `adapt` as needed. Finish with one `polish`, one `audit`, one `harden` (long names, Urdu, small screens); each at most once. Read `reference/craft-floor.md` before every UI edit. Run `document` when the design settles, to write DESIGN.md. |
| `frontend-dev` | **Structure.** Folders, config-driven routes as data, route guard, naming, tokens, a11y basics. | At scaffold and whenever adding a route, page or shared component. Applied scaled down (`docs/engineering.md`). |
| `ponytail` (level `full`) | **Code restraint.** Smallest complete change, no speculative abstraction or dependencies. End each coding reply with what was skipped and any risk. | Every coding task. It limits code and dependencies, never visual ambition or anything the owner asked for. |
| `caveman-commit` | Commit message style. | Only when the owner asks for a commit. |

**Not used**

- `design-taste-frontend`: do not load it or run its scripts. It builds company, product and shop sites, and its rules contradict this brief: it bans fade-in-on-scroll reveals (requirement 3), wants photograph-led pages, bans captions under visuals, and limits addresses to street and district with no house number (venues need a usable address). Its Stop hook runs a gate that needs Chrome or Chromium; this machine has only Firefox, so the gate would block finishing.
- `caveman`, `caveman-help`, `caveman-discover`: chat voice only, and only when the owner invokes it. Keep chat replies short and plain either way. Never use caveman voice in code, comments, docs or commit text.
- `caveman-compress`: never run on this file or on `docs/`. It sends file text to a model provider and these files must stay readable.

Notes: `impeccable`'s launcher may download a binary on first run (needs network); if it fails, use its documented fallback and read PRODUCT.md and DESIGN.md directly. `frontend-dev` mentions `scripts/check-*.py`, but that folder is not installed; do its Quality Checklist by hand. PRODUCT.md and DESIGN.md live at the repo root, beside this file.

## 6. Working order

1. `git status`. Run `impeccable context`, then `init`. Already decided, so record rather than ask: platform `web`; stack Vite + React + TypeScript; users are wedding guests on phones. If `init` asks how new surfaces are built (comp-first or code-first), recommend **code-first**: ornaments are SVG and CSS, and generated images risk the palette bans. Store only what the owner answers.
2. `shape`: a short plan covering the opening concept, section order, event layout, scroll cue, code screen, language toggle, desktop treatment. State the opening concept in your reply and keep building; the owner can redirect at any time.
3. Scaffold `project/` (Vite + React + TypeScript). Set up config, types, validation, the language layer and the route table first, with tests for the pure logic. All visible text goes through the language layer from the first component.
4. Build in this order: code entry, language toggle, opening, hero, event sections, closing. One shared `Reveal` component for scroll animation.
5. `animate`, `adapt`, `polish`, `audit`, `harden` (one pass each), then fix findings.
6. Verify against the definition of done in `docs/engineering.md` and report.

## 7. Repo layout

```
.agents/skills/     installed skills
_notes/             owner's notes (empty); keep build output out
docs/               config.md, language.md, design-brief.md, engineering.md
project/dist/       app build published to gh-pages; do not edit by hand
project/            the app: package.json, src/, public/
PRODUCT.md DESIGN.md   written by impeccable (root)
```

## 8. Open items (update as resolved)

- Confirmed names: **Sameer** (سمیر, groom) and **Hania** (ہانیہ, bride).
- Dates, times, venues, dress codes and the guest list are not provided. Config starts with `TODO` placeholders; never invent real-looking venues or dates. Test guests were removed for launch; add them locally when testing.
- Hosting: GitHub Pages at `https://pmchohan.github.io/sameerwedshania/`, so Vite `base` is `/sameerwedshania/` and BrowserRouter uses that basename. The custom domain `sameerwedshania.qd.je` is not configured (its DNS points to 185.27.134.95); no CNAME is deployed. Deploy is manual: build to `project/dist`, publish to `gh-pages`.
- Opening concept: tiled kashi-kari mihrab; loose tiles lock into an arch after tapping the keystone. Recorded in `DESIGN.md` and `.impeccable/surfaces/project-index-html.md`.
- `DESIGN.md` is at the repo root; `.impeccable/design.json` sits beside the surface brief.
- Urdu copy and the Urdu time wording need a native reader's review. Name spellings are confirmed.
- Bismillah header: included above the arch; owner confirmation pending.
- Out of scope unless asked: RSVP form, backend, music, photo gallery, countdown, add-to-calendar, analytics, admin UI, languages beyond English and Urdu.
