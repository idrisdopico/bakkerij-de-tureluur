---
name: react-conventions
description: React patterns and architecture playbook for this project — file-internal structure, hooks, props, and styling, plus before/after recipes for common hook anti-patterns (useEffect/useRef misuse, derived state). Use whenever writing, modifying, or reviewing React/TypeScript code in this repo. For mechanical style (naming, imports, formatting) use the code-style skill.
---

# React conventions

The patterns this project follows, adapted from a larger production Next.js codebase (entertainment-web). For the mechanical style contract — naming, imports, TypeScript, formatting — see the **`code-style`** skill. This skill covers patterns and architecture.

Match the surrounding code first. These conventions describe the norm; a local file that consistently does something else is a signal to follow the file, not to "correct" it.

## React patterns playbook

### Don't sync derived state in an effect — compute it during render

```tsx
// ❌ effect + state to mirror something you already have
const [fullName, setFullName] = useState('');
useEffect(() => {
  setFullName(`${first} ${last}`);
}, [first, last]);

// ✅ just derive it
const fullName = `${first} ${last}`;
```

If the computation is genuinely expensive (profiled), wrap it in `useMemo` — not `useState` + `useEffect`.

### Don't react to a user action in an effect — do it in the handler

```tsx
// ❌ effect watching state that a click changed
useEffect(() => {
  if (isSubmitted) trackEvent('submit');
}, [isSubmitted]);

// ✅ respond where the action happens
const handleSubmit = () => {
  setSubmitted(true);
  trackEvent('submit');
};
```

### Don't use useRef to hold state — useState/useReducer

```tsx
// ❌ ref that the UI actually depends on
const countRef = useRef(0);
countRef.current += 1; // no re-render; UI goes stale

// ✅ state for anything that affects render
const [count, setCount] = useState(0);
```

`useRef` is only for DOM nodes, mutable values that must NOT trigger a render, and timer/subscription handles.

### Reset state on prop change with a `key`, not an effect

```tsx
// ❌ effect resetting local state when the id changes
useEffect(() => {
  setDraft('');
}, [itemId]);

// ✅ remount via key — React resets the subtree for you
<Editor key={itemId} />;
```

**When `useEffect` IS right:** synchronising with an external system — DOM APIs, browser APIs, third-party libraries, subscriptions. Extract those into named hooks rather than inlining.

## File-internal structure

Order a component file top-to-bottom:

1. imports
2. helper sub-types
3. exported `ComponentNameProps` type
4. exported main component
5. private sub-components / helpers (named PascalCase functions, **never exported**)

## Hooks

- Multi-argument hooks take a **single object** typed `type Params = {…}` and **return an object**, never a tuple.
- Local state: `useState`. Complex logic: custom hooks.

## Prop shaping

- Boolean props are prefixed `is` / `has` / `should` / `can` (`isOpen`, `hasError`).
- Event-handler props are `onX` (`onClose`, `onSubmit`).
- Slots are passed as `ReactNode` — prefer composition (children) over boolean flags.

## Styling

- Co-locate CSS Modules as `component-name.module.scss`.
- Consume design tokens via CSS custom properties (`--surface-page`, `--brand-primary`, `--fs-md`, etc. — see `src/styles/global.scss`, copied 1:1 from the design system's token names so `design-import/` still reads as a reference); use SCSS `$vars` only for local values.
- Access module classes via **`styles.camelCaseName` dot notation** — not `styles['kebab']` bracket access.

## Porting from the design

Every distinct visual element gets its own component file with its own co-located `.module.scss`, imported where it's used — never inline styles, never a shared "kitchen sink" stylesheet. This applies to every component, not just the obviously reusable ones:

- A design-system primitive that recurs across sections (`Button`, `SectionHeading`, `Input`, …) becomes its own `src/components/*.tsx` + `*.module.scss` pair, ported once from the design's `_ds_bundle.js` source (read the actual `Button.jsx`/etc. source inside the bundle for real values — variants, sizes, hover states — rather than guessing from the compiled inline styles in the `.dc.html`). Every usage imports and composes it; don't hand-roll a one-off look-alike.
- The design's photos are hotlinked Unsplash stock, not real photos of this bakery — **don't use Unsplash or any other stock photography in this project.** Use a real, owned photo (`public/images/`) via a plain `next/image` where one exists, or `ProductImagePlaceholder`-style icon tile where it doesn't yet. There's no Unsplash-attribution component (`AttributedImage` was removed); don't reintroduce one unless the project starts using licensed/attributed stock photos again.
- A one-off section (`Hero`, a future `PrinciplesList`, `AboutSection`, `ProductGrid`, `ContactForm`, `SiteFooter`) still gets its own file — it's "used once" on the page, not reused across components, but it's still a distinct element with its own concerns.
- The `.dc.html`'s inline `style="..."` attributes and its `DCLogic` component class are reference material for values (colors, spacing, copy, behavior) — not something to import or run. Hand-port each value into the real component's `.module.scss`/props.
- Prefer plain CSS/HTML solutions over re-implementing JS behavior from the `.dc.html` when one exists — e.g. a CSS breakpoint instead of a `window.innerWidth` listener, a native `<a href="#anchor">` with `scroll-behavior: smooth` instead of a `scrollIntoView` click handler, a real `<a href="mailto:...">` instead of a button with an `onClick` that sets `location.href`.

## Semantic HTML / SEO

The `.dc.html` design frequently wraps text in bare `<div>`s. Don't port that structure literally — use the element that matches the content's role:

- Exactly one `<h1>` per page — the page title (currently `Hero`'s heading). Every other section title is an `<h2>` (or deeper if nested), never a styled `<div>`.
- `SectionHeading` takes a `level` prop for this reason — pass it explicitly if a heading is ever nested one level deeper than a top-level section (e.g. inside a card), so the document outline stays correct.
- A heading with an accompanying kicker/subtitle (eyebrow + title + subtitle) belongs in an `<hgroup>`, with the kicker/subtitle as `<p>`s — only the heading inside counts toward the document outline.
- Real prose is a `<p>`, not a `<div>`. A meaningfully-ordered list (numbered steps, ranked items) is an `<ol>`; an unordered collection is a `<ul>` — check the design's numbering/copy for which applies, don't default to `<ul>`.
- Landmarks matter: a `<header>` only gets the implicit `banner` role when it's NOT nested inside `main`/`article`/`aside`/`nav`/`section`. Render page-level chrome like `SiteHeader` in `layout.tsx` as a sibling of the page content, not inside `page.tsx`'s `<main>`.
- Real heading/paragraph elements carry browser default margins that `<div>`s never had — when porting a `<div>` to a semantic element, explicitly reset or set `margin` in the accompanying `.module.scss` rather than assuming it inherits the old div's spacing.
