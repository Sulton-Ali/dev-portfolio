import { cn } from "#/lib/utils";

type PromptProps = {
	path?: string;
	command?: string;
	className?: string;
	children?: React.ReactNode;
};

// Shell-style section label, e.g. `~/about $ cat about.md`.
export function Prompt({
	path = "",
	command,
	className,
	children,
}: PromptProps) {
	return (
		<div className={cn("font-mono text-sm", className)}>
			<span className="text-accent">~{path}</span>{" "}
			<span className="text-muted">$</span>
			{command ? <span className="text-foreground"> {command}</span> : null}
			{children}
		</div>
	);
}
