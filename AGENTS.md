# Johnson Portfolio Site V3 Agent Guide

This app was scaffolded with `remix new` and is now being built into Alex Johnson's portfolio site.
Use these conventions when continuing to build it out.

## Commands

```sh
npm i
npm run start
npm test
npm run typecheck
```

## Building Features

Refer to ./agents/skills/remix/SKILL.md

## Current Layout

- `app/controllers/home/controller.tsx` owns the home route
- `app/controllers/home/` holds route-owned home page sections and UI helpers
- `app/data/` owns CMS-style site copy, navigation, social links, and project metadata
- `app/routes.ts` defines the route contract
- `app/router.ts` wires routes to route handlers
- `app/theme/` owns the Remix UI theme and shared theme helpers
- `app/ui/` holds the shared document and layout wrappers
- `app/utils/render.tsx` centralizes HTML response rendering

## Route Ownership

- Start from `app/routes.ts` and map each route to the narrowest owner on disk.
- Keep simple pages in flat files until they need route-owned modules.
- Promote a route into a controller folder with `controller.tsx` only when it gains nested routes, multiple actions, or route-owned modules.
- Keep route-owned page modules next to the route that owns them.
- Move shared UI to `app/ui/`, not `app/controllers/`.

## Build-Out Notes

- This starter intentionally begins small; add directories like `app/data/`, `app/middleware/`, `public/`, and `test/` only when you need them.
- Prefer putting code in the narrowest owner before introducing shared modules.
- Avoid generic dumping-ground directories like `app/lib/` or `app/components/`.
