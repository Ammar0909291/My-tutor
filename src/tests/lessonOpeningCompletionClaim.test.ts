/**
 * A LESSON RE-OPENED TO STUDY OPENED WITH ITS OWN CONGRATULATIONS SCREEN.
 *
 * ── THE MEASURED FAILURE ────────────────────────────────────────────────────
 * Production, `phys.mech.friction`, 2026-08-31, real account, studied as a
 * learner. The concept had been mastered earlier the same day. Re-opening it
 * to revise (mode=restart) produced, as the ENTIRE first turn:
 *
 *   "🎉 Excellent work, Claude! You've successfully navigated the core rules
 *    of friction.  ✓ What you mastered: … ✓ Progress: You've now completed 1
 *    of 238 lessons. … [LESSON_COMPLETE]"
 *
 * A learner who opened a lesson to study was told they were finished, and the
 * control tag was printed to their screen as visible text.
 *
 * ── TWO INDEPENDENT HOLES, BOTH MEASURED, NOT REASONED ──────────────────────
 * 1. `/api/learn/lesson-init` ran NEITHER guard. `enforceStance` (which strips
 *    completion claims) and `gateLessonCompletion` (which strips the tag) are
 *    both wired on `/api/learn/chat` only, and the opening turn lives behind
 *    its own endpoint — the same discovery the figure-reference and
 *    scaffold-heading repairs in that file each recorded before this one.
 *
 * 2. The detector itself did not recognise the claim. Run against the verbatim
 *    text above, `claimsCompletionInProse` returned FALSE: it read
 *    `completed lesson <n>` (count after the noun, singular) while the tutor
 *    wrote `completed 1 of 238 lessons` (count first, plural), and its adverb
 *    slot held only "just" while the tutor wrote "now". So even porting the
 *    guard verbatim would have stripped the tag and left the lie.
 *
 * Fixing only (1) would have looked like a fix and shipped half of one, which
 * is why the verbatim turn is the fixture rather than a paraphrase of it.
 *
 * ── WHY THE OPENING NEEDS ITS OWN INVARIANT ─────────────────────────────────
 * `enforceStance` judges a completion claim against whether mastery is
 * VERIFIED — and here it genuinely was, from the earlier attempt. The claim
 * was true of the learner's history and false of the turn in front of them.
 * The opening's rule needs no mastery state at all: this is turn ZERO of an
 * attempt, nothing has been taught in it yet, so nothing can have been
 * completed by it. That holds in every mode — a `resume` opening is
 * mid-lesson, not post-lesson.
 *
 * ── WHAT IS NOT MOCKED ──────────────────────────────────────────────────────
 * The real `claimsCompletionInProse` / `stripCompletionClaims`, and the real
 * route source for the wiring claim. The production turn is verbatim.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import {
  claimsCompletionInProse,
  stripCompletionClaims,
} from '@/lib/teaching/stanceEnforcement'

/** The exact opening turn the learner received, reproduced verbatim. */
const PRODUCTION_OPENING = [
  "🎉 Excellent work, Claude! You've successfully navigated the core rules of friction.",
  '',
  '✓ What you mastered: static friction holds an object still until the applied force exceeds a limit, and kinetic friction acts once it slides.',
  "✓ Progress: You've now completed 1 of 238 lessons.",
  "✓ What's next: we will look at how friction depends on the normal force.",
  '',
  '[LESSON_COMPLETE]',
].join('\n')

/** What the route does, in the order the route does it. */
function openingRepair(text: string): string {
  const cleaned = stripCompletionClaims(text)
    .replace(/\[LESSON_COMPLETE\]/gi, '')
    .trim()
  return cleaned.length >= 40 ? cleaned : text
}

describe('the production opening turn', () => {
  it('is recognised as a completion claim at all', () => {
    // This assertion FAILED before the detector was widened. It is the half of
    // the defect that porting the guard would not have fixed.
    expect(claimsCompletionInProse(PRODUCTION_OPENING)).toBe(true)
  })

  it('no longer tells a learner opening a lesson that they finished it', () => {
    const out = openingRepair(PRODUCTION_OPENING)
    expect(out).not.toMatch(/completed 1 of 238 lessons/i)
    expect(out).not.toMatch(/\d+\s+of\s+\d+\s+lessons/i)
  })

  it('does not print the control tag to the learner', () => {
    expect(openingRepair(PRODUCTION_OPENING)).not.toMatch(/\[LESSON_COMPLETE\]/i)
  })

  it('keeps the praise and the recap — only the bookkeeping goes', () => {
    // The same D3 precedent the chat-path guard follows: deleting correct
    // teaching to remove one false clause is a second harm on top of the first.
    const out = openingRepair(PRODUCTION_OPENING)
    expect(out).toContain('Excellent work')
    expect(out).toContain('What you mastered')
    expect(out).toContain('static friction holds an object still')
    expect(out).toContain("What's next")
  })

  it('leaves a usable turn rather than a blank screen', () => {
    expect(openingRepair(PRODUCTION_OPENING).length).toBeGreaterThanOrEqual(40)
  })
})

describe('the counted-progress form, which is what the detector missed', () => {
  for (const claim of [
    "You've now completed 1 of 238 lessons.",
    'You have already completed lesson 4.',
    'Completed 3 of the 238 lessons so far.',
    "You've just completed 12 of 186 lessons.",
  ]) {
    it(`fires: "${claim}"`, () => {
      expect(claimsCompletionInProse(claim)).toBe(true)
    })
  }
})

describe('the noun is load-bearing — in-lesson progress is true and must survive', () => {
  for (const quiet of [
    // A count of QUESTIONS is honest within-lesson progress, not a record claim.
    "You've completed 2 of the 3 practice questions in this set.",
    "You've now completed the first step of the calculation.",
    // No completion verb at all.
    'This course has 238 lessons in total.',
    'Only 12 of 238 lessons touch on this idea.',
    // Praise the earlier guard already decided to protect.
    'Great — you have mastered the trick of cancelling the time units.',
    'Nice, you finished that calculation correctly.',
  ]) {
    it(`stays quiet: "${quiet.slice(0, 46)}…"`, () => {
      expect(claimsCompletionInProse(quiet)).toBe(false)
      expect(stripCompletionClaims(quiet)).toBe(quiet)
    })
  }
})

describe('lesson-init actually applies it', () => {
  const ROUTE = readFileSync('src/app/api/learn/lesson-init/route.ts', 'utf-8')

  it('imports and calls the completion-claim guard', () => {
    // Anchored on the CALL, not on the identifier: an earlier generation of
    // this codebase's structural tests matched the import line and passed
    // while the call site was gone.
    expect(ROUTE).toMatch(/stripCompletionClaims\(routed\.text\)/)
    expect(ROUTE).toMatch(/claimsCompletionInProse\(routed\.text\)/)
  })

  it('strips the control tag as well as the prose', () => {
    // Both halves appeared in the SAME production turn; a repair that took
    // only one of them would still have shipped the other to the learner.
    expect(ROUTE).toMatch(/\\\[LESSON_COMPLETE\\\]\/gi/)
  })

  it('refuses a repair that would blank the opening', () => {
    expect(ROUTE).toMatch(/cleaned\.length\s*>=\s*40/)
  })

  it('never lets the repair take the lesson down', () => {
    // Every repair in this file is wrapped; a lesson must still open if a
    // guard throws.
    const at = ROUTE.indexOf('claimsCompletionInProse(routed.text)')
    expect(at).toBeGreaterThan(0)
    const before = ROUTE.slice(0, at)
    expect(before.lastIndexOf('try {')).toBeGreaterThan(before.lastIndexOf('} catch'))
  })
})
