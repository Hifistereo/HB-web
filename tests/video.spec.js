// Self-hosted muted loop (opt-in via data-loop on #vid). Until the clip exists, the poster image stays.
const { test, expect } = require('@playwright/test');
const { trackRequests, isYouTubeOrGoogle } = require('./helpers');

// serve index.html with data-loop set, as it will be once the clip is added
async function withLoop(page, clip) {
  await page.route('**/index.html', async (route) => {
    const res = await route.fetch();
    const body = (await res.text()).replace('<div class="vid" id="vid">', '<div class="vid" id="vid" data-loop="assets/video/henrix-loop">');
    await route.fulfill({ response: res, body });
  });
  // 'hang' keeps the clip request pending so the element can be inspected; otherwise 404
  await page.route('**/assets/video/**', (r) => (clip === 'hang' ? undefined : r.fulfill({ status: 404, body: '' })));
}

test('as shipped (no data-loop): no video element, poster image shown', async ({ page }) => {
  await page.goto('/index.html');
  await page.locator('#vid').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await expect(page.locator('#vid video')).toHaveCount(0);
  await expect(page.locator('#vid img')).toBeVisible();
});

test('with data-loop: a muted inline looping video with poster mounts when visible, never YouTube', async ({ page }) => {
  await withLoop(page, 'hang');
  const ext = trackRequests(page);
  await page.goto('/index.html');
  await expect(page.locator('#vid video')).toHaveCount(0); // not before it is on screen
  await page.locator('#vid').scrollIntoViewIfNeeded();
  const v = page.locator('#vid video');
  await expect(v).toHaveCount(1);
  const props = await v.evaluate((el) => ({ muted: el.muted, loop: el.loop, inline: el.playsInline, poster: el.poster, preload: el.preload, types: [...el.querySelectorAll('source')].map((s) => s.type) }));
  expect(props).toMatchObject({ muted: true, loop: true, inline: true, preload: 'none', types: ['video/webm', 'video/mp4'] });
  expect(props.poster).toContain('band-stage');
  expect(ext.filter(isYouTubeOrGoogle)).toEqual([]);
});

test('with data-loop but a missing clip: falls back to the poster image', async ({ page }) => {
  await withLoop(page, null);
  await page.goto('/index.html');
  await page.locator('#vid').scrollIntoViewIfNeeded();
  await expect(page.locator('#vid video')).toHaveCount(0, { timeout: 5000 });
  await expect(page.locator('#vid img')).toBeVisible();
  await expect(page.locator('#vid .hint')).toHaveText('Atskaņot');
});

test.describe('reduced motion', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } });
  test('with data-loop: no autoplaying video', async ({ page }) => {
    await withLoop(page, null);
    await page.goto('/index.html');
    await page.locator('#vid').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(page.locator('#vid video')).toHaveCount(0);
  });
});
