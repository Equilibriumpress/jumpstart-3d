import { test, expect } from "@playwright/test";

test("Pages model deep link opens editable native CAD model", async ({ page }, info) => {
  test.skip(info.project.name !== "site", "the standalone HTML intentionally has no GitHub library");
  await page.addInitScript(() => { try { localStorage.setItem("jumpstart.chisel.intro", "1"); } catch {} });
  await page.goto("/?project=starter-box");
  await page.waitForFunction(() => window.JS3D?.list()?.some(b => b.name === "Starter box"), null, {timeout:90000});
  const model = await page.evaluate(async () => {
    await JS3D.ready();
    const box = JS3D.list().find(b => b.name === "Starter box");
    return {volume:box.volume, size:box.bbox, native:JS3D.save()};
  });
  expect(model.volume).toBeCloseTo(60000, 1);
  expect(model.native.app).toBe("jumpstart-3d");
  expect(model.native.doc.bodies).toHaveLength(1);
});
