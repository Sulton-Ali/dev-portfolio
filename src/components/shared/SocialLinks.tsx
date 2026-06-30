import type { LucideIcon } from "lucide-react";
import { Github, Globe, Linkedin, Mail, Send, Twitter } from "lucide-react";
import { ExternalLink } from "#/components/primitives";
import type { Social } from "#/content";
import { cn } from "#/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
	github: Github,
	linkedin: Linkedin,
	mail: Mail,
	twitter: Twitter,
	x: Twitter,
	telegram: Send,
	globe: Globe,
	website: Globe,
};

type SocialLinksProps = { socials: Social[]; className?: string };

export function SocialLinks({ socials, className }: SocialLinksProps) {
	return (
		<div className={cn("flex items-center gap-3", className)}>
			{socials.map((social) => {
				const Icon = ICON_MAP[social.icon] ?? Globe;
				return (
					<ExternalLink
						key={social.url}
						href={social.url}
						aria-label={social.platform}
					>
						<Icon size={20} aria-hidden="true" />
					</ExternalLink>
				);
			})}
		</div>
	);
}
