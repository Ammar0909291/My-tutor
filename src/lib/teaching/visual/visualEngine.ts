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
import type { SceneObject, SceneSpec } from '@/lib/teaching/sceneSpec'
import type { ArchetypeContext } from './archetypes'

/** Cache namespace. Disjoint from the dynamic-code engine's own keys. */
const CACHE_PREFIX = 'scene:v1:'

/** Object types SceneSpecRenderer actually paints — bar/surface are skipped. */
const DRAWN: ReadonlySet<SceneObject['type']> = new Set<SceneObject['type']>([
  'point', 'particle', 'node', 'vector', 'arrow', 'bond', 'label', 'path', 'trajectory',
])

const MIN_DRAWN_OBJECTS = 2

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

function contentWords(text: string): Set<string> {
  const out = new Set<string>()
  for (const w of text.toLowerCase().replace(/[^a-z0-9\s]+/g, ' ').split(/\s+/)) {
    if (w.length < 4 || STOPWORDS.has(w)) continue
    // Fold a trailing plural so "vectors" anchors to "vector".
    out.add(w.endsWith('s') && w.length > 4 ? w.slice(0, -1) : w)
  }
  return out
}

/** Every word the learner will actually read on the figure. */
function sceneVocabulary(scene: SceneSpec): string {
  const parts = [scene.title, scene.teachingGoal ?? '', scene.ariaLabel ?? '']
  for (const step of scene.steps ?? []) {
    parts.push(step.narration ?? '')
    for (const obj of step.objects ?? []) parts.push(obj.text ?? '')
  }
  return parts.join(' ')
}

/**
 * Is this scene demonstrably ABOUT the concept it was generated for?
 *
 * A generated figure carries no inherent proof of subject. Requiring shared
 * vocabulary with the concept's own title (or, failing that, two words from its
 * description) is a deterministic anti-drift check: it is exactly what
 * distinguishes a phonics scene from a quantum-mechanics one when the concept
 * is Phonemic Awareness.
 */
export function isAnchoredToConcept(scene: SceneSpec, ctx: ArchetypeContext): boolean {
  const vocabulary = contentWords(sceneVocabulary(scene))
  if (vocabulary.size === 0) return false

  for (const word of contentWords(ctx.title)) {
    if (vocabulary.has(word)) return true
  }
  let fromDescription = 0
  for (const word of contentWords(ctx.description)) {
    if (vocabulary.has(word) && ++fromDescription >= 2) return true
  }
  return false
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
export function buildConceptScenePrompt(ctx: ArchetypeContext): string {
  return `Generate a 3D teaching visualization for ONE specific curriculum concept.

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
    raw = await (deps.generate ?? generateJSON)(buildConceptScenePrompt(ctx), 1400)
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
