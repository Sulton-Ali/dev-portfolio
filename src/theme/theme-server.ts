import {
	DEFAULT_THEME,
	isThemeId,
	MODE_COOKIE,
	THEME_COOKIE,
	type ThemeId,
} from "#/theme/registry";

type ThemePreferences = { theme: ThemeId; mode: "dark" | "light" | null };

// Read a cookie on the client from document.cookie (used during client-side
// navigation, where the server request context isn't available).
function readClientCookie(name: string): string | undefined {
	if (typeof document === "undefined") return undefined;
	for (const part of document.cookie.split("; ")) {
		const eq = part.indexOf("=");
		if (eq === -1) continue;
		if (part.slice(0, eq) === name) {
			return decodeURIComponent(part.slice(eq + 1));
		}
	}
	return undefined;
}

// Resolve the persisted theme + mode from cookies for the root loader.
// Isomorphic: on the server it reads the request cookies in-process (guarded
// dynamic import keeps the server-only module out of the client bundle); on the
// client it reads document.cookie. Reading in-process avoids a server-function
// self-fetch during SSR, which the standalone Node server cannot service.
export async function getThemePreferences(): Promise<ThemePreferences> {
	let themeCookie: string | undefined;
	let modeCookie: string | undefined;

	if (import.meta.env.SSR) {
		const { getCookie } = await import("@tanstack/react-start/server");
		themeCookie = getCookie(THEME_COOKIE);
		modeCookie = getCookie(MODE_COOKIE);
	} else {
		themeCookie = readClientCookie(THEME_COOKIE);
		modeCookie = readClientCookie(MODE_COOKIE);
	}

	const theme = isThemeId(themeCookie) ? themeCookie : DEFAULT_THEME;
	const mode =
		modeCookie === "dark" || modeCookie === "light" ? modeCookie : null;

	return { theme, mode };
}
