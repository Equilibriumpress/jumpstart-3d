import { test, expect } from "@playwright/test";

test("Published model library opens native project in the unmodified editor", async ({ page }, info) => {
  test.skip(info.project.name !== "site", "Library is published only in the GitHub Pages site");
  await page.goto("/library/");
  await expect(page.getByRole("status")).toHaveText(/1 published model/);
  await expect(page.getByRole("heading", { name: "Starter box" })).toBeVisible();
  await page.getByRole("link", { name: "Open in editor: Starter box" }).click();
  await expect(page).toHaveURL(/\?project=starter-box/);
  await page.waitForFunction(() => window.JS3D?.list()?.some(b => b.name === "Starter box"), null, {timeout: 90000});
  const native = await page.evaluate(() => JS3D.save());
  expect(native.doc.bodies).toHaveLength(1);
});
