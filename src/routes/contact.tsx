import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy, Download, Mail } from "lucide-react";
import { useState } from "react";
import { GlassCard } from "#/components/bento";
import {
	Badge,
	Button,
	buttonClasses,
	Container,
	Heading,
	Text,
} from "#/components/primitives";
import { SocialLinks } from "#/components/shared";
import type { Profile } from "#/content";
import { profile, socials } from "#/content";
import { buildVCard } from "#/lib/vcard";

export const Route = createFileRoute("/contact")({ component: ContactPage });

const AVAILABILITY_BADGE: Record<
	Profile["availability"],
	{ variant: "default" | "accent" | "outline"; label: string }
> = {
	available: { variant: "accent", label: "Available for work" },
	open: { variant: "accent", label: "Open to opportunities" },
	unavailable: { variant: "default", label: "Not available" },
};

function ContactPage() {
	const [copied, setCopied] = useState(false);

	async function handleCopyEmail() {
		await navigator.clipboard.writeText(profile.email);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}

	function handleDownloadVCard() {
		const vcard = buildVCard(profile, socials);
		const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "contact.vcf";
		a.click();
		URL.revokeObjectURL(url);
	}

	const availabilityBadge = AVAILABILITY_BADGE[profile.availability];

	return (
		<Container className="py-8 sm:py-12">
			<Heading level={1}>Contact</Heading>
			<Text variant="muted" className="mt-4">
				Let's talk — the fastest way to reach me is email.
			</Text>

			<GlassCard className="mt-8 max-w-xl p-6 sm:p-8">
				<div className="flex items-center justify-between gap-4">
					<div className="flex items-center gap-2">
						<Mail size={20} aria-hidden="true" className="text-muted" />
						<Text as="span">{profile.email}</Text>
					</div>
					<Badge variant={availabilityBadge.variant}>
						{availabilityBadge.label}
					</Badge>
				</div>

				<div className="mt-6 flex flex-wrap items-center gap-3">
					<Button variant="secondary" onClick={handleCopyEmail}>
						{copied ? (
							<>
								<Check size={16} aria-hidden="true" />
								Copied
							</>
						) : (
							<>
								<Copy size={16} aria-hidden="true" />
								Copy email
							</>
						)}
					</Button>
					<a
						href={`mailto:${profile.email}`}
						className={buttonClasses({ variant: "outline" })}
					>
						<Mail size={16} aria-hidden="true" />
						Email me
					</a>
					<Button variant="secondary" onClick={handleDownloadVCard}>
						<Download size={16} aria-hidden="true" />
						Save contact (.vcf)
					</Button>
					<a
						href={profile.resumeUrl}
						download
						className={buttonClasses({ variant: "outline" })}
					>
						<Download size={16} aria-hidden="true" />
						Résumé
					</a>
				</div>

				<div className="mt-6 border-border border-t pt-6">
					<SocialLinks socials={socials} />
				</div>
			</GlassCard>
		</Container>
	);
}
