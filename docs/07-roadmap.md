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
- ☑ `bento/` components: `BentoGrid`, `BentoCell` (size variants), `GlassCard`,
  `GradientBackdrop` (mounted in `__root`), `LocalTimeWidget` (SSR-safe), `StatCard`.
- ☑ Build **Home** as bento grid (identity, pitch+CTAs, stats, stack, featured, local time, connect).
- ☑ Build **About** (bio prose, experience timeline, skills — as glass cards).
- ☑ Build **Work** (project grid; featured-first; cards link to repo/live — no detail pages in v1; no tag filter).
- ☑ Build **Contact** (email + copy-to-clipboard, socials, résumé, vCard `.vcf` download, availability badge).
- ☑ 404 page: catch-all splat route (`routes/$.tsx`) renders on-theme `NotFound` through the
  shell. Real `404` status wired in the M6 close-out (thrown `notFound()` — see M6).
- ☑ Responsive + a11y pass (Playwright MCP, mobile+desktop, dark+light). Fixes: `SiteHeader`
  now collapses to an accessible mobile menu (hamburger, `aria-expanded`/`-controls`, Esc +
  close-on-navigate) instead of overflowing; new `Avatar` shared component degrades to
  initials when the image is missing (SSR-safe onError via mount re-check).
- **Done when:** full site usable end-to-end in Bento, mobile + desktop.
- **Status: DONE + committed** (`9faa27c`). Gates green; verified in-browser. Content
  populated from résumé in `0f3359a`.

## M5 — SEO, polish, performance
- ☑ Per-route meta/OG via `seo.ts` + `site.ts` (env-overridable `VITE_SITE_URL`,
  default `https://sjalolov.dev`). Each route sets title/description/canonical/OG/Twitter;
  root sets defaults + theme-color + icons/manifest. Single title & canonical per page (verified).
- ☑ Static OG image `public/og.png` (1200×630, on-brand, generated via headless render).
- ☑ Sitemap (`routes/sitemap[.]xml.ts`) + robots (`routes/robots[.]txt.ts`) as server
  routes using the real domain; removed the static `public/robots.txt`.
- ☑ Font loading: system-font stack (no web fonts) — zero font requests, no FOUT.
  Image optimization: only assets are user avatar + `og.png` (153 KB) — nothing to optimize.
- ◐ Lighthouse (Perf/A11y/SEO): SEO fundamentals all in place, but a representative run
  needs the **production** build — blocked locally by the standalone Nitro server's
  server-fn self-fetch error (`EADDRNOTAVAIL`/abort). Roll to **M6** (post-deploy) with
  the server-origin fix.
- ☑ `prefers-reduced-motion` — global CSS neutralizes transitions/animations.
- **404 status:** fixed in the M6 close-out — `$.tsx` now throws `notFound()` from its
  loader (`notFoundComponent` renders through the shell); returns a real `404` + `noindex`.
- ☑ `buildVCard` hardened (RFC escaping, `N:`, site `URL:`) — commit `6a4d39c`.
- **Done when:** targets met; site feels finished in Bento. (SEO/polish done; Lighthouse
  numbers to confirm post-deploy in M6.)

## M6 — Deploy v1 (Bento) — target: **Netlify** (not VPS)
Decision: deploy to **Netlify** (VPS unreachable from the dev machine). The generic
nitro `node-server` preset is unusable anyway — it hangs on every request
([TanStack/router#5263](https://github.com/TanStack/router/issues/5263)); Netlify is
TanStack Start's official partner and bypasses it via serverless functions.
- ☑ Netlify build target wired: `@netlify/vite-plugin-tanstack-start` + `netlify()`
  in `vite.config.ts`; `netlify.toml` (build `vite build`, publish `dist/client`).
  Build writes `.netlify/v1/functions/server.mjs`; dev emulation serves all routes 200.
- ☑ Connect repo to Netlify; set `VITE_SITE_URL=https://sjalolov.dev`.
- ☑ Point domain `sjalolov.dev` at Netlify (DNS) + TLS (automatic). **Site is LIVE.**
- ◐ Post-deploy close-out (2026-07-02):
  - ☑ 404 status: live host returned soft-404 (`200`) — fixed by throwing `notFound()`
    from the `$.tsx` loader (idiomatic TanStack Start; `setResponseStatus` hack removed).
    Verified locally via Netlify dev emulation: unknown paths → `404`, all real routes `200`,
    shell + `noindex` intact. Re-verify on the live host after next deploy.
  - ☑ Lighthouse against live `sjalolov.dev` (4 pages × mobile+desktop, 2026-07-02):
    Perf 96–100 · Best-Practices 100 · SEO 100 · A11y 92–98. Home mobile CWV: LCP 1.4 s,
    TBT 0 ms, CLS 0. Home TTFB flagged (2.4 s mobile) = Netlify function cold start, not
    app code. Deferred (revisit with M8): ~38 KB unused JS in the main bundle
    (route-level splitting), 6 KB render-blocking CSS (negligible).
  - ◐ A11y fixes from the audit: `color-contrast` — accent `#6366f1` as text on dark
    badge/pill backgrounds is 2.8–3.5:1 (needs ≥ 4.5:1), all pages; `heading-order` —
    h4 skips a level after h2 on Home/Work.
- **Done when:** Bento portfolio is live over HTTPS on `sjalolov.dev` via Netlify.

## M7 — Terminal theme ✅
- ☑ `tokens.css`: Terminal dark + light ("paper console") values — mono font
  stack, near-square radii, terminal-green accent. Same no-flash strategy.
- ☑ `terminal/` components: `CodeBlock` (hand-rolled syntax highlight, no lib),
  `Prompt`, `CursorBlink` (motion-safe), `GridBackdrop`, `CommandPalette`
  (Cmd/Ctrl+K, lazy-loaded + Terminal-gated). `ThemeBackdrop` dispatches backdrop.
- ☑ Theme-specific Home hero: `engineer` code object (content-derived) via a
  theme dispatcher in `index.tsx` (HomeTerminal vs HomeBento). Section headers
  `~/stats $` etc. Other pages restyle via the token swap (mono/green/sharp).
- ☑ Verified all pages + 404 in Terminal, dark + light; palette keyboard nav
  (arrows/Enter/Esc), focus mgmt, terminal-gating; no hydration mismatch.
- ☑ Bespoke Terminal section treatments (commit `0191b86`): `ProjectCardTerminal`
  (git-log commit entries, accent left-rule for featured) on Work; `SkillListTerminal`
  (package.json `dependencies` block) on About — section-level theme branch, Bento
  unchanged. Built by a Sonnet orchestrator + Sonnet executors, browser-verified.
- **Done when:** Terminal selectable and complete. ✅ (Built M7a–M7d + polish,
  committed `5f796b9`→`0191b86`.) Terminal is LIVE on sjalolov.dev.

## M8 — Hardening & nice-to-haves — **DEFERRED** (decision 2026-07-02)
Deferred in favor of the Spatial theme (M9); revisit after M9 ships.
- ☐ `/work/:slug` detail pages — **deferred from v1**; build here if revived.
- ☐ CI/CD pipeline (GitHub Actions → VPS) and/or Dockerfile.
- ☐ Privacy-friendly analytics.
- ☐ Healthcheck route + uptime monitor.

## M9 — Spatial theme — **NEXT** (after the M6 close-out)
- ☐ R3F hero with reduced-motion fallback; lazy-loaded; perf-budgeted.
- ☐ Flip `spatial.available = true` in registry once it meets the bar.

---

## Working agreement
- One milestone (or sub-step) per change set; keep the app runnable.
- Update the relevant doc when a decision changes.
- Prefer verifying in the browser before moving on (see [Conventions](./08-conventions.md)).
