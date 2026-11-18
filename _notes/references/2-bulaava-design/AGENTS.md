# AGENTS.md

Rules and safe editing workflow for this template. Read this before changing the invitation.

## Scope

- This template intentionally ships the `site/` bucket only. Do not invent `components/` or `sample-pages/` content unless asked.
- The deliverable is a single static page: `site/index.html`, one global stylesheet, one behavior file.
- No build step, bundler, package manager, or framework.

## Non-Negotiable Conventions

- Prefix every authored class with `.es__` for blocks/elements and `.es--` for state. Existing root state hooks such as `.es-js`, `.es-embed`, `.es-desktop`, and small state helpers such as `.is-open` are part of the current contract; do not add new unprefixed classes.
- Keep section CSS in a `<style>` block directly above its `<section>`. Shared tokens, reset, shell, loader, gate, phone chrome, and utility pieces belong in `site/assets/css/global.css`.
- Keep the section comment format: `<!-- ===== SECTION: Name — what it does ===== -->` above the section's style block.
- Use tokens from `:root` (`--es-bg`, `--es-cream-1`, `--es-ink`, `--es-font-display`, etc.). Avoid introducing new raw palette values unless the design genuinely requires one.
- Only four Markdown docs are allowed at the template root: `README.md`, `AGENTS.md`, `METADATA.md`, `PAGES_AND_SECTIONS.md`.
- Keep placeholder data clearly fictional. Do not add real personal information or phone numbers.

## Editing Data

`site/assets/js/main.js` owns content:

- `EVENT`: names, host, date, venue, map link, contacts, `hijriOffset`.
- `TEXT.en` / `TEXT.ur`: interface copy and month/weekday labels.
- `SCHEDULE.en` / `SCHEDULE.ur`: evening timeline.
- `NOTES.en` / `NOTES.ur`: guest guidance.

When changing text, update both languages. HTML uses `data-i18n="key"` for dictionary strings and `data-field="key"` for `EVENT` fields. Keep the static HTML fallback text roughly in sync for first paint and no-JS viewing.

Urdu-specific event fields end in `Ur` (`groomFullUr`, `venueUr`, `areaUr`, `addressUr`, `nameUr`, `initialsUr`, and so on). `applyLang()` chooses them automatically.

## Adding or Changing a Section

1. Add or edit the `<!-- ===== SECTION: ... ===== -->` banner.
2. Put section-only CSS in a `<style>` directly below the banner and above the `<section>`.
3. Add semantic markup with a stable `id` and `.es__` classes.
4. Use `.es__reveal` plus `--es-d` / `--es-ry` for scroll reveals where appropriate.
5. Add any new strings to both `TEXT` dictionaries, or fields to `EVENT` plus Urdu variants.
6. Update `METADATA.md` and `PAGES_AND_SECTIONS.md`.

## Entry Gate and Hero Timing

- The gate must keep the body locked until the door swing finishes.
- Hero intro elements animate after `.es--entered` is added to the root and body. The name block starts around 3.3 seconds after entrance, so wait at least 6 seconds before judging hero screenshots.
- Reduced-motion mode must keep the door usable and content visible without long animations.
- The desktop stage background order is: blurred image, vignette, charcoal shade overlay, brand/note. The translucent purple stage layer from the source renders transparent; do not replace the charcoal shade with a purple wash.

## Desktop and Embed

- Desktop mode activates at `min-width: 1024px` and loads the same page in an iframe with `?embed=1`.
- The parent stage creates/scales the phone in `ensurePhone()` / `scalePhone()`.
- The iframe posts `{ type: 'bulaava-bar', light }` to switch the phone status-bar contrast. Keep that contract intact.
- The embed root must not render the desktop stage or phone chrome.

## Verification

Run these before declaring done:

```bash
node --check /home/bug/Documents/local_projects/skill_test/bulaava-replica/site/assets/js/main.js
python3 /home/bug/Documents/local_projects/skill_test/.agents/skills/html-template/html-template/scripts/check-sections.py /home/bug/Documents/local_projects/skill_test/bulaava-replica/site
python3 /home/bug/Documents/local_projects/skill_test/.agents/skills/html-template/html-template/scripts/check-styling.py /home/bug/Documents/local_projects/skill_test/bulaava-replica/site
python3 /home/bug/Documents/local_projects/skill_test/.agents/skills/html-template/html-template/scripts/check-structure.py /home/bug/Documents/local_projects/skill_test/bulaava-replica
```

Browser checks used here:

- Chromium: `/tmp/opencode/chromium/chrome-linux/chrome --no-sandbox`
- Playwright: `/tmp/opencode/pw`
- Local server: `python3 -m http.server 8765`
- Mobile viewport: `390x844`, desktop: `1440x900`
- Open the desktop phone with `frame.locator('#knockZone').click({ position: { x: 195, y: 350 } })`; clicking the parent page coordinates will not reach the iframe.

Check all of these states: loader, closed door, three knocks, opened hero, each section, Urdu toggle, all three text sizes, desktop stage, `?embed=1`, and reduced motion.

## Do Not

- Add a build system, React, utility-class framework, or second global stylesheet.
- Add unrelated Markdown files or generated dependency folders.
- Put real personal data, secrets, or tracking in the page.
- Remove the skip path, focus styles, or reduced-motion behavior.
- Rename existing root state classes or `postMessage` types without updating all consumers.
