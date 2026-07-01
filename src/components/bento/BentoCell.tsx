import { GlassCard } from "#/components/bento/GlassCard";
import { cn } from "#/lib/utils";

export type BentoCellSize = "sm" | "md" | "lg" | "wide" | "tall";

type BentoCellProps = {
	size?: BentoCellSize;
	interactive?: boolean;
} & React.ComponentProps<"div">;

const SIZE_CLASSES: Record<BentoCellSize, string> = {
	sm: "col-span-1 row-span-1",
	md: "sm:col-span-2 row-span-1",
	lg: "sm:col-span-2 lg:col-span-2 row-span-2",
	wide: "sm:col-span-2 lg:col-span-4 row-span-1",
	tall: "col-span-1 row-span-2",
};

export function BentoCell({
	size = "md",
	interactive = true,
	className,
	...props
}: BentoCellProps) {
	return (
		<GlassCard
			interactive={interactive}
			className={cn(SIZE_CLASSES[size], "p-6", className)}
			{...props}
		/>
	);
}
