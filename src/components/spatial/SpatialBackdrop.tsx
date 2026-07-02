// Static CSS "nebula" behind the page for the Spatial theme. Cheap, SSR-safe,
// and doubles as the reduced-motion aesthetic (no animation is applied here —
// this is the permanent fallback, not a placeholder for motion). Colors come
// from the dedicated --backdrop-glow-1/2/3 tokens (violet/indigo hues, tuned
// per mode in tokens.css) rather than hard-coded hex, matching the pattern in
// GradientBackdrop (bento) and GridBackdrop (terminal).
export function SpatialBackdrop() {
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
		>
			<div
				className="absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full blur-3xl"
				style={{
					background:
						"radial-gradient(circle, var(--backdrop-glow-1) 0%, transparent 70%)",
				}}
			/>
			<div
				className="absolute -right-32 top-1/4 h-[30rem] w-[30rem] rounded-full blur-3xl"
				style={{
					background:
						"radial-gradient(circle, var(--backdrop-glow-2) 0%, transparent 70%)",
				}}
			/>
			<div
				className="absolute -bottom-40 left-1/4 h-[32rem] w-[32rem] rounded-full blur-3xl"
				style={{
					background:
						"radial-gradient(circle, var(--backdrop-glow-3) 0%, transparent 70%)",
				}}
			/>
			{/* Vignette to keep the edges of the viewport calm and focus depth toward center */}
			<div
				className="absolute inset-0"
				style={{
					background:
						"radial-gradient(ellipse at center, transparent 40%, var(--background) 100%)",
				}}
			/>
		</div>
	);
}
