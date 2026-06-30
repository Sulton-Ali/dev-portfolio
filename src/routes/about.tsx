import { createFileRoute } from "@tanstack/react-router";
import { Container, Heading, Section, Text } from "#/components/primitives";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
	return (
		<Container>
			<Section>
				<Heading level={1}>About</Heading>
				<Text variant="muted" className="mt-4">
					Coming soon.
				</Text>
			</Section>
		</Container>
	);
}
