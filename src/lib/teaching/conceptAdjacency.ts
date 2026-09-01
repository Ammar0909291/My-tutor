import { getKGNode, getKnowledgeGraph, getAllNodes, ID_PREFIX_TO_SUBJECT } from '@/lib/curriculum/knowledgeGraph'

/**
 * IS THIS CONCEPT CLOSE ENOUGH TO THE LESSON TO TEACH FROM?
 *
 * ── THE DEFECT THIS CLOSES (production, measured 2026-08-31, real lesson) ───
 *
 *   lesson:   phys.qm.perturbation-theory
 *   learner:  "what does that angle bracket thing even mean?"     (bra-ket)
 *   served:   an owner-promoted remediation card about swimming pools and
 *             optical fibres, verbatim, and again when challenged
 *
 * The chain, all five steps verified: the bare word "Angle" matched
 * math.geom.angle at EXACT_TITLE 0.95 (a one-word title that is also ordinary
 * English); the lesson was physics so `subjectLocalReading` translated it to
 * "the physics reading of angle"; two physics titles contain the word and it
 * took the shorter — "Total Internal Reflection and Critical Angle"; that
 * concept had an ACTIVE card; the card was rendered verbatim.
 *
 * ── WHY THE GUARD IS HERE AND NOT IN THE RESOLVER ───────────────────────────
 *
 * Three resolver-side fixes were designed and REJECTED BY MEASUREMENT. They are
 * recorded in docs/architecture/WRONG_CONCEPT_RETRIEVAL.md so they are not
 * retried; in short:
 *   1. restricting a title match to its primary conjunct broke 339 of 2,306
 *      translations (14.7%), including "genome editing";
 *   2. dropping a one-word match whose next word is outside the corpus
 *      vocabulary does not fire at all — "bracket" IS corpus vocabulary, via
 *      phys.mech.poisson-brackets;
 *   3. refusing cross-subject translation for one-word matches broke 72,
 *      several of them legitimate ("Carbohydrates" -> Carbohydrates and Lipids).
 *
 * All three were LEXICAL. This one is STRUCTURAL — it asks the knowledge graph
 * whether the two concepts are related at all, which no amount of vocabulary
 * coincidence can fake.
 *
 * ── WHAT IT COSTS, MEASURED ─────────────────────────────────────────────────
 *
 * 238 ACTIVE remediation cards, all physics; card-concept degree min 1, median
 * 2, max 11; zero cards are isolated. The common case is untouched: when the
 * card's concept IS the lesson concept the guard returns true immediately, and
 * that is what every ordinary remediation turn does. Only a card reached for
 * some OTHER concept — an excursion — is tested, and the excursion the engine
 * is designed to open is a PREREQUISITE detour, which is adjacent by
 * construction.
 *
 * It fails SAFE in both directions that matter. With no lesson anchor there is
 * no evidence and nothing changes. When a card IS withheld the learner still
 * gets an answer — the ordinary teaching path runs instead; `cardIsSoleTeachingSource`
 * governs the reverse case (suppressing rival sources WHILE a card serves) and
 * is unaffected.
 *
 * ── HONEST LIMIT ────────────────────────────────────────────────────────────
 *
 * Adjacency is computed from `prerequisites` in BOTH directions. The canonical
 * graphs mirror requires/unlocks, so that recovers those two edge kinds, but
 * `cross_links` is parsed by the adapter and never exposed on KGNode (ADR 05),
 * so cross-link neighbours are invisible here and read as non-adjacent. That
 * makes the guard slightly STRICTER than intended, never looser — a card is
 * withheld, never wrongly admitted.
 */

/**
 * Reverse prerequisite index for one subject, built once.
 *
 * The first version rescanned every node on EVERY call. Correct, and it made a
 * 238x238 measurement run over two minutes — which is the same work the route
 * would do once per card-serving turn. Built once per subject instead; the
 * graphs are static in-memory data, so the index is a pure function of them.
 */
const reverseIndexCache = new Map<string, ReadonlyMap<string, ReadonlySet<string>>>()
function reverseIndex(subject: string): ReadonlyMap<string, ReadonlySet<string>> {
  const cached = reverseIndexCache.get(subject)
  if (cached) return cached
  const built = new Map<string, Set<string>>()
  const graph = getKnowledgeGraph(subject)
  if (graph) {
    for (const node of getAllNodes(graph)) {
      for (const p of node.prerequisites ?? []) {
        if (!built.has(p)) built.set(p, new Set())
        built.get(p)!.add(node.id)
      }
    }
  }
  reverseIndexCache.set(subject, built)
  return built
}

/** Concepts one prerequisite edge away, in either direction. */
function neighbours(conceptId: string): ReadonlySet<string> {
  const out = new Set<string>()
  const node = getKGNode(conceptId)
  if (!node) return out
  for (const p of node.prerequisites ?? []) out.add(p)
  // The reverse edge: anything that lists this concept as its prerequisite.
  // The graph is keyed by SUBJECT SLUG ('physics'), not the id prefix
  // ('phys'). Passing the prefix silently returns no graph, which made the
  // reverse edge invisible and was caught by the reverse-edge test rather than
  // by reading — the failure mode is a guard that quietly over-blocks.
  const subject = ID_PREFIX_TO_SUBJECT[conceptId.split('.')[0]]
  if (subject) for (const child of reverseIndex(subject).get(conceptId) ?? []) out.add(child)
  return out
}

/**
 * May a card authored for `cardConceptId` be taught during a lesson on
 * `lessonConceptId`?
 *
 * True when they are the same concept, when they are one prerequisite edge
 * apart in either direction, or when there is no lesson anchor to judge by.
 */
export function cardConceptIsOnTopic(
  lessonConceptId: string | null | undefined,
  cardConceptId: string | null | undefined,
): boolean {
  try {
    if (!cardConceptId) return false
    // No anchor is no evidence — the same stance the resolver's other guards
    // take. Changing behaviour on an absent signal is how a safety rule starts
    // withholding content for reasons nobody can reconstruct.
    if (!lessonConceptId) return true
    if (lessonConceptId === cardConceptId) return true
    return neighbours(lessonConceptId).has(cardConceptId)
  } catch {
    // A graph failure must never silence teaching.
    return true
  }
}
