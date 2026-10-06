/**
 * BIO-042 / CHEM-148 (2026-10-06, owner-approved fix): with sessionStorage
 * unavailable (private mode) getTabId() returned null, the server resumed the
 * newest session, and simultaneously open lessons were taught one lesson.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'

function fakeWindow(opts: { storage: boolean; name?: string }) {
  const store = new Map<string, string>()
  const w: Record<string, unknown> = {
    name: opts.name ?? '',
    sessionStorage: opts.storage
      ? { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => { store.set(k, v) } }
      : { getItem: () => { throw new Error('SecurityError') }, setItem: () => { throw new Error('SecurityError') } },
  }
  vi.stubGlobal('window', w)
  return w
}

describe('getTabId without storage', () => {
  beforeEach(() => { vi.unstubAllGlobals(); vi.resetModules() })

  it('storage available: unchanged behaviour (sessionStorage id, stable)', async () => {
    fakeWindow({ storage: true })
    const { getTabId } = await import('@/lib/teaching/tabIdentity')
    const a = getTabId()
    expect(a).toBeTruthy()
    expect(getTabId()).toBe(a)
  })

  it('private mode: an id is still returned, kept in window.name, and survives a reload', async () => {
    const w = fakeWindow({ storage: false })
    const first = (await import('@/lib/teaching/tabIdentity')).getTabId()
    expect(first).toBeTruthy()
    expect(w.name).toBe(`mytutor:tab:${first}`)
    // "Reload": fresh module, same window.name.
    vi.resetModules()
    fakeWindow({ storage: false, name: String(w.name) })
    expect((await import('@/lib/teaching/tabIdentity')).getTabId()).toBe(first)
  })

  it('two private-mode tabs get two different ids', async () => {
    fakeWindow({ storage: false })
    const a = (await import('@/lib/teaching/tabIdentity')).getTabId()
    vi.resetModules()
    fakeWindow({ storage: false })
    const b = (await import('@/lib/teaching/tabIdentity')).getTabId()
    expect(a).not.toBe(b)
  })

  it('never overwrites a window.name set by something else', async () => {
    const w = fakeWindow({ storage: false, name: 'other-app' })
    const { getTabId } = await import('@/lib/teaching/tabIdentity')
    const a = getTabId()
    expect(a).toBeTruthy()
    expect(w.name).toBe('other-app')
    expect(getTabId()).toBe(a)
  })
})
