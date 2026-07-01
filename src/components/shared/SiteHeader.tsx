import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Container, Link } from "#/components/primitives";
import { profile } from "#/content";
import { cn } from "#/lib/utils";
import { ThemeSwitcher } from "#/theme/ThemeSwitcher";

const linkClass = "text-muted hover:text-foreground";
const activeProps = { className: "text-foreground font-medium" };

// Nav links written out literally so TanStack's type-safe Link keeps checking
// each `to`. `onNavigate` lets the mobile menu close itself on selection.
function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
	return (
		<>
			<Link
				to="/"
				activeOptions={{ exact: true }}
				className={linkClass}
				activeProps={activeProps}
				onClick={onNavigate}
			>
				Home
			</Link>
			<Link
				to="/about"
				className={linkClass}
				activeProps={activeProps}
				onClick={onNavigate}
			>
				About
			</Link>
			<Link
				to="/work"
				className={linkClass}
				activeProps={activeProps}
				onClick={onNavigate}
			>
				Work
			</Link>
			<Link
				to="/contact"
				className={linkClass}
				activeProps={activeProps}
				onClick={onNavigate}
			>
				Contact
			</Link>
		</>
	);
}

export function SiteHeader() {
	const [menuOpen, setMenuOpen] = useState(false);

	// Close the mobile menu on Escape for keyboard users.
	useEffect(() => {
		if (!menuOpen) return;
		function onKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") setMenuOpen(false);
		}
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [menuOpen]);

	return (
		<header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
			<Container className="flex h-16 items-center justify-between gap-4">
				<Link
					to="/"
					className="shrink-0 truncate font-display text-lg font-semibold text-foreground"
					onClick={() => setMenuOpen(false)}
				>
					{profile.name}
				</Link>

				{/* Desktop nav */}
				<nav className="hidden items-center gap-4 text-sm sm:flex">
					<NavLinks />
					<ThemeSwitcher />
				</nav>

				{/* Mobile menu toggle */}
				<button
					type="button"
					className="flex items-center justify-center rounded-md p-2 text-foreground hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:hidden"
					aria-label={menuOpen ? "Close menu" : "Open menu"}
					aria-expanded={menuOpen}
					aria-controls="mobile-nav"
					onClick={() => setMenuOpen((open) => !open)}
				>
					{menuOpen ? (
						<X size={20} aria-hidden="true" />
					) : (
						<Menu size={20} aria-hidden="true" />
					)}
				</button>
			</Container>

			{/* Mobile nav panel */}
			<div
				id="mobile-nav"
				className={cn(
					"border-border border-t bg-background sm:hidden",
					menuOpen ? "block" : "hidden",
				)}
			>
				<Container className="flex flex-col gap-3 py-4 text-sm">
					<nav className="flex flex-col gap-3">
						<NavLinks onNavigate={() => setMenuOpen(false)} />
					</nav>
					<ThemeSwitcher />
				</Container>
			</div>
		</header>
	);
}
