# Documentation

Topic guides for the Bakkerij de Tureluur codebase, written for humans working
on it. For the terse, exhaustive contract that AI coding agents follow, see
[`AGENTS.md`](../AGENTS.md) at the repo root — these docs summarise and link
into it rather than repeat it.

| Doc                                  | What it covers                                                               |
| ------------------------------------ | ---------------------------------------------------------------------------- |
| [architecture.md](./architecture.md) | Project structure, the server/client split, and the data-layer seams         |
| [backend.md](./backend.md)           | Payload CMS: collections, globals, access, hooks, the content layer, seeding |
| [ordering.md](./ordering.md)         | The cart → order-email flow, its security model, stock, and the time window  |
| [frontend.md](./frontend.md)         | Components, the design import, styling, accessibility, and SEO               |
| [deployment.md](./deployment.md)     | Vercel setup, environment variables, the CI/CD pipeline, and the gotchas     |

## Quick orientation

- **Stack:** standalone Next.js (App Router) + TypeScript + React, with
  [Payload CMS](https://payloadcms.com) embedded in the same app for editable
  content and order handling.
- **One page, many sections:** the public site is a single route
  (`src/app/(frontend)/page.tsx`) composed of section components, each fed by
  the CMS.
- **Getting started / scripts:** see the root [README](../README.md).
- **Conventions:** `AGENTS.md` plus the `code-style` and `react-conventions`
  skills in `.claude/skills/`.
