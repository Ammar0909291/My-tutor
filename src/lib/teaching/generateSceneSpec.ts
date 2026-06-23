/**
 * Part 2 — production AI SceneSpec generator (DRAFT, FLAG-GATED, NOT YET LIVE).
 *
 * This is the real-path counterpart to scripts/probe-scenespec-generation.ts:
 * it asks the LLM (Groq, via generateJSON) to produce a SceneSpec from tutor
 * explanation text, then runs the result through the SAME structural validator
 * (validateSceneSpec) used everywhere else — replacing the probe's cheaper inline
 * shape check, so there is one source of truth for "is this SceneSpec well-formed".
 *
 * STATUS: wired into the chat route behind `ENABLE_AI_SCENE_GENERATION` (default
 * OFF). It stays dead until (a) the feasibility probe confirms the LLM produces
 * usable output on a Groq-reachable network, and (b) the flag is flipped on. Until
 * then this is drafted-and-ready, not active.
 *
 * Like buildSceneSpec()/planVisualTeaching(), this is best-effort and non-fatal:
 * generateJSON never throws (returns null on provider error / blocked network /
 * spent budget), and any invalid result is dropped, so a chat turn never breaks
 * because scene generation failed.
 */

import { generateJSON } from '@/lib/ai/client'
import { validateSceneSpec } from './sceneSpecValidator'
import type { SceneSpec } from './sceneSpec'

/** Feature flag — keep generation OFF until probe-confirmed and explicitly enabled. */
export function isAiSceneGenerationEnabled(): boolean {
  return process.env.ENABLE_AI_SCENE_GENERATION === 'true'
}

const SCHEMA_DESCRIPTION = `
Generate a SceneSpec conforming EXACTLY to this TypeScript shape:

type Vec3 = [number, number, number]
type SceneObjectType = 'point'|'particle'|'node'|'vector'|'arrow'|'bond'|'label'|'path'|'trajectory'|'bar'|'surface'
interface SceneObject {
  type: SceneObjectType
  id?: string
  position?: Vec3       // point/node/particle/label/bar
  from?: Vec3            // vector/arrow/bond
  to?: Vec3               // vector/arrow/bond
  points?: Vec3[]        // path/trajectory
  text?: string           // label text or caption
  color?: string          // CSS color
  radius?: number
  thickness?: number
  size?: number
}
interface SceneStep {
  narration?: string
  objects: SceneObject[]
}
type SceneType = 'diagram'|'simulation'|'process'|'comparison'|'plot'
interface SceneSpec {
  id: string
  title: string
  sceneType: SceneType
  teachingGoal?: string
  cameraDistance?: number
  ariaLabel?: string
  steps: SceneStep[]
}

Rules: 3-6 steps, each step's narration matches one beat of the explanation, all
positions/vectors must be numerically sane (small, plausible coordinates, not huge
or zero everywhere). Output ONLY the SceneSpec JSON object, no other fields.`

function buildPrompt(text: string): string {
  return `You are generating a 3D teaching visualization scene from a tutor's spoken explanation.

Explanation text:
"${text}"

${SCHEMA_DESCRIPTION}`
}

/**
 * Generate a structurally-valid SceneSpec from explanation text, or null.
 * Returns null when the flag is off, the text is empty, the LLM call fails, or
 * the generated spec fails structural validation. Never throws.
 */
export async function generateSceneSpec(text: string): Promise<SceneSpec | null> {
  if (!isAiSceneGenerationEnabled()) return null
  if (!text || !text.trim()) return null

  const raw = await generateJSON(buildPrompt(text), 1200)
  if (!raw) return null

  const result = validateSceneSpec(raw)
  if (!result.valid) {
    console.warn('[generateSceneSpec] generated SceneSpec failed validation, dropping:', result.errors)
    return null
  }
  return raw as SceneSpec
}
