import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "#/components/shared/NotFound";
import { SITE } from "#/lib/site";

// Catch-all route: any URL that matches no other route renders the on-theme
// NotFound page through the app shell. The `noindex` meta below keeps this
// SEO-safe even where the response stays a soft-404 (see beforeLoad note).
export const Route = createFileRoute("/$")({
	beforeLoad: async () => {
		// Best-effort real 404 status on SSR. The `import.meta.env.SSR` guard lets
		// Vite strip this block — and the server-only import — from the client
		// bundle. NOTE: the Vite dev server keeps the response at 200 (headers
		// flush before this applies); whether the deployed server honors it
		// depends on the host. `noindex` (below) covers SEO regardless.
		if (import.meta.env.SSR) {
			const { setResponseStatus } = await import(
				"@tanstack/react-start/server"
			);
			setResponseStatus(404);
		}
	},
	head: () => ({
		meta: [
			{ title: `Page not found — ${SITE.name}` },
			{ name: "robots", content: "noindex" },
		],
	}),
	component: NotFound,
});
