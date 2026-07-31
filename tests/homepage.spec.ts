import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load the page and check the main brand elements', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/Bee Bakes/);

    // Check Hero section main text
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toContainText('Indulge in');
    await expect(heroHeading).toContainText('Pure Perfection');

    // Check Navbar visibility of brand
    const navbarBrand = page.locator('text=Bee Bakes').first();
    await expect(navbarBrand).toBeVisible();
    
    // Check main call to action button
    const ctaButton = page.locator('button', { hasText: 'Order Now' });
    await expect(ctaButton.first()).toBeVisible();
  });
});
