# Developer Portfolio — Documentation

This folder is the single source of truth for the design and architecture of the
portfolio website. We implement features step by step, keeping these docs in sync
with the code.

## Reading order

| # | Doc | What it covers |
|---|-----|----------------|
| 00 | [Overview](./00-overview.md) | Goals, audience, locked decisions, scope |
| 01 | [Architecture](./01-architecture.md) | Stack, project structure, layering, data flow |
| 02 | [Design System](./02-design-system.md) | Tokens, theming mechanism, typography, spacing |
| 03 | [Themes](./03-themes.md) | Terminal & Bento specs (+ Spatial, future) |
| 04 | [Content Model](./04-content-model.md) | Typed data shapes, single source of content |
| 05 | [Pages](./05-pages.md) | Page-by-page spec & routes |
| 06 | [Deployment](./06-deployment.md) | Build output, VPS, reverse proxy, process mgmt |
| 07 | [Roadmap](./07-roadmap.md) | Milestones & step-by-step implementation plan |
| 08 | [Conventions](./08-conventions.md) | Code style, naming, commits, AI-agent workflow |
| 09 | [Tooling & MCP](./09-tooling.md) | Project-scoped MCP servers (Context7, Playwright) |

## Project at a glance

- **What:** A "business card" portfolio for a full-stack software engineer.
- **Key idea:** One theme-agnostic content model rendered through **switchable
  visual themes**. Terminal and Bento ship first; Spatial (3D) is a future theme.
- **Stack:** TanStack Start (SSR) · TypeScript · Tailwind CSS v4 · Node server.
- **Hosting:** Self-hosted on a VPS behind a reverse proxy.
- **Built by AI coding agents** — see [Conventions](./08-conventions.md) for the
  workflow that keeps that productive.

## Status

> Phase: **Documentation**. No code scaffolded yet. See the
> [Roadmap](./07-roadmap.md) for what comes next.
