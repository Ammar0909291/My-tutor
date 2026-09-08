/**
 * A DELIVERED FIGURE MUST BE INTRODUCED, NOT JUST ATTACHED.
 *
 * ── THE FINDING (real-student session, 2026-09, live production) ────────────
 * Requesting a diagram sometimes produced the figure with the model's reply
 * carrying no reference to it at all — no "look at", no naming of what the
 * picture shows, nothing tying the words to the image beside them. The
 * learner was left to work out on their own what the new picture was for.
 *
 * `visualContract.ts` already tells the model, in the prompt, to describe and
 * use the figure — but a prompt instruction is advisory, and this codebase has
 * measured that exact category of instruction being ignored more than once
 * (see `gateAssessment.ts`, `figureReference.ts`). This is the deterministic
 * backstop, applied the same way: after generation, not instead of the prompt
 * rule.
 *
 * ── WHAT IT DOES, AND WHY IT CANNOT FABRICATE ────────────────────────────────
 * Fires only when THIS turn actually introduces a figure (never on a held,
 * continuity turn — those are the ALREADY INTRODUCED case the contract block
 * already handles, and re-announcing a held figure is the opposite defect).
 * When the model's own text contains no figure-referencing language at all,
 * appends ONE short sentence built from the ADMITTED ASSET's own fields —
 * `conceptTitle`, `representation`, `scope` — the exact same source
 * `buildVisualContractBlock` already uses to tell the model what is on
 * screen, never a new claim invented here. A `scope: 'domain'` asset is a
 * general illustration, not a figure OF the concept (see asset.ts and
 * visualContract.ts's own M3-B/B4 rule) — the sentence respects that
 * distinction rather than repeating the exact over-claim that rule exists to
 * prevent.
 *
 * ── A REPAIR MUST NOT BREAK A TURN ────────────────────────────────────────
 * Pure, total, and additive only: it never removes or rewrites the model's
 * own words, and any surprise falls back to returning the text unchanged.
 */

import type { VisualDecision, EducationalPurpose } from './types'
import { clamp } from './conceptText'

/**
 * Loose on purpose. The two failure directions are not symmetric here: a
 * missed real reference just adds one true, if slightly redundant, sentence
 * — a false claim would not be safe, but this never asserts anything the
 * admitted asset doesn't already carry. So this list errs toward matching,
 * not toward precision, unlike figureReference.ts's stripping detectors
 * (which err the other way, because there a false match deletes real text).
 */
const FIGURE_REFERENCE_RE =
  /\b(diagram|figure|graph|picture|image|chart|number ?line|animation|illustration|visual|simulation|plot|sketch|screen|worked example|look at|looking at|see the|see this|see that|see it|notice|observe|study the|examine the|shown|displayed|highlighted)\b/i

const PURPOSE_CLAUSE: Record<EducationalPurpose, string> = {
  explain: 'Study it while I explain.',
  compare: 'Compare the two cases in it.',
  demonstrate: 'Follow it step by step.',
  explore: "See what you notice before I explain.",
  derive: 'Watch how the result is built.',
  simulate: 'Watch what it does as it moves.',
  review: "Use it to recall what you've already learned.",
}

export interface VisualAcknowledgementResult {
  text: string
  appended: boolean
}

/**
 * Append a short, non-fabricated pointer sentence when a NEWLY-introduced
 * figure got no acknowledgement at all in the model's own reply.
 *
 * @param figureIntroducedThisTurn Only true on the turn that actually put the
 *   figure on screen (mirrors route.ts's own `figureIntroducedThisTurn` —
 *   never fires on a held/continuity turn, which already carries its own
 *   "ALREADY INTRODUCED" contract language and must not be re-announced).
 */
export function ensureVisualAcknowledged(
  text: string,
  decision: VisualDecision | null,
  figureIntroducedThisTurn: boolean,
): VisualAcknowledgementResult {
  try {
    if (!figureIntroducedThisTurn) return { text, appended: false }
    if (!decision || !decision.graphical || !decision.asset) return { text, appended: false }
    if (typeof text !== 'string' || text.trim().length === 0) return { text, appended: false }
    if (FIGURE_REFERENCE_RE.test(text)) return { text, appended: false }

    const asset = decision.asset
    const kind = asset.representation ? asset.representation.replace(/_/g, ' ') : 'figure'
    const what = clamp(asset.conceptTitle, 60)

    const pointer =
      asset.scope === 'domain'
        ? `Take a look at the ${kind} beside this message — it's a general illustration related to the topic.`
        : `Take a look at the ${kind} beside this message — it shows ${what}. ${PURPOSE_CLAUSE[decision.purpose]}`

    return { text: `${text.trim()}\n\n${pointer}`, appended: true }
  } catch {
    return { text, appended: false }
  }
}
