/**
 * ISS-08 (masterplan P0) — autonomy negation + anchoring guard, with fixtures.
 *
 * WHY THE ASYMMETRY MATTERS. A false positive appends [LESSON_COMPLETE] and
 * advances a learner past a concept they just said they were not done with —
 * the hollow advancement the mastery gate exists to prevent. A false negative
 * costs one repeated request. The fixtures below are weighted accordingly:
 * every ambiguous form is asserted to NOT advance.
 */
import { describe, it, expect } from 'vitest'
import {
  detectAutonomyRequest, detectNavigationRequest,
  detectLearnerQuestion, classifyAcknowledgementContext,
  buildAcknowledgementInstruction, initialConversationState,
  type ConversationState,
} from '@/lib/teaching/conversationState'

/** Genuine requests to advance — these MUST still be honored. Regressing any
 *  of these would make the platform ignore an explicit learner instruction,
 *  which is its own failure (P3 learner autonomy). */
const ADVANCE = [
  'move on',
  "let's move on",
  'can we move on',
  'ready to move on',
  'next topic please',
  'next lesson',
  'skip this',
  "let's continue",
  'ok I get it, move on',
  'MOVE ON',
  "move on, I'm not confused",     // negator AFTER the phrase — still advance
]

/** Requests to STAY, or mentions of the phrase. None may advance. */
const STAY = [
  "I don't want to move on",
  "I don't want to move on yet",
  'not ready to move on',
  "I'm not ready to move on",
  'can we not move on yet',
  'no, next topic is too fast',
  'wait before we move on',
  'stop, I need to move on later',
  "don't skip this",
  'never skip this part',
  'hold on — can we move on after one more example?',
  'I would rather not move on',
  'until I understand this, no next topic',
  'unless you explain it again, skip this is a bad idea',
]

/** Mentions rather than instructions. */
const MENTIONS = [
  'what does "move on" mean here?',
  "the book says to 'move on' after each section",
  'what do you mean by move on',
]

describe('ISS-08 — genuine advance requests still work', () => {
  it.each(ADVANCE)('advances on %j', (msg) => {
    expect(detectAutonomyRequest(msg)).toBe(true)
  })
})

describe('ISS-08 — negated forms never advance', () => {
  it.each(STAY)('does NOT advance on %j', (msg) => {
    expect(detectAutonomyRequest(msg)).toBe(false)
  })
})

describe('ISS-08 — mentions are not instructions', () => {
  it.each(MENTIONS)('does NOT advance on %j', (msg) => {
    expect(detectAutonomyRequest(msg)).toBe(false)
  })
})

describe('ISS-08 — unrelated messages are untouched', () => {
  it.each([
    'what is Henry\'s law?',
    'the ball moves faster on a slope',
    '',
    'ok',
  ])('does not fire on %j', (msg) => {
    expect(detectAutonomyRequest(msg)).toBe(false)
  })

  it('is deterministic and total', () => {
    for (const m of [...ADVANCE, ...STAY, ...MENTIONS]) {
      expect(detectAutonomyRequest(m)).toBe(detectAutonomyRequest(m))
    }
  })
})

// ── A.2 — Navigation detection ─────────────────────────────────────────
const NAVIGATE = [
  'go back to fractions',
  'take me to algebra',
  'take me back to the first lesson',
  'teach me about gravity',
  'switch to chemistry',
  'change topic to quadratics',
  'change to geometry',
  'I want to learn about photosynthesis',
  'can we do trigonometry',
  'can you cover Newton\'s laws',
  'can we go over derivatives again',
]

const NOT_NAVIGATE = [
  'what is gravity?',
  'this is hard',
  'move on',
  'next topic',
  'ok',
  '',
  'I like learning about math',
  'can you explain this differently',
  'show me a diagram',
]

describe('A.2 — navigation detection fires on explicit requests', () => {
  it.each(NAVIGATE)('detects %j', (msg) => {
    expect(detectNavigationRequest(msg)).toBe(true)
  })
})

describe('A.2 — navigation detection ignores non-navigation messages', () => {
  it.each(NOT_NAVIGATE)('does NOT fire on %j', (msg) => {
    expect(detectNavigationRequest(msg)).toBe(false)
  })
})

describe('A.2 — navigation and autonomy are mutually exclusive paths', () => {
  it('autonomy phrases are not navigation', () => {
    for (const msg of ADVANCE) {
      expect(detectNavigationRequest(msg)).toBe(false)
    }
  })
  it('navigation phrases are not autonomy', () => {
    for (const msg of NAVIGATE) {
      expect(detectAutonomyRequest(msg)).toBe(false)
    }
  })
})

// ── A.4 — Learner question detection ───────────────────────────────────
describe('A.4 — detectLearnerQuestion', () => {
  it.each([
    'why does the ball speed up?',
    'how do I solve this?',
    'what if the mass is doubled?',
    'what is kinetic energy?',
    'can you explain that differently?',
    'where does the force come from?',
  ])('detects %j', (msg) => {
    expect(detectLearnerQuestion(msg)).toBe(true)
  })

  it.each([
    'ok',
    'yes',
    'no',
    '42',
    'the answer is 5',
    'I think so',
    'short',
  ])('does NOT fire on %j', (msg) => {
    expect(detectLearnerQuestion(msg)).toBe(false)
  })
})

// ── B.13-17 — Acknowledgement Engine ────────────────────────────────────
describe('B.13-17 — Acknowledgement Engine', () => {
  const base = (): ConversationState => ({
    ...initialConversationState(null),
  })

  it('classifies recovery context', () => {
    expect(classifyAcknowledgementContext(base(), null, true, false)).toBe('recovery')
  })

  it('classifies navigation context', () => {
    expect(classifyAcknowledgementContext(base(), null, false, true)).toBe('navigation')
  })

  it('classifies confusion after multiple failures', () => {
    const s = { ...base(), consecutiveFailures: 3 }
    expect(classifyAcknowledgementContext(s, null, false, false)).toBe('confusion')
  })

  it('classifies correction on wrong answer', () => {
    expect(classifyAcknowledgementContext(base(), false, false, false)).toBe('correction')
  })

  it('classifies confidence-building for low-confidence correct', () => {
    const s = { ...base(), learnerConfidence: 'low' as const }
    expect(classifyAcknowledgementContext(s, true, false, false)).toBe('confidence_building')
  })

  it('classifies progress after 3+ correct answers', () => {
    const s = { ...base(), correctAtCheck: 1, correctAtPractice: 2 }
    expect(classifyAcknowledgementContext(s, true, false, false)).toBe('progress')
  })

  it('classifies understanding at TRANSFER phase', () => {
    const s = { ...base(), phase: 'TRANSFER' as const }
    expect(classifyAcknowledgementContext(s, true, false, false)).toBe('understanding')
  })

  it('classifies plain correct answer', () => {
    expect(classifyAcknowledgementContext(base(), true, false, false)).toBe('correct_answer')
  })

  it('classifies neutral when no signal', () => {
    expect(classifyAcknowledgementContext(base(), null, false, false)).toBe('neutral')
  })

  it('neutral produces empty instruction', () => {
    expect(buildAcknowledgementInstruction('neutral')).toBe('')
  })

  it('non-neutral produces ACKNOWLEDGEMENT directive', () => {
    const result = buildAcknowledgementInstruction('correct_answer')
    expect(result).toContain('ACKNOWLEDGEMENT')
    expect(result).toContain('Never open with generic filler')
  })

  it('recovery outranks navigation', () => {
    expect(classifyAcknowledgementContext(base(), null, true, true)).toBe('recovery')
  })
})
