import { Container, Text } from "#/components/primitives";
import { SocialLinks } from "#/components/shared/SocialLinks";
import { profile, socials } from "#/content";

export function SiteFooter() {
	return (
		<footer className="border-t border-border">
			<Container className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<Text variant="muted" className="text-sm">
						© {new Date().getFullYear()} {profile.name}
					</Text>
					<Text variant="muted" className="text-sm">
						{profile.role}
					</Text>
				</div>
				<SocialLinks socials={socials} />
			</Container>
		</footer>
	);
}
