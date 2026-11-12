# Design brief

Welcoming, luxurious, royal, elegant, unmistakably Pakistani. Draw on Mughal architecture (arches, jharokha, jali lattice, the mehrab), buti and phool-patti motifs, zari and gota edging, fanoos lanterns and diyas. Ornament frames the content and never competes with it.

This is a brief for `impeccable` (`shape`, `new-work`). The settled visual system goes into DESIGN.md, which then wins over anything here that it replaces. `init` records product facts only, so none of this goes into PRODUCT.md.

## Opening animation

- Starts from a tap on a real `<button>` with a clear "tap to open" prompt, in the current language. No blank screen while assets load. The language toggle is visible.
- Leading idea: **Kashi-kari mihrab**. Loose glazed tiles tumble across a cobalt ground; the guest taps the gold keystone; the tiles lock into a pointed arch, the gold outline draws, and the niche fills with the couple's names. Wrap the tile scatter in `dir="ltr"` so it stays physical in Urdu. Alternatives: a royal farman scroll unrolling, or a fanoos lighting that reveals the arch. Fallback: envelope or card opening.
- About 3 to 4 seconds from tap to content, and the hero is usable at once. `prefers-reduced-motion` gets a short cross-fade only.
- Animate `transform` and `opacity`. One exception: a stroke-draw (`stroke-dashoffset`) on a handful of SVG paths, during the opening only.

## Scroll

- A visible cue on the hero (animated chevron plus a short label) that appears about a second after the opening and fades once the guest scrolls. It is not navigation.
- Reveals use `IntersectionObserver`, animate `transform` and `opacity` only, run once per element, stagger lightly and finish in under about 700 ms. Parallax only on decorative layers. No scroll-jacking and no pinned sections that trap a thumb.
- Each event gets about one phone screen (`min-height: 100svh`): title, date, time, venue, address, map button, dress code and note.
- Do not animate blur, filters, large shadows or `background-position`. Use `will-change` only while something is animating.

## Palette (hard bans)

- Banned families: rust, terracotta, burnt orange, brick, copper, bronze, beige, sand, tan, khaki, camel, taupe, greige, cream, ivory, champagne, parchment, oatmeal, buff, and any warm or yellow-tinted off-white or brown-leaning neutral.
- Use deep jewel grounds (emerald, peacock or teal, midnight blue, deep plum or wine) with clean cool whites. Reds lean crimson, ruby or rose, never orange-red.
- Gold is a clear, bright yellow-gold. Muted or "antique" gold reads beige. Gold gradients must not pass through mid-brown stops (dark-to-gold blends turn bronze). Keep ramps between bright and light gold, or use flat gold.
- Check textures, photos, SVGs and the og image too. No paper, linen or parchment textures.
- Text contrast at least 4.5:1 (gold on dark included), 3:1 for large text.
- Whether each function (Mehndi, Barat, Walima) gets its own accent is decided in `shape`/`colorize`.

## Typography (Latin)

- At most three families overall: a display face, a calm text face, and the Urdu face (`docs/language.md`). Pairing decided in `typeset`.
- Script or calligraphic faces only for the couple's names and short flourishes, at 40px or larger on a 390px screen. Dates, times, venues and addresses use the plain text face at 16px or larger with comfortable leading.
- Self-host fonts (for example `@fontsource`), subset, `font-display: swap`, preload the display face. No third-party font requests at runtime.

## Mobile first

- Design at 390x844. Verify 320, 360, 390, 412, 430, then 768 and 1280 and up.
- On desktop, use a centred phone-width column over a decorative backdrop, or a considered scale-up (decided in `adapt`). Never a stretched mobile layout.
- Use `svh` and `dvh`, not `vh`. `viewport-fit=cover` with safe-area insets. Tap targets at least 44x44. No hover-only interactions. No horizontal scroll.
- Test in the WhatsApp and Instagram in-app browsers as well as Chrome on Android and Safari on iOS.
