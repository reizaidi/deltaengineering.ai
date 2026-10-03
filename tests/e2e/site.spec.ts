import { expect, test } from "@playwright/test";

test("security headers are set", async ({ request }) => {
  const res = await request.get("/");
  const h = res.headers();
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["strict-transport-security"]).toContain("max-age=");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["x-powered-by"]).toBeUndefined();
});

test("primary navigation reaches every page", async ({ page, isMobile }) => {
  await page.goto("/");
  for (const label of ["Services", "Approach", "About"]) {
    if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
    const nav = page.getByRole("navigation", { name: isMobile ? "Mobile" : "Primary" });
    await nav.getByRole("link", { name: label }).click();
    await expect(page).toHaveURL(new RegExp(`/${label.toLowerCase()}$`));
    await expect(page.locator("h1")).toBeVisible();
  }
});

test("Delta Method tabs work with the keyboard", async ({ page }) => {
  await page.goto("/approach");
  const first = page.getByRole("tab", { name: /Discover/ });
  await first.click();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: /Design/ })).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("End");
  await expect(page.getByRole("tab", { name: /Operate/ })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("Is it still delivering");
});

test("trade-off presets update the recommendation", async ({ page }) => {
  await page.goto("/");
  await page.getByText("Cost first", { exact: true }).click();
  await expect(page.getByText(/Small or distilled model/)).toBeVisible();
});

test("contact form: validation, then successful Connect RPC submission", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send inquiry" }).click();
  const summary = page.getByRole("alert").filter({ hasText: "Please fix" });
  await expect(summary).toContainText("Please fix");
  await expect(page.getByText("Please enter your name.").first()).toBeVisible();

  await page.getByLabel(/^Name/).fill("Test Person");
  await page.getByLabel(/Work email/).fill("test@example.com");
  await page.getByLabel(/What do you need help with/).selectOption({ label: "Agentic systems" });
  await page.getByLabel(/Project details/).fill("We want an agent that triages support tickets with human approval.");
  await page.getByLabel(/You may use these details/).check();
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.getByRole("status").filter({ hasText: "Your inquiry is in" })).toBeVisible();
  await expect(page.getByText(/DAI-[0-9A-F]{8}/)).toBeVisible();
});

test("RPC rejects invalid payloads server-side", async ({ request }) => {
  const res = await request.post("/api/delta.v1.InquiryService/SubmitInquiry", {
    headers: { "Content-Type": "application/json", "x-real-ip": `203.0.113.${Math.floor(Math.random() * 250)}` },
    data: { name: "x", email: "nope", message: "short", engagement: "ENGAGEMENT_TYPE_OTHER", consent: true },
  });
  expect(res.status()).toBe(400);
  const body = await res.json();
  expect(body.code).toBe("invalid_argument");
});

test("unknown RPC path returns 404", async ({ request }) => {
  const res = await request.post("/api/delta.v1.Nope/Nope", { data: {} });
  expect(res.status()).toBe(404);
});
