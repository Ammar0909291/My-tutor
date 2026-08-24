/**
 * PHASE 4 · D — persisted ConversationState across a ladder cutover.
 *
 * THE QUESTION THIS ANSWERS. `ConversationState` is persisted as JSON on
 * `LearnSession.contextSnapshot.conversationState` (Prisma: `contextSnapshot
 * Json?`) and read back by `readConversationState` at eight call sites in
 * the chat route. If a future cutover writes canonical 10-state phase names
 * into that field, what happens to a session that is then read by code
 * expecting the 6-phase vocabulary — during a canary, during a rollback, or
 * on any instance that has not yet picked up the new build?
 *
 * THE ANSWER, MEASURED HERE. `readConversationState` admits a stored state
 * only when `PHASE_ORDER.includes(raw.phase)`. Eight of the ten canonical
 * names are not in `PHASE_ORDER`, so the stored ladder is DISCARDED and
 * rebuilt from zero: phase OBSERVE, `demonstrated` false, and — decisively —
 * `correctAtCheck` and `correctAtPractice` back to 0, which revokes
 * `masteryVerified()` for a learner who had already earned it.
 *
 * The module's own A2b note calls this exact behaviour "catastrophic,
 * silently" when it fires for any reason other than a genuine concept
 * change, and `inspectConversationStateRead` already labels the cause
 * `unreadable-phase`. What was missing was the statement that a ladder
 * cutover is a way to CAUSE it.
 *
 * The remaining two canonical names, DEMONSTRATE and TRANSFER, are worse
 * than discarded: they collide with legacy names and are kept, so the state
 * survives and is silently REINTERPRETED under different gate semantics.
 *
 * CONSEQUENCE FOR THE ROLLOUT (this is the whole point of the file): a
 * cutover that persists canonical names is NOT reversible by flag. Flags roll
 * back instantly; persisted data does not. Any rollback after such a write
 * wipes every in-flight ladder that had passed a mastery gate.
 *
 * Nothing here modifies production data or production behaviour. It pins the
 * read contract so that a migration plan is designed against it rather than
 * discovering it in a canary.
 */
import { describe, it, expect } from 'vitest'
import {
  initialConversationState, readConversationState, inspectConversationStateRead,
  advanceConversationState, PHASE_ORDER,
  type ConversationState,
} from '@/lib/teaching/conversationState'
import { PHASE_ORDER_10, canonicalToLegacy, legacyToCanonical } from '@/lib/kernel/tsm/phases'
import { masteryVerified, masteryVerifiedStrict } from '@/lib/teaching/masteryGate'

const CONCEPT = 'phys.mech.newtons-first-law'

/** A learner who has genuinely earned mastery on this concept. */
function earnedState(): ConversationState {
  let s: ConversationState = { ...initialConversationState(CONCEPT), demonstrated: true }
  for (let i = 0; i < 30 && s.phase !== 'TRANSFER'; i++) {
    s = advanceConversationState(s, {
      askedQuestion: true, signalCorrect: true, recoveryFired: false,
      signalVerificationStatus: 'CLEAN',
    })
  }
  return s
}

describe('the persisted read contract, as it stands today', () => {
  it('a legacy-vocabulary state round-trips with mastery intact', () => {
    const earned = earnedState()
    expect(masteryVerified(earned)).toBe(true)
    expect(masteryVerifiedStrict(earned)).toBe(true)

    const readBack = readConversationState(JSON.parse(JSON.stringify(earned)), CONCEPT)
    expect(readBack.phase).toBe('TRANSFER')
    expect(readBack.correctAtCheck).toBe(1)
    expect(readBack.correctAtPractice).toBe(2)
    expect(masteryVerified(readBack)).toBe(true)
    expect(masteryVerifiedStrict(readBack)).toBe(true)
    expect(inspectConversationStateRead(earned, CONCEPT).reason).toBe('kept')
  })

  it('the reader admits exactly the six legacy names and nothing else', () => {
    for (const p of PHASE_ORDER) {
      expect(inspectConversationStateRead({ ...earnedState(), phase: p }, CONCEPT).reset).toBe(false)
    }
    expect(inspectConversationStateRead({ ...earnedState(), phase: 'NOT_A_PHASE' as never }, CONCEPT))
      .toMatchObject({ reset: true, reason: 'unreadable-phase' })
  })
})

describe('D — what a canonical-vocabulary cutover would do to live sessions', () => {
  it('PINNED: 8 of the 10 canonical names WIPE the ladder and revoke earned mastery', () => {
    const wiped: string[] = []
    const kept: string[] = []
    for (const cp of PHASE_ORDER_10) {
      const stored = { ...earnedState(), phase: cp as never }
      const diag = inspectConversationStateRead(stored, CONCEPT)
      if (diag.reset) {
        expect(diag.reason).toBe('unreadable-phase')
        const readBack = readConversationState(stored, CONCEPT)
        expect(readBack.phase).toBe('OBSERVE')
        expect(readBack.correctAtCheck).toBe(0)
        expect(readBack.correctAtPractice).toBe(0)
        expect(readBack.demonstrated).toBe(false)
        // The consequence that matters: a learner who had earned completion
        // authority silently loses it.
        expect(masteryVerified(readBack)).toBe(false)
        expect(masteryVerifiedStrict(readBack)).toBe(false)
        wiped.push(cp)
      } else {
        kept.push(cp)
      }
    }
    expect(wiped).toEqual([
      'DIAGNOSE', 'ANCHOR', 'NAME', 'FORMALIZE', 'GUIDED',
      'INDEPENDENT', 'REFLECT', 'ASSESS',
    ])
    // Name collisions. Not a reprieve — see the next test.
    expect(kept).toEqual(['DEMONSTRATE', 'TRANSFER'])
  })

  it('PINNED: the two colliding names are KEPT and silently reinterpreted', () => {
    // Canonical DEMONSTRATE sits at index 2 of a ten-rung ladder (after
    // ANCHOR, before NAME). Legacy DEMONSTRATE sits at index 1 of six (after
    // OBSERVE, before GUIDE). The reader cannot tell them apart, so a state
    // written under one set of gate semantics is read under the other with
    // no diagnostic at all.
    const stored = { ...earnedState(), phase: 'DEMONSTRATE' as never }
    const diag = inspectConversationStateRead(stored, CONCEPT)
    expect(diag).toMatchObject({ reset: false, reason: 'kept' })
    const readBack = readConversationState(stored, CONCEPT)
    expect(readBack.phase).toBe('DEMONSTRATE')
    // The counters survive — under gate semantics that never produced them.
    expect(readBack.correctAtCheck).toBe(1)
    expect(readBack.correctAtPractice).toBe(2)
    expect(masteryVerified(readBack)).toBe(true)
  })

  it('a rollback is therefore NOT symmetric with a flag flip', () => {
    // Forward: legacy state read by canonical-aware code is fine, because
    // legacyToCanonical is total over the legacy names.
    for (const p of PHASE_ORDER) {
      expect(PHASE_ORDER_10).toContain(legacyToCanonical(p))
    }
    // Backward: canonical state read by legacy code is NOT fine — 8 of 10
    // names are discarded (previous test). So the write is one-way until the
    // reader is made total over both vocabularies.
    const readerIsTotalOverCanonical = PHASE_ORDER_10.every(
      (cp) => !inspectConversationStateRead({ ...earnedState(), phase: cp as never }, CONCEPT).reset,
    )
    expect(readerIsTotalOverCanonical).toBe(false)
  })
})

describe('the deterministic migration strategy, stated as executable properties', () => {
  /**
   * The strategy this pins is the only one that is safe under an instant
   * rollback, and it is deliberately the cheapest:
   *
   *   M1. NEVER widen the persisted vocabulary. `contextSnapshot
   *       .conversationState.phase` continues to hold ONLY the six legacy
   *       names, whatever the in-memory authority becomes.
   *   M2. If a canonical machine is ever introduced, it is projected to a
   *       legacy name on WRITE (`canonicalToLegacy`) and lifted on READ
   *       (`legacyToCanonical`) — so no persisted byte changes meaning.
   *   M3. Because that projection is lossy (10 -> 6), any canonical-only
   *       distinction must ride a SEPARATE, additive, optional field that a
   *       legacy reader ignores — never the `phase` field itself.
   *   M4. No migration of existing rows is required, and none should be
   *       written: under M1-M3 every stored row is already valid.
   *
   * The properties below are what make M1-M4 true rather than asserted.
   */

  it('M2 — the projection is total in both directions over the legacy vocabulary', () => {
    for (const p of PHASE_ORDER) {
      expect(canonicalToLegacy(legacyToCanonical(p))).toBe(p)
    }
  })

  it('M3 — the projection is lossy, so `phase` alone cannot carry canonical state', () => {
    const images = new Map<string, string[]>()
    for (const cp of PHASE_ORDER_10) {
      const l = canonicalToLegacy(cp)
      images.set(l, [...(images.get(l) ?? []), cp])
    }
    // Four legacy names are the image of two canonical states each. Any
    // design that stores only the legacy name cannot recover which.
    const collapsed = [...images.entries()].filter(([, v]) => v.length > 1)
    expect(collapsed.map(([k, v]) => [k, v])).toEqual([
      ['OBSERVE', ['DIAGNOSE', 'ANCHOR']],
      ['DEMONSTRATE', ['DEMONSTRATE', 'NAME']],
      ['GUIDE', ['FORMALIZE', 'GUIDED']],
      ['CHECK', ['REFLECT', 'ASSESS']],
    ])
  })

  it('M4 — every state the shipping ladder can reach is already readable', () => {
    // Exhaustive over phases x the counters that appear in a stored row.
    for (const phase of PHASE_ORDER) {
      for (const check of [0, 1, 2]) {
        for (const practice of [0, 1, 2, 3]) {
          const stored: ConversationState = {
            ...initialConversationState(CONCEPT), phase,
            correctAtCheck: check, correctAtPractice: practice, demonstrated: true,
          }
          const back = readConversationState(JSON.parse(JSON.stringify(stored)), CONCEPT)
          expect(back.phase).toBe(phase)
          expect(back.correctAtCheck).toBe(check)
          expect(back.correctAtPractice).toBe(practice)
          expect(masteryVerified(back)).toBe(masteryVerified(stored))
        }
      }
    }
  })

  it('a concept change still resets, and that is correct — the two causes are distinguishable', () => {
    const earned = earnedState()
    expect(inspectConversationStateRead(earned, 'phys.mech.newtons-second-law'))
      .toMatchObject({ reset: true, reason: 'concept-changed' })
    expect(inspectConversationStateRead(null, CONCEPT))
      .toMatchObject({ reset: true, reason: 'no-stored-state' })
    // `unreadable-phase` is the only one a cutover can introduce, which is
    // what makes it the signal to watch during any ladder rollout.
    expect(inspectConversationStateRead({ ...earned, phase: 'ASSESS' as never }, CONCEPT))
      .toMatchObject({ reset: true, reason: 'unreadable-phase' })
  })
})
