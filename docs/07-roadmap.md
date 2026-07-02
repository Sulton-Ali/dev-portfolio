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
  - ☑ A11y fixes from the audit:
    - `color-contrast`: new semantic token `--accent-text` (readable accent for small
      text; Bento dark `#a5b4fc`, Terminal light darkened to `#15702f`) used by the
      Badge accent variant + Avatar initials. All theme/mode combos now ≥ 4.5:1 on the
      pill fill (computed: 8.7 / 5.0 / 7.6 / 5.3).
    - `heading-order`: `Heading` gained a `size` prop (visual size decoupled from
      semantic level); Home cells are h2-styled-as-h4, `ProjectCard` takes
      `headingLevel`; Terminal Home got an sr-only h1. No level skips on any page
      (verified via SSR HTML, both themes).
    - Verified in-browser (Bento light+dark, Terminal light); gates green.
- **M6 CLOSED (2026-07-02).** Deployed; live host re-checked — `/nonexistent` returns a
  real **404**. (Optional: Lighthouse a11y re-run to confirm the 100s.)
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

## M9 — Spatial theme — **IN PROGRESS** (design decided 2026-07-02, see [Themes](./03-themes.md))
- ☑ **M9a — tokens + static theme (no 3D yet):** Spatial dark+light token blocks in
  `tokens.css` (all pairings AA-computed; dark `--accent` darkened to `#7c3aed` — the
  doc's `#8b5cf6` failed 4.5:1 vs white); `SpatialBackdrop` (CSS nebula via
  `--backdrop-glow-1/2/3`) in `ThemeBackdrop`; `HomeSpatial` (static `HeroFallback` with
  a `data-slot="scene"` mount point for M9b + shared-component sections) in the
  `index.tsx` dispatcher. All pages verified under the spatial cookie (dark+light,
  in-browser); heading order clean; bento/terminal unaffected. Registry stays
  `available: false` (preview via cookie). Built by Sonnet, lead-reviewed.
- ☑ **M9b — R3F hero scene:** `three@0.185` + `@react-three/fiber@9.6` (no drei);
  `HeroScene` (1400-particle field + wireframe icosahedron + cursor parallax, colors
  read from CSS tokens at runtime, re-tinted on mode change) behind `SceneMount`
  (client-only lazy gate: never mounts under reduced-motion — live-tracked; unmounts
  when the hero scrolls off-screen; fade-in). Chunk split verified: entry ~95 kB gz
  with zero three refs; scene = separate 235 kB gz lazy chunk; bento/terminal never
  request it. SSR render confirmed three-free. Verified in-browser dark+light +
  reduced-motion emulation. Built by Sonnet, lead-reviewed.
  Known dev-only noise: upstream `THREE.Clock` deprecation from fiber 9.6, and a
  console echo loop between devtools-vite client-log piping and Vite server-log
  forwarding (pre-existing; absent in production builds).
- ☑ **M9c — gates + ship:** production build green; chunk split re-verified on final
  code (entry 95 kB gz, zero three refs; HeroScene = separate 235 kB gz lazy chunk);
  switcher path verified in-browser as a fresh visitor (Spatial enabled → click swaps
  theme in place, cookie persists, SSR reload renders `data-theme="spatial"` no-flash,
  scene lazy-mounts); flipped `spatial.available = true`.
- ☑ **M9d — polish batch** (decided 2026-07-02, before deploy): all inside the existing
  lazy chunk, zero new deps; every item motion-safe:
  - ☑ Scroll-linked hero motion — `ParallaxGroup` tracks scroll progress off the
    canvas's own bounding rect (it exactly fills the hero, since every ancestor in
    between is `absolute inset-0`), passive scroll listener into a ref, folded into
    the existing pointer-lerp targets (+up to 0.15 rad yaw, slight z drift).
  - ☑ Constellation lines — one `<lineSegments>` per hero, pairwise distance pass
    over the 1400 fixed particle positions computed once in a second `useMemo`
    (threshold 1.1, nearest-first sort, capped at 1200 segments), rendered under the
    same rotating `<group>` as the points so they stay attached; color re-tints on
    mode change like the particles (`--accent-text`).
  - ☑ Geometry life — outer icosahedron scale-breathes (`1 + 0.04·sin(t·0.5)`) each
    frame; a second, smaller (0.55×) icosahedron nested inside it counter-rotates at
    its own rate, opacity 0.25.
  - ☑ Motion-safe section reveals — new `src/components/spatial/Reveal.tsx` wraps
    each of HomeSpatial's four post-hero sections. SSR/first paint always render
    visible (verified: zero `opacity-0`/hidden markup in SSR HTML); client-side only,
    non-reduced-motion, an `IntersectionObserver` (threshold 0.15) applies the hidden
    state (opacity 0 + `translate-y-4`) pre-reveal and unobserves after revealing.
    Verified in-browser: below-fold sections start hidden and reveal on scroll
    (`opacity`/`translate` computed styles), already-visible sections never hide,
    and reduced-motion emulation never applies the hidden state at all.
  - ☑ Verified in-browser (dark + light, Playwright): constellation + dual icosahedra
    render, scroll-away-and-back keeps the scene healthy with zero console errors,
    reduced-motion emulation mounts no canvas. Gates green; build chunk split
    re-verified (HeroScene lazy chunk 234.58 kB → 235.04 kB gz, +0.46 kB; entry chunk
    unchanged, zero three refs).
- **Done when:** Spatial selectable in the switcher and meets the perf/a11y bar. ✅
  (M9a–M9d complete 2026-07-02.) Post-deploy: confirm Lighthouse Home ≥ 90 perf with
  the scene on the live host (as with M6, representative numbers need production).

---

## Working agreement
- One milestone (or sub-step) per change set; keep the app runnable.
- Update the relevant doc when a decision changes.
- Prefer verifying in the browser before moving on (see [Conventions](./08-conventions.md)).
