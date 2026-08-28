/**
 * A TUTOR MAY NOT POINT AT A FIGURE THAT IS NOT THERE.
 *
 * ── THE DEFECT THIS EXISTS FOR ──────────────────────────────────────────────
 * Captured by the certification harness on a real lesson, math.nt.prime-number,
 * 2026-08-18. The turn carried no visual, no visualSpec and no sceneSpec, and
 * read:
 *
 *     "Look at the number line displayed on your screen, which highlights the
 *      numbers 2, 3, 5, 7, 11, and 13.
 *
 *      Notice how these specific numbers cannot be formed by multiplying
 *      smaller whole numbers together…
 *
 *      claudeTest, look at the highlighted points on the number line — why
 *      can't the number 2 be divided evenly into any smaller equal groups
 *      other than 1 and 2?"
 *
 * The learner was told twice to read something that did not exist, and then
 * asked a question about it. There is no recovery available to them: they
 * cannot answer, and they cannot tell whether the fault is theirs or the app's.
 *
 * ── WHY THE RUNTIME AND NOT THE PROMPT ──────────────────────────────────────
 * The same reason `gateProbeContract` and `withholdUngradedGateQuestion` are
 * enforced here: a prompt instruction is advisory, and this repo has now
 * measured three separate advisory rules being ignored. The visual pipeline
 * cannot help either — whether a figure is attached is decided AFTER the text is
 * generated, so the model is writing about a figure whose existence is not yet
 * settled.
 *
 * ── WHAT IT DOES ────────────────────────────────────────────────────────────
 * Removes the REFERENCE and keeps the TEACHING, in two shapes only:
 *
 *   1. a sentence that exists solely to point at the figure
 *      ("Look at the diagram on your screen.") — dropped whole;
 *   2. a leading clause that points at the figure before the real content
 *      ("look at the highlighted points — why can't 2 be divided…?",
 *      "In the picture on your screen you can see gravity pulling…—those
 *      two are action-reaction partners…") — the clause is dropped and the
 *      content kept, re-capitalised.
 *
 * The clause a sentence opens with earns removal in either of two
 * independent ways: a POINTING_VERB (look at/see/notice/…) next to a figure
 * noun, or a PREPOSED LOCATOR — "In/On/From/Within the/this/that <figure
 * noun> <on-screen locator>" — which needs no verb at all, since the
 * preposition alone is already the claim ("in the diagram on your screen"
 * presupposes the diagram is there). See PREPOSED_LOCATOR_RE below for the
 * production shape that required it.
 *
 * A QUESTION IS NEVER REMOVED. In the captured turn the question survives intact
 * and stands perfectly well on its own, which is the general case: the figure
 * was decoration the model added, not the substance of what was asked.
 *
 * It fires ONLY when no figure is attached. With a figure present the reference
 * is true and is left exactly as written.
 */

/** Words that place the thing on screen rather than in the prose. */
const ON_SCREEN =
  /\b(on (?:your|the) screen|displayed|shown (?:above|below|here)?|above|below|to the (?:right|left)|highlighted|on screen|pictured)\b/i

/**
 * Things a tutor can point at, in two tiers.
 *
 * STRONG names a rendered artefact and nothing else, so it counts on its own.
 *
 * WEAK is a word that can equally name something written in the prose itself —
 * "look at this example — 3 + 4 × 2" points at the very next characters, not at
 * a picture — so it counts ONLY alongside an on-screen locator. Measured on a
 * real lesson: "Let's look at a complete worked example on your screen using the
 * expression (2 + 3)² ÷ 5 − 1" slipped through when the list was strong-only,
 * because "worked example" is not a diagram and the turn carried no figure.
 */
const STRONG_FIGURE_NOUN =
  /\b(diagram|figure|graph|picture|image|chart|number ?line|animation|illustration|visual|simulation|plot|sketch)\b/i

const WEAK_FIGURE_NOUN =
  /\b(worked example|example|table|steps?|solution|board|canvas|panel|screen)\b/i

/** Does this fragment name something the learner is being told to look AT? */
function namesAFigure(fragment: string): boolean {
  if (STRONG_FIGURE_NOUN.test(fragment)) return true
  return WEAK_FIGURE_NOUN.test(fragment) && ON_SCREEN.test(fragment)
}

/** Verbs that direct the learner's eyes somewhere. */
const POINTING_VERB = /\b(look at|looking at|see|notice|observe|study|examine|consider)\b/i

/**
 * A PREPOSED LOCATING CLAUSE — "In the picture on your screen you can see…",
 * "In the diagram on your screen, gravity is shown…", "In the figure shown
 * above—…".
 *
 * Captured live on a Newton's Third Law turn, 2026-08-22, with no visual, no
 * visualSpec and no sceneSpec attached: "In the picture on your screen you
 * can see gravity pulling on an object and the normal force pushing upward
 * on that same object—those two are action-reaction partners…". The old
 * clause test — `POINTING_VERB.test(head) && namesAFigure(head)` — requires
 * a verb from POINTING_VERB (look at/see/notice/observe/study/examine/
 * consider) to occur INSIDE the head. That happened to hold for this exact
 * sentence ("you can see" sits before the em-dash), which is why it looked
 * caught in isolation — but the shape it was built for is narrower than the
 * shape actually being produced: "shown above", "is shown", and any other
 * passive or verbless construction name nothing on this list, so
 * "In the diagram on your screen, gravity is shown pulling…" and
 * "In the figure shown above—gravity pulls down…" sailed straight through,
 * unit-verified as real misses (see figureReference.test.ts).
 *
 * The generalisation: a clause opening with "In/On/From/Within the/this/that"
 * is ALREADY the claim, independent of whatever verb (if any) follows it —
 * "in the diagram on your screen" presupposes a diagram is there to be in.
 * Gated on BOTH a figure noun and an on-screen locator being present in the
 * same fragment (never on the prefix alone) so ordinary prose openers —
 * "On the other hand, …", "In the meantime, …" — are structurally incapable
 * of matching: neither names a figure, so `namesAFigure` fails regardless of
 * how the sentence begins.
 */
const PREPOSED_LOCATOR_RE = /^(?:in|on|from|within)\s+(?:the|this|that)\s+/i

/** Does this fragment claim, all by itself, that a specific figure is present? */
function isPreposedLocatorClaim(fragment: string): boolean {
  return PREPOSED_LOCATOR_RE.test(fragment.trim()) && namesAFigure(fragment) && ON_SCREEN.test(fragment)
}

/**
 * "Look at the diagram" — no locator, and still a false claim.
 *
 * Captured on math.found.problem-solving-strategies, 2026-08-22: "When you
 * look at the diagram, you can count rows, columns, and even spot missing
 * pieces…", on a turn with no figure attached. `isPointer` below required
 * ON_SCREEN even for a STRONG noun, which `namesAFigure` does NOT — a strong
 * noun already stands on its own there. The gap is that determiner + verb +
 * noun sitting right next to each other IS the pointer, whether or not the
 * model also bothers to say "on your screen".
 *
 * Deliberately narrower than "verb ... anywhere-in-sentence noun": this
 * concept's own lesson is ABOUT diagrams as a strategy, so ordinary prose
 * like "when learners draw a diagram, they can see relationships more
 * clearly" must NOT be caught — and it is not, because "see" and "diagram"
 * are not adjacent through a determiner here. Requiring VERB + (the/this/
 * that) + NOUN immediately adjacent is the shape that is always a pointer at
 * a specific, present thing, never a general statement about the noun.
 */
const DIRECT_POINTER_RE =
  /\b(?:look at|looking at|see|notice|observe|study|examine|consider)\s+(?:the|this|that)\s+(?:diagram|figure|graph|picture|image|chart|number ?line|animation|illustration|visual|simulation|plot|sketch)\b/i

/**
 * A single boundary character — em/en dash, a whitespace-bounded hyphen, or a
 * comma — with any trailing whitespace. Matched globally so the caller can
 * walk EVERY candidate boundary in the sentence, not just the first.
 */
/**
 * EXPLICIT VISIBILITY ASSERTIONS — "here you see…", "as you can see…",
 * "you can see here/above/below…" — that claim a figure is being VIEWED RIGHT
 * NOW even though they name no figure noun of their own.
 *
 * ── THE DEFECT THIS EXISTS FOR ─────────────────────────────
 * chem.bond.resonance, real account, 2026-08-28. The learner asked "can you
 * draw it for me?"; resonance has no faithful figure (its binding is retired
 * because the only card available depicted the misconception) and generation
 * is off in production, so the turn carried NO figure — and the tutor answered
 * "Here you see a central nitrogen atom bonded to three oxygens…", describing a
 * drawing that was never attached. The figure-noun test does not catch it
 * because the sentence names no diagram/figure/picture, only atoms.
 *
 * ── WHY THIS IS SAFE ─────────────────────────────────────
 * These phrases are nearly absent from real teaching prose — measured at ONE
 * occurrence across all of src/, because a tutor writing text says "notice
 * that", "the pattern is", "we get" — not "here you see", which presupposes a
 * thing on screen. The false-positive surface is tiny, and it fires ONLY when
 * no figure is attached (the whole function's precondition). Anchored to the
 * START of a fragment: "here you see" mid-sentence is not this shape.
 */
const VISIBILITY_DEIXIS_RE =
  /^(?:here\s+(?:you|we)\s+(?:can\s+|will\s+|'ll\s+)?see\b|as\s+(?:you|we)\s+can\s+see\b|you\s+can\s+see\s+(?:here|above|below)\b)[,:]?\s*/i

/**
 * A FIGURE NOUN IN SUBJECT POSITION, ASSERTING THE FIGURE IS PRESENT.
 *
 * "The diagram shows nitrogen in the centre…", "This figure illustrates…",
 * "Here's the picture of the two structures". The pointer tests above all key
 * on a POINTING VERB (look/see/notice) or a PREPOSITION (in/on the figure);
 * this shape has neither — the figure noun is the grammatical subject and a
 * presentation verb (shows/depicts/illustrates/…) follows it.
 *
 * chem.bond.resonance, real account, 2026-08-28: the learner asked for a
 * diagram of the resonance structures, none could be shown, and the tutor
 * answered "The diagram shows nitrogen in the center with three oxygens around
 * it…" — narrating a figure that was never attached.
 *
 * STRONG artefact nouns only (diagram/figure/picture/…), deliberately NOT
 * graph/plot/chart/number line, which also name ABSTRACT mathematical objects a
 * lesson may legitimately discuss without a rendered figure ("this graph is a
 * parabola"). Fires only when no figure is attached (the whole function's
 * precondition), so a turn that really carries a diagram is never touched.
 */
const FIGURE_SUBJECT_CLAIM_RE =
  /^(?:the|this|that|here(?:'s| is))\s+(?:the\s+|a\s+|an\s+)?(?:diagram|figure|picture|image|illustration|sketch|drawing|animation)\b[^.!?]{0,60}?\b(?:shows?|shown|depicts?|depicted|illustrates?|illustrated|displays?|displayed|represents?|pictures?|presents?|highlights?|indicates?)\b/i

const CLAUSE_BOUNDARY_RE = /(?:[—–]|(?<=\s)-(?=\s)|,)\s*/g

/**
 * The leading pointer clause, if the sentence opens with one — tried against
 * EVERY boundary in the sentence (up to a length cap), in order, and returns
 * the first head that actually qualifies as a pointer clause.
 *
 * NOT "the text up to the first boundary character". A sentence often opens
 * with something else entirely before the pointer clause — most commonly a
 * vocative ("claudeTest, look at the highlighted points on the number line —
 * why can't…?") — and taking only the first boundary would stop at
 * "claudeTest," (which names no figure) and give up, leaving the REAL
 * pointer clause after the em-dash untouched. Trying every boundary in turn
 * is what makes the comma addition above safe to combine with an existing
 * vocative-prefixed sentence.
 *
 * A COMMA IS A WEAKER SIGNAL THAN A DASH. A dash is rare enough in ordinary
 * prose that POINTING_VERB + a figure noun before one is already good
 * evidence of a real pointer clause (the original, permissive shape-2 rule).
 * A comma is not — "So, drawing a diagram lets you see the structure of a
 * problem at a glance, revealing patterns…" has "see" and "diagram" both
 * inside the span up to its second comma, and is ordinary teaching prose
 * about diagrams as a strategy, not a claim that one is on screen. Measured
 * as a real regression while building this: adding comma as a boundary type
 * made that exact sentence (from the existing PUZZLE_TURN fixture) match.
 * So a comma-terminated head additionally requires ON_SCREEN evidence,
 * exactly as shape 1's whole-sentence test already does; a dash-terminated
 * head keeps the original, more permissive bar.
 */
function findPointerClauseHead(s: string): string | null {
  CLAUSE_BOUNDARY_RE.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = CLAUSE_BOUNDARY_RE.exec(s))) {
    const end = m.index + m[0].length
    if (end > 140) break
    if (end >= s.length) continue // nothing follows — not a leading clause
    const head = s.slice(0, end)
    const boundaryIsComma = m[0].trim() === ','
    const pointingVerbQualifies =
      POINTING_VERB.test(head) && namesAFigure(head) && (!boundaryIsComma || ON_SCREEN.test(head))
    if (pointingVerbQualifies || isPreposedLocatorClaim(head)) {
      return head
    }
  }
  return null
}

export interface FigureReferenceResult {
  text: string
  stripped: boolean
  /** The exact fragments removed, for the log — never guessed at after the fact. */
  removed: string[]
}

/**
 * Strip references to a figure the turn does not carry.
 *
 * Pure and total. On any surprise it returns the text unchanged, because a
 * mangled turn is worse than an over-claiming one.
 */
export function stripUnbackedFigureReferences(
  text: string,
  hasFigure: boolean,
): FigureReferenceResult {
  try {
    if (hasFigure) return { text, stripped: false, removed: [] }
    if (typeof text !== 'string' || text.length === 0) return { text, stripped: false, removed: [] }
    // Cheap reject: nothing here points at anything. Visibility deixis
    // ("here you see…") is a pointer that names no figure noun, so it must
    // keep the text in scope even when no figure noun appears — tested
    // unanchored here (it may open a LATER sentence), then re-tested anchored
    // per sentence below.
    const hasVisibilityDeixis =
      /\b(?:here\s+(?:you|we)\s+(?:can\s+|will\s+|'ll\s+)?see|as\s+(?:you|we)\s+can\s+see|you\s+can\s+see\s+(?:here|above|below))\b/i.test(text)
    if (!STRONG_FIGURE_NOUN.test(text) && !WEAK_FIGURE_NOUN.test(text) && !hasVisibilityDeixis) {
      return { text, stripped: false, removed: [] }
    }

    const removed: string[] = []
    const paragraphs = text.split(/\n{2,}/)

    const cleanedParagraphs = paragraphs.map((paragraph) => {
      const sentences = paragraph.split(/(?<=[.!?])\s+/)
      const kept = sentences.map((sentence) => {
        const s = sentence.trim()
        if (s.length === 0) return ''

        // Shape 0: a leading VISIBILITY-DEIXIS opener ("Here you see …", "As
        // you can see, …"). It names no figure noun, so shape 1/2 below never
        // catch it — but with no figure attached it is a claim that something
        // is on screen. Strip the opener and keep whatever real content
        // follows; drop the whole sentence only if nothing usable remains and
        // it is not a question. A question is never removed.
        if (!s.includes('?')) {
          const m = s.match(VISIBILITY_DEIXIS_RE)
          if (m) {
            const rest = s.slice(m[0].length).trim()
            // Keep the remainder only when it carries real content: it starts
            // like a sentence AND has at least three words. "Here you see it."
            // leaves "It." — a fragment worse than dropping the whole claim.
            const restWords = rest.split(/\s+/).filter(Boolean).length
            if (rest.length > 0 && /^[A-Za-z0-9]/.test(rest) && restWords >= 3) {
              removed.push(m[0].trim())
              return rest.charAt(0).toUpperCase() + rest.slice(1)
            }
            // Nothing substantive follows the claim — the sentence was only
            // the claim, so it goes.
            removed.push(s)
            return ''
          }

          // Shape 0b: a figure noun in SUBJECT position asserting the figure is
          // present ("The diagram shows nitrogen in the center…"). The whole
          // sentence is a claim about a figure that is not there, so it goes —
          // the surrounding paragraphs carry the teaching.
          if (FIGURE_SUBJECT_CLAIM_RE.test(s)) {
            removed.push(s)
            return ''
          }
        }

        // Shape 2 first: a pointing clause in FRONT of real content. Handled
        // before shape 1 so a sentence carrying both is trimmed, not deleted.
        //
        // THE BOUNDARY, FIXED. The dash class used to be bare `[—–-]` — any
        // hyphen counted, including one with no whitespace on either side.
        // That is indistinguishable from a hyphen INSIDE A WORD, and it broke
        // sentences it should only have trimmed: "…and these are action-
        // reaction pairs." has a hyphen at "action-reaction", which the old
        // regex happily took as ITS clause boundary — miles past the real
        // pointer clause — mangling the output down to a fragment like
        // "Reaction pairs." with all the real content gone. A bare hyphen
        // now counts only with whitespace on both sides (`5 - 1`, a genuine
        // stylistic dash), never mid-word. A comma is also now a valid
        // boundary, since "In the figure shown above, you can see…" is at
        // least as common a construction from a model as the em-dash form —
        // and every boundary in the sentence is tried in turn (see
        // findPointerClauseHead), not just the first, so a leading vocative
        // before the real clause ("claudeTest, look at the diagram — …")
        // still finds the em-dash after failing on the comma.
        const head = findPointerClauseHead(s)
        if (head !== null) {
          const rest = s.slice(head.length).trim()
          // A REPAIR MUST NOT LEAVE A SENTENCE STARTING MID-THOUGHT.
          //
          // Measured on the real turn "When we look at the numbers highlighted
          // on the number line on your screen—2, 3, 5, 7, 11, and 13—each of
          // these numbers can only be divided evenly by 1 and by itself": the
          // pointing head carried the sentence's subject, so cutting it left
          // "2, 3, 5, 7, 11, and 13—each of these numbers…", which reads as a
          // fragment. When the remainder does not begin like a sentence, the
          // whole sentence goes instead — a clean turn beats a mangled one,
          // and the surrounding paragraphs carry the teaching.
          if (rest.length > 0 && /^[A-Za-z]/.test(rest)) {
            removed.push(head.trim())
            return rest.charAt(0).toUpperCase() + rest.slice(1)
          }
          if (rest.length > 0 && !s.includes('?')) {
            removed.push(s)
            return ''
          }
        }

        // Shape 1: the whole sentence is the pointer. Never a question — a
        // question is content the learner is expected to answer, and removing
        // it would silently change what the turn asked.
        //
        // Two independent ways a sentence earns this: an explicit on-screen
        // locator (the original, broader path — catches a weak noun too,
        // since namesAFigure gates WEAK behind ON_SCREEN already), or the
        // narrower DIRECT_POINTER_RE shape below, which needs no locator
        // because "look at the diagram" is already the claim on its own.
        const isPointer =
          !s.includes('?') &&
          ((POINTING_VERB.test(s) && namesAFigure(s) && ON_SCREEN.test(s)) ||
            isPreposedLocatorClaim(s) ||
            DIRECT_POINTER_RE.test(s))
        if (isPointer) {
          removed.push(s)
          return ''
        }

        return s
      })

      return kept.filter((x) => x.length > 0).join(' ')
    })

    const out = cleanedParagraphs.filter((p) => p.trim().length > 0).join('\n\n').trim()
    // Never hand back an empty turn. If the figure reference WAS the whole
    // message there is nothing safe to say, so the original stands and the
    // caller's log records that it could not be repaired.
    if (out.length === 0) return { text, stripped: false, removed: [] }
    if (removed.length === 0) return { text, stripped: false, removed: [] }
    return { text: out, stripped: true, removed }
  } catch {
    return { text, stripped: false, removed: [] }
  }
}
