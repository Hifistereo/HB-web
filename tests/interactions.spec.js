// Existing interactions must keep working: tier tabs, mobile menu, programme toggle, repertoire tabs, FAQ.
const { test, expect } = require('@playwright/test');

test('tier tabs: click and arrow keys switch the panel', async ({ page }) => {
  await page.goto('/');
  const essential = page.locator('#tab-essential');
  await essential.scrollIntoViewIfNeeded();
  await essential.click();
  await expect(essential).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#sastavs-panel')).toHaveAttribute('aria-labelledby', 'tab-essential');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#tab-live')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#tab-live')).toBeFocused();
  await expect(page.locator('.tier-panel[data-tier=live] h3')).toBeVisible();
});

test('programme toggle switches between 3 and 4 sets', async ({ page }) => {
  await page.goto('/');
  const four = page.locator('[data-sets="4"]');
  await four.scrollIntoViewIfNeeded();
  await four.click();
  await expect(four).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.timeline .s4')).not.toHaveClass(/off/);
});

test('FAQ items expand and collapse natively', async ({ page }) => {
  await page.goto('/');
  const item = page.locator('.faq-item').first();
  await item.scrollIntoViewIfNeeded();
  await expect(item.locator('p')).toBeHidden();
  await item.locator('summary').click();
  await expect(item.locator('p')).toBeVisible();
  await item.locator('summary').click();
  await expect(item.locator('p')).toBeHidden();
});

test.describe('mobile only', () => {
  test.skip(({ isMobile }) => !isMobile, 'mobile layout');
  test('menu opens, closes with Escape and navigates', async ({ page }) => {
    await page.goto('/');
    const btn = page.locator('.menu-btn');
    await expect(btn).toBeVisible();
    await btn.click();
    await expect(page.locator('#mob-menu')).toBeVisible();
    await expect(btn).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(page.locator('#mob-menu')).toBeHidden();
    await btn.click();
    await page.locator('#mob-menu [data-menu-item][href="#pieteikt"]').click();
    await expect(page.locator('#mob-menu')).toBeHidden();
    await expect(page.locator('#pieteikt-h')).toBeInViewport();
  });
  test('repertoire tabs switch the visible column', async ({ page }) => {
    await page.goto('/');
    const tab = page.locator('.rep-tabs [data-col="1"]');
    await tab.scrollIntoViewIfNeeded();
    await tab.click();
    await expect(tab).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.song-col').nth(1)).toHaveClass(/cur/);
  });
  test('no horizontal overflow', async ({ page }) => {
    for (const p of ['/', '/privatums.html', '/404.html']) {
      await page.goto(p);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), p).toBeLessThanOrEqual(0);
    }
  });
});
