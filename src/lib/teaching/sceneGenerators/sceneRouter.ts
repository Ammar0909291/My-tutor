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
import { generateVectorScene } from './vectorAddition'
import { generateCircularScene } from './circularMotion'
import { generatePendulumScene } from './pendulumMotion'

export type SceneGeneratorKind = 'projectile' | 'triangle' | 'molecule' | 'vector' | 'circular' | 'pendulum'

interface RouteRule { kind: SceneGeneratorKind; keywords: string[] }

// Ordered most-specific first. Projectile is checked before triangle because
// projectile text usually mentions a "launch angle" / "angle" that must NOT be
// mistaken for the triangle generator — triangle keywords are deliberately
// triangle-specific (never bare "angle"). Molecule keywords are chemistry-bonding
// specific (never bare "water") so they can't collide with the other two.
const ROUTE_RULES: RouteRule[] = [
  {
    // Checked BEFORE projectile: "circular trajectory / circular path" contains
    // the projectile cue "trajectory", but a genuine projectile turn never says
    // "circular"/"centripetal", so leading with these circular-specific cues
    // resolves that overlap toward circular without stealing any projectile turn.
    kind: 'circular',
    keywords: [
      'circular motion', 'uniform circular', 'centripetal', 'circular orbit',
      'circular path', 'circular trajectory', 'moves in a circle', 'moving in a circle',
      'around a circle', 'angular velocity',
    ],
  },
  {
    // Pendulum-specific cues; none overlap the other rules. Placed before
    // projectile since a pendulum description may say "swings" near motion words.
    kind: 'pendulum',
    keywords: [
      'pendulum', 'simple pendulum', 'swings back and forth', 'swinging bob',
      'amplitude of the swing', 'oscillates on a string',
    ],
  },
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
  {
    // Vector addition keys are addition-specific ("resultant", "parallelogram
    // law", "vector sum", "tip-to-tail") — never the bare word "vector", which
    // appears incidentally in projectile text ("velocity vector"). So this rule
    // can't steal a projectile/triangle/molecule turn, and projectile (checked
    // first) keeps any genuinely projectile-framed turn even if it also says
    // "resultant". A pure "add these two vectors" turn has none of the earlier
    // rules' keywords and lands here.
    kind: 'vector',
    keywords: [
      'vector addition', 'adding vectors', 'add the vectors', 'add these vectors',
      'resultant vector', 'resultant', 'vector sum', 'sum of the two vectors',
      'parallelogram law', 'tip-to-tail', 'tip to tail', 'head to tail',
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
    case 'vector': return generateVectorScene(text)
    case 'circular': return generateCircularScene(text)
    case 'pendulum': return generatePendulumScene(text)
    default: return null
  }
}
