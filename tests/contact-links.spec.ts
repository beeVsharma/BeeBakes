import { test, expect } from "@playwright/test";

test.describe("Contact and Footer Links", () => {
  test("should verify Instagram links and contact info", async ({ page }) => {
    await page.goto("/");

    // Verify Instagram Feed section handle
    const instaHandle = page.locator("h2", { hasText: "@beebakes_vartika" });
    await expect(instaHandle).toBeVisible();

    // Verify View More button link
    const viewMoreBtn = page.getByRole("link", {
      name: "View More on Instagram",
    });
    await expect(viewMoreBtn).toBeVisible();
    await expect(viewMoreBtn).toHaveAttribute(
      "href",
      "https://www.instagram.com/beebakes_vartika/",
    );

    // Verify Footer contact info
    const footerPhone = page.locator("li", { hasText: "+91 8866785016" });
    await expect(footerPhone).toBeVisible();

    const footerAddress = page.locator("li", {
      hasText: "Premium Cloud Bakery",
    });
    await expect(footerAddress).toBeVisible();

    // Verify 100% Eggless bio
    const footerBio = page.locator("p", {
      hasText: /100% Eggless premium custom cakes/i,
    });
    await expect(footerBio).toBeVisible();
  });
});
