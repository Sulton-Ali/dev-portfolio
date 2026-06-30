# CLAUDE.md

This project's agent guidance lives in **[AGENTS.md](./AGENTS.md)** — it is the
single source of truth for stack, conventions, commands, the lead/team operating
model, and the documentation map. Read it first.

@AGENTS.md

## Claude Code notes

- **Operating model:** Opus 4.8 is the lead (orchestrate, review, integrate);
  delegate execution to **Sonnet 4.6** sub-agents (Agent tool, `model: "sonnet"`).
  This is standing authorization to spawn agents on this project.
- **Quality gates** before marking work done: `pnpm exec tsc --noEmit` (0 errors)
  and `pnpm check` (clean); verify UI in the browser for visual work.
- **MCP:** Context7 (docs) and Playwright (browser) are configured in `.mcp.json`;
  approve via `/mcp` on first use.
- Full details and the docs map: see [AGENTS.md](./AGENTS.md) and
  [docs/README.md](./docs/README.md).
