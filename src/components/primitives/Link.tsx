import { createLink } from "@tanstack/react-router";
import { cn } from "#/lib/utils";

const BaseLink = ({ className, ...props }: React.ComponentProps<"a">) => (
	<a
		className={cn(
			"text-foreground transition-colors hover:text-accent",
			className,
		)}
		{...props}
	/>
);

export const Link = createLink(BaseLink);
