# 04 — Content Model

All content is **typed, theme-agnostic TypeScript** in `src/content`. It is the
single source of truth rendered by every theme. No CMS, no fetching, no database.

> Values below are **placeholders**. Replace with your real details. Items marked
> `// TODO` need your input.

## Types (`src/content/types.ts`)

```ts
export interface Profile {
  name: string;
  shortName?: string;
  role: string;                 // "Full-Stack Software Engineer"
  tagline: string;              // one-line pitch
  bio: string[];                // paragraphs for About
  location: string;            // "City, Country"
  timezone: string;            // IANA, e.g. "Asia/Tashkent" (for local-time widget)
  avatarUrl: string;           // /avatar.jpg in public/
  email: string;               // jssalijalol@gmail.com
  resumeUrl: string;           // /resume.pdf
  availability: "available" | "open" | "unavailable";
  yearsCommercial: number;     // 6
  yearsProgramming: number;    // 8
}

export interface SkillGroup {
  category: "Frontend" | "Backend" | "DevOps" | "Tools" | string;
  items: Skill[];
}
export interface Skill {
  name: string;
  level?: "core" | "strong" | "familiar"; // optional emphasis
  icon?: string;               // icon key (optional)
}

export interface Experience {
  company: string;
  companyUrl?: string;
  role: string;
  start: string;               // "2021-03" (YYYY-MM)
  end: string | "present";
  location?: string;
  summary: string;
  highlights: string[];        // bullet achievements
  stack: string[];             // tech used
}

export interface Project {
  slug: string;
  title: string;
  summary: string;             // short, for cards
  description?: string[];      // longer, for /work/[slug]
  role?: string;               // your role on it
  year: number;
  stack: string[];
  links: { label: string; url: string; kind: "repo" | "live" | "other" }[];
  images?: { src: string; alt: string }[];
  featured?: boolean;          // surfaced on Home
}

export interface Social {
  platform: string;            // "GitHub", "LinkedIn", "X", "Telegram", "Email"
  url: string;
  handle?: string;
  icon: string;                // lucide icon key or custom
}
```

## Data files

### `profile.ts`
```ts
export const profile: Profile = {
  name: "<Your Name>",              // TODO
  role: "Full-Stack Software Engineer",
  tagline: "I build reliable web products end to end — React/Angular/Vue on the front, NestJS/Go/Java on the back.",
  bio: [
    "Full-stack engineer with 6+ years of commercial experience and 8+ years programming.", // refine
    "I care about clean architecture, performance, and shipping things that hold up in production.",
  ],
  location: "<City, Country>",       // TODO
  timezone: "<IANA TZ>",            // TODO e.g. "Asia/Tashkent"
  avatarUrl: "/avatar.jpg",         // TODO add file to public/
  email: "jssalijalol@gmail.com",
  resumeUrl: "/resume.pdf",         // TODO add file to public/
  availability: "open",
  yearsCommercial: 6,
  yearsProgramming: 8,
};
```

### `skills.ts`
```ts
export const skills: SkillGroup[] = [
  { category: "Frontend", items: [
    { name: "React", level: "core" }, { name: "Angular", level: "core" },
    { name: "Vue", level: "strong" }, { name: "TypeScript", level: "core" },
  ]},
  { category: "Backend", items: [
    { name: "NestJS", level: "core" }, { name: "Go", level: "strong" },
    { name: "Java", level: "strong" },
  ]},
  { category: "DevOps & Tools", items: [
    // TODO: Docker, Postgres, Redis, CI/CD, etc.
  ]},
];
```

### `experience.ts`
Array of `Experience`. **TODO**: fill with real roles. Powers the About timeline
and the "experience summary" stat on Home.

### `projects.ts`
Array of `Project`. **TODO**: 3–6 selected projects. Mark 1–3 as `featured` for Home.
If `/work/[slug]` is deferred for v1, `description`/`images` can be omitted.

### `socials.ts`
```ts
export const socials: Social[] = [
  { platform: "GitHub",   url: "https://github.com/<user>",   icon: "github" },   // TODO
  { platform: "LinkedIn", url: "https://linkedin.com/in/<u>", icon: "linkedin" }, // TODO
  { platform: "Email",    url: "mailto:jssalijalol@gmail.com", icon: "mail" },
  // X / Telegram / etc. optional
];
```

### `index.ts`
Barrel re-export so components import from `#/content`.

## vCard generation

`src/lib/vcard.ts` builds a `.vcf` string from `profile` + `socials` so visitors
can download a contact card. Pure function over the content model:

```
BEGIN:VCARD
VERSION:3.0
FN:<name>
TITLE:<role>
EMAIL:<email>
URL:<site/socials>
END:VCARD
```

Served as a download (Blob client-side, or a tiny route/server fn).

## Résumé-driven content extraction

The intended workflow: you share your **résumé** (PDF/DOCX), and the agent
**extracts and populates** this content model from it:

- `profile`: name, role, location, (timezone inferred/confirmed), bio summary.
- `experience[]`: companies, roles, dates, highlights, stacks.
- `projects[]`: titles, summaries, stacks, and any **links** found.
- `skills[]`: grouped from listed technologies.
- `socials[]`: any GitHub/LinkedIn/portfolio/email links present.

Rules for extraction:
- Map résumé content to the **typed shapes above**; never invent facts.
- Flag anything ambiguous or missing (e.g. exact dates, which projects to feature,
  timezone) as `// TODO` for your confirmation.
- Keep wording but tighten for web (concise summaries, scannable highlights).
- Prefer real links from the résumé over placeholders.

## What you need to provide

- [ ] Display name + short name / handle
- [ ] City, country + IANA timezone
- [ ] Avatar image (`public/avatar.jpg`)
- [ ] Résumé PDF (`public/resume.pdf`)
- [ ] Real social URLs
- [ ] Experience entries (companies, roles, dates, highlights, stacks)
- [ ] 3–6 projects (which to feature)
- [ ] Bio paragraphs you're happy with
