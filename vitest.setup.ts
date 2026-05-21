import { vi } from "vitest";
import "@testing-library/jest-dom";

// NETWORK BAN: any fetch call instantly fails
globalThis.fetch = vi.fn(() => {
  throw new Error("Network Request Blocked: Unit test attempted HTTP call");
});

// Mock SvelteKit environment
vi.mock("$app/environment", () => ({
  browser: false,
  dev: true,
  prerender: false,
}));

vi.mock("$app/state", () => ({
  page: { data: {}, url: new URL("http://localhost:5173") },
}));
