import type { Profile, Social } from "#/content/types";

export function buildVCard(profile: Profile, socials: Social[]): string {
	const lines: string[] = [
		"BEGIN:VCARD",
		"VERSION:3.0",
		`FN:${profile.name}`,
		`TITLE:${profile.role}`,
		`EMAIL:${profile.email}`,
		...socials
			.filter((s) => !s.url.startsWith("mailto:"))
			.map((s) => `URL:${s.url}`),
		"END:VCARD",
	];
	return lines.join("\r\n");
}
