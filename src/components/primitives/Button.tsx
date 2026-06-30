import { cn } from "#/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const BASE_CLASSES =
	"inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
	primary: "bg-accent text-accent-foreground hover:opacity-90",
	secondary:
		"border border-border bg-surface text-foreground hover:bg-surface-raised",
	outline: "border border-border text-foreground hover:bg-surface-raised",
	ghost: "text-foreground hover:bg-surface-raised",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
	sm: "h-8 px-3 text-sm",
	md: "h-10 px-4 text-sm",
	lg: "h-12 px-6 text-base",
};

export function buttonClasses(opts?: {
	variant?: ButtonVariant;
	size?: ButtonSize;
	className?: string;
}): string {
	return cn(
		BASE_CLASSES,
		SIZE_CLASSES[opts?.size ?? "md"],
		VARIANT_CLASSES[opts?.variant ?? "primary"],
		opts?.className,
	);
}

type ButtonProps = {
	variant?: ButtonVariant;
	size?: ButtonSize;
} & React.ComponentProps<"button">;

export function Button({
	variant = "primary",
	size = "md",
	className,
	type = "button",
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			className={buttonClasses({ variant, size, className })}
			{...props}
		/>
	);
}
