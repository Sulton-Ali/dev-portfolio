import { createFileRoute } from "@tanstack/react-router";
import { Container, Heading, Section, Text } from "#/components/primitives";
import { ProjectCard } from "#/components/shared";
import { ProjectCardTerminal } from "#/components/terminal";
import { projects } from "#/content";
import { seo } from "#/lib/seo";
import { useTheme } from "#/theme/ThemeProvider";

export const Route = createFileRoute("/work")({
	head: () =>
		seo({
			title: "Work",
			description:
				"Selected projects by Sultonali Jalolov — scalable React CRM/admin panels built for fintech and government products.",
			path: "/work",
		}),
	component: WorkPage,
});

function WorkPage() {
	const { theme } = useTheme();
	const sortedProjects = [...projects].sort(
		(a, b) => Number(b.featured) - Number(a.featured),
	);

	return (
		<Container className="py-8 sm:py-12">
			<Section>
				<Heading level={1}>Work</Heading>
				<Text variant="muted" className="mt-4">
					Selected projects — a sample of what I&apos;ve built.
				</Text>
				{theme === "terminal" ? (
					<div className="mt-8 flex flex-col gap-6">
						{sortedProjects.map((project) => (
							<ProjectCardTerminal key={project.slug} project={project} />
						))}
					</div>
				) : (
					<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{sortedProjects.map((project) => (
							<ProjectCard
								key={project.slug}
								project={project}
								headingLevel={2}
							/>
						))}
					</div>
				)}
			</Section>
		</Container>
	);
}
