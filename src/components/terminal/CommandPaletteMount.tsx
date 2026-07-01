import { lazy, Suspense } from "react";
import { useTheme } from "#/theme/ThemeProvider";

const LazyCommandPalette = lazy(
	() => import("#/components/terminal/CommandPalette"),
);

// Mounts the Terminal command palette only when the Terminal theme is active,
// so its code (and the global Cmd/Ctrl+K key listener) is never loaded or
// active outside Terminal.
export function CommandPaletteMount() {
	const { theme } = useTheme();
	if (theme !== "terminal") return null;
	return (
		<Suspense fallback={null}>
			<LazyCommandPalette />
		</Suspense>
	);
}
