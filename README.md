# Johnson Portfolio Site V3

Portfolio site for Alex Johnson, built with Remix 3.

## App Shape

- `app/controllers/home.tsx` owns the home page.
- `app/data/` owns CMS-style site copy, navigation, social links, and project metadata.
- `app/routes.ts` defines the route contract.
- `app/router.ts` wires routes to handlers.
- `app/theme/` owns the Remix UI theme and shared theme helpers.
- `app/ui/` holds the shared document and layout wrappers.
- `app/utils/render.tsx` centralizes HTML response rendering.

## Growing The App

- Start with flat route files and only introduce route folders when a route needs multiple actions or route-owned modules.
- Add directories like `app/data/`, `app/middleware/`, `public/`, or `test/` when the app actually needs them.
- Move shared UI into `app/ui/` once more than one route needs it.

## Commands

```sh
npm i
npm run start
npm test
npm run typecheck
```
