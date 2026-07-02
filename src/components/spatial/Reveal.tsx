import { useEffect, useRef, useState } from "react";
import { cn } from "#/lib/utils";

// Motion-safe scroll reveal for HomeSpatial's post-hero sections (not the
// hero itself — that has its own scene-driven motion).
//
// SSR/no-JS/reduced-motion safety is the whole point: `hidden` starts (and
// stays, on the server and on first client paint) `false`, so the SSR HTML
// and the pre-hydration DOM always show the content fully visible — no
// `opacity-0` ever ships in server markup. Only after mount, and only when
// `prefers-reduced-motion` is NOT set, does the effect below opt the element
// into the hidden-then-reveal dance, driven by an IntersectionObserver
// (which also does the "is this already on screen" check for free via its
// first callback) rather than the reduced-motion CSS backstop.
export function Reveal({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const [hidden, setHidden] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;
		const reducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (reducedMotion) return;

		let revealed = false;
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (!entry) return;
				if (entry.isIntersecting) {
					setHidden(false);
					if (revealed) return;
					revealed = true;
					observer.unobserve(node);
				} else if (!revealed) {
					// The first callback fires immediately on observe(); if the
					// element isn't in view yet, this is what applies the hidden
					// state pre-reveal.
					setHidden(true);
				}
			},
			{ threshold: 0.15 },
		);
		observer.observe(node);
		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<div
			ref={ref}
			className={cn(
				"transition-all duration-[var(--duration-slow)] ease-[var(--ease-standard)]",
				hidden && "translate-y-4 opacity-0",
				className,
			)}
		>
			{children}
		</div>
	);
}
