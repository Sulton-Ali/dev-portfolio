import { BentoCell } from "#/components/bento/BentoCell";
import { BentoGrid } from "#/components/bento/BentoGrid";
import { LocalTimeWidget } from "#/components/bento/LocalTimeWidget";
import { StatCard } from "#/components/bento/StatCard";
import {
	Badge,
	buttonClasses,
	Container,
	Heading,
	Link,
	Text,
} from "#/components/primitives";
import {
	Avatar,
	ProjectCard,
	SkillList,
	SocialLinks,
} from "#/components/shared";
import type { Profile } from "#/content";
import { profile, projects, skills, socials } from "#/content";

const AVAILABILITY_BADGE: Record<
	Profile["availability"],
	{ label: string; variant: "default" | "accent" }
> = {
	available: { label: "Available for work", variant: "accent" },
	open: { label: "Open to opportunities", variant: "accent" },
	unavailable: { label: "Not available", variant: "default" },
};

export function HomeBento() {
	const availability = AVAILABILITY_BADGE[profile.availability];
	const featuredProjects = projects.filter((project) => project.featured);

	return (
		<Container className="py-8 sm:py-12">
			<BentoGrid>
				<BentoCell size="lg" className="flex flex-col justify-center gap-4">
					<Avatar
						src={profile.avatarUrl}
						name={profile.name}
						className="h-16 w-16 text-lg"
					/>
					<div className="flex flex-col gap-2">
						<Heading level={1}>{profile.name}</Heading>
						<Text variant="muted">{profile.role}</Text>
					</div>
					<Badge variant={availability.variant}>{availability.label}</Badge>
				</BentoCell>

				<BentoCell size="md" className="flex items-center justify-around gap-4">
					<StatCard
						value={`${profile.yearsCommercial}+`}
						label="yrs commercial"
					/>
					<StatCard
						value={`${profile.yearsProgramming}+`}
						label="yrs programming"
					/>
					<StatCard value={`${projects.length}`} label="projects" />
				</BentoCell>

				<BentoCell size="md" className="flex flex-col gap-3">
					<Heading level={4}>Stack</Heading>
					<SkillList groups={skills} />
				</BentoCell>

				<BentoCell size="wide" className="flex flex-col justify-center gap-4">
					<Text variant="default" className="text-lg sm:text-xl">
						{profile.tagline}
					</Text>
					<div className="flex flex-wrap gap-3">
						<Link to="/work" className={buttonClasses({ variant: "primary" })}>
							View Work
						</Link>
						<Link
							to="/contact"
							className={buttonClasses({ variant: "secondary" })}
						>
							Contact
						</Link>
					</div>
				</BentoCell>

				<BentoCell size="wide" className="flex flex-col gap-4">
					<Heading level={4}>Featured</Heading>
					{featuredProjects.length === 1 ? (
						<ProjectCard project={featuredProjects[0]} />
					) : (
						<div className="grid gap-4 sm:grid-cols-2">
							{featuredProjects.map((project) => (
								<ProjectCard key={project.slug} project={project} />
							))}
						</div>
					)}
				</BentoCell>

				<BentoCell size="sm">
					<LocalTimeWidget
						timezone={profile.timezone}
						location={profile.location}
					/>
				</BentoCell>

				<BentoCell size="sm" className="flex flex-col justify-center gap-4">
					<SocialLinks socials={socials} />
					<a
						href={profile.resumeUrl}
						className={buttonClasses({ variant: "outline", size: "sm" })}
					>
						Résumé
					</a>
				</BentoCell>
			</BentoGrid>
		</Container>
	);
}
