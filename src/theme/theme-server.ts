import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

import {
	DEFAULT_THEME,
	isThemeId,
	MODE_COOKIE,
	THEME_COOKIE,
	type ThemeId,
} from "#/theme/registry";

export const getThemePreferences = createServerFn({ method: "GET" }).handler(
	(): { theme: ThemeId; mode: "dark" | "light" | null } => {
		const themeCookie = getCookie(THEME_COOKIE);
		const theme = isThemeId(themeCookie) ? themeCookie : DEFAULT_THEME;

		const modeCookie = getCookie(MODE_COOKIE);
		const mode =
			modeCookie === "dark" || modeCookie === "light" ? modeCookie : null;

		return { theme, mode };
	},
);
