---
name: Sameer & Hania
description: A personal, animated wedding invitation set in a Wazir Khan kashi-kari mihrab.
colors:
  cobalt-night: "#061638"
  cobalt-deep: "#081d52"
  cobalt-royal: "#0a2463"
  lapis-dusk: "#0a3b73"
  turquoise-glaze: "#1ba6a6"
  turquoise-deep: "#0f6f7c"
  leaf-glaze: "#1f8a4c"
  gold-glaze: "#f2c94c"
  cool-white: "#f4f8fb"
  cool-paper: "#eaf3f8"
  mist-blue: "#b9cce6"
  rose-error: "#ffa3b8"
typography:
  display:
    fontFamily: "Pinyon Script, cursive"
    fontSize: "clamp(2.75rem, 12vw, 5rem)"
    fontWeight: 400
    lineHeight: 1.3
  body:
    fontFamily: "Alegreya Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  urdu-body:
    fontFamily: "Noto Nastaliq Urdu, Alegreya Sans, serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 2.1
  label:
    fontFamily: "Alegreya Sans, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.14em"
  bismillah:
    fontFamily: "Bismillah, Noto Nastaliq Urdu, serif"
    fontSize: "1.35rem"
    fontWeight: 400
    lineHeight: 2.2
rounded:
  square: "0"
  control: "2px"
spacing:
  module: "8px"
  tight: "16px"
  gutter: "24px"
  block: "40px"
  section: "80px"
  section-tall: "128px"
components:
  button-primary:
    backgroundColor: "{colors.gold-glaze}"
    textColor: "{colors.cobalt-night}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.cool-white}"
    textColor: "{colors.cobalt-night}"
  language-toggle:
    backgroundColor: "rgb(6 22 56 / 0.92)"
    textColor: "{colors.mist-blue}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "32px"
  code-input:
    backgroundColor: "{colors.cobalt-deep}"
    textColor: "{colors.cool-white}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "56px"
---

# Design System: Sameer & Hania

## Overview

**Creative North Star: "The Kashi-kari Mihrab"**

The invitation is one tiled wall from Wazir Khan's tomb complex: deep cobalt ground, turquoise and leaf glazes, cool white, and a bright yellow-gold outline. It is not a card with a mandala behind it. The wall assembles itself, opens into a pointed mihrab, and then continues as a sequence of tiled panels, one for each event the guest is invited to.

The experience is intimate and ceremonial, not decorative for its own sake. The Bismillah sits above the arch, the couple's names sit inside the niche, and the guest's name sits below it; the events read like plaques set into the same wall. Ornament frames the content and then gets out of the way. The palette is cool and saturated, with gold used as a thread rather than a wash.

The surface is flat glazed tile, not paper, fabric, or metal. Depth comes from tonal shifts, grout lines, and the double outline of the arch, never from soft shadows. Motion has the patience of laying tile: tiles tumble, settle, and lock; content reveals once and stays still. The language toggle stays quiet, fixed at the physical top right in both languages.

**Key Characteristics:**
- One square module (8px) governs tiles, spacing, the arch, and the strips.
- Deep cobalt night gives way to lapis, turquoise, cool white, then night again.
- Gold is a single thread: names, keystone, cue, focus, map button.
- Flat glaze, hard edges, 1px rules, no soft shadows.
- Phone-first, 320px safe, one thumb, full-height sections.
- English and Urdu are equal citizens; Nastaliq gets more room, not less.

## Colors

The palette is a cool, glazed kashi-kari range: saturated cobalt and lapis grounds, turquoise and leaf tile glazes, blue-leaning whites, and one bright gold.

### Primary
- **Gold Glaze** (#f2c94c): The ceremonial thread. Keystone, couple's names, scroll cue, focus ring, map button, selection. It is bright yellow-gold, never orange or brass.

### Secondary
- **Turquoise Glaze** (#1ba6a6): Tile motif accent on the dark grounds; the brightest turquoise in the wall.
- **Turquoise Deep** (#0f6f7c): The dawn ground and the day accent. Carries white text at 5.49:1.
- **Leaf Glaze** (#1f8a4c): Wall-corner spandrel tiles and the green note in the glaze mix; never a text color on dark.

### Tertiary
- **Rose Error** (#ffa3b8): Form errors only. It is the one non-glaze color and appears only when the guest needs correcting.

### Neutral
- **Cobalt Night** (#061638): The night ground, the page background, and the color behind the arch. The deepest value in the system.
- **Cobalt Deep** (#081d52): The arch niche and the code input fill.
- **Cobalt Royal** (#0a2463): Tile base on the dark panels; day text.
- **Lapis Dusk** (#0a3b73): The dusk event ground, between night and dawn.
- **Cool White** (#f4f8fb): Primary text on dark grounds, tile highlights, and the button hover fill.
- **Cool Paper** (#eaf3f8): The day ground. A cool, blue-leaning white, never cream or ivory.
- **Mist Blue** (#b9cce6): Muted text on dark grounds; toggle label.

The region-specific muted inks are #cfe0f3 on dusk, #e3f4f5 on dawn, and #3a4f85 on day. They exist to keep secondary text readable on each ground.

### Named Rules
**The No Warm Neutral Rule.** No rust, terracotta, orange-brown, beige, sand, tan, khaki, cream, ivory, champagne, or parchment, and no warm off-white or brown-leaning neutral. Every white here leans blue.

**The Glaze Rule.** Tiles are flat. Depth comes from glaze color, grout lines, and the double arch outline, never from a soft shadow.

**The One Gold Thread Rule.** Gold is used on the keystone, names, cue, focus, and map button. It is not a background wash and not a default border.

**The Decorative Gold Rule.** Gold on turquoise is allowed in tile motifs and hairlines, but body copy must hold 4.5:1; use white or mist on turquoise instead.

## Typography

**Display Font:** Pinyon Script (with Alegreya Sans fallback). In Urdu, Noto Nastaliq Urdu takes over the script role.
**Body Font:** Alegreya Sans (with system-ui fallback). In Urdu, Noto Nastaliq Urdu.
**Accent Font:** Bismillah, a small subset of Noto Nastaliq Urdu holding only the Bismillah glyphs.

**Character:** Pinyon Script gives the names a formal, handwritten invitation voice without turning the whole page into calligraphy. Alegreya Sans keeps times, addresses, and labels plain and legible. Nastaliq is the Urdu voice: larger, taller, and never squeezed into Latin metrics.

### Hierarchy
- **Display** (400, clamp(2.75rem, 12vw, 5rem), 1.15–1.4): couple's names, guest name, closing names, event titles. Pinyon Script in English; Nastaliq in Urdu.
- **Headline** (400, clamp(3.5rem, 17vw, 5rem), 1.3): event title inside a panel. In Urdu the line-height opens to 1.9.
- **Title** (400, 1.5rem, 1.35): event values such as time and venue. In Urdu, line-height 1.9.
- **Body** (400, 1.125rem, 1.55): prose, addresses, notes. Urdu body is 1.25rem with 2.1 line-height.
- **Label** (400, 0.875rem, 0.14em, uppercase in English): row labels, scroll cue, button text. Urdu labels are 1.15rem and sentence case.
- **Bismillah** (400, 1.35rem, 2.2): the header above the arch; always RTL, always nowrap.

### Named Rules
**The Nastaliq Room Rule.** Urdu gets 10–20% more size and roughly 1.9–2.2 line-height. Never use Latin line-height on Nastaliq.

**The Script-Is-Names Rule.** Pinyon Script is for names and event titles only. Labels, addresses, times, and body copy stay in Alegreya Sans. In Urdu, Nastaliq is allowed to carry both roles.

**The Quiet Toggle Rule.** The language toggle uses label size, not display size. It must be findable without pulling attention from the invitation.

## Layout

One page, no navigation menu. Every major section is at least `100svh`; the guest scrolls from the arch through only their own event panels to the closing. The page is a centred column on desktop and a full-width, one-thumb composition on a phone.

The 8px module (`--m`) is the single spatial unit. It sets the tile size, the 32px tile strips, the 24px inline gutter, the 40px block gaps, and the 80–128px section padding. The hero arch is an 11 × 14 tile grid, `width: min(88vw, 26rem)`, capped by `40svh` below 700px viewport height. The welcome below the arch is at most 26rem wide; the code form is at most 22rem; event and closing content is at most 34rem.

The event panels are `grid-template-rows: auto 1fr`, with a 32px tile strip at the seam and the content centred in the remaining space. The code screen is `auto 1fr auto`: names, form, error. The closing returns to the night ground with the same strip and full height. Safe-area insets protect the fixed toggle and scroll cue.

The light ramp is part of the layout: night hero → dusk → dawn → day → night closing. A guest with one event sees one day panel; two see dawn then day; three see dusk, dawn, day. The last event panel is always day, so the closing reads as a return to night.

Responsive work is mobile-first. The layout is verified at 320, 390, 430, 768, and 1280 wide. The only height breakpoints are 700px (tighten the hero and cap the arch) and 620px (drop the long invite line so the names and cue still fit). There is no horizontal scrolling at any tested width.

Urdu runs RTL through the document, but the language toggle stays fixed to the physical top right and does not mirror. The tile grid is explicitly `dir="ltr"` so the glaze scatter stays physical. Latin names and addresses inside Urdu copy are wrapped in `<bdi>`.

## Elevation & Depth

The system is flat. There are no soft drop shadows, no blurred glows, and no floating cards. Depth is tonal: each region sets its own `--ground`, `--ink`, `--accent`, and tile colors, and the eye reads the change from cobalt to lapis to turquoise to cool white as a lighting cue. The arch gains depth from a double 1.5px gold outline and a darker niche fill.

The only `box-shadow` in the system is the button's `inset 0 0 0 1px var(--cobalt-950)` hairline, which is a keyline, not elevation. Tiles are separated by a 1px grout stroke. The date square uses a 1px border plus an offset 1px outline to read as a double-ruled tile.

### Named Rules
**The Flat Glaze Rule.** If a surface needs to feel raised, change its glaze or add a 1px rule. Do not add a shadow.

## Shapes

The atom is a square tile with a 1px grout line and a flat glaze. Three motifs repeat across the wall: a star (two rotated squares), a lozenge (nested diamonds), and a four-leaf rosette. The hero uses all three; the 32px strip repeats them in a three-tile pattern.

The signature silhouette is the pointed mihrab arch: an equilateral arch with a radius equal to its span, an 11 × 14 tile grid, a two-tile-thick frame, and a niche that is one continuous shape rather than tiles. The arch is outlined in gold, and its spandrel corners use the leaf glaze.

Controls are nearly square: 2px corner radius on buttons, the toggle, and the input. Cards and panels have no radius. The date sits in a 176px square with a double rule, like one enlarged tile. Nothing is pill-shaped, and no container floats.

## Components

### Buttons
- **Shape:** 2px corner radius, 48px minimum height, 24px horizontal padding, 20px icon.
- **Primary:** Gold Glaze background, Cobalt Night text, inset Cobalt Night keyline. English label is 0.9375rem uppercase with 0.1em tracking; Urdu is 1.15rem.
- **Hover / Focus:** Hover fills Cool White; active moves down 1px; focus is a 2px gold outline with 3px offset.
- **Behavior:** With `href`, the map button opens in a new tab with `rel="noopener noreferrer"`.

### Language Toggle
- **Shape:** Fixed physical top right, 32px visible height, 48px minimum width, 2px radius. A pseudo-element expands the hit area to 44px.
- **Color:** Cobalt veil (`rgb(6 22 56 / 0.92)`) with a 1px gold line; Mist Blue label.
- **States:** Hover brightens the border to Gold Glaze; focus uses the global 2px outline. It never mirrors in RTL.

### Cards / Containers
- **Event panel:** Full `100svh`, no radius, no shadow; a 32px TileStrip at the top; content capped at 34rem and centred.
- **Date square:** 176px square, 1px gold line, offset 1px soft line, day at 5.5rem in Alegreya Sans lining numerals.
- **Facts:** Rows separated by a 1px soft gold line; labels in muted ink, values at 1.5rem.

### Inputs / Fields
- **Code input:** 56px minimum height, 2px radius, Cobalt Deep fill, 1px gold line, Cool White text, 1.25rem Latin with 0.12em tracking and centred text.
- **Focus:** Gold border plus the global focus ring.
- **Error:** Rose Error border and message; `aria-invalid` is set on the field.

### Navigation
There is no navigation menu. The only persistent control is the language toggle. The scroll cue is the navigation cue: fixed bottom centre, gold, uppercase 0.875rem in English and 1.15rem in Urdu, with two chevrons. It appears after the arch is built, hides after the first 24px of scroll, and is `aria-hidden`.

### Signature Components
- **Arch:** 11 × 14 tile grid with a keystone button at the apex. Tiles scatter outward with a deterministic hash, then lock in base-first after the tap. The keystone pulses until built, then locks last. Reduced motion skips the scatter and the pulse.
- **TileStrip:** A 32px band of star, lozenge, and leaf tiles, used at every panel seam. Each strip has its own pattern id so colors do not leak.
- **Reveal:** A single scroll reveal: 32px rise and opacity, 0.8s with the shared ease-out and an optional delay. Reduced motion shows content immediately.
- **CodeEntry:** The full-height entry screen: couple's names, a quiet prompt, the code form, and an inline error. An unknown code shows the same screen with a "we could not find that invitation" message, not a redirect.

## Do's and Don'ts

### Do:
- **Do** keep the 8px module. Tile size, strips, gutters, and section spacing all count in it.
- **Do** use cool whites (#f4f8fb, #eaf3f8) and blue-leaning neutrals.
- **Do** keep every tap target at least 44px, including the 32px toggle via its pseudo-element.
- **Do** give Urdu more size and line-height, and wrap Latin names in `<bdi>`.
- **Do** keep the language toggle fixed at the physical top right in both languages.
- **Do** use Gold Glaze for the keystone, names, cue, focus, and map button.
- **Do** keep event panels full-height and the last panel on the day ground.
- **Do** allow long guest names, venue names, and addresses to wrap; no horizontal overflow.
- **Do** honour `prefers-reduced-motion` for the arch, reveals, and cue.
- **Do** show only the guest's own events in both languages, including the title and footer.

### Don't:
- **Don't** use rust, terracotta, orange-brown, beige, sand, tan, khaki, cream, ivory, champagne, parchment, or any warm off-white.
- **Don't** add soft shadows, glows, or floating cards. Use a glaze change or a 1px rule.
- **Don't** set body copy or labels in Pinyon Script; it is for names and event titles only.
- **Don't** put long gold body text on turquoise; gold there is for motifs and hairlines.
- **Don't** mirror the language toggle in Urdu or move it with the reading direction.
- **Don't** add a navigation menu, RSVP form, countdown, gallery, music, or analytics.
- **Don't** invent dates, venues, dress codes, or guests; use the config placeholders.
- **Don't** hard-code visible text outside the language layer.
- **Don't** ship machine-written Urdu as final; it needs a native reader's review.
