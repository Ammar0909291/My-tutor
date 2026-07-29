import { describe, it, expect } from 'vitest'
import {
  detectDuplicateResponse,
  detectStuckState,
  isTransitionOnly,
  detectTransitionRecursion,
  isStallIntroduction,
  classifyResponsePurpose,
  runQualityGuard,
  buildStuckRecoveryBlock,
} from '@/lib/teaching/responseQualityGuard'

// ── 1 & 6: Duplicate detection ─────────────────────────────────────────────

describe('detectDuplicateResponse', () => {
  it('detects exact duplicate tutor responses', () => {
    const candidate = 'An orbital is a region of space where an electron is most likely to be found.'
    const recent = [candidate]
    const result = detectDuplicateResponse(candidate, recent)
    expect(result.isDuplicate).toBe(true)
    expect(result.similarity).toBe(1.0)
  })

  it('detects near-duplicate responses differing only in filler words', () => {
    const candidate = 'So, an orbital is basically a region of space where an electron is most likely to be found. The electron cloud shows the probability distribution.'
    const recent = ['An orbital is a region of space where an electron is most likely to be found. The electron cloud shows the probability distribution around the nucleus.']
    const result = detectDuplicateResponse(candidate, recent)
    expect(result.isDuplicate).toBe(true)
    expect(result.similarity).toBeGreaterThan(0.7)
  })

  it('allows genuinely different responses', () => {
    const candidate = 'Think of it like a cloud of probability — the electron is smeared across this region.'
    const recent = ['An orbital is a region of space where an electron is most likely to be found.']
    const result = detectDuplicateResponse(candidate, recent)
    expect(result.isDuplicate).toBe(false)
  })

  it('ignores very short messages in comparison', () => {
    const candidate = 'Yes'
    const recent = ['Yes']
    const result = detectDuplicateResponse(candidate, recent)
    expect(result.isDuplicate).toBe(false)
  })

  it('checks only the last N messages within the window', () => {
    const candidate = 'Orbital regions are where electrons live.'
    const recent = [
      'Orbital regions are where electrons live.',   // old — outside window
      'Force equals mass times acceleration.',
      'Energy cannot be created or destroyed.',
      'Momentum is conserved in collisions.',
    ]
    const result = detectDuplicateResponse(candidate, recent, 2)
    expect(result.isDuplicate).toBe(false)
  })

  it('catches rephrased duplicates with same structure', () => {
    const candidate = 'The quantum number n tells us the energy level of the electron. The quantum number l tells us the shape of the orbital. The quantum number ml tells us the orientation of the orbital in space.'
    const recent = ['The quantum number n tells us the energy level of the electron. The quantum number l tells us the shape of the orbital. The quantum number ml tells us the orientation of the orbital in space. Each quantum number has specific allowed values.']
    const result = detectDuplicateResponse(candidate, recent)
    expect(result.isDuplicate).toBe(true)
  })
})

// ── 2 & 5: Stuck state detection ───────────────────────────────────────────

describe('detectStuckState', () => {
  it('detects stuck after 6 turns in phase with failures', () => {
    const result = detectStuckState(6, 3, 'DEMONSTRATE', 10)
    expect(result.isStuck).toBe(true)
    expect(result.recoveryAction).toBe('close_concept')
  })

  it('detects stuck after 6 turns in phase without failures', () => {
    const result = detectStuckState(6, 0, 'GUIDE', 8)
    expect(result.isStuck).toBe(true)
    expect(result.recoveryAction).toBe('worked_example')
  })

  it('detects stuck after 4 consecutive failures', () => {
    const result = detectStuckState(2, 4, 'CHECK', 6)
    expect(result.isStuck).toBe(true)
    expect(result.recoveryAction).toBe('simplify')
  })

  it('detects overlong lesson', () => {
    const result = detectStuckState(3, 1, 'PRACTICE', 16)
    expect(result.isStuck).toBe(true)
    expect(result.recoveryAction).toBe('pivot_angle')
  })

  it('allows normal progression', () => {
    const result = detectStuckState(2, 0, 'DEMONSTRATE', 4)
    expect(result.isStuck).toBe(false)
    expect(result.recoveryAction).toBeNull()
  })

  it('allows moderate turns in phase when failures are low', () => {
    const result = detectStuckState(4, 1, 'CHECK', 8)
    expect(result.isStuck).toBe(false)
  })
})

describe('buildStuckRecoveryBlock', () => {
  it('builds close_concept block', () => {
    const block = buildStuckRecoveryBlock(
      { isStuck: true, reason: '6 turns', recoveryAction: 'close_concept' },
      'Quantum Numbers',
    )
    expect(block).toContain('STUCK-STATE RECOVERY')
    expect(block).toContain('CLOSE CONCEPT')
    expect(block).toContain('Quantum Numbers')
    expect(block).toContain('[LESSON_COMPLETE]')
  })

  it('builds simplify block', () => {
    const block = buildStuckRecoveryBlock(
      { isStuck: true, reason: '4 failures', recoveryAction: 'simplify' },
      null,
    )
    expect(block).toContain('SIMPLIFY')
    expect(block).toContain('ONE sentence')
  })

  it('returns empty for null action', () => {
    const block = buildStuckRecoveryBlock(
      { isStuck: false, reason: null, recoveryAction: null },
      null,
    )
    expect(block).toBe('')
  })
})

// ── 3: Transition recursion ────────────────────────────────────────────────

describe('isTransitionOnly', () => {
  it('detects pure transition template', () => {
    expect(isTransitionOnly("Let's dive into quantum numbers! Ready to explore?")).toBe(true)
  })

  it('detects "shall we begin" transitions', () => {
    expect(isTransitionOnly("Shall we begin exploring the periodic table?")).toBe(true)
  })

  it('allows transition + teaching content', () => {
    expect(isTransitionOnly(
      "Let's explore orbitals. An orbital is a mathematical function that describes the wave-like behavior of electrons. For example, the 1s orbital is a sphere."
    )).toBe(false)
  })

  it('allows long responses even with transition phrases', () => {
    const longResponse = "Let's move on to the next concept. " +
      Array(40).fill("This is substantive content about quantum mechanics.").join(' ')
    expect(isTransitionOnly(longResponse)).toBe(false)
  })

  it('allows responses with definitions', () => {
    expect(isTransitionOnly(
      "Let's explore orbitals. An orbital is defined as a region of probability."
    )).toBe(false)
  })
})

describe('detectTransitionRecursion', () => {
  it('detects two consecutive transition-only turns', () => {
    const candidate = "Let's dive deeper! Ready to explore?"
    const recent = ["Let's get started with quantum numbers! Shall we begin?"]
    expect(detectTransitionRecursion(candidate, recent)).toBe(true)
  })

  it('allows transition after a teaching turn', () => {
    const candidate = "Let's move to the next part!"
    const recent = ["An orbital is defined as a mathematical function describing electron probability."]
    expect(detectTransitionRecursion(candidate, recent)).toBe(false)
  })

  it('allows non-transition responses', () => {
    const candidate = "The principal quantum number n determines the energy level."
    const recent = ["Let's get started!"]
    expect(detectTransitionRecursion(candidate, recent)).toBe(false)
  })
})

// ── 4: Intro stall ─────────────────────────────────────────────────────────

describe('isStallIntroduction', () => {
  it('detects an intro that never starts teaching', () => {
    expect(isStallIntroduction(
      "Welcome to today's lesson on quantum numbers! In this lesson, we'll explore the four quantum numbers that describe electrons."
    )).toBe(true)
  })

  it('allows intro with a question', () => {
    expect(isStallIntroduction(
      "Today we're going to learn about orbitals. Have you ever wondered why atoms have specific shapes?"
    )).toBe(false)
  })

  it('allows intro with concrete content', () => {
    expect(isStallIntroduction(
      "In this lesson we'll learn about forces. For example, when you push a door, you're applying a force."
    )).toBe(false)
  })

  it('returns false for non-intro content', () => {
    expect(isStallIntroduction(
      "An electron has four quantum numbers: n, l, ml, and ms."
    )).toBe(false)
  })
})

// ── 7: Response purpose classification ──────────────────────────────────────

describe('classifyResponsePurpose', () => {
  it('classifies teaching responses', () => {
    expect(classifyResponsePurpose(
      'An orbital is defined as a region of space where there is a high probability of finding an electron.'
    )).toBe('teach')
  })

  it('classifies assessment responses', () => {
    expect(classifyResponsePurpose(
      'Based on what we just covered, can you tell me what the principal quantum number represents?'
    )).toBe('assess')
  })

  it('classifies summary responses', () => {
    expect(classifyResponsePurpose(
      "Let's recap what we've covered today. The key takeaway is that quantum numbers describe electron states."
    )).toBe('summarize')
  })

  it('classifies conclusion responses', () => {
    expect(classifyResponsePurpose(
      "Great work today! You've mastered quantum numbers. [LESSON_COMPLETE]"
    )).toBe('conclude')
  })

  it('classifies recovery responses', () => {
    expect(classifyResponsePurpose(
      "That's okay — this is genuinely tricky. Let's try a different approach."
    )).toBe('recover')
  })

  it('classifies empty/meaningless responses as none', () => {
    expect(classifyResponsePurpose('')).toBe('none')
    expect(classifyResponsePurpose('     ')).toBe('none')
  })

  it('does not classify rhetorical "right?" as assessment', () => {
    expect(classifyResponsePurpose(
      'The electron is in the first shell, right?'
    )).not.toBe('assess')
  })

  it('classifies long substantive content as teaching', () => {
    const response = Array(30).fill('This describes the behavior of electrons in atoms.').join(' ')
    expect(classifyResponsePurpose(response)).toBe('teach')
  })

  it('classifies step-by-step as teaching', () => {
    expect(classifyResponsePurpose(
      'Step 1: identify the element. Step 2: count the electrons. Step 3: fill the orbitals.'
    )).toBe('teach')
  })

  it('classifies formula content as teaching', () => {
    expect(classifyResponsePurpose(
      'The energy of a photon is E = hf, where h = 6.626 × 10^-34 J·s.'
    )).toBe('teach')
  })
})

// ── Combined guard ──────────────────────────────────────────────────────────

describe('runQualityGuard', () => {
  const baseInput = {
    candidate: 'An orbital is a region where electrons are found. The principal quantum number n tells us the energy level.',
    recentAssistantMessages: [] as string[],
    turnsInPhase: 1,
    consecutiveFailures: 0,
    phase: 'DEMONSTRATE',
    totalTurnsThisLesson: 3,
    lessonTitle: 'Quantum Numbers',
    isFirstTurn: false,
  }

  it('passes a normal teaching response', () => {
    const result = runQualityGuard(baseInput)
    expect(result.passed).toBe(true)
    expect(result.violations).toHaveLength(0)
  })

  it('fails a duplicate response with replacement', () => {
    const result = runQualityGuard({
      ...baseInput,
      recentAssistantMessages: [baseInput.candidate],
    })
    expect(result.passed).toBe(false)
    expect(result.violations.some(v => v.startsWith('duplicate_response'))).toBe(true)
    expect(result.replacement).toBeTruthy()
    // The replacement should be a recovery text, not the original duplicate
    expect(result.replacement).not.toBe(baseInput.candidate)
  })

  it('fails a transition recursion', () => {
    const result = runQualityGuard({
      ...baseInput,
      candidate: "Let's explore this further! Ready to dive in?",
      recentAssistantMessages: ["Let's get started! Shall we begin?"],
    })
    expect(result.passed).toBe(false)
    expect(result.violations).toContain('transition_recursion')
  })

  it('fails a stall introduction on first turn', () => {
    const result = runQualityGuard({
      ...baseInput,
      candidate: "Welcome! Today we're going to learn about quantum numbers. In this lesson, we'll cover all four quantum numbers.",
      isFirstTurn: true,
    })
    expect(result.passed).toBe(false)
    expect(result.violations).toContain('intro_stall')
  })

  it('detects stuck state independently of response quality', () => {
    const result = runQualityGuard({
      ...baseInput,
      turnsInPhase: 7,
      consecutiveFailures: 4,
    })
    expect(result.stuckState).not.toBeNull()
    expect(result.stuckState!.isStuck).toBe(true)
  })

  it('does not flag intro stall when not first turn', () => {
    const result = runQualityGuard({
      ...baseInput,
      candidate: "In this lesson, we'll explore the four quantum numbers.",
      isFirstTurn: false,
    })
    // intro_stall only fires on first turn
    expect(result.violations).not.toContain('intro_stall')
  })
})
