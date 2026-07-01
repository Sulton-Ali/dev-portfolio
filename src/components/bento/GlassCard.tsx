import { cn } from "#/lib/utils";

type GlassCardProps = { interactive?: boolean } & React.ComponentProps<"div">;

export function GlassCard({
	interactive = false,
	className,
	...props
}: GlassCardProps) {
	return (
		<div
			className={cn(
				"rounded-xl border border-border bg-surface backdrop-blur-[var(--blur-glass)] shadow-[var(--shadow-sm)]",
				interactive &&
					"transition-all duration-[var(--duration-normal)] hover:-translate-y-0.5 hover:bg-surface-raised hover:shadow-[var(--shadow-md)]",
				className,
			)}
			{...props}
		/>
	);
}
