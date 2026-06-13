import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

// ─── Test 1: Header & Logo ────────────────────────────────────────────────────

test("has a header element", async ({ page }) => {
  await expect(page.locator("header")).toBeVisible();
});

test("displays the AgentiqBridge logo", async ({ page }) => {
  const logo = page.locator('img[alt="AgentiqBridge Logo"]');
  await expect(logo).toBeVisible();
});

test("logo src points to the correct asset", async ({ page }) => {
  const logo = page.locator('img[alt="AgentiqBridge Logo"]');
  const src = await logo.getAttribute("src");
  expect(src).toContain("AgentiqBridge");
});

// ─── Test 2: Asset Loading ────────────────────────────────────────────────────

test("loads the cyber-woman hero image", async ({ page }) => {
  const heroImage = page.locator('img[src*="cyber-woman-charcoal"]');
  await expect(heroImage).toBeVisible();
});

test("loads the city background image", async ({ page }) => {
  // city image may be used as CSS background or as an <img> tag
  const cityImg = page.locator('img[src*="city-charcoal"]');
  const count = await cityImg.count();
  if (count > 0) {
    await expect(cityImg.first()).toBeVisible();
  } else {
    // Verify the section with city background exists
    const contactSection = page.locator("#contact");
    await expect(contactSection).toBeVisible();
  }
});

// ─── Test 3: Core Services ────────────────────────────────────────────────────

test("shows SAP Recruitment service", async ({ page }) => {
  await expect(page.getByText("SAP Recruitment", { exact: true })).toBeVisible();
});

test("shows AI Recruitment service", async ({ page }) => {
  await expect(page.getByText("AI Recruitment", { exact: true })).toBeVisible();
});

test("shows Headhunting service", async ({ page }) => {
  await expect(page.getByText("Headhunting", { exact: true })).toBeVisible();
});

// ─── Test 4: Contact & CTA ────────────────────────────────────────────────────

test("has a Contact section", async ({ page }) => {
  const contactSection = page.locator("section#contact, [id='contact']");
  await expect(contactSection).toBeVisible();
});

test("has a contact anchor or button element", async ({ page }) => {
  const contactLink = page.locator(
    'a[href="mailto:AqentiqBridge@gmail.com"], button[data-href="mailto:AqentiqBridge@gmail.com"]'
  );
  await expect(contactLink.first()).toBeVisible();
});

test("contact CTA has the exact mailto href", async ({ page }) => {
  const contactLink = page.locator('a[href="mailto:AqentiqBridge@gmail.com"]');
  await expect(contactLink.first()).toBeVisible();
  const href = await contactLink.first().getAttribute("href");
  expect(href).toBe("mailto:AqentiqBridge@gmail.com");
});

// ─── Test 5: Navigation ───────────────────────────────────────────────────────

test("has navigation links", async ({ page }) => {
  const nav = page.locator("nav").first();
  await expect(nav).toBeVisible();
});

test("Services nav link exists", async ({ page }) => {
  const servicesLink = page.locator('a[href="#services"]');
  await expect(servicesLink.first()).toBeVisible();
});

test("Contact nav link exists", async ({ page }) => {
  const contactLink = page.locator('nav a[href="#contact"]');
  await expect(contactLink.first()).toBeVisible();
});

// ─── Test 6: Footer ───────────────────────────────────────────────────────────

test("has a footer element", async ({ page }) => {
  await expect(page.locator("footer")).toBeVisible();
});

test("footer contains copyright text", async ({ page }) => {
  const footer = page.locator("footer");
  await expect(footer).toContainText("AgentiqBridge");
  await expect(footer).toContainText("All rights reserved");
});

// ─── Test 7: Responsiveness ───────────────────────────────────────────────────

test("page is responsive on mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.locator("header")).toBeVisible();
  await expect(page.getByText("SAP Recruitment", { exact: true })).toBeVisible();
});

// ─── Test 8: Accessibility ────────────────────────────────────────────────────

test("all images have alt attributes", async ({ page }) => {
  const images = page.locator("img");
  const count = await images.count();
  for (let i = 0; i < count; i++) {
    const alt = await images.nth(i).getAttribute("alt");
    expect(alt).not.toBeNull();
    expect(alt!.length).toBeGreaterThan(0);
  }
});

test("page has a main landmark", async ({ page }) => {
  await expect(page.locator("main")).toBeVisible();
});
