import { useEffect, useRef, useState } from "react";
import { cn } from "#/lib/utils";

type AvatarProps = {
	src?: string;
	name: string;
	className?: string;
};

function initials(name: string): string {
	const parts = name.replace(/[<>]/g, "").trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "?";
	const first = parts[0]?.[0] ?? "";
	const second = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
	return (first + second).toUpperCase();
}

// Circular avatar that degrades to the person's initials when the image is
// missing or fails to load (e.g. the placeholder /avatar.jpg before a real
// image is added), avoiding a broken-image glyph.
export function Avatar({ src, name, className }: AvatarProps) {
	const [failed, setFailed] = useState(false);
	const imgRef = useRef<HTMLImageElement>(null);
	const showImage = Boolean(src) && !failed;

	// The image may finish (and fail) before React hydrates and attaches the
	// onError handler during SSR, so re-check the broken state on mount.
	useEffect(() => {
		const el = imgRef.current;
		if (el?.complete && el.naturalWidth === 0) setFailed(true);
	}, []);

	return (
		<div
			className={cn(
				"flex items-center justify-center overflow-hidden rounded-full bg-accent-muted font-display font-semibold text-accent-text",
				className,
			)}
			title={name}
		>
			{showImage ? (
				<img
					ref={imgRef}
					src={src}
					alt={name}
					className="h-full w-full object-cover"
					onError={() => setFailed(true)}
				/>
			) : (
				<span role="img" aria-label={name}>
					{initials(name)}
				</span>
			)}
		</div>
	);
}
