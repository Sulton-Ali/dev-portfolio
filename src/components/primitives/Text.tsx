import { cn } from "#/lib/utils";

type TextVariant = "default" | "muted" | "subtle";
type TextAs = "p" | "span" | "div";

type TextProps = {
	variant?: TextVariant;
	as?: TextAs;
} & React.ComponentProps<"p">;

const VARIANT_CLASSES: Record<TextVariant, string> = {
	default: "text-foreground",
	muted: "text-muted",
	subtle: "text-subtle",
};

export function Text({
	variant = "default",
	as: Tag = "p",
	className,
	...props
}: TextProps) {
	return <Tag className={cn(VARIANT_CLASSES[variant], className)} {...props} />;
}
