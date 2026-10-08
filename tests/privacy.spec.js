// Consent: YouTube (Google) must not be contacted until the visitor clicks play.
// Analytics is tested separately: only the cookieless Cloudflare beacon is ever allowed before interaction.
const { test, expect } = require('@playwright/test');
const { trackRequests, scrollThrough, isYouTubeOrGoogle } = require('./helpers');

const ANALYTICS_ALLOW = ['static.cloudflareinsights.com', 'cloudflareinsights.com'];

// stub third-party hosts so tests never depend on the network
async function stubYouTube(page) {
  await page.route(/youtube-nocookie\.com|youtube\.com|ytimg\.com|googlevideo\.com/, (r) => r.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><title>yt</title>' }));
}

test.describe('YouTube consent', () => {
  test('no YouTube or Google request on load or after scrolling the video into view', async ({ page }) => {
    await stubYouTube(page);
    const ext = trackRequests(page);
    await page.goto('/');
    await page.locator('#vid').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await scrollThrough(page);
    expect(ext.filter(isYouTubeOrGoogle)).toEqual([]);
    await expect(page.locator('#vid iframe')).toHaveCount(0);
    await expect(page.locator('#vid-note')).toContainText('YouTube');
  });

  test('clicking play loads the youtube-nocookie player with sound', async ({ page }) => {
    await stubYouTube(page);
    const ext = trackRequests(page);
    await page.goto('/');
    await page.locator('#vid').scrollIntoViewIfNeeded();
    await page.locator('#vid button').click();
    const frame = page.locator('#vid iframe');
    await expect(frame).toHaveCount(1);
    const src = await frame.getAttribute('src');
    expect(new URL(src).hostname).toBe('www.youtube-nocookie.com');
    expect(src).not.toContain('mute=1');
    await expect(page.locator('#vid button')).toHaveAttribute('aria-pressed', 'true');
    await expect.poll(() => ext.filter((u) => u.includes('youtube-nocookie.com')).length).toBeGreaterThan(0);
  });
});

test.describe('Analytics', () => {
  test('before interaction, third-party requests are limited to the cookieless analytics allowlist', async ({ page }) => {
    const ext = trackRequests(page);
    await page.goto('/');
    await scrollThrough(page);
    const hosts = [...new Set(ext.map((u) => new URL(u).hostname))];
    expect(hosts.filter((h) => !ANALYTICS_ALLOW.includes(h))).toEqual([]);
  });

  test('no cookies or web storage are set by the site', async ({ page, context }) => {
    await page.goto('/');
    await scrollThrough(page);
    expect(await context.cookies()).toEqual([]);
    expect(await page.evaluate(() => localStorage.length + sessionStorage.length)).toBe(0);
  });

  test('CSP permits the Cloudflare beacon so enabling analytics needs only the script tag', async ({ page }) => {
    await page.goto('/');
    const csp = await page.locator('meta[http-equiv="Content-Security-Policy"]').getAttribute('content');
    expect(csp).toMatch(/script-src [^;]*https:\/\/static\.cloudflareinsights\.com/);
    expect(csp).toMatch(/connect-src [^;]*https:\/\/cloudflareinsights\.com/);
  });
});
