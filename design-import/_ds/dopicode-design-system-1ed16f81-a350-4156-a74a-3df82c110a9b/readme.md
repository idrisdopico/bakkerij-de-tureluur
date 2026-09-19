# DopiCode Design System

DopiCode is the personal brand of **Idris Dopico Peña**, a front-end developer specialised in React and Next.js (source: `uploads/cv.pdf`, a one-page résumé — no company, product, or existing UI kit was provided). There is no existing codebase, Figma file, or logo to recreate from — this system was built from scratch from two inputs:

- `uploads/cv.pdf` — résumé confirming the name behind "DopiCode" (Dopico + Code) and the React/Next.js specialty referenced in the tone guide below.
- `uploads/IMG_2759_Original.jpg` — a personal photo (heather dunes, warm natural light), used only as color/mood reference; copied into `assets/imagery/` as a usable "about" photo, not as a literal brand asset.

Direction requested: Japandi — warm wood tones, mostly square shapes with a few circles, soft lines instead of boxes/shadows to separate sections. No logo existed, so a simple geometric mark was designed (square + circle) — see Iconography/Brand below.

## Index
- `styles.css` — root stylesheet, imports everything below
- `tokens/` — colors, typography, spacing, shape (radius/shadow/motion), fonts
- `base.css` — element resets
- `assets/` — logo mark, lockup, imagery
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Shape, Brand)
- `components/` — reusable UI primitives (below)
- `thumbnail.html` — homepage tile
- `SKILL.md` — portable skill file for use in Claude Code

## Components
No component source was provided, so a standard, right-sized set was authored from the brand foundations:

- **Core** (`components/core/`): Button, IconButton, Card, Badge, Tag
- **Forms** (`components/forms/`): Input, Select, Checkbox, Radio, Switch
- **Navigation** (`components/navigation/`): Tabs
- **Feedback** (`components/feedback/`): Dialog, Toast, Tooltip

## Content fundamentals
- **Voice**: first person singular ("I build...", not "we"), direct and unadorned. No marketing hype, no exclamation points.
- **Casing**: sentence case everywhere — headings, buttons, labels. Never all-caps except small uppercase badges/tags (a deliberate, tiny exception).
- **Tone**: quiet confidence. Describes work plainly rather than selling it. From the CV: *"Front-end developer specialized in React and Next.js. Strong communicator with clients."* — calm, factual, competence stated once and not repeated.
- **Emoji**: none.
- **Vibe**: a craftsperson's studio, not a startup. Sentences are short and complete; no sentence fragments used for punch, no rhetorical questions.

## Visual foundations
- **Colors**: warm wood primary (Hinoki Cedar oak scale, `--wood-*`), a muted sage-green secondary accent (`--sage-*`), and a warm paper-to-ink neutral scale (`--neutral-*`) — never cool/pure gray. Semantic colors (success/warning/error/info) are muted, not saturated, consistent with a Japandi palette.
- **Type**: two families. `Cormorant` (light serif) for display/headings — quiet, editorial. `Manrope` (geometric sans) for UI and body copy. `JetBrains Mono` for code snippets and tag labels, nodding to the developer subject matter. No font files were available, so all three are loaded from Google Fonts (`tokens/fonts.css`) — swap in real self-hosted files later if desired.
- **Shape**: mostly square. Border radius is small and consistent (`--radius-sm`/`md`, 2–4px) — corners are barely softened, not rounded "app" corners. Circles are used sparingly and intentionally: radio dots, avatar/photo crops, the switch pill, and the circular accent in the logo mark.
- **Backgrounds**: flat, warm paper tone (`--bg-page` / `--neutral-50`). No gradients, no patterns, no textures.
- **Dividers**: sections are separated by a 1px soft line (`--border-soft`) rather than cards, boxes, or shadows — see `guidelines/brand-dividers.html`.
- **Shadows**: shallow and rare (`--shadow-sm/md/lg`), used only on true floating surfaces (cards, dialogs, toasts) — never on flat page sections.
- **Borders**: 1–1.5px, warm neutral tone, never pure black.
- **Animation**: minimal — short fades/color transitions only (120–200ms, standard ease). No bounce, no scale, no parallax.
- **Hover state**: background shifts one step darker (buttons) or to the sunken surface tone (ghost/outline buttons, icon buttons). No color inversion, no glow.
- **Press/active state**: darker still (`--accent-primary-active`); no scale/shrink transforms — consistent with the "no bounce" motion rule.
- **Imagery**: natural light, warm and slightly desaturated, unposed — see `assets/imagery/portrait-heather-dunes.jpg`. No studio photography, no heavy filters, no black-and-white treatment.
- **Transparency/blur**: only in modal scrims (35% black overlay behind dialogs). No frosted-glass/backdrop-blur anywhere else.
- **Corner radii**: 2px (sm, default for controls), 4px (md, cards/dialogs), 6px (lg, rare), full (circles/pills).
- **Cards**: square-cornered (`--radius-md`), 1px soft border, shallow shadow, warm paper fill — never a colored left-border accent.

## Logo
D and C stand as two separate open letterforms — a stroke-built D (stem + bowl) and a stroke-built C (open ring), same 6.5px weight, set with a clear gap between them so each reads on its own rather than fusing into one blob. One interior color only (no two-tone), and generous padding from the tile edge — the fix for the previous version's cramped, muddy read at icon size. Colors: `--frost-700` tile with `--frost-100` letters (tile versions), or the letters drawn directly in `--frost-700` with no background (transparent versions, for paper/photography). Four files in `assets/`: `mark.svg` / `logo-lockup.svg` and `mark-transparent.svg` / `logo-lockup-transparent.svg`. Confirmed legible as "DC" at 200 / 64 / 32 / 16px. Shown in `guidelines/brand-logo.html`. Replaces the earlier fused ribbon and flat-blob explorations.

**Frost palette**: the cool winter tones now live in `tokens/colors.css` as `--frost-100…900` — desaturated blue-greys, chosen to sit calmly beside the warm wood/neutral scales rather than compete with them. Card: `guidelines/colors-frost.html`.

## Iconography
No icon set or logo existed in the source material.
- **Icons**: substituted with [Lucide](https://lucide.dev) via CDN (`unpkg.com/lucide`) — clean line icons at 1.5px stroke, matching the system's thin 1–1.5px borders. See `guidelines/brand-icons.html`. Flagging this substitution: swap for a different set if the user has a preference. Do not use emoji as icons — none appear in the content voice either.
- **Logo**: no existing logo was provided; the mark described under "Logo" above is original, not a recreation of anything supplied.

## Intentional additions
Since no component source existed, the full standard set (Button, IconButton, Input, Select, Checkbox, Radio, Switch, Card, Badge, Tag, Tabs, Dialog, Toast, Tooltip) was authored to a scope appropriate for a personal portfolio/brand site — this is the full inventory, nothing was invented beyond it.
