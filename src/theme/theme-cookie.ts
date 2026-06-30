import {
	MODE_COOKIE,
	type Mode,
	THEME_COOKIE,
	type ThemeId,
} from "#/theme/registry";

const ONE_YEAR = 31536000; // seconds
const ATTRS = `path=/; max-age=${ONE_YEAR}; SameSite=Lax`;

export function writeThemeCookie(theme: ThemeId): void {
	if (typeof document === "undefined") return;
	// biome-ignore lint/suspicious/noDocumentCookie: intentional lightweight cookie write (no Cookie Store dependency); see docs/02-design-system.md
	document.cookie = `${THEME_COOKIE}=${theme}; ${ATTRS}`;
}

export function writeModeCookie(mode: Mode): void {
	if (typeof document === "undefined") return;
	if (mode === "system") {
		// biome-ignore lint/suspicious/noDocumentCookie: intentional cookie deletion to fall back to system mode
		document.cookie = `${MODE_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
		return;
	}
	// biome-ignore lint/suspicious/noDocumentCookie: intentional lightweight cookie write (no Cookie Store dependency)
	document.cookie = `${MODE_COOKIE}=${mode}; ${ATTRS}`;
}
