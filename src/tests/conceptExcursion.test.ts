/**
 * OFF-LESSON CONCEPT EXCURSION — the end-to-end property suite.
 *
 * THE PRODUCTION FAILURE THIS LOCKS DOWN:
 *
 *   lesson:  "SI Units and Measurement"    (phys.meas.units)
 *   learner: "explain Viscosity diagram"
 *   tutor:   talked about viscosity, showed no figure, then
 *            "now, back to SI Units and Measurement…"
 *
 * Three independent defects produced it, and all three are asserted here
 * against the LIVE Knowledge Graphs and the REAL modules — no fixture graph, no
 * mocked resolver:
 *
 *   1. "Viscosity" could not reach phys.mech.viscosity at all, because its KG
 *      title is the compound "Viscosity and Stokes' Law".
 *   2. There was no excursion lifecycle outside the visual layer, so the turn
 *      had one concept identity — the lesson's.
 *   3. The excursion prompt text lived after the visual contract's NO-FIGURE
 *      early return, so a concept without a figure got no guidance at all.
 *
 * Viscosity is the reproducible case, never a special case: every assertion
 * below is either a property of the mechanism or is repeated across the seven
 * M4 pilot concepts and a KG-wide false-positive sweep.
 */

import { describe, expect, it } from 'vitest'
import {
  decideExcursion,
  buildExcursionDirective,
  parseExcursionState,
  isSatisfactionSignal,
  NO_EXCURSION,
  MAX_EXCURSION_TURNS,
  type ExcursionState,
} from '@/lib/teaching/excursion'
import { resolveRequestedConceptId } from '@/lib/teaching/concept/requestedConcept'
import { resolveVisual, resolveVisualForTurn } from '@/lib/teaching/visual/resolveVisual'
import { buildVisualContractBlock } from '@/lib/teaching/visual/visualContract'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import { buildConceptIndexFromKnowledgeGraph } from '@/lib/teaching/concept/conceptIndexSource'
import { resolveConceptMatches, deriveTitleComponents } from '@/lib/teaching/concept/conceptIndex'

const LESSON = 'phys.meas.units'              // "SI Units and Measurement"
const VISCOSITY = 'phys.mech.viscosity'       // "Viscosity and Stokes' Law"
const SURFACE_TENSION = 'phys.mech.surface-tension'

/** One turn, exactly as route.ts runs it: request -> excursion -> visual. */
function turn(opts: {
  message: string
  state?: ExcursionState
  lessonConceptId?: string | null
  lastAssistantAskedQuestion?: boolean
  activeSession?: Parameters<typeof resolveVisual>[0]['activeSession']
  learnerRequest?: 'diagram' | null
}) {
  const lessonConceptId = opts.lessonConceptId === undefined ? LESSON : opts.lessonConceptId
  const requestedConceptId = resolveRequestedConceptId(opts.message, lessonConceptId, 'physics')
  const excursion = decideExcursion({
    state: opts.state ?? NO_EXCURSION,
    message: opts.message,
    lessonConceptId,
    requestedConceptId,
    lastAssistantAskedQuestion: opts.lastAssistantAskedQuestion ?? false,
  })
  const visual = resolveVisual({
    message: opts.message,
    lessonConceptId: excursion.targetConceptId ?? lessonConceptId,
    excursionReturnToConceptId: excursion.returnToConceptId,
    excursionActive: excursion.state.active,
    subject: 'physics',
    learnerRequest: opts.learnerRequest ?? null,
    activeSession: opts.activeSession ?? null,
    lastAssistantAskedQuestion: opts.lastAssistantAskedQuestion ?? false,
  })
  return { requestedConceptId, excursion, visual, lessonConceptId }
}

// ── 1. Concept resolution ────────────────────────────────────────────────────

describe('compound KG titles are reachable by the name the learner uses', () => {
  it('the reproducing case: "Viscosity" resolves to "Viscosity and Stokes\' Law"', () => {
    expect(getKGNode(VISCOSITY)?.title).toBe("Viscosity and Stokes' Law")
    expect(resolveRequestedConceptId('explain viscosity', LESSON, 'physics')).toBe(VISCOSITY)
    expect(resolveRequestedConceptId('explain Viscosity diagram', LESSON, 'physics')).toBe(VISCOSITY)
    expect(resolveRequestedConceptId('Explain Viscosity with a diagram.', LESSON, 'physics')).toBe(VISCOSITY)
  })

  it.each([
    ['explain surface tension', SURFACE_TENSION],
    ['explain capillarity', SURFACE_TENSION],
    ['explain total internal reflection', 'phys.opt.total-internal-reflection'],
    ['explain wave interference', 'phys.wave.interference'],
    ['explain calorimetry', 'phys.therm.calorimetry'],
    ['explain first law of thermodynamics', 'phys.therm.first-law'],
    ['explain transverse waves', 'phys.wave.transverse-waves'],
  ])('%s -> %s', (message, conceptId) => {
    expect(resolveRequestedConceptId(message, LESSON, 'physics')).toBe(conceptId)
  })

  it('a conjunct is ranked BELOW a full title, so a whole-title concept still wins', () => {
    // "Reflection" is math.geom.reflection's ENTIRE title and a conjunct of
    // phys.opt.reflection's. The full title must outrank the conjunct.
    const index = buildConceptIndexFromKnowledgeGraph()
    const matches = resolveConceptMatches('what is reflection', index, null)
    expect(matches[0].conceptId).toBe('math.geom.reflection')
    expect(matches[0].confidence).toBeGreaterThan(0.8)
  })
})

describe('KG-wide false-positive sweep for derived title conjuncts', () => {
  const index = buildConceptIndexFromKnowledgeGraph()
  const components = deriveTitleComponents(index)

  it('every derived conjunct is owned by exactly one concept', () => {
    const owners = new Map<string, string[]>()
    for (const [conceptId, parts] of components) {
      for (const part of parts) {
        const key = part.toLowerCase().replace(/[^a-z0-9\s]+/g, ' ').replace(/\s+/g, ' ').trim()
        owners.set(key, [...(owners.get(key) ?? []), conceptId])
      }
    }
    const ambiguous = [...owners].filter(([, ids]) => ids.length > 1)
    expect(ambiguous, JSON.stringify(ambiguous.slice(0, 5))).toHaveLength(0)
  })

  it('ordinary topic vocabulary is NOT admitted as a one-word conjunct', () => {
    // Each of these is a real conjunct of some compound title, and each would
    // hijack unrelated requests: "energy" from "Relativistic Momentum and
    // Energy", "addition" from "Fraction Addition and Subtraction",
    // "measurement" from the lesson's own "SI Units and Measurement".
    const oneWord = new Set<string>()
    for (const parts of components.values()) {
      for (const part of parts) if (part.trim().split(/\s+/).length === 1) oneWord.add(part.toLowerCase())
    }
    for (const generic of ['energy', 'addition', 'multiplication', 'measurement', 'force', 'distance', 'frequency']) {
      expect(oneWord.has(generic), `"${generic}" must not be a one-word conjunct`).toBe(false)
    }
  })

  it('a conjunct never overrides the lesson from an incidental mention', () => {
    // The word appears, but nothing asks to be taught it.
    expect(resolveRequestedConceptId('the oil in the tube has high viscosity right', LESSON, 'physics')).not.toBe(VISCOSITY)
  })

  it('every subject index still builds and the sweep is non-trivial', () => {
    expect(index.length).toBeGreaterThan(1700)
    expect(components.size).toBeGreaterThan(100)
  })
})

// ── 2. Excursion lifecycle ───────────────────────────────────────────────────

describe('1 · an off-lesson concept opens an excursion', () => {
  const t = turn({ message: 'explain viscosity' })

  it('targets the requested concept', () => {
    expect(t.excursion.targetConceptId).toBe(VISCOSITY)
    expect(t.excursion.transition).toBe('started')
    expect(t.excursion.state.active).toBe(true)
  })

  it('the LESSON is untouched and is owed the return', () => {
    expect(t.lessonConceptId).toBe(LESSON)
    expect(t.excursion.returnToConceptId).toBe(LESSON)
    expect(t.excursion.state.returnToConceptId).toBe(LESSON)
  })
})

describe('2 · off-lesson concept + diagram reaches the authored M4 figure', () => {
  const t = turn({ message: 'explain viscosity with diagram', learnerRequest: 'diagram' })

  it('the figure is the viscosity figure, not the lesson\'s and not none', () => {
    expect(t.visual.graphical).toBe(true)
    expect(t.visual.payload?.renderer).toBe('scene')
    expect(t.visual.asset?.conceptId).toBe(VISCOSITY)      // test 20 · concept identity
    expect(t.visual.asset?.scope).toBe('concept')
    expect(t.visual.excursion).toBe(true)
  })

  it('the contract describes the viscosity figure and never claims NO FIGURE', () => {
    const block = buildVisualContractBlock(t.visual)
    expect(block).toContain('A FIGURE IS ALREADY BEING RENDERED')
    expect(block).not.toContain('NO FIGURE IS ATTACHED')
    expect(block).toContain("Viscosity and Stokes' Law")
    expect(block).not.toContain('SI Units')
  })

  it('the visual session records the way back to the lesson', () => {
    expect(t.visual.session?.conceptId).toBe(VISCOSITY)
    expect(t.visual.session?.returnToConceptId).toBe(LESSON)
  })
})

describe('3-7 · every M4 pilot concept is reachable OFF-lesson', () => {
  it.each([
    [SURFACE_TENSION, 'explain surface tension with a diagram'],
    ['phys.opt.total-internal-reflection', 'explain total internal reflection with a diagram'],
    ['phys.wave.interference', 'explain wave interference with a diagram'],
    ['phys.therm.calorimetry', 'explain calorimetry with a diagram'],
    ['phys.therm.first-law', 'explain the first law of thermodynamics with a diagram'],
    ['phys.wave.transverse-waves', 'explain transverse waves with a diagram'],
    [VISCOSITY, 'explain viscosity with a diagram'],
  ])('%s is taught and drawn from a lesson about SI Units', (conceptId, message) => {
    const t = turn({ message, learnerRequest: 'diagram' })
    expect(t.excursion.targetConceptId).toBe(conceptId)
    expect(t.excursion.state.active).toBe(true)
    expect(t.visual.graphical).toBe(true)
    expect(t.visual.asset?.conceptId).toBe(conceptId)
  })
})

describe('8-9 · a doubt keeps the excursion open', () => {
  const open: ExcursionState = { active: true, targetConceptId: VISCOSITY, returnToConceptId: LESSON, turns: 1 }

  it('"I don\'t understand the velocity gradient" stays on viscosity', () => {
    const t = turn({
      message: "I don't understand the velocity gradient",
      state: open,
      lastAssistantAskedQuestion: true,
    })
    expect(t.excursion.targetConceptId).toBe(VISCOSITY)
    expect(t.excursion.state.active).toBe(true)
    expect(t.excursion.transition).toBe('continued')
    expect(t.excursion.justClosed).toBe(false)
  })

  it.each([
    'why does it get thicker when cold?',
    'can you explain that part again',
    'still confused',
    'got it, but why does the gradient matter?',
  ])('re-explanation request "%s" keeps the target', (message) => {
    const t = turn({ message, state: open, lastAssistantAskedQuestion: true })
    expect(t.excursion.targetConceptId).toBe(VISCOSITY)
    expect(t.excursion.state.active).toBe(true)
  })

  it('the held figure does not move during the excursion', () => {
    const t = turn({
      message: "I don't understand the velocity gradient",
      state: open,
      lastAssistantAskedQuestion: true,
      activeSession: { conceptId: VISCOSITY, representation: 'labelled_figure', renderer: 'scene', returnToConceptId: LESSON, turns: 1 },
    })
    expect(t.visual.conceptId).toBe(VISCOSITY)
    expect(t.visual.session?.turns).toBeGreaterThan(0)
  })
})

describe('10-11 · satisfaction closes the excursion and the lesson resumes', () => {
  const open: ExcursionState = { active: true, targetConceptId: VISCOSITY, returnToConceptId: LESSON, turns: 2 }

  it.each(['Got it, thanks', 'thanks, that\'s clear', 'no doubts', 'makes sense'])(
    '"%s" closes it and returns to the lesson', (message) => {
      const t = turn({ message, state: open, lastAssistantAskedQuestion: true })
      expect(t.excursion.state).toEqual(NO_EXCURSION)
      expect(t.excursion.targetConceptId).toBe(LESSON)
      expect(t.excursion.justClosed).toBe(true)
      expect(t.excursion.transition).toBe('closed-satisfied')
    },
  )

  it('an explicit "back to the lesson" closes it too', () => {
    const t = turn({ message: 'ok back to the lesson', state: open })
    expect(t.excursion.transition).toBe('closed-returned')
    expect(t.excursion.targetConceptId).toBe(LESSON)
  })

  it('the NEXT ordinary turn teaches the lesson again', () => {
    const closed = turn({ message: 'Got it, thanks', state: open, lastAssistantAskedQuestion: true })
    const next = turn({ message: 'ok what next', state: closed.excursion.state })
    expect(next.excursion.state.active).toBe(false)
    expect(next.excursion.targetConceptId).toBe(LESSON)
  })

  it('the excursion FIGURE is released when the excursion closes', () => {
    const t = turn({
      message: 'Got it, thanks',
      state: open,
      lastAssistantAskedQuestion: true,
      activeSession: { conceptId: VISCOSITY, representation: 'labelled_figure', renderer: 'scene', returnToConceptId: LESSON, turns: 2 },
    })
    expect(t.visual.conceptId).not.toBe(VISCOSITY)
  })
})

describe('12 · a second off-lesson concept replaces the target, never nests', () => {
  const first = turn({ message: 'explain viscosity with a diagram', learnerRequest: 'diagram' })
  const second = turn({ message: 'now explain surface tension', state: first.excursion.state })

  it('the target moves', () => {
    expect(second.excursion.targetConceptId).toBe(SURFACE_TENSION)
    expect(second.excursion.transition).toBe('switched')
  })

  it('the return anchor is still the ORIGINAL lesson', () => {
    expect(second.excursion.returnToConceptId).toBe(LESSON)
    expect(second.excursion.state.returnToConceptId).toBe(LESSON)
  })

  it('and the way home is one step: SI Units', () => {
    const home = turn({ message: 'got it, thanks', state: second.excursion.state, lastAssistantAskedQuestion: true })
    expect(home.excursion.targetConceptId).toBe(LESSON)
    expect(home.excursion.state).toEqual(NO_EXCURSION)
  })
})

describe('13 · an excursion never writes lesson state', () => {
  it('the decision carries no progress fields at all', () => {
    const t = turn({ message: 'explain viscosity' })
    // Still an exhaustive whitelist — the assertion is that NO progress field
    // can appear here, and it fails if one ever does. `targetTopicTitle` is
    // the identity of a topic the KG cannot name (see excursion.ts's
    // UNRESOLVED TOPICS note), which is teaching state, not progress.
    // `openedAsKnowledgeGap` records WHY the excursion opened so its exit can
    // differ from a learner-chosen one — lifecycle, not progress: it moves no
    // counter, gates no mastery, and is never read by the ladder.
    expect(Object.keys(t.excursion.state).sort()).toEqual(
      ['active', 'openedAsKnowledgeGap', 'returnToConceptId', 'targetConceptId', 'targetTopicTitle', 'turns'],
    )
    // The lesson identity handed in is returned untouched as the return anchor.
    expect(t.excursion.returnToConceptId).toBe(LESSON)
    expect(t.lessonConceptId).toBe(LESSON)
  })

  it('the excursion is bounded and cannot strand a learner', () => {
    const stuck: ExcursionState = { active: true, targetConceptId: VISCOSITY, returnToConceptId: LESSON, turns: MAX_EXCURSION_TURNS }
    const t = turn({ message: 'and what about the units of it', state: stuck })
    expect(t.excursion.transition).toBe('closed-turn-limit')
    expect(t.excursion.targetConceptId).toBe(LESSON)
  })

  it('a lesson change underneath an open excursion closes it', () => {
    const open: ExcursionState = { active: true, targetConceptId: VISCOSITY, returnToConceptId: LESSON, turns: 1 }
    const t = turn({ message: 'ok', state: open, lessonConceptId: 'phys.therm.calorimetry' })
    expect(t.excursion.transition).toBe('closed-lesson-changed')
    expect(t.excursion.targetConceptId).toBe('phys.therm.calorimetry')
  })
})

describe('14 · answer-shaped messages never start an excursion', () => {
  it.each([
    'the starting point',
    'viscosity',                    // a bare noun answering "what resists flow?"
    'because it is thicker',
    '2.5 m/s',
  ])('"%s" answering a tutor question stays on the lesson', (message) => {
    const t = turn({ message, lastAssistantAskedQuestion: true })
    expect(t.excursion.state.active).toBe(false)
    expect(t.excursion.targetConceptId).toBe(LESSON)
  })

  it('an answer mid-excursion continues it rather than restarting it', () => {
    const open: ExcursionState = { active: true, targetConceptId: VISCOSITY, returnToConceptId: LESSON, turns: 1 }
    const t = turn({ message: 'the top layer', state: open, lastAssistantAskedQuestion: true })
    expect(t.excursion.transition).toBe('continued')
    expect(t.excursion.state.turns).toBe(2)
  })
})

describe('15 · a bare visual request stays on the current teaching target', () => {
  it('on the lesson, it draws the lesson', () => {
    const t = turn({ message: 'show me a diagram', learnerRequest: 'diagram' })
    expect(t.excursion.state.active).toBe(false)
    expect(t.excursion.targetConceptId).toBe(LESSON)
  })

  it('mid-excursion, it stays on the excursion concept', () => {
    const open: ExcursionState = { active: true, targetConceptId: VISCOSITY, returnToConceptId: LESSON, turns: 1 }
    const t = turn({ message: 'show me a diagram', state: open, learnerRequest: 'diagram' })
    expect(t.excursion.targetConceptId).toBe(VISCOSITY)
    expect(t.visual.conceptId).toBe(VISCOSITY)
  })
})

// ── 3. Prompt separation ─────────────────────────────────────────────────────

describe('the EXCURSION DIRECTIVE is independent of the visual contract', () => {
  const open = decideExcursion({
    state: NO_EXCURSION,
    message: 'explain viscosity',
    lessonConceptId: LESSON,
    requestedConceptId: VISCOSITY,
    lastAssistantAskedQuestion: false,
  })

  it('it is emitted even when NO figure exists for the concept', () => {
    // A concept with no authored figure — the majority of the curriculum, and
    // the case that silently produced no guidance at all before.
    const noFigure = resolveVisual({
      message: 'explain dimensional analysis',
      lessonConceptId: 'phys.meas.dimensional-analysis',
      subject: 'physics',
    })
    expect(noFigure.graphical).toBe(false)
    expect(buildVisualContractBlock(noFigure)).toContain('NO FIGURE IS ATTACHED')

    const directive = buildExcursionDirective({
      decision: open,
      targetTitle: "Viscosity and Stokes' Law",
      lessonTitle: 'SI Units and Measurement',
    })
    expect(directive).toContain('CONCEPT EXCURSION')
    expect(directive).toContain("Viscosity and Stokes' Law")
  })

  it('it tells the tutor the lesson is paused, checks understanding, and defers the return', () => {
    const directive = buildExcursionDirective({
      decision: open,
      targetTitle: "Viscosity and Stokes' Law",
      lessonTitle: 'SI Units and Measurement',
    })
    expect(directive).toMatch(/PAUSED, NOT REPLACED/)
    // CORRECTED 2026-08-11. This asserted "ask whether they still have a
    // doubt", which production measured at 17% of turns and which tests
    // nothing: a learner who does not yet know what they misunderstood cannot
    // answer it, and "no" closes the detour on no evidence. The rule now asks
    // for a check that produces some. The close condition (rule 5) is
    // unchanged and still asserted below.
    expect(directive).toMatch(/ONE short question that makes them USE/i)
    expect(directive).toMatch(/Never ask "any doubts\?"/i)
    expect(directive).toMatch(/Do NOT teach, open, anchor, illustrate or ask a question belonging to/i)
    expect(directive).toMatch(/ONLY a clear statement of understanding from the learner ends this/i)
    // A doubt is not an ending — the production failure this wording closes.
    expect(directive).toMatch(/CONFUSION DOES NOT END THIS/i)
  })

  it('it is empty on an ordinary lesson turn', () => {
    const none = decideExcursion({
      state: NO_EXCURSION, message: 'ok', lessonConceptId: LESSON,
      requestedConceptId: null, lastAssistantAskedQuestion: true,
    })
    expect(buildExcursionDirective({ decision: none, targetTitle: null, lessonTitle: 'SI Units and Measurement' })).toBe('')
  })

  it('the closing turn tells the tutor to resume, not to re-teach', () => {
    const closed = decideExcursion({
      state: { active: true, targetConceptId: VISCOSITY, returnToConceptId: LESSON, turns: 2 },
      message: 'got it, thanks',
      lessonConceptId: LESSON,
      requestedConceptId: null,
      lastAssistantAskedQuestion: true,
    })
    const directive = buildExcursionDirective({
      decision: closed, targetTitle: "Viscosity and Stokes' Law", lessonTitle: 'SI Units and Measurement',
    })
    expect(directive).toContain('EXCURSION CLOSED')
    expect(directive).toContain('SI Units and Measurement')
    expect(directive).toMatch(/do NOT re-teach/i)
  })

  it('the visual contract keeps ONLY the figure-scoped excursion rule', () => {
    const t = turn({ message: 'explain viscosity with diagram', learnerRequest: 'diagram' })
    const block = buildVisualContractBlock(t.visual)
    expect(block).toContain('EXCURSION FIGURE')
    // The teaching lifecycle is no longer the visual layer's to state.
    expect(block).not.toMatch(/offer to return to the lesson/i)
  })
})

// ── 4. Architecture invariants ───────────────────────────────────────────────

describe('16-18 · the visualization architecture is unchanged', () => {
  it('resolveVisualForTurn remains the sole authority and still fails closed', async () => {
    const d = await resolveVisualForTurn({
      message: 'explain viscosity with diagram',
      lessonConceptId: VISCOSITY,
      excursionReturnToConceptId: LESSON,
      excursionActive: true,
      subject: 'physics',
      learnerRequest: 'diagram',
    })
    expect(d.asset?.conceptId).toBe(VISCOSITY)

    // A concept that is not in any KG yields NO FIGURE, never a guess.
    const unknown = resolveVisual({ message: 'explain zzzz', lessonConceptId: 'phys.not.a.concept', subject: 'physics' })
    expect(unknown.graphical).toBe(false)
    expect(unknown.asset ?? null).toBeNull()
  })

  it('no figure is ever produced from the tutor\'s prose — only from concept identity', () => {
    // The same message, two different teaching targets, two different answers.
    const a = resolveVisual({ message: 'explain viscosity with diagram', lessonConceptId: VISCOSITY, subject: 'physics', learnerRequest: 'diagram' })
    const b = resolveVisual({ message: 'explain viscosity with diagram', lessonConceptId: 'phys.wave.interference', subject: 'physics', learnerRequest: 'diagram' })
    expect(a.asset?.conceptId).toBe(VISCOSITY)
    // The learner's own words still win over the passed target — that is the
    // excursion rule, and it is decided by identity, never by prose matching.
    expect(b.asset?.conceptId).toBe(VISCOSITY)
  })

  it('parseExcursionState rejects corrupt snapshots rather than trusting them', () => {
    expect(parseExcursionState(null)).toEqual(NO_EXCURSION)
    expect(parseExcursionState({ active: true })).toEqual(NO_EXCURSION)
    expect(parseExcursionState({ active: true, targetConceptId: 7 })).toEqual(NO_EXCURSION)
    expect(parseExcursionState({ active: true, targetConceptId: VISCOSITY, turns: -5 }).turns).toBe(0)
  })

  it('satisfaction detection never fires on a question or a doubt', () => {
    expect(isSatisfactionSignal('got it thanks')).toBe(true)
    expect(isSatisfactionSignal('got it, but why?')).toBe(false)
    expect(isSatisfactionSignal('makes sense?')).toBe(false)
    expect(isSatisfactionSignal("I don't understand")).toBe(false)
  })
})
