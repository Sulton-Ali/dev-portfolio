// TODO: replace with real experience
import type { Experience } from "#/content/types";

export const experience: Experience[] = [
	{
		company: "<Company>",
		role: "Full-Stack Engineer",
		start: "2022-01",
		end: "present",
		location: "<City, Country>",
		summary:
			"Built and maintained full-stack web applications serving thousands of daily active users.",
		highlights: [
			"Reduced page load times by 40% through code splitting and lazy loading strategies.",
			"Designed and shipped a reusable component library adopted across three product teams.",
			"Led migration from legacy REST API to GraphQL, improving developer experience and type safety.",
		],
		stack: ["React", "TypeScript", "NestJS", "PostgreSQL", "Docker"],
	},
	{
		company: "<Previous Company>",
		role: "Software Engineer",
		start: "2020-03",
		end: "2021-12",
		location: "<City, Country>",
		summary:
			"Developed backend services and REST APIs for a B2B SaaS platform used by enterprise clients.",
		highlights: [
			"Built CI/CD pipelines that cut deployment time from 45 minutes to under 5 minutes.",
			"Implemented a caching layer with Redis, reducing database load by 60%.",
		],
		stack: ["Go", "Java", "PostgreSQL", "Redis", "Kubernetes"],
	},
];
