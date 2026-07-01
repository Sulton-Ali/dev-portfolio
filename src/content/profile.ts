import type { Profile } from "#/content/types";

export const profile: Profile = {
	name: "Sultonali Jalolov",
	shortName: "Sultonali",
	role: "Software Engineer",
	tagline:
		"I build high-load web apps with React across fintech and govtech — focused on performance, clean architecture, and developer experience.",
	bio: [
		"Software Engineer with 5+ years building high-load products with React in the fintech and government-services domains.",
		"I've shipped scalable CRM/admin panels that contributed to major productivity gains, applying TypeScript best practices, code-splitting, lazy loading, and Feature-Sliced Design.",
		"Beyond the frontend I work with Node.js and Go, GraphQL/REST APIs, and DevOps tooling (Docker, Kafka), and I enjoy mentoring, architecture, and leading development.",
	],
	location: "Tashkent, Uzbekistan",
	timezone: "Asia/Tashkent",
	avatarUrl: "/avatar.jpg",
	email: "jssalijalol@gmail.com",
	resumeUrl: "/resume.pdf",
	availability: "open",
	yearsCommercial: 5,
	yearsProgramming: 6, // TODO: confirm — estimated from studies + first commercial work
};
