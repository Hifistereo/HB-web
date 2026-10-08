const { test, expect } = require('@playwright/test');
const { trackErrors, collectCsp, scrollThrough } = require('./helpers');

for (const path of ['/index.html', '/404.html', '/privatums.html']) {
  test(`${path} renders without console errors or CSP violations`, async ({ page }) => {
    const errors = trackErrors(page);
    await collectCsp(page);
    const res = await page.goto(path);
    expect(res.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await scrollThrough(page);
    expect(errors).toEqual([]);
    expect(await page.evaluate(() => window.__csp)).toEqual([]);
  });
}

test('every in-page anchor has a target and every local link and asset resolves', async ({ page, request }) => {
  await page.goto('/');
  const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')));
  const ids = new Set(await page.$$eval('[id]', (els) => els.map((e) => e.id)));
  for (const h of hrefs.filter((h) => h.startsWith('#'))) expect(ids.has(h.slice(1)), `missing target ${h}`).toBe(true);
  const local = await page.evaluate(() => {
    const urls = new Set();
    document.querySelectorAll('a[href], link[href], img[src], script[src], source[src]').forEach((el) => {
      const v = el.getAttribute('href') || el.getAttribute('src');
      if (v && !/^(#|mailto:|tel:|https?:)/.test(v)) urls.add(new URL(v, location.href).pathname);
    });
    document.querySelectorAll('img[srcset], link[imagesrcset]').forEach((el) => {
      (el.getAttribute('srcset') || el.getAttribute('imagesrcset')).split(',').forEach((s) => urls.add(new URL(s.trim().split(' ')[0], location.href).pathname));
    });
    return [...urls];
  });
  for (const u of [...local, '/robots.txt', '/sitemap.xml', '/llms.txt', '/site.webmanifest', '/assets/img/og-image.jpg', '/assets/img/icon-512.png']) {
    const r = await request.get(u);
    expect(r.status(), u).toBe(200);
  }
});

test('sitemap lists only existing pages and robots.txt points to it', async ({ request }) => {
  const sm = await (await request.get('/sitemap.xml')).text();
  const locs = [...sm.matchAll(/<(?:image:)?loc>https:\/\/henrix\.lv(\/[^<]*)<\/(?:image:)?loc>/g)].map((m) => m[1]);
  expect(locs).toContain('/');
  expect(locs).toContain('/privatums.html');
  for (const l of locs) expect((await request.get(l === '/' ? '/index.html' : l)).status(), l).toBe(200);
  expect(await (await request.get('/robots.txt')).text()).toContain('Sitemap: https://henrix.lv/sitemap.xml');
});
