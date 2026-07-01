import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "#/components/shared/NotFound";

// Catch-all route: any URL that matches no other route renders the on-theme
// NotFound page through the app shell (header/footer).
// NOTE (M5/SEO follow-up): this responds 200; wire a real 404 status via the
// SSR response once server-only code can be kept out of the client bundle.
export const Route = createFileRoute("/$")({
	component: NotFound,
});
