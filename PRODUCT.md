# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite, React, TypeScript and React Router. Chosen by the owner (React). Hosted on GitHub Pages at `sameerwedshania.qd.je`.

## Users

Guests of Sameer and Hania's wedding: family and friends. They open a personal link on a phone, usually from a WhatsApp message. They read English or Urdu. Their job is to see who is marrying, which events they are invited to, when and where, and to find the venue.

## Product Purpose

A digital wedding invitation that replaces printed cards. Each guest has their own link and sees only their own name and the events they are invited to (Mehndi, Barat, Walima). Success means every guest opens it, feels welcomed, and knows exactly what to attend and how to get there.

## Positioning

A personal, animated invitation per guest. A printed card is the same for everyone; this one greets each guest by name and shows only their events.

## Operating Context

Opened a few times, on a phone, with little patience. Often inside the WhatsApp or Instagram in-app browser, on mid-range Android and iPhone, over mobile data. The owner sends each link individually. There is no login: a code in the link (or typed on the home page) selects the guest.

## Capabilities and Constraints

- One page, no navigation menu. Guests scroll.
- `/` asks for an invitation code; `/<code>` opens that guest's invitation.
- One config file defines routes and content: couple, events, dates, times, venues, guests.
- English and Urdu, with a quiet toggle.
- A map button per venue.
- Static site: the whole config ships in the JS bundle, so codes are not secret.
- Names (confirmed): Sameer (سمیر, groom) and Hania (ہانیہ, bride).
- Dates, times, venues, dress codes and the guest list are not provided yet and are undecided.

## Brand Commitments

- Voice: formal and warm. Both families invite the guest ("Together with their families, Sameer and Hania invite you...").
- Tone: welcoming, luxurious, royal, elegant, with a Pakistani and desi character.
- Binding visual constraints from the owner: no rust, beige or cream, nor shades of them; fonts fancy but readable; the language toggle visible but not attention-stealing.

## Evidence on Hand

None yet: no photos, logo, monogram, venue details or dates. Nothing may be invented; placeholders are marked `TODO`.

## Product Principles

1. The invitation belongs to the guest: they see only their own events, in both languages.
2. Phone first. Everything works on a 320px screen with one thumb.
3. Ornament frames the content and never competes with it.
4. Readable beats decorative: names may be calligraphic, details are plain.
5. Be honest about what is not known yet: placeholders, never invented facts.

## Accessibility & Inclusion

Urdu is right-to-left and needs a proper Nastaliq face and generous line height. Text contrast at least 4.5:1. Honour reduced motion. Tap targets at least 44px. No hover-only interactions.
