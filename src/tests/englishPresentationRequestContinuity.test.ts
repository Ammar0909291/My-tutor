/**
 * A PRESENTATION REQUEST NEVER SILENTLY CHANGES THE ACTIVE CONCEPT.
 *
 * ── THE DEFECT, reported and reproduced ─────────────────────────────────────
 * Two real-account English lessons derailed on an ordinary weak-English
 * request for a simpler explanation:
 *
 *   `eng.grammar.nouns`
 *     learner: "sorry i not understand, can you explain again slow, with
 *               easy example"
 *     tutor:   abandoned Nouns and taught basic counting/addition instead.
 *
 *   `eng.phonics.blending-segmenting`
 *     learner: (after a picture/diagram request phrased with the same
 *               "explain ... slow" shape)
 *     tutor:   abandoned phonics and switched into generic
 *               flowchart/diagram literacy.
 *
 * ── THE SHARED ROOT CAUSE ────────────────────────────────────────────────────
 * `DISCOURSE_NOUNS` (requestedTopic.ts) is the ONE list both the excursion
 * lifecycle (excursion.ts, via `namedTopicUnknownTo`) and the concept resolver
 * (requestedConcept.ts, via `isDiscourseOnlyMatch`/`resolveNamedTopicHead`)
 * consult to decide whether a phrase names a genuine topic. It already listed
 * 'slowly', 'clearly' and 'carefully' — the adverb forms — but not their bare
 * adjective forms, which is exactly the word a learner reaches for when they
 * drop the "-ly" suffix (documented ESL grammar, not a typo). So "explain
 * again slow, with easy example" reduced to the words {slow, easy}; 'easy' is
 * discourse, 'slow' was not, so ONE non-discourse word survived and the whole
 * phrase read as a genuine topic name. An unresolved-topic excursion opened,
 * and the model — told to "teach '<garbled phrase>' directly and properly" —
 * improvised content from whatever concrete word survived in the raw title
 * text (which is NOT word-filtered, only the comparison is): "easy example"
 * for nouns, "diagram" for phonics, matching both reports exactly.
 *
 * This is not English-specific, nouns-specific or phonics-specific: it is a
 * gap in a subject-agnostic word list, reachable from any active concept.
 *
 * ── THE FIX ───────────────────────────────────────────────────────────────
 * Added 'slow', 'clear', 'proper', 'careful' to `DISCOURSE_NOUNS`, completing
 * the bare-adjective coverage the file already had for 'quick'/'easy'/
 * 'different' but was missing for these three adverbs. No new list, no
 * concept-specific code, no new mechanism — the same generic vocabulary the
 * excursion lifecycle already trusted.
 */
import { describe, it, expect } from 'vitest'
import { resolveRequestedConceptId } from '@/lib/teaching/concept/requestedConcept'
import { namedTopicUnknownTo } from '@/lib/teaching/visual/requestedTopic'
import {
  decideExcursion,
  NO_EXCURSION,
  type ExcursionState,
} from '@/lib/teaching/excursion'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import { shouldSuppressSignalCorrectness } from '@/lib/teaching/answerableTurn'

const NOUNS = 'eng.grammar.nouns'
const PHONICS = 'eng.phonics.blending-segmenting'

/** The route's own wiring, reproduced exactly (mirrors unresolvedTopicExcursion.test.ts). */
function turn(opts: {
  message: string
  lesson: string
  state?: ExcursionState
  subject?: string
  lastAssistantAskedQuestion?: boolean
}) {
  const state = opts.state ?? NO_EXCURSION
  const requestedConceptId = resolveRequestedConceptId(opts.message, opts.lesson, opts.subject ?? 'english')

  const node = getKGNode(opts.lesson)
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
      lessonConceptId: opts.lesson,
      requestedConceptId,
      requestedTopicTitle,
      lastAssistantAskedQuestion: opts.lastAssistantAskedQuestion ?? false,
    }),
  }
}

describe('English presentation requests stay on the active concept', () => {
  it('1. explain slowly (adverb form) keeps the active concept — regression guard', () => {
    const { decision } = turn({
      message: "I don't understand, explain again slowly with an easy example.",
      lesson: NOUNS,
    })
    expect(decision.state.active).toBe(false)
    expect(decision.targetConceptId).toBe(NOUNS)
  })

  it('2. "another easy example" keeps the active concept', () => {
    const { decision } = turn({ message: 'Can you give me another easy example?', lesson: NOUNS })
    expect(decision.state.active).toBe(false)
    expect(decision.targetConceptId).toBe(NOUNS)
  })

  it('3. "show picture" keeps the active concept', () => {
    const { decision } = turn({ message: 'Can you show me a picture?', lesson: PHONICS })
    expect(decision.state.active).toBe(false)
    expect(decision.targetConceptId).toBe(PHONICS)
  })

  it('4. "show diagram" keeps the active concept', () => {
    const { decision } = turn({ message: 'Can you show me a diagram?', lesson: PHONICS })
    expect(decision.state.active).toBe(false)
    expect(decision.targetConceptId).toBe(PHONICS)
  })

  it('5. "explain this more simply" keeps the active concept', () => {
    const { decision } = turn({ message: 'Can you explain this more simply?', lesson: NOUNS })
    expect(decision.state.active).toBe(false)
    expect(decision.targetConceptId).toBe(NOUNS)
  })

  it('6. an explicit genuine topic change still opens an excursion', () => {
    const { decision } = turn({
      message: 'Can you teach me adjectives instead?',
      lesson: NOUNS,
    })
    expect(decision.state.active).toBe(true)
    expect(decision.targetConceptId).not.toBe(NOUNS)
    expect(decision.targetConceptId).not.toBeNull()
  })

  it('7. no generic flowchart/diagram-literacy excursion from a phonics diagram request', () => {
    const messages = [
      'sorry i not understand, can you show me picture or diagram, explain slow for me',
      'can you show me a diagram, explain it slow please',
      'sorry i dont get this, show diagram and explain slow',
    ]
    for (const message of messages) {
      const { decision, requestedTopicTitle } = turn({ message, lesson: PHONICS })
      expect(decision.state.active, `escaped on: "${message}"`).toBe(false)
      expect(decision.targetConceptId).toBe(PHONICS)
      expect(requestedTopicTitle).toBeNull()
    }
  })

  it('8. no arithmetic/off-topic excursion from the exact reported nouns simplification request', () => {
    const message = 'sorry i not understand, can you explain again slow, with easy example'
    const { decision, requestedTopicTitle } = turn({ message, lesson: NOUNS })
    expect(decision.state.active).toBe(false)
    expect(decision.targetConceptId).toBe(NOUNS)
    expect(requestedTopicTitle).toBeNull()
  })

  it('8b. the sibling "clear"/"careful" bare forms are also protected', () => {
    for (const adjective of ['clear', 'careful', 'proper']) {
      const message = `sorry i not understand, can you explain again ${adjective}, with easy example`
      const { decision } = turn({ message, lesson: PHONICS })
      expect(decision.state.active, `escaped on: "${message}"`).toBe(false)
      expect(decision.targetConceptId).toBe(PHONICS)
    }
  })

  it('9. an off-topic model-volunteered prose MCQ cannot become authoritative assessment', () => {
    // No pending structured MCQ (the server issued nothing gradeable this
    // turn) and the prior assistant turn poses a prose multiple-choice
    // question — the exact shape of an unauthored, off-topic model question.
    // The server must refuse to treat the model's own correctness claim as
    // evidence: it is not graded against any authored key.
    const decision = shouldSuppressSignalCorrectness({
      priorAssistantText:
        'Which of these is a flowchart shape?\nA) Rectangle\nB) Diamond\nC) Circle\nD) Triangle',
      hasPendingStructuredMcq: false,
    })
    expect(decision.suppress).toBe(true)
    expect(decision.reason).toBe('prose-mcq-ungradeable')
  })
})
