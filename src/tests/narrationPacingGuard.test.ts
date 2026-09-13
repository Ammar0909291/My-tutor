import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'
import { INITIAL_PACING_STATE, recordDisplayedAdvance, remainingHoldMs } from '@/lib/narration/pacingGuard'

/**
 * Pure unit tests of the conservative pacing guard: the mechanism that
 * decides WHEN an already-reported word transition is safe to display,
 * never WHETHER or WHAT to display (that remains entirely the engine's own
 * job — this module only ever delays, never invents or reorders).
 */

describe('pacingGuard — never holds back without real evidence of this narration\'s own pace', () => {
  it('the very first advance is never held (no prior state at all)', () => {
    expect(remainingHoldMs(INITIAL_PACING_STATE, 0)).toBe(0)
    expect(remainingHoldMs(INITIAL_PACING_STATE, 999999)).toBe(0)
  })

  it('the second advance is never held (one displayed advance, zero observed gaps yet)', () => {
    const afterFirst = recordDisplayedAdvance(INITIAL_PACING_STATE, 1000)
    // Immediately, with zero elapsed real time.
    expect(remainingHoldMs(afterFirst, 1000)).toBe(0)
  })

  it('a third advance arriving at roughly the SAME pace as the first observed gap is never held', () => {
    let state = recordDisplayedAdvance(INITIAL_PACING_STATE, 0) // word 0 at t=0
    state = recordDisplayedAdvance(state, 400) // word 1 at t=400 -> gap=400 recorded
    // word 2 arriving right on pace at t=800 (another 400ms later).
    expect(remainingHoldMs(state, 800)).toBe(0)
  })
})

describe('pacingGuard — holds back a transition arriving faster than the established pace', () => {
  it('a transition arriving in a burst (near-zero elapsed time) right after an established 400ms pace is held', () => {
    let state = recordDisplayedAdvance(INITIAL_PACING_STATE, 0) // word 0
    state = recordDisplayedAdvance(state, 400) // word 1, gap=400 observed
    // word 2 arrives at t=400 too — zero elapsed time since word 1.
    const remaining = remainingHoldMs(state, 400)
    expect(remaining).toBeGreaterThan(0)
    // Specifically half the observed 400ms gap (PACING_FRACTION), per the
    // module's own documented policy — not an arbitrary number chosen
    // here independently of what the guard actually implements.
    expect(remaining).toBe(200)
  })

  it('the held transition becomes displayable again once enough real time has passed', () => {
    let state = recordDisplayedAdvance(INITIAL_PACING_STATE, 0)
    state = recordDisplayedAdvance(state, 400)
    expect(remainingHoldMs(state, 400)).toBe(200) // held at t=400
    expect(remainingHoldMs(state, 600)).toBe(0) // by t=600 (400+200), no longer held
  })

  it('a transition arriving SLOWER than the established pace is never held (only fast ones are)', () => {
    let state = recordDisplayedAdvance(INITIAL_PACING_STATE, 0)
    state = recordDisplayedAdvance(state, 400)
    // word 2 arrives at t=1000 -- much later than the 400ms pace would predict.
    expect(remainingHoldMs(state, 1000)).toBe(0)
  })
})

describe('pacingGuard — adapts to whatever pace THIS narration actually shows, no fixed constant', () => {
  it('a consistently FAST narration (e.g. a sped-up voice) is not penalized relative to itself', () => {
    // Every real gap observed is only 50ms — a fast, but self-consistent, pace.
    let state = recordDisplayedAdvance(INITIAL_PACING_STATE, 0)
    state = recordDisplayedAdvance(state, 50)
    state = recordDisplayedAdvance(state, 100)
    // The next word arriving right on that SAME 50ms pace is not held.
    expect(remainingHoldMs(state, 150)).toBe(0)
  })

  it('a consistently SLOW narration establishes a correspondingly longer hold for a sudden burst', () => {
    let state = recordDisplayedAdvance(INITIAL_PACING_STATE, 0)
    state = recordDisplayedAdvance(state, 1000) // a slow, deliberate pace
    // A word arriving in a burst right after is held proportionally longer
    // than the fast-narration case above.
    expect(remainingHoldMs(state, 1000)).toBe(500)
  })

  it('the gap history is bounded, so a stale early-narration pace does not haunt the whole session forever', () => {
    let state = INITIAL_PACING_STATE
    let t = 0
    // Six consistent 300ms gaps, then a genuine, sustained switch to 60ms
    // (e.g. rateForSegment resuming normal pace after a slow question).
    for (let i = 0; i < 6; i++) { t += 300; state = recordDisplayedAdvance(state, t) }
    for (let i = 0; i < 6; i++) { t += 60; state = recordDisplayedAdvance(state, t) }
    // The guard's threshold should now reflect the NEW pace, not the stale
    // 300ms one — a word arriving on the new 60ms pace is not held.
    expect(remainingHoldMs(state, t + 60)).toBe(0)
  })
})

describe('non-vacuity — this module can genuinely hold something back, and genuinely release it', () => {
  it('a naive "always return 0" implementation would NOT reproduce the held case above', () => {
    // A structural sanity check: the module is not a no-op. If someone
    // simplified remainingHoldMs to always return 0, this exact scenario
    // (already proven above to yield 200) would silently start returning 0
    // instead, and THIS assertion documents that the two are meant to
    // differ — not a live comparison against another implementation, just
    // a recorded expectation that the "held" case is genuinely non-zero.
    let state = recordDisplayedAdvance(INITIAL_PACING_STATE, 0)
    state = recordDisplayedAdvance(state, 400)
    const naiveAlwaysZero = 0
    expect(remainingHoldMs(state, 400)).not.toBe(naiveAlwaysZero)
  })
})

describe('no subject-specific branching', () => {
  it('the pacing guard module names no curriculum subject', () => {
    const src = readFileSync(path.join(process.cwd(), 'src/lib/narration/pacingGuard.ts'), 'utf8').toLowerCase()
    for (const subject of ['physics', 'chemistry', 'mathematics', 'biology', 'computer_science']) {
      expect(src).not.toContain(subject)
    }
  })
})
