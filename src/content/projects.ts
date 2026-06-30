// TODO: replace with real projects
import type { Project } from "#/content/types";

export const projects: Project[] = [
	{
		slug: "project-alpha",
		title: "<Project Alpha>",
		summary:
			"A full-stack web application for managing team workflows and tasks in real time.",
		year: 2024,
		stack: ["React", "TypeScript", "NestJS", "PostgreSQL"],
		links: [
			{
				label: "Repository",
				url: "https://github.com/<user>/<repo>",
				kind: "repo",
			}, // TODO
			{
				label: "Live Demo",
				url: "https://<project>.example.com",
				kind: "live",
			}, // TODO
		],
		featured: true,
	},
	{
		slug: "project-beta",
		title: "<Project Beta>",
		summary:
			"A REST API service written in Go for high-throughput data ingestion and processing.",
		year: 2023,
		stack: ["Go", "PostgreSQL", "Redis", "Docker"],
		links: [
			{
				label: "Repository",
				url: "https://github.com/<user>/<repo>",
				kind: "repo",
			}, // TODO
		],
	},
	{
		slug: "project-gamma",
		title: "<Project Gamma>",
		summary:
			"An Angular dashboard for visualising analytics data with interactive charts.",
		year: 2023,
		stack: ["Angular", "TypeScript", "D3.js"],
		links: [
			{
				label: "Repository",
				url: "https://github.com/<user>/<repo>",
				kind: "repo",
			}, // TODO
		],
	},
];
