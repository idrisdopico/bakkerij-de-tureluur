# Frontend

The public site is a single page (`src/app/(frontend)/page.tsx`) composed of
section components, rendered server-side and fed by the CMS.

## Components

Each component lives in `src/components/` with a co-located `.module.scss`.
Sections: `hero`, `principles`, `about`, `assortiment` (+ `product-card`),
`contact`, `footer`. Shared primitives: `button`, `section-heading` /
`section-intro`, `dialog`, `icon-button`, `product-image-placeholder`,
`structured-data`. See [architecture.md](./architecture.md) for the server/client
split.

## Design import

The design was hand-ported from a Claude design-canvas export in
`design-import/` (`.dc.html` + `_ds/` bundle). It is **reference-only** — never
imported or run — the source of truth for markup, copy, and tokens. Key rules:

- Design tokens (colors, type, spacing) are CSS custom properties in
  `src/styles/global.scss` using the design system's own names
  (`--surface-page`, `--brand-primary`, `--fs-md`, …) so the `.dc.html` stays a
  1:1 reference.
- **No stock photography** — the design's Unsplash placeholders are not used.
  Use the bakery's own photos (`public/images/`) or
  `product-image-placeholder.tsx`.
- Icons: hand-drawn `currentColor` SVGs (24×24, `strokeWidth={1.5}`) by default,
  or `lucide-react` where a specific glyph is easier to get right.

## Styling

SCSS Modules per component; shared partials in `src/styles/` (`_breakpoints`,
`_mixins`, design tokens in `global.scss`). Mobile-first. Dark mode is handled
via CSS custom properties.

## Accessibility (WCAG 2.1 AA baseline)

Semantic HTML, keyboard operability, correct ARIA/labels, focus management;
`eslint-plugin-jsx-a11y` is enabled and the `check-accessibility` skill audits
the rest. Color pairings were audited against WCAG thresholds — see the
**Accessibility** section of [`AGENTS.md`](../AGENTS.md) for the exact
foreground/background token rules (the brand orange is deliberately AA-only;
most else targets AAA). The page has exactly one `<h1>` (in `Hero`); other
section headings are `<h2>` via `SectionHeading`.

## SEO & metadata

- `src/app/(frontend)/layout.tsx`'s `generateMetadata()` builds
  title/description/Open Graph/Twitter from the Payload globals, with
  `metadataBase` from `NEXT_PUBLIC_SITE_URL`.
- `src/components/structured-data.tsx` emits JSON-LD (`Bakery` / `LocalBusiness`)
  parsed from the same globals the visible page uses.
- `src/app/sitemap.ts` and `src/app/robots.ts` are Next metadata routes
  (one-URL sitemap; `/admin` and `/api` disallowed). Both read
  `NEXT_PUBLIC_SITE_URL` — keep it set to the real origin in production.
