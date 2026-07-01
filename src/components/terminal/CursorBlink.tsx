import { cn } from "#/lib/utils";

// Blinking block cursor for the Terminal theme. Uses `motion-safe:` so it
// stays solid (no animation) under `prefers-reduced-motion: reduce`.
export function CursorBlink({ className }: { className?: string }) {
	return (
		<span
			aria-hidden="true"
			className={cn(
				"inline-block h-[1.1em] w-[0.6em] translate-y-[0.15em] bg-accent motion-safe:animate-pulse",
				className,
			)}
		/>
	);
}
