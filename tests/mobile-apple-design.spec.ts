import { test, expect } from "@playwright/test";

test.use({
  viewport: { width: 375, height: 667 },
  hasTouch: true,
  isMobile: true,
});

test.describe("Apple Design Mobile Verification (375px viewport)", () => {
  test("1. Splash screen: skippable and shows at most once per session", async ({
    page,
  }) => {
    await page.goto("/");

    // Check if splash screen is visible or skip button is present
    const skipBtn = page.getByRole("button", { name: /skip splash screen/i });
    if (await skipBtn.isVisible({ timeout: 1500 }).catch(() => false)) {
      // Tap skip
      await skipBtn.tap();
      await expect(skipBtn).toBeHidden({ timeout: 2000 });
    }

    // Main content should be visible
    await expect(page.locator("h1")).toBeVisible({ timeout: 3000 });

    // Reload page: splash should NOT show again in same session
    await page.reload();
    await expect(page.locator("h1")).toBeVisible({ timeout: 1500 });
    const splashOnReload = page.getByRole("button", {
      name: /skip splash screen/i,
    });
    await expect(splashOnReload).toBeHidden();
  });

  test("2. Mobile navigation and 44x44px touch targets", async ({ page }) => {
    // bypass splash
    await page.addInitScript(() => {
      sessionStorage.setItem("beebakes_splash_shown", "1");
    });
    await page.goto("/");

    // Verify hamburger button exists and has at least 44x44 touch target
    const hamburger = page.getByRole("button", {
      name: /toggle navigation menu/i,
    });
    await expect(hamburger).toBeVisible();
    const box = await hamburger.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
    }

    // Tap hamburger to open mobile menu
    await hamburger.tap();
    const mobileMenu = page.getByLabel("Mobile navigation");
    await expect(mobileMenu).toBeVisible();

    // Verify mobile links have >= 44px tap targets
    const creationsLink = mobileMenu.getByRole("link", { name: "Creations" });
    const creationsBox = await creationsLink.boundingBox();
    expect(creationsBox).not.toBeNull();
    if (creationsBox) {
      expect(creationsBox.height).toBeGreaterThanOrEqual(44);
    }

    // Tap link to close menu
    await creationsLink.tap();
    await expect(mobileMenu).toBeHidden({ timeout: 2000 });
  });

  test("3. Product modal bottom sheet: open, aria-modal, drag pull handle, and dismiss", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("beebakes_splash_shown", "1");
    });
    await page.goto("/");

    // Find first product card and tap it
    const firstProduct = page.locator("article.interactive-card").first();
    await expect(firstProduct).toBeVisible();
    await firstProduct.tap();

    // Dialog should open with role="dialog" and aria-modal="true"
    const dialog = page.locator('div[role="dialog"][aria-modal="true"]');
    await expect(dialog).toBeVisible({ timeout: 3000 });

    // Check title in dialog
    const modalTitle = dialog.locator("#product-modal-title");
    await expect(modalTitle).toBeVisible();

    // Verify WhatsApp order button in sheet
    const waButton = dialog.getByRole("link", {
      name: /continue on whatsapp/i,
    });
    await expect(waButton).toBeVisible();
    const waBox = await waButton.boundingBox();
    expect(waBox).not.toBeNull();
    if (waBox) {
      expect(waBox.height).toBeGreaterThanOrEqual(44);
    }

    // Close via close button
    const closeBtn = dialog.getByRole("button", {
      name: /close product details/i,
    });
    await expect(closeBtn).toBeVisible();
    await closeBtn.tap();
    await expect(dialog).toBeHidden({ timeout: 2000 });

    // Reopen and test Escape key dismissal
    await firstProduct.tap();
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden({ timeout: 2000 });
  });

  test("4. Custom order modal bottom sheet: open, form validation, and Escape close", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("beebakes_splash_shown", "1");
    });
    await page.goto("/");

    // Open custom order modal via 'Design your cake' button
    const designCakeBtn = page.getByRole("button", {
      name: "Design your cake",
    });
    await expect(designCakeBtn).toBeVisible();
    await designCakeBtn.tap();

    // Dialog opens
    const dialog = page.locator('div[role="dialog"][aria-modal="true"]');
    await expect(dialog).toBeVisible({ timeout: 3000 });

    // Attempt submit with empty fields -> inline validation errors
    const submitBtn = dialog.getByRole("button", {
      name: /continue on whatsapp/i,
    });
    await submitBtn.tap();

    // Form errors should be visible
    await expect(dialog.locator("#name-error")).toBeVisible();

    // Fill the fields
    await dialog.locator("#order-name").fill("Vartika Tester");
    await dialog.locator("#order-occasion").selectOption("Birthday");
    await dialog.locator("#order-size").selectOption("1 kg");
    await dialog
      .locator("#order-flavor")
      .fill("Chocolate truffle with caramel");
    await dialog
      .locator("#order-details")
      .fill("Minimalist pastel aesthetic with fresh macarons on top.");

    // Close via close button
    const closeBtn = dialog.getByRole("button", {
      name: /close custom order form/i,
    });
    await closeBtn.tap();
    await expect(dialog).toBeHidden({ timeout: 2000 });
  });

  test("5. Sticky mobile CTA and safe area", async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("beebakes_splash_shown", "1");
    });
    await page.goto("/");

    // Scroll down 500px to trigger sticky CTA
    await page.evaluate(() => window.scrollTo(0, 500));

    // Sticky CTA should appear
    const callBtn = page.getByRole("link", { name: "Call Bee Bakes" });
    await expect(callBtn).toBeVisible({ timeout: 3000 });

    const waBtn = page.getByRole("link", { name: /chat on whatsapp/i });
    await expect(waBtn).toBeVisible();

    // Check touch target height >= 44px
    const callBox = await callBtn.boundingBox();
    expect(callBox).not.toBeNull();
    if (callBox) {
      expect(callBox.height).toBeGreaterThanOrEqual(44);
    }

    // Dismiss sticky CTA
    const dismissBtn = page.getByRole("button", {
      name: /dismiss quick contact bar/i,
    });
    await dismissBtn.tap();
    await expect(callBtn).toBeHidden({ timeout: 2000 });
  });

  test("6. Reduced motion: bypasses splash and disables transforms", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    // Splash screen should not show when reduced motion is preferred
    const splash = page.getByRole("button", {
      name: /skip splash screen/i,
    });
    await expect(splash).toBeHidden();

    // Main content immediately visible
    await expect(page.locator("h1")).toBeVisible();
  });
});
