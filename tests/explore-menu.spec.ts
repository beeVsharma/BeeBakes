import { test, expect } from '@playwright/test';

test.describe('Explore Menu', () => {
  test('should verify Explore Our Range section and tab switching', async ({ page }) => {
    await page.goto('/');

    // Verify section header
    const sectionHeader = page.locator('h2', { hasText: 'Explore Our Range' });
    await expect(sectionHeader).toBeVisible();

    // Verify tabs
    const allCakesTab = page.getByRole('button', { name: 'All Cakes', exact: true });
    await expect(allCakesTab).toBeVisible();
    await expect(allCakesTab).toHaveClass(/font-bold/); // Initially active

    const chocolateTab = page.getByRole('button', { name: 'Chocolate', exact: true });
    await expect(chocolateTab).toBeVisible();

    // Click tab
    await chocolateTab.click();
    
    // Verify it becomes active
    await expect(chocolateTab).toHaveClass(/font-bold/);
    await expect(allCakesTab).not.toHaveClass(/font-bold/);

    // Verify featured creations
    const featuredHeader = page.locator('h2', { hasText: 'Featured Creations' });
    await expect(featuredHeader).toBeVisible();
  });
});
