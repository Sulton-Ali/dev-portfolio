export function GradientBackdrop() {
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
		>
			<div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
			<div className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
			<div className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
		</div>
	);
}
