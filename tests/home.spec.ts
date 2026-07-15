import { expect, test } from "@playwright/test";

const externalProfiles = [
  "https://github.com/KennyKe0706",
  "https://www.linkedin.com/in/zixuan-ke-50094a328/",
  "https://dmoj.ca/user/Kenny",
  "https://leetcode.com/u/kennyke/",
] as const;

test("home page presents the primary academic and project content", async ({
  page,
}) => {
  const response = await page.goto("/");

  expect(response?.ok()).toBe(true);
  await expect(page).toHaveTitle(/Kenny\)? Ke/i);
  await expect(page.locator("main")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByText("University of Toronto", { exact: false }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Go Game" }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Chemistry Equation Balancer" }).first(),
  ).toBeVisible();
});

test("home page exposes verified contact and practice destinations", async ({
  page,
}) => {
  await page.goto("/");

  for (const href of externalProfiles) {
    await expect(page.locator(`a[href="${href}"]`).first()).toHaveAttribute(
      "href",
      href,
    );
  }

  await expect(
    page.locator('a[href="mailto:kezixuan1@gmail.com"]').first(),
  ).toHaveAttribute("href", "mailto:kezixuan1@gmail.com");
});

test("core home content remains available without client JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  const page = await context.newPage();

  await page.goto("/");
  await expect(page.locator("main")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Go Game" }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Chemistry Equation Balancer" }).first(),
  ).toBeVisible();

  await context.close();
});
