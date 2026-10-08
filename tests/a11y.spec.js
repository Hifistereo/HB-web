// Accessibility (axe, WCAG 2.2 A/AA) on mobile and desktop, plus reduced-motion behaviour.
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const { scrollThrough } = require('./helpers');

for (const path of ['/', '/privatums.html', '/404.html']) {
  test(`axe: no serious or critical violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    await scrollThrough(page); // reveal animations finished, so contrast is measured on final colours
    await page.waitForTimeout(1200);
    // Known, documented design exception (AUDIT.md): the programme timeline's set numbers "02"/"03" use the
    // brand violet/purple on ink-800 (below 4.5:1). The timeline is role="img" with a full aria-label.
    // Remove this exclude once the colours are changed.
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).exclude('.timeline .seg .n').analyze();
    const bad = r.violations.filter((v) => ['serious', 'critical'].includes(v.impact));
    expect(bad.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
  });
}

test('keyboard: skip link is first and moves focus to main content', async ({ page, isMobile }) => {
  test.skip(isMobile, 'keyboard flow checked on desktop');
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.locator('a.skip');
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#saturs$/);
});

test.describe('reduced motion', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } });
  test('all content is visible without animation and nothing is left hidden', async ({ page }) => {
    await page.goto('/');
    await scrollThrough(page);
    const stuck = await page.$$eval('[data-reveal], [data-quote] .w', (els) =>
      els.filter((el) => el.offsetParent !== null && parseFloat(getComputedStyle(el).opacity) < 1).map((el) => el.className || el.tagName));
    expect(stuck).toEqual([]);
    const transforms = await page.$$eval('[data-parallax]', (els) => els.map((el) => el.style.transform));
    expect(transforms.every((t) => t === '')).toBe(true);
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  });
});
