/**
 * THE REMEDIATION OUTPUT CONTRACT (Phase H3).
 *
 * ── WHY THIS EXISTS ─────────────────────────────────────────────────────────
 * A learner who says "sir i not understand this" is detected (H1), classified
 * CONFUSION (H2), given a directive that says re-teach the same idea more
 * simply (H2), and then handed to the model with NOTHING checking what comes
 * back. Traced through the repository:
 *
 *   D-4b ANSWER-STUDENT-FIRST -> ESCALATE_TO_LLM -> executor LLM_OPEN
 *     · `buildBrainExecutionBlock` returns '' unless the executor is
 *       LLM_RENDERER, so the Brain adds no scoping to this turn
 *     · `buildTeachingStrategyBlock` — FOUNDATION_REBUILD's own "use concrete,
 *       everyday examples before introducing formal definitions" and "avoid
 *       introducing extension material" — is suppressed while the Brain owns
 *       decisions (`legacyDecisionBlocksSuppressed()`)
 *     · the K5 output verifier is env-gated; `readVerifierMode` returns 'off'
 *       unless ENABLE_OUTPUT_VERIFIER / ENABLE_EOS_RUNTIME is set, and neither
 *       is set in production
 *
 * So the remediation instruction is a REQUEST. This module is the smallest
 * thing that turns one part of it into a CONSTRAINT.
 *
 * ── WHAT IT MEASURED, AND WHAT IT REFUSES TO ────────────────────────────────
 * Measured live (H2, 2026-08-27): two chemistry remediation turns answered
 * "sir i not understand this" by re-asking the previous turn's question and
 * nothing else. groq returned 58 and 64 characters, so the MODEL produced the
 * echo — nothing downstream stripped an explanation. Both turns carried
 * `legalityBlocked: QL1_NO_ANSWERABLE_SOURCE` and `move: 'show'`: the kernel
 * had ALREADY decided a question was illegal ("nothing has been taught yet
 * this session … the learner has no source to answer from"), the ladder obeyed
 * it, `foldLegalityMetrics` even counts the event as `askViolations` — and
 * nothing acted on any of it.
 *
 * This module decides ONE structural question: **did the turn explain anything
 * at all, or is it only a question / only a repeat?** It never decides whether
 * an explanation is TRUE. A plausible, plain, on-concept explanation resting on
 * a false analogy passes this floor, and nothing in this repository can catch
 * it — that boundary is stated in the tests rather than papered over.
 *
 * ── HOW IT IS BUILT ─────────────────────────────────────────────────────────
 * Nothing here re-derives what the repository already knows. "Which part of a
 * turn is the question" is `dropAnswerableContent` + `dropOrphanedLeadIn`, the
 * pair `withholdUngradedGateQuestion` already uses to cut a turn back to its
 * teaching — including their existing, deliberate exclusions (a confirmation
 * tail like "does that make sense?" is not an answerable question and must
 * survive). They are reused, not copied.
 *
 * Pure: no I/O, no model calls, no state. The route owns the repair.
 */
import { cutBackToTeaching } from './gateAssessment'
import { turnTaughtSomething } from './teachingContent'

export type RemediationOutputViolation =
  | 'question-only'
  | 'repeats-previous-turn'
  /**
   * The turn said nothing about the subject — only about the learner. Added
   * after a production turn that passed every guard in this repository and
   * taught a confused child nothing: "I understand you're still unsure about
   * how friction works. Do I have that right?" See `teachingContent.ts`.
   */
  | 'no-teaching-content'
  /**
   * A HELD turn taught past the card. The learner has been given a
   * human-approved account and has shown nothing yet; introducing notation the
   * approved account does not contain walks straight past the owner's own
   * decision about what this concept's remediation should say. Measured live:
   * the hold block fired (`mode: 'hold'`) and the model answered "ok sir" with
   * F_f = mu N, mu_k N and the static/kinetic split anyway.
   */
  | 'went-beyond-card'

export interface RemediationOutputCheck {
  violation: RemediationOutputViolation | null
  /** Machine-readable, for the repair appendix and the log. Never shown to a
   *  learner (I-22: learner-facing text never mentions the apparatus). */
  reason: string | null
}

const OK: RemediationOutputCheck = { violation: null, reason: null }

/** Normalised for comparison only — never for display. */
const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ')

/** Outside remediation/recovery/held turns, only a SUBSTANTIAL verbatim
 *  repeat is a defect — see the note at check 0. The measured production
 *  case was ~700 characters; a short acknowledgement must stay legal. */
const UNSCOPED_REPEAT_FLOOR_CHARS = 200

/**
 * The two conversation classes whose whole purpose is to re-teach. Read from
 * `classifyConversation`'s own vocabulary rather than re-detected from the
 * learner's text, so this cannot drift from the decision the prompt was built
 * around.
 */
export function isRemediationTurn(conversationDecisionType: string | null | undefined): boolean {
  return conversationDecisionType === 'CONFUSION'
    || conversationDecisionType === 'REPHRASE_REQUEST'
}

export interface RemediationOutputInput {
  /** `isRemediationTurn(conversationDecision.type)`. */
  remediationTurn: boolean
  /**
   * `conversationDecision.type === 'RECOVERY'` — the learner voiced a
   * failure-state utterance (recoveryGuard.ts) and the turn is governed by
   * an authored SCRIPT, not the CONFUSION/REPHRASE_REQUEST directive. Scoped
   * to ONLY the no-teaching-content check below: every SCRIPTS entry
   * (recoveryGuard.ts) requires some follow-through — a new representation,
   * a boundary question, cued retrieval, a split sub-step — never
   * acknowledgment alone, so "taught nothing" is exactly as wrong here as on
   * a CONFUSION turn. `question-only` and `went-beyond-card` stay
   * remediation-only on purpose: several scripts' entire legitimate content
   * IS a question (dont_know's shrink-to-two-choice, confused's boundary
   * question), so treating a bare question as a violation would break them.
   */
  recoveryTurn?: boolean
  /** The cleaned, learner-visible draft. */
  text: string
  /** The previous ASSISTANT message, for the repeat check. */
  previousAssistantText?: string | null
  /**
   * A structured MCQ was attached to this turn. Then the question IS the
   * turn's content and withholding it would delete what the learner is meant
   * to answer — the same exclusion `withholdUngradedGateQuestion` makes.
   */
  hasStructuredMcq?: boolean
  /**
   * The approved card's teaching text, present ONLY while a promoted card is
   * holding this concept (see `remediationWindowOpen`). When set, notation
   * absent from that text is a violation — the enforcement moved to the output
   * because the prompt-side hold demonstrably lost against the rest of the
   * prompt.
   */
  heldCardText?: string | null
}

/**
 * NOTATION IS THE PART THAT IS DECIDABLE.
 *
 * Not "did it teach something new" in general — that is a judgement no regex
 * makes. But a formula, a subscripted symbol or a LaTeX delimiter is either in
 * the approved account or it is not, and the owner's approval of this card
 * named "no formula" explicitly. Narrow on purpose: ordinary teaching prose
 * contains none of these, so this cannot fire on plain words.
 */
/**
 * GREEK WAS A HOLE THE SIZE OF THE ALPHABET.
 *
 * The class used to be `[\u03bc\u00b5]` \u2014 mu, and only mu, because mu is what
 * the friction card's own banned formula happened to contain. Every other Greek
 * letter walked straight through, and a formula written in real symbols rather
 * than LaTeX is not caught by the delimiter patterns either.
 *
 * MEASURED (production, phys.rel.time-dilation, 2026-08-27, on a HELD turn \u2014
 * the learner had said "I don't understand", received the card, said "ok sir",
 * and got this back after a repair had already run once):
 *
 *     \u0394t = \u03b3 \u0394\u03c4 with \u03b3 = 1 / \u221a(1 \u2013 v\u00b2/c\u00b2)
 *
 * Not one character of that matched. The card for that concept explains muons
 * reaching sea level in plain words and contains no symbol at all, which is
 * exactly the bound this check exists to hold.
 *
 * Now the whole Greek block and the radical sign. Both are unambiguous
 * mathematical notation: ordinary teaching prose spells out "gamma rays" and
 * "the square root of two". Superscripts and subscripts are deliberately NOT
 * added \u2014 "5 m\u00b2" and "H\u2082O" are ordinary writing, and a rule that fires on them
 * would be a different, worse rule.
 */
const NOTATION = /\\\(|\\\[|\$\$|\\mu|\\frac|\\times|[\u0370-\u03ff\u1f00-\u1fff\u00b5]|\u221a|[A-Za-z]_\{?[A-Za-z0-9]\}?\s*=|[A-Za-z]\s*=\s*[A-Za-z\u03bc\u00b5]|\u2264|\u2265/

export function notationBeyondCard(text: string, cardText: string): boolean {
  try {
    if (typeof text !== 'string' || typeof cardText !== 'string') return false
    if (!NOTATION.test(text)) return false
    // The card itself may legitimately carry notation; only what it does NOT
    // carry is out of bounds.
    return !NOTATION.test(cardText)
  } catch {
    return false
  }
}

export function checkRemediationOutput(input: RemediationOutputInput): RemediationOutputCheck {
  try {
    // A HELD turn is not a remediation turn, and must still be checked: the
    // card is governing it, and that is exactly where the model walked past the
    // approved account in production. Every other turn in the product returns
    // here untouched, as before.
    const heldText = typeof input.heldCardText === 'string' ? input.heldCardText : ''
    // ── 0. REPEATING THE PREVIOUS TURN IS NEVER ACCEPTABLE ─────────────────
    //
    // This check used to sit BELOW the early return on the next line, so it ran
    // only on remediation, recovery and card-held turns. Every ordinary turn
    // skipped it.
    //
    // MEASURED (production, phys.mech.friction, 2026-08-31, studied as a
    // learner on a real account). The learner asked whether the coefficient of
    // friction can exceed 1. Three consecutive turns returned the SAME
    // ~700-character paragraph, word for word — including the turn answering
    // "you didn't answer my question about mu being 1 — i asked that twice
    // now." None was a remediation or recovery turn, because the learner was
    // asking a factual question rather than voicing confusion, so this floor
    // never ran. Session A had already measured verbatim repetition in 65% of
    // sessions, reduced to 31%; this is the hole the remaining share fell
    // through.
    //
    // Repeating the previous turn verbatim cannot be correct on ANY turn type.
    // The other two checks below stay scoped as they were: "the whole turn was
    // a question" and "it went beyond the approved card" are both legitimate on
    // an ordinary turn, and only mean something in their own contexts.
    //
    // THE LENGTH FLOOR IS WHAT MAKES THIS SAFE TO RUN EVERYWHERE. The test is
    // strict containment — the entire new reply must already appear inside the
    // previous one — which on a remediation turn is conclusive. On an ordinary
    // turn short replies would be false positives: "Correct!" is legitimately
    // contained in a previous turn that also said "Correct!", and confirming
    // two right answers in a row is good teaching, not repetition. So outside
    // the three scoped turn types the repeat must be SUBSTANTIAL — a repeated
    // explanation, not a repeated acknowledgement. The production case was
    // ~700 characters; the floor is 200.
    {
      const prev0 = typeof input.previousAssistantText === 'string' ? input.previousAssistantText : ''
      const text0 = typeof input.text === 'string' ? input.text : ''
      const scoped = input.remediationTurn || input.recoveryTurn || heldText.length > 0
      const here0 = norm(text0)
      if (
        prev0.trim().length > 0 && here0.length > 0
        && (scoped || here0.length >= UNSCOPED_REPEAT_FLOOR_CHARS)
        && norm(prev0).includes(here0)
      ) {
        return {
          violation: 'repeats-previous-turn',
          reason: 'the reply is contained word-for-word in the previous turn — the one the '
            + 'learner has just said did not land',
        }
      }
    }

    if (!input.remediationTurn && !input.recoveryTurn && heldText.length === 0) return OK
    const text = typeof input.text === 'string' ? input.text : ''
    // An empty draft is a different failure with a different owner (the
    // provider path). Claiming it here would only mislabel it.
    if (text.trim().length === 0) return OK

    // 1. DID IT EXPLAIN ANYTHING? Cut the turn back to its teaching using the
    //    repository's existing splitter. Nothing left ⇒ the entire turn was a
    //    question, however new or well-phrased that question is.
    // The MCQ exemption used to sit above this whole function and returned OK
    // for every check at once. It is scoped to the two checks that can be
    // confused by a structured question, and NOT to the notation bound below —
    // see the note there. Behaviour for these two is byte-for-byte unchanged.
    if (input.remediationTurn && !input.hasStructuredMcq && cutBackToTeaching(text).length === 0) {
      return {
        violation: 'question-only',
        reason: 'the entire turn was a question; the learner said they do not understand '
          + 'and was asked something instead of being taught',
      }
    }

    // 1b. DID IT SAY ANYTHING ABOUT THE SUBJECT? Check 1 asks whether text
    //     survives the question-cut, and a sentence about the LEARNER survives
    //     it — which is exactly how a reflection-only turn scored clean in
    //     production while teaching nothing. Warmth is not the target here: a
    //     reflection followed by teaching still passes, because it has a
    //     substantive sentence. A reflection that IS the whole turn does not.
    // SCOPED TO REMEDIATION *AND* HELD TURNS, and the difference matters.
    // `question-only` stays remediation-only, because answering "ok sir" with
    // the card's own micro-check is the DESIRED held behaviour. Teaching
    // NOTHING is never desired, on either kind of turn — measured on the
    // physics sweep the hour this was written: two of five "ok sir" turns came
    // back as "So you're saying <their words>. Is that right?", 116 characters,
    // no teaching, and shipped, because this check was scoped out of held turns
    // when the floor was first extended to them.
    if (
      (input.remediationTurn || input.recoveryTurn === true || heldText.length > 0)
      && !input.hasStructuredMcq
      && !turnTaughtSomething(text)
    ) {
      return {
        violation: 'no-teaching-content',
        reason: 'the turn spoke only about the learner, not about the concept — the learner '
          + 'said they do not understand and was reflected back at instead of taught',
      }
    }

    // 1c. WHILE A CARD IS HOLDING, DID IT TEACH PAST THE CARD? Only checked
    //     when `heldCardText` is supplied, which happens only for a promoted,
    //     currently-holding card — so this is silent for every other turn in
    //     the product.
    //
    // AN MCQ DOES NOT EXEMPT THIS ONE, and that is the whole of the fix here.
    // MEASURED (production, phys.opt.refraction, 2026-08-27, the first live
    // session after physics was promoted): the learner said "sir i still not
    // understand can you explain again" for the second time, the card was
    // holding, and the turn came back carrying an attached MCQ and this:
    //
    //     \(n_1 \sin\theta_1 = n_2 \sin\theta_2\)
    //
    // raw LaTeX and refractive indices, to a learner who had just said twice
    // that they did not understand. It shipped because `hasStructuredMcq`
    // returned OK for the ENTIRE function before any check ran, so attaching a
    // question was a complete escape hatch from the card's bound.
    //
    // The other two checks keep the exemption because a structured question can
    // genuinely confuse them — the MCQ carries content this function cannot
    // see, so "the turn was only a question" and "the turn taught nothing" can
    // both be false alarms. Notation cannot: a LaTeX delimiter is in the
    // approved account or it is not, and an attached MCQ says nothing either
    // way about the prose beside it.
    if (heldText.length > 0 && notationBeyondCard(text, heldText)) {
      return {
        violation: 'went-beyond-card',
        reason: 'the approved account for this concept contains no formula or notation, and '
          + 'the learner has not yet shown they hold the plain idea',
      }
    }

    // 2. DID IT SAY ANYTHING NEW? Strict containment, so this can only fire on
    //    genuine repetition — a reply whose every word already appeared in the
    //    turn the learner just told us did not land.
    const prev = typeof input.previousAssistantText === 'string' ? input.previousAssistantText : ''
    if (prev.trim().length > 0) {
      const here = norm(text)
      if (here.length > 0 && norm(prev).includes(here)) {
        return {
          violation: 'repeats-previous-turn',
          reason: 'the reply is contained word-for-word in the previous turn — the one the '
            + 'learner has just said did not land',
        }
      }
    }

    return OK
  } catch {
    // A floor must never take a turn down. Unchanged is the safe outcome.
    return OK
  }
}

/**
 * The remediation contract, restated as an ENFORCED instruction.
 *
 * Shape and stance copied from the V-AFFIRM safety floor's own repair appendix
 * in route.ts: name the rejection, say what to do instead, and hand the model
 * the CURRICULUM'S OWN material rather than telling it to try harder. That
 * repair's recorded lesson was that a prohibition alone fails — "telling the
 * model 'don't agree' leaves it with nothing to say instead" — so `authored`
 * carries retrieval, never invention, and is simply absent when the curriculum
 * has nothing to offer.
 *
 * The directions below are not new pedagogy. They are FOUNDATION_REBUILD's own
 * authored instructions (`STRATEGY_INSTRUCTIONS.FOUNDATION_REBUILD`), which the
 * engine already selected for this turn and whose prompt block is suppressed.
 */
export function buildRemediationRepairAppendix(
  violation: RemediationOutputViolation,
  authored: string,
): string {
  const named = violation === 'question-only'
    ? 'Your reply was only a question. The learner told you they do not understand; '
      + 'asking them something else does not teach them anything.'
    : violation === 'went-beyond-card'
    ? 'You introduced a formula or symbol that the approved account of this concept '
      + 'does not contain, to a learner who has not yet shown they hold the plain '
      + 'idea. Teach the idea in words. No formula, no symbols, no subscripts.'
    : violation === 'no-teaching-content'
    ? 'Your reply talked about the learner instead of teaching them. Reflecting their '
      + 'confusion back at them ("I understand you are still unsure", "have I got that '
      + 'right?") is not an explanation — they already know they are stuck. That is why '
      + 'they wrote to you.'
    : 'Your reply repeated what you had already said. The learner has just told you '
      + 'that exact wording did not land, so saying it again cannot help.'
  // WHEN THE LAST EXPLANATION DID NOT LAND, CHANGE THE PICTURE — NOT THE WORDS.
  //
  // Measured live (phys.mech.collisions-inelastic, real account, 2026-08-28):
  // the learner said "I still do not understand" a second time and received the
  // same trolleys analogy again, because the repair below asked for "the SAME
  // idea" and the model re-served the one anchor it had. The brief is explicit —
  // repeated failure must CHANGE the teaching strategy, not merely reword it. So
  // on a repeat specifically, the regeneration is told to reach for a DIFFERENT
  // everyday anchor than the one it just used. The idea stays the same; the
  // representation must not.
  const changeRepresentation = violation === 'repeats-previous-turn'
    ? ' Use a COMPLETELY DIFFERENT everyday example from the one you just gave — a '
      + 'different object and a different situation — and do not reuse the same '
      + 'analogy or the same sentences. A new picture is the whole point.'
    : ''
  return (
    '\n\nOUTPUT REJECTED (server-side check). ' + named
    + ' Re-teach the SAME idea, more simply: start from one concrete everyday thing the '
    + 'learner already knows, use plain words, and take one small step.'
    + changeRepresentation
    + ' Explain first — '
    + 'do not open with a question, and do not reply with only a question. '
    + 'Do not introduce a new formula, derivation or piece of notation, and do not move '
    + 'the lesson forward: stay on this concept until it lands.'
    + authored
    + '\nAnswer the learner now.'
  )
}

/**
 * The last resort, spoken in the curriculum's own words.
 *
 * Same reasoning as the affirmation floor's own final fallback: a safe template
 * that says nothing is only half a fix, because the learner asked a real
 * question and received filler. The Knowledge Graph description is the one
 * place the curriculum states a concept in a single learner-facing sentence,
 * for every concept — so the fallback is correct by construction (it asserts
 * only what the curriculum asserts) and is genuinely an explanation.
 *
 * Returns null when there is no usable sentence, handing the decision back to
 * the caller rather than fabricating a definition. `readsAsProse` is the same
 * shape test the affirmation floor applies for the same reason: authored text
 * is written for an AUTHOR, and its ordinary case is a mastery rubric or a
 * metadata block, which is wrong to SAY.
 */
/**
 * Would serving `candidate` repeat what the learner already just received?
 *
 * ── WHY THIS EXISTS ──────────────────────────────────────────────────────
 * The fallback that follows a rejected repair is deterministic — always
 * exactly the held card's own words, or failing that the curriculum sentence
 * — and has NO memory of what it already served. When the model fails the
 * output check on two consecutive turns, the SAME fallback fires both times,
 * producing byte-for-byte identical text back to back.
 *
 * MEASURED (production, phys.qm.uncertainty-principle, 2026-08-27, two
 * consecutive Vercel log entries for one session):
 *
 *     T3: [remediation-floor] repaired { violation: 'went-beyond-card',
 *         accepted: false, usedHeldCard: true }
 *     T4: [remediation-floor] repaired { violation: 'went-beyond-card',
 *         accepted: false, usedHeldCard: true }
 *
 * Both turns served the identical "long, steady musical note" paragraph, in
 * response to two DIFFERENT things the learner said. Reproduced again the
 * same day on phys.qm.selection-rules. Each individual serve is correct on
 * its own terms — notation-free, on-topic, drawn from the approved account —
 * but two in a row reads to a learner as the tutor being stuck.
 *
 * ── WHAT THIS DOES NOT DO ────────────────────────────────────────────────
 * It does not rewrite anything and does not judge whether the candidate is
 * good. It answers one narrow question — "is this exactly (or almost
 * exactly) what was just said" — so the caller can reach for a DIFFERENT
 * source instead of repeating. Reuses the same normalisation and the same
 * containment test `checkRemediationOutput`'s own `repeats-previous-turn`
 * rule already applies, so "repeat" means the same thing in both places.
 */
export function wouldRepeatPreviousTurn(
  candidate: string | null | undefined,
  previousAssistantText: string | null | undefined,
): boolean {
  try {
    const c = norm(candidate ?? '')
    const prev = norm(previousAssistantText ?? '')
    if (c.length === 0 || prev.length === 0) return false
    return prev.includes(c) || c.includes(prev)
  } catch {
    return false
  }
}

export function buildRemediationFallbackText(conceptSentence: string | null | undefined): string | null {
  const s = (conceptSentence ?? '').trim()
  if (s.length < 25 || s.length > 400) return null
  if (/^[[(]/.test(s)) return null            // "[Boundary statement] …"
  if (/^\s*\d+[.)]\s/.test(s)) return null    // a numbered rubric item
  return (
    'Let me put it in the simplest words I have.\n\n'
    + s + '\n\n'
    + 'Tell me which part of that is the fuzzy one, and I will go slower there.'
  )
}

/**
 * THE MOST RECENT ASSISTANT TURN — the input every repeat rule above depends on.
 *
 * ── THE DEFECT THIS CLOSES (measured, production, 2026-09-05) ───────────────
 * `route.ts` loads its window as `orderBy: { createdAt: 'desc' }` — NEWEST
 * FIRST — and every one of its fourteen other readers takes `.find(...)` or
 * `[0]`, which on that ordering is the most recent message. The one reader that
 * feeds the repeat rules took `.slice(-1)[0]` instead: the LAST element of a
 * newest-first array, i.e. the OLDEST assistant message in a 30-message window.
 *
 * So `previousAssistantText` was not the previous turn. Both consumers of it
 * were therefore comparing against the wrong message, and neither could fire:
 *
 *   · `checkRemediationOutput`'s check 0 (`repeats-previous-turn`) — the
 *     unscoped floor written FOR the three-consecutive-repeat incident on
 *     phys.mech.friction — never once reported that violation in production.
 *   · `wouldRepeatPreviousTurn`'s swap to the other source never engaged:
 *     measured on phys.stat.phase-transitions, four consecutive rejected
 *     repairs all logged `usedHeldCard: true, usedCurriculumSentence: false`
 *     while the learner received the identical paragraph four times, including
 *     on the turn they said "sir you say same thing again about magnet".
 *
 * Both rules were correct. Both were fed a value that could not trigger them —
 * the same shape as AMP-B: the line does the right thing with the input it is
 * given, and the input was wrong.
 *
 * ── WHY IT READS `createdAt` RATHER THAN AN INDEX ───────────────────────────
 * Taking `[0]` would be correct today and silently wrong the day that query's
 * `orderBy` changes, which is exactly how this defect was born. Picking the
 * maximum `createdAt` is correct under ANY ordering, so the caller cannot
 * reintroduce it. Falls back to array order only when no timestamp is present.
 *
 * Pure. Never throws — a repeat check that cannot read its input must degrade
 * to "no previous turn" (no violation), never take the turn down.
 */
export function mostRecentAssistantText(
  messages: ReadonlyArray<{ role: unknown; content?: unknown; createdAt?: unknown }> | null | undefined,
  assistantRole: unknown = 'ASSISTANT',
): string | null {
  try {
    if (!Array.isArray(messages) || messages.length === 0) return null
    let best: { content: string; at: number } | null = null
    for (let i = 0; i < messages.length; i++) {
      const m = messages[i]
      if (!m || m.role !== assistantRole) continue
      if (typeof m.content !== 'string' || m.content.length === 0) continue
      const raw = m.createdAt
      const at =
        raw instanceof Date ? raw.getTime()
          : typeof raw === 'string' || typeof raw === 'number' ? new Date(raw).getTime()
            : Number.NaN
      // No usable timestamp anywhere: fall back to "first match wins", which is
      // the newest under this route's own newest-first ordering.
      if (!Number.isFinite(at)) {
        if (best === null) best = { content: m.content, at: Number.NEGATIVE_INFINITY }
        continue
      }
      if (best === null || at > best.at) best = { content: m.content, at }
    }
    return best?.content ?? null
  } catch {
    return null
  }
}

/** Why the curriculum-sentence alternative could not be offered this turn. */
export type RemediationAltUnavailable =
  | 'unresolved-concept'      // no concept id resolved for this turn
  | 'no-kg-description'       // concept resolved; the KG carries no description
  | 'sentence-rejected'       // a description exists; buildRemediationFallbackText refused it
  | 'alt-also-repeats'        // the alternative was itself just said

export interface RemediationFallbackChoice {
  /** The text to serve, or null when there is nothing trusted to say. */
  text: string | null
  source: 'held-card' | 'curriculum-sentence' | 'none'
  /**
   * Set ONLY when the held card would repeat the previous turn and the
   * alternative could not replace it — i.e. the learner is about to receive
   * the same words twice and this run knows exactly why it could not avoid it.
   * Null whenever no repeat was in prospect, or the swap succeeded.
   */
  repeatUnavoidableReason: RemediationAltUnavailable | null
}

/**
 * WHICH TRUSTED SOURCE TO SERVE WHEN THE REPAIR HAS ALREADY FAILED.
 *
 * Behaviour is byte-for-byte the selection `route.ts` already performed — held
 * card first, swap to the curriculum sentence when the card would repeat the
 * previous turn — extracted so it can be driven by tests directly instead of
 * through a mirror, and so the "could not avoid the repeat" case reports WHY
 * instead of passing silently.
 *
 * It invents nothing. Both candidates are existing trusted material: the
 * owner-approved card, and the curriculum's own sentence. When neither is
 * fresh, the repeat still ships — repeating a correct, notation-free
 * explanation remains better than emitting the rejected draft's notation — but
 * it ships NAMED, which is the difference between a known cost and a silent one.
 */
export function selectRemediationFallback(input: {
  heldCardText: string | null | undefined
  conceptSentence: string | null | undefined
  previousAssistantText: string | null | undefined
  /** Present only when the KG lookup itself could not run or found nothing. */
  conceptResolved?: boolean
}): RemediationFallbackChoice {
  // `?? `, not a truthiness test: the inline selection this replaces used
  // `heldCardText ?? buildRemediationFallbackText(…)`, so ONLY null/undefined
  // fall through to the sentence. An empty string cannot occur here in practice
  // (`remediationHoldCardText` is either null or a card's own plainExplanation)
  // but matching the old operator exactly keeps the extraction provably
  // behaviour-preserving instead of quietly changing an unrelated edge case.
  const held = input.heldCardText ?? null
  const sentenceText = buildRemediationFallbackText(input.conceptSentence)
  const prev = input.previousAssistantText

  // Why the alternative is unavailable, decided once and reused below.
  const altReason: RemediationAltUnavailable | null = sentenceText
    ? null
    : input.conceptResolved === false ? 'unresolved-concept'
      : (input.conceptSentence ?? '').trim().length === 0 ? 'no-kg-description'
        : 'sentence-rejected'

  const first = held ?? sentenceText
  if (!first) return { text: null, source: 'none', repeatUnavoidableReason: altReason }

  if (!wouldRepeatPreviousTurn(first, prev)) {
    return {
      text: first,
      source: held ? 'held-card' : 'curriculum-sentence',
      repeatUnavoidableReason: null,
    }
  }

  // The first choice would repeat. Reach for the OTHER trusted source.
  const alt = held ? sentenceText : null
  if (alt && !wouldRepeatPreviousTurn(alt, prev)) {
    return { text: alt, source: 'curriculum-sentence', repeatUnavoidableReason: null }
  }

  return {
    text: first,
    source: held ? 'held-card' : 'curriculum-sentence',
    repeatUnavoidableReason: alt ? 'alt-also-repeats' : altReason,
  }
}
