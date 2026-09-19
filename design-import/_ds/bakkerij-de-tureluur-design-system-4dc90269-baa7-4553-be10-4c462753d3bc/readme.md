# Bakkerij de Tureluur — Design System

Source: https://bakkerijdetureluur.nl/ (a JS app; content below gathered via web search of the live site and third-party listings, since the page itself renders client-side). Logo: `uploads/bakkerij_logo.png` (user-provided).

## Company context

Bakkerij de Tureluur is a small organic/biodynamic bakery in Oosterwold, a self-build agrarian district between Almere and Zeewolde, Netherlands. <cite index="19-13,19-14">Owners and bakers are Sandra Ansmink and Ezra Dopico Peña, mother and son, who started the bakery in 2019.</cite> <cite index="1-2">The bakery is housed in a sustainable wooden building insulated with straw bales.</cite>

<cite index="1-6">Robust sourdough breads from various grains and baguettes form the basis of the assortment.</cite> <cite index="18-2,18-3">A signature loaf is the "lemaire," a batard of bolted wheat flour on a wholemeal rye sourdough, also available in a filled variant.</cite> Assortment also includes spelt bread, whole-wheat bread, croissants, brioche, and — <cite index="19-3,19-19">on Thursdays, pizza made with toppings from their own garden.</cite> <cite index="5-9">Their process: pure ingredients of organic or biodynamic origin, produced as regionally as possible; dough given ample time to ferment, often overnight, so it's easy to digest and develops full flavor and aroma; and, where possible, ingredients from their own yard/Oosterwold — fruit, herbs, vegetables, eggs.</cite>

There is one product/surface represented here: the bakery's marketing website (informational, no online ordering flow beyond email).

## Sources

- Live site: https://bakkerijdetureluur.nl/ — client-rendered; not directly readable, so copy and structure below are reconstructed from search-indexed excerpts of the same site plus regional tourism/press listings (Visit Flevoland, Visit Almere, Oosterwold Info, restaurant/blog write-ups).
- Logo: `uploads/bakkerij_logo.png`, provided by the user. No other brand assets (icons, photography, additional marks) were supplied — none invented here.
- No codebase or Figma file was attached. Colors, type, and components are original interpretations built from the logo, the brief ("calm green colors like #3b5a3d and #d7ded8"), and the site copy above — flagged throughout as such rather than sourced.

## What's in this folder

- `styles.css` — root stylesheet, imports everything under `tokens/`.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `shadows.css`, `fonts.css`, `base.css`.
- `assets/logo.png` — the tern (tureluur/redshank) wordmark, transparent PNG.
- `guidelines/` — foundation specimen cards shown in the Design System tab (colors, type, spacing, radius/shadow, brand/logo, button states, card anatomy).
- `components/` — reusable React primitives (see below).
- `ui_kit/website/` — click-through recreation of the marketing site: home, assortment, and contact/visit screens.
- `SKILL.md` — portable skill file for use outside this environment (e.g. Claude Code).

## Content fundamentals

- **Language:** Dutch, first person plural ("we", "ons," "onze") — a small family team speaking directly, not a corporate "you". Example: <cite index="5-4,5-5">"Het gaf ons de kans een jaar met het Oosterwold te groeien, vraag en aanbod af te tasten en kennis te maken met een fantastische klantenkring. Wat voelen wij ons bevoorrecht!"</cite>
- **Tone:** modest, matter-of-fact, a little wry about its own scrappiness — <cite index="5-6,5-7">"nee niet alles is af, maar het is werkbaar. Een zee van ruimte."</cite> No sales pressure, no superlatives-as-marketing; pride shows through specificity (grain types, fermentation times) rather than adjectives.
- **Casing:** sentence case throughout, lowercase product names (speltbrood, tarwebrood), no title-case marketing headlines.
- **Structure:** short paragraphs, often a plain list of process values rather than flowing prose — see the three-line "pure grondstoffen / deeg ruim tijd geven / producten van eigen erf" list on the homepage.
- **Emoji:** none seen anywhere in site or listing copy. Do not introduce any.
- **Vibe:** unpretentious craft. Confidence comes from naming the process (overnight ferment, regional sourcing, own-garden produce) rather than claiming quality in the abstract.

## Visual foundations

- **Color:** brand green `#3b5a3d` (a straw-and-wood-toned, muted green — not garden-green) as the primary/brand color, paired with a very pale sage `#d7ded8` for calm surfaces. Warm unbleached-flour creams (`--cream-50`/`--cream-100`) stand in for white/gray neutrals — never cold gray. A single saturated accent, orange `#ff6612`, is sampled exactly from the tern's beak and legs in the logo; use it sparingly, for one CTA or highlight at a time, never as a background wash.
- **Type:** a warm serif for display (headings, prices, product names) paired with a workhorse humanist sans for everything functional (body copy, labels, nav, buttons). This mirrors the logo's own mixed treatment (serif-ish "B"/"T" caps with a plain sans running word). See `guidelines/type-pairing.html`.
- **Backgrounds:** flat color only — no gradients, no repeating patterns/textures, no illustration. The one full-bleed treatment is photographic: bread/interior photography (placeholders here) filling a hero band. This is a from-scratch interpretation; no photography was supplied, so `ui_kit` screens use labeled image placeholders.
- **Animation:** none observed on the source site. Keep any UI motion minimal — short opacity/position fades on hover only, no bounce or spring easing. This is a quiet, unhurried brand.
- **Hover states:** buttons darken one step (`--brand-primary` → `--brand-primary-hover` → `--brand-primary-active`); no lighten-on-hover, no shadow pop.
- **Press states:** a further one-step darken plus a very slight scale-down (0.98), 1px less padding — a light, tactile "give," not a bounce.
- **Borders:** thin (1px) hairlines in `--border-default` (a pale green), used to separate cards/sections instead of heavy shadows.
- **Shadows:** soft and warm-toned (brown-black at low opacity, never blue-black or pure black) — `--shadow-sm/md/lg` for elevation, `--shadow-inset` for pressed/recessed states.
- **Corner radii:** soft but not pill-happy — `--radius-sm` (4-6px) for buttons/inputs, `--radius-md` (10px) for cards, `--radius-lg`/`--radius-xl` for larger hero panels, `--radius-pill` reserved for tags/badges only.
- **Cards:** white surface, hairline border, `--shadow-md`, generous padding, no colored left-border accent.
- **Transparency/blur:** not used. This is a solid, matte, printed-paper-like brand — no glassmorphism.
- **Imagery color vibe:** warm, daylight, unstyled — this is a small bakery, not a lifestyle brand. Avoid cool/blue color grading or heavy grain; natural wood and bread tones should read through.
- **Layout:** no fixed/sticky chrome implied by the source (a small single-scroll marketing site); the UI kit here adds a simple sticky nav for usability, flagged as an intentional addition.

## Iconography

No icon system, icon font, or icon SVGs were found in the source material — the real site appears to use plain text and a small number of inline images. **No icon set is copied here.** Where the UI kit needs a small number of universal glyphs (menu, close, arrow, mail, location pin), it uses Lucide via CDN (`https://unpkg.com/lucide-static`) as a same-weight, closest-match substitute — flagged here rather than invented as custom SVGs. Emoji are not used anywhere.

## Intentional additions

Since no codebase or Figma component library was attached, this is a from-scratch component set sized to a small bakery marketing site: `Button`, `Badge`, `Card` (product card), `Input`, `SectionHeading`, `NavBar`, `Footer`. A sticky `NavBar` and a Lucide icon substitution (above) are both additions beyond what the source site visibly does — both are called out inline.

## Fonts

No font files were provided and none could be found published by the brand. Substituted with the closest Google Fonts match: **Source Serif 4** (display/serif) and **Mulish** (body/sans), loaded via a Google Fonts `@import` in `tokens/fonts.css`. **Flagging this substitution — if the bakery has real brand fonts, please share the files and this will be swapped in.**

## Index

- `styles.css`, `tokens/*` — foundations
- `assets/logo.png` — logo
- `guidelines/*.html` — specimen cards (Brand, Colors, Type, Spacing groups)
- `components/core/{Button,Badge,Card,Input,SectionHeading}.*`
- `components/navigation/{NavBar,Footer}.*`
- `ui_kit/website/index.html` — home / assortiment / contact
- `thumbnail.html` — project tile
- `SKILL.md` — portable skill definition
