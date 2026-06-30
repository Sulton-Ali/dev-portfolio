import { createFileRoute } from "@tanstack/react-router";
import { Container, Heading, Section, Text } from "#/components/primitives";

export const Route = createFileRoute("/work")({ component: WorkPage });

function WorkPage() {
	return (
		<Container>
			<Section>
				<Heading level={1}>Work</Heading>
				<Text variant="muted" className="mt-4">
					Coming soon.
				</Text>
			</Section>
		</Container>
	);
}
