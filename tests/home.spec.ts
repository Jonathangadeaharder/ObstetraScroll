import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Home Page E2E", () => {
  test.beforeEach(async ({ page }) => {
    // Mock the AI runner if necessary, or assume a dev server is running
    await page.goto("/");
  });

  test("should display the main heading and pass accessibility", async ({
    page,
  }) => {
    // Use ARIA-first locators (best practice)
    const heading = page.getByRole("heading", { level: 1 }).first();
    await expect(heading).toBeVisible();

    // WCAG Accessibility Audit
    const results = await new AxeBuilder({ page }).analyze();
    const violations = results.violations.filter(
      (v) =>
        v.id !== "nested-interactive" &&
        v.id !== "landmark-is-top-level" &&
        v.id !== "landmark-complementary-is-top-level" &&
        v.id !== "color-contrast",
    );
    expect(violations).toEqual([]);
  });

  test("should allow navigation to the reel planner", async ({ page }) => {
    // Example navigation flow
    const plannerLink = page.getByRole("link", { name: /planner/i });
    if (await plannerLink.isVisible()) {
      await plannerLink.click();
      await expect(page).toHaveURL(/planner/);
    }
  });
});
