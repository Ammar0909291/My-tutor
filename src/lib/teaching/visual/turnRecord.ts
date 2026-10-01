/**
 * ONE RECORD OF A VISUAL TURN — what was decided, from where, why, and what
 * the learner's response actually carries.
 *
 * WHY. A visual turn could not be reconstructed from logs without rebuilding
 * state by hand: the decision was logged before the model ran (`[visual-v2]`),
 * the served state was never logged at all, and the per-turn event recorded
 * `visualServed: decision.graphical` — the DECISION, not the response. Those
 * differ on every held-figure turn (on screen, deliberately not re-attached)
 * and anywhere a later step empties the figure channels.
 *
 * Pure. Built once, at the final response, from the decision and the three
 * figure fields the response sends. `served` is read from those fields and
 * nothing else — never from a registry category, never from the decision.
 */
import type { VisualDecision } from './types'
import { isRetiredVisualBinding } from './retired'

export type VisualTier =
  | 'none'
  | 'tier0-generator'          // deterministic scene generator (concept-authored or kind default)
  | 'tier1-curated'            // a card a human bound to this concept
  | 'tier1-domain'             // a domain-prefix card (general illustration)
  | 'tier2-approved'           // a human-promoted stored figure
  | 'tier3-generated'          // generated this turn or from the figure cache, critic-passed
  | 'tier3-generated-runtime'  // generated for a topic outside the curriculum

export interface VisualTurnRecord {
  concept: string | null
  requested: boolean
  decided: boolean
  tier: VisualTier
  assetId: string | null
  representation: string | null
  scope: string | null
  renderer: string | null
  /** Why there is no figure (`no-figure:…`), or null when one was decided. */
  reason: string | null
  /** A provider call was spent generating this turn. */
  generationSpent: boolean
  /** A Tier-3 figure served from the figure cache (no provider call). */
  cacheHit: boolean
  /**
   * The concept's retirement state this turn. `suppressed`: it is on the
   * register and no figure was decided — kept even when a later tier's reason
   * (e.g. a critic reject) is what `reason` names. `replacement`: on the
   * register, and a figure with content the retirement never saw was decided.
   */
  retirement: 'none' | 'suppressed' | 'replacement'
  /** The response this learner receives carries a figure. */
  served: boolean
  /** A figure is on the learner's screen: served now, or held from earlier. */
  onScreen: boolean
  heldTurns: number
}

export function tierOf(decision: VisualDecision | null | undefined): VisualTier {
  const asset = decision?.graphical ? decision.asset : null
  if (!asset) return 'none'
  switch (asset.provenance) {
    case 'generator':
    case 'generator-default':
      return 'tier0-generator'
    case 'curated':
      return 'tier1-curated'
    case 'domain-default':
      return 'tier1-domain'
    case 'engine-runtime-topic':
      return 'tier3-generated-runtime'
    case 'engine':
      return asset.assetId.startsWith('approved:') ? 'tier2-approved' : 'tier3-generated'
    default:
      return 'none'
  }
}

export function describeVisualTurn(
  decision: VisualDecision | null | undefined,
  response: { visual?: unknown; visualSpec?: unknown; sceneSpec?: unknown },
  learnerRequestedVisual: boolean,
): VisualTurnRecord {
  const served = Boolean(response.visual) || Boolean(response.visualSpec) || Boolean(response.sceneSpec)
  const heldTurns = decision?.graphical ? (decision.session?.turns ?? 0) : 0
  const asset = decision?.graphical ? decision.asset : null
  return {
    concept: decision?.conceptId ?? null,
    requested: learnerRequestedVisual,
    decided: decision?.graphical === true,
    tier: tierOf(decision),
    assetId: asset?.assetId ?? null,
    representation: decision?.graphical ? (decision.representation ?? null) : null,
    scope: asset?.scope ?? null,
    renderer: decision?.graphical ? (decision.payload?.renderer ?? null) : null,
    reason: decision && !decision.graphical ? decision.provenance : null,
    generationSpent: decision?.generationSpent === true,
    cacheHit: tierOf(decision) === 'tier3-generated' && (asset?.assetId.endsWith(':cached') ?? false),
    retirement: !isRetiredVisualBinding(decision?.conceptId) ? 'none'
      : decision?.graphical ? 'replacement' : 'suppressed',
    served,
    onScreen: served || heldTurns > 0,
    heldTurns,
  }
}
