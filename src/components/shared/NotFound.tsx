import {
	buttonClasses,
	Container,
	Heading,
	Link,
	Text,
} from "#/components/primitives";

export function NotFound() {
	return (
		<Container className="py-24 sm:py-32">
			<div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
				<span className="font-display text-6xl font-bold text-accent">404</span>
				<Heading level={2}>Page not found</Heading>
				<Text variant="muted">
					The page you're looking for doesn't exist or has moved.
				</Text>
				<Link to="/" className={buttonClasses({ variant: "primary" })}>
					Back home
				</Link>
			</div>
		</Container>
	);
}
