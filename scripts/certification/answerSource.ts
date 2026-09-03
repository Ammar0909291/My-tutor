/**
 * THE AUTHORITATIVE ANSWER SOURCE FOR CERTIFICATION — REPOSITORY-SIDE ONLY.
 *
 * ── WHY THIS FILE EXISTS ────────────────────────────────────────────────────
 * Production deliberately stopped shipping the answer key: `mcqForClient`
 * (src/lib/teaching/mcq.ts) projects a served probe down to
 * `{ question, options }`, because a learner reading the network response could
 * otherwise see the correct option outright. That fix is correct and must stay.
 *
 * It also broke the certification harness, which answered with
 * `String.fromCharCode(65 + last.mcq.correctIndex)`. With the field gone that
 * expression evaluates `65 + undefined` to NaN, and String.fromCharCode(NaN)
 * is the NUL character — so the harness would have posted a NUL byte as the
 * learner's answer on every assessment turn of all 424 concepts and reported a
 * near-total teaching failure for a product nobody actually answered.
 *
 * ── THE RULE THIS FILE OBEYS ────────────────────────────────────────────────
 * The instrument must never obtain information a real learner is not allowed to
 * receive. So the answer is NOT requested from production. It is recovered from
 * the SAME authored corpus production was seeded from, which lives in this
 * repository, and the harness then submits the OPTION TEXT — exactly what
 * `LessonScreen` sends when a learner taps a choice. Production grades it.
 *
 *   canonical answer source -> harness picks the visible option
 *   -> production grades -> harness observes mastery
 *
 * This creates NO second grading authority: nothing here decides whether the
 * learner was right. `gradeMcqAnswer` still does that, server-side, against the
 * persisted pending probe.
 *
 * ── WHY MATCHING ON THE STEM IS DETERMINISTIC ───────────────────────────────
 * `probeToMcq` (src/lib/teaching/gateAssessment.ts) is the single choke point
 * where an authored probe becomes a learner-facing question. It sets
 * `question = stripAuthoringLabel(probe.stem)` and
 * `options = choices.map(c => c.text.trim())`, IN AUTHORED ORDER, and refuses
 * any probe that does not have exactly one `isCorrect` choice. So the served
 * question is a pure function of the authored stem, and this module reuses the
 * real `stripAuthoringLabel` rather than reimplementing it.
 *
 * MEASURED on the corpus production is actually seeded from (physics +
 * chemistry, 2026-09-03): 2,239 gradeable closed-choice probes, 2,239 DISTINCT
 * normalised stems — zero collisions, so a match is unique by construction
 * rather than by hope. `indexFrom` re-checks this on every run and refuses to
 * answer any stem that is not unique, so a future authoring collision degrades
 * to UNMEASURED instead of to a coin flip.
 *
 * ── UNMEASURED IS A FIRST-CLASS ANSWER ──────────────────────────────────────
 * A model-authored MCQ tag has no authored identity and is not in this corpus.
 * There is no honest way for the instrument to answer it, so it does not try.
 * Every failure mode returns a typed reason and the caller must classify the
 * concept UNMEASURED — never a product failure, never a guess.
 */

import { stripAuthoringLabel } from '../../src/lib/teaching/gateProbeContract'

/** The learner-visible projection of a served probe — all the harness gets. */
export interface ServedMcq {
  question?: string
  options?: string[]
  /**
   * Present only if production regresses and starts shipping the key again.
   * Declared so a test can assert the harness never reads it, and so such a
   * regression is visible rather than silently convenient.
   */
  correctIndex?: number
}

export type AnswerFailure =
  /** The payload was not a usable question at all. */
  | 'malformed-mcq'
  /** No authored probe in the corpus has this stem (e.g. a model-authored question). */
  | 'no-authored-match'
  /** Two authored probes share this stem and disagree — refuse rather than pick. */
  | 'ambiguous-authored-match'
  /** The stem matched but the served options are not the authored ones. */
  | 'options-mismatch'

export type AnswerResolution =
  | { ok: true; optionText: string; conceptId: string; assetStem: string }
  | { ok: false; reason: AnswerFailure; detail: string }

interface IndexEntry {
  conceptId: string
  /** The authored correct choice text, trimmed exactly as probeToMcq trims it. */
  correctText: string
  stem: string
}

export interface AnswerIndex {
  /** normalised question -> entry, or null when the stem is not unique. */
  byQuestion: Map<string, IndexEntry | null>
  /** Counts, for the measurement identity artifact. */
  stats: { probes: number; distinctStems: number; collisions: number }
  /** Stable fingerprint of the answer source, recorded with every result. */
  fingerprint: string
}

/** The one normalisation used on both sides of every comparison. */
export function normaliseQuestion(text: string): string {
  return text.replace(/\s+/g, ' ').trim().toLowerCase()
}

export interface CorpusProbe {
  conceptId?: string
  stem?: string
  choices?: Array<{ text?: string; isCorrect?: boolean }>
}

/**
 * Load the authored probe corpus.
 *
 * The module list is deliberately the SAME list `src/instrumentation.ts`'s
 * cold-start bootstrap assembles, because that bootstrap is what actually
 * writes production's ACTIVE probes. Adding a module here that production is
 * not seeded from would let the harness answer a question production cannot
 * serve; omitting one would make answerable probes look UNMEASURED.
 */
async function loadCorpus(): Promise<CorpusProbe[]> {
  const [brain, authored, chem, physBand, physDepth, chemDepth] = await Promise.all([
    import('../../src/lib/teaching/assets/brainSeedAssets'),
    import('../../src/lib/teaching/assets/authoredSeedAssets'),
    import('../../src/lib/teaching/assets/chemistrySeedAssets'),
    import('../../src/lib/teaching/assets/physicsBandGapAssets'),
    import('../../src/lib/teaching/assets/physicsDepthSeedAssets'),
    import('../../src/lib/teaching/assets/chemistryDepthSeedAssets'),
  ])
  return [
    ...(brain as unknown as { SEED_PROBES: CorpusProbe[] }).SEED_PROBES,
    ...(authored as unknown as { AUTHORED_PROBES: CorpusProbe[] }).AUTHORED_PROBES,
    ...(chem as unknown as { CHEMISTRY_PROBES: CorpusProbe[] }).CHEMISTRY_PROBES,
    ...(physBand as unknown as { PHYSICS_BAND_GAP_PROBES: CorpusProbe[] }).PHYSICS_BAND_GAP_PROBES,
    ...(physDepth as unknown as { PHYSICS_DEPTH_PROBES: CorpusProbe[] }).PHYSICS_DEPTH_PROBES,
    ...(chemDepth as unknown as { CHEMISTRY_DEPTH_PROBES: CorpusProbe[] }).CHEMISTRY_DEPTH_PROBES,
  ]
}

/**
 * Build the index. `probes` is injectable so the tests can state a corpus
 * inline instead of asserting against 3,000 authored rows they did not write.
 */
export function indexFrom(probes: readonly CorpusProbe[]): AnswerIndex {
  const byQuestion = new Map<string, IndexEntry | null>()
  let usable = 0
  let collisions = 0

  for (const p of probes) {
    // The same admission rules probeToMcq applies. A probe it would refuse is
    // a probe production can never serve, so indexing it would only create
    // phantom answers.
    const choices = p.choices
    if (!Array.isArray(choices) || choices.length < 2 || choices.length > 4) continue
    const correct = choices.filter((c) => c?.isCorrect === true)
    if (correct.length !== 1) continue
    const options = choices.map((c) => (typeof c?.text === 'string' ? c.text.trim() : ''))
    if (options.some((o) => o.length === 0)) continue
    const question = normaliseQuestion(stripAuthoringLabel(p.stem ?? ''))
    if (!question) continue
    const correctText = (correct[0].text ?? '').trim()
    if (!correctText) continue

    usable++
    const entry: IndexEntry = { conceptId: p.conceptId ?? '', correctText, stem: p.stem ?? '' }
    if (!byQuestion.has(question)) {
      byQuestion.set(question, entry)
      continue
    }
    const existing = byQuestion.get(question)
    // Identical stem AND identical answer is a duplicate, not an ambiguity —
    // the same authored question banded twice answers the same way. Anything
    // else is poisoned and the stem is disabled for the whole run.
    if (existing && normaliseQuestion(existing.correctText) === normaliseQuestion(correctText)) continue
    byQuestion.set(question, null)
    collisions++
  }

  const distinctStems = [...byQuestion.values()].filter((v) => v !== null).length
  // Order-independent so the fingerprint does not change when a corpus module
  // is re-ordered without its content changing.
  const fingerprint = fingerprintOf([...byQuestion.keys()].sort(), usable)
  return { byQuestion, stats: { probes: usable, distinctStems, collisions }, fingerprint }
}

function fingerprintOf(keys: readonly string[], probes: number): string {
  // djb2 — this is an identity marker for an artifact, not a security hash, and
  // keeping it dependency-free keeps the harness importable anywhere.
  let h = 5381
  for (const k of keys) {
    for (let i = 0; i < k.length; i++) h = ((h * 33) ^ k.charCodeAt(i)) >>> 0
  }
  return `probes:${probes}:h${h.toString(16)}`
}

export async function buildAnswerIndex(): Promise<AnswerIndex> {
  return indexFrom(await loadCorpus())
}

/**
 * Resolve the option text a competent learner would tap.
 *
 * NEVER returns a letter, an index, or a fabricated string: the only value it
 * can produce is an option the server itself just sent, which is the same thing
 * the client submits when a learner taps a choice.
 */
export function resolveAnswer(
  mcq: ServedMcq | null | undefined,
  index: AnswerIndex,
): AnswerResolution {
  if (!mcq || typeof mcq.question !== 'string' || !Array.isArray(mcq.options)) {
    return { ok: false, reason: 'malformed-mcq', detail: 'payload carried no question/options' }
  }
  const served = mcq.options.filter((o): o is string => typeof o === 'string').map((o) => o.trim())
  if (served.length < 2 || served.some((o) => o.length === 0)) {
    return { ok: false, reason: 'malformed-mcq', detail: `served ${served.length} usable option(s)` }
  }
  const key = normaliseQuestion(mcq.question)
  if (!key) return { ok: false, reason: 'malformed-mcq', detail: 'empty question' }
  if (!index.byQuestion.has(key)) {
    return { ok: false, reason: 'no-authored-match', detail: mcq.question.slice(0, 160) }
  }
  const entry = index.byQuestion.get(key)
  if (!entry) {
    return { ok: false, reason: 'ambiguous-authored-match', detail: mcq.question.slice(0, 160) }
  }
  // The authored answer must be ON SCREEN. If the served options are not the
  // authored ones, the served probe is not the probe this entry describes —
  // matching stems is not enough to justify submitting an answer.
  const servedNorm = served.map(normaliseQuestion)
  const target = normaliseQuestion(entry.correctText)
  const at = servedNorm.indexOf(target)
  if (at < 0) {
    return {
      ok: false,
      reason: 'options-mismatch',
      detail: `authored answer "${entry.correctText}" absent from the served options`,
    }
  }
  if (servedNorm.filter((o) => o === target).length !== 1) {
    return { ok: false, reason: 'options-mismatch', detail: 'served options repeat the authored answer' }
  }
  // Return the SERVED spelling, not the authored one, so what is submitted is
  // byte-identical to something the learner could have tapped.
  return { ok: true, optionText: served[at], conceptId: entry.conceptId, assetStem: entry.stem }
}

/**
 * The persona reply strategies (I-5).
 *
 * A persona decides ONLY what to send back. It never mocks a response, never
 * bypasses grading, and never inspects anything a learner could not see — so
 * every persona run exercises the real teaching and grading path end to end.
 * Kept beside the answer source because three of the four are defined by how
 * they use it.
 */
export type PersonaId = 'competent' | 'confused' | 'confidently-wrong' | 'off-topic'

export interface PersonaReply {
  /** What to POST as the learner's message, or null when the persona cannot answer. */
  message: string | null
  /** Why, for the artifact. 'authored-correct' | 'authored-wrong' | 'scripted' | 'unmeasured'. */
  kind: 'authored-correct' | 'authored-wrong' | 'scripted' | 'unmeasured'
  /** Set when message is null: the reason the concept must be UNMEASURED. */
  failure?: AnswerFailure
}

/**
 * WHAT EACH PERSONA IS FOR — the intended learner-state path, stated so a
 * result can be read against an intention rather than a vibe.
 *
 *  competent          the control. Answers every authored probe correctly.
 *                     Establishes that the ladder closes when the learner
 *                     cooperates; without it no other persona's failure can be
 *                     attributed to the persona.
 *  confused           repeated genuine confusion. Exercises the affect budget,
 *                     the recovery path, and remediation — the path that has
 *                     twice produced real abandonment defects.
 *  confidently-wrong  answers an authored probe with a WRONG option, stated
 *                     confidently. The only persona that reaches the
 *                     misconception-repair quadrant and the affirmation floor.
 *  off-topic          names a topic the lesson is not about. The only persona
 *                     that exercises concept resolution and the excursion
 *                     lifecycle.
 */
const CONFUSED_LINES = [
  'sorry i dont understand this',
  'i am still confused, can you explain it another way please',
  'i really dont understand, can you show me a picture',
]

const OFF_TOPIC_LINES = [
  'what is thermal conductivity?',
  'can you explain how a catalyst works',
]

export function personaReply(
  persona: PersonaId,
  mcq: ServedMcq | null | undefined,
  index: AnswerIndex,
  turnIndex: number,
): PersonaReply {
  // A persona that is offered a graded question and ignores it is not testing
  // the assessment path, so every persona answers a probe when one is on
  // screen; they differ in WHICH option and in what they say otherwise.
  if (mcq) {
    const resolved = resolveAnswer(mcq, index)
    if (!resolved.ok) return { message: null, kind: 'unmeasured', failure: resolved.reason }
    if (persona === 'confidently-wrong') {
      const wrong = (mcq.options ?? [])
        .map((o) => (typeof o === 'string' ? o.trim() : ''))
        .find((o) => o.length > 0 && normaliseQuestion(o) !== normaliseQuestion(resolved.optionText))
      // A two-option probe where the only other option is unusable leaves this
      // persona nothing to be wrong with; UNMEASURED rather than answer right
      // and silently become the competent persona.
      if (!wrong) return { message: null, kind: 'unmeasured', failure: 'options-mismatch' }
      return { message: wrong, kind: 'authored-wrong' }
    }
    return { message: resolved.optionText, kind: 'authored-correct' }
  }

  if (persona === 'confused') {
    return { message: CONFUSED_LINES[turnIndex % CONFUSED_LINES.length], kind: 'scripted' }
  }
  if (persona === 'off-topic') {
    return { message: OFF_TOPIC_LINES[turnIndex % OFF_TOPIC_LINES.length], kind: 'scripted' }
  }
  // competent and confidently-wrong both simply keep the lesson moving when
  // nothing is being asked. 'ready' is not learner-shaped, and D3 must stay
  // diagnostic because of it — see the protocol.
  return { message: 'ready', kind: 'scripted' }
}
