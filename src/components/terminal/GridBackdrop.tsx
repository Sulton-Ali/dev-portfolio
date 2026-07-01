// Faint developer-console grid behind the page for the Terminal theme. Static
// (no animation), decorative, and token-driven (grid lines use the border
// token; the glow uses the accent token) so it adapts to dark/light.
export function GridBackdrop() {
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
		>
			<div
				className="absolute inset-0 opacity-50"
				style={{
					backgroundImage:
						"linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
					backgroundSize: "44px 44px",
				}}
			/>
			<div className="absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
		</div>
	);
}
