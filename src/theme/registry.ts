export const THEMES = [
	{ id: "bento", label: "Bento", available: true },
	{ id: "terminal", label: "Terminal", available: false },
	{ id: "spatial", label: "Spatial", available: false },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];
export type Mode = "system" | "dark" | "light"; // UI-level
export const DEFAULT_THEME: ThemeId = "bento";
export const THEME_COOKIE = "theme";
export const MODE_COOKIE = "mode";

export function isThemeId(v: unknown): v is ThemeId {
	return THEMES.some((t) => t.id === v);
}

export function isAvailableTheme(id: ThemeId): boolean {
	return THEMES.some((t) => t.id === id && t.available);
}
