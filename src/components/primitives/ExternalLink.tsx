import { cn } from "#/lib/utils";

type ExternalLinkProps = { href: string } & Omit<
	React.ComponentProps<"a">,
	"href"
>;

export function ExternalLink({ href, className, ...props }: ExternalLinkProps) {
	const isExternal = /^https?:/.test(href);
	return (
		<a
			href={href}
			className={cn(
				"text-foreground transition-colors hover:text-accent",
				className,
			)}
			{...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
			{...props}
		/>
	);
}
