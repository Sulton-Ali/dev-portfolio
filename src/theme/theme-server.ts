import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
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

// Isomorphic cookie read: on the server it reads the request cookies
// in-process (avoids a server-function self-fetch during SSR); on the client
// it reads document.cookie. The Start compiler strips the server branch — and
// the server-only `getCookie` import — from the client bundle, which is what
// the previous `if (import.meta.env.SSR) await import(...)` guard emulated
// before the import-protection plugin started rejecting it.
const readThemeCookies = createIsomorphicFn()
	.server(() => ({
		theme: getCookie(THEME_COOKIE),
		mode: getCookie(MODE_COOKIE),
	}))
	.client(() => ({
		theme: readClientCookie(THEME_COOKIE),
		mode: readClientCookie(MODE_COOKIE),
	}));

// Resolve the persisted theme + mode from cookies for the root loader.
export function getThemePreferences(): ThemePreferences {
	const { theme: themeCookie, mode: modeCookie } = readThemeCookies();

	const theme = isThemeId(themeCookie) ? themeCookie : DEFAULT_THEME;
	const mode =
		modeCookie === "dark" || modeCookie === "light" ? modeCookie : null;

	return { theme, mode };
}
