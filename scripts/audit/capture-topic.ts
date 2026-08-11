/**
 * ONE SCREENSHOT PER AUDITED TOPIC — the learner's actual screen.
 *
 * The API transcript proves what the tutor SAID. It cannot show what the
 * learner SEES: whether a figure rendered, whether it sits beside the right
 * message, whether the layout holds. This drives the real browser against real
 * production, signs in through the real login form, opens the topic, and saves
 * the page.
 *
 *   npx tsx scripts/audit/capture-topic.ts <conceptId> "<probe>"
 *
 * Credentials come from env (AUDIT_EMAIL / AUDIT_PASSWORD) — never hardcoded,
 * so this file is safe to commit.
 */
import { chromium } from 'playwright'
import path from 'path'

const BASE = process.env.AUDIT_BASE ?? 'https://my-tutor-flame.vercel.app'
const EMAIL = process.env.AUDIT_EMAIL ?? ''
const PASSWORD = process.env.AUDIT_PASSWORD ?? ''
const OUT = path.resolve('docs/audits/screenshots')

async function main() {
  const [conceptId, probe] = process.argv.slice(2)
  if (!conceptId || !EMAIL || !PASSWORD) {
    console.error('usage: capture-topic.ts <conceptId> ["<probe>"]  (needs AUDIT_EMAIL/AUDIT_PASSWORD)')
    process.exit(1)
  }

  // The image is pre-installed at PLAYWRIGHT_BROWSERS_PATH; this npm copy of
  // playwright reports a different build number and would otherwise demand a
  // download that the sandbox must not perform. Point it at the real binary.
  // Outbound HTTPS in this sandbox goes through an egress proxy whose CA is
  // already in the browser NSS store, so TLS verification stays ON — the
  // browser only needs to be told to use the proxy. Without this, navigation
  // fails with ERR_CONNECTION_RESET.
  const proxyServer = process.env.HTTPS_PROXY ?? process.env.https_proxy
  const browser = await chromium.launch({
    executablePath: process.env.AUDIT_CHROME ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    ...(proxyServer ? { proxy: { server: proxyServer } } : {}),
    args: [
      // Chromium otherwise fires background requests (variations, component
      // updater) that the egress proxy rejects as non-CONNECT, which shows up
      // in its relay-failure log and can disturb the first navigation.
      '--disable-background-networking',
      '--disable-component-update',
      '--no-first-run',
      ...(proxyServer ? [`--proxy-server=${proxyServer}`] : []),
    ],
  })
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  const page = await ctx.newPage()

  try {
    await page.goto(`${BASE}/auth/login`, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await page.fill('input[type="email"], input[name="email"]', EMAIL)
    await page.fill('input[type="password"], input[name="password"]', PASSWORD)
    await page.click('button[type="submit"]')
    await page.waitForURL((u) => !u.pathname.includes('/auth/login'), { timeout: 60000 }).catch(() => {})
    console.log('after login:', page.url())

    await page.goto(`${BASE}/learn?subject=physics`, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await page.waitForTimeout(10000)

    if (probe) {
      const box = page.locator('textarea').first()
      if (await box.count()) {
        await box.fill(probe)
        await page.keyboard.press('Enter')
        await page.waitForTimeout(35000)
      } else {
        console.log('no composer found — captured without a probe')
      }
    }

    const file = path.join(OUT, `${conceptId}.png`)
    await page.screenshot({ path: file, fullPage: false })
    console.log('saved', file)
  } finally {
    await browser.close()
  }
}
main().catch((e) => { console.error('capture failed:', e.message); process.exit(1) })
