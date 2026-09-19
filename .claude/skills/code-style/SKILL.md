---
name: code-style
description: The mechanical code-style rules for this project — file/directory naming, import shape and ordering, TypeScript rules, and formatting. Use when writing, modifying, or reviewing any TS/TSX in this repo. For React patterns and architecture, use the react-conventions skill instead.
---

# Code style

The style contract for TS/TSX in this repo: naming, imports, TypeScript, formatting. These are mechanical rules — most are (or should be) enforced by ESLint/Prettier, so the fastest way to comply is `pnpm lint:fix && pnpm format:fix`. This skill is the reference for when a rule fires and why. For React patterns and architecture, see the **`react-conventions`** skill.

Each rule is tagged **[lint]** (ESLint-enforced), **[prettier]** (formatter-owned), or **[convention]** (not mechanized — you must follow it by hand).

## File and directory naming

- **[convention]** All files and directories are **lowercase kebab-case**: `site-header.tsx`, `use-site-header.ts`, `site-header.module.scss`.
- **[convention]** Component file name is the kebab-case of the component: `SiteHeader` → `site-header.tsx`.
- **[convention]** One component per file. Co-locate its `.module.scss` beside it.

## Imports

- **[lint]** **Named exports only — no default exports** (Next.js special files like `page.tsx`, `layout.tsx`, `not-found.tsx` are the required exception).
- **[prettier]** **Import order is tooling-owned** by `@trivago/prettier-plugin-sort-imports` (`.prettierrc.js`): third-party → `@/*` aliases → relative `./`, blank-line separated. Don't hand-order — ESLint's `import/order` is intentionally off. Just run `pnpm format:fix`.
- **[lint]** Use `import type { ... }` for type-only imports.
- **[convention]** Prefer the `@/*` alias over long relative paths (`../../../`); reserve `./` for co-located files.

## TypeScript

- **[lint]** Strict mode. **Never** `as any`, `@ts-ignore`, or `@ts-expect-error`.
- **[lint]** **Always `type`, never `interface`** (`consistent-type-definitions: ['error', 'type']`).
- **[lint]** **Never** TypeScript `enum` — use `as const` objects or union types.
- **[lint]** Unused variables must be `_`-prefixed (`_unusedParam`).
- **[convention]** Internal component props are `type Props = { ... }` (not exported); exported props are `type ComponentNameProps = { ... }`.
- **[convention]** Use optional chaining (`?.`) and nullish coalescing (`??`); avoid non-null assertions (`!`).
- **[convention]** Don't annotate component return types — let TypeScript infer them.

## Formatting (all [prettier] — never hand-format, run `pnpm format:fix`)

- Single quotes, trailing commas, semicolons
- Print width 80, tab width 2
- `arrowParens: 'avoid'`, `bracketSameLine: true`

## How to comply fast

```bash
pnpm format:fix    # formatting + import order
pnpm lint:fix      # auto-fixable lint rules
pnpm lint          # report what can't be auto-fixed
```

The **[convention]** rules aren't caught by either — those are on you (and on review).
