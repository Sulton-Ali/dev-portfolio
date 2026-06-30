import type { SkillGroup } from "#/content/types";

export const skills: SkillGroup[] = [
	{
		category: "Frontend",
		items: [
			{ name: "React", level: "core" },
			{ name: "Angular", level: "core" },
			{ name: "Vue", level: "strong" },
			{ name: "TypeScript", level: "core" },
		],
	},
	{
		category: "Backend",
		items: [
			{ name: "NestJS", level: "core" },
			{ name: "Go", level: "strong" },
			{ name: "Java", level: "strong" },
		],
	},
	{
		category: "DevOps & Tools",
		items: [
			// TODO: Docker, Postgres, Redis, CI/CD, etc.
		],
	},
];
