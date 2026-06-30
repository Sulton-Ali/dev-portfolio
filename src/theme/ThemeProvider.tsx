import { createContext, useContext, useEffect, useState } from "react";
import { type Mode, THEMES, type ThemeId } from "#/theme/registry";
import { writeModeCookie, writeThemeCookie } from "#/theme/theme-cookie";

type ThemeContextValue = {
	theme: ThemeId;
	mode: Mode;
	resolvedMode: "dark" | "light";
	setTheme: (t: ThemeId) => void;
	setMode: (m: Mode) => void;
	themes: typeof THEMES;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
	initialTheme,
	initialMode,
	children,
}: {
	initialTheme: ThemeId;
	initialMode: "dark" | "light" | null;
	children: React.ReactNode;
}) {
	const [theme, setThemeState] = useState<ThemeId>(initialTheme);
	const [mode, setModeState] = useState<Mode>(initialMode ?? "system");
	const [systemMode, setSystemMode] = useState<"dark" | "light">("dark");

	useEffect(() => {
		if (typeof window === "undefined") return;
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		setSystemMode(mq.matches ? "dark" : "light");
		const onChange = (e: MediaQueryListEvent) => {
			setSystemMode(e.matches ? "dark" : "light");
		};
		mq.addEventListener("change", onChange);
		return () => {
			mq.removeEventListener("change", onChange);
		};
	}, []);

	const resolvedMode: "dark" | "light" = mode === "system" ? systemMode : mode;

	function setTheme(t: ThemeId): void {
		setThemeState(t);
		writeThemeCookie(t);
		if (typeof document !== "undefined") {
			document.documentElement.dataset.theme = t;
		}
	}

	function setMode(m: Mode): void {
		setModeState(m);
		writeModeCookie(m);
		if (typeof document === "undefined") return;
		if (m === "system") {
			document.documentElement.removeAttribute("data-mode");
		} else {
			document.documentElement.dataset.mode = m;
		}
	}

	return (
		<ThemeContext.Provider
			value={{
				theme,
				mode,
				resolvedMode,
				setTheme,
				setMode,
				themes: THEMES,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme(): ThemeContextValue {
	const ctx = useContext(ThemeContext);
	if (!ctx) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return ctx;
}
