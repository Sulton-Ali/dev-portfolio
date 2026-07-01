// NOTE: derived from résumé (ADPMS / AGC CRM panels). These roles are on
// internal/proprietary products, so there are no public repo/live links yet.
// TODO (Sultonali): confirm titles, years, and add descriptions + any shareable
// links; add more projects (open-source, personal) with GitHub/live URLs.
import type { Project } from "#/content/types";

export const projects: Project[] = [
	{
		slug: "adpms",
		title: "ADPMS — CRM / Admin Panel",
		summary:
			"Scalable CRM/admin panel for a fintech product. Performance-focused React architecture (code-splitting, lazy loading, Feature-Sliced Design) that contributed to significant productivity gains for internal teams.",
		role: "Frontend / Software Engineer",
		year: 2024,
		stack: ["React", "TypeScript", "Feature-Sliced Design", "Redux Toolkit"],
		links: [],
		featured: true,
	},
	{
		slug: "agc",
		title: "AGC — CRM / Admin Panel",
		summary:
			"Admin/CRM panel built with a modular, scalable frontend architecture and modern React best practices, delivering a fast and maintainable internal tool.",
		role: "Frontend / Software Engineer",
		year: 2024,
		stack: ["React", "TypeScript", "GraphQL", "SCSS"],
		links: [],
	},
];
