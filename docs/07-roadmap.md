# 07 — Roadmap

Step-by-step implementation plan. We build in small, verifiable increments. Each
milestone ends in a working, committable state. Bento ships first; Terminal
reuses the same content + components; Spatial is deferred.

Legend: ☐ todo · ◐ in progress · ☑ done

---

## M0 — Project scaffold
- ☑ Configure project-scoped MCP (`.mcp.json`: Context7, Playwright) — see [Tooling](./09-tooling.md).
- ☑ Initialize TanStack Start + TypeScript (strict) via `@tanstack/cli` (React, Nitro adapter).
- ☑ Tailwind CSS v4 wired (`@tailwindcss/vite` + `src/styles.css`). Fonts: TODO in M2.
- ☑ Biome (lint + format) configured; `tsconfig` paths `#/*` and `@/*` → `./src/*`.
- ☑ `git init`, `.gitignore`, base `README` (scaffold). `pnpm-workspace.yaml` for native builds.
- ◐ Root layout `__root.tsx` exists (html/head/meta + devtools). Skip link + ThemeProvider land in M2.
- ☑ **Done:** dev server runs (`pnpm dev`), SSR renders styled page (verified), `tsc` + `biome` clean.

## M1 — Content layer ✅
- ☑ `src/content/types.ts` (from [Content Model](./04-content-model.md)).
- ☑ Placeholder `profile`, `skills`, `experience`, `projects`, `socials` + barrel.
- ☑ `src/lib/vcard.ts`, `src/lib/seo.ts`, `src/lib/utils.ts`.
- ☑ **Done:** gates pass (`tsc --noEmit` 0, `biome check` clean). Built by Sonnet, lead-reviewed.
- Follow-ups deferred to M4: harden `buildVCard` (RFC escaping, `N:`/site `URL:`);
  skill rendering must skip empty groups (DevOps group is empty pending real data).

## M2 — Theme infrastructure ✅
- ☑ `tokens.css` — Bento dark+light values; dark-base + media-query no-flash strategy.
- ☑ Tailwind `@theme inline` maps runtime vars → utilities (`bg-background`, `text-foreground`, `border-border`, `text-accent`, `ring-ring`, …).
- ☑ `ThemeProvider`, `registry.ts`, `theme-cookie.ts` (client) + `theme-server.ts` (`getCookie` server fn).
- ☑ `__root.tsx` loader reads prefs; `<html>` gets `data-theme` always, `data-mode` only when explicit (no flash).
- ☑ `ThemeSwitcher` (mode cycle system→light→dark + theme selector; temp placement, moves to header in M3).
- ☑ **Done:** gates pass; SSR verified across no-cookie/light/dark/garbage states. Built by Sonnet, lead-reviewed + runtime-verified.

## M3 — Shared primitives & components ✅
- ☑ Primitives: `Container`, `Section`, `Heading`, `Text`, `Button` (+`buttonClasses`), `Badge`, `Card`, `Link` (type-safe via `createLink`), `ExternalLink`.
- ☑ Shared: `ProjectCard`, `SkillList` (skips empty groups), `ExperienceItem`, `SocialLinks`, `StatStrip`, `SiteHeader`, `SiteFooter`.
- ☑ Header nav (active states) + footer in root layout; skip-to-content link; switcher moved into header.
- ☑ Stub routes `/about`, `/work`, `/contact` (so nav type-checks; M4 fills them in).
- ☑ Added `tailwind-merge`; `cn` now resolves conflicting utility overrides reliably.
- ☑ **Done:** gates pass; all routes SSR 200 with chrome verified. Built by Sonnet (M3a primitives, M3b shared), lead-reviewed.

## M4 — Bento theme + all pages (v1 visual)
- ☐ `bento/` components: `BentoGrid`, `BentoCell`, `GlassCard`, `GradientBackdrop`,
  `LocalTimeWidget`, `StatCard`.
- ☐ Build **Home** as bento grid.
- ☐ Build **About** (bio, timeline, skills).
- ☐ Build **Work** (project grid; cards link to repo/live — no detail pages in v1; tag filter optional).
- ☐ Build **Contact** (email + copy, socials, résumé, vCard download).
- ☐ 404 page, responsive pass, a11y pass.
- **Done when:** full site usable end-to-end in Bento, mobile + desktop.

## M5 — SEO, polish, performance
- ☐ Per-route meta/OG via `seo.ts`; static OG images.
- ☐ Sitemap + robots.txt.
- ☐ Image optimization, font loading strategy.
- ☐ Lighthouse: Perf ≥95, A11y ≥95, SEO 100 (mobile).
- ☐ `prefers-reduced-motion` audit.
- **Done when:** targets met; site feels finished in Bento.

## M6 — Deploy v1 (Bento)
- ☐ Node server build; verify `pnpm build && pnpm start` locally.
- ☐ VPS: systemd unit + reverse proxy + TLS ([Deployment](./06-deployment.md)).
- ☐ Domain live over HTTPS.
- **Done when:** Bento portfolio is live on your VPS.

## M7 — Terminal theme
- ☐ `tokens.css`: Terminal dark+light values.
- ☐ `terminal/` components: `CodeBlock` (syntax highlight), `Prompt`,
  `CursorBlink`, `GridBackdrop`, `CommandPalette` (Cmd/Ctrl+K, lazy-loaded).
- ☐ Theme-specific Home hero (code object) + section treatments.
- ☐ Verify all four pages in Terminal; contrast + a11y; palette keyboard nav.
- **Done when:** Terminal selectable and complete; redeploy.

## M8 — Hardening & nice-to-haves (optional)
- ☐ `/work/:slug` detail pages — **deferred from v1**; build here if revived.
- ☐ CI/CD pipeline (GitHub Actions → VPS) and/or Dockerfile.
- ☐ Privacy-friendly analytics.
- ☐ Healthcheck route + uptime monitor.

## Future — Spatial theme (M9+)
- ☐ R3F hero with reduced-motion fallback; lazy-loaded; perf-budgeted.
- ☐ Flip `spatial.available = true` in registry once it meets the bar.

---

## Working agreement
- One milestone (or sub-step) per change set; keep the app runnable.
- Update the relevant doc when a decision changes.
- Prefer verifying in the browser before moving on (see [Conventions](./08-conventions.md)).
