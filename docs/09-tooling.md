# 09 — Tooling & MCP

Project-scoped tooling configured for AI-agent-driven development. MCP servers are
declared in **`.mcp.json`** at the repo root, so they are scoped to this project
(not global) and travel with the codebase.

## Configured MCP servers

`.mcp.json`:
```json
{
  "mcpServers": {
    "context7":   { "command": "npx", "args": ["-y", "@upstash/context7-mcp@latest"] },
    "playwright": { "command": "npx", "args": ["-y", "@playwright/mcp@latest"] }
  }
}
```

### Context7 — up-to-date library docs
- **Why:** TanStack Start, TanStack Router, Tailwind v4, and Biome evolve quickly.
  Context7 fetches current, version-accurate docs/snippets on demand, so the agent
  scaffolds against real APIs instead of stale memory (directly addresses the
  "verify against current docs" caveat in [Architecture](./01-architecture.md)).
- **Use during:** M0 scaffold, M2 theming, any time an API signature is uncertain.
- Verified package: `@upstash/context7-mcp` (v3.2.2 at setup).

### Playwright — browser emulation / verification
- **Why:** Lets the agent open the running dev server, navigate, take screenshots,
  check responsive widths, and verify theme/mode switching visually — fulfilling
  the "verify in the browser before done" quality gate in
  [Conventions](./08-conventions.md).
- **Use during:** every page build (M4, M7), responsive/a11y passes, M5 polish.
- First run may download a browser binary (Chromium) automatically.
- Verified package: `@playwright/mcp` (v0.0.77 at setup).

## Activation notes

- Claude Code requires **approval** of project `.mcp.json` servers the first time
  they load (security). Approve when prompted, or manage via the `/mcp` command.
- `reset-project-choices` (Claude Code) re-prompts approval if needed.
- These run via `npx`, so they need network access on first launch to fetch the
  packages; Node 24 + pnpm 11 are present in the dev environment.

## Toolchain (local)

| Tool | Version at setup |
|------|------------------|
| Node.js | v24.16.0 |
| npm | 11.13.0 |
| pnpm | 11.5.2 |

## Adding more tools later

Add another entry under `mcpServers` in `.mcp.json` and document its purpose here.
Candidates if needed later: a filesystem/Git helper, or a Lighthouse/perf MCP for
the M5 performance pass.
