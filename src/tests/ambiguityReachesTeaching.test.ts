/**
 * AN AMBIGUOUS TURN MAY NOT BE CLOSED OUT OF ITS OWN QUESTION. (Phase 4.)
 *
 * ── WHAT THE PHASE 4 AUDIT FOUND ────────────────────────────────────────────
 * `turnIntent.ambiguous` has exactly ONE consumer in the live runtime:
 * `decideExcursion` (Phase 2). Nothing downstream — the CUE, `decideTeaching`,
 * `planDispatch`, granularity, the visual layer, or the prompt — is told the
 * turn was ambiguous.
 *
 * For four of the five contradictory turns traced, that is harmless, because
 * the two sides are owned by two different systems and BOTH are honoured:
 * `wantsToStop` reaches `forceClosing` through the session lifecycle while the
 * question reaches the teaching decision. Ambiguity is not "one side silently
 * chosen" — it is two owners each doing their job.
 *
 * ── THE ONE PLACE THAT BREAKS, AND PHASE 2 CAUSED IT ────────────────────────
 * Both owners write into the SAME prompt, and there they contradict:
 *
 *   "I'm done for today, but what is a compound?"
 *     -> wantsToStop  -> forceClosing -> phase CLOSING -> the close block says
 *        "do NOT introduce new content, new questions"
 *     -> isQuestion   -> D4b ANSWER-STUDENT-FIRST -> answer the student
 *
 * The close block already had a deferral for exactly this shape — it is
 * withheld while an excursion is open, because it rendered in production as
 * "let's pause on that for today" while the learner was mid-question. But
 * ambiguity HOLDs the context (Phase 2), so no excursion opens, so
 * `excursionActive` is false BY CONSTRUCTION on precisely the turns that need
 * the deferral most. Our own Phase 2 change made an existing protection
 * unreachable in its most important case.
 *
 * The fix is that guard's own logic, extended by one condition. DEFERRED, NOT
 * REMOVED: the episode stays CLOSING and the close fires on the next turn, so
 * the stop is honoured — just not by discarding the question asked in the same
 * breath.
 *
 * ── WHAT IS DELIBERATELY NOT CHANGED ────────────────────────────────────────
 * Cases C and D ("Stop the lesson, but explain this one thing first." /
 * "Explain it simply, actually challenge me.") are read as NON-ambiguous
 * because no detector matches their second clause. That is a DETECTION gap, not
 * an ambiguity-propagation gap, and widening detectors was explicitly out of
 * scope. Recorded below as characterisation so a future change is measured, not
 * assumed.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  shouldInjectAffectClose, forceClosing, detectExplicitFinishRequest,
  type SessionEpisode,
} from '@/lib/teaching/sessionLifecycle'
import { readTurnIntent } from '@/lib/teaching/turnIntent'
import { decideExcursion, turnCountsForLesson } from '@/lib/teaching/excursion'
import { decideTeachingGranularity } from '@/lib/teaching/teachingGranularity'

const LESSON = 'chem.found.pure-substances'
const noExcursion = {
  active: false, targetConceptId: null, targetTopicTitle: null,
  returnToConceptId: null, turns: 0,
}
const ctxFor = (message: string) => {
  const ti = readTurnIntent(message, null)
  const ex = decideExcursion({
    state: noExcursion, message, lessonConceptId: LESSON,
    requestedConceptId: null, requestedTopicTitle: null,
    lastAssistantAskedQuestion: true, ambiguous: ti.ambiguous,
  })
  return { ti, ex, excursionActive: !turnCountsForLesson(ex) }
}

describe('Phase 4 — the close block defers to an ambiguous turn', () => {
  it('A — CLOSING + ambiguous => the close is WITHHELD (the new rule)', () => {
    expect(shouldInjectAffectClose({
      phase: 'CLOSING', excursionActive: false, ambiguousTurn: true,
    })).toBe(false)
  })

  it('B — CLOSING + clear stop => the close still fires (a stop remains a stop)', () => {
    expect(shouldInjectAffectClose({
      phase: 'CLOSING', excursionActive: false, ambiguousTurn: false,
    })).toBe(true)
  })

  it('C — the pre-existing excursion deferral is unchanged', () => {
    expect(shouldInjectAffectClose({
      phase: 'CLOSING', excursionActive: true, ambiguousTurn: false,
    })).toBe(false)
  })

  it('D — outside CLOSING the block never speaks, whatever the turn is', () => {
    for (const phase of ['OPENING', 'CORE'] as const) {
      for (const ambiguousTurn of [true, false]) {
        expect(shouldInjectAffectClose({ phase, excursionActive: false, ambiguousTurn })).toBe(false)
      }
    }
  })
})

describe('Phase 4 — the real turn that motivated this', () => {
  const message = "I'm done for today, but what is a compound?"

  it('E — it is simultaneously a stop, a question, and ambiguous', () => {
    const { ti } = ctxFor(message)
    expect(ti.wantsToStop).toBe(true)
    expect(ti.isQuestion).toBe(true)
    expect(ti.ambiguous).toBe(true)
    expect(ti.conflicts.map((c) => c.code)).toContain('STOP_AND_QUESTION')
  })

  it('F — Phase 2 guarantees excursionActive is FALSE here, which is why the old guard could not see it', () => {
    const { ex, excursionActive } = ctxFor(message)
    expect(ex.transition).toBe('none')          // context HELD
    expect(ex.targetConceptId).toBe(LESSON)     // context UNCHANGED
    expect(excursionActive).toBe(false)         // the old guard's condition
  })

  it('G — so the close is withheld only because ambiguity is now consulted', () => {
    const { ti, excursionActive } = ctxFor(message)
    expect(shouldInjectAffectClose({
      phase: 'CLOSING', excursionActive, ambiguousTurn: ti.ambiguous,
    })).toBe(false)
    // Proof this is ambiguity doing the work, not the excursion guard:
    expect(shouldInjectAffectClose({
      phase: 'CLOSING', excursionActive, ambiguousTurn: false,
    })).toBe(true)
  })

  it('H — the stop is DEFERRED, not discarded: the episode stays CLOSING', () => {
    const ep: SessionEpisode = forceClosing({
      phase: 'CORE', startedAt: 0, visibleFailures: 0, retroWinOwed: false,
    } as SessionEpisode)
    expect(ep.phase).toBe('CLOSING')
    // Withholding the block does not touch the episode, so the next turn —
    // which is no longer ambiguous — closes.
    expect(shouldInjectAffectClose({ phase: ep.phase, excursionActive: false, ambiguousTurn: true })).toBe(false)
    expect(shouldInjectAffectClose({ phase: ep.phase, excursionActive: false, ambiguousTurn: false })).toBe(true)
  })
})

describe('Phase 4 — regression guarantees that must NOT move', () => {
  it('I — a clear stop is still a stop, end to end', () => {
    const m = "I'm done for today"
    const { ti, excursionActive } = ctxFor(m)
    expect(detectExplicitFinishRequest(m)).toBe(true)
    expect(ti.wantsToStop).toBe(true)
    expect(ti.ambiguous).toBe(false)
    expect(shouldInjectAffectClose({ phase: 'CLOSING', excursionActive, ambiguousTurn: ti.ambiguous })).toBe(true)
  })

  it('J — confusion still lowers granularity, even paired with "harder"', () => {
    for (const m of [
      "I don't understand this, but give me a harder question.",
      "I want to continue, but I don't understand anything.",
    ]) {
      const { ti } = ctxFor(m)
      expect(ti.failureState, m).not.toBeNull()
      expect(decideTeachingGranularity({
        state: null, learnerRequest: ti.learnerRequest, remediationTier: 0, recoveryKey: ti.failureState,
      }), m).toBe('REMEDIAL')
      // Distress alongside a request is ONE coherent intent, not a
      // contradiction — Phase 2's narrowing, unchanged.
      expect(ti.ambiguous, m).toBe(false)
    }
  })

  it('K — an ambiguous turn still changes no context and banks no lesson evidence', () => {
    const { ex } = ctxFor("I'm done for today, but what is a compound?")
    expect(ex.state.active).toBe(false)
    expect(ex.transition).toBe('none')
    expect(ex.targetConceptId).toBe(LESSON)
    // Attribution is untouched: an ordinary lesson turn still counts for the
    // lesson; the close deferral does not fabricate or withhold evidence.
    expect(turnCountsForLesson(ex)).toBe(true)
  })

  it('L — CHARACTERISATION, not endorsement: C and D read as non-ambiguous', () => {
    // No detector matches their second clause, so nothing here fires. This is a
    // DETECTION gap; widening detectors was out of scope for Phase 4. If a
    // future change makes either ambiguous, this test should be updated
    // deliberately rather than discovered by surprise.
    expect(readTurnIntent('Stop the lesson, but explain this one thing first.', null).ambiguous).toBe(false)
    expect(readTurnIntent('Explain it simply, actually challenge me.', null).ambiguous).toBe(false)
  })
})

describe('Phase 4 — the wiring exists', () => {
  it('M — the route consults the predicate with turnIntent.ambiguous', () => {
    const route = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
    expect(route).toContain('shouldInjectAffectClose({')
    expect(route).toContain('ambiguousTurn: turnIntent.ambiguous')
    // The old inline condition must be gone, or the predicate is decorative.
    expect(route).not.toContain("sessionEpisodeHoisted.phase === 'CLOSING' && !excursionActiveHoisted")
  })
})
