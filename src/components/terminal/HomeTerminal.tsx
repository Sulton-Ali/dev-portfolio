import { buttonClasses, Container, Link } from "#/components/primitives";
import { ProjectCard, SocialLinks, StatStrip } from "#/components/shared";
import { CodeBlock } from "#/components/terminal/CodeBlock";
import { Prompt } from "#/components/terminal/Prompt";
import { profile, projects, socials } from "#/content";

const stats = [
	{ value: `${profile.yearsCommercial}+`, label: "yrs commercial" },
	{ value: `${profile.yearsProgramming}+`, label: "yrs programming" },
	{ value: `${projects.length}`, label: "projects" },
];

const featuredProjects = projects.filter((project) => project.featured);

export function HomeTerminal() {
	return (
		<Container className="py-8 sm:py-12">
			<section>
				{/* The hero is a code block, so the page h1 is visually hidden. */}
				<h1 className="sr-only">
					{profile.name} — {profile.role}
				</h1>
				<Prompt command="cat engineer.ts" />
				<div className="mt-3">
					<CodeBlock />
				</div>
				<div className="mt-4 flex flex-wrap gap-3">
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
			</section>

			<section className="mt-10">
				<Prompt path="/stats" />
				<div className="mt-4">
					<StatStrip stats={stats} />
				</div>
			</section>

			<section className="mt-10">
				<Prompt path="/featured" />
				<div className="mt-4 grid gap-4 sm:grid-cols-2">
					{featuredProjects.map((project) => (
						<ProjectCard key={project.slug} project={project} />
					))}
				</div>
			</section>

			<section className="mt-10">
				<Prompt path="/connect" />
				<div className="mt-4 flex flex-wrap items-center gap-4">
					<SocialLinks socials={socials} />
					<a
						href={profile.resumeUrl}
						className={buttonClasses({ variant: "outline", size: "sm" })}
					>
						résumé
					</a>
				</div>
			</section>
		</Container>
	);
}
