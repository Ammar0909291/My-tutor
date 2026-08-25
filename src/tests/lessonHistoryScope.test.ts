/**
 * PHASE C — LESSON-SCOPED MODEL HISTORY.
 *
 * Phase B isolated per-attempt STATE and proved it live. This closes the other
 * channel: what the model can READ. Measured live on 2026-08-25, with Phase B
 * fully in force, a learner left an RMS-voltage question in one lesson, opened
 * a kinematics lesson, typed "230 V", and the tutor said "Correct! 230 volts is
 * the RMS value for a 325-volt peak sine wave." Nothing was graded, no counter
 * moved — and the lesson was still incoherent.
 *
 * The five required regression categories are the five describe blocks below,
 * plus a sixth that pins the one mistake this change could make silently.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'
import { scopeHistoryToLesson } from '@/lib/teaching/lessonHistoryScope'
import { lessonKeyFor } from '@/lib/teaching/lessonAttempt'

const A = 'phys.em.ac-basics'          // lesson A
const B = 'phys.mech.kinematics-1d'    // lesson B

type Row = { role: 'USER' | 'ASSISTANT'; content: string; lessonKey?: string | null }

const msg = (role: Row['role'], content: string, lessonKey: string | null | undefined): Row =>
  ({ role, content, lessonKey })

/** Newest-first, exactly as the Prisma query returns them. */
const NEWEST_FIRST: Row[] = [
  msg('USER', '230 V', B),
  msg('ASSISTANT', 'Welcome to Kinematics in One Dimension', B),
  msg('ASSISTANT', 'What is the RMS voltage of a 325 V peak sinusoid?', A),
  msg('USER', 'yes I follow', A),
  msg('ASSISTANT', 'The peak voltage is the tallest point the sinusoid reaches', A),
]

// ═══════════════════════════════════════════════════════════════════════════
// 1. CROSS-LESSON LEAKAGE
// ═══════════════════════════════════════════════════════════════════════════
describe('cross-lesson leakage', () => {
  it('REPRODUCES IT: unscoped, the RMS question reaches a kinematics prompt', () => {
    const unscoped = scopeHistoryToLesson(NEWEST_FIRST, null)
    expect(unscoped.messages.map((m) => m.content).join(' ')).toContain('RMS voltage')
  })

  it('FIXES IT: scoped to lesson B, no lesson A turn survives', () => {
    const r = scopeHistoryToLesson(NEWEST_FIRST, B)
    expect(r.reason).toBe('scoped')
    expect(r.messages).toHaveLength(2)
    expect(r.messages.every((m) => m.lessonKey === B)).toBe(true)
    expect(r.messages.map((m) => m.content).join(' ')).not.toContain('RMS')
    expect(r.dropped).toBe(3)
  })

  it('the learner\'s own foreign-lesson turns go too — both roles are scoped', () => {
    // "yes I follow" was a USER turn in lesson A. A filter that only scoped
    // assistant turns would leave the learner appearing to have said things in
    // a lesson they had not opened.
    const r = scopeHistoryToLesson(NEWEST_FIRST, B)
    expect(r.messages.some((m) => m.content === 'yes I follow')).toBe(false)
  })

  it('an alternating A/B/A/B session keeps only B', () => {
    const rows = [
      msg('USER', 'b2', B), msg('ASSISTANT', 'a2', A),
      msg('USER', 'b1', B), msg('ASSISTANT', 'a1', A),
    ]
    const r = scopeHistoryToLesson(rows, B)
    expect(r.messages.map((m) => m.content)).toEqual(['b2', 'b1'])
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 2. UNTAGGED LEGACY MESSAGES
// ═══════════════════════════════════════════════════════════════════════════
describe('untagged legacy messages', () => {
  // TRACED AGAINST PRODUCTION before this behaviour was chosen: untagged is a
  // legacy CLIFF (100% on/before 2026-08-12, ~0% after), and of 290 sessions
  // containing untagged rows, 282 (97.2%) have ZERO lessonKeys at all — so
  // there is no attempt window, no tagged neighbour and no sole lesson to
  // associate them by. They are excluded rather than guessed at.
  const legacy: Row[] = [
    msg('USER', 'new turn in lesson B', B),
    msg('ASSISTANT', 'old untagged reply', null),
    msg('USER', 'old untagged question', undefined),
  ]

  it('are EXCLUDED when a lesson key resolves — never guessed into the lesson', () => {
    const r = scopeHistoryToLesson(legacy, B)
    expect(r.messages).toHaveLength(1)
    expect(r.messages[0].content).toBe('new turn in lesson B')
    expect(r.droppedUntagged).toBe(2)
  })

  it('null and undefined are treated identically — both mean "no identity"', () => {
    expect(scopeHistoryToLesson([msg('USER', 'x', null)], B).messages).toHaveLength(0)
    expect(scopeHistoryToLesson([msg('USER', 'x', undefined)], B).messages).toHaveLength(0)
    expect(scopeHistoryToLesson([msg('USER', 'x', '')], B).messages).toHaveLength(0)
  })

  it('an entirely-legacy session yields an EMPTY window, and that is correct', () => {
    // The 97.2% case. An empty prompt history is the same shape as a freshly
    // opened lesson — the system prompt still carries lessonCtx and the
    // snapshot still carries the ladder. Admitting them is the bug.
    const allLegacy = [msg('USER', 'a', null), msg('ASSISTANT', 'b', null)]
    const r = scopeHistoryToLesson(allLegacy, B)
    expect(r.messages).toEqual([])
    expect(r.dropped).toBe(2)
    expect(r.droppedUntagged).toBe(2)
  })

  it('counts untagged drops SEPARATELY from foreign-lesson drops', () => {
    // Conflating them would hide a regression in the write path behind a
    // legacy number that is expected to be non-zero.
    const mixed = [msg('USER', 'keep', B), msg('USER', 'foreign', A), msg('USER', 'legacy', null)]
    const r = scopeHistoryToLesson(mixed, B)
    expect(r.dropped).toBe(2)
    expect(r.droppedUntagged).toBe(1)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 3. SAME-LESSON CONTINUITY  (the negative control — nothing may be lost)
// ═══════════════════════════════════════════════════════════════════════════
describe('same-lesson continuity', () => {
  const sameLesson: Row[] = [
    msg('USER', 'turn 5', B), msg('ASSISTANT', 'turn 4', B),
    msg('USER', 'turn 3', B), msg('ASSISTANT', 'turn 2', B),
    msg('USER', 'turn 1', B),
  ]

  it('an ordinary turn inside one lesson loses NOTHING', () => {
    const r = scopeHistoryToLesson(sameLesson, B)
    expect(r.messages).toEqual(sameLesson)
    expect(r.dropped).toBe(0)
    expect(r.droppedUntagged).toBe(0)
  })

  it('order is preserved exactly — the array is filtered, never re-sorted', () => {
    const r = scopeHistoryToLesson(sameLesson, B)
    expect(r.messages.map((m) => m.content)).toEqual(['turn 5', 'turn 4', 'turn 3', 'turn 2', 'turn 1'])
  })

  it('the input array is never mutated', () => {
    const input = [...sameLesson]
    scopeHistoryToLesson(input, B)
    expect(input).toEqual(sameLesson)
  })

  it('a resume mid-lesson keeps the whole lesson — this is Phase B\'s guarantee', () => {
    // Phase B proved a refresh keeps the pending MCQ so the answer still
    // grades. That is worthless if the model loses the question's own text.
    const r = scopeHistoryToLesson(sameLesson, B)
    expect(r.messages).toHaveLength(5)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 4. LESSON SWITCHING
// ═══════════════════════════════════════════════════════════════════════════
describe('lesson switching', () => {
  it('the window follows the switch — the same array scopes to A or to B', () => {
    expect(scopeHistoryToLesson(NEWEST_FIRST, A).messages).toHaveLength(3)
    expect(scopeHistoryToLesson(NEWEST_FIRST, B).messages).toHaveLength(2)
  })

  it('switching BACK recovers the original lesson\'s history', () => {
    // Nothing is deleted — this is a read-time filter, so a learner returning
    // to lesson A finds lesson A's turns intact.
    const back = scopeHistoryToLesson(NEWEST_FIRST, A)
    expect(back.messages.map((m) => m.content)).toContain('What is the RMS voltage of a 325 V peak sinusoid?')
  })

  it('the newest-30 cap cannot starve the current lesson', () => {
    // The 30 are the NEWEST and the current lesson's turns are by construction
    // the newest, so the filter can only ever remove OLDER foreign turns.
    const window = [
      ...Array.from({ length: 5 }, (_, i) => msg('USER', `b${i}`, B)),
      ...Array.from({ length: 25 }, (_, i) => msg('USER', `a${i}`, A)),
    ]
    const r = scopeHistoryToLesson(window, B)
    expect(r.messages).toHaveLength(5)
    expect(r.messages.every((m) => m.lessonKey === B)).toBe(true)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 5. FRESH LESSONS
// ═══════════════════════════════════════════════════════════════════════════
describe('fresh lessons', () => {
  it('a lesson with no history yet gets an empty window, not another lesson\'s', () => {
    const onlyA = [msg('USER', 'a1', A), msg('ASSISTANT', 'a0', A)]
    expect(scopeHistoryToLesson(onlyA, B).messages).toEqual([])
  })

  it('a brand-new session (no messages) is unaffected either way', () => {
    expect(scopeHistoryToLesson([], B).messages).toEqual([])
    expect(scopeHistoryToLesson([], null).messages).toEqual([])
  })

  it('the very first turn of a fresh lesson carries no foreign context at all', () => {
    const r = scopeHistoryToLesson(NEWEST_FIRST, 'phys.opt.lenses')
    expect(r.messages).toEqual([])
    expect(r.dropped).toBe(5)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 6. THE CONSERVATIVE FALLBACK, and the mistake this change could make silently
// ═══════════════════════════════════════════════════════════════════════════
describe('the conservative fallback', () => {
  it('an unresolvable lesson key scopes NOTHING — behaviour is unchanged', () => {
    // School Mode, a subject with no curriculum grain, a learner with no
    // StudentProgress row. Same rule as the restore route's
    // `...(lessonKey ? { lessonKey } : {})`.
    const r = scopeHistoryToLesson(NEWEST_FIRST, null)
    expect(r.reason).toBe('unscoped-no-lesson-key')
    expect(r.messages).toEqual(NEWEST_FIRST)
    expect(r.dropped).toBe(0)
  })

  it('an empty-string key is unresolvable, not a key that matches nothing', () => {
    expect(scopeHistoryToLesson(NEWEST_FIRST, '').messages).toEqual(NEWEST_FIRST)
  })
})

describe('the key must match the WRITERS, or every turn gets an empty history', () => {
  const CHAT = readFileSync(path.join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

  it('all three sites resolve the key from activeLessonSlug ?? currentLesson', () => {
    // The user stamp, the assistant write, and now the history scope. A
    // mismatch would not fail loudly — it would silently starve every prompt.
    // This is the exact "two readers of one owner disagreeing about the key"
    // failure Phase B fixed twice, and no type can catch it.
    const sites = CHAT.match(
      /lessonKeyFor\w*\(\{\s*\n?\s*topicSlug: studentProgress\?\.activeLessonSlug \?\? null,\s*\n?\s*lessonOrder: studentProgress\?\.currentLesson \?\? null,?\s*\n?\s*\}\)/g,
    ) ?? []
    expect(sites.length).toBe(3)
  })

  it('the history scope does NOT reuse Phase B\'s pending-question key', () => {
    // `lessonKeyThisTurnHoisted` is built from `resolvedConceptId`, a different
    // expression for a different job. Using it here would compare against
    // values no writer ever wrote.
    expect(CHAT).not.toMatch(/scopeHistoryToLesson\(\s*[\s\S]{0,120}?lessonKeyThisTurnHoisted/)
    expect(CHAT).toMatch(/scopeHistoryToLesson\(\s*\n?\s*\[\.\.\.learnSession\.messages\][\s\S]{0,90}?historyLessonKey,/)
  })

  it('and the SAME identity function the restore route uses', () => {
    const RESTORE = readFileSync(path.join(process.cwd(), 'src/app/api/sessions/history/route.ts'), 'utf8')
    expect(RESTORE).toMatch(/lessonKeyFor\(\{ topicSlug: sp\.activeLessonSlug, lessonOrder: sp\.currentLesson \}\)/)
    expect(typeof lessonKeyFor).toBe('function')
  })

  it('only the PROMPT reader is scoped — the session-level readers are untouched', () => {
    // Eleven other readers of learnSession.messages reason about the SESSION
    // (episode boundary, latency, prose checks). Narrowing the query would
    // change all of them; this asserts the query stayed session-wide.
    expect(CHAT).toMatch(/messages: \{ orderBy: \{ createdAt: 'desc' \}, take: HISTORY_LIMIT \}/)
    expect(CHAT).toMatch(/const lastMessageAtMs = learnSession\.messages\[0\]\?\.createdAt/)
  })
})
