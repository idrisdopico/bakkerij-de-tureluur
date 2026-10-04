# Backend (Payload CMS)

The site's text, images, product list, and order settings are editable by
logging in — no hard-coded Dutch copy in `.tsx` files. [Payload
CMS](https://payloadcms.com) provides this, running **inside** this Next.js app
(it installs into `src/app/`), backed by Postgres (Neon) and, in production,
Vercel Blob for uploads.

## Content model

**Collections** (`src/backend/collections/`) — repeated documents:

- `users` — Payload's auth/login system (one admin account; no self-registration)
- `media` — image uploads (hero, product photos); `alt` required
- `products` — the assortiment list, with `beschikbaar` (on/off) and `voorraad`
  (weekly stock) per product

**Globals** (`src/backend/globals/`) — one singleton per section: `hero`,
`principles`, `about`, `assortiment` (intro copy only), `contact`, `footer`,
`bestellen` (order settings). Admin display names are Dutch (e.g. "Over ons",
"Voettekst", "Bestelinstellingen").

## The seams

- **`lib/content.ts`** — the only API the frontend/order action use:
  `getHero()`, `getProducts()`, `getBestellen()`, etc. Components never call
  Payload directly. ESLint forbids importing `payload-client` outside
  `src/backend/lib/`.
- **`access/is-admin.ts`** — the single write-access rule for every
  collection/global (reads are public).
- **`hooks/revalidate.ts`** — the single place `revalidatePath('/')` is called.
- **`lib/payload-client.ts`** — a `cache()`-wrapped `getPayload()` so one request
  reuses one client.

## Admin & login

- `/admin` — Payload's generated panel. `/login` just redirects there
  (`src/app/(frontend)/login/page.tsx`).
- The admin needs `src/app/(payload)/admin/importMap.js` to match the active
  plugins. **It must be regenerated whenever plugins change** (e.g. enabling
  Blob storage) and committed — a stale import map crashes the admin to a blank
  page in production. Regenerate with:
    ```bash
    pnpm payload generate:importmap
    ```
    Run it with the same env the target environment uses (e.g. `BLOB_READ_WRITE_TOKEN`
    set) so plugin components are included. See [deployment.md](./deployment.md).

## Types & schema

- **Types:** after changing any field, run `pnpm generate:types` to refresh
  `src/payload-types.ts` (committed).
- **Schema:** the Postgres adapter uses **dev-push** (auto-syncs schema in dev),
  not migrations. Enabling a plugin that adds columns (e.g. Blob's `_objectKey`
  on `media`) requires pushing that change to the target database — the
  production build does not push. See [deployment.md](./deployment.md) for how
  that was synced.

## Seeding

`pnpm seed` populates every global and the product list with the site's
original copy. Safe to re-run: globals upsert, products skip if any exist, and
the hero image is reused if already present. Uploads land in Blob when
`BLOB_READ_WRITE_TOKEN` is set, else local disk.

## Environment

See [deployment.md](./deployment.md) for the full variable list. The two the app
refuses to boot without are `PAYLOAD_SECRET` and `DATABASE_URL`
(`src/payload.config.ts` throws early if either is missing).
