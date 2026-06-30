import { Badge } from "#/components/primitives";
import type { SkillGroup } from "#/content";

type SkillListProps = { groups: SkillGroup[] };

export function SkillList({ groups }: SkillListProps) {
	const nonEmpty = groups.filter((g) => g.items.length > 0);
	return (
		<div className="flex flex-col gap-6">
			{nonEmpty.map((group) => (
				<div key={group.category}>
					<p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
						{group.category}
					</p>
					<div className="flex flex-wrap gap-2">
						{group.items.map((skill) => (
							<Badge
								key={skill.name}
								variant={skill.level === "core" ? "accent" : "default"}
							>
								{skill.name}
							</Badge>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
