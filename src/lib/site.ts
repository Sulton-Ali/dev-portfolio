// Central site configuration. The production URL is env-overridable
// (VITE_SITE_URL) so canonical/OG/sitemap URLs are correct in every environment.
const DEFAULT_SITE_URL = "https://sjalolov.dev";

const RAW_URL =
	(import.meta.env.VITE_SITE_URL as string | undefined) ?? DEFAULT_SITE_URL;

// Trim trailing slashes so `${SITE.url}${path}` always composes cleanly.
const SITE_URL = RAW_URL.replace(/\/+$/, "");

export const SITE = {
	url: SITE_URL,
	name: "Sultonali Jalolov",
	title: "Sultonali Jalolov — Software Engineer",
	description:
		"Software Engineer with 5+ years building high-load React apps across fintech and govtech — React, TypeScript, Node.js, and Go.",
	ogImage: "/og.png",
	locale: "en_US",
} as const;

// Build an absolute URL for a site-relative path (for canonical/OG/sitemap).
export function absoluteUrl(path = "/"): string {
	return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
