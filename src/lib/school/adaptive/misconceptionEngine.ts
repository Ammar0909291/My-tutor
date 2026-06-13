/**
 * Misconception Detection Engine (Sprint CS).
 *
 * Moves beyond "weak topic" to "specific misconception" by cross-referencing
 * MistakeRecord and LearningCheckpoint data against a deterministic rule
 * taxonomy. No new database tables — reuses existing signals.
 *
 * Detection model:
 *   1. Fetch MistakeRecords for the chapter's KG node IDs (last 30 days).
 *   2. For each taxonomy rule, count records whose topicSlug matches a
 *      primary pattern. If the rule also requires a secondary pattern
 *      (co-occurrence), require at least one matching record on a secondary
 *      topic as well.
 *   3. Supplement with LearningCheckpoint failures on matching nodes.
 *   4. Assign confidence: LOW (1–2), MEDIUM (3–4), HIGH (5+).
 *   5. Return all detected misconceptions sorted by evidenceCount descending.
 *      Callers should hide LOW-confidence results in UI.
 */

import { prisma } from '@/lib/db/prisma'

// ── Public types ──────────────────────────────────────────────────────────────

export type MisconceptionConfidence = 'HIGH' | 'MEDIUM' | 'LOW'

export interface Misconception {
  type: string
  label: string
  description: string
  confidence: MisconceptionConfidence
  evidenceCount: number
  remediationSteps: string[]
}

// ── Internal taxonomy rule ────────────────────────────────────────────────────

interface MisconceptionRule {
  type: string
  /** Student-facing short label (shown on chapter page). */
  label: string
  /** Tutor-facing explanation of the misconception. */
  description: string
  /** One or more substrings — a topicSlug containing ANY of these triggers the rule. */
  primaryPatterns: string[]
  /**
   * Optional cross-topic co-occurrence guard. If provided, at least one mistake
   * topicSlug must ALSO match one of these secondary patterns. Used for
   * confusion-between-two-concepts misconceptions.
   */
  secondaryPatterns?: string[]
  remediationSteps: string[]
}

// ── Taxonomy ──────────────────────────────────────────────────────────────────

const RULES: MisconceptionRule[] = [
  // ── Mathematics ────────────────────────────────────────────────────────
  {
    type: 'fraction_denominator',
    label: 'Larger denominator = larger value',
    description: 'Student may believe a fraction with a larger denominator is always larger (e.g. thinks 1/8 > 1/2 because 8 > 2).',
    primaryPatterns: ['fractions.'],
    remediationSteps: [
      'Draw fraction bars side-by-side: 1/2 vs 1/4 vs 1/8 — ask which piece is bigger.',
      'Use pizza slices: "If a pizza is cut into 2 pieces vs 8 pieces, which slice is larger?"',
      'Have student order 1/2, 1/3, 1/6 from largest to smallest before calculating.',
      'Verify: ask student to compare 1/3 vs 1/5 and explain their reasoning.',
    ],
  },
  {
    type: 'percent_decimal',
    label: 'Percent vs decimal confusion',
    description: 'Student confuses percentage and decimal representations — may write 45% as 45.0 instead of 0.45, or 0.3 as 30 instead of 30%.',
    primaryPatterns: ['percentages.'],
    secondaryPatterns: ['decimals.'],
    remediationSteps: [
      'Show the conversion chain: fraction → decimal → percent with the same number (e.g. 1/4 = 0.25 = 25%).',
      'Highlight that "percent" means per hundred — divide by 100 to get decimal.',
      'Give mixed problems where student must identify which form is needed before solving.',
      'Ask: "If 30% of students passed, what decimal would you enter in a spreadsheet?"',
    ],
  },
  {
    type: 'algebra_sign_error',
    label: 'Algebra sign errors',
    description: 'Student makes systematic sign errors when solving or rearranging equations — may drop negatives when transposing or multiplying both sides.',
    primaryPatterns: ['algebra.linear_equations', 'algebra.quadratic', 'algebra.inequalities', 'number_systems.integers'],
    remediationSteps: [
      'Slow down equation solving — write each operation on its own line.',
      'After each step, verify by substituting the current expression back into the original.',
      'Highlight sign change explicitly: "moving a positive term across = subtracting it on the other side."',
      'Use number line for simple integer operations before introducing variables.',
    ],
  },
  {
    type: 'area_perimeter',
    label: 'Area vs perimeter confusion',
    description: 'Student confuses area (square units — the space inside) and perimeter (linear units — the boundary length).',
    primaryPatterns: ['mensuration.perimeter_area'],
    remediationSteps: [
      'Use a physical analogy: perimeter = fence around a garden, area = grass inside.',
      'Trace the boundary of a shape with one colour, fill the inside with another.',
      'Give problems where only one is asked and student must identify which formula applies.',
      'Compare units: area answer should have units², perimeter has plain units.',
    ],
  },
  // ── Science ────────────────────────────────────────────────────────────
  {
    type: 'force_motion',
    label: 'Force and motion concepts mixed',
    description: 'Student believes constant motion requires constant force — confuses net force with motion itself (Newton\'s first law gap).',
    primaryPatterns: ['physics.forces.'],
    secondaryPatterns: ['physics.kinematics.'],
    remediationSteps: [
      'Use the ice-skater analogy: a skater keeps moving without pushing — ask why.',
      'Distinguish between "forces are balanced" (constant velocity) and "forces are unbalanced" (acceleration).',
      'Draw free-body diagrams for constant velocity vs accelerating objects side-by-side.',
      'Ask: "What force keeps Earth moving in orbit?" to probe understanding of inertia.',
    ],
  },
  {
    type: 'mass_weight',
    label: 'Mass vs weight confusion',
    description: 'Student uses mass and weight interchangeably — mass is constant; weight depends on gravitational field.',
    primaryPatterns: ['physics.gravitation.', 'physics.forces.laws_of_motion'],
    remediationSteps: [
      'Astronaut example: same mass on Earth and Moon, but weight changes.',
      'Use W = mg to show weight is mass × g, so weight changes when g changes.',
      'Ask: "What would happen to your weight vs your mass on the Moon?"',
      'Check that student uses kg for mass and N for weight consistently.',
    ],
  },
  {
    type: 'current_voltage',
    label: 'Current vs voltage confusion',
    description: 'Student conflates electric current (flow of charge) with voltage (potential difference driving the flow).',
    primaryPatterns: ['physics.electricity.current_circuits', 'physics.electricity.electrostatics'],
    remediationSteps: [
      'Water analogy: voltage = water pressure, current = flow rate.',
      'Explain: voltage is the "push," current is what flows because of that push.',
      'Ask student to trace where current flows in a circuit diagram vs where voltage is measured.',
      'Give a simple series circuit and ask: same current everywhere, but voltage drops across each component?',
    ],
  },
  {
    type: 'heat_temperature',
    label: 'Heat vs temperature confusion',
    description: 'Student treats heat and temperature as the same — heat is energy transferred, temperature is a measure of average kinetic energy.',
    primaryPatterns: ['physics.thermodynamics.'],
    remediationSteps: [
      'Compare a hot spoon vs a pot of boiling water: same temperature, but which transfers more heat?',
      'Define heat as energy in transit; temperature as a property of the object.',
      'Ask: "Can you add heat to something without changing its temperature?" (phase change — yes).',
      'Use Q = mcΔT to show that heat depends on mass and specific heat, temperature change does not.',
    ],
  },
  // ── English ────────────────────────────────────────────────────────────
  {
    type: 'subject_verb_agreement',
    label: 'Subject-verb agreement confusion',
    description: 'Student does not correctly match the verb form to the subject\'s number or person.',
    primaryPatterns: ['grammar.parts_of_speech.verbs', 'grammar.sentences.'],
    remediationSteps: [
      'Isolate the subject first — remove any phrases between subject and verb, then match.',
      'Practise with collective nouns and indefinite pronouns (everyone is, not everyone are).',
      'Use oral substitution drills: replace the subject with he/she/it/they and listen for the correct verb.',
      'Give edit-the-error exercises where student finds and fixes agreement mistakes in paragraphs.',
    ],
  },
  {
    type: 'verb_tense',
    label: 'Verb tense confusion',
    description: 'Student inconsistently selects verb tenses — mixing past/present/future within the same sentence or paragraph.',
    primaryPatterns: ['grammar.tenses.'],
    remediationSteps: [
      'Establish a "time anchor" at the start of each exercise: past, present, or future?',
      'Use timelines drawn on paper to visualise when each action occurs.',
      'Provide fill-in-the-blank exercises where only the correct tense form is accepted.',
      'Ask student to rewrite the same sentence in three different tenses to feel the contrast.',
    ],
  },
  {
    type: 'pronoun_confusion',
    label: 'Pronoun confusion',
    description: 'Student misuses pronoun case (I vs me, he vs him) or has ambiguous pronoun reference.',
    primaryPatterns: ['grammar.parts_of_speech.nouns_pronouns'],
    remediationSteps: [
      'Teach subject vs object case: "I/he/she/they" for subjects; "me/him/her/them" for objects.',
      'Remove one noun from a compound to test: "He and I went" → "I went" — does that sound right?',
      'For pronoun reference: ask "Who or what does this pronoun refer to?" for every ambiguous case.',
      'Give rewriting exercises: replace nouns with pronouns, checking case at each step.',
    ],
  },
  {
    type: 'sentence_structure',
    label: 'Sentence structure confusion',
    description: 'Student writes run-ons, fragments, or incorrectly combines clauses.',
    primaryPatterns: ['grammar.sentences.types_structure'],
    remediationSteps: [
      'Start with identifying subject + predicate in every sentence.',
      'Classify clauses as independent vs dependent before combining.',
      'Practise combining two short sentences using different conjunctions and punctuation.',
      'Read the sentence aloud — if it feels incomplete or too long without pause, revise.',
    ],
  },
  // ── Social Science ─────────────────────────────────────────────────────
  {
    type: 'cause_effect',
    label: 'Cause vs effect confusion',
    description: 'Student conflates historical causes with their effects — may list effects as causes or vice versa.',
    primaryPatterns: ['history.world_history.', 'history.modern_india.', 'history.medieval_india.'],
    remediationSteps: [
      'Use the "Because → Therefore" template: cause = because statement, effect = therefore statement.',
      'Draw a simple flowchart: cause box → arrow → effect box.',
      'Ask student to restate: "What came first?" and "What happened as a result?"',
      'Provide a list of events and have student sort them into causes vs effects for a given event.',
    ],
  },
  {
    type: 'chronology',
    label: 'Chronology confusion',
    description: 'Student has difficulty placing events in correct historical sequence.',
    primaryPatterns: ['history.ancient_india.', 'history.ancient_world.'],
    remediationSteps: [
      'Build a physical timeline — label cards and arrange them in order.',
      'Anchor events to known periods: BCE vs CE, early vs medieval vs modern.',
      'Use relative markers: "Before or after the Maurya Empire?"',
      'Draw a timeline of 5–6 key events; ask student to add new events in the right position.',
    ],
  },
  {
    type: 'geography_concepts',
    label: 'Geography concept confusion',
    description: 'Student confuses geographic concepts such as climate vs weather, location vs place, or political vs physical boundaries.',
    primaryPatterns: ['geography.'],
    remediationSteps: [
      'Distinguish climate (long-term patterns) vs weather (day-to-day conditions) with examples.',
      'Use maps: identify physical features (rivers, mountains) vs political borders separately.',
      'Practice with location questions: "What country is this city in? What river passes through it?"',
      'Compare two similar regions and ask student to identify what makes them different.',
    ],
  },
]

// ── Signal lookback ───────────────────────────────────────────────────────────

const MISTAKE_LOOKBACK_DAYS = 30
const CHECKPOINT_LOOKBACK_DAYS = 14

// ── Helpers ───────────────────────────────────────────────────────────────────

function matchesPatterns(topicSlug: string, patterns: string[]): boolean {
  return patterns.some((p) => topicSlug.includes(p))
}

function toConfidence(evidenceCount: number): MisconceptionConfidence {
  if (evidenceCount >= 5) return 'HIGH'
  if (evidenceCount >= 3) return 'MEDIUM'
  return 'LOW'
}

// ── Core detection ────────────────────────────────────────────────────────────

/**
 * Detects active misconceptions for a chapter given its KG node IDs.
 * All DB queries are non-fatal. Returns results sorted by evidenceCount descending.
 */
export async function detectMisconceptions(
  userId: string,
  subjectSlug: string,
  kgNodeIds: string[],
  chapterId: string,
): Promise<Misconception[]> {
  if (kgNodeIds.length === 0) return []

  const since30 = new Date(Date.now() - MISTAKE_LOOKBACK_DAYS * 86400000)
  const since14 = new Date(Date.now() - CHECKPOINT_LOOKBACK_DAYS * 86400000)

  const [mistakeRows, checkpointRows] = await Promise.all([
    prisma.mistakeRecord.findMany({
      where: { userId, subjectSlug, topicSlug: { in: kgNodeIds }, createdAt: { gte: since30 } },
      select: { topicSlug: true },
    }).catch(() => [] as { topicSlug: string }[]),
    prisma.learningCheckpoint.findMany({
      where: {
        userId, subjectSlug, chapterId, passed: false,
        createdAt: { gte: since14 },
        kgNodeId: { in: kgNodeIds },
      },
      select: { kgNodeId: true },
    }).catch(() => [] as { kgNodeId: string | null }[]),
  ])

  if (mistakeRows.length === 0 && checkpointRows.length === 0) return []

  const mistakeTopics = mistakeRows.map((r) => r.topicSlug)
  const failedCheckpointNodes = checkpointRows
    .map((r) => r.kgNodeId)
    .filter((n): n is string => n !== null)

  const results: Misconception[] = []

  for (const rule of RULES) {
    // Count mistakes matching primary patterns
    const primaryMistakes = mistakeTopics.filter((t) => matchesPatterns(t, rule.primaryPatterns))
    if (primaryMistakes.length === 0) continue

    // Co-occurrence guard: require at least one secondary match
    if (rule.secondaryPatterns && rule.secondaryPatterns.length > 0) {
      const hasSecondary = mistakeTopics.some((t) => matchesPatterns(t, rule.secondaryPatterns!))
      if (!hasSecondary) continue
    }

    // Add checkpoint failure evidence (capped at 3 to avoid over-weighting)
    const checkpointEvidence = Math.min(
      failedCheckpointNodes.filter((n) => matchesPatterns(n, rule.primaryPatterns)).length,
      3,
    )

    const evidenceCount = primaryMistakes.length + checkpointEvidence
    results.push({
      type: rule.type,
      label: rule.label,
      description: rule.description,
      confidence: toConfidence(evidenceCount),
      evidenceCount,
      remediationSteps: rule.remediationSteps,
    })
  }

  return results.sort((a, b) => b.evidenceCount - a.evidenceCount)
}

/**
 * Public chapter-level API. Wrapper around detectMisconceptions — callers
 * that have kgNodeIds already can call detectMisconceptions directly.
 */
export async function getChapterMisconceptions(
  userId: string,
  _board: string,
  _grade: number,
  subjectSlug: string,
  chapterId: string,
  kgNodeIds: string[],
): Promise<Misconception[]> {
  return detectMisconceptions(userId, subjectSlug, kgNodeIds, chapterId)
}

// ── Tutor integration ─────────────────────────────────────────────────────────

/**
 * Builds the MISCONCEPTION ALERT system prompt block.
 * Only includes MEDIUM and HIGH confidence misconceptions.
 * Returns an empty string when there are no actionable misconceptions.
 */
export function buildMisconceptionBlock(misconceptions: Misconception[]): string {
  const actionable = misconceptions.filter((m) => m.confidence !== 'LOW')
  if (actionable.length === 0) return ''

  const lines: string[] = ['\n\nMISCONCEPTION ALERT']
  for (const m of actionable.slice(0, 2)) {
    lines.push(`Possible misconception (${m.confidence} confidence): ${m.description}`)
  }
  lines.push(
    'Tutor should: directly address the misunderstanding when it surfaces, use counterexamples, and verify understanding afterward. Do not reference this alert explicitly to the student.',
  )
  return lines.join('\n')
}

/**
 * Builds a targeted remediation guidance block for the tutor for a specific
 * misconception. The tutor should receive this to know HOW to repair the gap,
 * not just that a gap exists.
 */
export function buildRemediationStrategy(misconception: Misconception): string {
  const lines: string[] = [`\n\nREMEDIATION STRATEGY — ${misconception.label}`]
  for (const step of misconception.remediationSteps) {
    lines.push(`- ${step}`)
  }
  lines.push('Apply these strategies naturally — do not recite them as a list to the student.')
  return lines.join('\n')
}
