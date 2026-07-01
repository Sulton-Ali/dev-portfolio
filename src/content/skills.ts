import type { SkillGroup } from "#/content/types";

export const skills: SkillGroup[] = [
	{
		category: "Frontend",
		items: [
			{ name: "React", level: "core" },
			{ name: "TypeScript", level: "core" },
			{ name: "JavaScript (ES6+)", level: "core" },
			{ name: "Next.js", level: "strong" },
			{ name: "Vue", level: "strong" },
			{ name: "Nuxt.js", level: "strong" },
			{ name: "Angular", level: "strong" },
			{ name: "Redux Toolkit", level: "strong" },
			{ name: "React Query" },
			{ name: "Zustand" },
			{ name: "Tailwind CSS" },
			{ name: "SCSS" },
			{ name: "HTML5" },
			{ name: "CSS3" },
		],
	},
	{
		category: "Backend",
		items: [
			{ name: "Node.js", level: "strong" },
			{ name: "Go", level: "strong" },
			{ name: "GraphQL", level: "strong" },
			{ name: "REST API", level: "core" },
			{ name: "WebSocket" },
			{ name: "JSON-RPC" },
		],
	},
	{
		category: "DevOps & Tools",
		items: [
			{ name: "Docker", level: "strong" },
			{ name: "Kafka" },
			{ name: "Git" },
			{ name: "CI/CD" },
			{ name: "Webpack" },
			{ name: "Babel" },
			{ name: "Jira" },
			{ name: "Confluence" },
		],
	},
];
