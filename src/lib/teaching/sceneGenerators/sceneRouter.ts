/**
 * Part 2 (option C) — deterministic scene-generator router.
 *
 * Maps a chat turn's text to the correct parameter-driven generator
 * (projectile / triangle / molecule) or none. Mirrors the proven keyword-routing
 * pattern of src/lib/school/visuals/detectVisual.ts: ordered, most-specific-first
 * keyword rules, NO LLM call. The routing decision is fully deterministic and
 * offline — only the chosen generator's parameter EXTRACTION step ever touches
 * Groq (and that stays isolated inside each generator module).
 *
 * Not wired into production. ENABLE_AI_SCENE_GENERATION stays false.
 */

import type { SceneSpec } from '../sceneSpec'
import { generateProjectileScene } from './projectileMotion'
import { generateTriangleScene } from './triangleAngleSum'
import { generateMoleculeScene } from './moleculeGeometry'

export type SceneGeneratorKind = 'projectile' | 'triangle' | 'molecule'

interface RouteRule { kind: SceneGeneratorKind; keywords: string[] }

// Ordered most-specific first. Projectile is checked before triangle because
// projectile text usually mentions a "launch angle" / "angle" that must NOT be
// mistaken for the triangle generator — triangle keywords are deliberately
// triangle-specific (never bare "angle"). Molecule keywords are chemistry-bonding
// specific (never bare "water") so they can't collide with the other two.
const ROUTE_RULES: RouteRule[] = [
  {
    kind: 'projectile',
    keywords: [
      'projectile', 'trajectory', 'launch angle', 'launched at', 'thrown at',
      'ballistic', 'initial speed', 'initial velocity', 'parabolic path',
    ],
  },
  {
    kind: 'triangle',
    keywords: [
      'triangle', 'interior angle', 'interior angles', 'angles of a triangle',
      'angle sum', 'three angles', 'angle a is', 'angle b is',
    ],
  },
  {
    kind: 'molecule',
    keywords: [
      'molecule', 'molecular shape', 'molecular geometry', 'bond angle',
      'covalent bond', 'vsepr', 'water molecule', 'methane', 'ammonia',
      'h2o', 'h₂o', 'co2', 'co₂', 'ch4', 'ch₄', 'nh3', 'nh₃', 'bf3', 'bf₃',
    ],
  },
]

/**
 * Decide which generator (if any) applies to this text. Deterministic, offline.
 * Returns the first rule (most specific first) with a keyword present, else null.
 */
export function routeSceneGenerator(text: string): SceneGeneratorKind | null {
  if (!text || !text.trim()) return null
  const lower = text.toLowerCase()
  for (const rule of ROUTE_RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) return rule.kind
  }
  return null
}

/**
 * Full routed pipeline: deterministic route → the matching generator's
 * extract(LLM) → build(formula) → validate → consistency-check. Returns null
 * when nothing routes or any stage fails. The extraction stage NEEDS a live
 * Groq test; the routing stage does not.
 */
export async function generateRoutedScene(text: string): Promise<SceneSpec | null> {
  const kind = routeSceneGenerator(text)
  switch (kind) {
    case 'projectile': return generateProjectileScene(text)
    case 'triangle': return generateTriangleScene(text)
    case 'molecule': return generateMoleculeScene(text)
    default: return null
  }
}
