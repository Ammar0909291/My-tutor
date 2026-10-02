/**
 * Installed-app / favicon branding must be able to change. 2026-10-02: after the mascot rebrand the
 * "Open in app" icon, taskbar icon and installed-window icon still showed the old purple eagle,
 * because public/sw.js served /manifest.json and /icons/* CACHE-FIRST ("they never change") from a
 * cache named ...-v2 — so browsers that already had the worker never saw the new files. Guards:
 * the cache was bumped, icons/manifest are network-first, and the icon files carry new names.
 */
import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

const ROOT = join(__dirname, '..', '..')
const SW = readFileSync(join(ROOT, 'public/sw.js'), 'utf8')
const MANIFEST = JSON.parse(readFileSync(join(ROOT, 'public/manifest.json'), 'utf8'))
const LAYOUT = readFileSync(join(ROOT, 'src/app/layout.tsx'), 'utf8')

describe('service worker cannot pin stale branding', () => {
  it('the static cache was bumped past v2 (activate deletes every other cache name)', () => {
    expect(SW).not.toContain("'my-tutor-static-v2'")
    expect(SW).toMatch(/const CACHE_NAME = 'my-tutor-static-v(\d+)'/)
    expect(Number(SW.match(/static-v(\d+)'/)![1])).toBeGreaterThanOrEqual(3)
    expect(SW).toContain('keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))')
  })

  it('icons and manifest are network-first with the cache only as an offline fallback', () => {
    const i = SW.indexOf("url.pathname.startsWith('/icons/')")
    const block = SW.slice(i, SW.indexOf('\n  }\n', i))
    expect(block).toContain('fetch(event.request)')
    expect(block).toContain('.catch(() => caches.match(event.request))')
    expect(block).not.toMatch(/caches\.match\(event\.request\)\.then\(\(cached\) => cached \|\| fetch/)
  })
})

describe('manifest + icon files', () => {
  it('every manifest icon exists on disk, with any + maskable purposes, under the new mascot-* names', () => {
    const purposes = new Set<string>()
    for (const ic of MANIFEST.icons) {
      expect(existsSync(join(ROOT, 'public', ic.src)), ic.src).toBe(true)
      expect(ic.src).toMatch(/\/icons\/mascot-/)
      purposes.add(ic.purpose)
    }
    expect([...purposes].sort()).toEqual(['any', 'maskable'])
  })

  it('the service worker precaches exactly files that exist, and the apple-touch-icon points at one', () => {
    for (const m of SW.matchAll(/'(\/icons\/[^']+)'/g)) expect(existsSync(join(ROOT, 'public', m[1])), m[1]).toBe(true)
    const apple = LAYOUT.match(/rel="apple-touch-icon" href="([^"]+)"/)![1]
    expect(existsSync(join(ROOT, 'public', apple)), apple).toBe(true)
  })

  it('manifest colours are the chalkboard palette, not the old dark-blue / coral', () => {
    expect(MANIFEST.background_color).toBe('#1B1712')
    expect(MANIFEST.theme_color).toBe('#1E2B24')
  })
})
