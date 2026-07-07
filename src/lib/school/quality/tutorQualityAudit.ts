import type { DifficultyMode } from '@/lib/school/adaptive/learningProfile'
import { parseWorkedExampleTag } from '@/lib/school/tutoring/workedExamples'

/**
 * Tutor Response Quality Audit Engine (Sprint CM).
 *
 * Internal validation engine — NOT a user feature, NOT a dashboard.
 * Deterministically scores a tutoring transcript against the prompt-
 * engineering contracts established by earlier sprints:
 *
 *   1. Teaching Style Compliance  — guided: smaller steps + more examples
 *                                    (Sprint BP); advanced: deeper reasoning.
 *   2. Worked Example Compliance  — asks before revealing + step-by-step
 *                                    [WE:...] progress (Sprint CH).
 *   3. Checkpoint Compliance      — understanding-check question present,
 *                                    hint-and-retry on confusion (Sprint BS).
 *   4. Prerequisite Compliance    — short diagnostic + no restart + bridges
 *                                    back to the lesson (Sprint CB).
 *   5. Lesson Plan Compliance     — teaches the current concept, doesn't
 *                                    jump ahead to upcoming concepts (Sprint BY).
 *   6. Orchestrator Compliance    — primary learning objective is supported
 *                                    when relevant (Sprint CG).
 *
 * Input is a transcript of {role, content} messages plus a small context
 * object describing which adaptive systems were active for the session.
 * This works equally well on a transcript reconstructed from stored session
 * messages or on a hand-authored sample transcript — no DB access, no new
 * tables, no UI.
 *
 * Scoring: each applicable dimension gets a 0-100 score (passed checks /
 * total checks). The overall transcript score is the average of applicable
 * dimension scores, mapped to a category:
 *   90-100  Excellent
 *   75-89   Good
 *   50-74   Needs Review
 *   0-49    Poor
 */

// ── Transcript & context types ──────────────────────────────────────────────

export type TranscriptRole = 'student' | 'tutor'

export interface TranscriptMessage {
  role: TranscriptRole
  content: string
}

export interface PrerequisiteAlertContext {
  /** The concept the student is currently struggling with. */
  weakNodeTitle: string
  /** The likely-missing prerequisite the alert is bridging. */
  missingPrereqTitle: string
}

export interface LessonPlanContext {
  /** The concept the lesson plan says the tutor should be teaching right now. */
  currentConceptTitle: string
  /** Concepts the tutor should not jump ahead to. */
  upcomingConceptTitles: string[]
}

export interface PrimaryObjectiveContext {
  title: string
  sourceSystem: string
}

export interface TranscriptContext {
  difficultyMode: DifficultyMode
  subjectSlug: string
  /** True if an interactive worked example (Sprint CH) was active for this transcript. */
  workedExampleActive?: boolean
  /** Set if a prerequisite alert (Sprint CB) was active for this transcript. */
  prerequisiteAlert?: PrerequisiteAlertContext
  /** Set if a lesson plan (Sprint BY) was driving this session. */
  lessonPlan?: LessonPlanContext
  /** Set if a primary learning objective (Sprint CG) was surfaced for this session. */
  primaryObjective?: PrimaryObjectiveContext
}

export interface SampleTranscript {
  id: string
  label: string
  context: TranscriptContext
  messages: TranscriptMessage[]
}

// ── Compliance check primitives ───────────────────────────────────────────────

export type CheckSeverity = 'violation' | 'warning'

export interface ComplianceCheck {
  name: string
  passed: boolean
  severity: CheckSeverity
  detail: string
  /** Short excerpt from the transcript illustrating the pass/fail evidence. */
  excerpt?: string
}

export type AuditDimensionName =
  | 'Teaching Style Compliance'
  | 'Worked Example Compliance'
  | 'Checkpoint Compliance'
  | 'Prerequisite Compliance'
  | 'Lesson Plan Compliance'
  | 'Orchestrator Compliance'

export interface DimensionResult {
  dimension: AuditDimensionName
  /** False when this dimension's preconditions weren't active for this transcript. */
  applicable: boolean
  score: number
  checks: ComplianceCheck[]
}

export type AuditCategory = 'Excellent' | 'Good' | 'Needs Review' | 'Poor'

export interface TutorAuditReport {
  transcriptId: string
  transcriptLabel: string
  generatedAt: string
  overallScore: number
  category: AuditCategory
  dimensions: DimensionResult[]
  violations: string[]
  warnings: string[]
}

export interface TutorAuditSummary {
  generatedAt: string
  transcriptCount: number
  overallScore: number
  category: AuditCategory
  categoryBreakdown: Record<AuditCategory, number>
  reports: TutorAuditReport[]
}

// ── Text-pattern heuristics ─────────────────────────────────────────────────────

const EXAMPLE_MARKERS = /\b(for example|for instance|e\.g\.|let's say|let's take|imagine|consider|suppose)\b/i
const REASONING_MARKERS = /\b(because|therefore|this means|which means|as a result|the reason (?:is|why)|in other words|consequently|this implies|which implies|hence)\b/i
const CHECKPOINT_MARKERS = /\b(does (?:that|this) make sense|can you (?:tell|explain)|what do you think|how would you|try (?:this|that) (?:yourself|on your own)|before we (?:move on|continue)|quick check|let's check|what(?:'s| is) your)\b/i
const STRUGGLE_MARKERS = /\b(i don'?t know|not sure|i think it'?s|um|uh|maybe|i'?m confused|not clear|i'?m not sure)\b/i
const HINT_MARKERS = /\b(hint|here'?s a clue|try again|one more try|let's try (?:that |this )?again|no worries|that'?s (?:not quite|close)|not quite, but)\b/i
const RESTART_MARKERS = /\b(start (?:the )?chapter (?:over|again|from the beginning)|go back to chapter 1|restart the lesson|from scratch)\b/i
const BRIDGE_MARKERS = /\b(now back to|let's (?:return|go back) to|with that (?:cleared up|sorted)|now that (?:we've|we have) (?:covered|cleared)|back to (?:our|the))\b/i

function tutorMessages(t: SampleTranscript): TranscriptMessage[] {
  return t.messages.filter((m) => m.role === 'tutor')
}

function excerpt(content: string, length = 160): string {
  const clean = content.replace(/\s+/g, ' ').trim()
  return clean.length > length ? `${clean.slice(0, length)}…` : clean
}

function scoreFromChecks(checks: ComplianceCheck[]): number {
  if (checks.length === 0) return 100
  const passed = checks.filter((c) => c.passed).length
  return Math.round((passed / checks.length) * 100)
}

function notApplicable(dimension: AuditDimensionName): DimensionResult {
  return { dimension, applicable: false, score: 100, checks: [] }
}

// ── 1. Teaching Style Compliance ────────────────────────────────────────────────

function auditTeachingStyle(t: SampleTranscript): DimensionResult {
  const dimension: AuditDimensionName = 'Teaching Style Compliance'
  const tutor = tutorMessages(t)
  const checks: ComplianceCheck[] = []

  if (t.context.difficultyMode === 'guided') {
    const longUnbroken = tutor.find((m) => m.content.length > 350 && m.content.split(/\n\s*\n/).length < 2)
    checks.push({
      name: 'smaller_steps',
      passed: !longUnbroken,
      severity: 'violation',
      detail: 'Guided mode requires long explanations to be broken into smaller paragraphs/steps rather than one dense block.',
      excerpt: longUnbroken ? excerpt(longUnbroken.content) : undefined,
    })

    const exampleMsg = tutor.find((m) => EXAMPLE_MARKERS.test(m.content))
    checks.push({
      name: 'more_examples',
      passed: !!exampleMsg,
      severity: 'violation',
      detail: 'Guided mode requires the tutor to ground explanations with concrete examples ("for example", "let\'s say", etc.).',
      excerpt: exampleMsg ? excerpt(exampleMsg.content) : undefined,
    })
  } else if (t.context.difficultyMode === 'advanced') {
    const reasoningMsg = tutor.find((m) => REASONING_MARKERS.test(m.content))
    checks.push({
      name: 'deeper_reasoning',
      passed: !!reasoningMsg,
      severity: 'violation',
      detail: 'Advanced mode requires reasoning/justification language (e.g. "because", "therefore") rather than bare statements of fact.',
      excerpt: reasoningMsg ? excerpt(reasoningMsg.content) : undefined,
    })
  } else {
    return notApplicable(dimension)
  }

  return { dimension, applicable: true, score: scoreFromChecks(checks), checks }
}

// ── 2. Worked Example Compliance ────────────────────────────────────────────────

function auditWorkedExample(t: SampleTranscript): DimensionResult {
  const dimension: AuditDimensionName = 'Worked Example Compliance'
  if (!t.context.workedExampleActive) return notApplicable(dimension)

  const tutor = tutorMessages(t)
  const checks: ComplianceCheck[] = []

  const tagged = tutor.map((m) => ({ m, tag: parseWorkedExampleTag(m.content) }))
  const inProgress = tagged.filter((x) => x.tag.state !== null)
  const reachedDone = tagged.some((x) => x.tag.done)

  const stepNumbers = inProgress.map((x) => x.tag.state!.currentStep)
  const stepByStep = stepNumbers.length >= 2 && stepNumbers.every((s, i) => i === 0 || s > stepNumbers[i - 1])
  checks.push({
    name: 'step_by_step_progress',
    passed: stepByStep,
    severity: 'violation',
    detail: 'Worked examples must deliver the solution incrementally across multiple turns with increasing step numbers, not all at once.',
    excerpt: inProgress[0] ? excerpt(inProgress[0].m.content) : undefined,
  })

  const failingAsk = inProgress.find((x) => !x.m.content.includes('?'))
  checks.push({
    name: 'asks_before_revealing',
    passed: inProgress.length > 0 && !failingAsk,
    severity: 'violation',
    detail: 'Each worked-example step must ask the student what to do (or what the result is) before revealing it.',
    excerpt: failingAsk ? excerpt(failingAsk.m.content) : undefined,
  })

  checks.push({
    name: 'reaches_completion',
    passed: reachedDone,
    severity: 'warning',
    detail: 'A completed worked example should end with [WE:done] once the student confirms the final answer.',
  })

  return { dimension, applicable: true, score: scoreFromChecks(checks), checks }
}

// ── 3. Checkpoint Compliance ─────────────────────────────────────────────────────

function auditCheckpoints(t: SampleTranscript): DimensionResult {
  const dimension: AuditDimensionName = 'Checkpoint Compliance'
  const checks: ComplianceCheck[] = []

  const checkpointMsg = tutorMessages(t).find((m) => {
    const clean = parseWorkedExampleTag(m.content).cleanText
    return CHECKPOINT_MARKERS.test(clean) || (clean.trim().endsWith('?') && clean.length > 80)
  })
  checks.push({
    name: 'understanding_checks_present',
    passed: !!checkpointMsg,
    severity: 'violation',
    detail: 'The tutor should weave in a short understanding-check question after explaining a concept.',
    excerpt: checkpointMsg ? excerpt(checkpointMsg.content) : undefined,
  })

  let foundStruggle = false
  let retrySupported = true
  let strugglingMsg: TranscriptMessage | null = null
  for (let i = 0; i < t.messages.length - 1; i++) {
    const msg = t.messages[i]
    if (msg.role !== 'student' || !STRUGGLE_MARKERS.test(msg.content)) continue
    foundStruggle = true
    const next = t.messages[i + 1]
    if (!(next?.role === 'tutor' && HINT_MARKERS.test(next.content))) {
      retrySupported = false
      strugglingMsg = msg
    }
  }
  if (foundStruggle) {
    checks.push({
      name: 'retry_behavior_supported',
      passed: retrySupported,
      severity: 'violation',
      detail: 'When the student signals confusion, the tutor should offer a hint and let them retry instead of just giving the answer.',
      excerpt: strugglingMsg ? excerpt(strugglingMsg.content) : undefined,
    })
  }

  return { dimension, applicable: true, score: scoreFromChecks(checks), checks }
}

// ── 4. Prerequisite Compliance ───────────────────────────────────────────────────

function auditPrerequisite(t: SampleTranscript): DimensionResult {
  const dimension: AuditDimensionName = 'Prerequisite Compliance'
  const alert = t.context.prerequisiteAlert
  if (!alert) return notApplicable(dimension)

  const tutor = tutorMessages(t)
  const checks: ComplianceCheck[] = []
  const lowerPrereq = alert.missingPrereqTitle.toLowerCase()

  const diagnosticMsg = tutor.find((m) => m.content.toLowerCase().includes(lowerPrereq) && m.content.includes('?'))
  checks.push({
    name: 'prerequisite_diagnostic',
    passed: !!diagnosticMsg,
    severity: 'violation',
    detail: `Tutor should run a short diagnostic referencing the missing prerequisite ("${alert.missingPrereqTitle}") to confirm the gap.`,
    excerpt: diagnosticMsg ? excerpt(diagnosticMsg.content) : undefined,
  })

  const restartMsg = tutor.find((m) => RESTART_MARKERS.test(m.content))
  checks.push({
    name: 'no_full_restart',
    passed: !restartMsg,
    severity: 'violation',
    detail: 'Tutor must not restart the chapter or re-teach the current topic from scratch when bridging a prerequisite gap.',
    excerpt: restartMsg ? excerpt(restartMsg.content) : undefined,
  })

  const bridgeMsg = tutor.find((m) => BRIDGE_MARKERS.test(m.content))
  checks.push({
    name: 'bridges_back_to_lesson',
    passed: !!bridgeMsg,
    severity: 'violation',
    detail: `After confirming the prerequisite gap, the tutor should bridge back to the current topic ("${alert.weakNodeTitle}").`,
    excerpt: bridgeMsg ? excerpt(bridgeMsg.content) : undefined,
  })

  return { dimension, applicable: true, score: scoreFromChecks(checks), checks }
}

// ── 5. Lesson Plan Compliance ────────────────────────────────────────────────────

function auditLessonPlan(t: SampleTranscript): DimensionResult {
  const dimension: AuditDimensionName = 'Lesson Plan Compliance'
  const plan = t.context.lessonPlan
  if (!plan) return notApplicable(dimension)

  const tutor = tutorMessages(t)
  const checks: ComplianceCheck[] = []
  const allText = tutor.map((m) => m.content).join(' ').toLowerCase()

  const teachesCurrent = allText.includes(plan.currentConceptTitle.toLowerCase())
  checks.push({
    name: 'teaches_current_concept',
    passed: teachesCurrent,
    severity: 'violation',
    detail: `Tutor should teach the current lesson-plan concept ("${plan.currentConceptTitle}").`,
  })

  const jumpedAhead = plan.upcomingConceptTitles.filter((c) => allText.includes(c.toLowerCase()))
  checks.push({
    name: 'avoids_jumping_ahead',
    passed: jumpedAhead.length === 0,
    severity: 'warning',
    detail: jumpedAhead.length > 0
      ? `Tutor referenced upcoming concept(s) before they were due: ${jumpedAhead.join(', ')}.`
      : 'Tutor stayed within the scope of the current concept.',
  })

  return { dimension, applicable: true, score: scoreFromChecks(checks), checks }
}

// ── 6. Orchestrator Compliance ───────────────────────────────────────────────────

function auditOrchestrator(t: SampleTranscript): DimensionResult {
  const dimension: AuditDimensionName = 'Orchestrator Compliance'
  const objective = t.context.primaryObjective
  if (!objective) return notApplicable(dimension)

  const tutor = tutorMessages(t)
  const checks: ComplianceCheck[] = []

  const supportingMsg = tutor.find((m) => m.content.toLowerCase().includes(objective.title.toLowerCase()))
  checks.push({
    name: 'supports_primary_objective',
    passed: !!supportingMsg,
    severity: 'warning',
    detail: `Session should support the primary learning objective ("${objective.title}", source: ${objective.sourceSystem}) when relevant to the conversation.`,
    excerpt: supportingMsg ? excerpt(supportingMsg.content) : undefined,
  })

  return { dimension, applicable: true, score: scoreFromChecks(checks), checks }
}

// ── Scoring & report assembly ────────────────────────────────────────────────────

function categoryForScore(score: number): AuditCategory {
  if (score >= 90) return 'Excellent'
  if (score >= 75) return 'Good'
  if (score >= 50) return 'Needs Review'
  return 'Poor'
}

/** Audit a single transcript across all 6 compliance dimensions. */
export function auditTranscript(t: SampleTranscript): TutorAuditReport {
  const dimensions: DimensionResult[] = [
    auditTeachingStyle(t),
    auditWorkedExample(t),
    auditCheckpoints(t),
    auditPrerequisite(t),
    auditLessonPlan(t),
    auditOrchestrator(t),
  ]

  const applicable = dimensions.filter((d) => d.applicable)
  const overallScore = applicable.length > 0
    ? Math.round(applicable.reduce((sum, d) => sum + d.score, 0) / applicable.length)
    : 100

  const violations: string[] = []
  const warnings: string[] = []
  for (const d of dimensions) {
    for (const c of d.checks) {
      if (c.passed) continue
      const line = `[${d.dimension}] ${c.detail}${c.excerpt ? ` (e.g. "${c.excerpt}")` : ''}`
      if (c.severity === 'violation') violations.push(line)
      else warnings.push(line)
    }
  }

  return {
    transcriptId: t.id,
    transcriptLabel: t.label,
    generatedAt: new Date().toISOString(),
    overallScore,
    category: categoryForScore(overallScore),
    dimensions,
    violations,
    warnings,
  }
}

/** Audit a batch of transcripts and roll up an overall summary. */
export function auditTranscripts(transcripts: SampleTranscript[]): TutorAuditSummary {
  const reports = transcripts.map(auditTranscript)
  const overallScore = reports.length > 0
    ? Math.round(reports.reduce((sum, r) => sum + r.overallScore, 0) / reports.length)
    : 100

  const categoryBreakdown: Record<AuditCategory, number> = {
    Excellent: 0,
    Good: 0,
    'Needs Review': 0,
    Poor: 0,
  }
  for (const r of reports) categoryBreakdown[r.category]++

  return {
    generatedAt: new Date().toISOString(),
    transcriptCount: reports.length,
    overallScore,
    category: categoryForScore(overallScore),
    categoryBreakdown,
    reports,
  }
}

// ── Sample transcripts (Sprint CM validation fixtures) ───────────────────────────
//
// "stored session messages OR sample transcripts" — these hand-authored
// transcripts exercise all 6 dimensions without any DB access. The first
// four cover the required validation scenarios (guided, advanced, worked
// example, prerequisite recovery); the fifth is a deliberately non-compliant
// transcript that demonstrates violation/warning detection.

export const SAMPLE_TRANSCRIPTS: SampleTranscript[] = [
  {
    id: 'guided-linear-equations',
    label: 'Sample Guided Session — Linear Equations (Mathematics)',
    context: {
      difficultyMode: 'guided',
      subjectSlug: 'mathematics',
      lessonPlan: {
        currentConceptTitle: 'Linear Equations in One Variable',
        upcomingConceptTitles: ['Linear Equations in Two Variables', 'Graphing on the Coordinate Plane'],
      },
    },
    messages: [
      { role: 'student', content: "Can you help me understand linear equations? I'm a bit lost." },
      {
        role: 'tutor',
        content: `Sure, let's take it one small step at a time.

A linear equation in one variable is an equation where the variable (let's call it x) appears only to the power of 1 — no squares, no roots.

For example, 2x + 3 = 7 is a linear equation. Our job is to find the value of x that makes both sides equal.

Does that make sense so far?`,
      },
      { role: 'student', content: 'I think so, but how do we actually solve it?' },
      {
        role: 'tutor',
        content: `Great question — let's go step by step.

First, we want to get the term with x alone on one side. In 2x + 3 = 7, we subtract 3 from both sides: 2x = 4.

Next, we divide both sides by 2 to isolate x, giving x = 2.

For example, if instead we had 3x - 5 = 10, we'd add 5 to both sides first, then divide by 3.

Can you try solving 2x + 3 = 7 yourself and tell me what x equals?`,
      },
      { role: 'student', content: 'x = 2?' },
      {
        role: 'tutor',
        content: "Exactly right — x = 2!\n\nNow let's try one more together: 4x - 1 = 11. What's your first step?",
      },
      { role: 'student', content: "Um, I don't know — do we subtract 1 first?" },
      {
        role: 'tutor',
        content: "Good instinct, but here's a hint: look at what's being done to x — first it's multiplied by 4, then 1 is subtracted. To undo it, reverse the order: add 1 to both sides first. Want to try that step again?",
      },
      { role: 'student', content: 'Okay — 4x - 1 + 1 = 11 + 1, so 4x = 12.' },
      {
        role: 'tutor',
        content: "That's correct! Now divide both sides by 4 to get x = 3.\n\nYou're doing great with linear equations in one variable — this is exactly the skill we're focusing on right now.",
      },
    ],
  },
  {
    id: 'advanced-newtons-laws',
    label: "Sample Advanced Session — Newton's Laws (Science)",
    context: {
      difficultyMode: 'advanced',
      subjectSlug: 'science',
      primaryObjective: {
        title: "Newton's Laws of Motion",
        sourceSystem: 'mock_test_analysis',
      },
    },
    messages: [
      { role: 'student', content: "Why doesn't a heavier object fall faster than a lighter one in a vacuum?" },
      {
        role: 'tutor',
        content: "This comes down to Newton's second law and how gravity works. The gravitational force on an object is F = mg, and Newton's second law says F = ma, so a = F/m = mg/m = g. Because the mass cancels out of that ratio, every object accelerates at the same rate g in a vacuum, regardless of its mass — therefore a heavier object falls at exactly the same rate as a lighter one. This is the exact reasoning your recent mock test on Newton's Laws of Motion was testing. Can you explain in your own words why the masses cancel out?",
      },
      {
        role: 'student',
        content: 'Because acceleration equals force divided by mass, and the force itself depends on mass — so the mass terms cancel?',
      },
      {
        role: 'tutor',
        content: "Exactly — that's the deeper reasoning behind it. Since both the gravitational force and the inertial resistance to acceleration scale with mass identically, the ratio a = F/m stays constant at g. This is why the mock-test question about a feather and a hammer falling together on the Moon was really testing this principle of Newton's Laws of Motion, not some special exception.",
      },
    ],
  },
  {
    id: 'worked-example-factoring',
    label: 'Sample Worked Example Session — Factoring Quadratics (Mathematics)',
    context: {
      difficultyMode: 'standard',
      subjectSlug: 'mathematics',
      workedExampleActive: true,
    },
    messages: [
      { role: 'student', content: 'Can you help me solve x^2 + 5x + 6 = 0?' },
      {
        role: 'tutor',
        content: "Sure — let's work through this together step by step rather than me just handing you the answer.\n\nStep 1: we need two numbers that multiply to 6 and add up to 5. What two numbers come to mind?\n[WE:solving quadratics by factoring|1|3]",
      },
      { role: 'student', content: '2 and 3?' },
      {
        role: 'tutor',
        content: "Exactly — 2 × 3 = 6 and 2 + 3 = 5.\n\nStep 2: so we can rewrite the equation as (x + 2)(x + 3) = 0. If two factors multiply to zero, what must be true about at least one of them?\n[WE:solving quadratics by factoring|2|3]",
      },
      { role: 'student', content: 'One of them has to be zero.' },
      {
        role: 'tutor',
        content: "Right! So we set each factor equal to zero: x + 2 = 0 or x + 3 = 0.\n\nStep 3: can you solve each of those for x?\n[WE:solving quadratics by factoring|3|3]",
      },
      { role: 'student', content: 'x = -2 or x = -3' },
      {
        role: 'tutor',
        content: "Perfect — those are the two solutions, and you worked through the whole factoring process yourself!\n[WE:done]",
      },
    ],
  },
  {
    id: 'prerequisite-recovery-fractions',
    label: 'Sample Prerequisite Recovery Session — Fractions (Mathematics)',
    context: {
      difficultyMode: 'standard',
      subjectSlug: 'mathematics',
      prerequisiteAlert: {
        weakNodeTitle: 'Solving Linear Equations with Fractional Coefficients',
        missingPrereqTitle: 'Adding and Subtracting Fractions',
      },
    },
    messages: [
      { role: 'student', content: "I don't get how to solve (1/2)x + 1/3 = 5/6" },
      { role: 'tutor', content: "Before we dive into solving that, let's do a quick diagnostic first: what is 1/2 + 1/3?" },
      { role: 'student', content: 'Um... 2/5?' },
      {
        role: 'tutor',
        content: "No worries — that's a really common mix-up with adding and subtracting fractions, so let's clear it up first. To add fractions we need a common denominator: for 1/2 and 1/3 the smallest common denominator is 6, so 1/2 = 3/6 and 1/3 = 2/6, giving 1/2 + 1/3 = 5/6. Try one more: what is 1/4 + 1/6?",
      },
      { role: 'student', content: 'Common denominator of 12 — so 3/12 + 2/12 = 5/12.' },
      {
        role: 'tutor',
        content: "Exactly right! Now back to our equation (1/2)x + 1/3 = 5/6 — we'll use that same common-denominator idea. Multiply every term by 6 to clear the fractions: 3x + 2 = 5. Subtract 2 from both sides to get 3x = 3, then divide by 3 to get x = 1.",
      },
    ],
  },
  {
    id: 'guided-compliance-gaps',
    label: 'Sample Guided Session — Compliance Gaps (Science, stress test)',
    context: {
      difficultyMode: 'guided',
      subjectSlug: 'science',
      lessonPlan: {
        currentConceptTitle: 'Photosynthesis',
        upcomingConceptTitles: ['Cellular Respiration', 'Plant Nutrition'],
      },
    },
    messages: [
      {
        role: 'student',
        content: 'Can you explain photosynthesis? And how does it connect to cellular respiration and plant nutrition?',
      },
      {
        role: 'tutor',
        content: 'Photosynthesis is the process by which plants convert light energy into chemical energy stored in glucose, using carbon dioxide and water as raw materials and releasing oxygen as a byproduct, occurring mainly in the chloroplasts of leaf cells through the light-dependent and light-independent reactions, and cellular respiration is essentially the reverse process where cells break down that glucose using oxygen to release energy as ATP while producing carbon dioxide and water as byproducts, which together with photosynthesis forms the basis of plant nutrition since it lets the plant use stored energy for growth and metabolism.',
      },
    ],
  },
]
