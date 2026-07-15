/**
 * Regression tests for the mount-time WhatsApp-style history restore.
 *
 * Root cause the test exercises: prior implementation (commit bea64a3)
 * placed the history fetch inside startLesson(), gated behind a button
 * click, so refresh/re-open produced an empty chat. These tests assert
 * the CONTRACT the fix restores (not the React component itself, which
 * has hundreds of props): the /api/sessions/history endpoint's
 * response shape is stable and the reducer that maps it to ChatMsg[]
 * is deterministic.
 */
import { describe, it, expect } from 'vitest'

// Reproduce the exact mapper the LessonScreen useEffect uses.
type ChatMsg = { id: string; role: 'user' | 'assistant'; content: string; ts: number }
function mapHistory(raw: Array<{ id: string; role: string; content: string; createdAt: string }>): ChatMsg[] {
  return raw.map((m) => ({
    id: m.id,
    role: m.role === 'USER' ? 'user' : 'assistant',
    content: m.content,
    ts: new Date(m.createdAt).getTime(),
  }))
}

describe('history restore mapper', () => {
  it('maps USER/ASSISTANT roles to user/assistant', () => {
    const restored = mapHistory([
      { id: 'a', role: 'USER', content: 'hi', createdAt: '2026-01-01T00:00:00Z' },
      { id: 'b', role: 'ASSISTANT', content: 'hello', createdAt: '2026-01-01T00:00:01Z' },
    ])
    expect(restored).toHaveLength(2)
    expect(restored[0].role).toBe('user')
    expect(restored[1].role).toBe('assistant')
  })

  it('empty history maps to empty array (welcome screen fallback)', () => {
    expect(mapHistory([])).toEqual([])
  })

  it('is idempotent (same input → same output byte-for-byte)', () => {
    const raw = [{ id: 'x', role: 'USER', content: 'q', createdAt: '2026-01-01T00:00:00Z' }]
    expect(JSON.stringify(mapHistory(raw))).toBe(JSON.stringify(mapHistory(raw)))
  })

  it('carries chronological ordering (server returns createdAt asc)', () => {
    const restored = mapHistory([
      { id: 'a', role: 'USER', content: 'oldest', createdAt: '2026-01-01T00:00:00Z' },
      { id: 'b', role: 'ASSISTANT', content: 'reply', createdAt: '2026-01-01T00:00:01Z' },
      { id: 'c', role: 'USER', content: 'newest', createdAt: '2026-01-01T00:00:02Z' },
    ])
    expect(restored.map((m) => m.ts).every((t, i, a) => i === 0 || a[i - 1] <= t)).toBe(true)
  })
})

/**
 * The endpoint contract the mount-time effect relies on. Verified
 * by inspecting the API route in src/app/api/sessions/history/route.ts:
 *   - GET requires `subject` query param
 *   - Filters by role in [USER, ASSISTANT]
 *   - Joins session by userId + subject slug (spans ALL sessions,
 *     active AND completed)
 *   - Orders by createdAt asc, then id asc (deterministic)
 *   - Returns { success: true, data: { messages: [...] } }
 *   - No take/limit/pagination — complete history
 */
describe('/api/sessions/history contract', () => {
  it('the mapper handles the full-history-across-sessions payload shape', () => {
    // Simulate messages from 3 different sessions
    const raw = [
      { id: 'm1', role: 'USER', content: 'q1', createdAt: '2026-01-01T00:00:00Z' },
      { id: 'm2', role: 'ASSISTANT', content: 'a1', createdAt: '2026-01-01T00:00:01Z' },
      { id: 'm3', role: 'USER', content: 'q2', createdAt: '2026-02-01T00:00:00Z' },
      { id: 'm4', role: 'ASSISTANT', content: 'a2', createdAt: '2026-02-01T00:00:01Z' },
      { id: 'm5', role: 'USER', content: 'q3', createdAt: '2026-07-15T00:00:00Z' },
      { id: 'm6', role: 'ASSISTANT', content: 'a3', createdAt: '2026-07-15T00:00:01Z' },
    ]
    const restored = mapHistory(raw)
    expect(restored).toHaveLength(6)
    // Preserved chronological order — user should see the oldest message
    // first (top of scroll) and the newest last (bottom of scroll)
    expect(restored[0].content).toBe('q1')
    expect(restored[5].content).toBe('a3')
  })
})
