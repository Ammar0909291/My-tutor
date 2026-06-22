/**
 * visualizationDecision — Teaching Visualization Engine, PART 1: the DECISION layer.
 *
 * Given a piece of generated tutor explanation text, decide (a) whether it should be
 * visualized at all, and (b) if so, what COARSE category of visual it warrants.
 *
 * This is a pure, deterministic, scored heuristic — NO LLM call, no network, no I/O.
 * It mirrors the existing deterministic philosophy of `src/lib/school/visuals/detectVisual.ts`
 * ("Deterministic keyword match — no AI, no network call"), but operates on the *generated
 * explanation text* (post-hoc) rather than the curriculum title (pre-hoc), and outputs the
 * generic `SceneSpec.SceneType` vocabulary rather than a component-specific VisualType.
 *
 * It does NOT generate a SceneSpec, does NOT touch the renderer, and is NOT wired into any
 * production lesson path. Part 1 ends at this function + its standalone test harness.
 */

import type { SceneType } from './sceneSpec'

/**
 * Visual category — intentionally the SAME set as SceneSpec.SceneType, plus 'none'.
 * So a Part-1 decision drops straight into SceneSpec.sceneType later, no translation.
 */
export type VisualCategory = SceneType | 'none'

export interface VisualizationDecision {
  /** Top-level gate. `false` ⇔ category === 'none'. */
  shouldVisualize: boolean
  /** Which kind of visual; 'none' iff !shouldVisualize. */
  category: VisualCategory
  /** 0–1. Seam for a FUTURE low-confidence LLM tie-breaker; not wired to anything in v1. */
  confidence: number
  /** Human-readable trace of which signals fired — drives the harness output and debugging. */
  reasoning: string
}

/** The five visualizable categories, in fixed priority order for deterministic tie-breaking. */
const CATEGORY_PRIORITY: SceneType[] = ['simulation', 'process', 'comparison', 'plot', 'diagram']

/**
 * A signal tier. By default a tier fires once (counts `weight` no matter how many of its
 * patterns match) to stop repetition inflating a score. A tier with `countEach` instead adds
 * `weight` per DISTINCT matching pattern, up to `cap` — used where multiple independent cues
 * are genuinely independent evidence (e.g. two separate "X than Y" contrasts in one sentence).
 */
type Signal = { weight: number; patterns: RegExp[]; countEach?: boolean; cap?: number }

/**
 * Per-category signal tables. Each pattern is matched against the lowercased explanation.
 * Weights are small integers; a category's score is the sum of weights of patterns that fire
 * (each pattern counts once, regardless of how many times it appears, to avoid runaway scores
 * from repetition). Tuned so a single strong cue ≈ threshold, two cues ≈ confident.
 */
const CATEGORY_SIGNALS: Record<SceneType, Signal[]> = {
  // Motion / time-evolution / dynamics — something changes over time.
  simulation: [
    { weight: 3, patterns: [/\btrajector/, /\boscillat/, /\bprojectile\b/, /\bpendulum\b/, /\bswings?\b/, /\borbit/] },
    { weight: 2, patterns: [/\bmoves?\b/, /\bmoving\b/, /\btravels?\b/, /\baccelerat/, /\bdeceler/, /\bvelocit/, /\bcollides?\b/, /\bcollision\b/, /\bfalls?\b/, /\bfalling\b/, /\brotat/, /\bspins?\b/, /\bbounces?\b/] },
    { weight: 2, patterns: [/\bover time\b/, /\bas time\b/, /\beach second\b/, /\bevery second\b/, /\bspeeds? up\b/, /\bslows? (?:down|at)\b/] },
  ],
  // Ordered sequence / causal chain / cycle — discrete steps, one after another.
  process: [
    { weight: 3, patterns: [/\bfirst\b[\s\S]*\bthen\b/, /\bstep\s*\d/, /\bstages?\b/, /\bcycle\b/] },
    { weight: 2, patterns: [/\bthen\b/, /\bnext\b/, /\bafter that\b/, /\bfinally\b/, /\bfollowed by\b/] },
    { weight: 2, patterns: [/\bleads? to\b/, /\bresults? in\b/, /\bcauses?\b/, /\bso that\b/, /\bwhich (?:then|in turn)\b/, /\bflows? (?:through|into)\b/] },
  ],
  // Contrasting two or more things side by side.
  comparison: [
    { weight: 3, patterns: [/\bwhereas\b/, /\bversus\b/, /\bvs\.?\b/, /\bcompared (?:to|with)\b/, /\bdifference between\b/, /\bon the other hand\b/] },
    { weight: 2, patterns: [/\bwhile\b[\s\S]*\b(?:the other|another|it)\b/, /\bunlike\b/, /\bin contrast\b/, /\bboth\b[\s\S]*\bbut\b/] },
    { weight: 2, countEach: true, cap: 4, patterns: [/\bmore than\b/, /\bless than\b/, /\bbetter than\b/, /\bworse than\b/, /\bfaster than\b/, /\bslower than\b/, /\bhigher than\b/, /\blower than\b/] },
  ],
  // Quantitative relationship between variables — a curve/graph would show it.
  plot: [
    { weight: 3, patterns: [/\bas\b[\s\S]*\bincreases?\b[\s\S]*\b(?:increases?|decreases?|rises?|falls?|doubles?)\b/, /\bas\b[\s\S]*\bdecreases?\b[\s\S]*\b(?:increases?|decreases?|rises?|falls?)\b/, /\bproportional\b/, /\binversely proportional\b/] },
    { weight: 2, patterns: [/\bplotted?\b/, /\bgraph of\b/, /\bon (?:the|a) (?:x|y)-axis\b/, /\baxis\b/, /\bagainst (?:the\s)?(?:time|temperature|distance|pressure|volume)\b/] },
    { weight: 2, patterns: [/\brate of change\b/, /\bfunction of\b/, /\brelationship between\b[\s\S]*\band\b/, /\bcurve\b/, /\bslope\b/] },
  ],
  // Static spatial structure — parts, arrangement, what-connects-to-what.
  diagram: [
    { weight: 2, patterns: [/\bconsists? of\b/, /\bmade up of\b/, /\bcomposed of\b/, /\bparts?\b/, /\bcomponents?\b/, /\bstructure\b/] },
    { weight: 2, patterns: [/\bsurrounded by\b/, /\bin the (?:center|centre|middle)\b/, /\babove\b/, /\bbelow\b/, /\binside\b/, /\boutside\b/, /\bbetween\b/, /\bconnected to\b/, /\battached to\b/, /\bboundary\b/] },
    { weight: 1, patterns: [/\barranged\b/, /\blocated\b/, /\bpositioned\b/, /\blayers?\b/, /\bsurrounds?\b/] },
  ],
}

/**
 * Suppression signals — when the turn is NOT an explanation that benefits from a visual.
 * Mirrors buildVisualsSystemBlock's rules ("Do not add VISUAL if your response is a question,
 * correction, or short reply"). Any match here forces 'none' regardless of category scores.
 */
const MIN_WORDS = 12
const QUESTION_CUES: RegExp[] = [
  /\bcan you\b/, /\bcould you\b/, /\bwhat do you think\b/, /\btell me\b/, /\btry (?:again|to)\b/,
  /\bwhat happens (?:if|when)\b/, /\byour turn\b/, /\bbefore we (?:continue|move)\b/,
]
const ACK_CORRECTION_CUES: RegExp[] = [
  /\bexactly right\b/, /\bwell done\b/, /\bgood job\b/, /\bperfect\b/, /\byou(?:'ve| have) got it\b/,
  /\bnot quite\b/, /\bnot exactly\b/, /\bthat(?:'s| is) (?:incorrect|wrong)\b/, /\byou flipped\b/,
]

/**
 * Discourse markers that contain sequence/contrast TRIGGER words ("first… then", "then") but are
 * purely conversational, not a real process. Neutralized BEFORE scoring so they cannot fire the
 * process signals. (Fixes the "First of all… Then again…" adversarial case.)
 */
const DISCOURSE_MARKERS: RegExp[] = [/\bfirst of all\b/g, /\bthen again\b/g]

/**
 * Second-person-pronoun density gate. A turn saturated with "you/your/yourself" is almost always
 * personal encouragement/meta-talk ("you're picking this up faster than…"), not a teachable
 * explanation — even when it happens to contain comparative words. Suppresses to 'none'.
 * (Fixes the "faster than / lower than" encouragement adversarial case.)
 *
 * KNOWN v1 LIMITATION — three messy/adversarial cases are deliberately NOT handled by pure regex
 * and are left for the confidence-based LLM tie-breaker (the `confidence` seam) in a future pass:
 *   1. "Roe versus Wade" — a proper noun that contains a comparison trigger word.
 *   2. "as you get comfortable, your confidence increases…" — the as-X-increases-Y pattern firing
 *      on a non-quantitative subject (feelings), which a regex can't distinguish from a real plot.
 *   3. "Remember the diagram I showed you before…" — references an already-shown visual; a stateless
 *      text layer fundamentally cannot know a visual already exists. Must be handled with session
 *      state at Part 2 wiring time, not here.
 */
const SECOND_PERSON_DENSITY_THRESHOLD = 4

function countMatches(lower: string, signals: Signal[]): { score: number; hits: string[] } {
  let score = 0
  const hits: string[] = []
  for (const sig of signals) {
    if (sig.countEach) {
      let tierScore = 0
      for (const p of sig.patterns) {
        if (p.test(lower)) {
          tierScore += sig.weight
          hits.push(`${p.source} (+${sig.weight})`)
          if (sig.cap != null && tierScore >= sig.cap) break
        }
      }
      score += sig.cap != null ? Math.min(tierScore, sig.cap) : tierScore
    } else {
      for (const p of sig.patterns) {
        if (p.test(lower)) {
          score += sig.weight
          hits.push(`${p.source} (+${sig.weight})`)
          break // count each weight-tier once per category to avoid runaway repetition
        }
      }
    }
  }
  return { score, hits }
}

/** Minimum top-category score required before we visualize at all. */
const SCORE_THRESHOLD = 3

/**
 * Decide whether & how to visualize a piece of tutor explanation text.
 * Pure and deterministic: same input → same output, always.
 */
export function decideVisualization(explanationText: string): VisualizationDecision {
  const text = (explanationText ?? '').trim()
  const lower = text.toLowerCase()
  const wordCount = text.length === 0 ? 0 : text.split(/\s+/).length

  // ── Suppression gate ──
  if (wordCount < MIN_WORDS) {
    return { shouldVisualize: false, category: 'none', confidence: 0.9, reasoning: `too short (${wordCount} words < ${MIN_WORDS})` }
  }
  const questionHit = QUESTION_CUES.find((p) => p.test(lower))
  if (questionHit && /\?/.test(text)) {
    return { shouldVisualize: false, category: 'none', confidence: 0.8, reasoning: `question turn (cue ${questionHit.source}, has '?')` }
  }
  const ackHit = ACK_CORRECTION_CUES.find((p) => p.test(lower))
  if (ackHit && wordCount < 30) {
    return { shouldVisualize: false, category: 'none', confidence: 0.75, reasoning: `acknowledgement/correction turn (cue ${ackHit.source}, ${wordCount} words)` }
  }
  const secondPersonCount = (lower.match(/\b(?:you|your|yourself)\b/g) ?? []).length
  if (secondPersonCount >= SECOND_PERSON_DENSITY_THRESHOLD) {
    return { shouldVisualize: false, category: 'none', confidence: 0.7, reasoning: `second-person encouragement (you/your ×${secondPersonCount} >= ${SECOND_PERSON_DENSITY_THRESHOLD})` }
  }

  // Neutralize conversational discourse markers before scoring so they can't fire process cues.
  let scoringText = lower
  for (const m of DISCOURSE_MARKERS) scoringText = scoringText.replace(m, ' ')

  // ── Score every category ──
  const scored = CATEGORY_PRIORITY.map((cat) => {
    const { score, hits } = countMatches(scoringText, CATEGORY_SIGNALS[cat])
    return { cat, score, hits }
  })

  // Pick the top score; ties broken by CATEGORY_PRIORITY order (scored is already in that order,
  // so a strict > keeps the earliest/highest-priority category on a tie).
  let top = scored[0]
  for (const s of scored) if (s.score > top.score) top = s
  const runnerUp = scored.filter((s) => s.cat !== top.cat).reduce((m, s) => (s.score > m.score ? s : m), { cat: 'none' as VisualCategory, score: 0, hits: [] as string[] })

  if (top.score < SCORE_THRESHOLD) {
    return {
      shouldVisualize: false,
      category: 'none',
      confidence: Math.min(0.7, 0.4 + (SCORE_THRESHOLD - top.score) * 0.1),
      reasoning: `no category cleared threshold (best: ${top.cat} ${top.score} < ${SCORE_THRESHOLD})`,
    }
  }

  // Confidence: blends absolute strength (capped ~score 6) with the margin over the runner-up,
  // so a clear, unambiguous winner scores higher than a narrow one.
  const strength = Math.min(1, top.score / 6)
  const margin = Math.min(1, (top.score - runnerUp.score) / 4)
  const confidence = Math.round((0.55 * strength + 0.45 * margin) * 100) / 100

  return {
    shouldVisualize: true,
    category: top.cat,
    confidence,
    reasoning: `${top.cat} score ${top.score} [${top.hits.join(', ')}]; runner-up ${runnerUp.cat} ${runnerUp.score}`,
  }
}
