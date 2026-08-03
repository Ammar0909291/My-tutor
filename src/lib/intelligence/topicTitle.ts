/**
 * Single resolver for turning a `TopicProgress.topicSlug` into a human title.
 *
 * There are two disjoint concept-id universes writing that column:
 *
 *   School Mode   — board/grade curriculum ids (`physics.laws_of_motion`,
 *                   `science.*`, `math.*` …), owned by src/lib/education's
 *                   ALL_KG_NODES (20 subject graphs).
 *   Library Mode  — canonical Knowledge Graph ids (`phys.mech.force`,
 *                   `math.arith.fractions` …), owned by
 *                   src/lib/curriculum/knowledgeGraph's SUBJECT_ADAPTERS.
 *
 * revisionProfile.ts and learningDifficultyProfile.ts each built their own
 * title map from ALL_KG_NODES alone, so every Library-mode concept missed and
 * fell through to slug-prettification — surfacing raw ids like
 * "phys.mech.newtons second law" to learners in the revision, difficulty,
 * practice-target, retest and improvement-tracking APIs.
 *
 * Consolidated here so a resolver that knows only one universe cannot be
 * reintroduced by a third consumer. Neither universe's ownership changes:
 * this only routes a slug to whichever one already owns it.
 */
import { ALL_KG_NODES } from '@/lib/education'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'

/** School Mode board-curriculum titles, built once. */
const SCHOOL_NODE_TITLES = new Map(ALL_KG_NODES.map((n) => [n.id, n.title]))

/** Memo across calls — getKGNode scans an adapter's node list per lookup. */
const resolved = new Map<string, string>()

/** Prettify an id we genuinely cannot resolve (unchanged final fallback). */
function prettify(topicSlug: string): string {
  return topicSlug.replace(/[-_]/g, ' ')
}

/**
 * Canonical KG title → School Mode title → prettified slug.
 *
 * The two id spaces are disjoint (`phys.` vs `physics.`), so lookup order
 * only decides which resolver answers first, never which title wins.
 */
export function resolveTopicTitle(topicSlug: string): string {
  const memo = resolved.get(topicSlug)
  if (memo !== undefined) return memo

  const title =
    getKGNode(topicSlug)?.title ??
    SCHOOL_NODE_TITLES.get(topicSlug) ??
    prettify(topicSlug)

  resolved.set(topicSlug, title)
  return title
}
