import { expect, test } from "@playwright/test";

const projects = [
  {
    name: "Go Game",
    path: "/projects/go-game/",
    repository: "https://github.com/KennyKe0706/GO-Game",
    demo: "/demos/go-game/",
  },
  {
    name: "Chemistry Equation Balancer",
    path: "/projects/chemistry-equation-balancer/",
    repository: "https://github.com/KennyKe0706/Chemistry-Equation-Balancer",
    demo: "/demos/chemistry-equation-balancer/",
  },
] as const;

test("project index links to every case study and source repository", async ({
  page,
}) => {
  const response = await page.goto("/projects/");

  expect(response?.ok()).toBe(true);
  await expect(
    page.getByRole("heading", { level: 1, name: /projects/i }),
  ).toBeVisible();

  for (const project of projects) {
    await expect(
      page.getByRole("link", { name: project.name }).first(),
    ).toHaveAttribute("href", project.path);
    await expect(
      page.locator(`a[href="${project.repository}"]`).first(),
    ).toHaveAttribute("href", project.repository);
    await expect(
      page.locator(`a[href="${project.demo}"]`).first(),
    ).toHaveAttribute("href", project.demo);
  }
});

test("live demos load and respond to their primary interactions", async ({
  page,
}) => {
  await page.goto("/demos/chemistry-equation-balancer/");
  await expect(
    page.getByRole("heading", { name: "Chemistry Equation Balancer" }),
  ).toBeVisible();
  await page
    .getByRole("textbox", { name: "Unbalanced equation" })
    .fill("Fe + O2 -> Fe2O3");
  await page.getByRole("button", { name: "Balance" }).click();
  await expect(page.locator("#out")).toHaveText("4Fe + 3O2 → 2Fe2O3");

  await page.goto("/demos/go-game/");
  await expect(page.getByRole("heading", { name: "Go Game" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Restart" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Undo" })).toBeVisible();
  await page.locator("#board").click({ position: { x: 400, y: 400 } });
  await expect(page.locator("#board .stone")).toHaveCount(1);
  await expect(page.locator("#turn-status")).toHaveText("White to move");
});

for (const project of projects) {
  test(`${project.name} detail page is generated from project content`, async ({
    page,
  }) => {
    const response = await page.goto(project.path);

    expect(response?.ok()).toBe(true);
    await expect(
      page.getByRole("heading", { level: 1, name: project.name }),
    ).toBeVisible();
    await expect(
      page.locator(`a[href="${project.repository}"]`).first(),
    ).toHaveAttribute("href", project.repository);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://kennyke0706.github.io${project.path}`,
    );
  });
}

test("project cards and actions contain no nested links", async ({ page }) => {
  for (const route of ["/", "/projects/"] as const) {
    await page.goto(route);
    await expect(page.locator("a a")).toHaveCount(0);
  }
});

test("project imagery loads when the work enters the viewport", async ({
  page,
}) => {
  await page.goto("/");

  const images = page.locator(".project-visual img");
  await expect(images).toHaveCount(projects.length);
  await images.last().scrollIntoViewIfNeeded();

  await expect
    .poll(() =>
      images.evaluateAll((items) =>
        items.every(
          (item) =>
            (item as HTMLImageElement).complete &&
            (item as HTMLImageElement).naturalWidth > 0,
        ),
      ),
    )
    .toBe(true);
});
