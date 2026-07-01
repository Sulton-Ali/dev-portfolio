import type { Profile, Social } from "#/content/types";
import { SITE } from "#/lib/site";

// Escape a vCard 3.0 text value per RFC 2426 §5: backslash, comma, semicolon,
// and newlines are the reserved characters.
function esc(value: string): string {
	return value
		.replace(/\\/g, "\\\\")
		.replace(/\n/g, "\\n")
		.replace(/,/g, "\\,")
		.replace(/;/g, "\\;");
}

// Structured name: N:Family;Given;Additional;Prefix;Suffix. Split the display
// name on whitespace — first token is the given name, the rest the family name.
function structuredName(name: string): string {
	const parts = name.trim().split(/\s+/);
	const given = parts[0] ?? "";
	const family = parts.slice(1).join(" ");
	return `${esc(family)};${esc(given)};;;`;
}

export function buildVCard(profile: Profile, socials: Social[]): string {
	const urls = [
		SITE.url,
		...socials.filter((s) => !s.url.startsWith("mailto:")).map((s) => s.url),
	];

	const lines: string[] = [
		"BEGIN:VCARD",
		"VERSION:3.0",
		`N:${structuredName(profile.name)}`,
		`FN:${esc(profile.name)}`,
		`TITLE:${esc(profile.role)}`,
		`EMAIL;TYPE=INTERNET:${esc(profile.email)}`,
		...urls.map((url) => `URL:${esc(url)}`),
		"END:VCARD",
	];

	return lines.join("\r\n");
}
