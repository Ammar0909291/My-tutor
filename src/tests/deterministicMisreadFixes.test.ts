import { describe, it, expect, vi, beforeEach } from 'vitest'
import { driveTurns, readLog, type TurnResult } from './support/turnHarness'
import { resolveRequestedConceptId, isOffDomainInstanceReference } from '@/lib/teaching/concept/requestedConcept'
import { detectLearnerRequest, requestedExampleForm, buildLearnerRequestBlock } from '@/lib/teaching/masteryGate'
import { gradeMcqAnswer, engagesPendingOptions, readsAsRequestToTutor, type TutorMCQ } from '@/lib/teaching/mcq'

/**
 * DETERMINISTIC MISREAD FIXES — found by the learner-intent A/B experiment
 * (docs/history/learner-intent-interpreter-ab-experiment.md), where each of
 * these misreads affected BOTH arms. Every "observed" string below is the
 * exact learner message from the production run; every MCQ is the exact
 * model-invented question the runner recorded.
 */

// ── the real route, for the two route-level regressions ─────────────────────
const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({
  checkRateLimit: async () => ({ allowed: true }),
  rateLimitResponse: () => new Response('{}', { status: 429 }),
}))
vi.mock('@/lib/ai/router', async (o) => ({
  ...(await o<Record<string, unknown>>()),
  routeAI: (...a: unknown[]) => h.routeAI(...a),
}))
const { POST } = await import('@/app/api/learn/chat/route')
beforeEach(() => { h.state.messages = []; h.state.snapshot = {} })

const PERTURBATION_REPEAT = 'Please write out E_n^(2) explicitly and show why every term is negative when n is the ground state.'
const RANDOM_GRAPH_T3 = 'Specifically: what is the expected number of isolated vertices at p = (log n + c)/n, and what distribution does it follow?'
const TOPOS_T2 = 'Give me a concrete non-Set example of a topos, like sheaves on a topological space.'
const TOPOS_T3 = 'I mean specifically sheaves on a topological space X — show me how Sh(X) is a topos and what its subobject classifier is.'
const VASKA_T2 = "Can you tell me about Vaska's complex as an example?"

// ════════════════════════════════════════════════════════════════════════════
describe('Phase 2 — concept-resolution collisions (E4)', () => {
  it('observed: "every term" in a physics lesson no longer resolves to algebra\'s Term', () => {
    expect(resolveRequestedConceptId(PERTURBATION_REPEAT, 'phys.qm.perturbation-theory', 'physics')).toBeNull()
  })

  it('observed: "what distribution does it follow" in Random Graphs no longer resolves to generalized functions', () => {
    expect(resolveRequestedConceptId(RANDOM_GRAPH_T3, 'math.graph.random-graph', 'mathematics')).toBeNull()
  })

  it('siblings of the same shape stay in the lesson', () => {
    expect(resolveRequestedConceptId('which distribution is it?', 'math.graph.random-graph', 'mathematics')).toBeNull()
    expect(resolveRequestedConceptId('why is each term negative?', 'phys.qm.perturbation-theory', 'physics')).toBeNull()
  })

  it('an explicit request still travels: no determiner, or the definitional frame', () => {
    expect(resolveRequestedConceptId('teach me distributions', 'math.graph.random-graph', 'mathematics')).toBe('math.fnal.distributions')
    // Each pinned value below is IDENTICAL to the pre-fix resolver's output
    // (measured against the pre-fix tree, 2026-09-25).
    expect(resolveRequestedConceptId('explain photosynthesis to me please', 'phys.qm.perturbation-theory', 'physics')).toBe('bio.plant.photosynthesis')
    expect(resolveRequestedConceptId('teach me what photosynthesis is', 'phys.qm.perturbation-theory', 'physics')).toBe('bio.plant.photosynthesis')
    expect(resolveRequestedConceptId('what photosynthesis means', 'phys.qm.perturbation-theory', 'physics')).toBe('bio.plant.photosynthesis')
    expect(resolveRequestedConceptId('teach me what a vector is', 'math.graph.random-graph', 'mathematics')).toBe('math.linalg.vector')
    // an explicit definition question about the word itself still reaches it
    expect(resolveRequestedConceptId('what is a term?', 'phys.qm.perturbation-theory', 'physics')).toBe('math.alg.term')
  })

  it('the predicate is narrow: same domain, multi-word titles and undetermined uses are untouched', () => {
    // same KG domain as the lesson -> never an "off-domain" aside
    expect(isOffDomainInstanceReference('which term is the constant?', 'Term', 'math.alg.term', 'math.alg.like-terms')).toBe(false)
    // a multi-word title is specific
    expect(isOffDomainInstanceReference('which like terms go together?', 'Like Terms', 'math.alg.like-terms', 'phys.qm.perturbation-theory')).toBe(false)
    // one undetermined occurrence is enough to leave it to the other filters
    expect(isOffDomainInstanceReference('every term, and the term itself', 'Term', 'math.alg.term', 'phys.qm.perturbation-theory')).toBe(false)
    // "what X is" asks for X; "which X is it" asks which instance
    expect(isOffDomainInstanceReference('teach me what entropy is', 'Entropy', 'phys.therm.entropy', 'math.graph.random-graph')).toBe(false)
    expect(isOffDomainInstanceReference('which distribution is it', 'Distributions', 'math.fnal.distributions', 'math.graph.random-graph')).toBe(true)
    // no lesson -> no rule
    expect(isOffDomainInstanceReference('every term', 'Term', 'math.alg.term', null)).toBe(false)
  })
})

// ════════════════════════════════════════════════════════════════════════════
describe('Phase 3 — example intent: concrete vs real-life', () => {
  const EVERYDAY = 'ONE vivid everyday scenario'

  it('concrete mathematical example (observed Topos) -> concrete directive, never the everyday one', () => {
    expect(detectLearnerRequest(TOPOS_T2)).toBe('real_life_example')   // trigger unchanged
    expect(requestedExampleForm(TOPOS_T2)).toBe('concrete')
    const block = buildLearnerRequestBlock('real_life_example', null, 0, false, undefined, undefined, false, requestedExampleForm(TOPOS_T2))
    expect(block).toContain('TEACHING ACTION: CONCRETE_EXAMPLE')
    expect(block).not.toContain(EVERYDAY)
  })

  it.each([
    ['concrete physics example', 'Give me a concrete example of simple harmonic motion with numbers.', 'concrete'],
    ['example of a named object (observed Vaska)', VASKA_T2, 'concrete'],
    ['formal mathematical structure', 'Can you give an example of a group that is not abelian?', 'concrete'],
    ['real-life example', 'Give me a real-life example of friction.', 'real_life'],
    ['real-world example', 'any real world example of this?', 'real_life'],
    ['everyday analogy', 'Can you give me an everyday analogy for voltage?', 'real_life'],
    ['application', 'what is an application of this in daily life?', 'real_life'],
  ])('%s', (_label, message, form) => {
    expect(detectLearnerRequest(message)).toBe('real_life_example')
    expect(requestedExampleForm(message)).toBe(form)
  })

  it('an explicit real-life request keeps the everyday directive byte-for-byte (default parameter = old behaviour)', () => {
    const legacy = buildLearnerRequestBlock('real_life_example', null, 0, true)
    expect(buildLearnerRequestBlock('real_life_example', null, 0, true, undefined, undefined, false, 'real_life')).toBe(legacy)
    expect(legacy).toContain(EVERYDAY)
  })
})

// ════════════════════════════════════════════════════════════════════════════
describe('Phase 4 — "show me how/why" is not a diagram request', () => {
  it.each([
    ['observed Topos T3', TOPOS_T3],
    ['show me why', 'show me why every term is negative'],
    ['show me the derivation', 'show me the derivation of the second-order shift'],
    ['show me step by step', 'can you show me step by step'],
    ['show me that', 'show me that Sh(X) has a subobject classifier'],
  ])('%s -> not diagram', (_label, message) => {
    expect(detectLearnerRequest(message)).not.toBe('diagram')
  })

  it.each([
    ['bare show me', 'show me'],
    ['show me a diagram', 'show me a diagram'],
    ['can you show me a picture', 'can you show me a picture'],
    ['show me what it looks like', 'show me what it looks like'],
    ['show me how it looks', 'show me how it looks'],
    ['a medium noun still counts', 'show me how the graph changes'],
    ['a visual verb still counts', 'draw it please'],
  ])('%s -> diagram (unchanged)', (_label, message) => {
    expect(detectLearnerRequest(message)).toBe('diagram')
  })
})

// ════════════════════════════════════════════════════════════════════════════
describe('Phase 5 — a typed non-answer is not graded against a pending MCQ', () => {
  // The exact model-invented MCQs from the production A/B run.
  const PERT_MCQ: TutorMCQ = {
    question: 'If a perturbation couples the ground state to an excited state that lies 5 eV higher, what sign will the second-order energy shift of the ground state have?',
    options: ['Positive', 'Negative', 'Zero', 'Cannot determine'],
    correctIndex: 1,
  } as TutorMCQ
  const TOPOS_MCQ: TutorMCQ = {
    question: 'Which statement describes the sheaf gluing condition in the weather-app example?',
    options: [
      'If two overlapping neighbourhoods have different temperature reports, they can still be combined into a single report for the whole city.',
      'If two overlapping neighbourhoods have compatible (matching) temperature reports on their overlap, there is a unique combined report for their union.',
      'Each neighbourhood must have a unique temperature reading, regardless of overlap.',
      'The app can only show data for the smallest neighbourhoods, never for larger unions.',
    ],
    correctIndex: 1,
  } as TutorMCQ
  const NOT_GRADED = { chosenIndex: null, correct: null }

  it('observed: explanation requests (were graded chosen 1 PASS / chosen 3 FAIL in production)', () => {
    expect(gradeMcqAnswer(PERTURBATION_REPEAT, PERT_MCQ)).toEqual(NOT_GRADED)
    expect(gradeMcqAnswer(TOPOS_T3, TOPOS_MCQ)).toEqual(NOT_GRADED)
    expect(engagesPendingOptions(PERTURBATION_REPEAT, PERT_MCQ)).toBe(false)
    expect(engagesPendingOptions(TOPOS_T3, TOPOS_MCQ)).toBe(false)
  })

  it('learner question -> no grade', () => {
    expect(gradeMcqAnswer('why is the shift negative?', PERT_MCQ)).toEqual(NOT_GRADED)
  })

  it('learner correction -> no grade (its answer-shaped control IS graded)', () => {
    // (No hyphen straight after "I thought": isClaimChallenge's remembered-
    // fact pattern needs three space-separated words there — a pre-existing
    // property of that detector, not changed here.)
    const control = 'each term in the second order sum came out negative for the ground state'
    expect(gradeMcqAnswer(control, PERT_MCQ).chosenIndex).toBe(1)          // the words DO resolve to an option…
    const correction = `I thought ${control}`
    expect(readsAsRequestToTutor(correction)).toBe(true)
    expect(gradeMcqAnswer(correction, PERT_MCQ)).toEqual(NOT_GRADED)       // …but a challenge answers nothing
  })

  it('learner explanation request -> no grade (other request frames)', () => {
    for (const m of [
      'Walk me through why the shift is negative',
      'would you explain the negative sign again',
      'ok explain why it comes out negative',
      'I still want you to show the negative sign comes from the denominator',
    ]) expect(gradeMcqAnswer(m, PERT_MCQ)).toEqual(NOT_GRADED)
  })

  it('actual MCQ answers -> the normal grading path, unchanged', () => {
    expect(gradeMcqAnswer('Negative', PERT_MCQ)).toEqual({ chosenIndex: 1, correct: true })     // a tap
    expect(gradeMcqAnswer('Positive', PERT_MCQ)).toEqual({ chosenIndex: 0, correct: false })
    expect(gradeMcqAnswer('B', PERT_MCQ)).toEqual({ chosenIndex: 1, correct: true })
    expect(gradeMcqAnswer('i think it is negative', PERT_MCQ)).toEqual({ chosenIndex: 1, correct: true })
    expect(gradeMcqAnswer('Negative, because every denominator is negative', PERT_MCQ)).toEqual({ chosenIndex: 1, correct: true })
    expect(engagesPendingOptions('i think it is negative', PERT_MCQ)).toBe(true)
  })
})

// ════════════════════════════════════════════════════════════════════════════
describe('route regressions (real POST handler, turn harness)', () => {
  // Single-word options, like the production model-invented MCQ, so the
  // request text DOES resolve to an option unless the non-answer guard stops it
  // (mutation-checked: with the guard removed, the request below grades
  // `correct: true`).
  const PROBES = [1, 2, 3].map((n) => ({
    assetId: `probe-${n}`,
    conceptId: 'phys.qm.perturbation-theory',
    stem: `Q${n}: What sign does the second-order shift of the ground-state energy have?`,
    choices: [
      { text: 'Positive', isCorrect: false },
      { text: 'Negative', isCorrect: true },
      { text: 'Zero', isCorrect: false },
    ],
  }))
  const LANE = {
    probes: PROBES, subjectSlug: 'physics', conceptId: 'phys.qm.perturbation-theory',
    lessonTitle: 'Time-Independent Perturbation Theory',
  }
  const grade = (t: TurnResult) => readLog(t, '[mcq-grade]') as { chosen: number | null; correct: boolean | null } | null
  const onScreen = async () => {
    // Drive until an authored probe is on screen, then stop.
    for (let i = 0; i < 12; i++) {
      const [t] = await driveTurns(h, POST, [{ learnerSays: 'ok', modelReplies: `Teaching segment ${i}.` }], LANE)
      const mcq = (t.body as { mcq?: { question?: string; options?: string[] } }).mcq
      if (mcq?.options) return mcq as { question: string; options: string[] }
    }
    throw new Error('no probe reached the screen')
  }

  it('observed request with a probe on screen is not graded; a tap still is', async () => {
    await onScreen()
    const [req] = await driveTurns(h, POST, [{ learnerSays: PERTURBATION_REPEAT, modelReplies: 'E2 = …' }], LANE)
    expect(grade(req)).toMatchObject({ chosen: null, correct: null })
    const onScreenAgain = (req.body as { mcq?: { options?: string[] } }).mcq
    expect(onScreenAgain?.options).toContain('Negative')                 // still pending, still answerable
    const [tap] = await driveTurns(h, POST, [{ learnerSays: 'Negative', modelReplies: 'Correct.' }], LANE)
    expect(grade(tap)).toMatchObject({ correct: true })
  }, 90_000)

  // What the fix guarantees at the route level: no cross-subject / cross-domain
  // concept target and no foreign figure. (The pre-existing unresolved-topic
  // path may still hold the turn on the LESSON'S OWN concept with the
  // learner's question as its topic — recorded as a residual in the report,
  // deliberately not changed here.)
  it.each([
    ['"every term" (physics)', PERTURBATION_REPEAT, 'physics', 'phys.qm.perturbation-theory', 'Time-Independent Perturbation Theory', 'math.alg.term'],
    ['"what distribution" (random graphs)', RANDOM_GRAPH_T3, 'mathematics', 'math.graph.random-graph', 'Random Graphs', 'math.fnal.distributions'],
  ])('%s: no foreign concept target, no foreign figure', async (_l, message, subjectSlug, conceptId, lessonTitle, foreign) => {
    const [t] = await driveTurns(h, POST, [{ learnerSays: message, modelReplies: 'x' }], { subjectSlug, conceptId, lessonTitle })
    const exc = readLog(t, '[excursion]') as { target?: string | null } | null
    const vis = readLog(t, '[visual-v2]') as { concept?: string | null; provenance?: string | null } | null
    expect([null, conceptId]).toContain(exc?.target ?? null)
    expect(vis?.concept ?? null).not.toBe(foreign)
    expect(String(vis?.provenance ?? '')).not.toContain(foreign.split('.').slice(0, 2).join('.') + ':')
  }, 60_000)
})
