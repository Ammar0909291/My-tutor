/**
 * Learner-Move Interpreter, Batch 0 — the purity guard.
 *
 * Design: `docs/architecture/LEARNER_MOVE_INTERPRETER_DESIGN.md` §6, §8, §9.
 * The whole reason this module composes rather than decides is that the one
 * prior reimplementation on record (`conversationDecision.CONFUSION_RE`)
 * drifted and reached learners (design doc §3.3). This file is the
 * structural enforcement that `learnerMove.ts` can never repeat that: fails
 * the build if the module contains a regex literal, a phrase array, or an
 * import from anything outside a named detector module — matching the
 * `turnProgress.test.ts` C1-C4 precedent (structural assertions against the
 * module's own source, not against its behaviour).
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import {
  readLearnerMove, refineLearnerMove,
  type LearnerMoveKind, type LearnerMoveReading, type MessageOnlyDetectorOutputs,
} from '@/lib/teaching/learnerMove'
import type { TurnIntent } from '@/lib/teaching/turnIntent'
import type { TutorMCQ } from '@/lib/teaching/mcq'

const SRC_PATH = path.join(process.cwd(), 'src/lib/teaching/learnerMove.ts')
const src = fs.readFileSync(SRC_PATH, 'utf8')

// Comments cite the incident/design history this module must not repeat
// (that is the point of the comments); the constraints below are about CODE.
// `turnProgress.test.ts`'s own STRUCTURAL block strips only WHOLE-line
// comments, which is not enough here: this module documents its detector
// mapping with trailing `// ...` comments beside each taxonomy member
// (`'ANSWER_ATTEMPT'        // engagesPendingOptions — ...`), so block
// comments are removed first, then any `//` remaining on a line (verified
// above, by inspection, that no string literal in this file contains `//`,
// so stripping from the first `//` on a line never eats real code).
const code = src
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .split('\n')
  .map((l) => l.replace(/\/\/.*$/, ''))
  .join('\n')

/** Every string/template literal removed, so what remains of a `/` character
 *  can only be a regex literal or a division operator — this module needs
 *  neither. */
function withoutStringLiterals(text: string): string {
  return text
    .replace(/`(?:\\.|[^`\\])*`/g, '``')
    .replace(/"(?:\\.|[^"\\])*"/g, '""')
    .replace(/'(?:\\.|[^'\\])*'/g, "''")
}

/** The module's allowed import surface: the modules that own the detectors
 *  this file composes (design doc §3, §7), plus `turnIntent.ts` itself,
 *  which is the pre-composed struct this module folds over. Listed for the
 *  FULL detector surface (including the 7 Batch-3 orphans) so later batches
 *  that only ADD an import do not also need to widen this allowlist. */
const ALLOWED_IMPORT_MODULES = [
  './turnIntent',
  './recoveryGuard',
  './masteryGate',
  './conversationState',
  './capabilityModel',
  './claimChallengeGuard',
  './excursion',
  './mcq',
  './sessionLifecycle',
  './visual/session',
  './visual/requestedTopic',
  '../understanding/readers/conversationReader',
]

describe('STRUCTURAL — the purity guard (design doc §6, §8 Batch 0, §9 items 1/5/8)', () => {
  it('contains no regex literal and no RegExp(...) construction', () => {
    const stripped = withoutStringLiterals(code)
    expect(stripped).not.toContain('/')
    expect(code).not.toMatch(/\bRegExp\(/)
    expect(code).not.toMatch(/\.test\(|\.exec\(/)
  })

  it('contains no phrase-list array (2+ adjacent string-literal array elements)', () => {
    expect(code).not.toMatch(/\[\s*(['"][^'"]*['"]\s*,\s*){1,}['"][^'"]*['"]\s*\]/)
  })

  it('imports only from a named detector module, or from type-only sibling modules', () => {
    const importLines = [...code.matchAll(/^import\s+.*?from\s+['"]([^'"]+)['"]/gm)].map((m) => m[1])
    expect(importLines.length).toBeGreaterThan(0)
    for (const modulePath of importLines) {
      expect(ALLOWED_IMPORT_MODULES).toContain(modulePath)
    }
  })

  it('makes no model/provider call and writes nothing (Permanent Rule 9, design doc §9 items 3/5)', () => {
    expect(code).not.toMatch(/routeAI|prisma|fetch\(|console\./)
  })

  it('never calls resolveMcqChoice (design doc §6.1, §7, §9 item 3 — grading is untouched)', () => {
    expect(code).not.toMatch(/resolveMcqChoice/)
  })

  it('the closed taxonomy has exactly the 17 members the design doc names (§6)', () => {
    const EXPECTED: LearnerMoveKind[] = [
      'ANSWER_ATTEMPT', 'QUESTION_ABOUT_TOPIC', 'QUESTION_ABOUT_TASK',
      'HELP_REQUEST', 'PRACTICE_REQUEST', 'DISTRESS', 'NOT_KNOWING',
      'ACKNOWLEDGEMENT', 'SATISFACTION', 'CLAIM_CHALLENGE', 'STATED_INABILITY',
      'NAVIGATION', 'AUTONOMY', 'CORRECTION', 'RETURN_TO_LESSON', 'STOP',
      'UNINTERPRETABLE',
    ]
    for (const kind of EXPECTED) expect(src).toContain(`'${kind}'`)
    // No 18th member: every quoted UPPER_SNAKE_CASE token on its own line in
    // the type union is one of the 17 named above.
    const declared = [...src.matchAll(/^\s*\|\s*'([A-Z_]+)'/gm)].map((m) => m[1])
    expect(declared.sort()).toEqual([...EXPECTED].sort())
  })
})

// ── Behavioural: exercised directly, since Batch 0 has zero route.ts
// consumers to exercise it through. ───────────────────────────────────────

const BASE_INTENT: TurnIntent = {
  message: '',
  failureState: null,
  isQuestion: false,
  wantsToStop: false,
  learnerRequest: null,
  visualForm: null,
  wantsPractice: false,
  conflicts: [],
  ambiguous: false,
}

const NO_EXTRA: MessageOnlyDetectorOutputs = {
  isBareAcknowledgement: false,
  isLowSignalAcknowledgement: false,
}

describe('readLearnerMove — stage A, message-only', () => {
  it('an ordinary teaching-answer turn is UNINTERPRETABLE, not silently empty', () => {
    const reading = readLearnerMove({ ...BASE_INTENT, message: 'the anode' }, NO_EXTRA)
    expect(reading.uninterpretable).toBe(true)
    expect(reading.has('UNINTERPRETABLE')).toBe(true)
    expect(reading.signals).toHaveLength(1)
    expect(reading.stage).toBe('message-only')
  })

  it('distress alone fires DISTRESS but not NOT_KNOWING (confused is not a dont_know key)', () => {
    const reading = readLearnerMove({ ...BASE_INTENT, message: 'i give up', failureState: 'give_up' }, NO_EXTRA)
    expect(reading.has('DISTRESS')).toBe(true)
    expect(reading.has('NOT_KNOWING')).toBe(false)
  })

  it('"I don\'t know" fires BOTH DISTRESS and NOT_KNOWING — multi-label, not collapsed', () => {
    const reading = readLearnerMove(
      { ...BASE_INTENT, message: "I don't know", failureState: 'dont_know' },
      NO_EXTRA,
    )
    expect(reading.has('DISTRESS')).toBe(true)
    expect(reading.has('NOT_KNOWING')).toBe(true)
    expect(reading.signals.length).toBeGreaterThanOrEqual(2)
  })

  it('the design doc\'s own worst-case multi-fire message keeps every label (§4.1)', () => {
    // "I do not understand. Can you show me a picture?" — failureState,
    // isQuestion, learnerRequest all fire together in production.
    const reading = readLearnerMove(
      {
        ...BASE_INTENT,
        message: 'I do not understand. Can you show me a picture?',
        failureState: 'dont_understand',
        isQuestion: true,
        learnerRequest: 'diagram',
      },
      NO_EXTRA,
    )
    expect(reading.has('DISTRESS')).toBe(true)
    expect(reading.has('NOT_KNOWING')).toBe(true)
    expect(reading.has('QUESTION_ABOUT_TASK')).toBe(true)
    expect(reading.has('HELP_REQUEST')).toBe(true)
    expect(reading.uninterpretable).toBe(false)
  })

  it('signals are ordered by confidence, descending, never truncated to one', () => {
    const reading = readLearnerMove(
      { ...BASE_INTENT, message: 'x', isQuestion: true, learnerRequest: 'diagram' },
      { isBareAcknowledgement: false, isLowSignalAcknowledgement: false },
    )
    expect(reading.signals.length).toBe(2)
    expect(reading.signals[0].confidence).toBeGreaterThanOrEqual(reading.signals[1].confidence)
  })

  it('an acknowledgement is read from `extra`, never re-detected from the message', () => {
    // The message itself looks nothing like an acknowledgement — proving the
    // signal came from `extra`, not from re-parsing `intent.message`.
    const reading = readLearnerMove(
      { ...BASE_INTENT, message: 'zzz not an ack at all' },
      { isBareAcknowledgement: true, isLowSignalAcknowledgement: false },
    )
    expect(reading.has('ACKNOWLEDGEMENT')).toBe(true)
  })

  it('conflicts and ambiguous are carried through unchanged, never resolved', () => {
    const conflicts = [{ code: 'STOP_AND_QUESTION' as const, detail: 'both' }]
    const reading = readLearnerMove(
      { ...BASE_INTENT, message: 'x', wantsToStop: true, isQuestion: true, conflicts, ambiguous: true },
      NO_EXTRA,
    )
    expect(reading.conflicts).toEqual(conflicts)
    expect(reading.ambiguous).toBe(true)
  })

  // Batch 0 (original assertion, kept verbatim): "the 7 Batch-3 orphan kinds
  // never fire in Batch 0 — deferred, not weakened". Batch 3 now wires all
  // seven, and this exact fixture turns out to genuinely contain a
  // navigation-shaped request ("can we go back to fractions?") — the
  // message never changed, only whether the detector was wired to read it.
  // Superseded by the two tests below: one pinning the now-CORRECT positive
  // reads (NAVIGATION, RETURN_TO_LESSON), one confirming the other 5 orphans
  // still correctly do not fire on this same message.
  //
  //   it('the 7 Batch-3 orphan kinds never fire in Batch 0 — deferred, not weakened', () => {
  //     const reading = readLearnerMove(
  //       { ...BASE_INTENT, message: 'got it, thanks. can we go back to fractions? i was wrong about that' },
  //       NO_EXTRA,
  //     )
  //     for (const orphan of [
  //       'SATISFACTION', 'CLAIM_CHALLENGE', 'STATED_INABILITY',
  //       'NAVIGATION', 'AUTONOMY', 'CORRECTION', 'RETURN_TO_LESSON',
  //     ] as const) {
  //       expect(reading.has(orphan)).toBe(false)
  //     }
  //   })

  it('Batch 3: the SAME fixture now correctly fires NAVIGATION and RETURN_TO_LESSON', () => {
    const reading = readLearnerMove(
      { ...BASE_INTENT, message: 'got it, thanks. can we go back to fractions? i was wrong about that' },
      NO_EXTRA,
    )
    // Verified directly against the real detectors: both genuinely match
    // "can we go back to fractions?" — this is the detector now doing its
    // job, not a false positive introduced by wiring it.
    expect(reading.has('NAVIGATION')).toBe(true)
    expect(reading.has('RETURN_TO_LESSON')).toBe(true)
  })

  it('Batch 3: the other 5 orphan kinds still do not fire on this same message', () => {
    const reading = readLearnerMove(
      { ...BASE_INTENT, message: 'got it, thanks. can we go back to fractions? i was wrong about that' },
      NO_EXTRA,
    )
    for (const orphan of ['SATISFACTION', 'CLAIM_CHALLENGE', 'STATED_INABILITY', 'AUTONOMY', 'CORRECTION'] as const) {
      expect(reading.has(orphan)).toBe(false)
    }
  })
})

describe('Batch 3 — the 7 previously-orphan detectors, now wired into stage A', () => {
  it('SATISFACTION fires on a genuine sign-off, not on a doubt wearing its clothes', () => {
    expect(readLearnerMove({ ...BASE_INTENT, message: 'got it, thanks' }, NO_EXTRA).has('SATISFACTION')).toBe(true)
    expect(
      readLearnerMove({ ...BASE_INTENT, message: 'got it, but why does the gradient matter?' }, NO_EXTRA).has('SATISFACTION'),
    ).toBe(false)
  })

  it('CLAIM_CHALLENGE fires on a direct factual dispute, not on an ordinary question', () => {
    expect(
      readLearnerMove({ ...BASE_INTENT, message: 'wait, i thought oxygen has 6 valence electrons' }, NO_EXTRA).has('CLAIM_CHALLENGE'),
    ).toBe(true)
    expect(
      readLearnerMove({ ...BASE_INTENT, message: 'why does oxygen have 6 valence electrons?' }, NO_EXTRA).has('CLAIM_CHALLENGE'),
    ).toBe(false)
  })

  it('STATED_INABILITY fires on an explicit disclaimed capability, not on ordinary struggle', () => {
    expect(
      readLearnerMove({ ...BASE_INTENT, message: "i can't do multiplication" }, NO_EXTRA).has('STATED_INABILITY'),
    ).toBe(true)
    expect(
      readLearnerMove({ ...BASE_INTENT, message: 'this is a bit tricky for me' }, NO_EXTRA).has('STATED_INABILITY'),
    ).toBe(false)
  })

  it('STATED_INABILITY joins MULTIPLE disclaimed capabilities into one detail string', () => {
    const reading = readLearnerMove(
      { ...BASE_INTENT, message: "i can't do multiplication and i can't do division either" },
      NO_EXTRA,
    )
    const signal = reading.signals.find((s) => s.kind === 'STATED_INABILITY')
    expect(signal).toBeDefined()
    expect(signal!.detail).toBe('multiply,divide')
  })

  it('NAVIGATION fires on a request to switch topic, not on an ordinary statement', () => {
    expect(
      readLearnerMove({ ...BASE_INTENT, message: 'can we switch to fractions instead' }, NO_EXTRA).has('NAVIGATION'),
    ).toBe(true)
    expect(
      readLearnerMove({ ...BASE_INTENT, message: 'fractions are hard' }, NO_EXTRA).has('NAVIGATION'),
    ).toBe(false)
  })

  it('AUTONOMY fires on an explicit request to advance, not on an unrelated message', () => {
    expect(
      readLearnerMove({ ...BASE_INTENT, message: "ok let's move on" }, NO_EXTRA).has('AUTONOMY'),
    ).toBe(true)
    expect(
      readLearnerMove({ ...BASE_INTENT, message: "i'm not confused" }, NO_EXTRA).has('AUTONOMY'),
    ).toBe(false)
  })

  it('CORRECTION fires on an explicit subject correction, not on ordinary confusion', () => {
    expect(
      readLearnerMove({ ...BASE_INTENT, message: "i'm not studying calculus, i'm studying physics" }, NO_EXTRA).has('CORRECTION'),
    ).toBe(true)
    expect(
      readLearnerMove({ ...BASE_INTENT, message: 'i am studying this but i do not understand' }, NO_EXTRA).has('CORRECTION'),
    ).toBe(false)
  })

  it('RETURN_TO_LESSON fires on an explicit ask to go back, not on an unrelated message', () => {
    expect(
      readLearnerMove({ ...BASE_INTENT, message: 'can we go back to what we were doing' }, NO_EXTRA).has('RETURN_TO_LESSON'),
    ).toBe(true)
    expect(
      readLearnerMove({ ...BASE_INTENT, message: 'what happens next' }, NO_EXTRA).has('RETURN_TO_LESSON'),
    ).toBe(false)
  })
})

const MCQ: TutorMCQ = {
  question: 'What is 1/2 + 1/4?',
  options: ['1/4', '3/4', '2/6', '1/6'],
  correctIndex: 1,
}

describe('refineLearnerMove — stage B, state-refined', () => {
  it('is monotone: never drops a stage-A signal, only relabels the stage when nothing new fires', () => {
    const staged = readLearnerMove({ ...BASE_INTENT, message: 'i give up', failureState: 'give_up' }, NO_EXTRA)
    const refined = refineLearnerMove(staged, { pendingProbe: null, taughtText: null, lessonConceptId: null })
    expect(refined.has('DISTRESS')).toBe(true)
    expect(refined.stage).toBe('state-refined')
  })

  it('adds ANSWER_ATTEMPT when a probe is pending and the reply engages an option', () => {
    const staged = readLearnerMove({ ...BASE_INTENT, message: 'B' }, NO_EXTRA)
    expect(staged.uninterpretable).toBe(true)
    const refined = refineLearnerMove(staged, { pendingProbe: MCQ, taughtText: null, lessonConceptId: null })
    expect(refined.has('ANSWER_ATTEMPT')).toBe(true)
    expect(refined.uninterpretable).toBe(false)
    // The synthetic UNINTERPRETABLE placeholder is dropped once a real
    // signal exists — it is not left standing alongside a real reading.
    expect(refined.has('UNINTERPRETABLE')).toBe(false)
  })

  it('does not add ANSWER_ATTEMPT when no probe is pending, whatever the message says', () => {
    const staged = readLearnerMove({ ...BASE_INTENT, message: 'B' }, NO_EXTRA)
    const refined = refineLearnerMove(staged, { pendingProbe: null, taughtText: null, lessonConceptId: null })
    expect(refined.has('ANSWER_ATTEMPT')).toBe(false)
  })

  it('splits QUESTION_ABOUT_TASK into QUESTION_ABOUT_TOPIC when a topic outside the lesson is named — additively (§4.2)', () => {
    const staged = readLearnerMove(
      { ...BASE_INTENT, message: 'What is thermal conductivity?', isQuestion: true },
      NO_EXTRA,
    )
    expect(staged.has('QUESTION_ABOUT_TASK')).toBe(true)
    const refined = refineLearnerMove(staged, {
      pendingProbe: null,
      taughtText: 'This lesson covers free body diagrams and net force.',
      lessonConceptId: null,
    })
    // Additive, per the design doc's own monotone rule: QUESTION_ABOUT_TASK
    // is NOT removed even though QUESTION_ABOUT_TOPIC is now also present.
    expect(refined.has('QUESTION_ABOUT_TASK')).toBe(true)
    expect(refined.has('QUESTION_ABOUT_TOPIC')).toBe(true)
  })

  it('"What causes friction?" inside a friction lesson stays QUESTION_ABOUT_TASK only (design doc §4.3)', () => {
    const staged = readLearnerMove(
      { ...BASE_INTENT, message: 'What causes friction?', isQuestion: true },
      NO_EXTRA,
    )
    const refined = refineLearnerMove(staged, {
      pendingProbe: null,
      taughtText: 'Friction opposes relative motion between two surfaces in contact.',
      lessonConceptId: null,
    })
    expect(refined.has('QUESTION_ABOUT_TASK')).toBe(true)
    expect(refined.has('QUESTION_ABOUT_TOPIC')).toBe(false)
  })

  it('does not run the topic check at all when the message was not a question', () => {
    const staged = readLearnerMove({ ...BASE_INTENT, message: 'teach me about the mole concept' }, NO_EXTRA)
    expect(staged.has('QUESTION_ABOUT_TASK')).toBe(false)
    const refined = refineLearnerMove(staged, {
      pendingProbe: null,
      taughtText: 'Free body diagrams show every force on an object.',
      lessonConceptId: null,
    })
    expect(refined.has('QUESTION_ABOUT_TOPIC')).toBe(false)
  })
})

// Type-only reference so `LearnerMoveReading` is exercised by the compiler
// even though no test constructs one by hand.
const _typeCheck: (r: LearnerMoveReading) => boolean = (r) => r.uninterpretable
void _typeCheck
