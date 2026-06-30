# 02 — Design System

The design system is the **contract between components and themes**. Components
only ever reference *semantic tokens*. Each theme supplies the values. This is
what lets one content model look completely different per theme.

## Theming mechanism

- Tokens are **CSS custom properties** defined in `src/theme/tokens.css`.
- The active theme + mode are attributes on `<html>`:
  `data-theme="bento" data-mode="dark"`.
- Tailwind v4 maps utilities to these variables via `@theme`, so classes like
  `bg-surface text-fg border-border` resolve to the active theme's values.
- Switching theme/mode = changing the attribute. No component re-render required
  for the visual change; CSS does the work.

```html
<html data-theme="bento" data-mode="dark"> … </html>
```

```css
/* tokens.css (illustrative) */
:root {
  /* default = bento dark fallback */
}
[data-theme="bento"][data-mode="dark"]  { /* … token values … */ }
[data-theme="bento"][data-mode="light"] { /* … */ }
[data-theme="terminal"][data-mode="dark"]  { /* … */ }
[data-theme="terminal"][data-mode="light"] { /* … */ }
```

> SSR detail: `__root.tsx` reads the theme cookie and renders the attributes on
> `<html>` server-side, eliminating any flash of the wrong theme/mode.

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
