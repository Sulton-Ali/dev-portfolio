import { ExternalLink as ExternalLinkIcon, Github, Globe } from "lucide-react";
import {
	Badge,
	Card,
	ExternalLink,
	Heading,
	Text,
} from "#/components/primitives";
import type { Project } from "#/content";
import { cn } from "#/lib/utils";

type ProjectCardProps = { project: Project };

export function ProjectCard({ project }: ProjectCardProps) {
	return (
		<Card
			interactive
			className={cn(
				"flex h-full flex-col gap-4 p-6",
				project.featured && "ring-1 ring-accent",
			)}
		>
			<div className="flex items-start justify-between gap-2">
				<Heading level={4}>{project.title}</Heading>
				<Badge>{String(project.year)}</Badge>
			</div>
			<Text variant="muted" className="flex-1">
				{project.summary}
			</Text>
			{project.stack.length > 0 && (
				<div className="flex flex-wrap gap-1.5">
					{project.stack.map((tech) => (
						<Badge key={tech}>{tech}</Badge>
					))}
				</div>
			)}
			{project.links.length > 0 && (
				<div className="flex flex-wrap gap-3">
					{project.links.map((link) => {
						const Icon =
							link.kind === "repo"
								? Github
								: link.kind === "live"
									? ExternalLinkIcon
									: Globe;
						return (
							<ExternalLink
								key={link.url}
								href={link.url}
								className="inline-flex items-center gap-1 text-sm"
							>
								<Icon size={14} aria-hidden="true" />
								{link.label}
							</ExternalLink>
						);
					})}
				</div>
			)}
		</Card>
	);
}
