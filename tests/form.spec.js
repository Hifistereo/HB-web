// Enquiry form lifecycle against a mocked Web3Forms endpoint.
const { test, expect } = require('@playwright/test');

const API = 'https://api.web3forms.com/submit';

async function open(page, { key = 'test-key' } = {}) {
  await page.goto('/');
  if (key) await page.locator('input[name=access_key]').evaluate((el, k) => { el.value = k; }, key);
  await page.locator('#pieteikt').scrollIntoViewIfNeeded();
}
async function fill(page) {
  await page.fill('input[name=date]', '2027-06-19');
  await page.fill('input[name=place]', 'Rīga');
  await page.fill('input[name=name]', 'Anna Bērziņa');
  await page.fill('input[name=email]', 'anna@example.com');
  await page.locator('label.f-tier.live').click();
}
const submit = (page) => page.locator('#enquiry button[type=submit]').click();

test('ships without a placeholder key and posts to Web3Forms', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#enquiry')).toHaveAttribute('action', API);
  await expect(page.locator('input[name=access_key]')).toHaveValue('');
  await expect(page.locator('input[name=botcheck]')).toHaveCount(1);
});

test('validation: required date, name and one contact method', async ({ page }) => {
  let posted = 0;
  await page.route(API, (r) => { posted++; r.fulfill({ status: 200, json: { success: true } }); });
  await open(page);
  await submit(page);
  await expect(page.locator('#err-date')).toHaveText('Norādiet pasākuma datumu.');
  await expect(page.locator('#err-name')).toHaveText('Norādiet savu vārdu.');
  await expect(page.locator('#err-contact')).toHaveText('Norādiet e-pastu vai tālruni.');
  await expect(page.locator('input[name=date]')).toBeFocused();
  await page.fill('input[name=email]', 'nav-epasts');
  await page.fill('input[name=date]', '2027-06-19');
  await page.fill('input[name=name]', 'Anna');
  await submit(page);
  await expect(page.locator('#err-contact')).toHaveText('Pārbaudiet e-pasta adresi.');
  expect(posted).toBe(0);
});

test('success: posts the enquiry and shows the confirmation', async ({ page }) => {
  let body = '';
  await page.route(API, (r) => { body = r.request().postData() || ''; r.fulfill({ status: 200, json: { success: true, message: 'Email sent' } }); });
  await open(page);
  await fill(page);
  await submit(page);
  await expect(page.locator('#sent')).toBeVisible();
  await expect(page.locator('#sent-name')).toHaveText(', Anna');
  await expect(page.locator('#sent-date')).toHaveText(' 19.06.2027');
  await expect(page.locator('#enquiry')).toBeHidden();
  for (const s of ['test-key', 'Anna Bērziņa', 'anna@example.com', 'Live+', 'Henrix Band pieprasījums']) expect(body).toContain(s);
  expect(body).not.toContain('botcheck');
  // reset flow
  await page.locator('#sent-reset').click();
  await expect(page.locator('#enquiry')).toBeVisible();
  await expect(page.locator('input[name=name]')).toHaveValue('');
});

for (const [name, handler] of [
  ['HTTP 500', (r) => r.fulfill({ status: 500, body: 'error' })],
  ['success:false', (r) => r.fulfill({ status: 200, json: { success: false, message: 'Invalid key' } })],
  ['network failure', (r) => r.abort('failed')]
]) {
  test(`error (${name}): shows the error message and re-enables the button`, async ({ page }) => {
    await page.route(API, handler);
    await open(page);
    await fill(page);
    await submit(page);
    await expect(page.locator('#f-status')).toContainText('Neizdevās nosūtīt');
    await expect(page.locator('#enquiry button[type=submit]')).toBeEnabled();
    await expect(page.locator('#sent')).toBeHidden();
  });
}

test('button is disabled while sending (no double submit)', async ({ page }) => {
  let release, count = 0;
  await page.route(API, async (r) => { count++; await new Promise((res) => { release = res; }); r.fulfill({ status: 200, json: { success: true } }); });
  await open(page);
  await fill(page);
  await submit(page);
  await expect(page.locator('#enquiry button[type=submit]')).toBeDisabled();
  await page.locator('#enquiry button[type=submit]').click({ force: true }).catch(() => {});
  release();
  await expect(page.locator('#sent')).toBeVisible();
  expect(count).toBe(1);
});

test('spam: a filled honeypot sends nothing', async ({ page }) => {
  let posted = 0;
  await page.route(API, (r) => { posted++; r.fulfill({ status: 200, json: { success: true } }); });
  await open(page);
  await fill(page);
  await page.locator('input[name=botcheck]').evaluate((el) => { el.value = 'http://spam.example'; });
  await submit(page);
  await expect(page.locator('#sent')).toBeVisible();
  expect(posted).toBe(0);
});

test('no access key yet: falls back to the visitor\'s mail app', async ({ page }) => {
  let posted = 0;
  await page.route(API, (r) => { posted++; r.fulfill({ status: 200, json: { success: true } }); });
  await open(page, { key: '' });
  await fill(page);
  await submit(page);
  await expect(page.locator('#f-status')).toContainText('Atvērām e-pasta vēstuli');
  expect(posted).toBe(0);
});
