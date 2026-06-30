# 00 — Overview

## Purpose

A personal "business card" website for a **Full-Stack Software Engineer**:
- 6+ years commercial software development
- 8+ years programming overall
- Frontend: React, Angular, Vue
- Backend: NestJS, Go, Java

The site introduces who you are, shows selected work, lists your stack, and gives
people clear ways to reach you. It is intentionally small in scope — a sharp,
fast, memorable card rather than a sprawling app.

A second goal is **deliberate practice with AI coding agents**: the project is
structured (clear docs, clean layering, small steps) so it can be built and
extended primarily through AI-assisted development.

## Audience

- Recruiters and hiring managers (skim fast, want signal + contact).
- Engineers and CTOs (appreciate craft, notice the details).
- Potential clients / collaborators.

Design implication: the site must communicate seniority and competence in seconds,
work great on mobile, and load fast.

## Locked decisions

| Decision | Choice | Notes |
|----------|--------|-------|
| Framework | **TanStack Start** (SSR) | Full-stack React, file-based routing, server fns |
| Language | **TypeScript** | Strict mode |
| Styling | **Tailwind CSS v4** | CSS-first config, CSS variables for theming |
| Themes | **One site, switchable themes** | Terminal + Bento now; Spatial later |
| First theme | **Bento** | Fastest visual payoff; sets up content + components |
| Scope | **Multi-page, no blog** | Home, About, Work, Contact |
| Contact | **Links only** | mailto, socials, résumé PDF, vCard, copy-email. No backend form |
| Project detail pages | **Deferred** | `/work/:slug` postponed; Work cards link to repo/live |
| Hosting | **Self-host VPS** | Node server output, reverse proxy |
| Package manager | **pnpm** | (assumption — change if you prefer npm/yarn/bun) |
| Linter/formatter | **Biome** | Confirmed |
| Tooling | **MCP: Context7 + Playwright** | Project-scoped; see [Tooling & MCP](./09-tooling.md) |

## Non-goals (for now)

- No blog / CMS / MDX content system.
- No server-side contact form or email sending (links only).
- No database.
- No authentication.
- No i18n (single language). Can be revisited later.
- Spatial/3D theme is **out of scope for v1**, designed-for but not built.

## Success criteria

- Lighthouse: Performance ≥ 95, Accessibility ≥ 95, SEO 100 (mobile).
- First load is fast; theme renders correctly on the server (no flash of wrong theme).
- Switching Terminal ⇄ Bento changes the entire look with zero content duplication.
- Fully responsive (320px → ultrawide).
- Deployable to the VPS with a documented, repeatable process.

## Content intake

You will provide your real details later. The primary source will be your
**résumé**: when you share it, the agent will **extract** structured content from
it — name, location, experience entries, projects, skills, and any links/social
URLs — and populate the [Content Model](./04-content-model.md), flagging anything
ambiguous for you to confirm. You can also supply details directly.

## Open items to confirm later

- Your display name, handle, and exact social links (placeholders for now — see
  [Content Model](./04-content-model.md)). To be extracted from the résumé.
- Brand accent color per theme (proposed defaults in [Themes](./03-themes.md)).
