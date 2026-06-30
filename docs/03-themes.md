# 03 — Themes

Themes assign concrete values to the [Design System](./02-design-system.md) token
contract and, where needed, provide a few structurally distinct layouts. Content
is identical across all themes.

The theme registry (`src/theme/registry.ts`) lists available themes:

```ts
export const THEMES = [
  { id: "bento",    label: "Bento",    available: true  },
  { id: "terminal", label: "Terminal", available: true  },
  { id: "spatial",  label: "Spatial",  available: false }, // future
] as const;
```

Default theme: **bento**. Default mode: follow `prefers-color-scheme`.

---

## Theme A — Bento (build first)

### Concept
Modern, premium dashboard look. The page is a **grid of cards** ("bento boxes")
of varying sizes, each a self-contained widget. Soft gradients, glass/blur
surfaces, rounded corners, generous whitespace, tasteful hover micro-interactions.
Think Apple / Vercel / Linear landing aesthetic.

### Palette (proposed)

**Dark mode**
| Token | Value |
|-------|-------|
| `--color-bg` | `#0a0a0f` |
| `--color-surface` | `rgba(255,255,255,0.04)` (glass) |
| `--color-surface-raised` | `rgba(255,255,255,0.07)` |
| `--color-border` | `rgba(255,255,255,0.10)` |
| `--color-fg` | `#f4f4f5` |
| `--color-fg-muted` | `#a1a1aa` |
| `--color-fg-subtle` | `#71717a` |
| `--color-accent` | `#6366f1` (indigo) → consider a gradient `indigo→violet` |
| `--color-accent-fg` | `#ffffff` |
| `--color-ring` | `#818cf8` |

**Light mode**
| Token | Value |
|-------|-------|
| `--color-bg` | `#fafafa` |
| `--color-surface` | `rgba(255,255,255,0.7)` (glass over subtle bg gradient) |
| `--color-border` | `rgba(0,0,0,0.08)` |
| `--color-fg` | `#18181b` |
| `--color-fg-muted` | `#52525b` |
| `--color-accent` | `#4f46e5` |

### Typography
- Display + body: a clean modern sans (e.g. **Geist** / **Inter**).
- Mono: **Geist Mono** for small code/tech labels.
- Rounded, confident headings; comfortable body.

### Signature styling
- `--radius-lg/xl` large; `--blur-glass` ~12–16px backdrop blur.
- Subtle background: large soft radial gradient blobs behind the grid.
- Cards: 1px translucent border + soft shadow + hover lift/tilt + accent glow.

### Structural layout
- **Home** = the bento grid itself (the centerpiece). Cells:
  - Identity (name, role, avatar) — large cell.
  - One-line pitch / availability badge.
  - Tech stack (icon chips).
  - Featured project — wide cell.
  - Experience summary (6yr / 8yr stats).
  - Location + local time widget.
  - Social links.
  - CTA → Contact.
- About / Work / Contact reuse the card system in more conventional flow layouts.

### Theme-specific components (`src/components/bento/`)
- `BentoGrid`, `BentoCell` (with size props: `sm | md | lg | wide | tall`).
- `GlassCard`, `GradientBackdrop`, `LocalTimeWidget`, `StatCard`.

---

## Theme B — Terminal (build second)

### Concept
A polished developer console / IDE aesthetic — **tasteful, not a gimmicky fake
shell**. Monospace, dark-by-default, syntax-highlighted snippets describing you,
crisp thin borders, subtle grid/scanline background, blinking cursor accents.
Optional **command palette (Cmd/Ctrl+K)** for navigation — perfectly on-theme.

### Palette (proposed)

**Dark mode**
| Token | Value |
|-------|-------|
| `--color-bg` | `#0b0e0c` |
| `--color-surface` | `#11150f` |
| `--color-surface-raised` | `#161b13` |
| `--color-border` | `#1f2a1c` |
| `--color-fg` | `#d7e0d4` |
| `--color-fg-muted` | `#7d8a78` |
| `--color-accent` | `#39d353` (terminal green) — alt: cyan `#22d3ee` |
| `--color-accent-fg` | `#06120a` |
| `--color-ring` | `#39d353` |

**Light mode** (a "light terminal" / paper console)
| Token | Value |
|-------|-------|
| `--color-bg` | `#f6f7f4` |
| `--color-surface` | `#ffffff` |
| `--color-border` | `#d8ddd2` |
| `--color-fg` | `#14201a` |
| `--color-accent` | `#1a7f37` |

### Typography
- Display + mono: **JetBrains Mono** (or Geist Mono) everywhere.
- Body may use a slightly more readable mono or a neutral sans for long text.

### Signature styling
- Crisp 1px borders, square-ish corners (`--radius-sm`).
- Hero rendered as a syntax-highlighted code object:
  ```ts
  const engineer = {
    name: "<Your Name>",
    role: "Full-Stack Software Engineer",
    experience: { commercial: "6+ yrs", programming: "8+ yrs" },
    frontend: ["React", "Angular", "Vue"],
    backend: ["NestJS", "Go", "Java"],
  };
  ```
- Faint background grid; blinking cursor; section headers like `~/about $`.

### Structural layout
- More linear/scroll-based than Bento.
- Navigation also reachable via command palette.
- Project cards styled like `git log` / PR entries.

### Theme-specific components (`src/components/terminal/`)
- `CommandPalette` (Cmd/Ctrl+K, lazy-loaded), `Prompt`, `CodeBlock`
  (syntax-highlighted), `CursorBlink`, `GridBackdrop`.

---

## Theme C — Spatial (future, designed-for not built)

### Concept
Animation-forward 3D hero (React Three Fiber): floating geometry / particle field
reacting to cursor, scroll-driven section transitions. Highest effort and
performance risk; deferred to a later phase.

### Notes for future
- Lazy-load the R3F scene; never block SSR/first paint.
- Mandatory `prefers-reduced-motion` fallback to a static hero.
- Performance budget gate before shipping.
- Will reuse the exact same content model and token contract — it's just another
  theme entry flipped to `available: true`.

---

## Adding a theme (checklist)

1. Add an entry to `registry.ts`.
2. Provide token values for **all** semantic tokens, dark + light, in `tokens.css`.
3. Implement any structurally distinct layouts in `src/components/<theme>/`.
4. Verify contrast (AA) for every token pairing.
5. Verify SSR renders correct attributes (no flash).
6. Add a switcher option.
