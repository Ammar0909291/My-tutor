/**
 * PCD-004A — the browser tab's own identity.
 *
 * WHY sessionStorage AND NOT localStorage. `sessionStorage` is scoped to ONE
 * tab by definition: a second tab gets its own store, which is exactly the
 * distinction the session-resume rule needs. `localStorage` is shared across
 * every tab of the browser profile and so cannot make it. The cost is that a
 * tab id dies when the tab closes — which is precisely why the server treats
 * it as a resume PREFERENCE and not a filter (see chooseResumableSession): a
 * reopened tab finds its old session unclaimed and takes it over, so the 24h
 * conversation is not lost.
 *
 * WHAT IT IS NOT. It is not a credential and carries no authority. The server
 * decides ownership from the authenticated userId, exactly as before; this
 * only breaks the tie between several of that user's own resumable sessions.
 * A forged or repeated value can therefore do nothing except make two tabs
 * behave as one, i.e. the pre-PCD-004A behaviour.
 *
 * TOTAL: private mode, disabled storage and a partial `crypto` all degrade to
 * a usable id (or to `null`, which the server reads as "no preference").
 */
const KEY = 'mytutor:tabId'

function randomId(): string {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID()
    }
    if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
      const b = new Uint8Array(16)
      crypto.getRandomValues(b)
      return Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('')
    }
  } catch { /* fall through */ }
  return `t${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`
}

/**
 * This tab's id, minted once and reused for the tab's lifetime (including
 * across refreshes, which is what keeps a refresh a RESUME rather than a new
 * session). Returns null only when there is no usable storage at all, and the
 * server then behaves exactly as it did before this existed.
 */
export function getTabId(): string | null {
  if (typeof window === 'undefined') return null
  try {
    const existing = window.sessionStorage.getItem(KEY)
    if (existing && existing.trim() !== '') return existing
    const fresh = randomId()
    window.sessionStorage.setItem(KEY, fresh)
    return fresh
  } catch {
    // Private mode / storage disabled. Deliberately NOT falling back to an
    // in-memory id: that would be regenerated on every refresh, so a refresh
    // would stop matching its own session and would silently start creating a
    // new one each time — worse than having no preference at all.
    return null
  }
}
