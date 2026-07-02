import { GradientBackdrop } from "#/components/bento";
import { SpatialBackdrop } from "#/components/spatial";
import { GridBackdrop } from "#/components/terminal";
import { useTheme } from "#/theme/ThemeProvider";

// Dispatches the decorative page backdrop by active theme. Reads the theme from
// context (seeded from the SSR cookie), so the correct backdrop renders on the
// server with no flash.
export function ThemeBackdrop() {
	const { theme } = useTheme();
	if (theme === "terminal") return <GridBackdrop />;
	if (theme === "spatial") return <SpatialBackdrop />;
	return <GradientBackdrop />;
}
