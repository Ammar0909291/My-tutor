/**
 * VISUAL RE-SHOW REQUESTS — "show the picture again" must never become a
 * topic, an excursion, or a prompt-leaked instruction.
 *
 * THE DEFECT, measured live (10-lesson chemistry observation study,
 * 2026-09-06, real account, deployed app). A weak-English, visual-dependent
 * persona's fixed line — "can you show the picture again, i want to look
 * one more time" — was sent after every visual across a 10-lesson random
 * sample spanning all five chemistry difficulty tiers. `extractRequestedTopic`
 * correctly classifies `picture`/`image`/`diagram` as medium nouns (the
 * FORM of the answer, not a subject), but `again`, `want`, `look`, `more`,
 * `once` and `see` were not classified at all, so `namedTopicUnknownTo`'s
 * "is every word a medium noun or lesson machinery" filter never reached
 * true and the phrase survived as a genuine "something else" topic:
 *
 *   title: "picture again, i want to look one more time"
 *
 * That title became `excursionTeachingTitleHoisted` in route.ts and, from
 * there, `buildExcursionDirective`'s `target` — which literally instructs
 * the model: `THE LEARNER IS CURRENTLY LEARNING "picture again, i want to
 * look one more time". ... Teach "picture again, i want to look one more
 * time" directly and properly`. Two independent production failures traced
 * to exactly this:
 *
 *   - chem.pblock.group15: two consecutive assessment turns quizzed the
 *     learner on "why do people look at diagrams again" instead of Group 15
 *     chemistry — the model teaching the bogus "topic" it was handed.
 *   - chem.thermo.entropy: the reply printed the directive's own vocabulary
 *     back at the learner verbatim: "...use the phrase 'picture again, i
 *     want to look one more time' in your description" — an internal
 *     instruction leaking into learner-visible text (P0).
 *
 * THE FIX: `isPureVisualRepeatRequest` (requestedTopic.ts), consulted by
 * BOTH `namedTopicUnknownTo` (the excursion path) and
 * `requestTargetsSomethingElse` (the visual-target path) — one definition,
 * per that file's own stated design principle. It strips the "one more
 * time"/"once more" idiom as a PHRASE first (so `time` is correctly treated
 * as consumed by the idiom exactly where the idiom occurs, and left as
 * ordinary — and protected — subject vocabulary everywhere else, e.g.
 * "explain time dilation"), then checks that everything else is a medium
 * noun, existing lesson-machinery vocabulary, or the small local re-show
 * filler set. Checked against all 1,775 concept titles across six subjects:
 * none depends on any of these words as its sole distinguishing vocabulary.
 */
import { describe, it, expect } from 'vitest'
import {
  namedTopicUnknownTo, isPureVisualRepeatRequest, extractRequestedTopic,
} from '@/lib/teaching/visual/requestedTopic'
import { resolveVisualTarget, requestTargetsSomethingElse } from '@/lib/teaching/visual/resolveVisualTarget'
import { decideExcursion, buildExcursionDirective, NO_EXCURSION } from '@/lib/teaching/excursion'
import { resolveRequestedConceptId } from '@/lib/teaching/concept/requestedConcept'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'

const LESSON = 'chem.thermo.entropy'   // the exact concept the P0 leak occurred on
const LESSON_NODE = getKGNode(LESSON)!
const TAUGHT = [LESSON_NODE.title, LESSON_NODE.description ?? ''].join(' ')

// ═══════════════════════════════════════════════════════════════════════════
// 1. THE MANDATORY REGRESSION CASES — exact phrasings from the remediation
//    brief, plus the natural variants this study actually produced.
// ═══════════════════════════════════════════════════════════════════════════
const MUST_NOT_NAME_A_TOPIC = [
  // the exact production strings
  'can you show the picture again, i want to look one more time',
  'show the picture again',
  'can you show that image again',
  // weak-English / natural variants
  'can you show the diagram again',
  'show me the graph one more time',
  'let me look at it once more',
  'can you show me that figure again please',
  'show it to me one more time',
]

describe('Visual re-show requests never name a topic (namedTopicUnknownTo)', () => {
  for (const message of MUST_NOT_NAME_A_TOPIC) {
    it(`"${message}" -> null`, () => {
      expect(namedTopicUnknownTo(message, TAUGHT)).toBeNull()
    })
  }

  // Already correct before this fix — no trigger verb at all — pinned so a
  // future change cannot regress the one variant that was never broken.
  it('"i want to look at it one more time" was already null and stays null', () => {
    expect(namedTopicUnknownTo('i want to look at it one more time', TAUGHT)).toBeNull()
  })
})

describe('Visual re-show requests never claim a NEW figure was requested (requestTargetsSomethingElse)', () => {
  function target(message: string) {
    return resolveVisualTarget(message, LESSON, 'chemistry')!
  }
  for (const message of MUST_NOT_NAME_A_TOPIC) {
    it(`"${message}" -> false`, () => {
      expect(requestTargetsSomethingElse(message, target(message))).toBe(false)
    })
  }
})

// ═══════════════════════════════════════════════════════════════════════════
// 2. END TO END — the actual leak path, reproduced with the real modules.
//    Proves no excursion opens and the directive the model reads is EMPTY,
//    so the leaked phrase has no prompt text to escape from.
// ═══════════════════════════════════════════════════════════════════════════
describe('End to end: no excursion opens, no directive text exists to leak', () => {
  for (const message of [
    'can you show the picture again, i want to look one more time',
    'show the picture again',
    'can you show that image again',
  ]) {
    it(`"${message}" opens no excursion and builds an empty directive`, () => {
      const requestedConceptId = resolveRequestedConceptId(message, LESSON, 'chemistry')
      expect(requestedConceptId).toBeNull()
      const requestedTopicTitle = namedTopicUnknownTo(message, TAUGHT)?.title ?? null
      const decision = decideExcursion({
        state: NO_EXCURSION,
        message,
        lessonConceptId: LESSON,
        requestedConceptId,
        requestedTopicTitle,
      })
      expect(decision.state.active).toBe(false)
      expect(decision.transition).toBe('none')
      const directive = buildExcursionDirective({
        decision,
        targetTitle: decision.targetTopicTitle,
        lessonTitle: LESSON_NODE.title,
      })
      // The structural guarantee: an empty directive cannot contain the
      // learner's own words, so the exact P0 leak ("use the phrase '...' in
      // your description") has no instruction text to be echoed from.
      expect(directive).toBe('')
    })
  }

  it('the exact leaked phrase never appears in any directive the excursion module can build for this input', () => {
    const message = 'can you show the picture again, i want to look one more time'
    const requestedTopicTitle = namedTopicUnknownTo(message, TAUGHT)?.title ?? null
    const decision = decideExcursion({
      state: NO_EXCURSION, message, lessonConceptId: LESSON,
      requestedConceptId: null, requestedTopicTitle,
    })
    const directive = buildExcursionDirective({
      decision, targetTitle: decision.targetTopicTitle, lessonTitle: LESSON_NODE.title,
    })
    expect(directive).not.toContain('picture again')
    expect(directive).not.toContain('one more time')
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 3. NEGATIVE CONTROLS — genuine topic requests, including ones that share
//    vocabulary with the new filler set, must keep resolving.
//    A fix that passes section 1 by breaking these is NOT acceptable.
// ═══════════════════════════════════════════════════════════════════════════
describe('NEGATIVE CONTROLS: legitimate requests are unaffected', () => {
  it('a genuinely unknown named topic still opens an excursion', () => {
    expect(namedTopicUnknownTo('teach me quadratic equations', TAUGHT)).not.toBeNull()
  })

  it('"explain time dilation" still names its topic — "time" stays protected outside the idiom', () => {
    const t = namedTopicUnknownTo('explain time dilation', TAUGHT)
    expect(t).not.toBeNull()
    expect(t!.title).toBe('time dilation')
  })

  it('a real off-lesson subject request resolves as a learner-request target, not the lesson fallback', () => {
    // requestTargetsSomethingElse only ever answers for the FALLBACK target
    // ("Only the fallback can be wrong in this way" — its own docstring); a
    // concept the learner actually named resolves directly here instead, by
    // construction. Confirms the fix does not make a genuine cross-subject
    // request fall through to the lesson's own figure.
    const t = resolveVisualTarget('explain photosynthesis', LESSON, 'chemistry')!
    expect(t.origin).toBe('learner-request')
    expect(t.conceptId).toBe('bio.plant.photosynthesis')
  })

  it('"show me a diagram of mitosis" still names mitosis, not just the medium noun', () => {
    const t = namedTopicUnknownTo('show me a diagram of mitosis', TAUGHT)
    expect(t).not.toBeNull()
    expect(t!.title).toContain('mitosis')
  })

  it('a bare medium-noun request (no repeat language) is still suppressed exactly as before', () => {
    expect(namedTopicUnknownTo('show me a diagram', TAUGHT)).toBeNull()
  })

  it('an ordinary in-lesson follow-up about the current topic is untouched', () => {
    expect(namedTopicUnknownTo('why does temperature change it?', TAUGHT)).toBeNull()
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 4. THE UNIT UNDER TEST, DIRECTLY — isPureVisualRepeatRequest
// ═══════════════════════════════════════════════════════════════════════════
describe('isPureVisualRepeatRequest — the shared predicate', () => {
  it('true for a medium noun plus the "one more time" idiom', () => {
    const topic = extractRequestedTopic('can you show the picture again, i want to look one more time', 1, true)!
    expect(isPureVisualRepeatRequest(topic)).toBe(true)
  })

  it('false when a genuine subject word survives alongside the idiom', () => {
    const topic = extractRequestedTopic('show me the mole concept diagram one more time', 1, true)!
    expect(isPureVisualRepeatRequest(topic)).toBe(false)
  })

  it('false for an ordinary named topic with no medium noun and no filler', () => {
    const topic = extractRequestedTopic('teach me quadratic equations', 1, true)!
    expect(isPureVisualRepeatRequest(topic)).toBe(false)
  })
})
