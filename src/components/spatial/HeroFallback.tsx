import {
	Badge,
	buttonClasses,
	Heading,
	Link,
	Text,
} from "#/components/primitives";
import type { Profile } from "#/content";
import { profile } from "#/content";

const AVAILABILITY_BADGE: Record<
	Profile["availability"],
	{ label: string; variant: "default" | "accent" }
> = {
	available: { label: "Available for work", variant: "accent" },
	open: { label: "Open to opportunities", variant: "accent" },
	unavailable: { label: "Not available", variant: "default" },
};

// Static hero content layer for the Spatial theme. Renders on the server and
// on first paint; this is also the permanent hero under prefers-reduced-motion.
// The empty `data-slot="scene"` div behind the content is where M9b mounts the
// lazy client-only React Three Fiber canvas — it stays empty and inert here.
export function HeroFallback() {
	const availability = AVAILABILITY_BADGE[profile.availability];

	return (
		<div className="relative isolate flex min-h-[28rem] flex-col items-start justify-center gap-6 overflow-hidden rounded-xl border border-border bg-surface px-6 py-16 sm:px-12">
			<div
				aria-hidden="true"
				data-slot="scene"
				className="pointer-events-none absolute inset-0 -z-10"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 -z-10"
				style={{
					background:
						"radial-gradient(ellipse 70% 60% at 30% 40%, var(--accent-muted), transparent 70%)",
				}}
			/>

			<Badge variant={availability.variant}>{availability.label}</Badge>

			<div className="flex flex-col gap-3">
				<Heading level={1}>{profile.name}</Heading>
				<Text variant="muted" className="text-lg sm:text-xl">
					{profile.role}
				</Text>
			</div>

			<Text variant="default" className="max-w-2xl text-lg">
				{profile.tagline}
			</Text>

			<div className="flex flex-wrap gap-3">
				<Link to="/work" className={buttonClasses({ variant: "primary" })}>
					View Work
				</Link>
				<Link to="/contact" className={buttonClasses({ variant: "secondary" })}>
					Contact
				</Link>
			</div>
		</div>
	);
}
