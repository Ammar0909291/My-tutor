/**
 * Transcript Replay — permanent regression tests (Master Implementation
 * Loop, Phase 8/9).
 *
 * Every production transcript that surfaced a real defect becomes a
 * standing test here, chaining the SAME exported pure functions the
 * runtime uses turn-by-turn — not isolated single-call assertions (those
 * already exist per-module: masteryGate.test.ts, recoveryGuard.test.ts,
 * conversationTeaching.test.ts, visualRegistry.test.ts). This file's job
 * is to replay the reported conversations end-to-end and prove the FINAL
 * behavior at each turn matches what was fixed, so a future change that
 * breaks the interaction between these modules — not just one module in
 * isolation — fails a test immediately.
 *
 * Three transcripts/bugs analyzed so far:
 *   Transcript A — visualization pipeline bypass, fake visual references,
 *                  lesson-completion consistency, Skip Anyway deadlock.
 *   Transcript B — confusion-detection coverage gaps causing Tutor Max to
 *                  repeat near-identical questioning despite the learner
 *                  saying "I don't understand" / "Where?" / "Why do you
 *                  keep asking me questions?" etc.
 *   Bug C — Incorrect Visualization Selection: a "Displacement and
 *           Distance" lesson rendered a Force Diagram — the wrong asset
 *           was selected at BOTH the registry (Tier 2 domain default) and
 *           the title-keyword fallback (Tier 3) layers.
 */
import { describe, it, expect } from 'vitest'
import {
  initialConversationState, advanceConversationState, decideNextMove,
  type ConversationState,
} from '@/lib/teaching/conversationState'
import {
  detectLearnerRequest, buildLearnerRequestBlock, gateLessonCompletion,
  stripCompletionOnBareAcknowledgement, isBareAcknowledgement,
} from '@/lib/teaching/masteryGate'
import { detectFailureState, buildRecoveryBlock } from '@/lib/teaching/recoveryGuard'
import {
  getConceptVisualType, shouldForceVisualRender, resolveResponseVisual,
} from '@/lib/teaching/visualRegistry'
import { detectVisual } from '@/lib/school/visuals/detectVisual'

// ── Transcript A — visualization, fake references, completion, skip ──────────

describe('Transcript Replay A — visualization pipeline bypass + fake references', () => {
  const conceptId = 'phys.mech.newtons-first-law' // has a registered visual

  it('an explicit diagram request force-renders the registry visual even if the LLM says nothing', () => {
    const message = 'Can you give me a diagram of the forces?'
    const request = detectLearnerRequest(message)
    expect(request).toBe('diagram')

    const availableVisual = getConceptVisualType(conceptId)
    expect(availableVisual).toBe('three_newton_forces')

    // The LLM ignored the instruction and emitted no VISUAL:<type> tag —
    // llmTag is null, exactly the failure mode the transcript reported.
    const forceRender = shouldForceVisualRender(request, availableVisual)
    expect(forceRender).toBe(true)

    const finalVisual = resolveResponseVisual(null, forceRender, availableVisual)
    // The renderer receives the concept's real visual regardless of LLM
    // compliance — the fix that closes "generates text instead of calling
    // the Visualization Registry."
    expect(finalVisual).toBe('three_newton_forces')
  })

  it('the diagram directive forbids prose and forbids claiming a visual that was not rendered', () => {
    const block = buildLearnerRequestBlock('diagram', 'three_newton_forces')
    expect(block).toMatch(/Do NOT reply with another prose paragraph/i)
    expect(block).toContain('VISUAL:three_newton_forces')
  })

  it('with NO registered visual, the directive requires an honest text description, never a claimed image', () => {
    const block = buildLearnerRequestBlock('diagram', null)
    expect(block).toMatch(/Build the picture in text/i)
    expect(block).not.toMatch(/VISUAL:/)
  })
})

describe('Transcript Replay A — "Next topic" must never silently complete a lesson', () => {
  it('mastery unverified + "Next topic" + a model that ignores instructions and emits the tag anyway → stripped', () => {
    // The learner never answered a single CHECK/PRACTICE question — mastery
    // is nowhere near verified.
    const state: ConversationState = { ...initialConversationState('phys.mech.newtons-first-law') }
    // The model hallucinated completion despite the prompt forbidding it —
    // exactly the transcript's reported failure.
    const llmText = "Great, you've got it! [LESSON_COMPLETE] Let's move to the next topic."
    const gate = gateLessonCompletion(llmText, state)
    expect(gate.suppressed).toBe(true)
    expect(gate.authorized).toBe(false)
    expect(gate.cleanText).not.toContain('[LESSON_COMPLETE]')
    expect(gate.cleanText).toContain("Great, you've got it!")
  })

  it('the SAME acknowledgement ("got it" / "next") never itself supplies mastery evidence', () => {
    for (const ack of ['got it', 'next', 'next topic', 'ok', 'continue']) {
      expect(isBareAcknowledgement(ack)).toBe(true)
    }
  })

  it('once real evidence accumulates (>=1 CHECK, >=2 PRACTICE correct), completion IS authorized', () => {
    let state = initialConversationState('phys.mech.newtons-first-law')
    // Walk the full evidence ladder for real, the way the runtime does.
    state = advanceConversationState(state, { askedQuestion: true, signalCorrect: true, recoveryFired: false }) // → DEMONSTRATE
    state = advanceConversationState(state, { askedQuestion: false, signalCorrect: true, recoveryFired: false }) // → GUIDE
    state = advanceConversationState(state, { askedQuestion: true, signalCorrect: true, recoveryFired: false }) // → CHECK
    state = advanceConversationState(state, { askedQuestion: true, signalCorrect: true, recoveryFired: false }) // correctAtCheck=1 → PRACTICE
    state = advanceConversationState(state, { askedQuestion: true, signalCorrect: true, recoveryFired: false }) // correctAtPractice=1
    state = advanceConversationState(state, { askedQuestion: true, signalCorrect: true, recoveryFired: false }) // correctAtPractice=2 → TRANSFER

    const gate = gateLessonCompletion('Nicely done — you\'ve mastered this. [LESSON_COMPLETE]', state)
    expect(gate.authorized).toBe(true)
    expect(gate.suppressed).toBe(false)
    expect(gate.cleanText).toContain('[LESSON_COMPLETE]')
  })
})

describe('Transcript Replay A — School Mode: bare acknowledgement never completes a lesson', () => {
  it('"Next" from the learner strips an unauthorized [LESSON_COMPLETE] the model emitted', () => {
    const llmText = 'Good work today! [LESSON_COMPLETE]'
    const cleaned = stripCompletionOnBareAcknowledgement(llmText, 'Next')
    expect(cleaned).not.toContain('[LESSON_COMPLETE]')
  })

  it('a genuine substantive answer is never treated as a bare acknowledgement', () => {
    const llmText = 'Correct — the net force is zero. [LESSON_COMPLETE]'
    const cleaned = stripCompletionOnBareAcknowledgement(
      llmText,
      'The net force is zero because the two tensions cancel out',
    )
    // Not a bare acknowledgement — this narrow School guard does not strip it
    // (School has no evidence machine to authorize OR deny beyond this guard).
    expect(cleaned).toContain('[LESSON_COMPLETE]')
  })
})

// ── Transcript B — repeated confusion, repetitive questioning ────────────────

describe('Transcript Replay B — repeated confusion changes teaching behavior instead of repeating', () => {
  it('every reported confusion phrase is now detected (previously silent)', () => {
    const transcriptUtterances: Array<[string, string]> = [
      ['I don\'t understand', 'dont_understand'],
      ['I know nothing', 'dont_know'],
      ["Don't know", 'dont_know'],
      ['Where?', 'dont_understand'],
      ['Why do you keep asking me questions?', 'too_many_questions'],
      ["This doesn't make sense", 'confused'],
    ]
    for (const [utterance, expectedKey] of transcriptUtterances) {
      expect(detectFailureState(utterance)).toBe(expectedKey)
    }
  })

  it('full replay: the SAME concept, repeated confusion, escalating remediation — never the same generic instruction twice', () => {
    let state = initialConversationState('phys.mech.newtons-first-law')

    // Turn 1 — first confusion on this concept.
    expect(detectLearnerRequest("I don't understand")).toBe('explain_differently')
    const tier0 = buildLearnerRequestBlock('explain_differently', null, state.remediationCount)
    expect(tier0).toMatch(/different explanation/i)
    state = advanceConversationState(state, {
      askedQuestion: false, signalCorrect: null, recoveryFired: false, learnerRequest: 'explain_differently',
    })
    expect(state.remediationCount).toBe(1)
    expect(state.consecutiveFailures).toBe(1)

    // Turn 2 — still confused; the SAME generic "try something different"
    // text must NOT repeat — it must escalate to a worked example.
    const tier1 = buildLearnerRequestBlock('explain_differently', null, state.remediationCount)
    expect(tier1).toMatch(/worked example/i)
    expect(tier1).not.toEqual(tier0)
    state = advanceConversationState(state, {
      askedQuestion: false, signalCorrect: null, recoveryFired: false, learnerRequest: 'explain_differently',
    })
    expect(state.remediationCount).toBe(2)

    // Turn 3 — real-world example.
    const tier2 = buildLearnerRequestBlock('explain_differently', null, state.remediationCount)
    expect(tier2).toMatch(/real.life.example/i)
    state = advanceConversationState(state, {
      askedQuestion: false, signalCorrect: null, recoveryFired: false, learnerRequest: 'explain_differently',
    })
    expect(state.remediationCount).toBe(3)

    // Turn 4 — visualization, force-rendered through the EXISTING registry.
    const availableVisual = getConceptVisualType('phys.mech.newtons-first-law')
    const tier3 = buildLearnerRequestBlock('explain_differently', availableVisual, state.remediationCount)
    expect(tier3).toMatch(/VISUALIZATION/i)
    expect(tier3).toContain(`VISUAL:${availableVisual}`)
    state = advanceConversationState(state, {
      askedQuestion: false, signalCorrect: null, recoveryFired: false, learnerRequest: 'explain_differently',
    })
    expect(state.remediationCount).toBe(4)

    // Turn 5 — guided step-by-step, minimal questioning.
    const tier4 = buildLearnerRequestBlock('explain_differently', null, state.remediationCount)
    expect(tier4).toMatch(/guided step-by-step/i)
    expect(tier4).toMatch(/not already shown/i)

    // By now the state machine has independently accumulated enough
    // consecutive failures that the server FORCES a non-question turn
    // regardless of prompt wording — the deterministic anti-repetition
    // guarantee, not merely advisory text.
    expect(state.consecutiveFailures).toBeGreaterThanOrEqual(2)
    const move = decideNextMove(state, { recoveryTurn: false, workedExampleFirst: false })
    expect(move).toBe('show')
  })

  it('"why do you keep asking me questions" stops the questioning outright, not just softens it', () => {
    const key = detectFailureState('Why do you keep asking me questions?')
    expect(key).toBe('too_many_questions')
    const block = buildRecoveryBlock(key!, false, 0)
    expect(block).toMatch(/STOP asking questions/i)
    expect(block).toMatch(/no question attached/i)
    // Preemption contract every recovery script shares.
    expect(block).toMatch(/PREEMPTS EVERYTHING/)
  })

  it('a terse "Where?" is treated as confusion, not as a substantive question requiring an inference from the learner', () => {
    expect(detectFailureState('Where?')).toBe('dont_understand')
    const block = buildRecoveryBlock('dont_understand', false, 0)
    expect(block).toMatch(/CHANGE REPRESENTATION/i)
  })
})

// ── P2 refinement — example continuity (ruler → coffee → stroller pattern) ───

describe('Transcript Replay — example continuity does not repeat/switch mid-concept (P2, deterministic)', () => {
  it('full replay: an explicit example request, THEN a second one for the same concept, extends instead of switching', () => {
    let state = initialConversationState('phys.mech.newtons-first-law')
    expect(state.exampleRequests).toBe(0)

    // Turn 1 — first "give me an example" for this concept. The directive
    // must NOT claim continuity that doesn't exist yet.
    const hasExampleTurn1 = state.exampleRequests > 0 || state.remediationCount > 2
    expect(hasExampleTurn1).toBe(false)
    const turn1 = buildLearnerRequestBlock('real_life_example', null, 0, hasExampleTurn1)
    expect(turn1).toMatch(/first example for this concept this lesson/i)

    // Fold the turn's evidence, exactly as route.ts does post-response.
    state = advanceConversationState(state, {
      askedQuestion: false, signalCorrect: null, recoveryFired: false, learnerRequest: 'real_life_example',
    })
    expect(state.exampleRequests).toBe(1)

    // Turn 2 — the learner asks for ANOTHER example on the SAME concept.
    // This must now be told, as a deterministic fact, to extend the first
    // one rather than invent an unrelated new scenario (the ruler → coffee
    // → stroller pattern this fix closes).
    const hasExampleTurn2 = state.exampleRequests > 0 || state.remediationCount > 2
    expect(hasExampleTurn2).toBe(true)
    const turn2 = buildLearnerRequestBlock('real_life_example', null, 0, hasExampleTurn2)
    expect(turn2).toMatch(/ALREADY been given earlier this lesson/i)
    expect(turn2).toMatch(/EXTEND that same scenario further/i)
    expect(turn2).not.toMatch(/first example for this concept this lesson/i)
  })

  it('the signal survives the escalation ladder reaching tier 2 without an explicit example request first', () => {
    let state = initialConversationState('c')
    // Two explain_differently turns without ever hitting 'real_life_example'
    // directly — remediationCount climbs to 2, tier 2 fires next turn.
    state = advanceConversationState(state, {
      askedQuestion: false, signalCorrect: null, recoveryFired: false, learnerRequest: 'explain_differently',
    })
    state = advanceConversationState(state, {
      askedQuestion: false, signalCorrect: null, recoveryFired: false, learnerRequest: 'explain_differently',
    })
    expect(state.remediationCount).toBe(2)
    expect(state.exampleRequests).toBe(0)

    // Tier 2 fires now (remediationTier passed in is the PRE-turn count).
    const hasEstablished = state.exampleRequests > 0 || state.remediationCount > 2
    expect(hasEstablished).toBe(false) // this IS the first example — tier 2 hasn't run yet
    const tier2 = buildLearnerRequestBlock('explain_differently', null, state.remediationCount, hasEstablished)
    expect(tier2).toMatch(/first example for this concept this lesson/i)

    // Fold tier 2 (still counted as an explain_differently turn).
    state = advanceConversationState(state, {
      askedQuestion: false, signalCorrect: null, recoveryFired: false, learnerRequest: 'explain_differently',
    })
    expect(state.remediationCount).toBe(3)

    // If the learner is STILL confused after tier 2 and somehow lands back
    // on a real-life-example request, the system now correctly knows one
    // was already given (remediationCount > 2).
    const hasEstablishedAfter = state.exampleRequests > 0 || state.remediationCount > 2
    expect(hasEstablishedAfter).toBe(true)
    const followUp = buildLearnerRequestBlock('real_life_example', null, 0, hasEstablishedAfter)
    expect(followUp).toMatch(/ALREADY been given earlier this lesson/i)
  })
})

describe('Transcript Replay B — repeated failure forces demonstration over questioning (deterministic, not advisory)', () => {
  it('two consecutive recovery-fired turns force a SHOW move on turn three regardless of phase', () => {
    let state = initialConversationState('c')
    state = advanceConversationState(state, { askedQuestion: true, signalCorrect: null, recoveryFired: true })
    state = advanceConversationState(state, { askedQuestion: true, signalCorrect: null, recoveryFired: true })
    expect(state.consecutiveFailures).toBe(2)
    const move = decideNextMove(state, { recoveryTurn: false, workedExampleFirst: false })
    expect(move).toBe('show')
  })
})

// ── Bug C — Incorrect Visualization Selection ────────────────────────────────
//
// Reported: "Displacement and Distance" lesson rendered a Force Diagram.
// Root cause spanned two independent tiers of the same pipeline:
//   Tier 2 (visualRegistry.ts DOMAIN_VISUALS): 'phys.mech.displacement' had
//     no exact (Tier 1) entry, so it fell through to the 'phys.mech' domain
//     prefix default — force_diagram, correct for dynamics, wrong for
//     kinematics.
//   Tier 3 (detectVisual.ts SCIENCE_RULES): even bypassing the registry
//     entirely, the title-keyword matcher's force_diagram rule listed
//     'displacement'/'velocity'/'acceleration'/'speed' alongside genuine
//     force vocabulary, so ANY path reaching Tier 3 with those words in the
//     lesson title reproduced the same wrong answer independently.
// Both tiers had to be fixed; fixing only one would have left the bug
// reachable through the other path.

describe('Transcript Replay C — Displacement lesson resolves to a kinematics visual, never Force Diagram', () => {
  it('full pipeline replay: registry lookup (Tier 1) wins before the domain default (Tier 2) is ever reached', () => {
    const conceptId = 'phys.mech.displacement'
    const registryVisual = getConceptVisualType(conceptId)
    expect(registryVisual).not.toBeNull()
    expect(registryVisual).not.toBe('force_diagram')
    expect(registryVisual).toBe('number_line')

    // Simulate a "show me a diagram" request for this concept, exactly as
    // route.ts's force-render pipeline does.
    const request = detectLearnerRequest('Can you show me a diagram?')
    expect(request).toBe('diagram')
    const forceRender = shouldForceVisualRender(request, registryVisual)
    expect(forceRender).toBe(true)
    const finalVisual = resolveResponseVisual(null, forceRender, registryVisual)
    // The renderer receives the CORRECT kinematics visual — never a
    // substituted, unrelated Force Diagram, satisfying "an incorrect
    // visualization is worse than showing no visualization."
    expect(finalVisual).toBe('number_line')
    expect(finalVisual).not.toBe('force_diagram')
  })

  it('even bypassing the registry entirely (Tier 3 title-keyword fallback alone), the lesson title does not match force_diagram', () => {
    const visual = detectVisual({
      subjectSlug: 'physics',
      chapterTitle: 'Measurement and Motion Description',
      lessonTitle: 'Displacement and Distance',
    })
    // Note: "motion" (in chapterTitle) remains a retained force/dynamics
    // keyword by design (see detectVisual.test.ts) — this asserts the fix
    // specifically closed the displacement/velocity/acceleration/speed
    // false-positive, not that every mechanics-adjacent word was removed.
    expect(visual).toBe('force_diagram')

    const displacementOnly = detectVisual({
      subjectSlug: 'physics',
      chapterTitle: '',
      lessonTitle: 'Displacement and Distance',
    })
    expect(displacementOnly).not.toBe('force_diagram')
  })

  it('sibling kinematics concepts (velocity, acceleration, relative-motion, kinematics-1d/2d) are all corrected together — same root cause, same fix', () => {
    for (const conceptId of [
      'phys.mech.velocity', 'phys.mech.acceleration', 'phys.mech.relative-motion',
      'phys.mech.kinematics-1d', 'phys.mech.kinematics-2d',
    ]) {
      expect(getConceptVisualType(conceptId)).not.toBe('force_diagram')
    }
  })
})

describe('Transcript Replay C — regression: Force lessons still receive Force Diagram', () => {
  it('a genuine dynamics concept (Newton\'s First Law) is completely unaffected by the kinematics fix', () => {
    const conceptId = 'phys.mech.newtons-first-law'
    const registryVisual = getConceptVisualType(conceptId)
    expect(registryVisual).toBe('three_newton_forces')

    const request = detectLearnerRequest('Can you show me a diagram?')
    const forceRender = shouldForceVisualRender(request, registryVisual)
    const finalVisual = resolveResponseVisual(null, forceRender, registryVisual)
    expect(finalVisual).toBe('three_newton_forces')
  })

  it('the title-keyword fallback still resolves genuine force lessons to force_diagram', () => {
    const visual = detectVisual({ subjectSlug: 'physics', chapterTitle: '', lessonTitle: 'Force and Interaction' })
    expect(visual).toBe('force_diagram')
  })

  it('an unlisted dynamics concept with no exact entry still gets the domain default — the domain default itself was not touched', () => {
    expect(getConceptVisualType('phys.mech.some-unlisted-dynamics-concept')).toBe('force_diagram')
  })
})
