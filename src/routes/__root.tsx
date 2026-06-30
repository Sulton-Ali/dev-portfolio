import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { ThemeProvider } from "#/theme/ThemeProvider";
import { ThemeSwitcher } from "#/theme/ThemeSwitcher";
import { getThemePreferences } from "#/theme/theme-server";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	loader: () => getThemePreferences(),
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
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
					<div className="fixed right-4 top-4 z-50">
						<ThemeSwitcher />
					</div>
					{children}
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
