import { Monitor, Moon, Sun } from "lucide-react";

import type { Mode } from "#/theme/registry";
import { useTheme } from "#/theme/ThemeProvider";

// NOTE: temporary placement, moves to header in M3

const MODE_ORDER: Mode[] = ["system", "light", "dark"];

const MODE_META: Record<Mode, { Icon: typeof Monitor; label: string }> = {
	system: { Icon: Monitor, label: "System" },
	light: { Icon: Sun, label: "Light" },
	dark: { Icon: Moon, label: "Dark" },
};

export function ThemeSwitcher() {
	const { mode, setMode, theme, setTheme, themes } = useTheme();

	const { Icon, label } = MODE_META[mode];

	function cycleMode(): void {
		const idx = MODE_ORDER.indexOf(mode);
		const next = MODE_ORDER[(idx + 1) % MODE_ORDER.length];
		setMode(next);
	}

	return (
		<div className="flex items-center gap-2 rounded-lg border border-border bg-surface p-1 text-foreground">
			<button
				type="button"
				onClick={cycleMode}
				aria-label={`Color mode: ${label} (click to change)`}
				title={`Color mode: ${label}`}
				className="flex items-center justify-center rounded-md p-2 hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			>
				<Icon size={16} aria-hidden="true" />
			</button>
			<div className="flex items-center gap-1">
				{themes.map((t) => {
					const isActive = t.id === theme;
					return (
						<button
							key={t.id}
							type="button"
							disabled={!t.available}
							onClick={() => {
								setTheme(t.id);
							}}
							aria-pressed={isActive}
							title={t.available ? t.label : "Coming soon"}
							className={`rounded-md px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
								isActive
									? "bg-accent text-accent-foreground"
									: "hover:bg-surface-raised"
							} ${t.available ? "" : "cursor-not-allowed opacity-50"}`}
						>
							{t.label}
						</button>
					);
				})}
			</div>
		</div>
	);
}
