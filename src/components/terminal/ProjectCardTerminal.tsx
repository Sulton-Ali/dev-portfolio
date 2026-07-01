import { ExternalLink } from "#/components/primitives";
import type { Project } from "#/content";
import { profile } from "#/content";
import { cn } from "#/lib/utils";

type ProjectCardTerminalProps = { project: Project };

// Terminal-theme project entry, styled as a `git log` commit block:
// hand-rolled monospace coloring, no syntax-highlighting library.
export function ProjectCardTerminal({ project }: ProjectCardTerminalProps) {
	return (
		<div
			className={cn(
				"flex flex-col gap-2 border-l-2 pl-4 font-mono text-sm sm:text-base",
				project.featured ? "border-accent" : "border-border",
			)}
		>
			<div className="flex flex-col">
				<div>
					<span className="text-warning">commit</span>{" "}
					<span className="text-accent">{project.slug}</span>{" "}
					<span className="text-subtle">({project.year})</span>
				</div>
				<div>
					<span className="text-muted">Author:</span>{" "}
					<span className="text-foreground">{profile.name}</span>
				</div>
				<div>
					<span className="text-muted">Date:</span>{" "}
					<span className="text-foreground">{project.year}</span>
				</div>
			</div>
			<p className="font-semibold text-foreground">{project.title}</p>
			<p className="text-muted">{project.summary}</p>
			{project.stack.length > 0 && (
				<div className="flex flex-wrap gap-x-2 gap-y-1">
					{project.stack.map((tech) => (
						<span key={tech}>
							<span className="text-subtle">[</span>
							<span className="text-accent">{tech}</span>
							<span className="text-subtle">]</span>
						</span>
					))}
				</div>
			)}
			{project.links.length > 0 && (
				<div className="flex flex-col gap-1">
					{project.links.map((link) => (
						<ExternalLink
							key={link.url}
							href={link.url}
							className="text-accent underline"
						>
							{link.label}
						</ExternalLink>
					))}
				</div>
			)}
		</div>
	);
}
