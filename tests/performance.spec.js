// Core Web Vitals in the lab: mobile emulation with 4x CPU slowdown and a throttled connection.
// Budgets follow Google's "good" thresholds (LCP ≤ 2.5 s, CLS ≤ 0.1) plus a page-weight budget.
const { test, expect } = require('@playwright/test');

test('LCP, CLS, long tasks and transfer size within budget @perf', async ({ page, browserName, isMobile }) => {
  const cdp = await page.context().newCDPSession(page);
  if (isMobile) {
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
  }
  await page.addInitScript(() => {
    window.__cwv = { lcp: 0, cls: 0, longTasks: 0 };
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__cwv.lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cwv.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__cwv.longTasks += Math.max(0, e.duration - 50); }).observe({ type: 'longtask', buffered: true });
  });
  await page.goto('/', { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  const m = await page.evaluate(() => ({ ...window.__cwv, bytes: performance.getEntriesByType('resource').concat(performance.getEntriesByType('navigation')).reduce((s, e) => s + (e.transferSize || 0), 0) }));
  console.log(`[${isMobile ? 'mobile' : 'desktop'}] LCP ${Math.round(m.lcp)} ms · CLS ${m.cls.toFixed(3)} · TBT~ ${Math.round(m.longTasks)} ms · ${Math.round(m.bytes / 1024)} KB`);
  expect(m.lcp).toBeLessThanOrEqual(2500);
  expect(m.cls).toBeLessThanOrEqual(0.1);
  expect(m.longTasks).toBeLessThanOrEqual(isMobile ? 300 : 150);
  expect(m.bytes).toBeLessThanOrEqual(600 * 1024);
});
