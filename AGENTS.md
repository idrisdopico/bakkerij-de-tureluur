# AGENTS.md

Instructions for AI coding agents operating in this repository.

This file is the terse standard. For the fuller React/architecture playbook — file-internal structure, hooks, styling, and before/after recipes for hook anti-patterns — see the **`react-conventions`** skill in `.claude/skills/`. For the mechanical style contract, see the **`code-style`** skill.

## Commands

```bash
# Install dependencies (requires pnpm 10.14.0+, node 22.18.0+)
pnpm install

# Lint
pnpm lint

# Fix lint issues
pnpm lint:fix

# Check formatting
pnpm format

# Fix formatting
pnpm format:fix

# Type-check
pnpm typecheck

# Dev server (also boots Payload — see "Backend (Payload CMS)" below)
pnpm dev

# Production build
pnpm build

# Populate the database with the site's existing copy (safe to re-run)
pnpm seed

# Regenerate src/payload-types.ts after changing a collection/global's fields
pnpm generate:types
```

## Project structure

Standalone Next.js (App Router) project — not a monorepo. Config lives at the repo root; all source lives under `src/`.

- `src/app/(frontend)/` — the public site's routes, layout, and pages (Next.js App Router). A route group, not a URL segment — `(frontend)` doesn't appear in any path.
- `src/app/(payload)/` — Payload-generated admin panel + REST API routes (`/admin`, `/api/...`). Marked "DO NOT MODIFY" in each file for a reason — see "Backend (Payload CMS)" below.
- `src/backend/` — the CMS backend itself: collections, globals, access control, hooks, the content-fetching functions components call, and the order server action (`actions/`). See "Backend (Payload CMS)" for the full layout and reasoning.
- `src/payload.config.ts` — the Payload composition root; thin on purpose, composes what's under `src/backend/`.
- `src/components/` — shared React components, each with a co-located `.module.scss`
- `src/hooks/` — reusable custom hooks (`use-thing.ts`), one hook per file
- `src/styles/` — global styles, SCSS partials (breakpoints, mixins), design tokens
- `src/lib/` — framework-agnostic utilities
- `.claude/skills/` — `code-style`, `react-conventions`, `check-accessibility`

## Code style

### File and directory naming

All files and directories use **lowercase kebab-case**: `site-header.tsx`, `use-site-header.ts`.

### Imports

- **Named exports only** — no default exports (Next.js special files like `page.tsx`/`layout.tsx` are the required exception)
- Import order is tooling-owned by the Prettier import-sort plugin — don't hand-order, run `pnpm format:fix`
- Use `import type { ... }` for type-only imports

### TypeScript

- Strict mode enabled. Never use `as any`, `@ts-ignore`, or `@ts-expect-error`.
- **Always use `type`, never `interface`** (enforced by ESLint)
- Internal component props: `type Props = { ... }` (not exported)
- Exported props: `type ComponentNameProps = { ... }`
- Never use TypeScript enums — use `as const` objects or union types
- Use optional chaining (`?.`) and nullish coalescing (`??`). Avoid non-null assertions (`!`).
- Unused variables must be prefixed with `_`

### React components

- **Named function declarations** — not arrow functions, not default exports:
    ```tsx
    export function SiteHeader({ title }: SiteHeaderProps) {
        // ...
    }
    ```
- Component name must match file name in PascalCase (e.g., `SiteHeader` in `site-header.tsx`)
- One component per file. Extract hooks, utilities, types to separate files.
- Use early returns for loading/error states before the main render
- Prefer event handlers over `useEffect` for responding to user actions
- `useEffect` only for synchronizing with external systems; extract effects into named custom hooks
- `useRef` only for DOM nodes, mutable non-render values, and timer/subscription handles — never for state
- Compute derived state during render; reach for `useMemo`/`useCallback` only when profiling shows a genuine need

### Formatting (Prettier)

- Single quotes, trailing commas, semicolons
- Print width: 80, tab width: 2
- `arrowParens: 'avoid'`, `bracketSameLine: true`

## Accessibility

WCAG 2.1 AA baseline. Semantic HTML, keyboard operability, correct ARIA/labels, focus management. `eslint-plugin-jsx-a11y` is enabled; the `check-accessibility` skill audits what ESLint can't.

### Color contrast

Every text/background color pairing was audited against WCAG contrast thresholds (normal text: AA 4.5:1, AAA 7:1; large text ≥24px: AA 3:1, AAA 4.5:1) and fixed where it fell short. Most pairings hit AAA; the brand orange (`--accent`/`--orange-500`/`--orange-600`) is the deliberate exception — no shade of it dark enough to hit AAA as text still reads as "orange" rather than brown, so orange-as-foreground is held to AA instead, everything else to AAA. Keep new color pairings at least AA — ideally AAA — rather than reintroducing a failure:

- **Orange as text/foreground** (the brand accent color) is AA-only, by design: use `--orange-700` for **large** text/icons (≥24px, only needs 3:1) — it's the more vivid, closer-to-brand-orange option. Use `--accent-text` (`--orange-800`, darker) for **normal-size** text — `--orange-700` doesn't clear 4.5:1 against `--green-100`. Never use bare `--accent`/`--orange-500`/`--orange-600` as text color — neither clears AA at any size against this app's backgrounds.
- `Button`'s `.accent` variant (white text on a solid orange background) uses `--orange-700` as its base background and `--orange-800` on `:hover` — white text on plain `--accent`/`--orange-500` only reaches ~2.7:1; `--orange-700` is the lightest step that clears AA's 4.5:1.
- Everything **not** orange targets AAA: `--brand-primary` (`--green-700`) is AAA for large text anywhere, and for normal-size text only against `--surface-page`/`--surface-card`/white — use `--brand-primary-hover` (`--green-800`) for normal-size text/icons that might sit on `--surface-sunken`/`--green-100` instead. `--text-muted` is `--ink-700` (not `--ink-500`, which fell short of AAA on most backgrounds). The global `a`/`a:hover` colors are `--green-800`/`--green-900` (not `--green-700`/`--green-800`) so any future plain `<a>` is AAA-safe by default.
- `hero.tsx`'s heading/tagline sit over a photo + gradient overlay, so contrast can't be computed exactly — the darkest, most heavily-overlaid end of the gradient was used as a worst-case approximation. `--cream-50` (heading) clears AAA there; `--orange-400` (tagline) clears AA but not AAA. Re-verify visually if the hero photo or overlay ever changes.
- Opacity-based text (footer's `.value`/`.label`/`.tagline`) needs the _blended_ color checked, not the base token — text at `opacity: 0.8` over `--surface-inverse` only cleared AAA by ~0.2, so it's `0.9` now for real margin.

## Commits

No commit-message enforcement is wired up (no Husky/commitlint/lint-staged) — this is a solo project, not a team monorepo. Conventional-commit style is still a reasonable default if you want one:

```
feat|fix|chore|refactor|ci|revert: description
```

## Best practices

- No speculative abstractions — solve the current problem only
- Match existing code style, even if you'd do it differently
- Clean up only what your changes made unused — don't "improve" adjacent code

## Performance

- `tsconfig.json` has `noUnusedLocals`/`noUnusedParameters` on, so `pnpm typecheck` catches dead code (unused variables, params, imports) as a build error, not just a lint warning — keep both enabled.
- Client components (`'use client'`) are limited to three zones: `src/components/site-header.tsx` (menu state, scrollspy), the cart cluster under `src/components/cart/` (basket state, drawer/modal, checkout), and the shared `src/components/dialog.tsx` shell those two build on (scroll-lock/Escape/focus-trap). Everything else renders server-side by default; don't add `'use client'` to a component unless it actually needs state, effects, or browser APIs.
- Images: `next.config.mjs` sets `images.formats` to serve AVIF/WebP (smaller than the source format) wherever the browser supports it. Keep source images reasonably sized for how they're actually displayed — `public/logo.png` was originally a 3213×2296 export rendered at 68×68 CSS px; it's now downscaled to 256×183 (~4x the display size, enough headroom for high-DPI screens) rather than shipping an oversized source for Next's optimizer to resize on every request. Above-the-fold images (`hero.tsx`'s background, the header logo) use `priority` so they're not lazy-loaded; everything else lazy-loads by default (next/image's default), which is correct for below-the-fold content like the product grid.

## Backend (Payload CMS)

The site's text and images (headline, principles, "Over ons" copy, the product list, contact details, footer) are editable by logging in — no more hard-coded Dutch copy in `.tsx` files for these. [Payload CMS](https://payloadcms.com) provides that: it's Next.js-native (it installs directly into this app's `/app` folder rather than running as a separate service), MIT-licensed, and self-hosted alongside the rest of the app.

### How it's wired in

Payload requires two things in `src/app/`: its own route group (`(payload)`, holding the generated `/admin` panel and REST API) as a sibling of the site's own routes (moved into `(frontend)` to make room). Every file under `(payload)` is marked "DO NOT MODIFY" for a real reason — Payload can regenerate them, and none of this app's own logic lives there. `next.config.mjs` wraps the Next.js config in `withPayload()`, and `tsconfig.json`'s `@payload-config` path alias points at `src/payload.config.ts`, the composition root.

### `src/backend/` layout

Payload's own conventions already suggest natural, single-purpose seams (a collection is one concern, a global is one concern, access control is a pure function); `src/backend/` just gives each of those its own file instead of piling everything into `payload.config.ts`:

- `collections/` — `users.ts` (auth/login only, no content fields), `media.ts` (image uploads), `products.ts` (the assortiment list — the one section that's a repeated list of documents, not a fixed block of text, so it's a Collection rather than a Global)
- `globals/` — one file per singleton section: `hero.ts`, `principles.ts`, `about.ts`, `assortiment.ts` (the surrounding intro copy; the products themselves are the collection above), `contact.ts`, `footer.ts`, `bestellen.ts` (the order feature's settings — the on/off kill switch, the pickup days, and the pickup policy shown at checkout; see "Ordering" below)
- `actions/` — `submit-order.ts` (a `'use server'` action that receives a cart + customer details and emails the bakery) and `order-types.ts` (its shared `SubmitOrderInput`/`SubmitOrderResult` types, kept in a plain module because a `'use server'` file may only export async functions). See "Ordering" below.
- `access/is-admin.ts` — the one place "who can write here" is decided. Every collection/global's `create`/`update`/`delete` depends on this function rather than inlining its own `Boolean(req.user)` check — a single admin account today, but only this file would need to change if roles are ever introduced (Dependency Inversion: configs depend on this abstraction, not their own copy of the logic).
- `hooks/revalidate.ts` — three small factories (`revalidateGlobal`, `revalidateCollectionChange`, `revalidateCollectionDelete`) that call Next's `revalidatePath`. Every section lives on the single homepage route, so this is the one place "which path does a content change affect" is decided, instead of that logic being duplicated across six config files.
- `lib/payload-client.ts` — a `cache()`-wrapped `getPayload({ config })`, so one request reuses one client instance instead of each content-fetcher below re-initializing it.
- `lib/content.ts` — `getHero()`, `getPrinciples()`, `getAbout()`, `getAssortimentIntro()`, `getProducts()`, `getContact()`, `getFooter()`, `getBestellen()`, plus `getProductsByIds()` (used by the order action to re-derive canonical product data from a submitted cart, never trusting the client's names). **Components and the order action only ever call these, never `getPayloadClient()`/Payload's API directly** — that's the Dependency Inversion seam for the frontend side: if the storage layer ever changed, only this file would need to. This seam is now ESLint-enforced (nothing outside `src/backend/lib/` may import `payload-client`).
- `lib/rich-text.ts` — `richTextFromParagraphs()`, turning plain strings into the Lexical JSON shape a `richText` field expects; used by `seed.ts`.
- `lib/email.ts` — `sendEmail()`, a thin wrapper over Payload's configured email transport, so Payload's mail is only ever reached through here (same seam as `content.ts`). Without SMTP credentials Payload logs the message to the console instead of sending it.
- `lib/turnstile.ts` — `verifyTurnstile()`, server-side verification of a Cloudflare Turnstile token against Cloudflare's `siteverify`. Fails closed (any missing config / network error / non-OK response → not verified); the secret never reaches the client.
- `lib/stock.ts` — `decrementProductStock()`, the one place that writes product stock back to Payload (the order action's post-email step); lives here so Payload is still only reached through the `lib/` layer.
- `seed.ts` — one-time cutover seed (see below).

Every section component under `src/components/` (`hero.tsx`, `principles.tsx`, `about.tsx`, `assortiment.tsx`, `contact.tsx`, `footer.tsx`) is now `async`, fetching its content via exactly one `content.ts` function each. `about.tsx`/`assortiment.tsx`'s prose fields are rich text, rendered back to JSX via Payload's own `RichText` component (`@payloadcms/richtext-lexical/react`) rather than a hand-rolled renderer — see `about.module.scss`'s/`assortiment.module.scss`'s `.paragraph`/`.copy` classes for how they're styled (nested `p` selectors, since `RichText`'s children are plain `<p>` tags it renders itself, not individually-classed elements).

### `/login`

`src/app/(frontend)/login/page.tsx` redirects to Payload's real login screen at `/admin/login`, rather than renaming Payload's internal admin route to `/login` outright. Renaming is possible (`admin.routes` in `payload.config.ts`) but isn't done here: it requires the `(payload)` folder structure to mirror the new path exactly, and Payload's issue tracker has open reports of the admin panel breaking when that route moves away from the default. A redirect gets the same practical result — visiting `/login` lands you in the login flow — without that risk.

### Environment variables

Copy `.env.example` to `.env` (gitignored) and fill in:

- `PAYLOAD_SECRET` — signs tokens/session cookies. Generate with e.g. `openssl rand -base64 32`; keep it stable across deploys. `src/payload.config.ts` throws at boot if this or `DATABASE_URL` is missing, rather than starting with signing silently disabled.
- `DATABASE_URL` — a Postgres connection string (Neon, Vercel Postgres, or any Postgres host).
- `BLOB_READ_WRITE_TOKEN` — only needed for Vercel Blob storage in production. Without it, `src/payload.config.ts` falls back to Payload's default local-disk storage in a top-level `/media` directory (gitignored), so uploads work locally without provisioning Blob storage just to run `pnpm dev`.
- `NEXT_PUBLIC_SITE_URL` — the public origin (no trailing slash), used for canonical URLs, Open Graph, `sitemap.xml`, `robots.txt`, and JSON-LD. Defaults to `http://localhost:3000` when unset.
- `SMTP_USER` / `SMTP_PASS` — Gmail SMTP credentials for sending order emails (`SMTP_PASS` is a Google **App Password**, not the account password). Leave both blank locally to have Payload log emails to the console; the order action refuses to report success in production when they're unset (see "Ordering").
- `ORDER_TO_EMAIL` — the fixed address order emails are sent to (never a customer-supplied one). Defaults to `SMTP_USER`.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile keys guarding the order form. Without the site key the checkout form disables itself and shows a "not available" message; Cloudflare's "always passes" test keys work for local development.

### Seeding

`pnpm seed` (`payload run src/backend/seed.ts`) populates every global and the product list with the copy this site already had hard-coded, so the public pages aren't blank the moment the backend goes live. Safe to re-run — globals are upserted, and the product seed skips entirely if any products already exist.

### Sandbox limitation

This repo is sometimes worked on in a sandbox with no npm registry access and no real Postgres database (see the pre-existing "no working `pnpm`/`next build`" limitation this file already documented before Payload was added). In that environment, changes to anything under `src/backend/`, `src/payload.config.ts`, or the `(payload)` route group can only be verified with `tsc --noEmit`/`prettier --check`/direct `sass` compilation — the same way the rest of this app is verified there — and `tsc` will report `Cannot find module 'payload'` (and friends) until `pnpm install` actually runs somewhere with registry access. That is expected in that environment, not a bug in the code; a genuine problem shows up as an error _other than_ "Cannot find module" for a Payload package, or as an error in a file this backend work didn't touch.

## Ordering (cart → order email)

Beyond editable content, the site takes orders: a customer fills a basket ("bestelling" in the UI) and submits it, and the bakery receives the order as an email. **No order _record_ is persisted — the "order" is an email**, and there's no automatic reply to the customer (the confirmation modal says so). The one thing an order _does_ write back to the database is per-product **stock** (`voorraad`), decremented after the email is sent (see below).

- **Cart state** lives entirely client-side in one React context, `src/components/cart/cart-context.tsx`, persisted to `localStorage` (key `bakkerij-de-tureluur-cart`; carts older than 7 days are discarded on load; per-line quantity capped at the product's remaining stock, then the global 99). Hydration is deliberate — the cart stays empty until a post-paint effect reads storage, so SSR and first client render match. The drawer auto-opens only on the **first** add of the session (a `hasAutoOpened` ref), not every add. The context's exposed `isOrderingEnabled` is the CMS `ordersEnabled` flag (threaded from `layout.tsx`) **AND** the live time window (`useOrderingOpen`, see below); it gates the entry points (cart button, add-to-order buttons). The `CartOverlay` (drawer + confirmation modal) is mounted from `layout.tsx` whenever the CMS flag is on (that gate is cache-safe; the time window is applied on the client).
- **The client cluster** (`src/components/cart/`, all `'use client'`): `cart-button.tsx` (header basket + badge), `add-to-cart-button.tsx` (visible label "Toevoegen", full "Voeg toe aan bestelling — …" in the `aria-label`; on each `product-card.tsx`), `cart-drawer.tsx` (the "Bestelling" panel, built on the shared `Dialog`; its "+" stepper disables at the per-line stock cap), `checkout-form.tsx` (the order form — real `<input>`s + a honeypot + `TurnstileWidget`; sends only `{ productId, quantity }`, never product names; the pickup-day options show the resolved date, e.g. "Zaterdag 26 sep."), `order-confirmation-modal.tsx`, `cart-overlay.tsx` (owns the drawer↔modal handoff), `turnstile-widget.tsx`, `ordering-closed-notice.tsx` (shown in the assortiment when the window is closed but the CMS flag is on).
- **The server action** `src/backend/actions/submit-order.ts` is the source of truth and is hardened deliberately (this is a public endpoint, so its TypeScript argument type is only a hint): it re-validates the payload shape at runtime, checks the honeypot, re-verifies Turnstile server-side, strips CR/LF from single-line fields (email-header-injection defence), bounds every field/quantity, checks the CMS `ordersEnabled` flag **and** the time window (`isOrderingOpen`), validates `pickupDay` against the `bestellen` global's allow-list, **re-derives product data from Payload by id** (name/weight/availability/stock — the email is built from DB data, never client input), rejects switched-off (`beschikbaar: false`) or out-of-stock products and quantities over remaining stock, and only ever sends to the fixed `ORDER_TO_EMAIL` (so the form can't be used as an open relay). The pickup day is resolved to a concrete date in the email ("Afhaaldag: Zaterdag 26 september"). It returns a plain `{ ok }` result instead of throwing. In production with no SMTP configured it fails loudly rather than reporting a success Payload would only console-log — losing the order silently. **After** the email is sent it decrements each product's `voorraad` (best-effort via `src/backend/lib/stock.ts`, clamped at 0) — deliberately after, so a stock-write failure can't fail an order that already reached the bakery.
- **Per-product availability & weekly stock** (`Products` collection): `beschikbaar` is a manual on/off switch (the owner flips it per week); `voorraad` is the remaining stock for the week, set by hand each Monday (no auto-reset). An order counts down `voorraad`; at 0 the public card shows "Uitverkocht" (a switched-off product shows "Tijdelijk niet beschikbaar"). Both are only "off" on an explicit `false`/`0`, so products predating these fields stay orderable. `product-card.tsx` renders the right state; the decrement's `revalidatePath('/')` (the collection's `afterChange` hook) refreshes the public page.
- **The ordering time window** (`src/lib/dates/ordering-window.ts`, `isOrderingOpen()`): closed all day Saturday/Sunday and Monday before 12:00, open Monday 12:00 through Friday, anchored to Amsterdam time. Hardcoded (not a CMS setting). It's evaluated **live on the client** (`src/hooks/use-ordering-open.ts` — the homepage is statically rendered, so a server-baked time answer would be stale; the hook starts optimistically open to avoid a hydration mismatch, then re-checks each minute and on tab focus) and again **server-side in the action** (the cache-free authority).
- Ordering is closed (UI hidden + server rejects) whenever any of these say so: the CMS `ordersEnabled` flag, the time window, or — per product — `beschikbaar`/`voorraad`.

## SEO & metadata

- `src/app/(frontend)/layout.tsx`'s `generateMetadata()` builds title/description/Open Graph/Twitter from the Payload globals (hero tagline, contact copy, hero image), with `metadataBase` from `NEXT_PUBLIC_SITE_URL`.
- `src/components/structured-data.tsx` renders server-side JSON-LD describing the bakery as a schema.org `Bakery` (a `LocalBusiness`) — address, opening hours, email, Instagram — all parsed from the same footer/contact globals the visible page uses, so structured data can't drift from the page. It escapes `<` in the serialized JSON to prevent tag-breakout.
- `src/app/sitemap.ts` and `src/app/robots.ts` are Next metadata routes: a one-URL sitemap (single-page site) and a robots policy that disallows `/admin` and `/api`. Both read `NEXT_PUBLIC_SITE_URL`.

## Shared UI primitives

- `src/components/dialog.tsx` (`'use client'`) is the shared modal shell behind both the cart drawer and the order-confirmation modal: the fixed overlay + backdrop, the `role="dialog"` panel, and the scroll-lock / Escape / focus-trap / `inert`-when-closed wiring (via `use-body-scroll-lock`, `use-escape-key`, `use-focus-trap`). Consumers pass only panel styling (`align: 'end' | 'center'`) and content. This is the third `'use client'` zone alongside `site-header.tsx` and the cart cluster — see "Performance".
- `src/components/icon-button.tsx` is a small server-safe presentational button for icon-only actions (used across the cart UI).

## Design import

The project's standing instructions reference importing a Claude design file (`Bakkerij de Tureluur.dc.html` and its `_ds/` design-system bundle) via a `claude_design` MCP tool. That tool isn't available in every environment this repo is worked in — if it's missing, say so rather than fabricating design tokens or markup, and ask how to proceed.

The design was exported manually and lives at `design-import/` (`Bakkerij de Tureluur.dc.html`, the `_ds/` design-system bundle, `assets/logo.png`). It is a reference-only source — a `.dc.html` "design canvas" file with inline styles and a bespoke `DCLogic` component runtime, not real React/Next.js code. Treat it as the source of truth for markup, copy, and tokens, but hand-port each section into real components under `src/` rather than trying to run or import the file directly:

- Design tokens (colors, typography, spacing, radius, shadows) are copied into `src/styles/global.scss` as CSS custom properties, using the same variable names as the design system (`--surface-page`, `--brand-primary`, `--fs-md`, etc.) so the `.dc.html` file can still be used as a reference 1:1.
- `src/components/site-header.tsx` is ported from the `<nav>` in `Bakkerij de Tureluur.dc.html`, built mobile-first (base CSS = the mobile hamburger + full-screen overlay, `min-width: 860px` layers on the desktop link row — matches the original's `window.innerWidth < 860` split, but as a CSS media query instead of a JS resize listener, to avoid SSR/hydration mismatches). Beyond the original design: the hamburger animates into an X on open and has a small hover nudge on its middle line; the mobile menu covers the full viewport (not a small dropdown) and stays mounted with `inert` so it can fade/slide instead of snapping. `src/hooks/use-body-scroll-lock.ts` and `use-escape-key.ts` back the overlay (lock page scroll while open, close on Escape); focus moves into the first link on open and back to the toggle on close. The sticky header shrinks once the page is scrolled past the top (`src/hooks/use-scrolled.ts`), so its height isn't constant; `src/hooks/use-element-height.ts` measures it live via `ResizeObserver` and the header writes that into the `--header-height` CSS variable (which `scroll-padding-top` reads) rather than hardcoding a number that's only right in one state. `src/hooks/use-active-section.ts` drives scrollspy — an `IntersectionObserver` over each nav target's section `id`, offset by that measured header height (its `topOffset`) — so a link only gets `data-active`/`aria-current="page"` once its section is actually visible below the header, not the design's original hardcoded "Home" link. Clicking a link also sets a short-lived `clickOverrideHref` in `site-header.tsx` (`CLICK_OVERRIDE_MS`) so the link highlights immediately instead of waiting out the in-page smooth-scroll for the observer to catch up. No link shows `data-active`/`aria-current` at all until the visitor has actually scrolled or clicked a nav link — `activeHref` is gated on `hasScrolled` (`src/hooks/use-has-scrolled.ts`, a one-way latch that flips on the first real `scroll` event) OR `hasClicked` (a same-shaped latch set inside `handleNavLinkClick`), so the page loading at the top doesn't make "Home" read as active on its own. A click still wins immediately over an in-flight scroll via `clickOverrideHref`, and also flips `hasClicked` itself so the gate opens even when clicking doesn't produce a real scroll event (e.g. clicking "Home" while already at the top).
- `src/components/hero.tsx` is ported from the `#home` section. Its two CTAs are real `<Link>`s (`mailto:`, `#assortiment`) via the shared `Button` component, not `onClick` handlers. Its background photo is one of the bakery's own photos (`public/images/hero.jpg`, sourced from `images/` at the repo root), rendered via a plain `next/image`.
- `src/components/button.tsx` ports the design system's `Button.jsx` (read from `design-import/_ds/.../_ds_bundle.js`, not guessed from inline styles) — variants `primary`/`secondary`/`accent`, sizes `md`/`lg`. Extend it (don't fork it) as more sections need it.
- The design's photos are all hotlinked Unsplash stock (see `design-import/image-slot.js`'s credit-overlay behavior), which don't represent this bakery — **we don't use Unsplash or any stock photography in this project.** There is no `AttributedImage`/credit-chip component; it was removed once the hero switched to a real, owned photo. Use the bakery's own photos (`public/images/`, sourced from `images/` at the repo root) via a plain `next/image`, or `src/components/product-image-placeholder.tsx` where no real photo exists yet (the fallback for any product without an uploaded `foto`).
- `src/components/section-heading.tsx` ports the design system's `SectionHeading.jsx`, with one deliberate deviation from the design: title/eyebrow/subtitle render as a real heading (`level` prop, default `h2`) plus `<p>`s inside an `<hgroup>`, not `<div>`s — the design's markup used bare `<div>`s for all three, which breaks the document outline for search engines and assistive tech. `src/components/section-intro.tsx` wraps it with the icon-badge layout and the `--fs-2xl`/`--text-body`/`--text-muted` local token overrides that every section intro in the design repeats identically (principles, "Over ons", assortiment, contact) — pass `icon`/`iconBackground`/`title`/`subtitle` rather than duplicating the wrapper.
- The page has exactly one `<h1>` (in `Hero`); every other section heading renders through `SectionHeading`'s default `level="h2"`. `src/components/site-header.tsx` is rendered in `src/app/(frontend)/layout.tsx` as a sibling of `{children}`, not inside `<main>` in `page.tsx` — a `<header>` only gets the implicit "banner" landmark role when it isn't a descendant of `main`/`article`/`aside`/`nav`/`section`, so nesting it inside `<main>` was stripping that landmark.
- `src/components/principles.tsx` is ported from the "Onze uitgangspunten" section. The design's `<ul>` is rendered as an `<ol>` instead — the numbering (`p.num`) is meaningful content, not decoration, so an ordered list is more correct; `list-style: none` keeps it visually identical.
- `src/components/about.tsx` is ported from the `#over` section. Its icon deviates from the design (a heart) and from `principles.tsx`'s hand-drawn inline SVG — it's `lucide-react`'s `Bird` (`strokeWidth={1.5}` to match the weight of the hand-drawn icons elsewhere), fitting the bakery's own tureluur/wading-bird branding.
- `SectionIntro`'s `--fs-2xl: var(--fs-3xl)` title override is applied from the `medium` (768px) breakpoint up only, not unconditionally — at the un-overridden mobile default (`--fs-2xl`, 36px) the title fits narrow screens; the original design's unconditional 48px override didn't.
- `src/components/assortiment.tsx` (`#assortiment`) is ported from the products section. Its icon is `lucide-react`'s `Croissant` (`strokeWidth={1.5}`), not a hand-drawn SVG — same library-icon swap as `about.tsx`'s `Bird`/`contact.tsx`'s `Birdhouse`. `src/components/product-card.tsx` splits out the repeated per-product card (image, name, ingredients, weight, add-to-cart) that the design renders 17 times via `sc-for` — `Assortiment` maps the products from Payload over it. Each card shows the product's uploaded `foto` via `next/image` when it has one and falls back to `ProductImagePlaceholder` (an icon tile) otherwise; we never substitute stock photos. The card also renders `AddToCartButton` (a client island in the otherwise-server card — see "Ordering"). The grid is a `<ul>`/`<li>` (an unordered collection, unlike `Principles`' meaningfully-numbered list), each card's product name is an `<h4>` (one level below the section's `<h2>` "De producten" and the "Overzicht assortiment" `<h3>`), matching the copy's own heading depth.
- `src/components/contact.tsx` (`#contact`) is ported from the contact section, with a deliberate deviation from the design: the original was a form (name/email/order `Input`s + a "Versturen" button) with no submission behavior wired up. A `mailto:`-driven form is fragile as a stand-in anyway — it depends on the visitor having a desktop mail client configured, and "submitting" really just opens an unsent draft they still have to notice and send themselves, so the order can be silently lost with no confirmation either way. Instead this just shows the bakery's email address as plain, prominent, copy-pasteable text (a `mailto:` link on top of that, not the only way to reach it) — the contact section itself has no form. (Ordering later added a real order form, `src/components/cart/checkout-form.tsx`, but it uses raw `<input>`s, not a ported reusable `Input` component — there's still no `Input` component in this repo.) Its icon is `lucide-react`'s `Birdhouse` (`strokeWidth={1.5}`), not a hand-drawn SVG — same swap as `about.tsx`'s `Bird`, chosen over the more literal `Mail`/`AtSign` to stay on the tureluur/bird theme (a birdhouse being where you'd go to reach the bird) without repeating `about.tsx`'s exact icon. `lucide-react` is now a dependency; reach for a hand-drawn `currentColor` stroke SVG (24×24, `strokeWidth={1.5}`, round caps/joins — see `principles.tsx`'s `PrinciplesIcon`) as the default for a new section icon, and pull from the library instead when a specific, recognizable glyph is easier to get right from `lucide-react` than to hand-draw.
- `src/components/footer.tsx` is ported from the `<footer>`. Rendered in `layout.tsx` as a sibling of `{children}`, same landmark reasoning as `SiteHeader` — a `<footer>` only gets the implicit "contentinfo" role when it isn't nested inside `main`/`article`/`aside`/`nav`/`section`. The four info groups (opening hours, contact, address, socials) are a `<dl>` of label/value pairs rather than headings, since they're quick-reference terms, not new page sections; the physical address specifically uses `<address>`.
- `design-import/support.js` and `design-import/image-slot.js` are runtime glue for the `.dc.html` preview sandbox — don't port them, they don't apply to a real Next.js app (their _behavior_, like the credit overlay, is worth porting; the files themselves aren't).
