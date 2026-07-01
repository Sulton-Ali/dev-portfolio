import { createFileRoute } from "@tanstack/react-router";
import { GlassCard } from "#/components/bento";
import {
	buttonClasses,
	Container,
	Heading,
	Link,
	Section,
	Text,
} from "#/components/primitives";
import { ExperienceItem, SkillList } from "#/components/shared";
import { experience, profile, skills } from "#/content";
import { seo } from "#/lib/seo";

export const Route = createFileRoute("/about")({
	head: () =>
		seo({
			title: "About",
			description:
				"About Sultonali Jalolov — 5+ years of React across fintech and govtech (Davr Bank, Digital Transport Center, Anorbank), plus my frontend and backend skills.",
			path: "/about",
		}),
	component: AboutPage,
});

function AboutPage() {
	return (
		<Container className="py-8 sm:py-12">
			<Section>
				<Heading level={1}>About</Heading>
				<div className="mt-6 flex max-w-[65ch] flex-col gap-4">
					{profile.bio.map((paragraph) => (
						<Text key={paragraph} variant="muted">
							{paragraph}
						</Text>
					))}
				</div>
			</Section>

			<Section className="pt-0">
				<Heading level={2}>Experience</Heading>
				<GlassCard className="mt-6 p-6">
					<div className="flex flex-col gap-8">
						{experience.map((item) => (
							<ExperienceItem
								key={`${item.company}-${item.start}`}
								item={item}
							/>
						))}
					</div>
				</GlassCard>
			</Section>

			<Section className="pt-0">
				<Heading level={2}>Skills</Heading>
				<GlassCard className="mt-6 p-6">
					<SkillList groups={skills} />
				</GlassCard>
			</Section>

			<Section className="pt-0">
				<Text variant="muted">Interested in working together?</Text>
				<Link
					to="/contact"
					className={buttonClasses({ variant: "primary", className: "mt-4" })}
				>
					Let&apos;s work together
				</Link>
			</Section>
		</Container>
	);
}
