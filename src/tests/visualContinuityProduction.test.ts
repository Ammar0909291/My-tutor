/**
 * Production-observed continuity defects.
 *
 * Every case here was reproduced from a real production turn on f361f90e,
 * deployment dpl_DQWHrszyFxiq5vSLtLHw4h7pzRmf. Nothing is invented.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { parseVisualSession } from '@/lib/teaching/visual/session'
import { detectLearnerRequest } from '@/lib/teaching/masteryGate'

const CALORIMETRY = 'phys.therm.calorimetry'
// The subject-local reading rule (2026-08-08) changed WHICH vector concept a
// physics learner reaches: "vector" from a physics lesson now resolves to
// physics' own Scalar and Vector Quantities — which carries the real vector
// scene generator — instead of travelling to math.linalg.vector's card. These
// tests still assert exactly what they always did: the concept behind the
// medium word wins, and it is not the lesson's concept.
const VECTOR = 'phys.meas.scalars-vectors'

const decide = (message: string, opts: Partial<Parameters<typeof resolveVisual>[0]> = {}) =>
  resolveVisual({
    subject: 'physics', message, lessonConceptId: CALORIMETRY,
    learnerRequest: detectLearnerRequest(message), ...opts,
  })

/** Round-trip through the real contextSnapshot persistence path. */
const persist = (s: unknown) => (s ? parseVisualSession(JSON.parse(JSON.stringify(s))) : null)

describe('a visual request with no named concept returns to the lesson', () => {
  it('reproduces session cmsj5569t 17:42:23Z and fixes it', () => {
    // Calorimetry lesson, vector excursion opened three turns earlier.
    let session = persist(decide('Teach me vector with diagram').session)
    session = persist(decide('ok', { activeSession: session, lastAssistantAskedQuestion: true }).session)
    expect(session?.conceptId).toBe(VECTOR)

    // Production showed: math.linalg.vector, continuity, heldTurns 2 — a 3D
    // vector figure on screen while the tutor talked about thermal exchange.
    const d = decide('Show me graph', { activeSession: session })
    expect(d.conceptId).toBe(CALORIMETRY)
    expect(d.excursion).toBe(false)
    expect(d.graphical).toBe(true)
    expect(d.continuityReason).toBe('visual-request-returns-to-lesson')
  })

  it('does not churn when the figure is already the lesson concept', () => {
    const onLesson = decide('show me a diagram')
    const again = decide('show me a graph', { activeSession: onLesson.session })
    expect(again.conceptId).toBe(CALORIMETRY)
  })

  it('a named concept plus a medium word still excurses', () => {
    expect(decide('show me vector graph').conceptId).toBe(VECTOR)
  })
})

describe('continuity behaviour that must not regress', () => {
  it('an answer during an excursion still holds the figure', () => {
    const seed = decide('Teach me vector with diagram')
    const answer = decide("It's starting point.", {
      activeSession: seed.session, lastAssistantAskedQuestion: true,
    })
    expect(answer.conceptId).toBe(VECTOR)
  })

  it('an explicit new topic still switches', () => {
    const seed = decide('Teach me vector with diagram')
    expect(decide('teach me graph theory', { activeSession: seed.session }).conceptId)
      .toBe('math.disc.graph')
  })
})

describe('session hardening', () => {
  it('a held concept that has left the KG degrades to the lesson, not ASCII', () => {
    const d = decide('ok', {
      activeSession: {
        conceptId: 'phys.deleted.gone', representation: 'vector',
        renderer: 'card', returnToConceptId: CALORIMETRY, turns: 1,
      } as never,
      lastAssistantAskedQuestion: true,
    })
    expect(d.conceptId).toBe(CALORIMETRY)
    expect(d.graphical).toBe(true)
  })

  it('a session with wrong field types never throws', () => {
    expect(() => decide('ok', {
      activeSession: { conceptId: 42, turns: 'x', renderer: null } as never,
      lastAssistantAskedQuestion: true,
    })).not.toThrow()
  })

  it('a negative turn count is clamped so the safety valve stays reachable', () => {
    const parsed = parseVisualSession({
      conceptId: 'a', representation: 'vector', renderer: 'card', turns: -5,
    })
    expect(parsed?.turns).toBe(0)
  })
})
