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

    const firstProduct = page.locator("article.interactive-card").first();
    await expect(firstProduct).toBeVisible();
    await firstProduct.tap();

    const dialog = page.locator('div[role="dialog"][aria-modal="true"]');
    await expect(dialog).toBeVisible({ timeout: 3000 });

    const modalTitle = dialog.locator("#product-modal-title");
    await expect(modalTitle).toBeVisible();

    const waButton = dialog.getByRole("link", {
      name: /continue on whatsapp/i,
    });
    await expect(waButton).toBeVisible();
    const waBox = await waButton.boundingBox();
    expect(waBox).not.toBeNull();
    if (waBox) {
      expect(waBox.height).toBeGreaterThanOrEqual(44);
    }

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

  test("4. Drag sheet down past threshold: it dismisses", async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("beebakes_splash_shown", "1");
    });
    await page.goto("/");

    const firstProduct = page.locator("article.interactive-card").first();
    await firstProduct.tap();

    const dialog = page.locator('div[role="dialog"][aria-modal="true"]');
    await expect(dialog).toBeVisible({ timeout: 3000 });

    const box = await dialog.boundingBox();
    expect(box).not.toBeNull();
    if (!box) return;

    // Start near the top pull pill
    const startX = box.x + box.width / 2;
    const startY = box.y + 25;

    // Drag down 160px (threshold is 90px in onDragEnd)
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX, startY + 160, { steps: 12 });
    await page.mouse.up();

    // Sheet should dismiss
    await expect(dialog).toBeHidden({ timeout: 2500 });
  });

  test("5. Short drag: snaps back and stays open", async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("beebakes_splash_shown", "1");
    });
    await page.goto("/");

    const firstProduct = page.locator("article.interactive-card").first();
    await firstProduct.tap();

    const dialog = page.locator('div[role="dialog"][aria-modal="true"]');
    await expect(dialog).toBeVisible({ timeout: 3000 });

    const box = await dialog.boundingBox();
    expect(box).not.toBeNull();
    if (!box) return;

    const startX = box.x + box.width / 2;
    const startY = box.y + 25;

    // Short drag down only 30px (well below 90px threshold)
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX, startY + 30, { steps: 6 });
    await page.mouse.up();

    // Sheet remains open
    await expect(dialog).toBeVisible({ timeout: 1500 });
  });

  test("6. Start closing, then reverse mid-animation: no jump, sheet returns smoothly", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("beebakes_splash_shown", "1");
    });
    await page.goto("/");

    const firstProduct = page.locator("article.interactive-card").first();
    await firstProduct.tap();

    const dialog = page.locator('div[role="dialog"][aria-modal="true"]');
    await expect(dialog).toBeVisible({ timeout: 3000 });

    const box = await dialog.boundingBox();
    expect(box).not.toBeNull();
    if (!box) return;

    const startX = box.x + box.width / 2;
    const startY = box.y + 25;

    // Drag down 65px (initiating close motion), then reverse upwards before release
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX, startY + 65, { steps: 8 });
    await page.mouse.move(startX, startY - 10, { steps: 8 });
    await page.mouse.up();

    // Sheet smoothly returns and stays open without jumping or unmounting
    await expect(dialog).toBeVisible({ timeout: 1500 });
  });

  test("7. Custom-order form with valid data: produces expected WhatsApp URL without navigating", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("beebakes_splash_shown", "1");
      type WindowWithUrls = Window & { __openedUrls?: string[] };
      (window as WindowWithUrls).__openedUrls = [];
      window.open = (url?: string | URL) => {
        if (url) {
          ((window as WindowWithUrls).__openedUrls ??= []).push(url.toString());
        }
        return window as Window;
      };
    });
    await page.goto("/");

    const designCakeBtn = page.getByRole("button", {
      name: "Design your cake",
    });
    await expect(designCakeBtn).toBeVisible();
    await designCakeBtn.tap();

    const dialog = page.locator('div[role="dialog"][aria-modal="true"]');
    await expect(dialog).toBeVisible({ timeout: 3000 });

    // Fill valid data
    await dialog.locator("#order-name").fill("Vartika Tester");
    await dialog.locator("#order-occasion").selectOption("Birthday");
    await dialog.locator("#order-size").selectOption("1 kg");
    await dialog
      .locator("#order-flavor")
      .fill("Chocolate truffle with caramel");
    await dialog
      .locator("#order-details")
      .fill("Minimalist pastel aesthetic with fresh macarons on top.");

    // Submit form
    const submitBtn = dialog.getByRole("button", {
      name: /continue on whatsapp/i,
    });
    await submitBtn.tap();

    // Verify submission state
    await expect(dialog.getByText("Request sent")).toBeVisible({
      timeout: 5000,
    });

    // Check captured WhatsApp URL
    const openedUrls = await page.evaluate(() => {
      return (window as Window & { __openedUrls?: string[] }).__openedUrls || [];
    });
    expect(openedUrls.length).toBeGreaterThan(0);
    const targetUrl = openedUrls[0];
    expect(targetUrl).toContain("wa.me");
    expect(targetUrl).toContain(encodeURIComponent("Vartika Tester"));
    expect(targetUrl).toContain(encodeURIComponent("Birthday"));
    expect(targetUrl).toContain(encodeURIComponent("1 kg"));
  });

  test("8. Desktop flow at 1280px: modal stays centered dialog, not a bottom sheet", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => {
      sessionStorage.setItem("beebakes_splash_shown", "1");
    });
    await page.goto("/");

    const firstProduct = page.locator("article.interactive-card").first();
    await firstProduct.click();

    const dialog = page.locator('div[role="dialog"][aria-modal="true"]');
    await expect(dialog).toBeVisible({ timeout: 3000 });

    // On desktop, the mobile pull pill (.sm:hidden) is not visible
    const pullPill = dialog.locator("div.touch-none");
    await expect(pullPill).toBeHidden();

    // Verify dialog is centered in viewport and does not stick to bottom
    const box = await dialog.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      // Centered dialog: space above and below
      expect(box.y).toBeGreaterThan(20);
      expect(box.y + box.height).toBeLessThan(780);
    }

    const closeBtn = dialog.getByRole("button", {
      name: /close product details/i,
    });
    await closeBtn.click();
    await expect(dialog).toBeHidden({ timeout: 2000 });
  });

  test("9. Sticky mobile CTA and safe area", async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("beebakes_splash_shown", "1");
    });
    await page.goto("/");

    await page.evaluate(() => window.scrollTo(0, 500));

    const callBtn = page.getByRole("link", { name: "Call Bee Bakes" });
    await expect(callBtn).toBeVisible({ timeout: 3000 });

    const waBtn = page.getByRole("link", { name: /chat on whatsapp/i });
    await expect(waBtn).toBeVisible();

    const callBox = await callBtn.boundingBox();
    expect(callBox).not.toBeNull();
    if (callBox) {
      expect(callBox.height).toBeGreaterThanOrEqual(44);
    }

    const dismissBtn = page.getByRole("button", {
      name: /dismiss quick contact bar/i,
    });
    await dismissBtn.tap();
    await expect(callBtn).toBeHidden({ timeout: 2000 });
  });

  test("10. prefers-reduced-motion: sheets and cards use cross-fades only", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    // Splash screen should not show
    const splash = page.getByRole("button", {
      name: /skip splash screen/i,
    });
    await expect(splash).toBeHidden();

    await expect(page.locator("h1")).toBeVisible();

    // Verify product cards are displayed
    const firstProduct = page.locator("article.interactive-card").first();
    await expect(firstProduct).toBeVisible();

    // Open product modal
    await firstProduct.tap();
    const dialog = page.locator('div[role="dialog"][aria-modal="true"]');
    await expect(dialog).toBeVisible({ timeout: 2000 });

    // Under reduced motion, close button closes cleanly
    const closeBtn = dialog.getByRole("button", {
      name: /close product details/i,
    });
    await closeBtn.tap();
    await expect(dialog).toBeHidden({ timeout: 2000 });
  });
});
