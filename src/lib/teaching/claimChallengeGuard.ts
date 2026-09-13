/**
 * FACTUAL CONTENT INTEGRITY — RECOVERING FROM A CHALLENGED CLAIM (P1).
 *
 * ── THE DEFECT (real-student English verification) ─────────────────────────
 * The tutor taught a false etymology ("knight" -> "night" as one word
 * undergoing sound change — not what actually happened). The learner
 * correctly challenged the claim. The tutor did not acknowledge uncertainty
 * or check itself — it generated MORE confident, fabricated reasoning
 * defending the original false claim.
 *
 * ── WHY THIS MODULE DOES NOT TRY TO VERIFY THE CLAIM ────────────────────────
 * Whether "knight" and "night" share an etymology is not decidable from
 * anything this runtime has access to — there is no general knowledge base
 * here, and building one is explicitly out of scope (the same boundary
 * `remediationGrounding.ts` documents: "nothing here can decide whether
 * generated remediation prose is TRUE"). What IS decidable, and what this
 * module answers instead, is a narrower, behavioural question: did the
 * LEARNER just directly dispute something the tutor said? If so, the tutor
 * must not respond by inventing MORE detail in defence of the original
 * claim — it must acknowledge the possibility it was wrong, and defer to
 * whatever authoritative material this session already has (reusing
 * `remediationGrounding.ts`, never re-deriving a second source), rather than
 * rationalising from nothing.
 *
 * ── SCOPE ────────────────────────────────────────────────────────────────
 * A CHALLENGE is a distinct speech act from an ordinary question
 * ("why is that?") or a confusion signal ("I don't understand", owned by
 * recoveryGuard/EXPLAIN_DIFF_RE) — it asserts the tutor's own prior statement
 * was wrong, using the learner's own words as the only evidence available.
 * Deliberately narrow: a false positive costs one extra sentence of caution
 * on a claim that was actually correct (cheap); a false negative lets a
 * confident, fabricated defence stand (the exact measured failure).
 */

const CHALLENGE_RE = new RegExp(
  [
    // "that's not right/true/correct", "that isn't right"
    String.raw`\bthat'?s?\s+(?:not|n'?t)\s+(?:right|true|correct|accurate)\b`,
    // "that's wrong", "you're wrong", "you are wrong"
    String.raw`\b(?:that'?s|you'?re|you\s+are)\s+wrong\b`,
    // "are you sure (about that)?", "are you sure that's right?"
    String.raw`\bare\s+you\s+sure\b`,
    // "I don't think that's right/true", "I don't think so"
    String.raw`\bi\s+don'?t\s+think\s+(?:that'?s\s+)?(?:right|true|correct|so)\b`,
    // "that doesn't sound right/true"
    String.raw`\bthat\s+doesn'?t\s+sound\s+(?:right|true|correct)\b`,
    // "I don't believe that", "I'm not sure that's true"
    String.raw`\bi\s+don'?t\s+believe\s+that\b`,
    // "actually, <correction>" / "no, actually" — the learner offers a
    // counter-claim. Anchored to the START of the message (or right after a
    // leading "no,"/"wait,") so it can't fire on "actually" used mid-sentence
    // as a mere hedge ("it's actually pretty easy").
    String.raw`^(?:no,?\s+)?(?:wait,?\s+)?actually\b`,
    // "I read/heard/learned (that) X, not Y" — the learner cites a
    // conflicting source for the SAME fact.
    String.raw`\bi\s+(?:read|heard|learned|learnt)\s+(?:that\s+)?.{0,60}\bnot\b`,
    // "isn't that wrong?", "wasn't that supposed to be X?"
    String.raw`\bisn'?t\s+that\s+wrong\b`,
    // "that's not what I learned/heard"
    String.raw`\bthat'?s\s+not\s+what\s+i\s+(?:learned|learnt|heard|read)\b`,
    // ── WIDENED (real-student cross-subject audit, chem.bond.resonance) ────
    // The measured production failure used NEITHER of the shapes above. The
    // learner's actual two challenges were:
    //   "u said oxygen has 5 valence electron but i thought oxygen has 6?"
    //   "i thought formal charges must add up to the real charge, thats
    //    what my teacher said before"
    // Neither contains "wrong", "not right", "actually" (anchored), or
    // "read/heard/learned … not …" — so CHALLENGE_RE never fired for either,
    // and the downstream humility instruction was never injected at all.
    // This is the single most natural way a real (especially young or ESL)
    // learner disputes a claim: citing a REMEMBERED counter-fact ("I
    // thought X") or a REMEMBERED AUTHORITY ("my teacher/book/notes said
    // X"), optionally contrasted against what the tutor just said ("but").
    // Two new sub-patterns, kept narrow enough to require an actual
    // cited proposition (not a bare "I don't understand"):
    //   "i thought <at least 3 words>"      — a remembered counter-claim
    //   "my (teacher|book|notes|class|...) (said|told me|says|taught) <..>"
    // A bare "i thought" with nothing following, or an ordinary FORWARD-
    // LOOKING planning statement ("i thought i'd/i would/i could try X" —
    // intent, not a remembered fact), is excluded; a remembered-fact clause
    // needs at least 3 more words to avoid tripping on "i thought about it".
    String.raw`\bi\s+thought\s+(?!i\s*(?:'d|would|could|might|should|can|will)\b)\w+(?:\s+\w+){2,}`,
    String.raw`\bmy\s+(?:teacher|book|textbook|notes|class|professor|teachers?)\s+(?:said|told\s+me|says|taught\s+(?:me|us)|says?)\b`,
    String.raw`\bwe\s+(?:learned|learnt|were\s+taught)\s+(?:in\s+class\s+)?that\b`,
  ].join('|'),
  'i',
)

/**
 * The set of phrasings `buildClaimChallengeBlock` itself suggests the model
 * say ("I may have gotten that wrong…", "let me be more careful…"). Used by
 * the post-generation `vChallenge` check (kernel/verifier/rules.ts) to ask a
 * narrow, answerable question: did the reply show ANY sign of taking the
 * challenge seriously, in the model's own words or close to them — never
 * "was the reply correct", which is not decidable here. Deliberately reuses
 * the directive's own vocabulary rather than inventing a second list, so a
 * model that follows the instruction it was already given always passes.
 */
export const CHALLENGE_ACKNOWLEDGED_RE =
  /\b(?:i\s+may\s+have|i\s+might\s+have|you\s+(?:may|might)\s+be\s+right|you'?re\s+right\s+to\s+(?:question|double[- ]?check|ask)|good\s+catch|fair\s+point|let\s+me\s+(?:be\s+more\s+careful|double[- ]?check|verify|correct)|i\s+(?:was|am)\s+(?:wrong|mistaken)|my\s+mistake|i\s+apologi[sz]e|not\s+(?:fully\s+)?(?:certain|sure)\s+(?:about|that)|needs?\s+(?:to\s+be\s+)?verif|let\s+me\s+re-?check)\b/i

/**
 * True when the learner's message directly disputes a factual claim the
 * tutor just made — as opposed to asking a question, expressing confusion,
 * or making an ordinary statement.
 */
export function isClaimChallenge(message: string): boolean {
  if (typeof message !== 'string') return false
  const text = message.trim()
  if (!text) return false
  return CHALLENGE_RE.test(text)
}

/**
 * The directive injected when a challenge is detected. Grounding (from
 * `remediationGrounding.ts`, already-authored curriculum material for the
 * CURRENT concept) is passed through when available — never re-derived here
 * — so the tutor can correct itself against something real when that
 * happens to cover the exact claim; otherwise it can only fall back to
 * honest uncertainty, which is the correct behaviour anyway.
 */
export function buildClaimChallengeBlock(groundingBlock: string): string {
  return (
    '\n\nTHE STUDENT IS CHALLENGING SOMETHING YOU JUST SAID (mandatory). ' +
    'Do NOT defend your previous claim with new invented detail, and do NOT ' +
    'repeat it more confidently. First: seriously consider that the student ' +
    'may be right and you may have made a mistake — this happens, and saying ' +
    'so plainly is more trustworthy than a confident wrong answer. If you ' +
    'are not genuinely certain the original claim is correct, say so honestly ' +
    '("I may have gotten that wrong — let me be more careful here" or ' +
    'similar), and either correct it or narrow it to what you ARE sure of. ' +
    'Never invent a new supporting detail, a new example, or a new mechanism ' +
    'to prop up a claim you cannot actually verify — that is worse than ' +
    'admitting uncertainty. Only restate the original claim unchanged if you ' +
    'are certain it is correct AND can explain why simply, without adding ' +
    'anything new.' + groundingBlock
  )
}
