import { createFileRoute } from "@tanstack/react-router";
import { Container, Heading, Section, Text } from "#/components/primitives";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
	return (
		<Container>
			<Section>
				<Heading level={1}>Contact</Heading>
				<Text variant="muted" className="mt-4">
					Coming soon.
				</Text>
			</Section>
		</Container>
	);
}
