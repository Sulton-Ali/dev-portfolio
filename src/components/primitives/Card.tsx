import { cn } from "#/lib/utils";

type CardProps = { interactive?: boolean } & React.ComponentProps<"div">;

export function Card({ interactive = false, className, ...props }: CardProps) {
	return (
		<div
			className={cn(
				"rounded-xl border border-border bg-surface",
				interactive &&
					"transition-all duration-[var(--duration-normal)] hover:bg-surface-raised hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]",
				className,
			)}
			{...props}
		/>
	);
}
