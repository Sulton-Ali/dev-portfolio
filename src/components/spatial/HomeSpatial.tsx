import { Container, Heading } from "#/components/primitives";
import {
	ProjectCard,
	SkillList,
	SocialLinks,
	StatStrip,
} from "#/components/shared";
import { HeroFallback } from "#/components/spatial/HeroFallback";
import { profile, projects, skills, socials } from "#/content";

const stats = [
	{ value: `${profile.yearsCommercial}+`, label: "yrs commercial" },
	{ value: `${profile.yearsProgramming}+`, label: "yrs programming" },
	{ value: `${projects.length}`, label: "projects" },
];

const featuredProjects = projects.filter((project) => project.featured);

// Full Home page for the Spatial theme: the (currently static-fallback) hero
// followed by conventional sections built entirely from shared, token-driven
// components. M9b adds the 3D scene behind HeroFallback's `data-slot="scene"`
// layer; nothing else here changes.
export function HomeSpatial() {
	return (
		<Container className="py-8 sm:py-12">
			<HeroFallback />

			<section className="mt-16">
				<Heading level={2} size={4}>
					By the numbers
				</Heading>
				<div className="mt-6">
					<StatStrip stats={stats} />
				</div>
			</section>

			<section className="mt-16">
				<Heading level={2} size={4}>
					Stack
				</Heading>
				<div className="mt-6">
					<SkillList groups={skills} />
				</div>
			</section>

			<section className="mt-16">
				<Heading level={2} size={4}>
					Featured
				</Heading>
				<div className="mt-6 grid gap-4 sm:grid-cols-2">
					{featuredProjects.map((project) => (
						<ProjectCard
							key={project.slug}
							project={project}
							headingLevel={3}
						/>
					))}
				</div>
			</section>

			<section className="mt-16">
				<Heading level={2} size={4}>
					Connect
				</Heading>
				<div className="mt-6 flex flex-wrap items-center gap-4">
					<SocialLinks socials={socials} />
					<a
						href={profile.resumeUrl}
						className="text-sm text-muted underline-offset-4 hover:text-foreground hover:underline"
					>
						Résumé
					</a>
				</div>
			</section>
		</Container>
	);
}
