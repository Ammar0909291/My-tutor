/**
 * VISUAL SESSION PERSISTENCE + RESTORATION.
 *
 * THE DEFECT: a concept-specific figure resolved and rendered correctly, then
 * vanished on browser refresh — mid-explanation, with the tutor's restored
 * words still pointing at "the figure on your screen".
 *
 * WHY. The payload travels exactly once, inside the chat response, and the
 * client hangs it on that message in React state. The `messages` table has no
 * visual column and /api/sessions/history selects none, so a refresh rebuilt
 * the conversation from text alone. Only the figure's IDENTITY survived, in
 * contextSnapshot.visualSession, and nothing turned it back into a figure.
 *
 * THE FIX, tested here: restoreVisualSession() re-DERIVES the payload from that
 * persisted identity by running the same resolver and the same admission gate.
 * It is a re-derivation, not a cache read — which is what makes the restore
 * both correct (deterministic: same identity, same figure) and safe (a client
 * cannot ask for a concept; the server re-runs its own authority).
 *
 * These tests cover the refresh matrix A–J.
 */

import { describe, expect, it } from 'vitest'
import { resolveVisual, restoreVisualSession } from '@/lib/teaching/visual/resolveVisual'
import { parseVisualSession, type VisualSession } from '@/lib/teaching/visual/session'
import { isRetiredVisualBinding, RETIRED_VISUAL_BINDINGS } from '@/lib/teaching/visual/retired'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'

const LESSON = 'phys.meas.scalars-vectors'
const VISCOSITY = 'phys.mech.viscosity'

/** A live turn, then what the server persisted from it. */
function liveTurn(opts: { message: string; conceptId: string; excursionReturnTo?: string | null }) {
  const decision = resolveVisual({
    message: opts.message,
    lessonConceptId: opts.conceptId,
    excursionReturnToConceptId: opts.excursionReturnTo ?? null,
    excursionActive: (opts.excursionReturnTo ?? null) !== null,
    subject: 'physics',
    learnerRequest: 'diagram',
  })
  // The exact JSONB round-trip contextSnapshot performs.
  const persisted = JSON.parse(JSON.stringify(decision.session))
  return { decision, persisted }
}

// ── the core property ────────────────────────────────────────────────────────

describe('a restored figure is the SAME figure, re-derived', () => {
  const { decision, persisted } = liveTurn({ message: 'explain viscosity with a diagram', conceptId: VISCOSITY })

  it('the live turn produced an admitted concept-scoped figure', () => {
    expect(decision.graphical).toBe(true)
    expect(decision.asset?.conceptId).toBe(VISCOSITY)
    expect(decision.payload?.renderer).toBe('scene')
  })

  it('only the IDENTITY is persisted — never the payload', () => {
    expect(Object.keys(persisted).sort()).toEqual(
      ['conceptId', 'renderer', 'representation', 'returnToConceptId', 'turns'].sort(),
    )
    expect(JSON.stringify(persisted)).not.toContain('sceneSpec')
    expect(JSON.stringify(persisted)).not.toContain('objects')
  })

  it('A · restoring it reproduces the identical payload', () => {
    const restored = restoreVisualSession(persisted)
    expect(restored).not.toBeNull()
    expect(restored!.asset?.conceptId).toBe(VISCOSITY)
    expect(restored!.payload?.renderer).toBe('scene')
    // Byte-identical: determinism is the whole reason identity is enough.
    expect(JSON.stringify(restored!.payload)).toBe(JSON.stringify(decision.payload))
  })

  it('the restored scene is structurally valid, as the client requires', () => {
    const restored = restoreVisualSession(persisted)!
    const payload = restored.payload!
    expect(payload.renderer).toBe('scene')
    if (payload.renderer === 'scene') {
      expect(validateSceneSpec(payload.sceneSpec).valid).toBe(true)
    }
  })

  it('B · a follow-up after the refresh continues on the same figure', () => {
    // The restored session is the same object the next turn holds against.
    const revived = parseVisualSession(persisted)!
    const next = resolveVisual({
      message: 'why does temperature change it?',
      lessonConceptId: VISCOSITY,
      activeSession: revived,
      subject: 'physics',
      lastAssistantAskedQuestion: true,
    })
    expect(next.conceptId).toBe(VISCOSITY)
    expect(next.graphical).toBe(true)
  })
})

// ── excursion ────────────────────────────────────────────────────────────────

describe('C/D · an excursion figure survives refresh, and is released on close', () => {
  const { decision, persisted } = liveTurn({
    message: 'explain viscosity with a diagram',
    conceptId: VISCOSITY,
    excursionReturnTo: LESSON,
  })

  it('the persisted identity carries the excursion relationship', () => {
    expect(decision.excursion).toBe(true)
    expect(persisted.conceptId).toBe(VISCOSITY)
    expect(persisted.returnToConceptId).toBe(LESSON)
  })

  it('C · refreshing mid-excursion restores the Viscosity figure', () => {
    const restored = restoreVisualSession(persisted)
    expect(restored!.asset?.conceptId).toBe(VISCOSITY)
    expect(restored!.excursion).toBe(true)
    expect(restored!.session?.returnToConceptId).toBe(LESSON)
  })

  it('C · and a doubt after that refresh still holds it', () => {
    const revived = parseVisualSession(persisted)!
    const afterDoubt = resolveVisual({
      message: "I still don't understand it",
      lessonConceptId: VISCOSITY,
      excursionReturnToConceptId: LESSON,
      excursionActive: true,
      activeSession: revived,
      subject: 'physics',
      lastAssistantAskedQuestion: true,
    })
    expect(afterDoubt.conceptId).toBe(VISCOSITY)
  })

  it('D · once the Teaching Engine closes the excursion, the figure is released', () => {
    const revived = parseVisualSession(persisted)!
    const afterClose = resolveVisual({
      message: 'ok',
      lessonConceptId: LESSON,          // teaching returned to the lesson
      excursionActive: false,           // the Teaching Engine's decision, not ours
      activeSession: revived,
      subject: 'physics',
    })
    expect(afterClose.conceptId).not.toBe(VISCOSITY)
  })

  it('D · restore does not resurrect a released figure — nothing is persisted to restore', () => {
    // On close the route persists decision.session, which is the lesson's
    // figure or null. A null session restores nothing.
    expect(restoreVisualSession(null)).toBeNull()
  })
})

// ── leaks, staleness, corruption ─────────────────────────────────────────────

describe('E/J · a figure never leaks into another lesson', () => {
  it('J · a stale identity from another lesson does not render against this one', () => {
    // The persisted figure is Viscosity; the learner has navigated to a
    // different lesson, so the live resolver switches away from it.
    const stale: VisualSession = {
      conceptId: VISCOSITY, representation: 'labelled_figure', renderer: 'scene',
      returnToConceptId: LESSON, turns: 3,
    }
    const onNewLesson = resolveVisual({
      message: 'lets begin',
      lessonConceptId: 'phys.therm.calorimetry',   // a different lesson entirely
      activeSession: stale,
      subject: 'physics',
    })
    expect(onNewLesson.conceptId).toBe('phys.therm.calorimetry')
    expect(onNewLesson.conceptId).not.toBe(VISCOSITY)
  })

  it('E · lesson switch clears the surface, so there is nothing to restore', () => {
    // The route persists the NEW decision's session on the switch turn, and a
    // cleared snapshot restores nothing.
    expect(restoreVisualSession(undefined)).toBeNull()
    expect(restoreVisualSession({})).toBeNull()
  })
})

describe('F/G/H/I · restoration honours every existing guarantee', () => {
  it('F · no visual stays no visual', () => {
    expect(restoreVisualSession(null)).toBeNull()
    // A concept with no faithful figure produces no session to persist.
    const none = resolveVisual({
      message: 'explain dimensional analysis',
      lessonConceptId: 'phys.meas.dimensional-analysis',
      subject: 'physics',
    })
    expect(none.graphical).toBe(false)
    expect(restoreVisualSession(none.session)).toBeNull()
  })

  it('G · a retired binding cannot be restored', () => {
    // Restoration runs the tiers, and the retired check is the first of them.
    // Read from the retirement registry itself rather than a guessed list, so
    // this stays true as the registry grows.
    const retired = Object.keys(RETIRED_VISUAL_BINDINGS).filter((id) => getKGNode(id))
    expect(retired.length).toBeGreaterThan(0)
    for (const conceptId of retired) {
      const forged: VisualSession = {
        conceptId, representation: 'labelled_figure', renderer: 'scene',
        returnToConceptId: null, turns: 1,
      }
      expect(isRetiredVisualBinding(conceptId)).toBe(true)
      expect(restoreVisualSession(forged), conceptId).toBeNull()
    }
  })

  it('H · a domain illustration restores with domain scope, never promoted', () => {
    // Find a concept whose figure is a domain-scoped illustration.
    const candidates = ['math.calc.derivative', 'math.calc.integral', 'math.geom.angle-types']
    const domainOne = candidates
      .map((id) => resolveVisual({ message: 'show me', lessonConceptId: id, subject: 'mathematics' }))
      .find((d) => d.asset?.scope === 'domain')
    if (!domainOne) return                       // no such binding today — nothing to assert
    const restored = restoreVisualSession(JSON.parse(JSON.stringify(domainOne.session)))
    expect(restored?.asset?.scope).toBe('domain')
    expect(restored?.asset?.identity).not.toBe('declared')
  })

  it('I · corrupt persisted state fails closed', () => {
    for (const corrupt of [
      'nonsense', 42, [], { conceptId: '' }, { conceptId: 123 },
      { conceptId: VISCOSITY },                                  // missing renderer/representation
      { conceptId: 'phys.not.a.real.concept', representation: 'labelled_figure', renderer: 'scene' },
      { conceptId: '../../etc/passwd', representation: 'labelled_figure', renderer: 'scene' },
    ]) {
      expect(restoreVisualSession(corrupt), JSON.stringify(corrupt)).toBeNull()
    }
  })
})

// ── security ─────────────────────────────────────────────────────────────────

describe('a restored figure cannot be manufactured', () => {
  it('the payload comes from the resolver, not from the stored record', () => {
    // A record that CLAIMS a renderer and representation the concept does not
    // have. The restore ignores those claims: the payload is re-derived from
    // the concept's own binding, and admission compares it against the concept.
    const lying: VisualSession = {
      conceptId: VISCOSITY,
      representation: 'graph',            // wrong on purpose
      renderer: 'card',                   // wrong on purpose
      returnToConceptId: null,
      turns: 1,
    }
    const restored = restoreVisualSession(lying)
    expect(restored).not.toBeNull()
    expect(restored!.payload?.renderer).toBe('scene')          // the real one
    expect(restored!.asset?.conceptId).toBe(VISCOSITY)         // identity intact
  })

  it('an arbitrary concept id yields only what that concept legitimately has', () => {
    // Even if a caller supplied any id it liked, the answer is the resolver's:
    // an admitted asset for THAT concept, or nothing at all. There is no path
    // from a supplied id to an arbitrary asset.
    const forged: VisualSession = {
      conceptId: 'phys.meas.units', representation: 'labelled_figure', renderer: 'scene',
      returnToConceptId: null, turns: 0,
    }
    const restored = restoreVisualSession(forged)
    // phys.meas.units has no curated binding and no generator → no figure.
    expect(restored).toBeNull()
  })

  it('every restored decision carries an admitted asset whose id matches', () => {
    const { persisted } = liveTurn({ message: 'diagram please', conceptId: VISCOSITY })
    const restored = restoreVisualSession(persisted)!
    expect(restored.asset).toBeDefined()
    expect(restored.asset!.conceptId).toBe(restored.conceptId)
    expect(restored.graphical).toBe(true)
  })
})
