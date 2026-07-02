import { lazy, Suspense, useEffect, useRef, useState } from "react";

const HeroScene = lazy(() => import("#/components/spatial/HeroScene"));

// Client-only, motion-safe gate for the Spatial hero's 3D scene. Rendered
// inside HeroFallback's `data-slot="scene"` div. Renders nothing during SSR
// and first paint (avoids hydration mismatches and guarantees the static
// fallback hero is what search engines / no-JS visitors see), nothing under
// `prefers-reduced-motion: reduce` (the static hero is the permanent
// experience there, per docs/03-themes.md), and pauses (fully unmounts) the
// Canvas whenever the hero scrolls out of view.
export function SceneMount() {
	const [mounted, setMounted] = useState(false);
	const [reducedMotion, setReducedMotion] = useState(true);
	const [visible, setVisible] = useState(false);
	const [ready, setReady] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	// Mount gate + live reduced-motion tracking.
	useEffect(() => {
		setMounted(true);
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReducedMotion(mq.matches);
		function onChange(event: MediaQueryListEvent) {
			setReducedMotion(event.matches);
		}
		mq.addEventListener("change", onChange);
		return () => {
			mq.removeEventListener("change", onChange);
		};
	}, []);

	const active = mounted && !reducedMotion;

	// Fade the scene in once it's allowed to mount. The container starts at
	// opacity 0 and the rAF flip to `ready` triggers the CSS transition.
	useEffect(() => {
		if (!active) {
			setReady(false);
			return;
		}
		const id = requestAnimationFrame(() => setReady(true));
		return () => cancelAnimationFrame(id);
	}, [active]);

	// Pause (unmount) the Canvas when the hero scrolls off-screen. Runs once
	// the container div actually exists in the DOM (i.e. once `active` is
	// true), since refs only attach once the element renders.
	useEffect(() => {
		if (!active) return;
		const node = containerRef.current;
		if (!node) return;
		const observer = new IntersectionObserver(
			(entries) => {
				setVisible(entries[0]?.isIntersecting ?? false);
			},
			{ threshold: 0 },
		);
		observer.observe(node);
		return () => {
			observer.disconnect();
		};
	}, [active]);

	if (!active) return null;

	return (
		<div
			ref={containerRef}
			aria-hidden="true"
			className="absolute inset-0 transition-opacity duration-700 ease-out"
			style={{ opacity: ready ? 1 : 0 }}
		>
			{visible && (
				<Suspense fallback={null}>
					<HeroScene />
				</Suspense>
			)}
		</div>
	);
}
