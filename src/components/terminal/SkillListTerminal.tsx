import type { Skill, SkillGroup } from "#/content";
import { cn } from "#/lib/utils";

type SkillListTerminalProps = {
	groups: SkillGroup[];
	className?: string;
};

type Section = {
	key: string;
	skills: Skill[];
};

// Buckets group categories into the top-level JSON keys we render:
// Frontend/Backend -> "dependencies", DevOps/Tools -> "devDependencies",
// anything else -> its own lowercased category key.
function bucketKey(category: string): string {
	if (category === "Frontend" || category === "Backend") return "dependencies";
	if (category === "DevOps" || category === "Tools") return "devDependencies";
	return category.toLowerCase();
}

function buildSections(groups: SkillGroup[]): Section[] {
	const sections: Section[] = [];
	for (const group of groups) {
		if (group.items.length === 0) continue;
		const key = bucketKey(group.category);
		const existing = sections.find((section) => section.key === key);
		if (existing) {
			existing.skills.push(...group.items);
		} else {
			sections.push({ key, skills: [...group.items] });
		}
	}
	return sections;
}

function Key({ children }: { children: string }) {
	return <span className="text-accent">"{children}"</span>;
}

function Val({ children, core }: { children: string; core: boolean }) {
	return (
		<span className={core ? "text-accent" : "text-muted"}>"{children}"</span>
	);
}

function Punct({ children }: { children: string }) {
	return <span className="text-subtle">{children}</span>;
}

function SkillLine({ skill, isLast }: { skill: Skill; isLast: boolean }) {
	return (
		<>
			{"    "}
			<Key>{skill.name}</Key>
			<Punct>: </Punct>
			<Val core={skill.level === "core"}>{skill.level ?? "latest"}</Val>
			{isLast ? null : <Punct>,</Punct>}
			{"\n"}
		</>
	);
}

function SectionBlock({
	section,
	isLast,
}: {
	section: Section;
	isLast: boolean;
}) {
	return (
		<>
			{"  "}
			<Key>{section.key}</Key>
			<Punct>: </Punct>
			<Punct>{"{"}</Punct>
			{"\n"}
			{section.skills.map((skill, i) => (
				<SkillLine
					key={skill.name}
					skill={skill}
					isLast={i === section.skills.length - 1}
				/>
			))}
			{"  "}
			<Punct>{"}"}</Punct>
			{isLast ? null : <Punct>,</Punct>}
			{"\n"}
		</>
	);
}

// Renders skill groups as a hand-rolled syntax-highlighted, monospaced
// package.json-style block (no highlighting library), matching the
// terminal theme's CodeBlock pattern.
export function SkillListTerminal({
	groups,
	className,
}: SkillListTerminalProps) {
	const sections = buildSections(groups);
	return (
		<div
			className={cn(
				"rounded-md border border-border bg-surface p-5 shadow-[var(--shadow-sm)] sm:p-6",
				className,
			)}
		>
			<div className="mb-4 flex items-center gap-1.5" aria-hidden="true">
				<span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
				<span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
				<span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
			</div>
			<pre className="overflow-x-auto font-mono text-sm leading-relaxed sm:text-base">
				<code>
					<Punct>{"{"}</Punct>
					{"\n"}
					{sections.map((section, i) => (
						<SectionBlock
							key={section.key}
							section={section}
							isLast={i === sections.length - 1}
						/>
					))}
					<Punct>{"}"}</Punct>
				</code>
			</pre>
		</div>
	);
}
