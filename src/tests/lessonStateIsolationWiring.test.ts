/**
 * PHASE B — THE WIRING.
 *
 * lessonStateIsolation.test.ts proves the pure modules are correct. A correct
 * module nobody calls fixes nothing, and this codebase has already paid for
 * that lesson twice: `writeSnapshotDelta` named a table that did not exist and
 * every test passed for months (snapshotTableName.test.ts exists because of
 * it), and `sessionGenerationCount` was accepted by the visual resolver and
 * never passed by the route, so the per-session budget was silently unenforced.
 *
 * Both routes are too large and too I/O-bound to drive in a unit test, so these
 * assert the CALL SITES in source. A source assertion is weak evidence of
 * behaviour and strong evidence of wiring, which is exactly the gap here.
 */
import { describe, it, expect } from 'vitest'
import { lessonAttemptStartDecision } from '@/lib/teaching/lessonAttempt'
import { readFileSync } from 'fs'
import path from 'path'

const CHAT = readFileSync(path.join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
const INIT = readFileSync(path.join(process.cwd(), 'src/app/api/learn/lesson-init/route.ts'), 'utf8')

describe('the chat route reads and writes the pending question through its owner', () => {
  it('reads it via readPendingQuestion, with this turn\'s lesson key', () => {
    expect(CHAT).toMatch(/readPendingQuestion\(\s*\(snapshot as \{ pendingMcq\?: unknown \} \| null\)\?\.pendingMcq,\s*lessonKeyThisTurnHoisted,\s*\)/)
  })

  it('writes it via writePendingQuestion, with the SAME hoisted key', () => {
    // The invariant here is the KEY identity — read and write must stamp the
    // same lesson, or a question can grade a message from another lesson. The
    // question argument became `mcqToServe(...)` on 2026-08-30 so the response
    // and the snapshot cannot disagree about what is on screen; the key is
    // unchanged and is what this pins.
    expect(CHAT).toMatch(/conversationStateUpdate\.pendingMcq = writePendingQuestion\(\s*\n\s*mcqToServe\(mcqHoisted, pendingMcqHoisted, mcqGradeHoisted\),\s*\n\s*lessonKeyThisTurnHoisted,\s*\n\s*\)/)
  })

  it('derives that key with lessonKeyFor — no second lesson-identity scheme', () => {
    expect(CHAT).toMatch(/lessonKeyThisTurnHoisted = lessonKeyFor\(\{[\s\S]{0,160}?topicSlug: resolvedConceptId/)
  })

  it('no longer hand-parses the pending MCQ inline (the unguarded read is gone)', () => {
    // The old block validated shape and assigned pendingMcqHoisted directly.
    // If it comes back, it comes back without the identity check.
    expect(CHAT).not.toMatch(/pendingMcqHoisted = \{ question: p\.question/)
  })

  it('grades ONLY what that read returned — there is no second pending source', () => {
    // gradeMcqAnswer must be reached through pendingMcqHoisted, which is now
    // the guard's output. Any other argument would be an ungated path.
    const calls = CHAT.match(/gradeMcqAnswer\([^)]*\)/g) ?? []
    expect(calls.length).toBeGreaterThan(0)
    for (const c of calls) expect(c).toContain('pendingMcqHoisted')
  })
})

describe('the narrative arc is read with its concept key', () => {
  it('readNarrativeState is called with convConceptId', () => {
    expect(CHAT).toMatch(/readNarrativeState\(snapshotNarrativeState, convConceptId\)/)
  })
})

describe('lesson-init clears the per-attempt state, and only on an opened attempt', () => {
  it('composes the boundary from attemptIsolation, not from an inline list', () => {
    expect(INIT).toMatch(/import\(['"]@\/lib\/teaching\/attemptIsolation['"]\)/)
    expect(INIT).toMatch(/\{ clearTransientStateForNewAttempt \} = await import/)
  })

  it('is GATED on attemptIsFreshStart — a resume must clear none of it', () => {
    expect(INIT).toMatch(/\.\.\.\(attemptIsFreshStart \? clearTransientStateForNewAttempt\(\) : \{\}\)/)
  })

  it('the flag is set only where an attempt is actually opened', () => {
    // Phase 7L's own invariant. If this flag ever becomes unconditional the
    // gate above stops meaning anything.
    expect(INIT).toMatch(/openLessonAttempt\(prisma, \{[\s\S]{0,320}?\}\)\s*\n\s*attemptIsFreshStart =/)
    // Exactly one declaration (initialised false) and exactly one assignment.
    expect(INIT.match(/let attemptIsFreshStart = false/g) ?? []).toHaveLength(1)
    expect(INIT.match(/^\s*attemptIsFreshStart = /gm) ?? []).toHaveLength(1)
  })

  it('and `resume` never sets it, whatever the attempt table says', () => {
    // The one case where "an attempt was opened" and "the learner started
    // again" come apart: a mid-lesson refresh on a session predating
    // attempt-at-lesson-start. Opening the row is right; clearing is not.
    // The rule moved into the pure `lessonAttemptStartDecision`; asserting the
    // behaviour is stronger than the regex it replaces, and the wiring check
    // above already pins that lesson-init assigns from that one decision.
    expect(lessonAttemptStartDecision(null, 'resume').freshStart).toBe(false)
    for (const st of ['COMPLETED', 'IN_PROGRESS'] as const) {
      expect(lessonAttemptStartDecision({ status: st }, 'resume').freshStart).toBe(false)
    }
    expect(INIT).toMatch(/attemptIsFreshStart = decision\.freshStart/)
  })

  it('the four modes are still exactly restart / review / resume / next', () => {
    // The gate above is written in terms of one of them by name.
    expect(INIT).toMatch(/z\.enum\(\['restart', 'review', 'resume', 'next'\]\)/)
  })

  it('the episode and visual clears remain UNGATED — a wider, different boundary', () => {
    // A freshly opened client view renders nothing whether or not an attempt
    // was opened, so moving these behind the gate would reintroduce the
    // "look at the figure on your screen" defect on every resume.
    expect(INIT).toMatch(/\.\.\.clearEpisodeForLessonOpen\(\),\s*\n\s*\.\.\.clearVisualSessionForNewClientView\(\),/)
  })

  it('the delta still goes through writeSnapshotDelta — the column\'s single writer', () => {
    expect(INIT).toMatch(/writeSnapshotDelta\(prisma, \{[\s\S]{0,400}?clearTransientStateForNewAttempt/)
  })
})

describe('Phase A is untouched', () => {
  it('the grader module is not imported into the pending-question owner', () => {
    const PQ = readFileSync(path.join(process.cwd(), 'src/lib/teaching/pendingQuestion.ts'), 'utf8')
    // A TYPE-only import of TutorMCQ is the whole dependency. Anything else
    // would put a second opinion about grading beside the grader. Checked on
    // the CODE, with the leading doc block removed — the comment names
    // gradeMcqAnswer to explain the defect, which is not a dependency.
    const code = PQ.replace(/\/\*[\s\S]*?\*\//g, '')
    expect(PQ).toMatch(/import type \{ TutorMCQ \} from '\.\/mcq'/)
    expect(code).not.toMatch(/gradeMcqAnswer/)
    expect(code).not.toMatch(/^import(?! type)/m)
  })

  it('the two Phase 7P suppressions still guard the grade, unchanged', () => {
    expect(CHAT).toMatch(/if \(!isBareAcknowledgement\(message\) && !turnIntent\.wantsPractice\)/)
  })
})

describe('the teaching ledger is read under the LIVE concept, not the stale one', () => {
  it('memConceptId prefers libraryConceptNodeIdHoisted', () => {
    // `currentConceptNodeId` is written at the END of a turn, so on the first
    // turn of a switched-to lesson it still names the PREVIOUS one. Measured in
    // production: snapshotCurrentConceptId 'phys.em.ac-basics' while the live
    // node was 'phys.mech.kinematics-1d'. Reading the ledger under the stale id
    // matched the old lesson's history and put its used strategies, shown
    // visuals and asked MCQs into the new lesson's prompt.
    expect(CHAT).toMatch(
      /const memConceptId =\s*\n?\s*libraryConceptNodeIdHoisted \?\? snapshotCurrentConceptId \?\? resolvedConceptId \?\? null/,
    )
  })

  it('and agrees with the OTHER reader of the same store in the same turn', () => {
    // Two readers of one owner disagreeing about the key is how this drifted.
    expect(CHAT).toMatch(/readTeachingHistory\(sessionSnap\?\.teachingHistory, convConceptId\)/)
    expect(CHAT).toMatch(/const convConceptId = libraryConceptNodeIdHoisted \?\? snapshotCurrentConceptId \?\? resolvedConceptId \?\? null/)
  })

  it('matches the precedence the route already uses for concept identity', () => {
    for (const re of [
      /const currentConceptForMastery = libraryConceptNodeIdHoisted \?\? snapshotCurrentConceptId \?\? resolvedConceptId \?\? null/,
      /const activeConceptIdForDecide = libraryConceptNodeIdHoisted \?\? snapshotCurrentConceptId/,
    ]) expect(CHAT).toMatch(re)
  })
})
