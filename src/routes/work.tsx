import { createFileRoute } from "@tanstack/react-router";
import { Container, Heading, Section, Text } from "#/components/primitives";
import { ProjectCard } from "#/components/shared";
import { projects } from "#/content";
import { seo } from "#/lib/seo";

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
				<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{sortedProjects.map((project) => (
						<ProjectCard key={project.slug} project={project} />
					))}
				</div>
			</Section>
		</Container>
	);
}
