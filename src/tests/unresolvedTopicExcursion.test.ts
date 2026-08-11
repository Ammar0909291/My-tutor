/**
 * A QUESTION THE CURRICULUM CANNOT NAME IS STILL A QUESTION.
 *
 * ── THE DEFECT ──────────────────────────────────────────────────────────────
 * The excursion lifecycle — the one deterministic thing standing between a
 * learner's question and the lesson plan — opened ONLY on a resolved KG
 * concept. So it switched itself off for exactly the questions that need it,
 * and the learner was steered back. Measured in production, 2026-08-11, AFTER
 * the qualifier fix that (correctly) stopped "thermal conductivity" resolving
 * to ELECTRICAL conductivity:
 *
 *   lesson:  Free Body Diagrams
 *   learner: "What is thermal conductivity?"
 *   tutor:   one correct sentence about heat, then
 *            "Now, let's connect this back to our current lesson on Free Body
 *             Diagrams"
 *
 * Nothing was broken. `requestedConceptId` was null, so no excursion opened, so
 * every prompt block stayed anchored to the lesson. Making the resolver more
 * honest made this MORE common, not less — which is why the protection could
 * not be left dependent on resolution.
 *
 * ── WHAT THESE TESTS HOLD ───────────────────────────────────────────────────
 * Two properties that pull against each other, which is why both are here:
 *
 *   1. RECALL — the five real production questions all open an excursion.
 *   2. RESTRAINT — "why?", "I am lost", "show me a diagram", an answer to the
 *      tutor's own question, and any follow-up about the topic in progress do
 *      NOT open one.
 *
 * Loosening (1) without (2) splits a lesson in half on every follow-up. That
 * is the failure mode this file exists to catch, so the restraint cases
 * outnumber the recall ones on purpose.
 */
import { describe, it, expect } from 'vitest'
import { resolveRequestedConceptId } from '@/lib/teaching/concept/requestedConcept'
import { namedTopicUnknownTo } from '@/lib/teaching/visual/requestedTopic'
import {
  decideExcursion,
  buildExcursionDirective,
  parseExcursionState,
  turnCountsForLesson,
  NO_EXCURSION,
  MAX_EXCURSION_TURNS,
  type ExcursionState,
} from '@/lib/teaching/excursion'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'

const PHYS_LESSON = 'phys.mech.free-body-diagram'

/**
 * The route's own wiring, reproduced exactly: resolve first, and only when the
 * curriculum cannot name the request ask what the learner called it — compared
 * against what is actually being taught this turn.
 */
function turn(opts: {
  message: string
  state?: ExcursionState
  lesson?: string
  subject?: string
  lastAssistantAskedQuestion?: boolean
}) {
  const lesson = opts.lesson ?? PHYS_LESSON
  const state = opts.state ?? NO_EXCURSION
  const requestedConceptId = resolveRequestedConceptId(opts.message, lesson, opts.subject ?? 'physics')

  const node = getKGNode(lesson)
  const activeTitle = state.active
    ? (state.targetTopicTitle ?? getKGNode(state.targetConceptId ?? '')?.title ?? '')
    : ''
  const taughtText = [node?.title ?? '', node?.description ?? '', activeTitle].join(' ')
  const requestedTopicTitle = requestedConceptId
    ? null
    : (namedTopicUnknownTo(opts.message, taughtText)?.title ?? null)

  return {
    requestedConceptId,
    requestedTopicTitle,
    decision: decideExcursion({
      state,
      message: opts.message,
      lessonConceptId: lesson,
      requestedConceptId,
      requestedTopicTitle,
      lastAssistantAskedQuestion: opts.lastAssistantAskedQuestion ?? false,
    }),
  }
}

// ── 1. RECALL: the five production questions ────────────────────────────────

describe('an explicit question is never forced back to the lesson for want of a KG concept', () => {
  const PRODUCTION_QUESTIONS = [
    'What is thermal conductivity?',
    'Teach me about moles.',
    'Why does light bend when it enters water?',
    'What causes friction?',
    'How does a catalyst work?',
  ]

  for (const message of PRODUCTION_QUESTIONS) {
    it(`opens an excursion for: ${message}`, () => {
      const t = turn({ message })
      // The premise: the curriculum genuinely cannot name these inside this
      // lesson. If one of them ever resolves, this test is measuring the wrong
      // path and should be re-pointed, not deleted.
      expect(t.requestedConceptId).toBeNull()

      expect(t.decision.state.active).toBe(true)
      expect(t.decision.transition).toBe('started')
      // The identity is the learner's own words, and there is no concept id.
      expect(t.decision.state.targetTopicTitle).toBeTruthy()
      expect(t.decision.targetConceptId).toBeNull()
      // The lesson is the return anchor, exactly as for a resolved excursion.
      expect(t.decision.returnToConceptId).toBe(PHYS_LESSON)
    })

    it(`teaches the topic rather than the lesson for: ${message}`, () => {
      const t = turn({ message })
      const block = buildExcursionDirective({
        decision: t.decision,
        targetTitle: t.decision.targetTopicTitle,
        lessonTitle: 'Free Body Diagrams',
      })
      expect(block).toContain('CONCEPT EXCURSION')
      expect(block).toContain(t.decision.state.targetTopicTitle!)
      // The override clause is what beats every block above that names the
      // lesson as the thing to resume.
      expect(block).toContain('THIS BLOCK OVERRIDES')
      expect(block).toContain('CONFUSION DOES NOT END THIS')
    })
  }

  it('freezes the lesson ladder while an unresolved excursion runs', () => {
    const t = turn({ message: 'What is thermal conductivity?' })
    // The same attribution boundary a resolved excursion gets: answers about
    // the side topic must not earn the lesson its mastery.
    expect(turnCountsForLesson(t.decision)).toBe(false)
  })
})

// ── 2. RESTRAINT: what must never open one ──────────────────────────────────

describe('an excursion does not open on a follow-up', () => {
  const MUST_NOT_OPEN = [
    'Why?',
    'why',
    'I am lost',
    "I don't understand",
    'I still do not understand',
    'show me a diagram',
    'can you draw a diagram',
    'explain that again',
    'explain it more simply',
    'I am a complete beginner. Please explain this topic to me.',
  ]

  for (const message of MUST_NOT_OPEN) {
    it(`stays on the lesson for: ${message}`, () => {
      const t = turn({ message })
      expect(t.decision.state.active).toBe(false)
      expect(t.decision.transition).toBe('none')
      expect(t.decision.targetConceptId).toBe(PHYS_LESSON)
      expect(t.decision.state.targetTopicTitle).toBeNull()
    })
  }

  /**
   * THE MEASURED FALSE POSITIVES.
   *
   * With a one-word floor and the weak question family, each of these NAMES
   * something the lesson's concept does not mention — "answer", "step",
   * "formula", "score", "solve" — and each would have opened an excursion on
   * an ordinary in-lesson question. 8 of 31 risky phrasings did, before
   * DISCOURSE_NOUNS. They are the reason recall could not simply be loosened.
   */
  const LESSON_MACHINERY = [
    'what is the answer?',
    'can you explain the answer',
    'what is the next step?',
    'how do I solve this?',
    'what is the formula?',
    'what is my score',
    'what is homework',
    'what is the difference?',
  ]

  for (const message of LESSON_MACHINERY) {
    it(`names no subject in: ${message}`, () => {
      const t = turn({ message })
      expect(t.requestedTopicTitle).toBeNull()
      expect(t.decision.state.active).toBe(false)
    })
  }

  it('one real word is enough to survive the machinery list', () => {
    // The filter must not swallow a genuine topic that happens to contain a
    // discourse word — the rule is "entirely machinery", never "contains".
    const taught = 'Free Body Diagram forces acting on a body'
    expect(namedTopicUnknownTo('what is a chemical formula?', taught)?.title).toBeTruthy()
    expect(namedTopicUnknownTo('explain percentage difference', taught)?.title).toBeTruthy()
  })

  it('an answer to the tutor own question never starts one', () => {
    // The answer-hold runs BEFORE any request branch, so even a phrase that
    // would otherwise name a topic cannot leave the lesson on an answer turn.
    const t = turn({ message: 'friction', lastAssistantAskedQuestion: true })
    expect(t.decision.state.active).toBe(false)
  })

  it('a question about the lesson own subject matter stays in the lesson', () => {
    // Shares vocabulary with the lesson concept, so it is a follow-up, not a
    // departure. This is the bar that keeps a lesson from splitting in half.
    const t = turn({ message: 'why does the free body diagram need every force?' })
    expect(t.decision.state.active).toBe(false)
  })
})

// ── 3. THE LIFECYCLE IS THE SAME LIFECYCLE ──────────────────────────────────

describe('an unresolved excursion behaves like every other excursion', () => {
  const opened = () => turn({ message: 'What is thermal conductivity?' }).decision.state

  it('confusion continues it — it does not close it', () => {
    for (const message of ['Why?', 'I am lost', 'I still do not understand']) {
      const t = turn({ message, state: opened() })
      expect(t.decision.state.active).toBe(true)
      expect(t.decision.transition).toBe('continued')
      expect(t.decision.state.targetTopicTitle).toBe('thermal conductivity')
    }
  })

  it('a follow-up naming the same topic continues rather than restarts it', () => {
    const t = turn({ message: 'why does thermal conductivity vary between metals?', state: opened() })
    expect(t.decision.transition).toBe('continued')
    expect(t.decision.state.targetTopicTitle).toBe('thermal conductivity')
  })

  it('satisfaction closes it and returns to the lesson', () => {
    const t = turn({ message: 'got it, thanks', state: opened() })
    expect(t.decision.state).toEqual(NO_EXCURSION)
    expect(t.decision.targetConceptId).toBe(PHYS_LESSON)
    expect(t.decision.justClosed).toBe(true)
    // The return turn cannot also finish the lesson.
    expect(turnCountsForLesson(t.decision)).toBe(false)
  })

  it('an explicit return closes it', () => {
    const t = turn({ message: 'ok back to the lesson', state: opened() })
    expect(t.decision.state.active).toBe(false)
    expect(t.decision.justClosed).toBe(true)
  })

  it('a second unresolved topic REPLACES the first — never nests', () => {
    const t = turn({ message: 'What causes friction?', state: opened() })
    expect(t.decision.transition).toBe('switched')
    expect(t.decision.state.targetTopicTitle).toBe('friction')
    // One step home, always the real lesson.
    expect(t.decision.returnToConceptId).toBe(PHYS_LESSON)
  })

  it('the turn limit still cannot strand a learner off-lesson', () => {
    const stranded = { ...opened(), turns: MAX_EXCURSION_TURNS }
    const t = turn({ message: 'Why?', state: stranded })
    expect(t.decision.transition).toBe('closed-turn-limit')
    expect(t.decision.targetConceptId).toBe(PHYS_LESSON)
  })

  it('a lesson change underneath it closes it', () => {
    const t = turn({ message: 'Why?', state: opened(), lesson: 'phys.meas.units' })
    expect(t.decision.transition).toBe('closed-lesson-changed')
  })
})

// ── 4. NO FIGURE MAY BE RELABELLED AS THE UNRESOLVED TOPIC ──────────────────

describe('a lesson figure is never presented as the topic that has no concept', () => {
  it('the directive states there is no figure of the topic', () => {
    const decision = turn({ message: 'What is thermal conductivity?' }).decision
    const block = buildExcursionDirective({
      decision,
      targetTitle: decision.targetTopicTitle,
      lessonTitle: 'Free Body Diagrams',
    })
    expect(block).toContain('There is NO figure of')
    expect(block).toContain('do NOT')
    // The clause that WOULD have relabelled it must be absent.
    expect(block).not.toContain('Any figure attached to this response belongs to')
  })

  it('a resolved excursion keeps the original figure-ownership clause', () => {
    // The split is on whether a concept exists, and only there — a resolved
    // excursion's figure genuinely is of its target.
    const decision = decideExcursion({
      state: NO_EXCURSION,
      message: 'explain viscosity',
      lessonConceptId: PHYS_LESSON,
      requestedConceptId: 'phys.fluid.viscosity',
      requestedTopicTitle: null,
      lastAssistantAskedQuestion: false,
    })
    const block = buildExcursionDirective({
      decision, targetTitle: 'Viscosity', lessonTitle: 'Free Body Diagrams',
    })
    expect(block).toContain('Any figure attached to this response belongs to')
    expect(block).not.toContain('There is NO figure of')
  })
})

// ── 5. THE PERSISTED STATE SURVIVES THE ROUND TRIP ──────────────────────────

describe('the excursion state round-trips through the snapshot', () => {
  it('restores an unresolved excursion from JSONB', () => {
    const saved = JSON.parse(JSON.stringify(
      turn({ message: 'What is thermal conductivity?' }).decision.state,
    ))
    const restored = parseExcursionState(saved)
    expect(restored.active).toBe(true)
    expect(restored.targetTopicTitle).toBe('thermal conductivity')
    expect(restored.targetConceptId).toBeNull()
    expect(restored.returnToConceptId).toBe(PHYS_LESSON)
  })

  it('an excursion with neither identity is no excursion', () => {
    expect(parseExcursionState({ active: true, turns: 3 })).toEqual(NO_EXCURSION)
    expect(parseExcursionState({ active: true, targetTopicTitle: '   ' })).toEqual(NO_EXCURSION)
  })

  it('a concept id always wins over a title on the same row', () => {
    // A hand-edited row cannot attach a title of its own to a real concept and
    // have the prompt announce it.
    const restored = parseExcursionState({
      active: true, targetConceptId: 'phys.fluid.viscosity', targetTopicTitle: 'something else',
    })
    expect(restored.targetConceptId).toBe('phys.fluid.viscosity')
    expect(restored.targetTopicTitle).toBeNull()
  })

  it('a title from a corrupt row is trimmed and length-capped', () => {
    const restored = parseExcursionState({ active: true, targetTopicTitle: `  ${'x'.repeat(500)}  ` })
    expect(restored.targetTopicTitle!.length).toBe(90)
  })

  it('a state written before this field existed is not read as active', () => {
    // `undefined !== null` would have declared this active with nothing to teach.
    const legacy = { active: true, targetConceptId: null, returnToConceptId: PHYS_LESSON, turns: 1 }
    expect(parseExcursionState(legacy)).toEqual(NO_EXCURSION)
    const decision = decideExcursion({
      state: legacy as unknown as ExcursionState,
      message: 'Why?',
      lessonConceptId: PHYS_LESSON,
      requestedConceptId: null,
      requestedTopicTitle: null,
      lastAssistantAskedQuestion: false,
    })
    expect(decision.state.active).toBe(false)
  })
})
