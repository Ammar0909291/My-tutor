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
    `\n\nCONCEPT ANCHOR (server-owned — this is the lesson in progress):` +
    `\n- Concept: "${anchor.title}"${domainLine}` +
    `\n- Goal: ${anchor.goal}` +
    // THE RULE THIS REPLACES, and why.
    //
    // It used to read: "If the student asks about a different topic, answer in
    // 1–2 sentences, then steer back: 'Good question — now, back to <lesson>…'
    // Never drift into extended discussion of unrelated topics."
    //
    // Measured across 60 production turns: 33% of all turns steered away from
    // what the learner had just asked. "What is entropy?" got one sentence and
    // a redirect; the learner then said "This makes no sense" and was answered
    // about free-body diagrams; asked a third time, they were told entropy
    // "belongs to a different topic". A learner who states ΔG = ΔH − TΔS
    // correctly was redirected three times instead of advanced.
    //
    // It was also a SECOND AUTHORITY on a decision the Teaching Engine already
    // owns. `excursion.ts` runs the detour lifecycle — it decides when a
    // detour opens, stays open through confusion, and closes on a genuine
    // statement of understanding. This block is built ~1400 lines earlier in
    // the route, before that decision exists, so it was steering back while
    // the engine was trying to teach the detour.
    //
    // It now states the lesson and defers the detour question entirely. When
    // an excursion is open, buildExcursionDirective states the policy and
    // explicitly overrides everything above it. When one is NOT open — the
    // learner named something the curriculum cannot resolve — the rule below
    // is what governs, and it says: answer them.
    `\n- Rule: Teach this concept unless the student asks for something else. If they ask about a different topic, or say they are confused about one, ANSWER THAT QUESTION properly and teach it at full standard — do not reduce it to a sentence, do not refuse it, and do not announce a return to this lesson while their question is still open. Come back to this concept once they say they are satisfied.`
  )
}
