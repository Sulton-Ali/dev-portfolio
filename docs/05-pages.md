# 05 — Pages

Four pages (no blog). Each page composes shared, token-driven sections; a few
sections render a theme-specific layout (e.g. Home's Bento grid vs. Terminal's
code hero). Content is identical across themes.

Routes (TanStack Start, file-based):

| Route file | Path | Page |
|------------|------|------|
| `routes/index.tsx` | `/` | Home |
| `routes/about.tsx` | `/about` | About |
| `routes/work.tsx` | `/work` | Work |
| ~~`routes/work.$slug.tsx`~~ | ~~`/work/:slug`~~ | Project detail — **DEFERRED (v1.1)** |
| `routes/contact.tsx` | `/contact` | Contact |
| `routes/__root.tsx` | — | Root layout (head, nav, footer, ThemeProvider) |

Global chrome (in `__root.tsx`): header nav, theme switcher, mode toggle,
skip-to-content link, footer with socials + copyright. SSR sets `data-theme` /
`data-mode` on `<html>`.

---

## `/` — Home

**Goal:** In one screen, communicate who you are, your level, your stack, and how
to reach you; surface featured work.

**Sections / cells**
- **Identity** — name, role, avatar, availability badge.
- **Pitch** — one-line tagline + primary CTAs (View Work, Contact).
- **Stat strip** — 6+ yrs commercial · 8+ yrs programming · N projects.
- **Tech stack** — frontend & backend chips.
- **Featured project(s)** — 1–3 cards from `projects` where `featured`.
- **Local time / location** widget.
- **Social links** + résumé download.

**Theme rendering**
- *Bento:* the entire page is the bento grid; the sections above are cells of
  varying sizes (see [Themes](./03-themes.md)).
- *Terminal:* hero is the syntax-highlighted `engineer` object; sections flow
  vertically with `~/section $` headers; Cmd+K palette available.

---

## `/about` — About

**Goal:** Story, depth, and credibility.

**Sections**
- **Bio** — `profile.bio` paragraphs (prose width ~65ch).
- **Experience timeline** — `experience[]` as a vertical timeline: company, role,
  dates, summary, highlights, stack tags.
- **Skills** — `skills[]` grouped (Frontend / Backend / DevOps & Tools), with
  optional emphasis for `core` items.
- **Optional:** "How I work" values, education/certs.
- CTA → Contact.

**Theme rendering**
- *Bento:* timeline entries and skill groups as cards.
- *Terminal:* skills as a `dependencies` list; experience as `git log`-style entries.

---

## `/work` — Work

**Goal:** Selected projects with enough signal to evaluate.

**Sections**
- Intro line.
- **Project grid/list** — all `projects[]`: title, summary, year, stack tags,
  links (repo/live). Featured ones may be emphasized.
- Optional filter by tech tag (client-side, simple).

**Theme rendering**
- *Bento:* card grid with hover lift + accent glow.
- *Terminal:* list styled like PR/commit entries.

---

## `/work/:slug` — Project detail — DEFERRED to v1.1

**Decision:** not built in v1. Project cards on `/work` link directly to the
external repo / live URL instead. The content model already supports this later
(`Project.description`, `Project.images`) — when revived, add `work.$slug.tsx`
with a route loader that finds the project by `slug` (404 if not found), renders
problem → approach → outcome, stack, screenshots, and prev/next nav.

---

## `/contact` — Contact (links only, no form)

**Goal:** Make reaching you frictionless. No backend.

**Sections**
- Heading + short line ("Let's talk — fastest is email.").
- **Email** — shown + **copy-to-clipboard** button + `mailto:` link.
- **Social links** — from `socials[]` (GitHub, LinkedIn, Telegram, X…).
- **Résumé** — download button (`/resume.pdf`).
- **Save contact** — **download vCard (.vcf)** built from the content model.
- Availability status badge.

**Theme rendering**
- *Bento:* a focused contact card / small grid.
- *Terminal:* a `contact $` prompt with the actions as commands/links.

---

## Cross-page concerns

- **SEO:** each route sets title, description, canonical, Open Graph/Twitter tags
  via `src/lib/seo.ts`. Static OG images in `public/og/` (or dynamic later).
- **Nav active state** reflects current route.
- **404** route with on-theme styling.
- **Sitemap & robots.txt** generated/served.
- **Analytics:** optional, privacy-friendly (e.g. Plausible) — decide later.
