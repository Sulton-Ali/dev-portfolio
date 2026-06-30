export interface SeoOptions {
	title?: string;
	description?: string;
	image?: string;
	url?: string;
	keywords?: string;
}

export function seo(options: SeoOptions): {
	meta: Array<Record<string, string>>;
} {
	const { title, description, image, url, keywords } = options;
	const meta: Array<Record<string, string>> = [];

	if (title !== undefined) {
		meta.push({ title });
	}
	if (description !== undefined) {
		meta.push({ name: "description", content: description });
	}
	if (keywords !== undefined) {
		meta.push({ name: "keywords", content: keywords });
	}

	// Open Graph
	if (title !== undefined) {
		meta.push({ property: "og:title", content: title });
	}
	if (description !== undefined) {
		meta.push({ property: "og:description", content: description });
	}
	if (image !== undefined) {
		meta.push({ property: "og:image", content: image });
	}
	if (url !== undefined) {
		meta.push({ property: "og:url", content: url });
	}
	meta.push({ property: "og:type", content: "website" });

	// Twitter
	meta.push({ name: "twitter:card", content: "summary_large_image" });
	if (title !== undefined) {
		meta.push({ name: "twitter:title", content: title });
	}
	if (description !== undefined) {
		meta.push({ name: "twitter:description", content: description });
	}
	if (image !== undefined) {
		meta.push({ name: "twitter:image", content: image });
	}

	return { meta };
}
