/**
 * The Visualization Engine — runtime generation, under the same safety contract.
 *
 * WHY THIS EXISTS. After the 2026-08-08 semantic-safety fix, a concept either
 * had a curated binding / scene generator (496 of 1,775) or got no figure at
 * all. That is safe but leaves 72% of the curriculum text-only. The answer is
 * NOT to bring back the Educational Archetype Engine, which chose a figure by
 * keyword-matching the concept's SHAPE and produced a quantum wavefunction for
 * English phonics. The answer is to GENERATE a figure for the actual concept
 * and then refuse to use it unless it passes validation.
 *
 * WHAT IT REUSES (no new engine was written):
 *   - the SceneSpec model and its structural validator (validateSceneSpec) —
 *     the same validation the client renderer relies on,
 *   - the same JSON generation client as every other structured LLM call,
 *   - the existing VisualizationCache table, under a namespaced key, so a
 *     concept costs at most ONE generation for the entire platform, ever,
 *   - the same feature flag the drafted AI scene generator already used
 *     (ENABLE_AI_SCENE_GENERATION), so there is one switch, not two.
 *
 * WHAT MAKES IT SAFE, and the difference from the archetype engine:
 *   - it is seeded from the RESOLVED CONCEPT's own id, title and description —
 *     never from the tutor's prose, never from a keyword table,
 *   - the result must pass structural validation, must actually draw something,
 *     must narrate, and must be LEXICALLY ANCHORED to the concept it claims to
 *     depict. A scene that shares no vocabulary with the concept is rejected,
 *     which is precisely the check that would have caught "Wave Function ψ(x)"
 *     for Phonemic Awareness,
 *   - every rejection returns NO FIGURE. Nothing is ever substituted.
 */

import { generateJSON } from '@/lib/ai/client'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { isRuntimeSceneGenerationAllowed } from './flag'
import {
  getCachedVisualization, saveVisualization, type VisualizationCacheClient,
} from '@/lib/teaching/visuals/visualizationCache'
import { buildConceptIndexFromKnowledgeGraph } from '@/lib/teaching/concept/conceptIndexSource'
import type { ConceptIndexEntry } from '@/lib/teaching/concept/conceptUnderstanding'
import type { SceneObject, SceneSpec } from '@/lib/teaching/sceneSpec'
import { parseVisualSpec, SUPPORTED_VISUAL_TYPES, type VisualSpec } from '@/lib/visuals/visualSpec'
import type { ArchetypeContext } from './archetypes'
import { resolveServicePolicy, servesImmediately, type ServicePolicy } from './generationPolicy'
import { recordGenerationOutcome, type GenerationOutcomeSink } from './generationOutcome'

/** Cache namespace. Disjoint from the dynamic-code engine's own keys. */
const CACHE_PREFIX = 'scene:v1:'

/**
 * Object types SceneSpecRenderer actually paints, read from its switch:
 * point/node/particle -> MolecularNode3D, vector/arrow -> Vector3D,
 * label -> Html text, path/trajectory -> marker group, bond -> BondLine.
 * bar and surface hit the default branch and return null — they are NOT drawn
 * and must never count toward anything.
 */
const DRAWN: ReadonlySet<SceneObject['type']> = new Set<SceneObject['type']>([
  'point', 'particle', 'node', 'vector', 'arrow', 'bond', 'label', 'path', 'trajectory',
])

/**
 * Drawn objects that carry GEOMETRY rather than just text. A `label` is a
 * floating string, so a scene made only of labels is text, not a figure — the
 * anchor requires the scene to contain objects from this set. It does NOT
 * require the concept's words to sit ON them; see isAnchoredToConcept for the
 * measurement that changed that.
 */
const GEOMETRIC: ReadonlySet<SceneObject['type']> = new Set<SceneObject['type']>([
  'point', 'particle', 'node', 'vector', 'arrow', 'bond', 'path', 'trajectory',
])

/**
 * Output budget for one scene.
 *
 * MEASURED: at 1400 the model's JSON was TRUNCATED mid-object on a richer
 * concept (bio.cell.mitosis, cut at ~3.9k characters), which surfaces as an
 * unparseable response and a silent `generation-failed` — indistinguishable
 * from a provider outage. A cap costs nothing unless the model actually writes
 * up to it, so the honest setting is one that fits the largest legitimate
 * scene rather than one that quietly truncates the most detailed concepts.
 */
const MAX_SCENE_TOKENS = 3000

/**
 * How long a learner's turn may wait for a figure that does not exist yet.
 *
 * Generation runs INLINE on the first turn that reaches an uncurated concept,
 * so the first learner pays the full model latency mid-lesson. Measured on
 * gemini-3.5-flash-lite, a scene takes 2.0-4.2s — acceptable, until the day a
 * provider is slow and a teaching turn hangs behind it.
 *
 * The budget makes the failure mode explicit and cheap: exceed it and the turn
 * proceeds with NO FIGURE, which this engine already treats as an ordinary
 * successful outcome rather than an error. The generation is not cancelled —
 * nothing can un-send an HTTP request — it is simply no longer waited for, and
 * whatever it produces still reaches the cache for the next learner.
 *
 * Warming (see sceneWarming.ts) is what removes the wait entirely; this is the
 * guard for the concepts warming has not reached yet.
 */
const ON_TURN_BUDGET_MS = 8000

const MIN_DRAWN_OBJECTS = 2

/** Distinct anchored objects required before a scene is believed. */
const MIN_ANCHORED_OBJECTS = 2

/**
 * Geometry a scene must actually contain before its labels mean anything.
 * Two, matching MIN_ANCHORED_OBJECTS: one shape and one caption is a diagram of
 * nothing, and every authored figure in the corpus carries far more.
 */
const MIN_GEOMETRIC_OBJECTS = 2

/**
 * How much more strongly another concept may match the object labels before
 * the scene is treated as depicting that other concept.
 *
 * Calibrated once, by measurement, against the 1,320-evaluation matrix — not
 * tuned per case. Margin 1 caught 40 more mixed-content scenes but began
 * rejecting correct ones: a faithful catalysis figure labelled "catalysis /
 * homogeneous / heterogeneous" lost to a more specific SIBLING concept. A
 * neighbouring concept scoring higher is not evidence of a wrong figure, so
 * the margin stays at 2 and the residual mixed-content case is reported as a
 * known limit rather than paid for with false rejections of correct figures.
 */
const CROSS_CONCEPT_MARGIN = 2

/** Words too common to prove a scene is about anything in particular. */
const STOPWORDS = new Set([
  'the', 'and', 'for', 'with', 'that', 'this', 'from', 'into', 'their', 'them',
  'are', 'was', 'were', 'have', 'has', 'its', 'itself', 'between', 'through',
  'using', 'used', 'use', 'how', 'why', 'what', 'when', 'where', 'which',
  'concept', 'concepts', 'idea', 'ideas', 'example', 'examples', 'understand',
  'understanding', 'learn', 'learning', 'study', 'basic', 'basics', 'introduction',
  'diagram', 'figure', 'visual', 'visualization', 'scene', 'step', 'steps', 'show',
])

export type EngineRejection =
  | 'flag-off'
  | 'budget-exceeded'
  | 'no-source-text'
  | 'generation-failed'
  | 'structurally-invalid'
  | 'nothing-drawable'
  | 'no-narration'
  | 'not-anchored-to-concept'

export type EngineResult =
  | { ok: true; scene: SceneSpec; cached: boolean }
  | { ok: false; reason: EngineRejection }

// ── semantic validation ──────────────────────────────────────────────────────

function contentWords(text: string, keepGeneric = false): Set<string> {
  const out = new Set<string>()
  for (const w of text.toLowerCase().replace(/[^a-z0-9\s]+/g, ' ').split(/\s+/)) {
    if (w.length < 4) continue
    // The stopword list exists to stop generic SCENE text proving anything.
    // A concept's own title is the thing being anchored TO, so it keeps every
    // word: "Print Concepts" must not be reduced to "print" and then fail for
    // having only one usable word.
    if (!keepGeneric && STOPWORDS.has(w)) continue
    // Fold a trailing plural so "vectors" anchors to "vector".
    out.add(w.endsWith('s') && w.length > 4 ? w.slice(0, -1) : w)
  }
  return out
}

/** Every drawn object, paired with its own label text. */
function drawnObjects(scene: SceneSpec): SceneObject[] {
  return (scene.steps ?? []).flatMap((s) => s.objects ?? []).filter((o) => DRAWN.has(o.type))
}

/**
 * Is this scene demonstrably ABOUT the concept it was generated for?
 *
 * MEASURED FAILURE THIS REPLACES (2026-08-08, 480-evaluation experiment):
 * anchoring on the whole scene text — title, teachingGoal, ariaLabel,
 * narration and labels together — accepted 120 of 120 deliberately adversarial
 * scenes. Those scenes named the target concept in the title and narration
 * while every drawn object belonged to a different concept. Title and narration
 * are free text the generator controls, so echoing the concept name is the
 * cheapest possible way to pass, which is exactly what a weak generation does.
 *
 * The anchor is therefore computed ONLY over the labels of objects the renderer
 * actually paints. Title, teachingGoal, ariaLabel and narration are ignored
 * entirely: they are what the learner is TOLD, and the question here is what
 * the learner is SHOWN.
 *
 * Three independent conditions must hold:
 *   1. at least two DISTINCT drawn objects whose own text matches the concept's
 *      vocabulary;
 *   2. the scene actually CONTAINS geometry — at least two drawn objects that
 *      are not floating text (a pair of labels is text, not a figure);
 *   3. no other KG concept matches those labels substantially better than the
 *      target does (see crossConceptChallenger).
 *
 * WHY (2) IS ABOUT THE SCENE AND NOT ABOUT THE MATCHED TEXT — measured.
 * This clause used to require that the CONCEPT'S VOCABULARY sit in the `text`
 * of a geometry-bearing object. Run against this repository's own authored,
 * browser-verified gold standard, that rejected 7 of 7 M4 pilot figures —
 * including one carrying four correct concept labels — because the authored
 * corpus deliberately puts text on standalone `label` objects. physicsPilot's
 * own authoring rules say why: "Arrow/bond text is avoided: it renders at the
 * midpoint, on top of the thing it describes."
 *
 * So the old clause contradicted the engine's own authoring guidance and was a
 * false-reject machine, not a quality filter. The intent it was protecting —
 * "floating labels alone are not a figure" — is preserved exactly: a scene of
 * text with no geometry still fails, because the geometry is now counted
 * directly instead of being inferred from where the words happen to sit.
 */
export function isAnchoredToConcept(scene: SceneSpec, ctx: ArchetypeContext): boolean {
  return anchorReport(scene, ctx).anchored
}

export interface AnchorReport {
  anchored: boolean
  /** Distinct anchored object labels, in scene order. */
  matchedLabels: string[]
  /**
   * Drawn objects that are not floating text. This is a property of the SCENE,
   * not of where the matched words sit — see the note on isAnchoredToConcept.
   */
  geometricObjects: number
  /** A better-matching concept, when one exists. */
  challenger: { conceptId: string; score: number; targetScore: number } | null
}

export function anchorReport(scene: SceneSpec, ctx: ArchetypeContext): AnchorReport {
  const conceptWords = new Set([...contentWords(ctx.title, true), ...contentWords(ctx.description)])

  const matched: string[] = []
  const seen = new Set<string>()
  let geometricObjects = 0

  for (const obj of drawnObjects(scene)) {
    if (GEOMETRIC.has(obj.type)) geometricObjects++
    const label = (obj.text ?? '').trim()
    if (!label) continue
    const key = label.toLowerCase()
    if (seen.has(key)) continue                 // repeating one label is one object
    // The label is tokenized WITHOUT the stopword filter, because the filter's
    // job is to stop generic words proving anything — and `conceptWords` is
    // already derived from this concept alone. A label reading "concepts" can
    // therefore only anchor a concept whose own title says "Concepts"
    // (eng.phonics.print-concepts), never a concept that merely mentions one.
    const words = contentWords(label, true)
    let hit = false
    for (const w of words) if (conceptWords.has(w)) { hit = true; break }
    if (!hit) continue
    seen.add(key)
    matched.push(label)
  }

  const challenger = crossConceptChallenger(scene, ctx)
  const anchored =
    matched.length >= MIN_ANCHORED_OBJECTS &&
    geometricObjects >= MIN_GEOMETRIC_OBJECTS &&
    challenger === null

  return { anchored, matchedLabels: matched, geometricObjects, challenger }
}

/**
 * NEGATIVE CROSS-CONCEPT CHECK.
 *
 * Passing the positive anchor is not proof, because a scene can carry the
 * target's vocabulary AND another concept's content at the same time. This asks
 * the opposite question: of every concept in the canonical KGs, does one match
 * these object labels substantially better than the target?
 *
 * SCORE, deterministic and documented:
 *   score(concept) = number of DISTINCT content words from that concept's title
 *                    (and its registered aliases) that appear in the drawn
 *                    object labels.
 * The existing concept index is the only source — no second graph is built, no
 * KG data is modified, no model is called.
 *
 * A challenger is returned when  score(other) >= score(target) + 2. The margin
 * tolerates incidental overlap (a "vector" label in a momentum scene) while
 * catching a scene whose labels are demonstrably another concept's. Ties and
 * equal scores never produce a challenger, and the winner is chosen by score
 * then by conceptId, so the result cannot depend on index ordering.
 */
export function crossConceptChallenger(
  scene: SceneSpec,
  ctx: ArchetypeContext,
): { conceptId: string; score: number; targetScore: number } | null {
  const labelWords = new Set<string>()
  for (const obj of drawnObjects(scene)) {
    for (const w of contentWords(obj.text ?? '')) labelWords.add(w)
  }
  if (labelWords.size === 0) return null

  const score = (words: ReadonlySet<string>): number => {
    let n = 0
    for (const w of words) if (labelWords.has(w)) n++
    return n
  }

  const targetScore = score(contentWords(ctx.title))
  let best: { conceptId: string; score: number } | null = null
  for (const entry of scoredIndex()) {
    if (entry.conceptId === ctx.conceptId) continue
    const s = score(entry.words)
    if (s === 0) continue
    if (!best || s > best.score || (s === best.score && entry.conceptId < best.conceptId)) {
      best = { conceptId: entry.conceptId, score: s }
    }
  }

  if (best && best.score >= targetScore + CROSS_CONCEPT_MARGIN) {
    return { conceptId: best.conceptId, score: best.score, targetScore }
  }
  return null
}

/**
 * The index is static in-memory KG data, and its titles tokenize to the same
 * words every time — so tokenize once per process rather than re-splitting
 * 1,775 titles on every validation. Measured: this is the whole cost of the
 * cross-concept check.
 */
let cachedIndex: readonly { conceptId: string; words: ReadonlySet<string> }[] | null = null
function scoredIndex(): readonly { conceptId: string; words: ReadonlySet<string> }[] {
  if (!cachedIndex) {
    cachedIndex = buildConceptIndexFromKnowledgeGraph().map((entry: ConceptIndexEntry) => ({
      conceptId: entry.conceptId,
      words: new Set([
        ...contentWords(entry.title),
        ...(entry.aliases ?? []).flatMap((a) => [...contentWords(a)]),
      ]),
    }))
  }
  return cachedIndex
}

/**
 * The full acceptance gate. Structural validity is the client's requirement;
 * the rest is the teaching requirement. Any failure means NO FIGURE — this
 * function never repairs, substitutes, or downgrades a scene.
 */
export function validateGeneratedScene(
  raw: unknown,
  ctx: ArchetypeContext,
): EngineResult {
  const structural = validateSceneSpec(raw)
  if (!structural.valid) return { ok: false, reason: 'structurally-invalid' }

  const scene = raw as SceneSpec
  const drawable = (scene.steps ?? []).flatMap((s) => s.objects ?? []).filter((o) => DRAWN.has(o.type))
  if (drawable.length < MIN_DRAWN_OBJECTS) return { ok: false, reason: 'nothing-drawable' }

  const narrated = (scene.steps ?? []).some((s) => (s.narration ?? '').trim().length > 0)
  if (!narrated) return { ok: false, reason: 'no-narration' }

  if (!isAnchoredToConcept(scene, ctx)) return { ok: false, reason: 'not-anchored-to-concept' }

  return { ok: true, scene, cached: false }
}

// ── generation ───────────────────────────────────────────────────────────────

/**
 * The prompt is built from the CONCEPT, never from the tutor's prose. That is
 * the structural difference from generateSceneSpec(), which summarises whatever
 * the model just said and therefore drifts with it.
 */
export function buildConceptScenePrompt(
  ctx: ArchetypeContext,
  /**
   * The turn's teaching PURPOSE, when known.
   *
   * STEP 4 finding: `purpose` is safe to pass — it is decided first, from the
   * teaching situation (learner asked to see something / third failed attempt /
   * archetype default), it exists for every turn, and it never depends on a
   * keyword table. `representation` is NOT passed: for an uncurated concept the
   * only way to obtain one is conceptRepresentations(), the archetype keyword
   * table that produced a quantum wavefunction for English phonics. Feeding
   * that back in would reintroduce the retired failure through the prompt.
   * Purpose is therefore supplied as GUIDANCE only; no hard sceneType gate is
   * added, because calibrating one requires real-model output that has not yet
   * been measured.
   */
  purpose?: string,
): string {
  const purposeLine = purpose ? `\nTeaching purpose for this turn: ${purpose}. Shape the figure to serve it.\n` : ''
  return `Generate a 3D teaching visualization for ONE specific curriculum concept.
${purposeLine}

Concept id: ${ctx.conceptId}
Concept title: ${ctx.title}
What it covers: ${ctx.description}

The figure must depict THIS concept and nothing else. Use the concept's own
vocabulary in the title, in the step narrations and in the object labels, so a
teacher looking at the figure can tell which concept it belongs to. If this
concept cannot be drawn honestly as a labelled 3D scene, return exactly: null

type Vec3 = [number, number, number]
type SceneObjectType = 'point'|'particle'|'node'|'vector'|'arrow'|'bond'|'label'|'path'|'trajectory'
interface SceneObject { type: SceneObjectType; id?: string; position?: Vec3; from?: Vec3; to?: Vec3; points?: Vec3[]; text?: string; color?: string; radius?: number; thickness?: number }
interface SceneStep { narration?: string; objects: SceneObject[] }
interface SceneSpec { id: string; title: string; sceneType: 'diagram'|'simulation'|'process'|'comparison'|'plot'; teachingGoal?: string; cameraDistance?: number; ariaLabel?: string; steps: SceneStep[] }

STEPS ARE CUMULATIVE. Everything drawn in step 1 is STILL ON SCREEN in step 2,
and the default view is the complete figure. So each step lists only what is
NEWLY revealed — never re-declare an object to keep it visible — and every
object id must be unique across the whole scene. Two objects may not share an
id even in different steps. Omit id entirely if you do not need one.

Because the steps accumulate, no narration or label may state something that is
only true during its own step: a label reading "nothing here yet" is wrong the
moment a later step fills that space.

Rules: 2-5 steps, each with a one-sentence narration naming what appears. At
least two drawn objects overall. Label the objects with real terms from this
concept. Coordinates small and plausible (roughly -5..5). Output ONLY the
SceneSpec JSON object.`
}

/**
 * Produce a faithful scene for a concept, or explain why not.
 *
 * Cache-first: a concept costs at most one generation for the whole platform.
 * Non-fatal throughout — a DB error, a provider error or a blocked network all
 * degrade to a rejection, and the turn proceeds with no figure.
 */
export async function generateConceptScene(
  ctx: ArchetypeContext,
  deps: {
    cacheClient?: VisualizationCacheClient
    generate?: (prompt: string, maxTokens?: number) => Promise<unknown>
    /** Authorization override for tests; production uses the allowlist authority. */
    enabled?: (conceptId: string) => boolean
    /** The turn's teaching purpose — guidance for generation, see the prompt. */
    purpose?: string
    /**
     * Where every attempt is written down, accepted or rejected. Optional: with
     * no sink the engine behaves exactly as before, which is what keeps the
     * audit trail from ever being able to fail a lesson.
     */
    outcomeSink?: GenerationOutcomeSink
    /** Policy override for tests; production reads it from the env authority. */
    policy?: ServicePolicy
    /**
     * How long to wait for generation. 0 disables the budget entirely, which is
     * what the offline warming pass wants — nobody is waiting for it there.
     */
    budgetMs?: number
  } = {},
): Promise<EngineResult> {
  const startedAt = Date.now()
  // Authorization FIRST, before the cache is touched: the allowlist gates
  // eligibility, so removing a concept (or the flag) stops cached generated
  // scenes being served, not merely new generations.
  const enabled = deps.enabled ?? isRuntimeSceneGenerationAllowed
  const policy = deps.policy ?? resolveServicePolicy(ctx.conceptId)

  /**
   * Record the attempt, then return the caller's result unchanged.
   *
   * A REJECTION IS RECORDED TOO — that is the whole point. Measured
   * 2026-08-10: the anchor rule rejected 7 of 7 of this repository's own
   * authored gold-standard figures, a pattern that was invisible precisely
   * because rejections were discarded.
   */
  const finish = async (
    result: EngineResult,
    cached = false,
    rejectedPayload?: unknown,
  ): Promise<EngineResult> => {
    await recordGenerationOutcome(
      {
        conceptId: ctx.conceptId,
        conceptTitle: ctx.title,
        policy,
        elapsedMs: Date.now() - startedAt,
        cached,
        result: result.ok
          ? {
              ok: true,
              scene: result.scene,
              served: servesImmediately(policy),
              figure: { kind: 'scene', scene: result.scene },
            }
          : { ok: false, reason: result.reason, scene: null, payload: rejectedPayload },
      },
      deps.outcomeSink,
    )
    return result
  }

  // Not eligible at all: nothing was attempted, so there is nothing to record.
  if (!enabled(ctx.conceptId)) return { ok: false, reason: 'flag-off' }
  if (!ctx.title?.trim() && !ctx.description?.trim()) return { ok: false, reason: 'no-source-text' }

  const key = `${CACHE_PREFIX}${ctx.conceptId}`

  // 1. Cache. A cached scene is re-validated, never trusted on age alone —
  //    the concept's KG text may have changed since it was stored.
  try {
    const cached = await getCachedVisualization(key, deps.cacheClient)
    if (cached?.code) {
      const parsed = JSON.parse(cached.code) as unknown
      const result = validateGeneratedScene(parsed, ctx)
      if (result.ok) return await finish({ ...result, cached: true }, true)
    }
  } catch { /* unparseable or unreachable cache — fall through and regenerate */ }

  // 2. Generate.
  let raw: unknown = null
  let overBudget = false
  try {
    const budgetMs = deps.budgetMs ?? ON_TURN_BUDGET_MS
    const generation = (deps.generate ?? generateJSON)(
      buildConceptScenePrompt(ctx, deps.purpose), MAX_SCENE_TOKENS,
    )
    // The generation keeps running and still populates the cache for the next
    // learner; this turn simply stops waiting for it.
    raw = budgetMs > 0
      ? await Promise.race([
          generation,
          new Promise<null>((resolve) => setTimeout(() => { overBudget = true; resolve(null) }, budgetMs)),
        ])
      : await generation
  } catch {
    return await finish({ ok: false, reason: 'generation-failed' })
  }
  if (!raw) return await finish({ ok: false, reason: overBudget ? 'budget-exceeded' : 'generation-failed' })

  // 3. Validate. A rejected scene is never cached — it must not be served to
  //    the next learner who asks about this concept.
  const result = validateGeneratedScene(raw, ctx)
  if (!result.ok) return await finish(result, false, raw)

  try {
    await saveVisualization(key, JSON.stringify(result.scene), deps.cacheClient)
  } catch { /* cache write is best-effort; the scene is still usable this turn */ }

  return await finish(result)
}

// ── REPRESENTATION BREADTH (A4) ──────────────────────────────────────────────

/**
 * NOT EVERY CONCEPT IS A 3D SCENE.
 *
 * Generation could emit exactly one thing: a SceneSpec. Four other renderers
 * are live and received nothing generated — graph, number line, geometry and
 * process flow — so whole families of concepts (functions, statistics,
 * procedures, sequences) had no generatable form and fell back to text or to a
 * shared domain illustration.
 *
 * The model now CHOOSES, in one call, from a CLOSED set. It cannot invent a
 * renderer: an unrecognised shape is a rejection, never a fallback, which is
 * the same rule the scene path already lives by.
 *
 * WHY THE SPEC BAR IS DIFFERENT FROM THE SCENE BAR, and honestly so. A scene
 * is free-form: any 3D objects with any labels, which is exactly why it needs
 * the label-anchoring rule that the 480-evaluation experiment forced. A
 * VisualSpec is not free-form — zod fixes its shape, and a `graph` is an
 * equation, a `number_line` is a range, a `geometry` is a named shape with
 * numbers. There is no room in that structure to smuggle in another concept's
 * content, so anchoring is applied where a spec actually carries prose (its
 * title and step titles) and is not demanded of an equation, which has no
 * vocabulary to match. Demanding it anyway would repeat the false-reject
 * failure measured on 2026-08-10, where the anchor rule rejected 7 of 7 of
 * this repository's own authored gold-standard figures.
 */

/** What a generated figure turned out to be. Closed by construction. */
export type GeneratedFigure =
  | { kind: 'scene'; scene: SceneSpec }
  | { kind: 'spec'; spec: VisualSpec }

export type FigureResult =
  | { ok: true; figure: GeneratedFigure; cached: boolean }
  | { ok: false; reason: EngineRejection }

/** Free prose a spec carries. Numbers and equations are deliberately excluded. */
function specProse(spec: VisualSpec): string[] {
  const out: string[] = []
  if ('title' in spec && typeof spec.title === 'string') out.push(spec.title)
  if (spec.type === 'process_flow') {
    for (const step of spec.steps) {
      if (typeof step === 'string') out.push(step)
      else {
        if (step.title) out.push(step.title)
        if (step.note) out.push(step.note)
      }
    }
  }
  return out.filter((s) => s.trim())
}

/**
 * Is this spec about the concept it was generated for?
 *
 * ONE matched term is enough, against the scene path's two, and the reason is
 * structural rather than lenient: a spec's shape is already fixed by zod, so
 * the question "is this secretly another concept's figure?" barely arises. A
 * spec that carries NO prose at all — a bare graph of an equation — cannot be
 * anchored lexically and is accepted on its structure, because rejecting every
 * equation for failing to contain English would reject the representation
 * itself.
 */
export function isSpecAnchoredToConcept(spec: VisualSpec, ctx: ArchetypeContext): boolean {
  const prose = specProse(spec)
  if (prose.length === 0) return true
  const conceptWords = new Set([...contentWords(ctx.title, true), ...contentWords(ctx.description)])
  for (const line of prose) {
    for (const w of contentWords(line, true)) if (conceptWords.has(w)) return true
  }
  return false
}

/** Which member of the closed set this raw response is, if any. */
function classifyFigure(raw: unknown): 'scene' | 'spec' | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  if (Array.isArray(o.steps) && !o.type) return 'scene'
  if (typeof o.type === 'string' && (SUPPORTED_VISUAL_TYPES as readonly string[]).includes(o.type)) return 'spec'
  // A process_flow also has `steps`, so `type` is checked first above.
  if (Array.isArray(o.steps)) return 'scene'
  return null
}

export function buildConceptFigurePrompt(ctx: ArchetypeContext, purpose?: string): string {
  const purposeLine = purpose ? `\nTeaching purpose for this turn: ${purpose}. Shape the figure to serve it.\n` : ''
  return `Choose the ONE best figure for a curriculum concept, then produce it.
${purposeLine}
Concept id: ${ctx.conceptId}
Concept title: ${ctx.title}
What it covers: ${ctx.description}

Pick exactly one of these five forms. Nothing else is renderable — if none of
them can depict this concept honestly, return exactly: null

A. graph          a function of one variable            {"type":"graph","equation":"2x + 1","title":"..."}
B. number_line    positions or ranges on a line         {"type":"number_line","start":-5,"end":5,"highlight":[0,3],"title":"..."}
C. geometry       one shape with real measurements      {"type":"geometry","shape":"triangle","base":8,"height":5}
                  shape is triangle | rectangle | circle | angle
D. process_flow   an ordered sequence of named steps    {"type":"process_flow","title":"...","steps":[{"title":"..."},{"title":"..."}]}
                  2-12 steps, each title <= 60 characters
E. scene          a labelled 3D diagram, when none of A-D fits

Choose by what the concept IS, not by what looks impressive: a relationship
between two quantities is a graph, a procedure is a process flow, a measured
shape is geometry. Prefer A-D when one of them genuinely fits — they read
better on a phone than a 3D scene does.

For form E only, use this shape:

type Vec3 = [number, number, number]
type SceneObjectType = 'point'|'particle'|'node'|'vector'|'arrow'|'bond'|'label'|'path'|'trajectory'
interface SceneObject { type: SceneObjectType; id?: string; position?: Vec3; from?: Vec3; to?: Vec3; points?: Vec3[]; text?: string; color?: string; radius?: number; thickness?: number }
interface SceneStep { narration?: string; objects: SceneObject[] }
interface SceneSpec { id: string; title: string; sceneType: 'diagram'|'simulation'|'process'|'comparison'|'plot'; teachingGoal?: string; cameraDistance?: number; ariaLabel?: string; steps: SceneStep[] }

STEPS ARE CUMULATIVE. Everything drawn in step 1 is STILL ON SCREEN in step 2,
so each step lists only what is NEWLY revealed, every object id is unique
across the whole scene, and no label may state something only true during its
own step. 2-5 steps, each with a one-sentence narration. At least two drawn
objects overall, labelled with real terms from this concept. Coordinates
roughly -5..5.

Output ONLY the JSON object.`
}

/**
 * Generate a figure of whichever form fits, under the same contract as scenes.
 *
 * Eligibility, the permanent cache, the outcome record and NO-FIGURE-on-any-
 * rejection are identical to `generateConceptScene`, because they are the same
 * code path — this differs only in what the model is allowed to return.
 */
export async function generateConceptFigure(
  ctx: ArchetypeContext,
  deps: Parameters<typeof generateConceptScene>[1] = {},
): Promise<FigureResult> {
  const startedAt = Date.now()
  const enabled = deps.enabled ?? isRuntimeSceneGenerationAllowed
  const policy = deps.policy ?? resolveServicePolicy(ctx.conceptId)
  if (!enabled(ctx.conceptId)) return { ok: false, reason: 'flag-off' }
  if (!ctx.title?.trim() && !ctx.description?.trim()) return { ok: false, reason: 'no-source-text' }

  const finish = async (
    result: FigureResult,
    cached = false,
    rejectedPayload?: unknown,
  ): Promise<FigureResult> => {
    await recordGenerationOutcome(
      {
        conceptId: ctx.conceptId,
        conceptTitle: ctx.title,
        policy,
        elapsedMs: Date.now() - startedAt,
        cached,
        result: result.ok
          // `scene` cannot hold a spec and carries the placeholder for one;
          // `figure` carries whichever form the model actually chose, and is
          // what a reader should trust.
          ? {
              ok: true,
              scene: result.figure.kind === 'scene' ? result.figure.scene : EMPTY_SCENE,
              served: servesImmediately(policy),
              figure: result.figure,
            }
          : { ok: false, reason: result.reason, scene: null, payload: rejectedPayload },
      },
      deps.outcomeSink,
    )
    return result
  }

  const key = `${CACHE_PREFIX}fig:${ctx.conceptId}`
  try {
    const cached = await getCachedVisualization(key, deps.cacheClient)
    if (cached?.code) {
      const validated = validateGeneratedFigure(JSON.parse(cached.code) as unknown, ctx)
      if (validated.ok) return await finish({ ...validated, cached: true }, true)
    }
  } catch { /* unreachable or unparseable cache — regenerate */ }

  let raw: unknown = null
  let overBudget = false
  try {
    const budgetMs = deps.budgetMs ?? ON_TURN_BUDGET_MS
    const generation = (deps.generate ?? generateJSON)(buildConceptFigurePrompt(ctx, deps.purpose), MAX_SCENE_TOKENS)
    raw = budgetMs > 0
      ? await Promise.race([
          generation,
          new Promise<null>((resolve) => setTimeout(() => { overBudget = true; resolve(null) }, budgetMs)),
        ])
      : await generation
  } catch {
    return await finish({ ok: false, reason: 'generation-failed' })
  }
  if (!raw) return await finish({ ok: false, reason: overBudget ? 'budget-exceeded' : 'generation-failed' })

  const validated = validateGeneratedFigure(raw, ctx)
  if (!validated.ok) return await finish(validated, false, raw)

  try {
    await saveVisualization(key, JSON.stringify(raw), deps.cacheClient)
  } catch { /* best-effort */ }

  return await finish(validated)
}

/** An empty scene, used only where the outcome record's shape needs one. */
const EMPTY_SCENE: SceneSpec = { id: 'spec', title: '', sceneType: 'diagram', steps: [] }

/**
 * Validate whichever form the model chose. An unrecognised shape is a
 * rejection — the closed set is closed.
 */
export function validateGeneratedFigure(
  raw: unknown,
  ctx: ArchetypeContext,
): { ok: true; figure: GeneratedFigure; cached: boolean } | { ok: false; reason: EngineRejection } {
  const kind = classifyFigure(raw)
  if (kind === 'scene') {
    const result = validateGeneratedScene(raw, ctx)
    return result.ok ? { ok: true, figure: { kind: 'scene', scene: result.scene }, cached: false } : result
  }
  if (kind === 'spec') {
    const spec = parseVisualSpec(raw)
    if (!spec) return { ok: false, reason: 'structurally-invalid' }
    if (!isSpecAnchoredToConcept(spec, ctx)) return { ok: false, reason: 'not-anchored-to-concept' }
    return { ok: true, figure: { kind: 'spec', spec }, cached: false }
  }
  return { ok: false, reason: 'structurally-invalid' }
}
