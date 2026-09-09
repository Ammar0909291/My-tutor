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
  ].join('|'),
  'i',
)

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
