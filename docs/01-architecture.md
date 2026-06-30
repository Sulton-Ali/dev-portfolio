# 01 — Architecture

## Tech stack

| Concern | Choice | Why |
|---------|--------|-----|
| Framework | TanStack Start (Vite-based, SSR) | File routing, SSR/streaming, server functions, type-safe routing |
| UI library | React 19 + TypeScript (strict) | Standard, fits TanStack ecosystem |
| Routing | `@tanstack/react-router` (via Start) | Type-safe, file-based, loaders |
| Styling | Tailwind CSS v4 | CSS-first config; CSS variables make theming clean |
| Icons | `lucide-react` | Consistent, tree-shakeable |
| Animation | `motion` (Framer Motion) — light use | Micro-interactions; respect `prefers-reduced-motion` |
| Linting/format | **Biome** | Fast, single tool (confirmed) |
| Package manager | pnpm | Fast, disk-efficient |
| Runtime (prod) | Node.js (LTS) on VPS | Self-hosted server output |

> **Version note for the implementing agent:** TanStack Start's exact APIs and
> server/deploy adapter have evolved. When scaffolding, follow the *current*
> official docs (start.tanstack.com) and verify package names/versions rather
> than hard-coding from memory. This doc describes intent and structure, which
> is stable across versions.

## Layered design

The core architectural idea is **strict separation of content, theme, and
components** so that one content model renders through many visual themes.

```
┌─────────────────────────────────────────────────────────────┐
│ Routes (src/routes)                                          │
│  Pages compose sections; pick layout based on active theme.  │
├─────────────────────────────────────────────────────────────┤
│ Theme layer (src/theme)                                      │
│  ThemeProvider · token CSS vars · theme registry · switcher  │
├─────────────────────────────────────────────────────────────┤
│ Components (src/components)                                   │
│  Shared primitives (token-driven) + theme-specific layouts   │
├─────────────────────────────────────────────────────────────┤
│ Content layer (src/content)                                  │
│  Typed, theme-agnostic data: profile, experience, projects…  │
└─────────────────────────────────────────────────────────────┘
```

**Rule of thumb:**
- *Content* never imports from *theme* or *components*.
- *Components* read **semantic tokens** (CSS variables), never hard-coded colors.
- *Themes* only define token values + a small number of structurally distinct
  layouts (e.g. Terminal's command palette, Bento's grid). They never own content.

See [Design System](./02-design-system.md) for the token contract and
[Themes](./03-themes.md) for what each theme overrides.

## Proposed project structure

```
dev-portfolio/
├── docs/                       # these documents
├── public/
│   ├── resume.pdf              # downloadable résumé (you provide)
│   ├── og/                     # static Open Graph images
│   └── favicon / icons
├── src/
│   ├── router.tsx              # router instance
│   ├── routes/
│   │   ├── __root.tsx          # root layout: <html>, head, ThemeProvider, nav, footer
│   │   ├── index.tsx           # /         Home
│   │   ├── about.tsx           # /about
│   │   ├── work.tsx            # /work
│   │   │                        # work.$slug.tsx → DEFERRED (v1.1)
│   │   └── contact.tsx         # /contact
│   ├── content/                # CONTENT LAYER (typed data)
│   │   ├── types.ts
│   │   ├── profile.ts
│   │   ├── experience.ts
│   │   ├── skills.ts
│   │   ├── projects.ts
│   │   ├── socials.ts
│   │   └── index.ts
│   ├── theme/                  # THEME LAYER
│   │   ├── ThemeProvider.tsx
│   │   ├── theme-cookie.ts     # SSR-safe persistence
│   │   ├── tokens.css          # :root token contract + per-theme overrides
│   │   ├── registry.ts         # list of themes + metadata
│   │   └── ThemeSwitcher.tsx
│   ├── components/
│   │   ├── primitives/         # Section, Container, Button, Badge, Card…
│   │   ├── shared/             # ProjectCard, SkillList, ExperienceItem, SocialLinks…
│   │   ├── terminal/           # theme-specific pieces (CommandPalette, Prompt…)
│   │   └── bento/              # theme-specific pieces (BentoGrid, BentoCell…)
│   ├── lib/
│   │   ├── seo.ts              # meta/OG helpers
│   │   ├── vcard.ts            # builds .vcf contents
│   │   └── utils.ts
│   ├── styles.css              # Tailwind entry + global base (scaffold default)
│   ├── router.tsx              # router instance (scaffold)
│   └── routeTree.gen.ts        # generated route tree (do not edit)
├── package.json                # alias: imports["#/*"] → ./src/*
├── tsconfig.json               # paths: #/* and @/* → ./src/*
├── biome.json
├── pnpm-workspace.yaml
├── vite.config.ts              # plugins: devtools, nitro, tailwindcss, tanstackStart, react
└── README.md
```

## Data flow

1. **Content** is static, typed TypeScript in `src/content`. Imported directly by
   components — no fetching, no DB. (Static = trivially fast and cacheable.)
2. **Theme** is resolved on the server from a **cookie** in `__root.tsx`, applied
   as a `data-theme` / `data-mode` attribute on `<html>` so SSR output already has
   the right tokens — **no flash of incorrect theme**.
3. **Routes** render shared sections; where a theme needs a structurally different
   layout, the page selects the theme-specific component via the theme registry.

## Server functions (minimal)

With "links-only" contact, we need almost no server logic. Server functions
(`createServerFn`) may still be used for:
- Setting the theme cookie on switch (progressive enhancement; client-side also fine).
- (Future) GitHub stats, view counters, dynamic OG images.

For v1 these are optional. Theme switching can be done client-side with a cookie
write + `document.documentElement` attribute update, falling back gracefully.

## Performance principles

- Ship static content; avoid client data fetching on first paint.
- Theme via CSS variables → switching is a single attribute change, no re-render storm.
- Lazy-load anything heavy (command palette, future 3D) with `React.lazy`/dynamic import.
- Optimize images (`public/` assets sized & compressed; use modern formats).
- Respect `prefers-reduced-motion` and `prefers-color-scheme`.

## Accessibility principles

- Semantic HTML, landmark regions, skip-to-content link.
- Keyboard navigable (especially Terminal's command palette).
- Color-contrast AA in every theme/mode combination (verify in token design).
- Focus-visible styles defined at the token level.
