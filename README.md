# Bakkerij de Tureluur

Website for Bakkerij de Tureluur. A standalone Next.js (App Router) + TypeScript + React project, set up with the same tooling as the `next-components` package in `entertainment-web` (SCSS Modules, ESLint + Prettier) — without the monorepo (no Turborepo/pnpm workspaces/changesets), without commit-message enforcement (no Husky/commitlint/lint-staged, since this is a solo project), and without a test setup (no Vitest/React Testing Library). The site's content (text and images) is editable by logging in at `/login`, backed by [Payload CMS](https://payloadcms.com) running inside this same app — see "Backend (Payload CMS)" in `AGENTS.md` for the full architecture.

Visitors can also place an order: a localStorage-backed cart feeds a checkout form that emails the bakery (Cloudflare Turnstile + a honeypot guard the form; no order is stored in a database). The owner can turn ordering off and set the pickup days/policy from `/admin`. See "Ordering (cart → order email)" in `AGENTS.md`.

## Requirements

- Node >=22.18.0
- pnpm >=10.14.0 (`corepack enable` will pick up the pinned version)
- A Postgres database (e.g. [Neon](https://neon.tech)'s free tier works fine for local development)

## Getting started

```bash
pnpm install
cp .env.example .env   # then fill in PAYLOAD_SECRET and DATABASE_URL (the rest have working defaults for local dev)
pnpm dev
pnpm seed               # first run only — populates the CMS with the site's existing copy
```

Then visit `http://localhost:3000` for the site, or `/login` (redirects to `/admin/login`) to sign in and edit content. On a brand-new database, Payload's own "create first user" screen walks you through creating that first login.

Only `PAYLOAD_SECRET` and `DATABASE_URL` are required to boot. The rest are optional locally: without SMTP credentials Payload logs order emails to the console instead of sending them, and Cloudflare's "always passes" Turnstile test keys work for the checkout form. `.env.example` documents each one; the full list and behaviour is under "Environment variables" in `AGENTS.md`.

## Scripts

| Command               | Description                                                     |
| --------------------- | --------------------------------------------------------------- |
| `pnpm dev`            | Start the dev server (Turbopack) — also serves `/admin`         |
| `pnpm build`          | Production build                                                |
| `pnpm start`          | Start the production server                                     |
| `pnpm lint`           | Lint everything under `src/`                                    |
| `pnpm lint:fix`       | Lint and auto-fix                                               |
| `pnpm format`         | Check formatting                                                |
| `pnpm format:fix`     | Format and fix import order                                     |
| `pnpm typecheck`      | Type-check the project                                          |
| `pnpm seed`           | Populate the CMS with the site's existing copy (safe to re-run) |
| `pnpm generate:types` | Regenerate `src/payload-types.ts` after a schema change         |

## Structure

Config lives at the repo root; all source lives under `src/`.

- `src/app/(frontend)/` — the public site's routes, layout, and pages
- `src/app/(payload)/` — Payload's generated admin panel + REST API routes — don't hand-edit these
- `src/backend/` — the CMS backend: collections, globals, access control, hooks, content-fetching functions, and the order server action (`actions/`)
- `src/payload.config.ts` — the Payload composition root
- `src/components/` — shared components, each with a co-located `.module.scss`
- `src/styles/` — global styles and SCSS partials (breakpoints, mixins, design tokens)
- `src/lib/` — framework-agnostic utilities
- `.claude/skills/` — `code-style`, `react-conventions`, `check-accessibility`
- `AGENTS.md` — instructions for AI coding agents working in this repo
