/**
 * The lesson OPENING (`/api/learn/lesson-init`) never folded its own closing
 * question into the anti-repetition ledger, so the chat route's very first
 * real turn had nothing to quote in its "DO NOT REPEAT" prompt block and
 * could freely repeat the opening's own question.
 *
 * REPRODUCED FROM PRODUCTION (2026-08-27, real account, two sessions):
 * `phys.mod.photons` — T0's closing observation question was repeated
 * byte-for-byte as T1, ignoring the learner's "okay that makes sense so
 * far"; `phys.mod.atomic-spectra` — a near-paraphrase of the same pattern.
 *
 * ROOT CAUSE: `lesson-init/route.ts` is a deliberately minimal endpoint (see
 * its own file header — "does NOT replicate the full route.ts system prompt
 * pipeline") and never imported `repetitionGuard.ts` at all. Its own
 * `writeSnapshotDelta` call reset the episode/visual-session/attempt state
 * but never touched `questionLedger`, so `findRepeatedQuestion`'s ledger —
 * read fresh by the chat route's very next turn — was empty even though the
 * learner had already been asked a question. `attemptIsolation.ts`'s own
 * documentation says `questionLedger` must survive across turns ("Clearing
 * it would let the tutor re-ask a question the learner already answered
 * minutes ago") — the opening simply never wrote to it in the first place.
 *
 * FIX: lesson-init now folds its own final (post figure-strip, post-scaffold-
 * strip) text into the SAME ledger the chat route reads and writes, via the
 * same `recordQuestions`/`readQuestionLedger` pair — no new ledger, no new
 * fold logic, just the missing write.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  emptyQuestionLedger, readQuestionLedger, recordQuestions, findRepeatedQuestion,
  buildAntiRepetitionBlock,
} from '@/lib/teaching/repetitionGuard'

const LESSON_INIT = readFileSync(
  join(process.cwd(), 'src/app/api/learn/lesson-init/route.ts'),
  'utf8',
)

// The exact repeated question class from production.
const OPENING_TEXT =
  'A single photon carries a fixed packet of energy, set only by its frequency. '
  + 'If we shine a dimmer light of the same colour on the metal, what do you think '
  + 'happens to the energy of each individual photon that hits it?'

describe('the opening turn now folds its own question into the ledger', () => {
  it('reproduces the defect: an empty ledger lets T1 repeat the opening verbatim', () => {
    // This is what every T1 turn saw before the fix — lesson-init wrote
    // nothing, so the chat route always started from an empty ledger.
    const emptyLedger = emptyQuestionLedger()
    expect(findRepeatedQuestion(emptyLedger, OPENING_TEXT)).toBeNull()
    // The anti-repetition prompt block has nothing to quote — it carries only
    // the generic stock-phrase warning, never the opening's own question.
    expect(buildAntiRepetitionBlock(emptyLedger)).not.toContain(
      'what do you think happens to the energy of each individual photon',
    )
  })

  it('once recorded, the SAME chat-route ledger machinery catches the repeat', () => {
    const ledgerAfterOpening = recordQuestions(emptyQuestionLedger(), OPENING_TEXT)
    const t1Draft =
      'Great, glad that makes sense! If we shine a dimmer light of the same colour '
      + 'on the metal, what do you think happens to the energy of each individual '
      + 'photon that hits it?'
    expect(findRepeatedQuestion(ledgerAfterOpening, t1Draft)).not.toBeNull()
    expect(buildAntiRepetitionBlock(ledgerAfterOpening)).toContain(
      'what do you think happens to the energy of each individual photon',
    )
  })

  it('readQuestionLedger is safe on a snapshot that predates this fix (no questionLedger key)', () => {
    expect(readQuestionLedger(undefined)).toEqual(emptyQuestionLedger())
    expect(readQuestionLedger(null)).toEqual(emptyQuestionLedger())
  })
})

describe('lesson-init wires the fold into its own snapshot write', () => {
  it('imports the same repetitionGuard pair the chat route uses — no parallel ledger', () => {
    expect(LESSON_INIT).toMatch(
      /const \{ recordQuestions, readQuestionLedger \} = await import\('@\/lib\/teaching\/repetitionGuard'\)/,
    )
  })

  it('folds the FINAL routed.text (after figure/scaffold repair) into the delta', () => {
    expect(LESSON_INIT).toMatch(
      /questionLedger: recordQuestions\(readQuestionLedger\(snapshot\?\.questionLedger\), routed\.text\)/,
    )
    // The fold must read from `snapshot` (the value captured at the START of
    // this request) as its base — not from a freshly re-read ledger baked
    // into the unconditional part of the delta, which would silently ignore
    // a version conflict rather than feeding it to `rederive`.
    const deltaBlock = LESSON_INIT.slice(LESSON_INIT.indexOf('delta: {'), LESSON_INIT.indexOf('rederive:'))
    expect(deltaBlock).toContain('questionLedger: recordQuestions(readQuestionLedger(snapshot?.questionLedger), routed.text)')
  })

  it('re-derives the ledger against the fresh snapshot on a write conflict, not the stale one', () => {
    // questionLedger is the one ACCUMULATIVE field in this delta (the other
    // two are pure resets), so it needs its own rederiver — the same
    // discipline route.ts's own snapshotRederivers use — rather than the
    // bare `rederive: () => ({})` this endpoint used before.
    expect(LESSON_INIT).toMatch(
      /rederive: \(fresh\) => \(\{\s*\n\s*questionLedger: recordQuestions\(readQuestionLedger\(fresh\.questionLedger\), routed\.text\),\s*\n\s*\}\)/,
    )
  })

  it('the fold sits inside the SAME writeSnapshotDelta call as the episode/visual/attempt resets', () => {
    // Not a second write — one atomic merge, so a lesson opening still costs
    // exactly one round trip.
    const writeCall = LESSON_INIT.slice(
      LESSON_INIT.indexOf('await writeSnapshotDelta(prisma, {'),
      LESSON_INIT.indexOf('await writeSnapshotDelta(prisma, {') + 900,
    )
    expect(writeCall).toContain('clearEpisodeForLessonOpen()')
    expect(writeCall).toContain('clearVisualSessionForNewClientView()')
    expect(writeCall).toContain('questionLedger: recordQuestions')
  })
})
