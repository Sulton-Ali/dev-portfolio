import { absoluteUrl, SITE } from "#/lib/site";

export interface SeoOptions {
	/** Page name, e.g. "About". Composed as "About — <site name>". Omit for home. */
	title?: string;
	description?: string;
	/** Site-relative route path, e.g. "/about" — drives canonical + og:url. */
	path?: string;
	/** OG image path or absolute URL. Defaults to the site OG image. */
	image?: string;
	keywords?: string;
}

type MetaTag = Record<string, string>;
type LinkTag = Record<string, string>;

// Produce the meta + link tags for a route's `head()`. Centralizes title
// composition, Open Graph / Twitter cards, and the canonical link.
export function seo(options: SeoOptions = {}): {
	meta: MetaTag[];
	links: LinkTag[];
} {
	const {
		title,
		description = SITE.description,
		path = "/",
		image = SITE.ogImage,
		keywords,
	} = options;

	const fullTitle = title ? `${title} — ${SITE.name}` : SITE.title;
	const canonical = absoluteUrl(path);
	const ogImage = /^https?:\/\//.test(image) ? image : absoluteUrl(image);

	const meta: MetaTag[] = [
		{ title: fullTitle },
		{ name: "description", content: description },
		...(keywords ? [{ name: "keywords", content: keywords }] : []),
		{ property: "og:title", content: fullTitle },
		{ property: "og:description", content: description },
		{ property: "og:image", content: ogImage },
		{ property: "og:url", content: canonical },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: SITE.name },
		{ property: "og:locale", content: SITE.locale },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:title", content: fullTitle },
		{ name: "twitter:description", content: description },
		{ name: "twitter:image", content: ogImage },
	];

	const links: LinkTag[] = [{ rel: "canonical", href: canonical }];

	return { meta, links };
}
