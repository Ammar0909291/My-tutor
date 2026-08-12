/**
 * Screenshot a LOCAL html file with the pre-installed Chromium.
 *
 * ── WHY THIS EXISTS ─────────────────────────────────────────────────────────
 * The corpus audit recorded "screenshots are blocked" for days: Chromium fails
 * `net::ERR_CONNECTION_RESET` on EVERY host through the sandbox's egress proxy
 * — verified against example.com, so not app-specific, and never worked around
 * by disabling TLS verification.
 *
 * That blocker was recorded too broadly. Only the NETWORK is blocked. Rendering
 * is fine, so `file://` works, and that is enough to see a real figure: capture
 * the turn over HTTP (curl reaches production normally), write the payload into
 * a local page, and screenshot that.
 *
 * ── WHAT THIS IS AND IS NOT ─────────────────────────────────────────────────
 * NOT a screenshot of the running app — it cannot drive the real UI, so it
 * cannot show layout, theming, or whether a figure sits beside the right
 * message. Those remain blocked and are still worth doing from a machine with
 * ordinary internet (`scripts/audit/capture-topic.ts`).
 *
 * It IS enough to see the real tutor text and the real figure payload as drawn.
 * Label anything produced this way accordingly; it is a faithful reproduction,
 * not the product's own screen.
 *
 * ── NOTES ───────────────────────────────────────────────────────────────────
 * `executablePath` is pinned because the npm default path is stale in this
 * image (it resolves to `chromium_headless_shell-1228`, which is absent, while
 * `chromium-1194` is installed). `--no-sandbox` is required as root.
 *
 * Usage:
 *   node scripts/audit/shot.mjs <abs-html-path> <abs-png-path> [width] [height]
 */
import { chromium } from 'playwright'

const [, , htmlPath, outPath, w = '1000', h = '760'] = process.argv

if (!htmlPath || !outPath) {
  console.error('usage: node scripts/audit/shot.mjs <abs-html> <abs-png> [w] [h]')
  process.exit(1)
}

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox'],
})
const page = await browser.newPage({
  viewport: { width: Number(w), height: Number(h) },
  // 2× so text in the PNG is legible when read back at normal size.
  deviceScaleFactor: 2,
})
await page.goto('file://' + htmlPath, { waitUntil: 'load', timeout: 20000 })
// Small settle for webfont/layout; the page is static so this is sufficient.
await page.waitForTimeout(400)
await page.screenshot({ path: outPath, fullPage: true })
await browser.close()
console.log('shot ->', outPath)
