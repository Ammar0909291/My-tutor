/**
 * PHASE 7M-A — a learner asking to PRACTISE is genuine new intent.
 *
 * THE SEMANTICS QUESTION 7M ASKED FIRST, and the answer the repository gives:
 * COMPLETED does NOT mean "mastered". It means "this ATTEMPT ended". The proof
 * is structural, not interpretive — a single completed attempt carries
 * `conceptsMastered` AND `conceptsNeedingReview` as separate fields, plus a
 * separate `fullyMastered` flag, and the schema note states the authoritative
 * current status of a concept lives in TopicProgress, not here: "That is
 * evidence, not duplicated state."
 *
 * So a lesson that ends with the budget spent and nothing mastered is CORRECTLY
 * recorded COMPLETED. That semantic is NOT changed here, and this file asserts
 * it stays intact.
 *
 * THE ACTUAL DEFECT was never the status — it was the escape hatch beside it.
 * route.ts already computes `lessonCompletionRespectsNewIntentHoisted` from a
 * prior "completion-lock investigation", explicitly so "D0a can yield" while
 * "the lesson stays recorded COMPLETED regardless; nothing here reopens it".
 * Its six disjuncts are all about going ELSEWHERE (excursion / resolvable
 * off-lesson concept / named unknown topic) or about ASKING something
 * (question / question announcement / distress).
 *
 * "Keep teaching me THIS" was invisible to every one of them — and Phase 7D
 * made it more so, by deliberately resolving "practice problem" to no concept
 * and no topic title. Measured in production 2026-08-25 with the attempt
 * COMPLETED at 0/0: both "give me a practice problem" and "no wait i dont want
 * to stop, i want to practice" returned the close script, with
 * newIntentAfterCompletion false and groq_invoked=false.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { readTurnIntent } from '@/lib/teaching/turnIntent'
import { isQuestionAnnouncement, shouldFinalizeLesson, requiredConceptsForLesson,
         closedConceptIds } from '@/lib/teaching/lessonCompletion'
import { isGenuineQuestion } from '@/lib/understanding/readers/conversationReader'
import { namedTopicUnknownTo } from '@/lib/teaching/visual/requestedTopic'
import { startLessonAttempt } from '@/lib/teaching/lessonAttempt'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
const TIR_TEXT =
  'Total Internal Reflection and Critical Angle. Light hits a boundary beyond the ' +
  'critical angle and is completely reflected back into the denser medium.'

/** The production phrasings that were swallowed. */
const PRACTICE = [
  'give me a practice problem',
  'no wait i dont want to stop, i want to practice',
  'quiz me',
  'test me',
  'give me a practice question',
  "let's practice",
]

// ═══════════════════════════════════════════════════════════════════════════
// 1. WHY THE OTHER FIVE DISJUNCTS CANNOT FIRE — the blind spot, pinned
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7M-A — the existing signals are all blind to a practice request', () => {
  for (const m of PRACTICE) {
    it(`"${m}" is not a question, not a question announcement, and names no topic`, () => {
      expect(isGenuineQuestion(m)).toBe(false)
      expect(isQuestionAnnouncement(m)).toBe(false)
      // Phase 7D deliberately resolves these to NO topic — which is correct,
      // and is exactly why disjuncts 2 and 3 can never rescue them.
      expect(namedTopicUnknownTo(m, TIR_TEXT)).toBeNull()
    })
  }

  it('but every one of them IS recognised as a practice request (Phase 7H)', () => {
    for (const m of PRACTICE) expect(readTurnIntent(m, null).wantsPractice).toBe(true)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 2. THE WIRING — the new disjunct is actually in the route
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7M-A — the escape hatch consults it', () => {
  it('wantsPractice is a disjunct of lessonCompletionRespectsNewIntentHoisted', () => {
    const at = ROUTE.indexOf('lessonCompletionRespectsNewIntentHoisted = excursionDecision.state.active')
    expect(at).toBeGreaterThan(-1)
    const block = ROUTE.slice(at, at + 500)
    expect(block).toContain('turnIntent.wantsPractice')
  })

  it('it is guarded by lessonCompletedHoisted — it can only act on a COMPLETED lesson', () => {
    const at = ROUTE.indexOf('lessonCompletionRespectsNewIntentHoisted = excursionDecision.state.active')
    expect(ROUTE.slice(Math.max(0, at - 2600), at)).toContain('if (lessonCompletedHoisted)')
  })

  it('the existing five disjuncts are all still present — none was replaced', () => {
    const at = ROUTE.indexOf('lessonCompletionRespectsNewIntentHoisted = excursionDecision.state.active')
    const block = ROUTE.slice(at, at + 500)
    for (const d of ['excursionDecision.state.active', 'requestedConceptIdThisTurn != null',
                     'requestedTopicTitleThisTurn != null', 'turnIntent.isQuestion',
                     'recoveryKeyHoisted !== null', 'isQuestionAnnouncement(message)']) {
      expect(block).toContain(d)
    }
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 3. COMPLETION SEMANTICS UNCHANGED — the negative controls
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7M-A — completion semantics are NOT weakened', () => {
  const attempt = () => startLessonAttempt({ lessonKey: 'lesson:108', lessonTitle: 'TIR', startedAt: new Date() })

  it('needsReview still counts as CLOSED — the P6 definition is untouched', () => {
    const folded = { ...attempt(), conceptsNeedingReview: ['phys.opt.total-internal-reflection'] }
    expect(closedConceptIds(folded)).toContain('phys.opt.total-internal-reflection')
    expect(shouldFinalizeLesson(requiredConceptsForLesson('phys.opt.total-internal-reflection'), folded)).toBe(true)
  })

  it('an already-COMPLETED attempt is still never finalised twice', () => {
    const done = { ...attempt(), status: 'COMPLETED' as const,
                   conceptsNeedingReview: ['phys.opt.total-internal-reflection'] }
    expect(shouldFinalizeLesson(requiredConceptsForLesson('phys.opt.total-internal-reflection'), done)).toBe(false)
  })

  it('an unresolved lesson still cannot complete itself', () => {
    expect(shouldFinalizeLesson(requiredConceptsForLesson(null), attempt())).toBe(false)
  })

  it('nothing in this change reopens an attempt — the route says so and means it', () => {
    const at = ROUTE.indexOf('lessonCompletionRespectsNewIntentHoisted = excursionDecision.state.active')
    const header = ROUTE.slice(Math.max(0, at - 2200), at)
    expect(header).toContain('the lesson')
    expect(header).toContain('stays recorded COMPLETED')
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 4. NEGATIVE CONTROLS — ordinary turns must still get the close
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7M-A — D0a still owns everything else', () => {
  const CLOSED_OUT = [
    'ok', 'thanks', 'got it', 'cool', 'nice', 'okay thanks',
    "I'm done", 'stop for today', 'bye',
  ]
  for (const m of CLOSED_OUT) {
    it(`"${m}" is NOT a practice request, so D0a still serves the close`, () => {
      expect(readTurnIntent(m, null).wantsPractice).toBe(false)
    })
  }

  it('a refusal to be questioned is not a practice request', () => {
    expect(readTurnIntent("don't ask me any more questions", null).wantsPractice).toBe(false)
    expect(readTurnIntent('stop asking me questions', null).wantsPractice).toBe(false)
  })

  it('THE INVERSION GUARD: refusing to practise is not requesting it', () => {
    // The first-person pattern added in 7M-A would otherwise read these as
    // requests. The negation alternation is what stops it, and this pins it.
    expect(readTurnIntent("I don't want to practice", null).wantsPractice).toBe(false)
    expect(readTurnIntent('I do not want to practise', null).wantsPractice).toBe(false)
    expect(readTurnIntent('stop practice for today', null).wantsPractice).toBe(false)
  })

  it('and the bare first-person request IS now covered', () => {
    // The exact production message from 2026-08-25.
    expect(readTurnIntent('no wait i dont want to stop, i want to practice', null).wantsPractice).toBe(true)
    expect(readTurnIntent('i want to practice', null).wantsPractice).toBe(true)
    expect(readTurnIntent("i'd like to practise", null).wantsPractice).toBe(true)
  })

  it('no mastery field is touched by this signal', () => {
    const intent = readTurnIntent('give me a practice problem', null)
    expect(JSON.stringify(intent)).not.toContain('checkCorrect')
    expect(JSON.stringify(intent)).not.toContain('practiceCorrect')
    expect(JSON.stringify(intent)).not.toContain('verified')
  })
})
