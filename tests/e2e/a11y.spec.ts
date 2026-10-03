import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = ["/", "/services", "/approach", "/about", "/contact", "/privacy", "/missing-page"];

for (const path of pages) {
  test(`axe: no WCAG 2.2 A/AA violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    // Let entrance animations settle so contrast is measured on final colours.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1200);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.length} node(s) - ${v.help}`)).toEqual([]);
  });
}

test("single h1, landmarks and skip link on every page", async ({ page }) => {
  for (const path of pages.slice(0, 6)) {
    await page.goto(path);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main#main")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
  }
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
});

test("reduced motion: autoplay tour starts paused", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/approach");
  await expect(page.getByRole("button", { name: "Play tour" })).toBeVisible();
  await ctx.close();
});

test("reduced motion: founder portrait does not float", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/about");
  const iterations = await page.locator(".float-bob").first().evaluate((el) => getComputedStyle(el).animationIterationCount);
  expect(iterations).toBe("1");
  await ctx.close();
});
