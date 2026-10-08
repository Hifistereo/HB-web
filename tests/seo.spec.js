// On-page SEO and structured data. JSON-LD must be accurate: valid JSON, expected types,
// FAQ identical to the visible text, and no placeholder values.
const { test, expect } = require('@playwright/test');

const PLACEHOLDER = /TODO|TBD|XXX|PLACEHOLDER|lorem|example\.(com|org)|G-X{4,}|YOUR_|CF_TOKEN|GSC_TOKEN|ACCESS_KEY/i;

async function graph(page) {
  const blocks = await page.$$eval('script[type="application/ld+json"]', (s) => s.map((x) => x.textContent));
  expect(blocks.length).toBeGreaterThan(0);
  return { raw: blocks.join('\n'), nodes: blocks.flatMap((b) => JSON.parse(b)['@graph'] || [JSON.parse(b)]) };
}

test('home page metadata', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Henrix Band/);
  expect(await page.title()).toMatch(/kāzām/);
  expect((await page.title()).length).toBeLessThanOrEqual(65);
  const desc = await page.locator('meta[name=description]').getAttribute('content');
  expect(desc.length).toBeGreaterThan(70);
  expect(desc.length).toBeLessThanOrEqual(170);
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://henrix.lv/');
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', 'https://henrix.lv/');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://henrix.lv/assets/img/og-image.jpg');
  await expect(page.locator('html')).toHaveAttribute('lang', 'lv');
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', /index, follow/);
  await expect(page.locator('h1')).toHaveCount(1);
  // every content image has alt text (decorative ones explicitly empty)
  expect(await page.$$eval('img', (i) => i.filter((x) => !x.hasAttribute('alt')).length)).toBe(0);
});

test('secondary pages: canonical and indexing', async ({ page }) => {
  await page.goto('/privatums.html');
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://henrix.lv/privatums.html');
  await expect(page.locator('meta[name=robots]')).toHaveCount(0);
  await page.goto('/404.html');
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', 'noindex');
});

test('key content is in the HTML without JavaScript (crawlable)', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('/');
  const text = await page.locator('main').textContent();
  for (const s of ['Henrix Essential', 'Henrix Live+', 'Henrix Full Experience', '3 × 50', 'Biežāk uzdotie jautājumi', 'henrixband@gmail.com', 'Laternas']) expect(text).toContain(s);
  await ctx.close();
});

test('JSON-LD: valid, expected types, no placeholders', async ({ page }) => {
  await page.goto('/');
  const { raw, nodes } = await graph(page);
  expect(raw).not.toMatch(PLACEHOLDER);
  const types = nodes.map((n) => n['@type']);
  expect(types).toEqual(expect.arrayContaining(['WebSite', 'WebPage', 'MusicGroup', 'FAQPage']));
  const band = nodes.find((n) => n['@type'] === 'MusicGroup');
  expect(band).toMatchObject({ name: 'Henrix Band', url: 'https://henrix.lv/', email: 'henrixband@gmail.com', telephone: '+371 25972689' });
  expect(band.makesOffer.map((o) => o.itemOffered.name)).toEqual(['Henrix Essential', 'Henrix Live+', 'Henrix Full Experience']);
});

test('JSON-LD: every henrix.lv URL it references exists', async ({ page, request }) => {
  await page.goto('/');
  const { raw } = await graph(page);
  const urls = [...new Set([...raw.matchAll(/https:\/\/henrix\.lv(\/[^"#\s]*)/g)].map((m) => m[1]))];
  for (const u of urls) expect((await request.get(u === '/' ? '/index.html' : u)).status(), u).toBe(200);
});

test('JSON-LD: FAQPage matches the visible FAQ exactly', async ({ page }) => {
  await page.goto('/');
  const { nodes } = await graph(page);
  const faq = nodes.find((n) => n['@type'] === 'FAQPage');
  const visible = await page.$$eval('.faq-item', (items) => items.map((d) => ({ q: d.querySelector('summary').textContent.trim(), a: d.querySelector('p').textContent.trim() })));
  expect(faq.mainEntity.map((m) => ({ q: m.name, a: m.acceptedAnswer.text }))).toEqual(visible);
});

test('robots.txt allows crawlers (incl. AI) and llms.txt is present', async ({ request }) => {
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toMatch(/User-agent: \*\s+Allow: \//);
  const llms = await (await request.get('/llms.txt')).text();
  expect(llms).toMatch(/^# Henrix Band/);
  expect(llms).toContain('## FAQ');
});
