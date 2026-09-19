# DopiCode Design System

## Context
DopiCode is the personal brand of Idris Dopico Peña — a front-end/software engineer (~9 years, React/Next.js/TypeScript), currently at DPG Media Nederland (games team) and running Dopicode as a freelance practice on the side. This design system exists to produce a CV/résumé (and later, possibly a portfolio site) under one consistent visual identity.

**Sources:** none attached — no codebase, Figma file, or existing brand materials were provided. Everything here (colors, type, components) was built from scratch based on the founder's stated preference for an uncommon primary color (purple) and a modern, clean, minimal personality. If a codebase, Figma link, or brand file exists later, attach it and this system should be reconciled against it as ground truth.

**Content basis:** contact details, work history (DPG Media, Dopicode, Enrise, Yummygum, AskPhill, This Page Amsterdam, Zig Websoftware, Us Media, CanvasHeroes), education (Mediacollege Amsterdam), skills, languages and interests were supplied directly by the founder for use in a future CV — see CONTENT FUNDAMENTALS below.

## Index
- `styles.css` — root stylesheet, `@import`s only. Link this from any consumer.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `shadows.css`, `fonts.css`
- `components/core/` — Button, Badge, Tag, Card, Divider (`.jsx` + `.d.ts` + `.prompt.md` each), plus `core.card.html`
- `guidelines/` — foundation specimen cards (colors, type, spacing, brand, iconography)
- `thumbnail.html` — homepage tile
- `SKILL.md` — portable skill definition for use outside this tool

## Components
| Component | Purpose |
|---|---|
| `Button` | Primary CTA, in `primary` / `secondary` / `ghost` variants, 3 sizes |
| `Badge` | Small uppercase status pill (Available, Active, Draft…) |
| `Tag` | Chip for enumerable items — skills, interests, stack |
| `Card` | Generic surface container — résumé sections, project tiles |
| `Divider` | Hairline rule, plain or with a centered label, for section breaks |

### Intentional additions
No source defined a component inventory (nothing was attached), so this is a from-scratch minimal set sized to a CV/personal-site use case — not a full app component library. Deliberately omitted for now: form inputs, dialogs, toasts, tooltips, tabs — none are needed until there's an actual interactive surface to build. Add them when that need appears.

## CONTENT FUNDAMENTALS
- **Tone:** confident and professional — standard CV register, not casual, not jokey. Short, factual sentences: role, company, scope, stack. Example: "Owns all game pages under the DPG Media flag (Het Parool Puzzels, AD Kijk)."
- **Person:** third-person/resume-neutral for the CV itself (no "I"); first-person is fine for any personal-site "about" copy later.
- **Casing:** sentence case for body copy and job descriptions; mono/uppercase-tracked labels reserved for eyebrows and metadata (dates, location, section tags) — see the "Eyebrow labels" card.
- **Numbers & dates:** written plainly ("Jun 2023 – Present"), no decorative punctuation.
- **Emoji:** none. This is a professional CV context; interests (gym, padel, AI, stocks, politics, history) are listed as plain words or small icons, never emoji.
- **Vibe:** competent, understated, technical-but-legible — a developer's CV, not a marketing page. Purple is a signature, used sparingly, not a loud brand statement.

## VISUAL FOUNDATIONS
- **Color:** light surface (`--surface-page` off-white, `--surface-card` white) is the default background. Purple (`--brand-primary`, #9333EA) is reserved for links, primary buttons, and small accents (eyebrow labels, active tag state) — it should never dominate a whole section background. Teal (`--accent`) is a secondary accent for variety in tags/highlights. Semantic colors (green/amber/red/blue) exist for status only, kept visually distinct from the brand purple.
- **Type:** Sora (display, weight 700–800) for headings and the wordmark; Public Sans (body, 400–600) for all running text and UI labels; JetBrains Mono for dates, code-flavored details, and uppercase eyebrow labels. See the Type cards for the full scale (12px–60px).
- **Spacing:** 4px base unit, scale runs 4→128px (`--space-1` … `--space-32`). Cards use 24px (`--space-6`) internal padding by default; stacked content uses 12px (`--space-3`) gaps.
- **Backgrounds:** flat color only — no gradients, no photography, no illustration, no texture/grain. Full-bleed color is reserved for brand moments (thumbnail, wordmark card); everyday surfaces are plain white/off-white.
- **Animation:** minimal and functional only — short (~150ms) ease transitions on hover/focus. No bounce, no entrance animation, no parallax.
- **Hover state:** buttons darken slightly (`filter: brightness(0.93)`); links underline; no color inversion.
- **Press/active state:** buttons scale to 0.98 — a small, snappy press, not a shadow or color change.
- **Focus state:** a 3px soft purple ring (`--shadow-focus`) on all interactive elements — accessibility-first, always visible on keyboard focus.
- **Borders:** 1px hairlines in `--border-default` (light) or `--border-strong` (more emphasis); never heavier.
- **Shadows:** soft and shallow (`--shadow-sm/md/lg`), used only on `Card variant="elevated"` — most surfaces stay flat with a hairline border instead of a shadow.
- **Corner radii:** moderate, not sharp and not pill-heavy — 6px small controls, 10px buttons/inputs, 16px cards. Full/pill radius reserved for Badge and Tag chips.
- **Transparency/blur:** not used anywhere in this system — kept deliberately simple.
- **Layout:** no fixed/sticky chrome defined yet (no product screens exist). When a CV/site is built, keep layout calm and grid-aligned; avoid decorative asymmetry.
- **Imagery:** none supplied. If a headshot or project imagery is added later, prefer neutral, evenly-lit, low-saturation treatment consistent with the restrained palette above — avoid warm gradients or heavy grain.

## ICONOGRAPHY
No icon set, icon font, or SVG sprite was supplied. **Lucide** (line icons, 1.5px stroke, loaded from CDN) is substituted as the closest clean, neutral match to the "modern & clean" personality — flagged here as a substitution, not a brand-original choice. See `guidelines/icons.html`. Icons render in `--brand-primary` (purple) at 24–28px, matching interest/skill categories (code, briefcase, education, gym, stocks, mail, LinkedIn, location). No emoji and no Unicode-glyph icons are used anywhere in this system.

## Logo
No logo file was supplied. Wherever a mark would normally go, the wordmark is set in plain type — "DopiCode" in Sora Extrabold (see `guidelines/brand-wordmark.html` and `thumbnail.html`). Do not draw or approximate a logo; if one is designed later, attach it and this section (plus the thumbnail) should be updated.

## Fonts
Sora, Public Sans and JetBrains Mono are loaded via a Google Fonts `@import` in `tokens/fonts.css` (no original brand typefaces existed to substitute from — these were chosen fresh, not a fallback for a missing brand font).
