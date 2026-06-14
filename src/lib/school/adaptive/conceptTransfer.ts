/**
 * Concept Transfer Engine (Sprint CT).
 *
 * Distinguishes students who can only solve familiar problems from those who
 * can apply concepts in new contexts.
 *
 * Classification:
 *   TRANSFER_STRONG    — passes both routine and application-style questions
 *   TRANSFER_DEVELOPING — mixed performance on contextual questions
 *   TRANSFER_WEAK      — passes routine exercises but fails application questions
 *
 * Primary signal: LearningCheckpoint.question text, classified as "routine" or
 * "application" via keyword matching. A routine question is a direct calculation
 * or recall prompt. An application question embeds the concept in a real-world
 * scenario.
 *
 * All DB calls are non-fatal. Returns null when evidence is insufficient.
 */

import { prisma } from '@/lib/db/prisma'

// ── Public types ──────────────────────────────────────────────────────────────

export type TransferLevel = 'TRANSFER_STRONG' | 'TRANSFER_DEVELOPING' | 'TRANSFER_WEAK'

export interface TransferProfile {
  level: TransferLevel
  confidence: 'high' | 'medium' | 'low'
  routinePassRate: number | null    // 0–100, null if no routine questions
  applicationPassRate: number | null // 0–100, null if no application questions
  applicationTotal: number
  routineTotal: number
  explanation: string
  /** Compact one-liner for chapter page card. */
  insight: string
}

// ── Application question classifier ──────────────────────────────────────────
//
// A question is "application" if it contains one or more real-world context
// markers — named scenarios, objects, people, prices, or situations that
// require the student to extract the maths/concept from a story.
//
// Routine questions lack this framing: "Calculate 25% of 80", "Find x if ...",
// "What is the formula for ...".

const APPLICATION_MARKERS: RegExp[] = [
  // Transactions and commerce
  /\b(cost|price|discount|sale|tax|profit|loss|interest|budget|earn|spend|pay|buy|sell|shop)\b/i,
  // Quantities in context
  /\b(recipe|ingredient|cook|bake|litre|kg|kilogram|gram|metre|centimetre|kilometre)\b/i,
  // People and situations
  /\b(ram|sita|anita|priya|rahul|student|farmer|shopkeeper|doctor|worker|person|friend)\b/i,
  /\b(a (boy|girl|man|woman|child|family|group|class|team))\b/i,
  // Transport and motion
  /\b(train|car|bus|bicycle|bike|journey|travel|speed|distance|time|reach)\b/i,
  // Natural and environmental
  /\b(garden|field|floor|room|wall|fence|land|plot|area of the)\b/i,
  // Science applications
  /\b(bulb|battery|circuit|wire|switch|device|appliance|household|current flows|voltage across)\b/i,
  /\b(ball|throws?|drops?|falls?|slides?|moves? along|projectile)\b/i,
  /\b(temperature of|heats? up|cools? down|boils|melts)\b/i,
  // English application markers
  /\b(rewrite|edit the following|improve this|spot the error|identify the mistake)\b/i,
  /\b(read the passage|according to the text|what does the author)\b/i,
  // Social science application
  /\b(explain why|what caused|consequence|impact|effect of|led to|resulted in)\b/i,
  /\b(locate on|identify the region|compare the|describe how)\b/i,
  // General "real-world scenario" phrasing
  /\b(real.?world|everyday|in real life|in this situation|in this case|given that)\b/i,
  /\b(how much (does|will|would|did)|what (is|was|will be) the (total|final|cost|price|amount))\b/i,
  /if\b.{5,60}\bhow\b/i,          // "If X costs ₹Y, how many..."
]

function isApplicationQuestion(text: string): boolean {
  return APPLICATION_MARKERS.some((rx) => rx.test(text))
}

// ── Evidence collection ───────────────────────────────────────────────────────

const LOOKBACK_DAYS = 30

interface CheckpointBucket {
  routine: { passed: boolean }[]
  application: { passed: boolean }[]
}

async function fetchCheckpointBuckets(
  userId: string,
  subjectSlug: string,
  chapterId: string,
): Promise<CheckpointBucket> {
  const since = new Date(Date.now() - LOOKBACK_DAYS * 86400000)
  const rows = await prisma.learningCheckpoint.findMany({
    where: { userId, subjectSlug, chapterId, createdAt: { gte: since } },
    select: { question: true, passed: true },
  }).catch(() => [] as { question: string; passed: boolean }[])

  const buckets: CheckpointBucket = { routine: [], application: [] }
  for (const row of rows) {
    if (isApplicationQuestion(row.question)) {
      buckets.application.push({ passed: row.passed })
    } else {
      buckets.routine.push({ passed: row.passed })
    }
  }
  return buckets
}

// Supplementary: practice session score as a routine-performance proxy.
async function fetchPracticeScore(
  userId: string,
  subjectSlug: string,
  chapterId: string,
): Promise<number | null> {
  const rows = await prisma.practiceSession.findMany({
    where: { userId, subjectSlug, chapterId, kind: 'practice', completedAt: { not: null } },
    orderBy: { completedAt: 'desc' },
    take: 3,
    select: { score: true },
  }).catch(() => [] as { score: number | null }[])

  const scores = rows.map((r) => r.score).filter((s): s is number => s !== null)
  if (scores.length === 0) return null
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
}

// ── Classification ────────────────────────────────────────────────────────────

const MIN_APPLICATION_QUESTIONS = 2

function classifyTransfer(
  buckets: CheckpointBucket,
  practiceScore: number | null,
): { level: TransferLevel; confidence: 'high' | 'medium' | 'low' } | null {
  const appTotal = buckets.application.length
  if (appTotal < MIN_APPLICATION_QUESTIONS) return null

  const appPassed = buckets.application.filter((c) => c.passed).length
  const appRate = (appPassed / appTotal) * 100

  const routTotal = buckets.routine.length
  const routPassed = routTotal > 0 ? buckets.routine.filter((c) => c.passed).length : 0
  const routRate = routTotal > 0 ? (routPassed / routTotal) * 100 : (practiceScore ?? 50)

  const hasGoodRoutine = routRate >= 60

  // TRANSFER_WEAK: succeeds on routine but fails on application
  if (hasGoodRoutine && appRate < 40) {
    return {
      level: 'TRANSFER_WEAK',
      confidence: appTotal >= 4 && routTotal >= 3 ? 'high' : 'medium',
    }
  }

  // TRANSFER_STRONG: succeeds on both
  if (appRate >= 65) {
    return {
      level: 'TRANSFER_STRONG',
      confidence: appTotal >= 4 ? 'high' : 'medium',
    }
  }

  // TRANSFER_DEVELOPING: mixed application performance
  return {
    level: 'TRANSFER_DEVELOPING',
    confidence: appTotal >= 4 ? 'medium' : 'low',
  }
}

// ── Insight strings ────────────────────────────────────────────────────────────

const INSIGHTS: Record<TransferLevel, string> = {
  TRANSFER_STRONG:    '🧠 Concept Transfer Strong',
  TRANSFER_DEVELOPING:'🧠 Concept Transfer Developing',
  TRANSFER_WEAK:      '🧠 Concept Transfer Needs Practice',
}

const EXPLANATIONS: Record<TransferLevel, string> = {
  TRANSFER_STRONG:    'You successfully apply this topic in new situations.',
  TRANSFER_DEVELOPING:'You understand the basics but need more application practice.',
  TRANSFER_WEAK:      'Try more real-world applications of this concept.',
}

function buildExplanation(
  level: TransferLevel,
  appRate: number | null,
  routRate: number | null,
): string {
  switch (level) {
    case 'TRANSFER_STRONG':
      return 'Student consistently applies this concept in contextual and application-style questions — transfer confirmed.'
    case 'TRANSFER_WEAK':
      return `Student performs well on routine practice${routRate !== null ? ` (≈${Math.round(routRate)}% pass rate)` : ''} but struggles with application and real-world scenarios${appRate !== null ? ` (≈${Math.round(appRate)}% pass rate)` : ''}. Reteaching mechanics alone will not close this gap.`
    case 'TRANSFER_DEVELOPING':
      return `Student succeeds on some contextual questions but inconsistently${appRate !== null ? ` (≈${Math.round(appRate)}% application pass rate)` : ''}. Needs more varied real-world practice.`
  }
}

// ── Public API ─────────────────────────────────────────────────────────────────

/**
 * Returns a transfer profile for a specific chapter, or null when there is
 * insufficient evidence (fewer than 2 application-type checkpoints).
 */
export async function evaluateConceptTransfer(
  userId: string,
  subjectSlug: string,
  chapterId: string,
): Promise<TransferProfile | null> {
  const [buckets, practiceScore] = await Promise.all([
    fetchCheckpointBuckets(userId, subjectSlug, chapterId),
    fetchPracticeScore(userId, subjectSlug, chapterId),
  ])

  const result = classifyTransfer(buckets, practiceScore)
  if (!result) return null

  const appTotal = buckets.application.length
  const appPassed = buckets.application.filter((c) => c.passed).length
  const appRate = appTotal > 0 ? (appPassed / appTotal) * 100 : null

  const routTotal = buckets.routine.length
  const routPassed = routTotal > 0 ? buckets.routine.filter((c) => c.passed).length : 0
  const routRate = routTotal > 0 ? (routPassed / routTotal) * 100 : null

  return {
    level: result.level,
    confidence: result.confidence,
    routinePassRate: routRate !== null ? Math.round(routRate) : (practiceScore ?? null),
    applicationPassRate: appRate !== null ? Math.round(appRate) : null,
    applicationTotal: appTotal,
    routineTotal: routTotal,
    explanation: buildExplanation(result.level, appRate, routRate ?? practiceScore),
    insight: INSIGHTS[result.level],
  }
}

/**
 * Public chapter-level API — thin wrapper for callers that have board/grade
 * context but don't need it for transfer detection.
 */
export async function getTransferProfile(
  userId: string,
  _board: string,
  _grade: number,
  subjectSlug: string,
  chapterId: string,
): Promise<TransferProfile | null> {
  return evaluateConceptTransfer(userId, subjectSlug, chapterId)
}

// ── Tutor integration ─────────────────────────────────────────────────────────

/**
 * Builds the CONCEPT TRANSFER STATUS system prompt block.
 * Returns an empty string when profile is null (no data).
 */
export function buildTransferReasoningBlock(profile: TransferProfile | null): string {
  if (!profile) return ''

  const lines: string[] = ['\n\nCONCEPT TRANSFER STATUS']
  lines.push(`Level: ${profile.level} (confidence: ${profile.confidence})`)
  lines.push(`Explanation: ${profile.explanation}`)

  switch (profile.level) {
    case 'TRANSFER_STRONG':
      lines.push('Tutor approach: Student can apply concepts in unfamiliar situations. Increase challenge with extension problems, multi-step scenarios, and "what if" reasoning. Connect this topic to the next chapter.')
      break
    case 'TRANSFER_WEAK':
      lines.push('Tutor approach: Student solves routine exercises but struggles to transfer learning. Prefer word problems, real-world scenarios, and contextual questions over repeated drill. Before introducing new material, ensure the student can apply this concept to at least one practical example they have not seen before.')
      lines.push('Actively avoid: repeating the same formulaic exercises — they reinforce procedure, not understanding.')
      break
    case 'TRANSFER_DEVELOPING':
      lines.push('Tutor approach: Student is building transfer ability. Alternate between routine and contextual questions. Celebrate success on application questions. Gently push for one real-world explanation per concept introduced.')
      break
  }

  lines.push('Do not reference this block directly to the student.')
  return lines.join('\n')
}

// ── Transfer prompt generator ─────────────────────────────────────────────────
//
// Returns tutor guidance on WHICH real-world contexts to use for a given set
// of topic nodes — the tutor selects from these to generate application questions.

const TRANSFER_CONTEXTS: { patterns: string[]; contexts: string[] }[] = [
  {
    patterns: ['fractions.'],
    contexts: [
      'recipe scaling (double/halve ingredients)',
      'sharing equally among friends or family members',
      'measuring fabric, rope, or ingredients by fractional amounts',
    ],
  },
  {
    patterns: ['percentages.', 'decimals.'],
    contexts: [
      'shop discounts and sale prices',
      'exam scores and grade thresholds',
      'sports statistics (batting average, win rate)',
      'tax and GST calculation on purchases',
      'bank interest and savings growth',
    ],
  },
  {
    patterns: ['algebra.linear_equations', 'algebra.quadratic'],
    contexts: [
      'age problems (Ram is twice as old as...)',
      'cost/rate word problems (total cost = fixed + per-unit cost)',
      'distance–speed–time scenarios',
    ],
  },
  {
    patterns: ['mensuration.perimeter_area'],
    contexts: [
      'garden fencing cost given price per metre',
      'floor tiling (how many tiles for a given area)',
      'painting a wall (calculate surface area first)',
    ],
  },
  {
    patterns: ['physics.forces.', 'physics.kinematics.'],
    contexts: [
      'bicycle braking distance at different speeds',
      'ball thrown upward — when does it stop, when does it land?',
      'car acceleration and stopping time',
    ],
  },
  {
    patterns: ['physics.electricity.'],
    contexts: [
      'home circuit with multiple appliances — total current drawn',
      'battery life given power consumption',
      'resistance calculation for a given safe current',
    ],
  },
  {
    patterns: ['physics.thermodynamics.'],
    contexts: [
      'time to boil a given mass of water on a stove',
      'heat lost by a cooling object vs temperature drop',
      'comparing thermal expansion of metals in bridges vs rails',
    ],
  },
  {
    patterns: ['grammar.tenses.', 'grammar.sentences.', 'grammar.parts_of_speech.verbs'],
    contexts: [
      'spot-the-error editing tasks in a paragraph',
      'rewrite a passage changing tense throughout',
      'write 3 sentences about your morning routine using the correct tense',
    ],
  },
  {
    patterns: ['history.', 'geography.'],
    contexts: [
      'explain why Event A caused Event B (causal reasoning)',
      'compare two periods/regions and identify one key difference',
      'locate and describe a region using map cues',
    ],
  },
]

/**
 * Returns a tutor instruction string listing appropriate real-world application
 * contexts for the given KG node IDs. Used to guide generation of transfer
 * questions during tutoring.
 */
export function generateTransferPrompt(subjectSlug: string, kgNodeIds: string[]): string {
  const matched: string[][] = []

  for (const entry of TRANSFER_CONTEXTS) {
    const hits = kgNodeIds.filter((id) => entry.patterns.some((p) => id.includes(p)))
    if (hits.length > 0) matched.push(entry.contexts)
  }

  if (matched.length === 0) return ''

  const flat = matched.flat().slice(0, 5)
  const lines = [
    `\n\nAPPLICATION PRACTICE CONTEXTS for ${subjectSlug}:`,
    'Use ONE of the following real-world contexts to frame your next question:',
    ...flat.map((c) => `- ${c}`),
    'Frame the concept inside this context — do not simply ask for the formula.',
  ]
  return lines.join('\n')
}
