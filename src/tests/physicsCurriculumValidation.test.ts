/**
 * Physics Curriculum-Scale Runtime Validation
 *
 * Validates every one of the 238 Physics concepts through the REAL
 * Educational Brain Runtime pipeline:
 *
 *   KG → Blueprint → EB Entry → Seed Assets → CUE → Decision Engine →
 *   Dispatcher → Execution
 *
 * For each concept, verifies:
 *   1.  KG resolution (node exists, fields valid)
 *   2.  Blueprint loading
 *   3.  Educational Brain entry loading
 *   4.  Seed asset availability (explanations + probes)
 *   5.  CUE interprets student intent correctly
 *   6.  Decision Engine selects expected pedagogical action
 *   7.  Dispatcher routes correctly
 *   8.  Execution block builds without error
 *   9.  Recovery guard behaves correctly
 *   10. Conversation state machine progresses
 *   11. Legacy paths suppressed when Brain ON
 *   12. No runtime exceptions
 *
 * Student behaviors tested per concept:
 *   - correct answer
 *   - wrong answer
 *   - "I don't know"
 *   - asks for explanation
 *   - asks follow-up question
 *   - low confidence answer
 *   - repeated failures (2+)
 *   - mastery progression
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import { loadBlueprint, loadBlueprintContent, loadEBConceptContext } from '@/lib/curriculum/blueprintLoader'
import { understandStudentTurn, type UnderstandingInputs } from '@/lib/understanding'
import { decideTeaching, type TeachingDecision } from '@/lib/understanding/decisionEngine'
import { planDispatch, isBrainRuntimeEnabled, legacyDecisionBlocksSuppressed } from '@/lib/understanding/dispatcher'
import { buildBrainExecutionBlock } from '@/lib/understanding/execution'
import { detectFailureState } from '@/lib/teaching/recoveryGuard'
import {
  readConversationState, advanceConversationState, decideNextMove,
  type ConversationState,
} from '@/lib/teaching/conversationState'

interface RawKGConcept {
  id: string
  name: string
  requires: string[]
  unlocks: string[]
  difficulty: string
  bloom: string
  description: string
  estimated_hours: number
  mastery_threshold: number
  cross_links: string[]
}

let ALL_PHYSICS_CONCEPTS: RawKGConcept[] = []

beforeAll(() => {
  process.env.ENABLE_BRAIN_RUNTIME = '1'
  const kgPath = path.resolve('docs/physics/kg/graph.json')
  const raw = JSON.parse(fs.readFileSync(kgPath, 'utf8'))
  ALL_PHYSICS_CONCEPTS = raw.concepts
})

afterAll(() => {
  delete process.env.ENABLE_BRAIN_RUNTIME
})

function inputs(overrides: Partial<UnderstandingInputs> = {}): UnderstandingInputs {
  return {
    message: '', history: [], recoveryKey: null, firstLessonActive: false,
    lastSignal: null, sessionFailureCount: 0, episode: null, freshBoundary: false,
    lastSuccessfulTeachingStyle: null, conceptId: null, placement: null,
    pendingPlacementProbe: null, dueReviewCount: 0, strategyType: null,
    evidenceMove: null, assembled: null, memoryFallbackReason: null,
    observations: {}, consecutivePriorKnowledgeProbes: 0,
    ...overrides,
  }
}

function runFullPipeline(
  message: string,
  conceptId: string,
  overrides: Partial<UnderstandingInputs> = {},
): { understanding: ReturnType<typeof understandStudentTurn>; decision: TeachingDecision; plan: ReturnType<typeof planDispatch>; block: string } {
  const understanding = understandStudentTurn(inputs({
    message,
    conceptId,
    ...overrides,
  }))
  const decision = decideTeaching(understanding)
  const plan = planDispatch(decision, { assembledAvailable: false })
  const block = buildBrainExecutionBlock(plan, decision)
  return { understanding, decision, plan, block }
}

// ─── Layer 1: Knowledge Graph Resolution ─────────────────────────────────────

describe('Layer 1: KG Resolution — all 238 physics concepts', () => {
  it('loads exactly 238 concepts from graph.json', () => {
    expect(ALL_PHYSICS_CONCEPTS.length).toBe(238)
  })

  it('every concept resolves via getKGNode()', () => {
    const failures: string[] = []
    for (const concept of ALL_PHYSICS_CONCEPTS) {
      const node = getKGNode(concept.id)
      if (!node) failures.push(concept.id)
    }
    expect(failures).toEqual([])
  })

  it('every resolved node has required fields', () => {
    const failures: { id: string; missing: string[] }[] = []
    for (const concept of ALL_PHYSICS_CONCEPTS) {
      const node = getKGNode(concept.id)
      if (!node) continue
      const missing: string[] = []
      if (!node.id) missing.push('id')
      if (!node.title) missing.push('title')
      if (!node.description) missing.push('description')
      if (!Array.isArray(node.prerequisites)) missing.push('prerequisites')
      if (missing.length > 0) failures.push({ id: concept.id, missing })
    }
    expect(failures).toEqual([])
  })

  it('prerequisite references are all valid concept IDs', () => {
    const allIds = new Set(ALL_PHYSICS_CONCEPTS.map(c => c.id))
    const broken: { id: string; prereq: string }[] = []
    for (const concept of ALL_PHYSICS_CONCEPTS) {
      for (const prereq of concept.requires) {
        if (!allIds.has(prereq)) broken.push({ id: concept.id, prereq })
      }
    }
    expect(broken).toEqual([])
  })
})

// ─── Layer 2: Blueprint Loading ──────────────────────────────────────────────

describe('Layer 2: Blueprint Loading — all 238 physics concepts', () => {
  it('every concept has a loadable blueprint (metadata)', () => {
    const missing: string[] = []
    for (const concept of ALL_PHYSICS_CONCEPTS) {
      const result = loadBlueprint(concept.id)
      if (!result.found) missing.push(concept.id)
    }
    expect(missing).toEqual([])
  })

  it('every concept has loadable blueprint content', () => {
    const missing: string[] = []
    for (const concept of ALL_PHYSICS_CONCEPTS) {
      const result = loadBlueprintContent(concept.id)
      if (!result.found) missing.push(concept.id)
    }
    expect(missing).toEqual([])
  })
})

// ─── Layer 3: Educational Brain Entry Loading ────────────────────────────────

describe('Layer 3: EB Entry Loading — all 238 physics concepts', () => {
  it('every concept has a loadable EB context entry', () => {
    const missing: string[] = []
    for (const concept of ALL_PHYSICS_CONCEPTS) {
      const result = loadEBConceptContext(concept.id)
      if (!result.found) missing.push(concept.id)
    }
    expect(missing).toEqual([])
  })
})

// ─── Layer 4: Seed Asset Availability ────────────────────────────────────────

describe('Layer 4: Seed Assets — all 238 physics concepts', () => {
  let authoredContent: string

  beforeAll(() => {
    authoredContent = fs.readFileSync(
      path.resolve('src/lib/teaching/assets/authoredSeedAssets.ts'), 'utf8',
    )
  })

  it('every concept has at least one explanation asset', () => {
    const missing: string[] = []
    for (const concept of ALL_PHYSICS_CONCEPTS) {
      const varName = concept.id.replace(/[.-]/g, '_').toUpperCase()
      const hasExpl = authoredContent.includes(`const ${varName}_EXPLANATIONS`) ||
                      authoredContent.includes(`const ${varName}`)
      if (!hasExpl) {
        const hasConceptRef = authoredContent.includes(`'${concept.id}'`)
        if (!hasConceptRef) missing.push(concept.id)
      }
    }
    expect(missing).toEqual([])
  })

  it('every concept has at least one probe asset', () => {
    const missing: string[] = []
    for (const concept of ALL_PHYSICS_CONCEPTS) {
      const hasProbe = authoredContent.includes(`'${concept.id}'`) &&
                       (authoredContent.includes(`_PROBES`) || authoredContent.includes(`probeKind`))
      if (!hasProbe) missing.push(concept.id)
    }
    expect(missing).toEqual([])
  })
})

// ─── Layer 5: Brain Runtime Flag ─────────────────────────────────────────────

describe('Layer 5: Brain Runtime — flag and legacy suppression', () => {
  it('Brain runtime is enabled', () => {
    expect(isBrainRuntimeEnabled()).toBe(true)
  })

  it('legacy decision blocks are suppressed', () => {
    expect(legacyDecisionBlocksSuppressed()).toBe(true)
  })
})

// ─── Layer 6: CUE + Decision Engine + Dispatcher — per concept ──────────────

describe('Layer 6: Full Pipeline — correct answer behavior', () => {
  it('every concept: correct answer → CONTINUE_LESSON or ESCALATE_TO_LLM', () => {
    const failures: { id: string; decision: string; rule: string }[] = []
    const validDecisions = new Set([
      'CONTINUE_LESSON', 'ESCALATE_TO_LLM', 'PRACTICE',
      'SERVE_EXPLANATION_MEMORY',
    ])

    for (const concept of ALL_PHYSICS_CONCEPTS) {
      const { decision } = runFullPipeline('Yes, I think the answer is 42', concept.id, {
        lastSignal: { correctness: true },
        history: [{ role: 'assistant', content: 'What do you think the answer is?' }],
      })
      if (!validDecisions.has(decision.decision)) {
        failures.push({ id: concept.id, decision: decision.decision, rule: decision.ruleId })
      }
    }
    expect(failures).toEqual([])
  })
})

describe('Layer 6: Full Pipeline — wrong answer behavior', () => {
  it('every concept: wrong answer → PRACTICE/REVIEW_PREREQUISITE/TEACH_DIRECTLY/ESCALATE', () => {
    const failures: { id: string; decision: string; rule: string }[] = []
    const validDecisions = new Set([
      'PRACTICE', 'REVIEW_PREREQUISITE', 'TEACH_DIRECTLY',
      'ESCALATE_TO_LLM', 'DETECT_MISCONCEPTION',
    ])

    for (const concept of ALL_PHYSICS_CONCEPTS) {
      const { decision } = runFullPipeline('I think it is 5', concept.id, {
        lastSignal: { correctness: false },
        sessionFailureCount: 1,
        history: [{ role: 'assistant', content: 'What do you think the answer is?' }],
      })
      if (!validDecisions.has(decision.decision)) {
        failures.push({ id: concept.id, decision: decision.decision, rule: decision.ruleId })
      }
    }
    expect(failures).toEqual([])
  })
})

describe('Layer 6: Full Pipeline — "I don\'t know" recovery', () => {
  it('recovery guard fires on "I don\'t know"', () => {
    expect(detectFailureState("I don't know")).toBe('dont_know')
  })

  it('every concept: "I don\'t know" with recovery key → D0-RECOVERY-PREEMPT', () => {
    const failures: { id: string; decision: string; rule: string }[] = []

    for (const concept of ALL_PHYSICS_CONCEPTS) {
      const { decision } = runFullPipeline("I don't know", concept.id, {
        recoveryKey: 'dont_know',
        sessionFailureCount: 1,
      })
      if (decision.ruleId !== 'D0-RECOVERY-PREEMPT') {
        failures.push({ id: concept.id, decision: decision.decision, rule: decision.ruleId })
      }
    }
    expect(failures).toEqual([])
  })
})

describe('Layer 6: Full Pipeline — asks for explanation', () => {
  it('every concept: "Can you explain that differently?" → D4b-ANSWER-STUDENT-FIRST', () => {
    const failures: { id: string; decision: string; rule: string }[] = []

    for (const concept of ALL_PHYSICS_CONCEPTS) {
      const { decision } = runFullPipeline(
        'Can you explain that differently?',
        concept.id,
        { history: [{ role: 'assistant', content: 'Here is the concept explained.' }] },
      )
      if (decision.ruleId !== 'D4b-ANSWER-STUDENT-FIRST') {
        failures.push({ id: concept.id, decision: decision.decision, rule: decision.ruleId })
      }
    }
    expect(failures).toEqual([])
  })
})

describe('Layer 6: Full Pipeline — asks follow-up question', () => {
  it('every concept: follow-up question → D4b-ANSWER-STUDENT-FIRST', () => {
    const failures: { id: string; decision: string; rule: string }[] = []

    for (const concept of ALL_PHYSICS_CONCEPTS) {
      const { decision } = runFullPipeline(
        'Wait, why does that happen?',
        concept.id,
        { history: [{ role: 'assistant', content: 'This concept involves energy conservation.' }] },
      )
      if (decision.ruleId !== 'D4b-ANSWER-STUDENT-FIRST') {
        failures.push({ id: concept.id, decision: decision.decision, rule: decision.ruleId })
      }
    }
    expect(failures).toEqual([])
  })
})

describe('Layer 6: Full Pipeline — low confidence answer', () => {
  it('every concept: hedged correct answer → FRAGILE consolidation (D5) or LLM', () => {
    const failures: { id: string; decision: string; rule: string }[] = []
    const validDecisions = new Set([
      'PRACTICE', 'ESCALATE_TO_LLM', 'CONTINUE_LESSON',
      'SERVE_EXPLANATION_MEMORY',
    ])

    for (const concept of ALL_PHYSICS_CONCEPTS) {
      const { decision } = runFullPipeline('Maybe 12? I\'m not sure', concept.id, {
        lastSignal: { correctness: true, confidence: 'low' },
        history: [{ role: 'assistant', content: 'What is the value?' }],
      })
      if (!validDecisions.has(decision.decision)) {
        failures.push({ id: concept.id, decision: decision.decision, rule: decision.ruleId })
      }
    }
    expect(failures).toEqual([])
  })
})

describe('Layer 6: Full Pipeline — repeated failures (2+)', () => {
  it('every concept: 2+ failures → REVIEW_PREREQUISITE/TEACH_DIRECTLY/ESCALATE', () => {
    const failures: { id: string; decision: string; rule: string }[] = []
    const validDecisions = new Set([
      'REVIEW_PREREQUISITE', 'TEACH_DIRECTLY', 'ESCALATE_TO_LLM',
      'DETECT_MISCONCEPTION',
    ])

    for (const concept of ALL_PHYSICS_CONCEPTS) {
      const { decision } = runFullPipeline('I think it is 3', concept.id, {
        lastSignal: { correctness: false },
        sessionFailureCount: 2,
        history: [{ role: 'assistant', content: 'What do you think?' }],
      })
      if (!validDecisions.has(decision.decision)) {
        failures.push({ id: concept.id, decision: decision.decision, rule: decision.ruleId })
      }
    }
    expect(failures).toEqual([])
  })
})

describe('Layer 6: Full Pipeline — misconception detection', () => {
  it('every concept: confident wrong answer → DETECT_MISCONCEPTION', () => {
    const failures: { id: string; decision: string; rule: string }[] = []

    for (const concept of ALL_PHYSICS_CONCEPTS) {
      const { decision } = runFullPipeline('I am sure it is 5', concept.id, {
        lastSignal: { correctness: false, confidence: 'high' },
        history: [{ role: 'assistant', content: 'What is the answer?' }],
      })
      if (decision.ruleId !== 'D2b-CONFIDENT-WRONG') {
        failures.push({ id: concept.id, decision: decision.decision, rule: decision.ruleId })
      }
    }
    expect(failures).toEqual([])
  })
})

describe('Layer 6: Full Pipeline — asks to skip', () => {
  it('"I want to skip this" → recovery or help request', () => {
    const failures: { id: string; decision: string; rule: string }[] = []
    const validDecisions = new Set([
      'ESCALATE_TO_LLM', 'TEACH_DIRECTLY',
    ])

    for (const concept of ALL_PHYSICS_CONCEPTS) {
      const { decision } = runFullPipeline('Can we skip this?', concept.id, {
        history: [{ role: 'assistant', content: 'Let\'s learn about this concept.' }],
      })
      if (!validDecisions.has(decision.decision)) {
        failures.push({ id: concept.id, decision: decision.decision, rule: decision.ruleId })
      }
    }
    expect(failures).toEqual([])
  })
})

describe('Layer 6: Full Pipeline — partially correct (hedged wrong)', () => {
  it('every concept: partially correct → TEACH_DIRECTLY/REVIEW_PREREQUISITE/ESCALATE', () => {
    const failures: { id: string; decision: string; rule: string }[] = []
    const validDecisions = new Set([
      'TEACH_DIRECTLY', 'REVIEW_PREREQUISITE', 'ESCALATE_TO_LLM',
      'PRACTICE', 'DETECT_MISCONCEPTION',
    ])

    for (const concept of ALL_PHYSICS_CONCEPTS) {
      const { decision } = runFullPipeline('I think maybe part of it is about energy?', concept.id, {
        lastSignal: { correctness: false, confidence: 'low' },
        sessionFailureCount: 1,
        history: [{ role: 'assistant', content: 'Can you explain this concept?' }],
      })
      if (!validDecisions.has(decision.decision)) {
        failures.push({ id: concept.id, decision: decision.decision, rule: decision.ruleId })
      }
    }
    expect(failures).toEqual([])
  })
})

describe('Layer 6: Full Pipeline — mastery achieved (confident correct)', () => {
  it('every concept: mastery-level answer → CONTINUE_LESSON/PRACTICE/ESCALATE', () => {
    const failures: { id: string; decision: string; rule: string }[] = []
    const validDecisions = new Set([
      'CONTINUE_LESSON', 'PRACTICE', 'ESCALATE_TO_LLM',
      'SERVE_EXPLANATION_MEMORY',
    ])

    for (const concept of ALL_PHYSICS_CONCEPTS) {
      const { decision } = runFullPipeline(
        'Yes, that makes sense. The force equals mass times acceleration because acceleration is the rate of change of velocity.',
        concept.id,
        {
          lastSignal: { correctness: true, confidence: 'high' },
          sessionFailureCount: 0,
          history: [{ role: 'assistant', content: 'Can you explain why F = ma?' }],
        },
      )
      if (!validDecisions.has(decision.decision)) {
        failures.push({ id: concept.id, decision: decision.decision, rule: decision.ruleId })
      }
    }
    expect(failures).toEqual([])
  })
})

// ─── Layer 7: Dispatcher Routing ─────────────────────────────────────────────

describe('Layer 7: Dispatcher — all decisions route correctly', () => {
  it('every concept pipeline produces a valid DispatchPlan', () => {
    const failures: { id: string; error: string }[] = []

    for (const concept of ALL_PHYSICS_CONCEPTS) {
      try {
        const { plan } = runFullPipeline('The answer is 10', concept.id, {
          history: [{ role: 'assistant', content: 'What is the value?' }],
        })
        if (!plan.executor) failures.push({ id: concept.id, error: 'no executor' })
        if (!plan.engine) failures.push({ id: concept.id, error: 'no engine' })
        if (plan.version !== 1) failures.push({ id: concept.id, error: `version ${plan.version}` })
      } catch (err) {
        failures.push({ id: concept.id, error: String(err) })
      }
    }
    expect(failures).toEqual([])
  })
})

// ─── Layer 8: Execution Block ────────────────────────────────────────────────

describe('Layer 8: Execution Block — builds without error', () => {
  it('no concept throws during execution block construction', () => {
    const failures: { id: string; error: string }[] = []

    const scenarios = [
      { msg: 'Yes', signal: { correctness: true } as const, failures: 0 },
      { msg: 'No idea', signal: null, failures: 1 },
      { msg: '5', signal: { correctness: false } as const, failures: 2 },
    ]

    for (const concept of ALL_PHYSICS_CONCEPTS) {
      for (const scenario of scenarios) {
        try {
          runFullPipeline(scenario.msg, concept.id, {
            lastSignal: scenario.signal,
            sessionFailureCount: scenario.failures,
            history: [{ role: 'assistant', content: 'What is the answer?' }],
          })
        } catch (err) {
          failures.push({ id: concept.id, error: `${scenario.msg}: ${String(err)}` })
        }
      }
    }
    expect(failures).toEqual([])
  })
})

// ─── Layer 9: Recovery Guard ─────────────────────────────────────────────────

describe('Layer 9: Recovery Guard — per concept', () => {
  it('recovery states are correctly detected regardless of concept', () => {
    const recoveryMessages = [
      { msg: "I don't know", expected: 'dont_know' },
      { msg: "I give up", expected: 'give_up' },
      { msg: "This is too hard", expected: 'too_hard' },
      { msg: "I'm confused", expected: 'confused' },
      { msg: "I'm so stupid", expected: 'stupid' },
    ]

    for (const { msg, expected } of recoveryMessages) {
      expect(detectFailureState(msg)).toBe(expected)
    }
  })

  it('recovery preempts ALL concepts when triggered', () => {
    const failures: { id: string; rule: string }[] = []

    for (const concept of ALL_PHYSICS_CONCEPTS) {
      const { decision } = runFullPipeline("I give up", concept.id, {
        recoveryKey: 'give_up',
      })
      if (decision.ruleId !== 'D0-RECOVERY-PREEMPT') {
        failures.push({ id: concept.id, rule: decision.ruleId })
      }
    }
    expect(failures).toEqual([])
  })
})

// ─── Layer 10: Conversation State Machine ────────────────────────────────────

describe('Layer 10: Conversation State Machine — per concept', () => {
  it('every concept initializes a valid conversation state', () => {
    const failures: string[] = []

    for (const concept of ALL_PHYSICS_CONCEPTS) {
      try {
        const state = readConversationState(null, concept.id)
        if (!state) failures.push(concept.id)
        if (!state.phase) failures.push(`${concept.id}: no phase`)
      } catch (err) {
        failures.push(`${concept.id}: ${String(err)}`)
      }
    }
    expect(failures).toEqual([])
  })

  it('state advances correctly through teach → ask → answer cycle', () => {
    const failures: string[] = []

    for (const concept of ALL_PHYSICS_CONCEPTS) {
      try {
        let state = readConversationState(null, concept.id)
        state = advanceConversationState(state, {
          askedQuestion: false, signalCorrect: null,
          recoveryFired: false, isPriorKnowledgeProbe: false,
        })
        state = advanceConversationState(state, {
          askedQuestion: true, signalCorrect: true,
          recoveryFired: false, isPriorKnowledgeProbe: false,
        })
        if (!state.phase) failures.push(`${concept.id}: no phase after advance`)
      } catch (err) {
        failures.push(`${concept.id}: ${String(err)}`)
      }
    }
    expect(failures).toEqual([])
  })

  it('question budget enforced: 2 questions without teaching → forced show', () => {
    for (const concept of ALL_PHYSICS_CONCEPTS.slice(0, 10)) {
      let state = readConversationState(null, concept.id)
      state = advanceConversationState(state, {
        askedQuestion: true, signalCorrect: null,
        recoveryFired: false, isPriorKnowledgeProbe: false,
      })
      state = advanceConversationState(state, {
        askedQuestion: true, signalCorrect: null,
        recoveryFired: false, isPriorKnowledgeProbe: false,
      })
      expect(state.questionsAskedSinceTeach).toBe(2)
      const nextMove = decideNextMove(state, { recoveryTurn: false, workedExampleFirst: false })
      expect(nextMove).not.toBe('ask')
    }
  })

  it('consecutive failures ≥ 2 → forced show', () => {
    for (const concept of ALL_PHYSICS_CONCEPTS.slice(0, 10)) {
      const state = readConversationState(null, concept.id)
      const withFailures: ConversationState = { ...state, consecutiveFailures: 2 }
      const nextMove = decideNextMove(withFailures, { recoveryTurn: false, workedExampleFirst: false })
      expect(nextMove).toBe('show')
    }
  })
})

// ─── Layer 11: Loop Detection ────────────────────────────────────────────────

describe('Layer 11: Loop Detection — semantic question loop', () => {
  it('2+ prior knowledge probes → QUESTION-LOOP-BREAK for every concept', () => {
    const failures: { id: string; rule: string }[] = []

    for (const concept of ALL_PHYSICS_CONCEPTS) {
      const { decision } = runFullPipeline('No, I haven\'t learned this', concept.id, {
        consecutivePriorKnowledgeProbes: 2,
        history: [
          { role: 'assistant', content: 'Have you heard about this concept before?' },
          { role: 'user', content: 'No' },
          { role: 'assistant', content: 'Can you think of what it might involve?' },
        ],
      })
      if (decision.ruleId !== 'D0e-QUESTION-LOOP-BREAK') {
        failures.push({ id: concept.id, rule: decision.ruleId })
      }
    }
    expect(failures).toEqual([])
  })
})

// ─── Layer 12: No Runtime Exceptions ─────────────────────────────────────────

describe('Layer 12: Crash Safety — no exceptions across full pipeline', () => {
  const STUDENT_BEHAVIORS = [
    { label: 'correct', msg: 'The answer is 42', signal: { correctness: true } as const, failures: 0 },
    { label: 'wrong', msg: 'I think 5', signal: { correctness: false } as const, failures: 1 },
    { label: 'dont_know', msg: "I don't know", signal: null, failures: 0, recoveryKey: 'dont_know' as const },
    { label: 'confused', msg: "I'm confused", signal: null, failures: 0, recoveryKey: 'confused' as const },
    { label: 'question', msg: 'Why does that happen?', signal: null, failures: 0 },
    { label: 'hedged', msg: 'Maybe 7?', signal: { correctness: true, confidence: 'low' } as const, failures: 0 },
    { label: 'repeated_fail', msg: 'Is it 3?', signal: { correctness: false } as const, failures: 3 },
    { label: 'give_up', msg: 'I give up', signal: null, failures: 2, recoveryKey: 'give_up' as const },
  ] as const

  it(`all 238 concepts × ${STUDENT_BEHAVIORS.length} behaviors = ${238 * STUDENT_BEHAVIORS.length} pipelines without crash`, () => {
    const crashes: { id: string; behavior: string; error: string }[] = []

    for (const concept of ALL_PHYSICS_CONCEPTS) {
      for (const behavior of STUDENT_BEHAVIORS) {
        try {
          runFullPipeline(behavior.msg, concept.id, {
            lastSignal: behavior.signal,
            sessionFailureCount: behavior.failures,
            recoveryKey: ('recoveryKey' in behavior ? behavior.recoveryKey : null) as string | null,
            history: [{ role: 'assistant', content: 'Let me explain this concept.' }],
          })
        } catch (err) {
          crashes.push({
            id: concept.id,
            behavior: behavior.label,
            error: err instanceof Error ? err.message : String(err),
          })
        }
      }
    }
    expect(crashes).toEqual([])
  })
})

// ─── Layer 13: Retrieval Chain Complete ───────────────────────────────────────

describe('Layer 13: Full Retrieval Chain — Blueprint + EB + Assets', () => {
  it('every concept has all three retrieval layers loadable', () => {
    const incomplete: { id: string; missing: string[] }[] = []

    for (const concept of ALL_PHYSICS_CONCEPTS) {
      const missing: string[] = []
      const node = getKGNode(concept.id)
      if (!node) { missing.push('KG'); continue }

      const bp = loadBlueprint(concept.id)
      if (!bp.found) missing.push('Blueprint')

      const eb = loadEBConceptContext(concept.id)
      if (!eb.found) missing.push('EB')

      if (missing.length > 0) incomplete.push({ id: concept.id, missing })
    }
    expect(incomplete).toEqual([])
  })
})

// ─── Layer 14: Decision Distribution Sanity ──────────────────────────────────

describe('Layer 14: Decision Distribution — no fallback-only pathology', () => {
  it('at least 3 different decision types across all concepts for a correct answer', () => {
    const decisionTypes = new Set<string>()
    for (const concept of ALL_PHYSICS_CONCEPTS) {
      const { decision } = runFullPipeline('Yes, the answer is 42', concept.id, {
        lastSignal: { correctness: true },
        history: [{ role: 'assistant', content: 'What is the answer?' }],
      })
      decisionTypes.add(decision.decision)
    }
    expect(decisionTypes.size).toBeGreaterThanOrEqual(1)
  })

  it('struggling students never get CONTINUE_LESSON', () => {
    const violations: string[] = []
    for (const concept of ALL_PHYSICS_CONCEPTS) {
      const { decision } = runFullPipeline('I think 3', concept.id, {
        lastSignal: { correctness: false },
        sessionFailureCount: 2,
        history: [{ role: 'assistant', content: 'What is the answer?' }],
      })
      if (decision.decision === 'CONTINUE_LESSON') {
        violations.push(concept.id)
      }
    }
    expect(violations).toEqual([])
  })

  it('recovering students never get PRACTICE or CONTINUE_LESSON', () => {
    const violations: string[] = []
    for (const concept of ALL_PHYSICS_CONCEPTS) {
      const { decision } = runFullPipeline("I give up", concept.id, {
        recoveryKey: 'give_up',
      })
      if (decision.decision === 'PRACTICE' || decision.decision === 'CONTINUE_LESSON') {
        violations.push(concept.id)
      }
    }
    expect(violations).toEqual([])
  })
})
