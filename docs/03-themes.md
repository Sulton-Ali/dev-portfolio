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

## Theme C — Spatial (building in M9)

### Concept
Animation-forward, depth-first. The Home hero is a **3D scene (React Three
Fiber)**: an instanced particle field + slowly rotating wireframe geometry with
gentle cursor parallax. Dark mode reads as deep space; light mode as a hazy
"daylight sky". Everything outside the hero differentiates through tokens
(soft glows, large radii, violet accent) — same content, same components.

### Palette (decided 2026-07-02)

**Dark mode ("deep space")**
| Token | Value |
|-------|-------|
| `--background` | `#050514` |
| `--surface` | `rgba(139, 92, 246, 0.06)` |
| `--surface-raised` | `rgba(139, 92, 246, 0.10)` |
| `--border` | `rgba(167, 139, 250, 0.16)` |
| `--foreground` | `#ececf6` |
| `--muted` | `#a3a3be` |
| `--subtle` | `#71718e` |
| `--accent` | `#8b5cf6` (violet) |
| `--accent-fg` | `#ffffff` |
| `--accent-muted` | `rgba(139, 92, 246, 0.16)` |
| `--accent-text` | `#c4b5fd` (must be ≥ 4.5:1 on bg and on accent-muted pill) |
| `--ring` | `#a78bfa` |

**Light mode ("daylight sky")**
| Token | Value |
|-------|-------|
| `--background` | `#f5f5fb` |
| `--surface` | `rgba(255, 255, 255, 0.75)` |
| `--border` | `rgba(76, 29, 149, 0.14)` |
| `--foreground` | `#171728` |
| `--muted` | `#4f4f66` |
| `--accent` | `#6d28d9` |
| `--accent-fg` | `#ffffff` |
| `--accent-text` | `#6d28d9` (verify ≥ 4.5:1 on the pill fill; darken if short) |

Values are the starting point; adjust during contrast verification (AA is the
gate, per the checklist below). Success/warning/danger: reuse Bento's values
tinted only if needed.

### Typography
System font stack, same as the rest of the site (no web fonts — this is a hard
site-wide constraint). Spatial differentiates via the scene and tokens, not type.

### Signature styling
- Large radii (Bento-like or slightly larger), soft violet glow shadows.
- Backdrop (`SpatialBackdrop`): static CSS nebula — layered radial gradients;
  cheap, SSR-safe, and doubles as the reduced-motion aesthetic.

### Structural layout
- **Home** (`HomeSpatial`): full-width hero (3D scene behind identity/pitch/CTAs)
  followed by conventional sections (stats, stack, featured, connect) reusing
  shared components.
- About / Work / Contact restyle purely via the token swap (like Terminal did
  pre-polish). Bespoke treatments only if cheap.

### 3D implementation rules (the contract)
- Deps: `three` + `@react-three/fiber` v9 (React 19). **No drei** — the scene is
  simple; keep the chunk small.
- The scene is **client-only and lazy** (`React.lazy` + mounted-state gate):
  SSR and first paint always render the static fallback hero; the scene fades in
  when ready. Bento/Terminal bundles must not grow at all (verify chunk split in
  the build output).
- `prefers-reduced-motion` ⇒ never mount the scene (static fallback is the
  permanent hero). Also pause the frameloop when the tab is hidden.
- Performance budget gate before flipping `available: true`: lazy chunk loads
  only on Spatial Home; no long-task jank on mid-range hardware; Lighthouse perf
  on Home stays ≥ 90 mobile with the scene mounted.

---

## Adding a theme (checklist)

1. Add an entry to `registry.ts`.
2. Provide token values for **all** semantic tokens, dark + light, in `tokens.css`.
3. Implement any structurally distinct layouts in `src/components/<theme>/`.
4. Verify contrast (AA) for every token pairing.
5. Verify SSR renders correct attributes (no flash).
6. Add a switcher option.
