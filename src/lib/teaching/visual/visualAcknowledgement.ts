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
 *
 * ── CORRECTION (post-8adaffe validation, 2026-09): THE FIRST DETECTOR WAS
 *    TOO LOOSE ─────────────────────────────────────────────────────────────
 * The original `FIGURE_REFERENCE_RE` treated a bare occurrence of any of a
 * long list of loosely visual-adjacent VERBS ("notice", "observe", "study
 * the", "shown", …) as proof the figure had already been referenced.
 * Measured live: a Linguistics opening turn asked "what do you notice when
 * someone talks — maybe the way their voice changes?" — genuine teaching
 * about SPEECH, using the word "notice" in a sentence that has nothing to
 * do with the attached figure at all. The detector matched on that word
 * alone, so the backstop believed the figure was already explained and
 * never fired; the learner had a real figure on screen with zero
 * explanation of what it was.
 *
 * The two failure directions here are NOT symmetric, and the fix leans on
 * that: a MISSED real reference (false negative) just adds one true, if
 * slightly redundant, sentence on top of an already-good explanation — safe
 * by this file's own design. A FALSE "already referenced" verdict (false
 * positive) is the exact defect above — it leaves a real figure completely
 * unexplained. So the detector is tightened toward requiring genuine
 * evidence of a POINTED reference, mirroring the SAME two-tier discipline
 * `figureReference.ts` already uses for the opposite direction (stripping a
 * false claim): a STRONG FIGURE NOUN (these essentially never appear in
 * prose that isn't about a real rendered figure), an explicit VISIBILITY
 * DEIXIS phrase ("here you see…", "as you can see…"), or a POINTING VERB
 * that co-occurs with an ON-SCREEN LOCATOR — never a bare pointing verb by
 * itself, which is precisely what let "notice" alone through before.
 */

import type { VisualDecision, EducationalPurpose } from './types'
import { clamp } from './conceptText'

/** Nouns that name a rendered artefact — essentially never used outside a
 *  real reference to one. Mirrors figureReference.ts's STRONG_FIGURE_NOUN. */
const STRONG_FIGURE_NOUN =
  /\b(diagram|figure|graph|picture|image|chart|number ?line|animation|illustration|visual|simulation|plot|sketch|screen)\b/i

/** Words that place a thing ON SCREEN rather than merely in the prose. */
const ON_SCREEN_LOCATOR =
  /\b(on (?:your|the) screen|beside this message|shown (?:above|below|here)?|above|below|on screen|displayed|highlighted|pictured)\b/i

/** Verbs that direct the learner's eyes somewhere. A bare occurrence of one
 *  of these — "notice", "observe", "study", "see" — is NOT enough on its
 *  own; ordinary teaching prose uses every one of them about things that
 *  are not a rendered figure ("what do you notice about the verb tense").
 *  Required to co-occur with `ON_SCREEN_LOCATOR` before it counts. */
const POINTING_VERB = /\b(look at|looking at|see|notice|observe|study|examine|watch)\b/i

/** "Here you see…", "as you can see…" — a visibility claim that names no
 *  figure noun of its own but is still a genuine pointed reference. */
const VISIBILITY_DEIXIS =
  /\b(here\s+(?:you|we)\s+(?:can\s+|will\s+|'ll\s+)?see\b|as\s+(?:you|we)\s+can\s+see\b|you\s+can\s+see\s+(?:here|above|below)\b)/i

function referencesFigure(text: string): boolean {
  if (STRONG_FIGURE_NOUN.test(text)) return true
  if (VISIBILITY_DEIXIS.test(text)) return true
  if (POINTING_VERB.test(text) && ON_SCREEN_LOCATOR.test(text)) return true
  return false
}

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
    if (referencesFigure(text)) return { text, appended: false }

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
