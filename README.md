# sameerwedshania

A personal, animated wedding invitation for Sameer and Hania, built as a one-page React site. Each guest gets their own link (`/<code>`) and sees only their name and the events they are invited to, in English or Urdu. It is made for phones first.

## Where things are

- `project/src/config/invitation.config.ts`: the one file to edit. Couple, events (date, time, venue, map link) and guests (code, name, which events, optional default language). Routes are built from the guest list.
- `AGENTS.md` and `docs/`: the project rules, config contract, language rules, design brief and engineering notes.
- `DESIGN.md`, `PRODUCT.md`: the design system and product facts.

## Run it

From `project/`:

```
npm install
npm run dev             # http://localhost:5173/sameerwedshania/
npm run dev -- --host   # to open it on a phone on the same network
npm test
```

In dev, add `#open` to a guest link (`/sameerwedshania/<code>#open`) to skip the opening tap.

## Build and publish

`npm run build` runs the typecheck and tests, builds to `project/dist` and adds the `404.html` copy that lets `/<code>` links load on GitHub Pages. Publishing `project/dist` to the `gh-pages` branch is manual. Before a real deploy, replace the `TODO` placeholders in the config and remove any test guests.
