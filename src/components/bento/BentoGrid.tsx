import { cn } from "#/lib/utils";

type BentoGridProps = React.ComponentProps<"div">;

export function BentoGrid({ className, ...props }: BentoGridProps) {
	return (
		<div
			className={cn(
				"grid auto-rows-[minmax(140px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
				className,
			)}
			{...props}
		/>
	);
}
