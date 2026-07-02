import { cn } from "#/lib/utils";

type BadgeVariant = "default" | "accent" | "outline";

type BadgeProps = { variant?: BadgeVariant } & React.ComponentProps<"span">;

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
	default: "border border-border bg-surface text-muted",
	accent: "bg-accent-muted text-accent-text",
	outline: "border border-border text-foreground",
};

export function Badge({
	variant = "default",
	className,
	...props
}: BadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
				VARIANT_CLASSES[variant],
				className,
			)}
			{...props}
		/>
	);
}
