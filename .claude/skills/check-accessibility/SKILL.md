---
name: check-accessibility
description: Audit and fix accessibility (WCAG 2.1 AA) issues in React/TSX components — semantic HTML, ARIA, keyboard navigation, focus management. Use whenever creating, editing, or reviewing a React component (.tsx file with JSX), even if the user didn't say "accessibility". Also use on explicit asks like "a11y review", "check accessibility", "is this accessible", "audit this for screen readers", or before shipping UI changes.
---

# Check accessibility

This skill audits React/TSX components for WCAG 2.1 AA compliance and applies fixes. The project has `eslint-plugin-jsx-a11y/strict` enabled, so ESLint catches a lot — your job is to run it, then review what ESLint can't see, then apply targeted fixes.

## Workflow

Three phases. Don't skip phases — each catches different things.

### Phase 1 — Lint

```bash
pnpm lint
```

`jsx-a11y/strict` catches: missing `alt` on `<img>`, `<label>` not associated with a form control, `onClick` on a `<div>` without keyboard handler/role, anchor without `href`, bad ARIA role/attribute/value, redundant role, positive `tabIndex`. Fix all lint errors before moving on.

### Phase 2 — Manual review (what ESLint can't see)

Go category by category:

**Semantic HTML**
- `<div onClick>` / `<span onClick>` → should be `<button>` (or `<a>` for navigation)
- Heading levels don't skip (e.g. `<h1>` then `<h3>` with no `<h2>`)
- Lists use `<ul>`/`<ol>`, not repeated `<div>`s
- Forms wrapped in `<form>`

**ARIA and screen readers**
- Icon-only buttons: `aria-label` describing the **action**, not the icon
- Decorative SVGs/images: `aria-hidden="true"`
- Don't add a redundant `aria-label` that duplicates visible text
- Dynamic content (status messages, toasts): `aria-live="polite"` or `role="status"`
- Error messages: `aria-describedby` + `role="alert"`

**Keyboard navigation**
- All interactive elements reachable by Tab; custom interactive `<div>`s need `tabIndex={0}` + `onKeyDown` for Enter/Space
- Modals: focus trapped inside, Esc closes, focus returns to trigger on close

**Focus management**
- Visible focus ring on every interactive element — don't `outline: none` without an alternative
- When a modal opens, focus moves into it; when it closes, focus returns to the trigger

### Phase 3 — Fix

For each issue: state the issue and WCAG criterion, show the fix as a diff, and if you can't fix without more context (e.g. an unclear aria-label), ask rather than guess.

After fixes, re-run `pnpm lint` to confirm nothing regressed.

## Repo-specific conventions

- **Type aliases, not interfaces.** `type Props = {...}`.
- **Named function exports**, kebab-case file names.
- **Semantic HTML over div soup.**

## Patterns to recognize

**Icon-only button — needs accessible name**

```tsx
// Bad
<button onClick={onClose}>
  <CloseIcon />
</button>

// Good
<button onClick={onClose} aria-label="Close dialog">
  <CloseIcon aria-hidden="true" />
</button>
```

**Status message after an action — needs to be announced**

```tsx
// Bad — screen reader users never know the save succeeded
{saved && <p>Saved!</p>}

// Good
{saved && <p role="status">Saved!</p>}
```

## Output

Structure your response when auditing:

```
## Accessibility audit: <file path>

### Issues found

1. **<Short title>** — <WCAG criterion if known>
   - Location: line X
   - Impact: <how this breaks for screen reader / keyboard / etc. users>
   - Fix: <what to change>

### Fixes applied

<list of edits, or "no fixes needed — component is compliant">
```

If everything is fine, say so — don't manufacture issues.
