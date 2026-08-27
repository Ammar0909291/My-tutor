/**
 * AUTHORITATIVE REMEDIATION GROUNDING (Phase H5).
 *
 * ── WHAT THIS IS, AND WHAT IT IS NOT ────────────────────────────────────────
 * H4 stopped at a boundary: nothing here can decide whether generated
 * remediation prose is TRUE. This module does not move that boundary and does
 * not try to. It answers a narrower, decidable question:
 *
 *     what has a human curator already written that constrains what the tutor
 *     is allowed to say about this concept?
 *
 * Grounding tells the tutor what NOT to claim. Verification would check what
 * the tutor DID claim. Only the first is available, and conflating them is the
 * mistake this file exists to avoid making.
 *
 * ── THE THREE DISTINCT THINGS, KEPT DISTINCT ────────────────────────────────
 *   MISCONCEPTION REGISTER  what LEARNERS commonly get wrong.
 *                           NOT admitted here. H4 proved a checker built on it
 *                           would have passed all three live failures, because
 *                           none of them appears in any register.
 *   ANTI-ANALOGY            which tempting analogy must not be used because it
 *                           creates a false conceptual mapping.
 *                           THE one field shaped for the measured failures.
 *   CANONICAL IDEA          the concept stated once, learner-facing.
 *
 * ── THE TWO SOURCES, AND WHY ONLY THESE TWO ─────────────────────────────────
 *   canonicalIdea → the Knowledge Graph `description`. The one place the
 *     curriculum states a concept in a single learner-facing sentence, for all
 *     1,775 concepts. Already what H3's fallback speaks.
 *   mustNotUse    → the Educational Brain entry's authored anti-analogies,
 *     read through the existing loader. The EB tree is hand-authored markdown;
 *     no AI-authoring path writes into it, so provenance is HUMAN_CURATOR by
 *     construction rather than by a flag this module would have to trust.
 *
 * DELIBERATELY EXCLUDED, each for a measured reason:
 *   · Blueprint `conceptSpine` — author-facing, and degrades to a stub
 *     ("Phase Transitions and Latent Heat is a concept in thermodynamics").
 *   · `core_explanation` assets — dense reference paragraphs, not a
 *     remediation register (H2's finding).
 *   · misconception registers — see above.
 *   · EB `openingScenario` — mixed: a real scenario in hand-authored entries,
 *     a bare definition or a raw formula in the pipeline-generated chemistry
 *     ones. Not uniformly learner-safe, so not a source.
 *
 * ── WHEN THERE IS NOTHING ───────────────────────────────────────────────────
 * `insufficient_authoritative_grounding`, and the block renders to ''. The
 * turn is then exactly what it was before this phase. Nothing is synthesised,
 * nothing is promoted from AI-authored text, and no anti-analogy is invented —
 * which is the whole reason the missing state is a named status rather than a
 * silent empty array.
 *
 * Pure: no I/O beyond the two existing loaders, no model call, no database.
 */
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import { loadEBConceptContext } from '@/lib/curriculum/blueprintLoader'

export type RemediationGroundingStatus = 'grounded' | 'insufficient_authoritative_grounding'

export interface RemediationGrounding {
  conceptId: string
  status: RemediationGroundingStatus
  /** The curriculum's own one-sentence statement, or null when it has none. */
  canonicalIdea: string | null
  /** Authored analogies the tutor must not reach for. Empty is a real answer. */
  mustNotUse: string[]
  /** Where each part came from — provenance travels with the object. */
  sources: { canonicalIdea: 'knowledge-graph' | null; mustNotUse: 'educational-brain' | null }
}

const NONE = (conceptId: string): RemediationGrounding => ({
  conceptId,
  status: 'insufficient_authoritative_grounding',
  canonicalIdea: null,
  mustNotUse: [],
  sources: { canonicalIdea: null, mustNotUse: null },
})

/**
 * Authored text is written for an AUTHOR. Its ordinary case is a rubric or a
 * metadata block, which is wrong to put in front of a learner — the same test
 * H3's fallback applies, for the same reason.
 */
function readsAsProse(text: string): boolean {
  const s = text.trim()
  if (s.length < 25 || s.length > 400) return false
  if (/^[[(]/.test(s)) return false           // "[Boundary statement] …"
  if (/^\s*\d+[.)]\s/.test(s)) return false   // a numbered rubric item
  return true
}

/** How much authored anti-analogy text may reach one prompt. */
const MAX_ITEMS = 2
const MAX_ITEM_CHARS = 420

export function buildRemediationGrounding(conceptId: string): RemediationGrounding {
  try {
    if (typeof conceptId !== 'string' || conceptId.trim().length === 0) return NONE('')

    const description = getKGNode(conceptId)?.description?.trim() ?? ''
    const canonicalIdea = readsAsProse(description) ? description : null

    const eb = loadEBConceptContext(conceptId)
    const mustNotUse = (eb.found ? eb.context.antiAnalogies : [])
      .map((a) => a.trim().replace(/\s+/g, ' '))
      .filter((a) => a.length > 10)
      .slice(0, MAX_ITEMS)
      .map((a) => (a.length > MAX_ITEM_CHARS ? `${a.slice(0, MAX_ITEM_CHARS).trimEnd()}…` : a))

    // GROUNDED means there is a CONSTRAINT to state. A canonical idea alone is
    // not grounding — H3 already speaks the KG sentence in its fallback, and
    // calling that "grounded" would report coverage this phase has not earned.
    if (mustNotUse.length === 0) {
      return { ...NONE(conceptId), canonicalIdea, sources: { canonicalIdea: canonicalIdea ? 'knowledge-graph' : null, mustNotUse: null } }
    }

    return {
      conceptId,
      status: 'grounded',
      canonicalIdea,
      mustNotUse,
      sources: {
        canonicalIdea: canonicalIdea ? 'knowledge-graph' : null,
        mustNotUse: 'educational-brain',
      },
    }
  } catch {
    // Grounding must never take a turn down. Absent is the safe answer.
    return NONE(typeof conceptId === 'string' ? conceptId : '')
  }
}

/**
 * The block the model reads. '' when there is nothing authoritative to say.
 *
 * SHAPE, chosen against a measured failure. H4 found the EXPLANATION
 * SEQUENCING LAW's arrow-ordered step names rendered by the model as literal
 * markdown headings ("### 1. Concrete everyday object") in learner-visible
 * text. So this block carries NO headings, NO numbered steps and no label
 * vocabulary a model could mistake for a template to fill in — it is prose
 * instruction in the same register as the H3 repair appendix, which has never
 * been observed leaking.
 *
 * It also never tells the tutor to recite the authored text. The curator's
 * words are a boundary on what may be said, not a script to read out.
 */
export function buildRemediationGroundingBlock(g: RemediationGrounding): string {
  if (!g || g.status !== 'grounded' || g.mustNotUse.length === 0) return ''
  const banned = g.mustNotUse.map((a) => `- ${a}`).join('\n')
  const idea = g.canonicalIdea
    ? `The curriculum states this concept as: ${g.canonicalIdea}\n`
    : ''
  return (
    '\n\nCURRICULUM GROUNDING FOR THIS RE-EXPLANATION (authored by a human '
    + 'curator for this concept; treat it as a boundary, not as a script — do '
    + 'not read it out and do not mention that it exists).\n'
    + idea
    + 'The following comparisons are known to teach a FALSE idea of this '
    + 'concept. Never use them, and never use a close variant of them:\n'
    + banned + '\n'
    + 'If your simpler explanation was about to rest on one of those, choose a '
    + 'different everyday anchor.'
  )
}
