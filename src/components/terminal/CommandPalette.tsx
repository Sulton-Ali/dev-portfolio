import { useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { profile, socials } from "#/content";
import { useTheme } from "#/theme/ThemeProvider";

type Command = {
	id: string;
	label: string;
	run: () => void;
};

// Terminal-theme command palette (Cmd/Ctrl+K). Default export so it can be
// React.lazy'd by CommandPaletteMount and kept out of non-Terminal bundles.
export default function CommandPalette() {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [highlighted, setHighlighted] = useState(0);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const previouslyFocused = useRef<HTMLElement | null>(null);
	const navigate = useNavigate();
	const { setTheme, setMode, resolvedMode } = useTheme();

	const commands = useMemo<Command[]>(() => {
		const nav = (to: string): Command["run"] => {
			return () => {
				navigate({ to });
			};
		};

		const list: Command[] = [
			{ id: "nav-home", label: "Home", run: nav("/") },
			{ id: "nav-about", label: "About", run: nav("/about") },
			{ id: "nav-work", label: "Work", run: nav("/work") },
			{ id: "nav-contact", label: "Contact", run: nav("/contact") },
			{
				id: "copy-email",
				label: "Copy email",
				run: () => {
					void navigator.clipboard.writeText(profile.email);
				},
			},
			{
				id: "download-resume",
				label: "Download résumé",
				run: () => {
					window.open(profile.resumeUrl, "_blank");
				},
			},
			{
				id: "switch-bento",
				label: "Switch to Bento theme",
				run: () => {
					setTheme("bento");
				},
			},
			{
				id: "toggle-mode",
				label: "Toggle light/dark",
				run: () => {
					setMode(resolvedMode === "dark" ? "light" : "dark");
				},
			},
		];

		for (const social of socials) {
			if (social.url.startsWith("mailto:")) continue;
			list.push({
				id: `social-${social.platform}`,
				label: `Open ${social.platform}`,
				run: () => {
					window.open(social.url, "_blank");
				},
			});
		}

		return list;
	}, [navigate, setTheme, setMode, resolvedMode]);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return commands;
		return commands.filter((command) =>
			command.label.toLowerCase().includes(q),
		);
	}, [commands, query]);

	// Toggle open/closed on Cmd/Ctrl+K; close on Escape.
	useEffect(() => {
		function onKeyDown(e: KeyboardEvent) {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setOpen((prev) => !prev);
				return;
			}
			if (e.key === "Escape" && open) {
				setOpen(false);
			}
		}
		window.addEventListener("keydown", onKeyDown);
		return () => {
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [open]);

	// Reset filter/highlight and manage focus + body scroll when opening/closing.
	useEffect(() => {
		if (open) {
			previouslyFocused.current = document.activeElement as HTMLElement | null;
			setQuery("");
			setHighlighted(0);
			document.body.style.overflow = "hidden";
			inputRef.current?.focus();
		} else {
			document.body.style.overflow = "";
			previouslyFocused.current?.focus();
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	function runCommand(command: Command) {
		command.run();
		setOpen(false);
	}

	function onQueryChange(value: string) {
		setQuery(value);
		setHighlighted(0);
	}

	function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setHighlighted((prev) =>
				filtered.length === 0 ? 0 : (prev + 1) % filtered.length,
			);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setHighlighted((prev) =>
				filtered.length === 0
					? 0
					: (prev - 1 + filtered.length) % filtered.length,
			);
		} else if (e.key === "Enter") {
			e.preventDefault();
			const command = filtered[highlighted];
			if (command) runCommand(command);
		} else if (e.key === "Escape") {
			e.preventDefault();
			setOpen(false);
		}
	}

	if (!open) return null;

	const highlightedId =
		filtered.length > 0
			? `command-option-${filtered[highlighted]?.id}`
			: undefined;

	return (
		<>
			<button
				type="button"
				aria-label="Close command palette"
				onClick={() => setOpen(false)}
				className="fixed inset-0 z-50 cursor-default bg-background/70 backdrop-blur-sm"
			/>
			<div
				role="dialog"
				aria-modal="true"
				aria-label="Command palette"
				className="fixed inset-x-0 top-[15vh] z-50 mx-auto max-w-lg rounded-md border border-border bg-surface font-mono shadow-[var(--shadow-lg)]"
			>
				<div className="flex items-center gap-2 border-border border-b px-4 py-3">
					<span className="text-accent">&gt;</span>
					<input
						ref={inputRef}
						type="text"
						role="combobox"
						aria-expanded="true"
						aria-controls="command-palette-listbox"
						aria-activedescendant={highlightedId}
						value={query}
						onChange={(e) => onQueryChange(e.target.value)}
						onKeyDown={onInputKeyDown}
						placeholder="Type a command or search…"
						aria-label="Type a command or search"
						className="w-full bg-transparent text-foreground outline-none placeholder:text-subtle"
					/>
				</div>
				<div
					id="command-palette-listbox"
					role="listbox"
					aria-label="Commands"
					className="max-h-80 overflow-y-auto p-2"
				>
					{filtered.length === 0 ? (
						<div className="px-3 py-2 text-muted text-sm">
							No matching commands
						</div>
					) : (
						filtered.map((command, index) => (
							<div
								key={command.id}
								id={`command-option-${command.id}`}
								role="option"
								tabIndex={-1}
								aria-selected={index === highlighted}
								onMouseEnter={() => setHighlighted(index)}
								onClick={() => runCommand(command)}
								onKeyDown={(e) => {
									if (e.key === "Enter") runCommand(command);
								}}
								className={
									index === highlighted
										? "cursor-pointer rounded-md bg-accent-muted px-3 py-2 text-accent text-sm"
										: "cursor-pointer rounded-md px-3 py-2 text-foreground text-sm hover:bg-surface-raised"
								}
							>
								{command.label}
							</div>
						))
					)}
				</div>
			</div>
		</>
	);
}
