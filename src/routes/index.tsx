import { createFileRoute } from "@tanstack/react-router";
import { HomeBento } from "#/components/bento";
import { HomeTerminal } from "#/components/terminal";
import { seo } from "#/lib/seo";
import { useTheme } from "#/theme/ThemeProvider";

export const Route = createFileRoute("/")({
	head: () => seo({ path: "/" }),
	component: Home,
});

function Home() {
	const { theme } = useTheme();
	return theme === "terminal" ? <HomeTerminal /> : <HomeBento />;
}
