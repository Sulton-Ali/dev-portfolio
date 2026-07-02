# AGENTS.md

Canonical guidance for AI agents (and humans) working in this repository. Keep it
short and current; deep detail lives in [`docs/`](./docs/README.md).

## What this is

A "business-card" developer-portfolio website for a full-stack software engineer.
Built primarily with AI coding agents as deliberate practice. One theme-agnostic
content model rendered through **switchable visual themes** (Bento first, Terminal
second, Spatial later).

## Tech stack

- **TanStack Start** (React 19, SSR) — file-based routing, server functions
- **TypeScript** strict (`verbatimModuleSyntax: true`)
- **Tailwind CSS v4** (`@tailwindcss/vite`; entry `src/styles.css`)
- **Biome** (lint + format)
- **Nitro** deploy adapter → Node server output (`.output/server/index.mjs`)
- **pnpm** package manager · **lucide-react** icons

## Operating model (IMPORTANT)

This project uses a **lead/team split**:
- **Lead = Opus 4.8** — orchestration, planning, task breakdown, code review,
  integration, decisions, and final verification.
- **Team = Sonnet 4.6 sub-agents** — execute scoped implementation tasks
  (spawn with the Agent tool, `model: "sonnet"`).
- Flow: lead specs a scoped task → Sonnet executes → lead reviews the diff, runs
  the quality gates, and integrates. The lead does not delegate review.

## Conventions (must follow)

- **Imports:** use `#/...` alias for cross-file src imports (`@/` also works; prefer
  `#/`). Type-only imports MUST use `import type` (verbatimModuleSyntax).
- **Formatting:** Biome — TABS indentation, DOUBLE quotes. Don't hand-fight it;
  run the formatter.
- **No hard-coded colors** in components — only semantic design tokens (CSS vars).
  See [docs/02-design-system.md](./docs/02-design-system.md).
- **Layer boundaries:** `src/content` imports nothing from `theme`/`components`;
  shared components are theme-agnostic (tokens only); theme-specific code lives in
  `src/components/<theme>/`. See [docs/01-architecture.md](./docs/01-architecture.md).
- TS strict: no unused locals/params, no `any` without justification.
- Keep placeholders obvious: `<Your Name>`, `// TODO`.

## Commands

```bash
pnpm dev                 # dev server on http://localhost:3000
pnpm build               # production build (Nitro)
pnpm preview             # preview the build
pnpm generate-routes     # regenerate src/routeTree.gen.ts (tsr generate)
pnpm check               # Biome lint + format check
pnpm exec biome check --write   # apply Biome fixes
pnpm exec tsc --noEmit   # typecheck (no dedicated script)
pnpm test                # vitest
```

### Quality gates before any task is "done"

`pnpm exec tsc --noEmit` (0 errors) AND `pnpm check` (clean). For UI work, also
verify in the browser (Playwright MCP) at mobile + desktop, in both dark/light.

## Project structure

- `src/routes/` — file-based routes (`__root.tsx`, `index.tsx`, …). `routeTree.gen.ts`
  is generated — never edit by hand.
- `src/content/` — typed, theme-agnostic data (single source of content).
- `src/theme/` — ThemeProvider, tokens, registry, switcher (cookie-persisted, SSR-safe).
- `src/components/` — `primitives/`, `shared/` (token-driven), `terminal/`, `bento/`.
- `src/lib/` — `seo.ts`, `vcard.ts`, `utils.ts`.
- `docs/` — design & architecture docs (the contract).

## Tooling / MCP

Project-scoped MCP servers in [`.mcp.json`](./.mcp.json):
- **Context7** — up-to-date library docs (TanStack, Tailwind, Biome). Use when an
  API is uncertain instead of relying on memory.
- **Playwright** — browser emulation to verify UI / responsive / theme switching.

(First load requires approval via `/mcp`.)

## Documentation map

Start at [docs/README.md](./docs/README.md). Key docs:
- [00 Overview](./docs/00-overview.md) · [01 Architecture](./docs/01-architecture.md)
- [02 Design System](./docs/02-design-system.md) · [03 Themes](./docs/03-themes.md)
- [04 Content Model](./docs/04-content-model.md) · [05 Pages](./docs/05-pages.md)
- [06 Deployment](./docs/06-deployment.md) · [07 Roadmap](./docs/07-roadmap.md)
- [08 Conventions](./docs/08-conventions.md) · [09 Tooling & MCP](./docs/09-tooling.md)

## Working agreement

- **Docs are the contract.** Read the relevant doc(s) before a task; if a decision
  changes, update the doc first, then the code.
- Work milestone by milestone ([Roadmap](./docs/07-roadmap.md)); keep the app
  runnable after each step. Prefer small, reviewable diffs.
- Commit/push only when the user asks. End commit messages with the
  `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>` trailer.

## Current status

Phase: **M9 — Spatial theme** (next). M6 close-out done 2026-07-02 (real 404 status,
Lighthouse: Perf 96–100 / BP 100 / SEO 100, a11y contrast + heading-order fixed).
M8 (hardening) is **deferred**. Done: M0–M3 (scaffold,
content, theme infra, primitives/shared), M4 (Bento + all pages), M5 (SEO/OG/sitemap/
robots/polish), M6 (deployed to **Netlify**, live on **sjalolov.dev**), M7 (**Terminal
theme** complete — tokens, code-object hero, Cmd/Ctrl+K command palette). Real content
from résumé is in. See [Roadmap](./docs/07-roadmap.md) for the live checklist.
