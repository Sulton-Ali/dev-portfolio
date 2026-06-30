export interface Profile {
	name: string;
	shortName?: string;
	role: string;
	tagline: string;
	bio: string[];
	location: string;
	timezone: string;
	avatarUrl: string;
	email: string;
	resumeUrl: string;
	availability: "available" | "open" | "unavailable";
	yearsCommercial: number;
	yearsProgramming: number;
}

export interface SkillGroup {
	category: "Frontend" | "Backend" | "DevOps" | "Tools" | string;
	items: Skill[];
}

export interface Skill {
	name: string;
	level?: "core" | "strong" | "familiar";
	icon?: string;
}

export interface Experience {
	company: string;
	companyUrl?: string;
	role: string;
	start: string;
	end: string | "present";
	location?: string;
	summary: string;
	highlights: string[];
	stack: string[];
}

export interface Project {
	slug: string;
	title: string;
	summary: string;
	description?: string[];
	role?: string;
	year: number;
	stack: string[];
	links: { label: string; url: string; kind: "repo" | "live" | "other" }[];
	images?: { src: string; alt: string }[];
	featured?: boolean;
}

export interface Social {
	platform: string;
	url: string;
	handle?: string;
	icon: string;
}
