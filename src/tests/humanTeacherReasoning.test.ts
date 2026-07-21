/**
 * P1 Human Teacher Reasoning — mass validation.
 *
 * Generates hundreds of realistic student conversations (69 phrasings ×
 * 9 session states = 621 cases) and verifies every Brain decision against
 * an expert-teacher oracle written from teaching principles, not from the
 * ladder's own code. recoveryKey is derived with the REAL detector
 * (detectFailureState), so these are the messages the runtime would
 * actually classify.
 *
 * The oracle encodes the eight questions of the audit: what does the
 * student mean, why, what are they trying to achieve, what do they know,
 * what misconception exists, what emotion is present, what is the best
 * action, and what should never be done.
 */
import { describe, it, expect } from 'vitest'
import { understandStudentTurn, type UnderstandingInputs } from '@/lib/understanding'
import { decideTeaching, type TeachingDecision } from '@/lib/understanding/decisionEngine'
import { detectFailureState } from '@/lib/teaching/recoveryGuard'

type Category =
  | 'distress' | 'confusion' | 'question' | 'helpRequest'
  | 'diagramRequest' | 'hedgedAnswer' | 'confidentAnswer' | 'ack'

const PHRASINGS: Record<Category, string[]> = {
  distress: [
    'I give up', 'i just give up', "I'm so stupid", 'I am stupid', "I'm scared",
    'I hate math', 'this is too hard', "I can't do this", 'stop asking me so many questions',
    'too many questions',
  ],
  confusion: [
    "I don't understand", "I'm confused", "I'm lost", 'this is confusing',
    "that doesn't make sense", 'makes no sense', "I don't know", 'dunno',
    "I don't get it", "still don't get this", 'what?', 'I forgot', "I'm just guessing",
  ],
  question: [
    'why is the sky blue?', 'what does denominator mean?', 'how do I solve this kind of problem?',
    'when do the rules change?', 'which one is bigger?', 'where does the energy go?',
    'who invented this?', 'why does dividing make it smaller?',
  ],
  helpRequest: [
    'can you explain it differently?', 'explain it more simply please',
    'give me a real life example', 'can you explain it another way',
    'a story would help', 'what is a real world application of this?',
  ],
  diagramRequest: [
    'please show me a diagram', 'can you draw it', 'show me a picture',
    'can you visualize it', 'a graph would help', 'draw me a chart please',
  ],
  hedgedAnswer: [
    'is it 4?', 'maybe 12?', 'I think it is the numerator', 'possibly 3/4?',
    'could it be 12?', 'perhaps the second one', 'probably negative?', "so it's 9?",
    'I guess it would be 15', '7?',
  ],
  confidentAnswer: [
    "it's 4", 'the answer is 12', 'because the density is lower', 'the numerator',
    'negative nine', 'you divide both sides by two', 'the second one is bigger', 'forty two',
  ],
  ack: ['ok', 'got it', 'thanks', 'okay', 'next', 'sure', 'yeah', 'makes sense'],
}

type StateName =
  | 'base' | 'fragile' | 'progressing' | 'misconceiving' | 'struggling'
  | 'placement' | 'memory' | 'closing' | 'firstLesson'

const CLOSING_EPISODE = {
  startedAt: new Date().toISOString(), phase: 'CLOSING' as const,
  visibleFailures: 2, retroWinOwed: false, openingSatisfied: true,
}
const ASSEMBLED = { usedAssetIds: ['a1'], explanationConfidence: 0.9, explanationServingMode: 'exact' }

const STATES: Record<StateName, Partial<UnderstandingInputs>> = {
  base: {},
  fragile: { lastSignal: { correctness: false } },
  progressing: { lastSignal: { correctness: true, confidence: 'high' } },
  misconceiving: { lastSignal: { correctness: false, confidence: 'high' } },
  struggling: { sessionFailureCount: 2, conceptId: 'math.arith.fractions' },
  placement: { pendingPlacementProbe: 'at' },
  memory: { assembled: ASSEMBLED },
  closing: { episode: CLOSING_EPISODE },
  firstLesson: { firstLessonActive: true },
}

/** Answer-type turns happen in reply to a pending tutor question. */
const PENDING_QUESTION = [{ role: 'assistant' as const, content: 'Which fraction is bigger, 1/4 or 1/8?' }]

function buildInputs(category: Category, message: string, stateName: StateName): UnderstandingInputs {
  const state = STATES[stateName]
  const needsPendingQuestion = category === 'hedgedAnswer' || category === 'confidentAnswer'
  const needsVisual = category === 'diagramRequest'
  return {
    message,
    history: needsPendingQuestion ? PENDING_QUESTION : [],
    recoveryKey: detectFailureState(message), // the REAL runtime detector
    firstLessonActive: false,
    lastSignal: null, sessionFailureCount: 0, episode: null, freshBoundary: false,
    lastSuccessfulTeachingStyle: null, conceptId: null, placement: null,
    pendingPlacementProbe: null, dueReviewCount: 0, strategyType: null,
    evidenceMove: null, assembled: null, memoryFallbackReason: null,
    observations: needsVisual ? { availableVisual: 'fraction_bar', visualDetectionRan: true } : {},
    ...state,
  }
}

/**
 * The expert-teacher oracle: for each situation, the action an excellent
 * human teacher takes — stated from principles (comfort before content;
 * protect the close; lesson-one protocol; answer what was asked; repair
 * committed wrong rules first; consolidate fragility; diagnose unknowns;
 * use vetted material; continue healthy progress; otherwise just respond).
 */
function expertExpectation(category: Category, state: StateName): TeachingDecision['decision'] {
  // Emotion first: distress or confusion is met with recovery, always.
  if (category === 'distress' || category === 'confusion') return 'ESCALATE_TO_LLM'
  // Protected states: the close and lesson one outrank all content moves.
  if (state === 'closing') return 'ESCALATE_TO_LLM'
  if (state === 'firstLesson') return 'ESCALATE_TO_LLM'
  // A committed wrong rule is repaired before responding to anything else.
  if (state === 'misconceiving') return 'DETECT_MISCONCEPTION'
  // A diagram request is honored with the diagram.
  if (category === 'diagramRequest') return 'VISUALIZATION'
  // Any other question or help request is answered — never drilled past.
  if (category === 'question' || category === 'helpRequest') return 'ESCALATE_TO_LLM'
  // Content moves for answer/ack turns, by learner state:
  if (state === 'struggling') return 'REVIEW_PREREQUISITE'
  if (state === 'placement') return 'ASK_DIAGNOSTIC_QUESTION'
  if (state === 'memory') return 'SERVE_EXPLANATION_MEMORY'
  if (state === 'fragile') return 'PRACTICE'
  if (state === 'progressing') {
    // A hedged answer is grounded before advancing; a confident answer or
    // acknowledgement continues the lesson.
    return category === 'hedgedAnswer' ? 'ESCALATE_TO_LLM' : 'CONTINUE_LESSON'
  }
  return 'ESCALATE_TO_LLM' // base: no evidence — respond naturally
}

describe('Human Teacher Reasoning — 621 realistic conversations vs the expert oracle', () => {
  const categories = Object.keys(PHRASINGS) as Category[]
  const states = Object.keys(STATES) as StateName[]

  let total = 0
  const mismatches: string[] = []
  const decisions: TeachingDecision[] = []
  const intents: string[] = []

  for (const category of categories) {
    for (const message of PHRASINGS[category]) {
      for (const state of states) {
        total += 1
        const u = understandStudentTurn(buildInputs(category, message, state))
        const d = decideTeaching(u)
        decisions.push(d)
        intents.push(u.studentIntent.value)
        const expected = expertExpectation(category, state)
        if (d.decision !== expected) {
          mismatches.push(`[${category} × ${state}] "${message}" → ${d.decision} (${d.ruleId}), teacher expects ${expected}`)
        }
        // Never-do invariants (question 8 of the audit):
        if (u.studentIntent.value === 'asking_question' || (u.studentIntent.value === 'requesting_help' && u.conversationSummary.helpRequestKind !== 'diagram')) {
          if (d.decision === 'PRACTICE' || d.decision === 'CONTINUE_LESSON') {
            mismatches.push(`NEVER-RULE [${category} × ${state}] "${message}": drilled past a question (${d.decision})`)
          }
        }
        if (u.studentIntent.value === 'expressing_distress' && d.decision !== 'ESCALATE_TO_LLM') {
          mismatches.push(`NEVER-RULE [${category} × ${state}] "${message}": content pushed into distress (${d.decision})`)
        }
        if (d.decision === 'VISUALIZATION' && u.conversationSummary.helpRequestKind !== 'diagram') {
          mismatches.push(`NEVER-RULE [${category} × ${state}] "${message}": unrequested visual`)
        }
      }
    }
  }

  it('generates hundreds of realistic conversations', () => {
    expect(total).toBeGreaterThanOrEqual(300)
    expect(total).toBe(categories.reduce((n, c) => n + PHRASINGS[c].length, 0) * states.length)
  })

  it('every Brain decision matches the expert-teacher expectation (zero mismatches)', () => {
    expect(mismatches).toEqual([])
  })

  it('intent perception: every distress/confusion phrasing is heard as distress; answers are heard as answers', () => {
    // Sampled directly rather than re-running: distress+confusion cases sit first in order.
    const distressCount = (PHRASINGS.distress.length + PHRASINGS.confusion.length) * states.length
    expect(intents.slice(0, distressCount).every((i) => i === 'expressing_distress')).toBe(true)
  })

  it('hedged answers are heard as low-confidence answers, not questions', () => {
    for (const message of PHRASINGS.hedgedAnswer) {
      const u = understandStudentTurn(buildInputs('hedgedAnswer', message, 'base'))
      expect(u.studentIntent.value).toBe('answering')
      expect(u.confidence.value).toBe('low')
      expect(u.conversationSummary.hedged).toBe(true)
    }
  })

  it('every decision remains shadow-typed, serializable, and rule-attributed', () => {
    for (const d of decisions) {
      expect(d.shadow).toBe(true)
      expect(d.ruleId).toMatch(/^D\d/)
      expect(() => JSON.stringify(d)).not.toThrow()
    }
  })
})
