/**
 * THE SAME COMFORT AND THE SAME KIND OF STORY, OVER AND OVER.
 *
 * CHEM-041 (2026-10-05, chemistry real-learner run): "test8, this is genuinely
 * tricky, so let's slow right down and look at it from a fresh angle." as the
 * reply to "ok"; the same opener for "give me example with numbers" and
 * "maybe yes?"; "I hear you — let's break it down…" on four turns of one
 * lesson (#40 t5, t8, t10, t11). The acknowledgement context turns to
 * "confusion" after two misses whatever the learner says next, and the model
 * reuses the example opener it is given.
 * CHEM-039: four near-identical crowd analogies in #40 t8–t11, five metaphors
 * for one ionisation-energy point in #117, seven in #152.
 *
 * Two caps:
 *  - an empathy opener is dropped when the learner did not voice a struggle
 *    this turn, or when one of the last four tutor replies already opened with
 *    one;
 *  - an analogy is allowed when fewer than two of the last four tutor replies
 *    used one; past that, the caller regenerates once without one.
 */

const EMPATHY_OPENER_RE = /\b(?:genuinely\s+tricky|i\s+hear\s+you|(?:it'?s|this\s+is)\s+(?:completely|totally|perfectly)\s+(?:normal|okay|ok|fine)|(?:it|this)\s+can\s+feel\s+(?:overwhelming|tricky|confusing|hard|frustrating)|it'?s\s+frustrating|let'?s\s+slow\s+(?:right\s+)?down|(?:take|try)\s+(?:a|one)\s+(?:tiny|small|little)\s+step|no\s+worries|don'?t\s+worry)\b/i

const STRUGGLE_RE = /\b(?:don'?t|dont|do\s+not|not|can'?t|cannot)\s+(?:understand|get\s+it|follow)|\bconfus|\bstuck\b|\blost\b|\b(?:too\s+)?(?:hard|difficult)\b|\bfrustrat|\bno\s+idea\b|\bi\s+(?:don'?t|dont)\s+know\b|\bidk\b|\bexplain\s+(?:again|simpler|differently)\b/i

const firstSentence = (t: string): string => ((t ?? '').trim().match(/^(?:[^.!?\n]|[.!?](?=\S))+(?:[.!?]+|$)/)?.[0] ?? '').trim()

export function opensWithEmpathy(text: string): boolean {
  return EMPATHY_OPENER_RE.test(firstSentence(text))
}

export function voicesStruggle(learnerMessage: string): boolean {
  return STRUGGLE_RE.test(learnerMessage ?? '')
}

/** priorTutor: newest first. */
export function stripEmpathyOpener(text: string, learnerMessage: string, priorTutor: readonly string[]): { text: string; stripped: boolean } {
  if (!opensWithEmpathy(text)) return { text, stripped: false }
  const recentlyUsed = priorTutor.slice(0, 4).some(opensWithEmpathy)
  if (voicesStruggle(learnerMessage) && !recentlyUsed) return { text, stripped: false }
  const first = firstSentence(text)
  const rest = text.trim().slice(first.length).trim()
  // Never leave an empty or a one-word reply behind.
  if ((rest.match(/\S+/g) ?? []).length < 6) return { text, stripped: false }
  return { text: rest, stripped: true }
}

// MATH-018: "Think of making a LEGO house", "like planning a road trip" — gerund forms.
const ANALOGY_RE = /\b(?:think\s+of\s+(?:it|this|them|a|an|the)\b|think\s+of\s+\w+ing\b|\blike\s+(?:planning|making|building|baking|cooking|packing|sorting|organi[sz]ing)\b|imagine\s+(?:a|an|you|that|your)\b|(?:it'?s|is|are)\s+(?:a\s+bit\s+|just\s+|kind\s+of\s+|rather\s+)?like\s+(?:a|an|when|your)\b|picture\s+(?:a|an)\b|analogy|metaphor)/i

export function usesAnalogy(text: string): boolean {
  return ANALOGY_RE.test(text ?? '')
}

/**
 * True when `limit` of the last four tutor replies (newest first) already used
 * an analogy. MATH-018 (2026-10-06, mathematics run: LEGO house, dinner party,
 * road trip, pizza — a new story for every "explain simpler" in 226 lessons):
 * the caller passes 1 for mathematics, where "simpler" means simpler maths and
 * a small number example, not another story.
 */
export function analogyCapReached(priorTutor: readonly string[], limit = 2): boolean {
  return priorTutor.slice(0, 4).filter(usesAnalogy).length >= limit
}

export const NO_ANALOGY_APPENDIX =
  '\n\nNO ANALOGY THIS TURN. The learner has already had several comparisons and stories in this lesson. '
  + 'Explain the idea directly, in plain words, with the lesson\'s own subject matter — the actual things involved, '
  + 'numbers or observations. No "think of it like", no "imagine", no metaphor.'

/**
 * BIO-001 (2026-10-05, biology run #41, #61, #121, #142): "why?" was answered
 * with the tutor's account of its own process — "because I wanted to first
 * acknowledge how you're feeling…", "I didn't repeat the same explanation
 * verbatim", "Because the system is set up to avoid repeating the same
 * explanation…", "I hear you're wondering why I'm not just repeating the
 * earlier explanation". Those sentences go; the teaching stays. A reply left
 * with fewer than 8 words is not touched (the caller's repairs own that case).
 * MATH-021 (2026-10-06, mathematics #552 t14, #1 t15): "I asked for the next
 * question so we can check…", "I asked you to resend because the system didn't
 * register…", "I put that placeholder in because the system was telling me…".
 * ENGL-014 (2026-10-07, english #152 t8): "that placeholder was just a reminder
 * to avoid repeating the exact same explanation".
 */
const META_TALK_RE = /\b(?:the\s+system\s+(?:is\s+set\s+up|won(?:'|’)t|doesn(?:'|’)t)|(?:avoid|not|didn(?:'|’)t|did\s+not)\s+(?:just\s+)?repeat(?:ing)?\s+(?:the\s+)?(?:exact\s+)?(?:same|earlier|previous)\s+explanation|(?:that|this|the)\s+placeholder\s+was|why\s+i(?:(?:'|’)m|\s+am|\s+haven(?:'|’)t|\s+have\s+not|\s+didn(?:'|’)t)\s+(?:not\s+)?(?:just\s+)?(?:given|giving|repeating|repeated|shown|showing)|i\s+wanted\s+to\s+first\s+acknowledge|repeat\s+the\s+same\s+explanation\s+verbatim|i\s+asked\s+(?:you\s+)?(?:for\s+the\s+next\s+question|to\s+resend|you\s+to\s+resend)|i\s+put\s+(?:that|this|the)\s+(?:placeholder|note|line|sentence)\s+in|the\s+system\s+(?:was\s+telling\s+me|told\s+me|didn(?:'|’)t\s+register|did\s+not\s+register|wants?\s+me|asked\s+me))\b/i

/**
 * CHEM-102 (2026-10-05, chem.equil.buffer #64): mid-lesson, "Since our session
 * time is wrapping up, let's pause here… See you next time!" — no session limit
 * exists, and the next turn kept teaching. The caller runs this only when the
 * lesson is not completing this turn.
 */
const INVENTED_SESSION_END_RE = /\b(?:(?:our|this|the)\s+(?:session|lesson)(?:\s+time)?\s+is\s+(?:wrapping\s+up|ending|almost\s+(?:over|up|done)|coming\s+to\s+an\s+end|nearly\s+(?:over|up))|(?:i(?:'|’)ll\s+)?see\s+you\s+next\s+time|until\s+next\s+time)\b/i

export function stripMetaTalk(text: string): { text: string; removed: string[] } {
  const src = (text ?? '').trim()
  const removed: string[] = []
  const kept = src.split(/\n{2,}/).map((para) => (para.match(/(?:[^.!?]|[.!?](?=\S))+(?:[.!?]+|$)/g) ?? [para])
    .filter((s) => { if (META_TALK_RE.test(s) || INVENTED_SESSION_END_RE.test(s)) { removed.push(s.trim()); return false } return true })
    .join('').trim()).filter(Boolean).join('\n\n')
  if (removed.length === 0 || (kept.match(/\S+/g) ?? []).length < 8) return { text, removed: [] }
  return { text: kept, removed }
}
