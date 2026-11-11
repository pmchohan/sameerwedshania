# Config, routes and visibility

Everything the owner edits lives in one file: `project/src/config/invitation.config.ts`. Types are in `types.ts`, checks in `validate.ts`. The route table is built from this file.

## Contract

```ts
type Lang = 'en' | 'ur';
type Text = string | { en: string; ur: string };   // a plain string shows the same in both languages
type EventKey = 'mehndi' | 'barat' | 'walima';

export const couple: { groom: Text; bride: Text } = {
  groom: { en: 'Sameer', ur: 'سمیر' },
  bride: { en: 'Hania', ur: 'ہانیہ' }, 
};

export const events: Record<EventKey, {
  title: Text;          // { en: 'Mehndi', ur: 'مہندی' }
  date: string;         // 'YYYY-MM-DD'
  time: string;         // 'HH:mm', 24h in config
  venue: { name: Text; address: Text; mapUrl: string };   // mapUrl: a Google Maps share link
  dressCode?: Text;
  note?: Text;
}>;

export const guests: {
  code: string;         // URL path: lowercase [a-z0-9-], unique, e.g. 'achunp'
  name: Text;           // 'Ali' or 'The Khan Family'
  events: EventKey[];   // at least one
  note?: Text;          // optional personal line
  lang?: Lang;          // default language for this guest (an aunt can start in Urdu)
}[];
```

Fixed interface labels (Time, Venue, Tap to open, ...) are not in this file. They live in the language layer (`docs/language.md`).

## Validation (`validate.ts`)

Reject at startup in dev and in tests:

- duplicate guest codes (case-insensitive), or codes outside `[a-z0-9-]`
- guests with no events, or an unknown event key
- invalid `date` or `time` strings
- `mapUrl` that is not `https`
- a `{ en, ur }` text with either side empty

Seed the config with obvious placeholders (`TODO` in venue names). Include the owner's example guest `achunp` (Ali, walima only), plus test guests: one with all three events and one with two. Remove test guests before launch.

## Routes

- The route table is `/` plus one `/<code>` per guest, built from config. It is `.ts` data with no JSX; `App.tsx` is the only file that turns it into router objects.
- A guard (`InviteMiddleware`) resolves the guest from the URL. Unknown paths show the code screen with a gentle "that code didn't match" message. Never reveal valid codes or how many exist.
- Match codes after trim, lowercase and stripping spaces.
- Language is not part of the path. Owners can send `/<code>?lang=ur` to open in Urdu.
- The host must rewrite every path to `index.html`.

## Code screen

Trim and lowercase the input. Use `autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="go"`. Large, thumb-friendly field and button, a real `<label>`, and an `aria-live` error message. The language toggle is visible here too.

## Visibility (hard rule)

- Sections, hero, closing, footer and `<title>` are derived only from the guest's own events.
- Never show a date range, an event count, or a teaser that hints at other events.
- Event sections render in fixed order Mehndi, Barat, Walima, whatever the order in config.
- It applies in both languages and in every state (before and after the opening).
- Test it: for each test guest, in English and in Urdu, the rendered text contains none of the titles, dates or venues of events they are not invited to.
- The hero says who weds whom and names the guest. It does not list events.

## Privacy reality

The whole config ships in the JS bundle, so anyone can read every code. If real secrecy is ever needed, the fix is a tiny serverless endpoint that returns one guest's data. Do not build it now.
