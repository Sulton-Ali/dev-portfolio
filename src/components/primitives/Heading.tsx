import { cn } from "#/lib/utils";

type HeadingProps = {
	level: 1 | 2 | 3 | 4;
	size?: 1 | 2 | 3 | 4;
} & React.ComponentProps<"h1">;

const HEADING_ELEMENTS = {
	1: "h1",
	2: "h2",
	3: "h3",
	4: "h4",
} as const;

const HEADING_CLASSES = {
	1: "font-display text-4xl font-bold tracking-tight sm:text-5xl text-foreground",
	2: "font-display text-3xl font-bold tracking-tight text-foreground",
	3: "font-display text-2xl font-semibold tracking-tight text-foreground",
	4: "font-display text-xl font-semibold text-foreground",
} as const;

export function Heading({ level, size, className, ...props }: HeadingProps) {
	const Tag = HEADING_ELEMENTS[level];
	return (
		<Tag className={cn(HEADING_CLASSES[size ?? level], className)} {...props} />
	);
}
