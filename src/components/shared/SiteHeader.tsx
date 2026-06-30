import { Container, Link } from "#/components/primitives";
import { profile } from "#/content";
import { ThemeSwitcher } from "#/theme/ThemeSwitcher";

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
			<Container className="flex h-16 items-center justify-between gap-4">
				<Link
					to="/"
					className="font-display text-lg font-semibold text-foreground"
				>
					{profile.name}
				</Link>
				<nav className="flex items-center gap-1 text-sm sm:gap-4">
					<Link
						to="/"
						activeOptions={{ exact: true }}
						className="text-muted hover:text-foreground"
						activeProps={{ className: "text-foreground font-medium" }}
					>
						Home
					</Link>
					<Link
						to="/about"
						className="text-muted hover:text-foreground"
						activeProps={{ className: "text-foreground font-medium" }}
					>
						About
					</Link>
					<Link
						to="/work"
						className="text-muted hover:text-foreground"
						activeProps={{ className: "text-foreground font-medium" }}
					>
						Work
					</Link>
					<Link
						to="/contact"
						className="text-muted hover:text-foreground"
						activeProps={{ className: "text-foreground font-medium" }}
					>
						Contact
					</Link>
					<ThemeSwitcher />
				</nav>
			</Container>
		</header>
	);
}
