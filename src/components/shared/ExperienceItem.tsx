import { Badge, ExternalLink, Text } from "#/components/primitives";
import type { Experience } from "#/content";
import { formatDateRange } from "#/lib/utils";

type ExperienceItemProps = { item: Experience };

export function ExperienceItem({ item }: ExperienceItemProps) {
	return (
		<div className="relative border-l border-border pl-6">
			<span className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-accent" />
			<div className="flex flex-wrap items-baseline gap-x-2">
				<span className="font-medium text-foreground">{item.role}</span>
				{item.companyUrl ? (
					<ExternalLink href={item.companyUrl} className="text-muted">
						{item.company}
					</ExternalLink>
				) : (
					<span className="text-muted">{item.company}</span>
				)}
			</div>
			<div className="mt-0.5 flex flex-wrap gap-x-2 text-sm text-muted">
				<span>{formatDateRange(item.start, item.end)}</span>
				{item.location && <span>{item.location}</span>}
			</div>
			<Text variant="muted" className="mt-2">
				{item.summary}
			</Text>
			{item.highlights.length > 0 && (
				<ul className="mt-2 list-disc pl-5">
					{item.highlights.map((highlight) => (
						<li key={highlight} className="text-sm text-muted">
							{highlight}
						</li>
					))}
				</ul>
			)}
			{item.stack.length > 0 && (
				<div className="mt-3 flex flex-wrap gap-1.5">
					{item.stack.map((tech) => (
						<Badge key={tech}>{tech}</Badge>
					))}
				</div>
			)}
		</div>
	);
}
