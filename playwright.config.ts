import { defineConfig, devices } from "@playwright/test";

const port = process.env.PLAYWRIGHT_PORT ?? "5173";
const baseURL = `http://localhost:${port}`;

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: "line",
	use: {
		baseURL,
		trace: "on-first-retry",
	},
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
	],
	webServer: {
		command: `pnpm run dev -- --host 127.0.0.1 --port ${port} --strictPort`,
		url: baseURL,
		reuseExistingServer: !process.env.CI,
		stdout: "ignore",
		stderr: "pipe",
	},
});
