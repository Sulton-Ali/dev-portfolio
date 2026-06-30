# 08 — Conventions

Lightweight conventions that keep the project clean and make AI-agent-driven
development productive and reviewable.

## Code style
- **TypeScript strict**; no `any` without justification.
- Functional React components; hooks for logic.
- Path alias `#/` → `src/` (Node subpath import in `package.json` + `tsconfig`;
  `@/` is also configured as an alias. Prefer `#/`).
- Components: one component per file, PascalCase filename matching export.
- Co-locate component-only styles; global/base styles in `src/styles.css`.
- No hard-coded colors in components — **only semantic tokens** (see
  [Design System](./02-design-system.md)).

## Naming
- Files: `PascalCase.tsx` for components, `kebab-case.ts` for utilities/data.
- Content data files: lowercase (`profile.ts`, `projects.ts`).
- Tokens: `--color-*`, `--font-*`, `--space-*`, etc.
- Theme ids: lowercase (`bento`, `terminal`, `spatial`).

## Folder boundaries (enforced by discipline / review)
- `content/` imports nothing from `theme/` or `components/`.
- `components/primitives` and `components/shared` are theme-agnostic (tokens only).
- `components/<theme>/` may be theme-specific.
- `lib/` is pure utilities, framework-light.

## Git
- Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`, `style:`.
- Small, focused commits aligned to roadmap steps.
- Branch per milestone if useful; keep `main` deployable.
- Commit/push only when the user asks.

## Quality gates before "done"
- `typecheck` passes (`tsc --noEmit`).
- Linter/formatter clean.
- Builds (`pnpm build`) and runs (`pnpm start`).
- Verified in the browser at mobile + desktop widths.
- New/changed UI checked in **both** the active theme's dark and light modes.

## Accessibility checklist (per page)
- Semantic landmarks; one `<h1>`; logical heading order.
- Keyboard operable; visible focus; command palette fully keyboard-driven.
- Color contrast AA in every theme/mode.
- `alt` text on meaningful images; decorative ones marked.
- Motion gated behind `prefers-reduced-motion`.

## Agent operating model (lead + team)
This project is built with a deliberate lead/team split:
- **Lead = Opus 4.8** — orchestration, planning, task breakdown, code review,
  integration, decisions, and final verification (typecheck/lint/build/browser).
- **Team = Sonnet 4.6 sub-agents** — carry out scoped implementation/execution
  tasks (spawned via the Agent tool with `model: "sonnet"`).
- Flow: Lead specifies a scoped task → Sonnet agent executes → Lead reviews the
  diff, runs quality gates, and integrates. The Lead does not hand off review.
- Rationale: deliberate practice with AI coding agents (a core goal of the project).

## Working with AI coding agents
- **Docs are the contract.** Point the agent at the relevant doc(s) for each task.
- Work milestone by milestone (see [Roadmap](./07-roadmap.md)); keep the app
  runnable after each step.
- Prefer small diffs the human can review over large sweeping changes.
- When a decision changes mid-build, **update the doc first**, then the code.
- After a feature: typecheck, lint, build, and verify in-browser before moving on.
- Keep placeholders obvious (`<Your Name>`, `// TODO`) so real data is easy to find.

## Dependencies policy
- Prefer the platform and small, well-maintained libraries.
- Justify each new dependency (size/maintenance). Avoid duplicating what Tailwind
  or the framework already provides.
