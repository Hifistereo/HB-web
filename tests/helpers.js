// Shared helpers: watch third-party requests, console errors and CSP violations.
const SELF = 'http://127.0.0.1:4173';

function trackRequests(page) {
  const external = [];
  page.on('request', (r) => { const u = r.url(); if (!u.startsWith(SELF) && !u.startsWith('data:') && !u.startsWith('blob:')) external.push(u); });
  return external;
}

function trackErrors(page) {
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  return errors;
}

// CSP violations surface as securitypolicyviolation events in the page
async function collectCsp(page) {
  await page.addInitScript(() => {
    window.__csp = [];
    document.addEventListener('securitypolicyviolation', (e) => window.__csp.push(e.violatedDirective + ' ' + e.blockedURI));
  });
}

// scroll through the whole page so lazy content, reveals and the video card trigger
async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.6);
    for (let y = 0; y < document.body.scrollHeight; y += step) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 300));
  });
}

const isYouTubeOrGoogle = (u) => /(^|\.)(youtube(-nocookie)?\.com|ytimg\.com|googlevideo\.com|google\.com|gstatic\.com|googleapis\.com|doubleclick\.net)$/.test(new URL(u).hostname);

module.exports = { SELF, trackRequests, trackErrors, collectCsp, scrollThrough, isYouTubeOrGoogle };
