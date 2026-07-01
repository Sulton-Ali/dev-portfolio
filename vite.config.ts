import netlify from "@netlify/vite-plugin-tanstack-start";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	// netlify() targets Netlify Functions for SSR/server routes/server functions
	// (replaces the generic nitro() node-server preset). See netlify.toml.
	plugins: [devtools(), tailwindcss(), tanstackStart(), netlify(), viteReact()],
});

export default config;
