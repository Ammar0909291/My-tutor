/**
 * Concept Anchor — server-owned topic boundary enforcement.
 *
 * The server resolves the current concept once per turn (from KG / curriculum)
 * and injects a compact CONCEPT ANCHOR block into the system prompt. This
 * block tells the LLM what the lesson is about and how to handle off-topic
 * exchanges: answer briefly, then return to the anchored concept.
 *
 * Pure module: no DB, no I/O.
 */

export interface ConceptAnchor {
  conceptId: string
  title: string
  goal: string
  domain: string | null
}

/**
 * Build the concept anchor from already-resolved lesson context.
 * Returns null when no concept identity can be established (graceful
 * degradation — the prompt simply won't have the anchor block).
 */
export function buildConceptAnchor(
  conceptId: string | null | undefined,
  lessonTitle: string | null | undefined,
  lessonGoal: string | null | undefined,
  unitTitle: string | null | undefined,
): ConceptAnchor | null {
  if (!conceptId || !lessonTitle) return null
  return {
    conceptId,
    title: lessonTitle,
    goal: lessonGoal ?? lessonTitle,
    domain: unitTitle ?? null,
  }
}

/**
 * Build the compact CONCEPT ANCHOR prompt block.
 *
 * Token budget: ~60 tokens (vs. the ~80-token anti-anchoring paragraph it
 * replaces). The block is injected ONCE, early in the prompt, and the
 * TURN DIRECTIVE / RECOVERY blocks still override it when active.
 */
export function buildConceptAnchorBlock(anchor: ConceptAnchor): string {
  const domainLine = anchor.domain ? ` (${anchor.domain})` : ''
  return (
    `\n\nCONCEPT ANCHOR (server-owned — this is the lesson you are teaching):` +
    `\n- Concept: "${anchor.title}"${domainLine}` +
    `\n- Goal: ${anchor.goal}` +
    `\n- Rule: If the student asks about a different topic, answer in 1–2 sentences, then steer back: "Good question — now, back to ${anchor.title}…" Every question, example, and assessment this turn must serve this concept's goal. Never drift into extended discussion of unrelated topics.`
  )
}
