/**
 * Where a real Chromium lives, for the browser-level regression tests. PW_CHROMIUM_PATH, /opt/pw-browsers/chromium
 * (the cloud QA image), or Playwright's own install. `null` = none: the browser suites SKIP with a warning, unless
 * REQUIRE_BROWSER_TESTS=1 (this repo's QA runs set it), which makes a missing browser a failure instead of a silent skip.
 */
import { existsSync } from 'node:fs'
import { chromium } from 'playwright'

export function findChromium(): string | null {
  const candidates = [process.env.PW_CHROMIUM_PATH, '/opt/pw-browsers/chromium']
  try { candidates.push(chromium.executablePath()) } catch { /* no playwright install */ }
  return candidates.find((p): p is string => !!p && existsSync(p)) ?? null
}
export const REQUIRE_BROWSER = process.env.REQUIRE_BROWSER_TESTS === '1'
