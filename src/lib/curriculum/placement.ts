/**
 * Curriculum placement — computes where a learner genuinely begins a
 * Knowledge-Graph-backed subject based on their canonical CurriculumLevel
 * (src/lib/curriculum/levels.ts), instead of always defaulting to lesson 1.
 *
 * Design constraints (explicit product requirement — do not violate):
 *  - Never fabricates evidence. Nothing here writes to TopicProgress or
 *    StudentProgress.completedLessons — those stay genuinely earned. This
 *    module only changes the DEFAULT starting position used when no real
 *    progress row exists yet, and which nodes count as "available" (not
 *    locked) for prerequisite purposes. A placed learner's completion
 *    percentage legitimately stays low until they actually complete
 *    lessons — that's intentional, not a bug: this is a placement, not a
 *    claim of demonstrated mastery.
 *  - Fully deterministic and re-derivable from data that already exists
 *    (Profile.currentLevel + each subject's own KG difficulty tags) — no
 *    new Prisma fields, no migration, no per-subject hardcoded lesson
 *    numbers.
 *  - Only applies to Knowledge-Graph-backed subjects, where every node
 *    already carries an authored `difficulty` tag. Subjects served from
 *    the legacy Curriculum table or the Subject Library catalog (no KG,
 *    no per-node difficulty) are not guessed at — see getEntryOrder's
 *    fallback behavior and the "remaining limitations" note in project
 *    memory. School Mode is intentionally out of scope: it walks an
 *    external board/grade-prescribed chapter order, which should not be
 *    skipped based on a self-reported level.
 */
import type { KnowledgeGraph, KGNode } from './knowledgeGraph'
import { getAllNodes } from './knowledgeGraph'
import type { CurriculumLevel } from './levels'

// Matches the Difficulty type in src/lib/education/educationTypes.ts.
const DIFFICULTY_ORDER = ['foundational', 'developing', 'proficient', 'advanced', 'expert', 'research'] as const

function difficultyIndex(d: string | undefined): number {
  const i = DIFFICULTY_ORDER.indexOf((d ?? 'foundational') as (typeof DIFFICULTY_ORDER)[number])
  return i === -1 ? 0 : i
}

// The minimum concept-difficulty a learner at each level is placed at —
// i.e. the level skips everything strictly below this tier. Deliberately
// conservative: 'advanced' learners start at KG-authored "advanced" content,
// not "expert"/"research" (those remain earned, not assumed).
const LEVEL_DIFFICULTY_FLOOR: Record<CurriculumLevel, number> = {
  beginner: difficultyIndex('foundational'),
  intermediate: difficultyIndex('proficient'),
  advanced: difficultyIndex('advanced'),
}

/** The flat, 1-based walk order used identically by /api/curriculum's synthetic lesson list. */
function flatNodesInOrder(graph: KnowledgeGraph): KGNode[] {
  return getAllNodes(graph)
}

/**
 * Returns the 1-based `order` position (matching /api/curriculum's
 * synthesized lesson numbering) of the first node at-or-above the level's
 * difficulty floor. Falls back to 1 (beginner-equivalent) if the subject
 * has no content at that difficulty — never guesses past what the KG
 * actually contains.
 */
export function computeCurriculumEntryOrder(graph: KnowledgeGraph, level: CurriculumLevel): number {
  const floor = LEVEL_DIFFICULTY_FLOOR[level]
  if (floor === 0) return 1
  const nodes = flatNodesInOrder(graph)
  const idx = nodes.findIndex((n) => difficultyIndex(n.difficulty) >= floor)
  return idx === -1 ? 1 : idx + 1
}

/**
 * Slugs of every node strictly before the computed entry point — treated as
 * "available" (unlocked) for prerequisite-gating purposes ONLY. Callers
 * must union this into the set passed to getAvailableNodes(); it must never
 * be written into TopicProgress or reported as "completed" anywhere, since
 * these nodes were placed past, not demonstrated.
 */
export function getPlacementFloorSlugs(graph: KnowledgeGraph, level: CurriculumLevel): Set<string> {
  const entryOrder = computeCurriculumEntryOrder(graph, level)
  if (entryOrder <= 1) return new Set()
  const nodes = flatNodesInOrder(graph)
  return new Set(nodes.slice(0, entryOrder - 1).map((n) => n.slug))
}
