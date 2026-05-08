import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		environment: "jsdom",
		globals: true,
		include: ["src/**/*.{test,spec}.{js,ts}"],
		setupFiles: ["./vitest.setup.ts"],
		coverage: {
			provider: "v8",
			reporter: ["text", "html"],
			include: ["src/lib/**/*.ts"],
			exclude: [
				"src/**/*.test.ts",
				"src/**/*.spec.ts",
				"src/app.d.ts",
				"src/lib/types.ts",
			],
			thresholds: {
				branches: 80,
				functions: 70,
				lines: 90,
				statements: 90,
			},
		},
	},
	server: {
		port: 5173,
		strictPort: false,
	},
});
