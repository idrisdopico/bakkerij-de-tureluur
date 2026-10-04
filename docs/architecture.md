# Architecture

A standalone Next.js (App Router) app with Payload CMS embedded in the same
project. Config lives at the repo root; all source lives under `src/`.

## Directory map

```
src/
  app/
    (frontend)/      Public site: layout, the single homepage route, /login redirect
    (payload)/       Payload-generated admin panel + REST API (/admin, /api). DO NOT hand-edit.
  backend/           The CMS backend (see backend.md)
    collections/     users, media, products
    globals/         hero, principles, about, assortiment, contact, footer, bestellen
    access/          is-admin.ts — the single write-access decision
    hooks/           revalidate.ts — the single place paths are revalidated
    actions/         submit-order.ts — the order server action (see ordering.md)
    lib/             content.ts, payload-client.ts, email, stock, turnstile, rich-text
    seed.ts          One-time content seed
  components/        Shared React components, each with a co-located .module.scss
  hooks/             Reusable client hooks (one per file)
  lib/               Framework-agnostic utilities (dates, cn)
  styles/            Global styles, SCSS partials, design tokens
  payload.config.ts  Payload composition root (thin; composes src/backend/*)
  payload-types.ts   Generated types — committed on purpose
```

## The two seams that matter

1. **Data-layer seam.** Components and the order action never touch Payload or
   the database directly — they only call functions from
   `src/backend/lib/content.ts`. Only files inside `src/backend/lib/` may import
   `payload-client.ts`. This is enforced by ESLint (`import/no-restricted-paths`
   for `src/components` and `src/app/(frontend)`), so swapping the storage layer
   would touch one file. See [backend.md](./backend.md).
2. **Single access decision.** Every collection/global's create/update/delete
   defers to `src/backend/access/is-admin.ts` — no inlined `req.user` checks.

## Server vs. client

Everything renders on the server by default. `'use client'` is confined to
exactly three clusters, and nothing else should add it:

- `src/components/site-header.tsx` (menu state, scrollspy)
- the cart cluster under `src/components/cart/`
- `src/components/dialog.tsx` (the shared modal shell both build on)

Section components (`hero`, `about`, `principles`, `contact`, `footer`,
`assortiment`) are `async` server components that each fetch via one
`content.ts` function. No server secret is read in client code — only
`NEXT_PUBLIC_*` vars appear there.

## Rendering & revalidation

The homepage is statically rendered from CMS content and revalidated on demand:
every collection/global change calls `revalidatePath('/')` through the factories
in `src/backend/hooks/revalidate.ts` (the one place that logic lives).
