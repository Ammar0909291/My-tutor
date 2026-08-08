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
import { isAiSceneGenerationEnabled } from '@/lib/teaching/generateSceneSpec'
import {
  getCachedVisualization, saveVisualization, type VisualizationCacheClient,
} from '@/lib/teaching/visuals/visualizationCache'
import { buildConceptIndexFromKnowledgeGraph } from '@/lib/teaching/concept/conceptIndexSource'
import type { ConceptIndexEntry } from '@/lib/teaching/concept/conceptUnderstanding'
import type { SceneObject, SceneSpec } from '@/lib/teaching/sceneSpec'
import type { ArchetypeContext } from './archetypes'

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
 * floating string: satisfying the anchor with labels alone is the same cheap
 * trick as repeating the title, so at least one anchored object must come from
 * this set.
 */
const GEOMETRIC: ReadonlySet<SceneObject['type']> = new Set<SceneObject['type']>([
  'point', 'particle', 'node', 'vector', 'arrow', 'bond', 'path', 'trajectory',
])

const MIN_DRAWN_OBJECTS = 2

/** Distinct anchored objects required before a scene is believed. */
const MIN_ANCHORED_OBJECTS = 2

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
 * Two independent conditions must hold:
 *   1. at least two DISTINCT drawn objects whose own text matches the concept's
 *      vocabulary, at least one of them geometry-bearing (a pair of floating
 *      labels is text, not a figure);
 *   2. no other KG concept matches those labels substantially better than the
 *      target does (see crossConceptChallenger).
 */
export function isAnchoredToConcept(scene: SceneSpec, ctx: ArchetypeContext): boolean {
  return anchorReport(scene, ctx).anchored
}

export interface AnchorReport {
  anchored: boolean
  /** Distinct anchored object labels, in scene order. */
  matchedLabels: string[]
  /** True when at least one anchored object carries geometry. */
  hasGeometricAnchor: boolean
  /** A better-matching concept, when one exists. */
  challenger: { conceptId: string; score: number; targetScore: number } | null
}

export function anchorReport(scene: SceneSpec, ctx: ArchetypeContext): AnchorReport {
  const conceptWords = new Set([...contentWords(ctx.title, true), ...contentWords(ctx.description)])

  const matched: string[] = []
  const seen = new Set<string>()
  let hasGeometricAnchor = false

  for (const obj of drawnObjects(scene)) {
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
    if (GEOMETRIC.has(obj.type)) hasGeometricAnchor = true
  }

  const challenger = crossConceptChallenger(scene, ctx)
  const anchored =
    matched.length >= MIN_ANCHORED_OBJECTS && hasGeometricAnchor && challenger === null

  return { anchored, matchedLabels: matched, hasGeometricAnchor, challenger }
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

  const score = (title: string, aliases?: readonly string[]): number => {
    const words = new Set([...contentWords(title), ...(aliases ?? []).flatMap((a) => [...contentWords(a)])])
    let n = 0
    for (const w of words) if (labelWords.has(w)) n++
    return n
  }

  const targetScore = score(ctx.title)
  let best: { conceptId: string; score: number } | null = null
  for (const entry of conceptIndexEntries()) {
    if (entry.conceptId === ctx.conceptId) continue
    const s = score(entry.title, entry.aliases)
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

// The index is static in-memory KG data; build once per process.
let cachedIndex: readonly ConceptIndexEntry[] | null = null
function conceptIndexEntries(): readonly ConceptIndexEntry[] {
  if (!cachedIndex) cachedIndex = buildConceptIndexFromKnowledgeGraph()
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
    enabled?: () => boolean
    /** The turn's teaching purpose — guidance for generation, see the prompt. */
    purpose?: string
  } = {},
): Promise<EngineResult> {
  const enabled = deps.enabled ?? isAiSceneGenerationEnabled
  if (!enabled()) return { ok: false, reason: 'flag-off' }
  if (!ctx.title?.trim() && !ctx.description?.trim()) return { ok: false, reason: 'no-source-text' }

  const key = `${CACHE_PREFIX}${ctx.conceptId}`

  // 1. Cache. A cached scene is re-validated, never trusted on age alone —
  //    the concept's KG text may have changed since it was stored.
  try {
    const cached = await getCachedVisualization(key, deps.cacheClient)
    if (cached?.code) {
      const parsed = JSON.parse(cached.code) as unknown
      const result = validateGeneratedScene(parsed, ctx)
      if (result.ok) return { ...result, cached: true }
    }
  } catch { /* unparseable or unreachable cache — fall through and regenerate */ }

  // 2. Generate.
  let raw: unknown = null
  try {
    raw = await (deps.generate ?? generateJSON)(buildConceptScenePrompt(ctx, deps.purpose), 1400)
  } catch {
    return { ok: false, reason: 'generation-failed' }
  }
  if (!raw) return { ok: false, reason: 'generation-failed' }

  // 3. Validate. A rejected scene is never cached — it must not be served to
  //    the next learner who asks about this concept.
  const result = validateGeneratedScene(raw, ctx)
  if (!result.ok) return result

  try {
    await saveVisualization(key, JSON.stringify(result.scene), deps.cacheClient)
  } catch { /* cache write is best-effort; the scene is still usable this turn */ }

  return result
}
