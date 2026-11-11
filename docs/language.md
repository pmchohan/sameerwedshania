# Language: Urdu and English

The owner wants a language toggle that is easy to find but does not steal attention. Two languages only: English and Urdu.

## The toggle

- One small pill, no fill, hairline gold border. Its label is the language you can switch **to**, written in that language: `اردو` while the page is English, `English` while it is Urdu.
- Visual size about 32px high, with a hit area of at least 44x44.
- Fixed at the top right of the screen in both languages. It does not mirror in Urdu. Respect the safe-area inset (notches).
- Visible on the code screen, the opening screen and throughout the invitation.
- No pulse, glow, animation or badge. Label text still meets 4.5:1 contrast.
- A real `<button type="button">` with `lang` set to its label's language and an `aria-label` such as "Switch to Urdu".
- Switching does not reload the page, keeps the scroll position, and does not replay reveal animations. Cross-fade text for 200 ms at most, or swap instantly.

## Choosing the language

First match wins:

1. `?lang=ur` or `?lang=en` in the URL
2. the guest's earlier choice, saved in `localStorage` (wrap access in try/catch; it can fail in in-app browsers)
3. the guest's `lang` in config
4. the browser language, if it starts with `ur`
5. English

Set `<html lang>` and `<html dir>` (`rtl` for Urdu), and update `<title>`.

## Text

- Content from config uses `Text` (`docs/config.md`).
- Fixed labels live in `src/i18n/strings.ts`, typed so a missing Urdu entry fails the typecheck. This covers Time, Venue, Dress code, View on map, Tap to open, Scroll, the code prompt, errors and the closing line.
- No hard-coded user-facing string in any component.
- Hero wording is gender-neutral: "Invitation for {name}" and "دعوت نامہ برائے {name}". Do not use "Dear" or "محترم/محترمہ".

## Direction (RTL)

- Use logical CSS properties only: `margin-inline`, `padding-inline`, `inset-inline`, `text-align: start | center`. No `left`/`right` for content.
- Things that must not mirror: the opening doors (wrap the opening in `dir="ltr"`), asymmetric ornaments, the toggle's position.
- Latin names and numbers inside Urdu text go in `<bdi>` or an element with `lang="en"`. Use Latin digits.

## Urdu typography

- Nastaliq face (Noto Nastaliq Urdu, via `@fontsource`). Self-hosted.
- Line-height about 1.9 to 2.2 and extra block padding so tall Nastaliq marks are never clipped. Check titles, buttons and the toggle.
- Size it up about 10 to 20% against English at the same role; Nastaliq looks smaller.
- Never apply `letter-spacing`, `text-transform` or italics to Urdu. Set `font-synthesis: none`.
- No `background-clip: text` gradient on Urdu (it clips marks). Use flat bright gold.
- Check rendering on Android Chrome and iOS Safari.

## Font loading

The Urdu face is heavy, so it is not in the first English load.

- Load it on demand with a dynamic import when Urdu is chosen.
- Start loading early when Urdu is already expected (`?lang=ur`, saved choice, guest `lang`, browser language).
- When the guest taps the toggle, wait for `document.fonts.load(...)` (give up after about 1.5 s) before flipping the text, so there is no flash of the wrong font.
- Measure and report its size. It is outside the first-load budget but must be reported.
- Bismillah header (recommended): use a tiny subset font containing only its glyphs, made once with `fonttools` (`pyftsubset --text=...`) and committed as a few KB of woff2. Never reuse the full Urdu face for it in English mode. Place it high on the page; do not animate it letter by letter and never crop or overlap it.

## Dates and times

- Dates: format from the Y-M-D parts with `timeZone: 'UTC'`, never `new Date('YYYY-MM-DD')` in local time. English `en-GB`. Urdu `ur-PK-u-nu-latn` (Latin digits). Verify the Urdu month and weekday names in a test.
- Times: config is 24h. English shows `7:00 PM`. Urdu shows a day-period word, the time and `بجے`: `شام 7:00 بجے`. Proposed periods: 04:00 to 11:59 `صبح`, 12:00 to 15:59 `دوپہر`, 16:00 to 19:59 `شام`, 20:00 to 03:59 `رات`. Needs a native reader's review.

## Tests

- Language precedence (all five levels).
- Urdu and English date and time output, including a timezone-shift case.
- Visibility in Urdu (`docs/config.md`).
- Strings completeness is covered by the typecheck.

## Out of scope

Other languages, automatic translation, per-event language, an Urdu keyboard on the code screen.
