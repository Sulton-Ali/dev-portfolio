import { createFileRoute, notFound } from "@tanstack/react-router";
import { NotFound } from "#/components/shared/NotFound";
import { SITE } from "#/lib/site";

// Catch-all route: any URL that matches no other route throws `notFound()`
// from the loader, which lets TanStack Start's SSR set a real HTTP 404 status
// and render the on-theme NotFound page (via `notFoundComponent` below)
// through the app shell. The `noindex` meta keeps this SEO-safe too.
export const Route = createFileRoute("/$")({
	loader: () => {
		throw notFound();
	},
	head: () => ({
		meta: [
			{ title: `Page not found — ${SITE.name}` },
			{ name: "robots", content: "noindex" },
		],
	}),
	notFoundComponent: NotFound,
});
