import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { SiteFooter, SiteHeader } from "#/components/shared";
import { ThemeBackdrop } from "#/components/ThemeBackdrop";
import { seo } from "#/lib/seo";
import { ThemeProvider } from "#/theme/ThemeProvider";
import { getThemePreferences } from "#/theme/theme-server";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	loader: () => getThemePreferences(),
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			// Dark is the base palette; matches the browser chrome to the app.
			{ name: "theme-color", content: "#0a0a0f" },
			// Site-wide defaults; per-route head() overrides title/description/canonical.
			...seo().meta,
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/favicon.ico" },
			{ rel: "apple-touch-icon", href: "/logo192.png" },
			{ rel: "manifest", href: "/manifest.json" },
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const { theme, mode } = Route.useLoaderData();
	return (
		<ThemeProvider initialTheme={theme} initialMode={mode}>
			<html lang="en" data-theme={theme} data-mode={mode ?? undefined}>
				<head>
					<HeadContent />
				</head>
				<body>
					<a
						href="#main"
						className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-foreground"
					>
						Skip to content
					</a>
					<ThemeBackdrop />
					<div className="flex min-h-screen flex-col">
						<SiteHeader />
						<main id="main" className="flex-1">
							{children}
						</main>
						<SiteFooter />
					</div>
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
					<Scripts />
				</body>
			</html>
		</ThemeProvider>
	);
}
