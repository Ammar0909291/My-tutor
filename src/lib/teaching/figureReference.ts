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
 *
 * "layout" is WEAK, not STRONG, deliberately: "circuit layout", "page layout",
 * "the layout of the periodic table", "sentence layout" are all ordinary
 * non-visual vocabulary across several subjects this platform teaches, unlike
 * "diagram"/"sketch"/"figure", which essentially never occur outside a real
 * reference to a rendered artefact. See DIRECT_POINTER_RE below for the one
 * shape where "layout" IS treated unconditionally — a live-reproduced defect
 * that on-screen-gating alone cannot close.
 */
const STRONG_FIGURE_NOUN =
  /\b(diagram|figure|graph|picture|image|chart|number ?line|animation|illustration|visual|simulation|plot|sketch)\b/i

const WEAK_FIGURE_NOUN =
  /\b(worked example|example|table|steps?|solution|board|canvas|panel|screen|layout)\b/i

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
 *
 * ── "USE THIS <NOUN> TO …" AND "LAYOUT" (bio.plant.photosynthesis, 2026-09-23) ──
 * Reproduced live on the deployed app, no visual/visualSpec/sceneSpec attached:
 *
 *   "Use this sketch to see how light captured in the thylakoid membrane
 *    produces ATP and NADPH, which then power the Calvin cycle…"
 *   "Use this layout to see how light energy moves electrons from water to
 *    NADPH while generating a proton gradient that powers ATP synthesis."
 *
 * Two independent misses in one shape. First, "sketch" is already a STRONG
 * noun everywhere else in this file, but the sentence carries no ON_SCREEN
 * locator, so `isPointer`'s locator-gated branch never fired; and the verb is
 * "use", which was on no verb list anywhere, so DIRECT_POINTER_RE's own
 * locator-free adjacency shape — the one path that needs no on-screen
 * corroboration — never fired either. Second, "layout" named no figure noun
 * at all before this change (see STRONG_FIGURE_NOUN/WEAK_FIGURE_NOUN above),
 * so even a recognised verb would not have helped it.
 *
 * "use" joins this rule's own verb list, not the general POINTING_VERB list
 * used elsewhere in this file: POINTING_VERB feeds branches that DON'T
 * require on-screen corroboration on a dash boundary (`findPointerClauseHead`),
 * and "use" is common with ordinary non-visual objects ("use the formula",
 * "use this method") that would false-positive there. DIRECT_POINTER_RE's own
 * VERB + (the/this/that) + NOUN adjacency is what makes it safe regardless —
 * "use the formula" never matches this list's nouns, and "use this diagram"/
 * "use this layout" already presuppose a specific, present artefact exactly
 * as "look at this diagram" does.
 *
 * "layout" is added to THIS list specifically (not to STRONG_FIGURE_NOUN),
 * so it is caught ONLY through the same rigid, low-risk adjacency this whole
 * rule already relies on — never through the looser locator-optional paths
 * that consult STRONG_FIGURE_NOUN directly. A declarative, non-pointing
 * sentence like "The layout of the periodic table reflects electron
 * configuration trends." has no verb from this list adjacent to a
 * determiner + "layout", so it does not match and is left untouched — see
 * figureReference.test.ts's negative controls for the checked cases.
 */
const DIRECT_POINTER_RE =
  /\b(?:look at|looking at|see|notice|observe|study|examine|consider|use)\s+(?:the|this|that)\s+(?:diagram|figure|graph|picture|image|chart|number ?line|animation|illustration|visual|simulation|plot|sketch|layout)\b/i

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

/**
 * A SHORT LEADING LABEL WITH NO TERMINAL PUNCTUATION AT ALL — "Light ↓ This
 * diagram shows…", "Energy This figure illustrates…" — bio.plant.
 * photosynthesis, reproduced live on the deployed app, 2026-09-23/24.
 *
 * `stripUnbackedFigureReferences` splits on `(?<=[.!?])\s+` — a sentence
 * boundary REQUIRES a terminal punctuation mark before it. The model's own
 * "diagram-caption" habit produces a bare, unpunctuated one- or two-word
 * label ("Light", "Energy", "Sunlight" — never itself a claim, and never a
 * complete sentence) immediately followed by a genuine `FIGURE_SUBJECT_
 * CLAIM_RE`-shaped claim, with nothing but whitespace (and sometimes an
 * arrow glyph the model used as an ad hoc separator) between them. The
 * splitter sees no boundary at all, so the whole run — label AND claim —
 * arrives at `FIGURE_SUBJECT_CLAIM_RE` as ONE "sentence" whose first
 * characters are the label, not "the/this/that/here's" — so the `^` anchor
 * never reaches the claim, and the false claim ships unstripped.
 *
 * ── WHY THIS IS NOT "REMOVE THE ANCHOR" ─────────────────────────────────
 * The anchor stays exactly as strict as it always was: this constant finds
 * a CANDIDATE cut point ahead of it, and `FIGURE_SUBJECT_CLAIM_RE` — wholly
 * unmodified — is what decides, on the text AFTER that cut, whether a claim
 * is actually there. A bad or overly eager cut can only ever produce a
 * remainder `FIGURE_SUBJECT_CLAIM_RE` was already willing to accept as
 * sentence-initial; it can never make the claim test itself more permissive
 * for text that reaches it any other way (every other call site, and every
 * pre-existing behaviour of this regex, is untouched).
 *
 * ── WHY A LABEL IS SAFE TO ASSUME, RATHER THAN ORDINARY PROSE ───────────
 * Deliberately narrow, on both ends:
 *   - Exactly ONE capitalised word (never two-plus): ordinary sentence-
 *     initial text capitalises only its own first word ("Consider how
 *     this diagram shows…" breaks at "how", lowercase) — a caption-style
 *     label is the one shape that puts a bare capitalised word directly
 *     before what reads like a fresh sentence, with nothing grammatical
 *     joining them.
 *   - The lookahead requires the very next token to be literally "the/
 *     this/that/here's/here is" — not merely a figure noun, not merely
 *     capitalised — so an ordinary label-like opener followed by anything
 *     else ("Sunlight Follow the arrows…", captured on the same lesson)
 *     never even reaches the cut, and `FIGURE_SUBJECT_CLAIM_RE` on the
 *     remainder is the real, unrelaxed gate regardless.
 * A three-word proper noun run ("New York City This diagram shows…") is
 * therefore NOT treated as a label — checked, not assumed — because this
 * repo's own tutoring prose has no evidenced case of one, and admitting it
 * would widen the surface with no observed need.
 *
 * ── THE REGRESSION THE EXCLUSION LIST CLOSES ────────────────────────────
 * The lookahead alone is not enough: "In the diagram shown above—gravity
 * pulls down…" ALSO has exactly one capitalised word ("In") directly before
 * literal "the" — but "In" is an ordinary sentence-initial PREPOSITION
 * genuinely governing "the diagram shown above" as one grammatical phrase
 * (already correctly handled, in full, by `PREPOSED_LOCATOR_RE`/
 * `findPointerClauseHead`'s Shape 2 — which trims only the leading clause
 * and KEEPS "gravity pulls down… these are action-reaction partners").
 * Treating "In" as a label made `hasFigureSubjectClaim` match the ENTIRE
 * run-on sentence via `FIGURE_SUBJECT_CLAIM_RE` on "the diagram shown
 * above…", so Shape 0b dropped the whole sentence — including the real
 * content Shape 2 already correctly preserves — a measured regression
 * against this file's own existing `figureReference.test.ts` fixtures,
 * caught before shipping by running the full suite, not assumed safe.
 * `LEADING_LABEL_RE` therefore excludes the closed class of English
 * function words (determiners, prepositions, conjunctions, pronouns,
 * auxiliaries, wh-words) from ever counting as a label: every evidenced
 * TRUE label ("Light", "Sunlight", "Energy") is a content noun with no
 * grammatical tie to what follows, and every false positive found while
 * building this fix was exactly one of these closed-class words instead.
 */
const LABEL_EXCLUSION_RE =
  /^(?:In|On|At|For|With|To|Of|By|From|As|Into|Onto|Upon|The|This|That|These|Those|It|He|She|They|We|You|I|Is|Are|Was|Were|Be|Been|Being|And|Or|But|So|Because|Since|If|When|While|Although|Though|Unless|Until|After|Before|During|Once|Whenever|Whether|Why|How|What|Where|Who|Which|There|Here|Not|No|Yes|A|An)\b/

const LEADING_LABEL_RE =
  /^[A-Z][a-zA-Z]*\s*[↓↑→←⇒⇐⇓⇑↔]?\s+(?=[Tt]he\b|[Tt]his\b|[Tt]hat\b|[Hh]ere(?:'s| is))/

/**
 * `FIGURE_SUBJECT_CLAIM_RE`, tried first exactly as written (so every
 * existing sentence-initial match is byte-for-byte unchanged), then — only
 * on failure — tried again against whatever follows a `LEADING_LABEL_RE`
 * cut, if one exists. See `LEADING_LABEL_RE`'s own comment for why this
 * composition cannot make the underlying claim test any more permissive.
 */
function hasFigureSubjectClaim(sentence: string): boolean {
  if (FIGURE_SUBJECT_CLAIM_RE.test(sentence)) return true
  const label = LEADING_LABEL_RE.exec(sentence)
  if (!label || LABEL_EXCLUSION_RE.test(label[0])) return false
  return FIGURE_SUBJECT_CLAIM_RE.test(sentence.slice(label[0].length))
}

/**
 * AN EMBEDDED LOCATOR — "the histogram IN THE FIGURE".
 *
 * Owner-reported from a live second-law lesson, 2026-08-30. Two turns read:
 *
 *   "Which part of the histogram in the figure shows which outcome is most
 *    likely?"
 *   "What do you notice about the shape of the histogram in the figure?"
 *
 * and no figure was attached. The third turn — "In the figure you can see one
 * bar that stands out…" — WAS caught, by VISIBILITY_DEIXIS_RE. These two were
 * not, for a reason this file states deliberately: A QUESTION IS NEVER REMOVED.
 * That rule is right and stays. But it was written for a pointing CLAUSE that
 * sits beside the question ("look at the highlighted points — why can't 2 be
 * divided…?"), where dropping the clause leaves a question that stands alone.
 * Here the claim is a prepositional phrase INSIDE the question's own noun
 * phrase, so clause-scoped removal never reaches it and the false claim ships.
 *
 * Removing just the phrase keeps the question and deletes the untrue part —
 * exactly this file's contract ("removes the REFERENCE and keeps the
 * TEACHING"). It does not make the question a good one: a histogram the
 * learner cannot see is still being asked about, and that is a visual-coverage
 * problem this file cannot fix. It does stop the tutor asserting a figure
 * exists when it does not.
 *
 * Narrow on purpose: only "in/on the <figure noun>" directly after a noun, only
 * when nothing is attached. "In the figure below, note that…" is already handled
 * by the preposed locator; a fenced code block is untouched.
 *
 * The lookbehind is load-bearing and was added after a regression the check
 * caught immediately: without it, the SENTENCE-INITIAL "In the figure you can
 * see one bar that stands out" matched too, and removing the opening left
 * "you can see one bar…" — which is worse than the input, because
 * VISIBILITY_DEIXIS_RE is anchored per sentence and no longer recognised the
 * mutilated remainder. Requiring a word character immediately before the
 * preposition confines this to a locator hanging off a noun INSIDE a sentence
 * and leaves every sentence-opening locator to the rules that already handle
 * it.
 *
 * The trailing exclusion is load-bearing too, and the tests caught the need
 * for it: "Draw the forces in the diagram you are about to make." names a
 * figure that does not exist YET and is not claiming one is on screen —
 * stripping it produced "Draw the forces you are about to make", which is
 * worse than the input. A relative clause opening on a pronoun is the reliable
 * signal for that reading, so a locator followed by one is left alone.
 */
/**
 * SHAPE OFFER — "HERE'S A DIAGRAM OF X:" WITH NOTHING RENDERED BEHIND IT.
 *
 * ── THE DEFECT THIS EXISTS FOR ─────────────────────────────────────────────
 * Distinct from every shape above: those catch a claim that a figure IS
 * being shown ("The diagram shows…", "look at the diagram…"). This one
 * catches an OFFER to show one — "Here's a diagram of the parts of a drama
 * script:" — immediately followed by nothing but an ASCII/text sketch. No
 * verb like "shows"/"depicts" appears (so FIGURE_SUBJECT_CLAIM_RE correctly
 * does not match), and no on-screen locator is present (so the pointer rules
 * do not match either) — the false claim is the word "diagram" itself,
 * offered as if a real rendered artefact were about to appear.
 *
 * ── REPLACE, NOT DELETE (the one shape in this file that does) ─────────────
 * Every other shape here deletes the claim and lets the surrounding prose
 * carry the teaching, because the claim was decoration on content that
 * stands without it. Here the offer IS the transition into the ASCII/text
 * content the tutor is about to give — deleting it would leave that content
 * with no introduction at all, worse than the false claim it replaces. So
 * this rewrites the opening into the SAME honest framing this codebase's own
 * prompt guidance already asks for elsewhere ("Build the picture in text…"),
 * rather than removing it.
 *
 * ── WHAT IS DELIBERATELY LEFT ALONE ─────────────────────────────────────
 * A tutor that ALREADY says "quick text diagram" / "ASCII diagram" / "a
 * mental picture" is already being honest — rewriting it would be pointless
 * churn on correct output, so the qualifier words are checked for and skip
 * this rule entirely.
 */
const FIGURE_OFFER_OPENING_RE =
  /^(?:here'?s|here is)\s+(?:a|the|your)\s+(?:quick\s+|simple\s+|rough\s+)?(diagram|figure|picture|image|chart|number ?line|animation|illustration|visual|simulation|plot|sketch)\b/i

/** Words that, if already present in the opening, mean the tutor is already
 *  being honest about the medium — leave it alone. */
const ALREADY_HONEST_RE = /\b(text|ascii|mental|imagine|picture in your mind|ascii[- ]art)\b/i

export const HONEST_FIGURE_OFFER_LEAD_IN = "I can't show you a rendered image right now, but here's a text version"

/**
 * Rewrite a false "here's a diagram" OFFER into an honest one, preserving
 * whatever comes after it on the same sentence (the colon, or the rest of
 * the clause). Returns null when the sentence does not match this shape.
 */
function honestifyFigureOffer(sentence: string): string | null {
  const m = FIGURE_OFFER_OPENING_RE.exec(sentence)
  if (!m) return null
  const opening = m[0]
  if (ALREADY_HONEST_RE.test(sentence.slice(0, opening.length + 20))) return null
  const rest = sentence.slice(opening.length)
  // Keep a trailing colon/dash if present (the natural lead-in punctuation);
  // otherwise just append what follows as-is.
  return HONEST_FIGURE_OFFER_LEAD_IN + rest
}

const EMBEDDED_LOCATOR_RE =
  /(?<=[A-Za-z0-9])\s+(?:in|on)\s+(?:the|this|that)\s+(?:figure|diagram|picture|image|graph|chart|illustration)\b(?!\s+(?:you|we|i|they|that|which)\b)/gi

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

/**
 * THREE REMNANT SHAPES that survive once a text diagram is taken out of a
 * no-figure turn (production, 2026-09-24 — every one after the honest
 * "I don't have a picture" line, so the learner was told there is no picture
 * and then pointed at one):
 *
 *   "Follow the arrows from light energy to the production of glucose."
 *   "This layout shows the sequence of events from the promoter region…"
 *   "*P = phosphate, C = deoxyribose sugar; the two backbones run…"
 *
 * Each carries real teaching after the false pointer, so each is REWRITTEN to
 * keep it (the honestifyFigureOffer precedent), never simply deleted:
 * arrows -> "Trace the steps", "this layout shows" -> "Here is", and a symbol
 * legend is removed from the front of the sentence it prefixes.
 */
const ARROW_FOLLOW_RE = /^(?:[A-Z][a-z]+\s+(?=[FfTt]))?(?:follow|trace)\s+(?:the|these|those)\s+arrows?\b\s*/i
const LAYOUT_SUBJECT_RE = /^(?:this|the)\s+(?:layout|arrangement)\s+shows\s+/i
const LEGEND_PREFIX_RE = /^\*?\s*(?:[A-Z][a-z]?\s*=\s*[^,;=\n]{2,40},\s*)+[A-Z][a-z]?\s*=\s*[^,;=\n]{2,40};\s*/
const REMNANT_ANYWHERE_RE = /(?:^|[\n.!?]\s*)(?:(?:[A-Z][a-z]+\s+)?(?:follow|trace)\s+(?:the|these|those)\s+arrows?\b|(?:this|the)\s+(?:layout|arrangement)\s+shows\b|\*?\s*[A-Z][a-z]?\s*=\s*[^,;=\n]{2,40},)/i

/** Rewrite a remnant sentence, or null when it is not one. `''` means drop it. */
function repairRemnant(s: string): string | null {
  const cap = (x: string) => x.charAt(0).toUpperCase() + x.slice(1)
  const arrow = s.match(ARROW_FOLLOW_RE)
  if (arrow) {
    const rest = s.slice(arrow[0].length).trim()
    // The layout words that only mean something beside a drawing go with it.
    const unplaced = rest.replace(/\s+(?:on|at)\s+the\s+(?:left|right|top|bottom)\b/gi, '')
    return /[A-Za-z]{3,}/.test(unplaced) ? `Trace the steps ${unplaced}` : ''
  }
  const layout = s.match(LAYOUT_SUBJECT_RE)
  if (layout) {
    const rest = s.slice(layout[0].length).trim()
    return /[A-Za-z]{3,}/.test(rest) ? `Here is ${rest}` : ''
  }
  const legend = s.match(LEGEND_PREFIX_RE)
  if (legend) {
    const rest = s.slice(legend[0].length).trim()
    return /[A-Za-z]{3,}/.test(rest) ? cap(rest) : ''
  }
  return null
}

/** A leftover drawing label: one to three words, no sentence punctuation, no markdown. */
function isOrphanLabelParagraph(p: string): boolean {
  const t = p.trim()
  if (t.length === 0 || /[.!?:;,)]$/.test(t) || /^[#*>\-|`\d]/.test(t) || /[*_`]/.test(t)) return false
  return t.split(/\s+/).length <= 3
}

export interface FigureReferenceResult {
  text: string
  stripped: boolean
  /** The exact fragments removed, for the log — never guessed at after the fact. */
  removed: string[]
  /**
   * The turn was NOTHING but pointers at a figure that is not there, so it was
   * handed back unchanged (an empty turn is never returned). The caller must
   * replace it — see pointerOnlyFallback — or the pointer reaches the learner.
   */
  onlyPointer?: boolean
}

/**
 * What a turn says when its whole text pointed at a figure that does not exist
 * (production, eng.grammar.word-classes-overview, 2026-09-24: the entire reply
 * was "Use this layout to picture where a word belongs…"). Retrieval, never
 * invention: the concept's own Knowledge Graph title and description.
 */
export function pointerOnlyFallback(title: string, description: string): string {
  return `${title.trim()} — ${description.trim()}`
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
    // Embedded locators come out first, so the rest of this function sees the
    // text without them. Applied to the WHOLE string, questions included: the
    // question survives, only the untrue claim inside it is removed. See
    // EMBEDDED_LOCATOR_RE.
    let working = text
    const embeddedRemoved: string[] = []
    if (EMBEDDED_LOCATOR_RE.test(text)) {
      EMBEDDED_LOCATOR_RE.lastIndex = 0
      working = text.replace(EMBEDDED_LOCATOR_RE, (m) => { embeddedRemoved.push(m.trim()); return '' })
      EMBEDDED_LOCATOR_RE.lastIndex = 0
    }
    if (embeddedRemoved.length > 0) {
      const rest = stripUnbackedFigureReferences(working, false)
      return {
        text: rest.text,
        stripped: true,
        removed: [...embeddedRemoved, ...rest.removed],
      }
    }
    // Cheap reject: nothing here points at anything. Visibility deixis
    // ("here you see…") is a pointer that names no figure noun, so it must
    // keep the text in scope even when no figure noun appears — tested
    // unanchored here (it may open a LATER sentence), then re-tested anchored
    // per sentence below.
    const hasVisibilityDeixis =
      /\b(?:here\s+(?:you|we)\s+(?:can\s+|will\s+|'ll\s+)?see|as\s+(?:you|we)\s+can\s+see|you\s+can\s+see\s+(?:here|above|below))\b/i.test(text)
    if (!STRONG_FIGURE_NOUN.test(text) && !WEAK_FIGURE_NOUN.test(text) && !hasVisibilityDeixis
      && !REMNANT_ANYWHERE_RE.test(text)) {
      return { text, stripped: false, removed: [] }
    }

    const removed: string[] = []
    const paragraphs = text.split(/\n{2,}/)

    const cleanedParagraphs = paragraphs.map((paragraph) => {
      const sentences = paragraph.split(/(?<=[.!?])\s+/)
      const kept = sentences.map((sentence) => {
        const s = sentence.trim()
        if (s.length === 0) return ''

        // Remnants of a removed text diagram — see ARROW_FOLLOW_RE.
        if (!s.includes('?')) {
          const repaired = repairRemnant(s)
          if (repaired !== null) {
            removed.push(s)
            return repaired
          }
        }

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
          // present ("The diagram shows nitrogen in the center…"), including
          // one preceded by an unpunctuated leading label ("Light ↓ This
          // diagram shows…" — see LEADING_LABEL_RE/hasFigureSubjectClaim).
          // The whole sentence is a claim about a figure that is not there,
          // so it goes — the surrounding paragraphs carry the teaching.
          if (hasFigureSubjectClaim(s)) {
            removed.push(s)
            return ''
          }

          // Shape OFFER: "Here's a diagram of X:" with nothing rendered
          // behind it. Rewritten, not deleted — see honestifyFigureOffer.
          const honest = honestifyFigureOffer(s)
          if (honest !== null) {
            removed.push(s)
            return honest
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

    // A drawing's stray label ("Light") is only recognisable as one when the
    // drawing around it was just found and removed; on its own a two-word
    // paragraph is left alone.
    const paragraphsOut = removed.length > 0
      ? cleanedParagraphs.filter((p) => {
          if (!isOrphanLabelParagraph(p)) return true
          removed.push(p.trim())
          return false
        })
      : cleanedParagraphs
    const out = paragraphsOut.filter((p) => p.trim().length > 0).join('\n\n').trim()
    // Never hand back an empty turn. If the figure reference WAS the whole
    // message there is nothing safe to say, so the original stands and the
    // caller's log records that it could not be repaired.
    if (out.length === 0) return { text, stripped: false, removed: [], onlyPointer: removed.length > 0 }
    if (removed.length === 0) return { text, stripped: false, removed: [] }
    return { text: out, stripped: true, removed }
  } catch {
    return { text, stripped: false, removed: [] }
  }
}
