import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { buildVisualContractBlock } from '@/lib/teaching/visual/visualContract'
import {
  decideContinuity, isExplicitTopicRequest, isReturnRequest, looksLikeAnswer,
  MAX_EXCURSION_TURNS, parseVisualSession, type VisualSession,
} from '@/lib/teaching/visual/session'

const LESSON = 'phys.therm.calorimetry'

/** Drive a multi-turn conversation exactly as the chat route does. */
function replay(turns: { msg: string; asked?: boolean }[], lessonConceptId: string | null = LESSON) {
  let session: VisualSession | null = null
  return turns.map(({ msg, asked }) => {
    const decision = resolveVisual({
      message: msg,
      lessonConceptId,
      subject: 'physics',
      activeSession: session,
      lastAssistantAskedQuestion: asked ?? false,
    })
    session = decision.session
    return decision
  })
}

// ── THE production conversation, end to end ──────────────────────────────────
// Reported failure: the tutor asked "What tells us the magnitude?", the learner
// answered "The starting point.", and the visual switched from the 3D Vector
// visualization to Geometry Shapes mid-correction.
describe('Visual continuity — the reported production conversation', () => {
  it('holds the vector figure through question, answer, correction and follow-up', () => {
    const [start, answer, correction, followUp, ret] = replay([
      { msg: 'Teach me vector with diagram' },
      { msg: 'The starting point.', asked: true },        // ← the bug turn
      { msg: 'ok why is that wrong?', asked: true },
      { msg: 'so the arrow length is the magnitude?', asked: true },
      { msg: 'got it, back to the lesson' },
    ])

    // 1. Excursion opens on a vector figure.
    expect(start.representation).toBe('vector')
    expect(start.excursion).toBe(true)
    expect(start.graphical).toBe(true)

    // 2. THE FIX: answering a question must not move the figure.
    expect(answer.conceptId).toBe(start.conceptId)
    expect(answer.representation).toBe('vector')
    expect(answer.continuityReason).toBe('learner-answering-not-requesting')

    // 3. and 4. Corrections and follow-ups keep it too.
    expect(correction.representation).toBe('vector')
    expect(followUp.representation).toBe('vector')
    expect(followUp.conceptId).toBe(start.conceptId)

    // 5. Only an explicit return ends the excursion.
    expect(ret.conceptId).toBe(LESSON)
    expect(ret.excursion).toBe(false)
    expect(ret.continuityReason).toBe('learner-requested-return')
  })

  it('never renders geometry at any point in that conversation', () => {
    const decisions = replay([
      { msg: 'Teach me vector with diagram' },
      { msg: 'The starting point.', asked: true },
      { msg: 'the point where it starts', asked: true },
      { msg: 'is it the length of the line?', asked: true },
    ])
    for (const d of decisions) {
      expect(d.representation).toBe('vector')
      expect(d.graphical).toBe(true)
    }
  })

  it('regression guard: bare per-turn resolution WOULD have switched', () => {
    // Without an active session the answer resolves to a different concept —
    // this is precisely the production defect, pinned so it cannot return.
    const stateless = resolveVisual({ message: 'The starting point.', lessonConceptId: LESSON })
    expect(stateless.representation).not.toBe('vector')
    // With continuity, the same message holds.
    const [, held] = replay([
      { msg: 'Teach me vector with diagram' },
      { msg: 'The starting point.', asked: true },
    ])
    expect(held.representation).toBe('vector')
  })
})

// ── switching rules ──────────────────────────────────────────────────────────
describe('Visual continuity — when the figure IS allowed to change', () => {
  it('an explicit new-topic request switches the figure', () => {
    const [, switched] = replay([
      { msg: 'Teach me vector with diagram' },
      { msg: 'now teach me about triangles instead' },
    ])
    expect(switched.representation).not.toBe('vector')
    expect(switched.continuityReason).toBe('explicit-new-topic-request')
  })

  it('an incidental concept mention inside a reply does NOT switch', () => {
    const [, held] = replay([
      { msg: 'Teach me vector with diagram' },
      { msg: 'is that like a triangle', asked: true },
    ])
    expect(held.representation).toBe('vector')
  })

  it('a lesson change drops a stale excursion', () => {
    let session: VisualSession | null = null
    session = resolveVisual({ message: 'Teach me vector with diagram', lessonConceptId: LESSON }).session
    const afterNav = resolveVisual({
      message: 'ok', lessonConceptId: 'phys.mech.newtons-first-law',
      activeSession: session, lastAssistantAskedQuestion: true,
    })
    expect(afterNav.continuityReason).toBe('lesson-changed')
    expect(afterNav.conceptId).toBe('phys.mech.newtons-first-law')
  })

  it('the excursion turn limit is a safety valve, not a teaching rule', () => {
    const stale: VisualSession = {
      conceptId: 'math.linalg.vector', representation: 'vector', renderer: 'card',
      returnToConceptId: LESSON, turns: MAX_EXCURSION_TURNS,
    }
    const action = decideContinuity({
      session: stale, message: 'mhm', lessonConceptId: LESSON,
      requestedConceptId: null, lastAssistantAskedQuestion: true,
    })
    expect(action.kind).toBe('switch')
    if (action.kind === 'switch') expect(action.reason).toBe('excursion-turn-limit')
  })

  it('turn counter advances while a figure is held', () => {
    const decisions = replay([
      { msg: 'Teach me vector with diagram' },
      { msg: 'yes', asked: true },
      { msg: 'ok', asked: true },
    ])
    expect(decisions[0].session?.turns).toBe(0)
    expect(decisions[1].session?.turns).toBe(1)
    expect(decisions[2].session?.turns).toBe(2)
  })
})

// ── request predicates ───────────────────────────────────────────────────────
describe('Visual continuity — request detection', () => {
  it('recognises genuine topic requests', () => {
    for (const m of ['teach me vectors', 'show me a diagram of forces', 'what is a triangle',
                     'explain momentum', 'can you teach me fractions', 'switch to geometry']) {
      expect(isExplicitTopicRequest(m), m).toBe(true)
    }
  })

  it('does NOT treat answers or reactions as topic requests', () => {
    for (const m of ['The starting point.', 'yes', 'i think so', 'the arrow', 'point',
                     'because it is longer', 'hmm not sure']) {
      expect(isExplicitTopicRequest(m), m).toBe(false)
    }
  })

  it('recognises return requests', () => {
    for (const m of ['back to the lesson', 'go back', 'lets get back', 'continue the lesson']) {
      expect(isReturnRequest(m), m).toBe(true)
    }
  })

  it('classifies short replies after a question as answers', () => {
    expect(looksLikeAnswer('The starting point.', true)).toBe(true)
    expect(looksLikeAnswer('teach me triangles', true)).toBe(false)
    // With no outstanding question, a short message is not assumed to be an answer.
    expect(looksLikeAnswer('The starting point.', false)).toBe(false)
  })
})

// ── persistence round-trip ───────────────────────────────────────────────────
describe('Visual continuity — snapshot persistence', () => {
  it('survives a JSON round-trip through contextSnapshot', () => {
    const d = resolveVisual({ message: 'Teach me vector with diagram', lessonConceptId: LESSON })
    const revived = parseVisualSession(JSON.parse(JSON.stringify(d.session)))
    expect(revived).toEqual(d.session)
  })

  it('rejects malformed persisted state instead of trusting it', () => {
    expect(parseVisualSession(null)).toBeNull()
    expect(parseVisualSession({})).toBeNull()
    expect(parseVisualSession({ conceptId: '' })).toBeNull()
    expect(parseVisualSession('nonsense')).toBeNull()
  })

  it('a held turn is announced to the tutor as continuity, not a new figure', () => {
    const [, held] = replay([
      { msg: 'Teach me vector with diagram' },
      { msg: 'The starting point.', asked: true },
    ])
    const block = buildVisualContractBlock(held)
    expect(block).toContain('CONTINUITY')
    expect(block).toContain('SAME figure')
    expect(block).toContain('CONCEPT EXCURSION')
    expect(block).toContain('Do NOT draw an ASCII diagram')
  })

  it('the first turn of a figure is NOT announced as continuity', () => {
    const [first] = replay([{ msg: 'Teach me vector with diagram' }])
    expect(buildVisualContractBlock(first)).not.toContain('CONTINUITY')
  })
})
