import { createFileRoute } from "@tanstack/react-router";
import { absoluteUrl } from "#/lib/site";

// Public, indexable routes. Keep in sync when adding pages.
const ROUTES = ["/", "/about", "/work", "/contact"] as const;

export const Route = createFileRoute("/sitemap.xml")({
	server: {
		handlers: {
			GET: () => {
				const lastmod = new Date().toISOString();
				const urls = ROUTES.map(
					(path) => `  <url>
    <loc>${absoluteUrl(path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${path === "/" ? "1.0" : "0.7"}</priority>
  </url>`,
				).join("\n");

				const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

				return new Response(xml, {
					headers: { "Content-Type": "application/xml; charset=utf-8" },
				});
			},
		},
	},
});
