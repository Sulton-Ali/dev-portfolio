# 02 — Design System

The design system is the **contract between components and themes**. Components
only ever reference *semantic tokens*. Each theme supplies the values. This is
what lets one content model look completely different per theme.

## Theming mechanism (implemented design)

Two independent axes as attributes on `<html>`:
- `data-theme` — `bento` (active) · `terminal` (M7) · `spatial` (future). **Always set.**
- `data-mode` — `dark` · `light`. **Set only when the user explicitly chose a mode.**
  When absent, the mode follows the OS via `prefers-color-scheme` (see below).

### Runtime CSS variables + Tailwind v4 `@theme inline`

Each `[data-theme]` (+ optional `[data-mode]`) selector assigns **runtime semantic
vars** (`--bg`, `--fg`, `--surface`, `--accent`, …). Tailwind utilities are bound
to those vars with `@theme inline`, so classes resolve to whatever value is in
scope at runtime:

```css
/* src/styles.css */
@import "tailwindcss";
@import "./theme/tokens.css";

@theme inline {
  --color-background: var(--bg);
  --color-surface: var(--surface);
  --color-surface-raised: var(--surface-raised);
  --color-border: var(--border);
  --color-foreground: var(--fg);
  --color-muted: var(--fg-muted);
  --color-subtle: var(--fg-subtle);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-fg);
  --color-accent-muted: var(--accent-muted);
  --color-ring: var(--ring);
  /* fonts, radii, etc. likewise mapped */
}
```

This yields utilities like `bg-background`, `bg-surface`, `text-foreground`,
`text-muted`, `border-border`, `text-accent`/`bg-accent`, `ring-ring`. **Components
use these utilities only — never raw colors.**

### No-flash SSR strategy (dark-base + media-query for unset)

`dark` is the base; `light` applies when the OS prefers light **and** the user has
not chosen a mode, or when the user explicitly chose light:

```css
[data-theme="bento"] { /* shared tokens + DARK values (base) */ }

@media (prefers-color-scheme: light) {
  [data-theme="bento"]:not([data-mode]) { /* LIGHT values */ }
}
[data-theme="bento"][data-mode="light"] { /* LIGHT values */ }
/* explicit data-mode="dark" needs no rule — base is dark, and the media
   rule is excluded by :not([data-mode]) */
```

Why this is flash-proof with **zero blocking script**:
- The server reads the **theme** + (explicit) **mode** cookies and renders the
  attributes into the SSR HTML, so an explicit choice is correct on first paint.
- The only thing the server can't know — the OS preference for a first-time
  visitor with no mode cookie — is resolved entirely in CSS via the media query.
  No inline script, no hydration mismatch.

### Server cookie read (TanStack Start)

`@tanstack/react-start/server` exposes `getCookie(name)` (ambient request
context). Read it inside a `createServerFn` called from the **root route loader**;
the shell sets `data-theme={theme}` and `data-mode={mode ?? undefined}` on `<html>`
from that data. Client-side, the switcher writes the cookie via `document.cookie`
and updates `document.documentElement` attributes immediately (no reload, no flash).
`mode` cookie absent ⇒ "system".

## Semantic token contract

Every theme MUST define values for all of these. Components reference only these
names (never raw hex). Adding a new theme = filling this table.

### Color tokens

| Token | Meaning |
|-------|---------|
| `--color-bg` | Page background |
| `--color-surface` | Card / panel background |
| `--color-surface-raised` | Elevated surface (hover, popover) |
| `--color-border` | Default border / divider |
| `--color-fg` | Primary text |
| `--color-fg-muted` | Secondary text |
| `--color-fg-subtle` | Tertiary / placeholder text |
| `--color-accent` | Brand accent |
| `--color-accent-fg` | Text/icon on accent background |
| `--color-accent-muted` | Accent tint (backgrounds, glows) |
| `--color-success` / `--color-warning` / `--color-danger` | Status |
| `--color-ring` | Focus ring color |

### Typography tokens

| Token | Meaning |
|-------|---------|
| `--font-display` | Headings |
| `--font-body` | Body text |
| `--font-mono` | Code / monospace UI |
| `--text-xs … --text-5xl` | Type scale |
| `--leading-tight / --leading-normal` | Line heights |
| `--tracking-tight / --tracking-wide` | Letter spacing |

### Spacing, radius, shadow, motion tokens

| Token | Meaning |
|-------|---------|
| `--space-1 … --space-24` | Spacing scale (4px base) |
| `--radius-sm/md/lg/xl/full` | Corner radii |
| `--shadow-sm/md/lg` | Elevation |
| `--blur-glass` | Backdrop blur amount (Bento) |
| `--duration-fast/normal/slow` | Transition durations |
| `--ease-standard` | Easing curve |
| `--border-width` | Default border thickness (Terminal uses crisper borders) |

## Type scale (base values)

Fluid where helpful using `clamp()`.

| Step | Size (rem) | Use |
|------|-----------|-----|
| xs | 0.75 | captions, labels |
| sm | 0.875 | secondary text |
| base | 1.0 | body |
| lg | 1.125 | lead paragraph |
| xl | 1.25 | small headings |
| 2xl | 1.5 | section headings |
| 3xl | 1.875 | page headings |
| 4xl | clamp(2.25, 4vw, 3) | hero secondary |
| 5xl | clamp(2.75, 6vw, 4.5) | hero |

## Spacing scale (4px base)

`1=4 · 2=8 · 3=12 · 4=16 · 6=24 · 8=32 · 12=48 · 16=64 · 24=96` (px)

## Layout

- Content container max-width: ~`72rem` (1152px); prose max-width ~`65ch`.
- Consistent section vertical rhythm (`--space-16`/`--space-24` between sections).
- Mobile-first. Breakpoints (Tailwind defaults): `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`.

## Modes

Each theme supports **dark** and **light**. Default mode follows
`prefers-color-scheme` until the user explicitly chooses, after which the choice
persists (cookie). Theme and mode are independent axes.

## Focus & motion

- `:focus-visible` uses `--color-ring`; always visible, never removed.
- All transitions gated behind `@media (prefers-reduced-motion: no-preference)`.

## Token values

Concrete per-theme palettes live in [Themes](./03-themes.md). This document defines
*which* tokens exist; that document defines *what values* each theme assigns.
