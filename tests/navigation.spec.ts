import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/projects/",
  "/projects/go-game/",
  "/projects/chemistry-equation-balancer/",
  "/demos/go-game/",
  "/demos/chemistry-equation-balancer/",
  "/this-page-does-not-exist/",
] as const;

const viewportWidths = [320, 375, 768, 1024, 1440] as const;

test("primary navigation reaches projects and home-page sections", async ({
  page,
}) => {
  await page.goto("/");

  const projectsLink = page
    .getByRole("navigation")
    .getByRole("link", { name: "Projects" });
  await expect(projectsLink).toHaveAttribute("href", /\/projects\/?$/);
  await projectsLink.click();
  await expect(page).toHaveURL(/\/projects\/?$/);

  await page
    .getByRole("navigation")
    .getByRole("link", { name: "About" })
    .click();
  await expect(page).toHaveURL(/\/#about$/);
  await expect(page.locator("#about")).toBeVisible();

  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Contact" })
    .click();
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(page.locator("#contact")).toBeVisible();
});

test("unknown routes render the custom 404 page", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist/");

  expect(response?.status()).toBe(404);
  await expect(page.getByText(/404 \/ page not found/i)).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /home/i }).first(),
  ).toHaveAttribute("href", "/");
  await expect(
    page.getByRole("link", { name: /projects/i }).first(),
  ).toHaveAttribute("href", "/projects/");
});

test("pages do not overflow at supported viewport widths", async ({ page }) => {
  for (const width of viewportWidths) {
    await page.setViewportSize({ width, height: 900 });

    for (const route of routes) {
      await page.goto(route);
      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));

      expect(
        dimensions.scrollWidth,
        `${route} overflows at ${width}px`,
      ).toBeLessThanOrEqual(dimensions.clientWidth);
    }
  }
});
