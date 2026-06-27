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
 * Wired into the chat route (src/app/api/learn/chat/route.ts) behind its own
 * flag, ENABLE_PARAMETRIC_SCENE_GENERATION (default OFF) — separate from, and
 * not a replacement decision for, ENABLE_AI_SCENE_GENERATION (the old
 * free-form generator, also still default OFF).
 */

import type { SceneSpec } from '../sceneSpec'
import { validateSceneSpec } from '../sceneSpecValidator'
import { extractProjectileParams, buildProjectileScene, checkProjectileConsistency } from './projectileMotion'
import { extractTriangleParams, buildTriangleScene, checkTriangleConsistency } from './triangleAngleSum'
import { extractMolecule, buildMoleculeScene, checkMoleculeConsistency } from './moleculeGeometry'
import { extractVectorParams, buildVectorScene, checkVectorConsistency } from './vectorAddition'
import { extractCircularParams, buildCircularScene, checkCircularConsistency } from './circularMotion'
import { extractPendulumParams, buildPendulumScene, checkPendulumConsistency } from './pendulumMotion'
import { extractElement, buildElectronShellScene, checkElectronShellConsistency } from './electronShells'
import { extractLattice, buildLatticeScene, checkLatticeConsistency } from './crystalLattice'
import { extractCollisionParams, buildCollisionScene, checkCollisionConsistency } from './momentumCollision'
import { extractRayOpticsParams, buildRayOpticsScene, checkRayOpticsConsistency } from './rayOptics'
import { extractTimelineParams, buildTimelineScene, checkTimelineConsistency } from './historicalTimeline'
import { extractEconomicsParams, buildEconomicsCurveScene, checkEconomicsConsistency } from './economicsCurves'
import { extractCalculusParams, buildCalculusGraphScene, checkCalculusConsistency } from './calculusGraph'
import { extractOrgChartParams, buildOrgChartScene, checkOrgChartConsistency } from './civicsOrgChart'
import { extractCircuitParams, buildCircuitScene, checkCircuitConsistency } from './electricCircuit'
import { extractKinematicsParams, buildKinematicsGraphScene, checkKinematicsConsistency } from './kinematicsGraphs'
import { extractHeightsAndDistancesParams, buildHeightsAndDistancesScene, checkHeightsAndDistancesConsistency } from './heightsAndDistances'

export type SceneGeneratorKind = 'projectile' | 'triangle' | 'molecule' | 'vector' | 'circular' | 'pendulum' | 'electron_shells' | 'lattice' | 'collision' | 'ray_optics' | 'historical_timeline' | 'economics_curves' | 'calculus_graph' | 'civics_org_chart' | 'electric_circuit' | 'kinematics_graphs' | 'heights_and_distances'

// INTENTIONALLY OUT OF SCOPE — do not add these as scene generators:
//  • SHM / y=A·sin(ωt) graphs — already owned by the existing 2D graph engine
//    (src/lib/visuals/visualConceptDetector.ts, equation/graph path). Building a
//    SceneSpec version would duplicate a working system, not add new coverage.
//  • Free-body / net-force diagrams — "net force" IS vector addition (the
//    'vector' generator); open-ended force extraction isn't a clean case.
//  • 2D / oblique collisions — DEFERRED (same as momentum/collision was before
//    this module landed): the 'collision' generator below covers 1D only.
//    A 2D extension needs an impact-angle parameter and a meaningfully larger
//    geometry problem — a deliberate future scope decision, not a quick add.

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
    // Checked before 'triangle' since "angle of elevation" problems are also
    // about a right triangle, but should land on the dedicated heights-and-
    // distances generator (which solves for height/distance via tan), not
    // the generic angle-sum generator (which only knows two given angles).
    kind: 'heights_and_distances',
    keywords: [
      'angle of elevation', 'angle of depression', 'heights and distances',
      'height and distance', 'height of the tower', 'height of a tower',
      'height of the pole', 'height of the building', 'top of the tower',
      'foot of the tower',
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
    // Checked BEFORE molecule: an "electron configuration of X" / "Bohr model"
    // turn is about shells, not bonding. These keys are shell-specific — molecule
    // text like "atoms share a pair of electrons" contains "electron" but NOT
    // "electron shell"/"electron configuration"/"bohr model", so molecule turns
    // are never stolen.
    kind: 'electron_shells',
    keywords: [
      'electron shell', 'electron shells', 'electron configuration',
      'bohr model', 'bohr diagram', 'energy levels of', 'k shell', 'l shell',
      'electronic configuration', 'shell diagram',
    ],
  },
  {
    // Lattice keys are crystal-specific (unit cell / cubic-cell names); disjoint
    // from molecule's bonding vocabulary, so the two never collide.
    kind: 'lattice',
    keywords: [
      'crystal lattice', 'unit cell', 'crystal structure', 'bravais',
      'simple cubic', 'body-centered cubic', 'body centred cubic',
      'face-centered cubic', 'face centred cubic', 'cubic close packed',
      ' bcc', ' fcc', // leading space → match the standalone abbreviations, not substrings
    ],
  },
  {
    // Collision keys are momentum/collision-specific ("collide", "collision",
    // "stick together", "momentum is conserved") — disjoint from vector's
    // addition-specific vocabulary and from projectile's launch vocabulary, so
    // checked before vector (its bare 'resultant' key is broader) to make sure
    // a "find the resultant velocity after the collision" turn lands here, not
    // on vector addition.
    kind: 'collision',
    keywords: [
      'collide', 'collides', 'collision', 'collisions', 'stick together',
      'sticks together', 'momentum is conserved', 'conservation of momentum',
      'elastic collision', 'inelastic collision', 'two objects moving',
      'two carts', 'two trolleys', 'two balls collide',
    ],
  },
  {
    // Ray-optics keys are mirror/lens-image-formation specific ("concave
    // mirror", "focal length", "image distance", "real image"...) — disjoint
    // from every other rule's vocabulary (no overlap with triangle's "angle",
    // vector's "resultant", or collision's "collide"), so it can sit anywhere
    // in the order without stealing another rule's turn. Placed before
    // molecule/vector since it has no shared cues with either.
    kind: 'ray_optics',
    keywords: [
      'concave mirror', 'convex mirror', 'concave lens', 'convex lens',
      'mirror formula', 'lens formula', 'focal length', 'image distance',
      'magnification', 'ray diagram', 'real image', 'virtual image',
      'image formation', 'converging lens', 'diverging lens',
    ],
  },
  {
    // Timeline keys are date/chronology-specific ("timeline", "chronological
    // order", "BCE"/"CE"...) — none of the science-generator rules above use
    // these terms, so this can sit anywhere in the order without collision.
    // Checked before molecule/vector since it shares no vocabulary with either.
    kind: 'historical_timeline',
    keywords: [
      'timeline', 'historical timeline', 'chronological order', 'in chronological',
      'sequence of events', 'order of events', 'history of', 'bce', 'b.c.e.',
      'b.c.', 'over the centuries', 'timeline of events',
    ],
  },
  {
    // Economics keys are supply/demand-curve specific ("supply curve",
    // "demand curve", "equilibrium price", "shifts to the right"...) — no
    // overlap with any science/math rule's vocabulary above, so it can sit
    // anywhere in the order. Placed before molecule/vector since it shares
    // no cues with either.
    kind: 'economics_curves',
    keywords: [
      'supply curve', 'demand curve', 'supply and demand', 'equilibrium price',
      'equilibrium quantity', 'market equilibrium', 'shifts to the right',
      'shifts to the left', 'shift in supply', 'shift in demand',
      'supply shifts', 'demand shifts',
    ],
  },
  {
    // Calculus keys are derivative/critical-point specific ("derivative",
    // "critical point", "local maximum/minimum", "f'(x)"...) — none of these
    // terms appear in any other rule's vocabulary, so it can sit anywhere in
    // the order. Placed before molecule/vector since it shares no cues with
    // either.
    kind: 'calculus_graph',
    keywords: [
      'critical point', 'critical points', 'derivative', 'differentiate',
      "f'(x)", 'local maximum', 'local minimum', 'inflection point',
      'graph of the function', 'rate of change of the function',
      'where the slope is zero', 'maxima and minima',
    ],
  },
  {
    // Civics keys are institutional-hierarchy specific ("parliament",
    // "legislature", "federalism", "constitution"...) — no overlap with any
    // science/math/economics rule's vocabulary above ("government" doesn't
    // collide with "market equilibrium"/"supply curve" etc.), so it can sit
    // anywhere in the order. Placed before molecule/vector since it shares
    // no cues with either.
    kind: 'civics_org_chart',
    keywords: [
      'parliament', 'legislature', 'legislative branch', 'executive branch',
      'judicial branch', 'federalism', 'government structure',
      'organizational chart', 'organisational chart', 'org chart',
      'constitution', 'separation of powers', 'chain of command',
      'reports to', 'hierarchy of government',
    ],
  },
  {
    // Circuit keys are deliberately MULTI-WORD and Kirchhoff/Ohm's-law-specific
    // ("kirchhoff", "series circuit", "voltage drop", "equivalent resistance"...)
    // rather than the bare single words ("circuit", "resistance", "voltage",
    // "battery", "series", "parallel") that the legacy free-form visual
    // detector (src/lib/school/visuals/detectVisual.ts, 'circuit_diagram')
    // already uses — that detector is a separate, independently-gated system
    // (ENABLE_AI_SCENE_GENERATION), so a collision there can't break this
    // router, but specific phrases keep this rule's intent unambiguous and
    // avoid stealing a turn that's only vaguely circuit-adjacent.
    kind: 'electric_circuit',
    keywords: [
      'kirchhoff', "kirchhoff's law", 'kirchhoff voltage law', 'kirchhoff current law',
      'series circuit', 'parallel circuit', 'voltage drop', 'voltage drops',
      'equivalent resistance', 'total resistance', 'resistors in series',
      'resistors in parallel', 'current through each resistor',
    ],
  },
  {
    // Kinematics-graph keys are deliberately multi-word and graph-specific
    // ("position-time graph", "v-t graph"...) rather than bare motion words
    // ("velocity", "acceleration"), so a genuine projectile/circular/pendulum
    // turn (which never asks for a time-axis graph) can't land here, and this
    // rule can't steal those turns either. Checked before molecule/vector
    // since it shares no vocabulary with either.
    kind: 'kinematics_graphs',
    keywords: [
      'position-time graph', 'position time graph', 'velocity-time graph',
      'velocity time graph', 'acceleration-time graph', 'acceleration time graph',
      'displacement-time graph', 'x-t graph', 'v-t graph', 'a-t graph', 's-t graph',
      'uniformly accelerated motion', 'equations of motion graph',
      'graph of motion', 'kinematics graph', 'kinematics graphs',
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
      // Classical Mechanics free-body diagrams (Sprint — Classical Mechanics):
      // a two-force free-body diagram IS vector addition (the forces and their
      // resultant), so it reuses this generator rather than a dedicated one —
      // see the "INTENTIONALLY OUT OF SCOPE" note above.
      'free-body diagram', 'free body diagram', 'net force on the object',
      'two forces acting on', 'forces acting on the object',
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
 * Run one generator's extract → build → validate → consistency-check pipeline
 * with lightweight stage logging (log only — never blocks or throws; a logging
 * failure can't break scene generation). This is the SINGLE home for that
 * pipeline — each generator exposes only its extract/build/check parts, and the
 * sequence lives here once rather than being duplicated into all 9 modules.
 */
async function runWithLogging<P>(
  kind: SceneGeneratorKind,
  text: string,
  extract: (text: string) => Promise<P | null>,
  build: (params: P) => SceneSpec,
  check: (spec: SceneSpec, params: P) => { ok: boolean; errors: string[] },
): Promise<SceneSpec | null> {
  const params = await extract(text).catch(() => null)
  if (!params) {
    console.warn(`[sceneRouter] ${kind}: extraction failed or returned null`)
    return null
  }
  console.warn(`[sceneRouter] ${kind}: extraction ok`)

  const spec = build(params)
  const structural = validateSceneSpec(spec)
  if (!structural.valid) {
    console.warn(`[sceneRouter] ${kind}: structural validation failed`, structural.errors)
    return null
  }
  console.warn(`[sceneRouter] ${kind}: structural validation ok`)

  const consistency = check(spec, params)
  if (!consistency.ok) {
    console.warn(`[sceneRouter] ${kind}: consistency check failed`, consistency.errors)
    return null
  }
  console.warn(`[sceneRouter] ${kind}: consistency check ok — scene generated`)
  return spec
}

/**
 * Full routed pipeline: deterministic route → the matching generator's
 * extract(LLM) → build(formula) → validate → consistency-check, with
 * pass/fail logged at each stage. Returns null when nothing routes or any
 * stage fails. The extraction stage NEEDS a live Groq test; the routing
 * stage does not.
 */
export async function generateRoutedScene(text: string): Promise<SceneSpec | null> {
  const kind = routeSceneGenerator(text)
  if (!kind) return null
  console.warn(`[sceneRouter] routed to: ${kind}`)
  switch (kind) {
    case 'projectile': return runWithLogging(kind, text, extractProjectileParams, buildProjectileScene, checkProjectileConsistency)
    case 'triangle': return runWithLogging(kind, text, extractTriangleParams, buildTriangleScene, checkTriangleConsistency)
    case 'molecule': return runWithLogging(kind, text, extractMolecule, buildMoleculeScene, checkMoleculeConsistency)
    case 'vector': return runWithLogging(kind, text, extractVectorParams, buildVectorScene, checkVectorConsistency)
    case 'circular': return runWithLogging(kind, text, extractCircularParams, buildCircularScene, checkCircularConsistency)
    case 'pendulum': return runWithLogging(kind, text, extractPendulumParams, buildPendulumScene, checkPendulumConsistency)
    case 'electron_shells': return runWithLogging(kind, text, extractElement, buildElectronShellScene, checkElectronShellConsistency)
    case 'lattice': return runWithLogging(kind, text, extractLattice, buildLatticeScene, checkLatticeConsistency)
    case 'collision': return runWithLogging(kind, text, extractCollisionParams, buildCollisionScene, checkCollisionConsistency)
    case 'ray_optics': return runWithLogging(kind, text, extractRayOpticsParams, buildRayOpticsScene, checkRayOpticsConsistency)
    case 'historical_timeline': return runWithLogging(kind, text, extractTimelineParams, buildTimelineScene, checkTimelineConsistency)
    case 'economics_curves': return runWithLogging(kind, text, extractEconomicsParams, buildEconomicsCurveScene, checkEconomicsConsistency)
    case 'calculus_graph': return runWithLogging(kind, text, extractCalculusParams, buildCalculusGraphScene, checkCalculusConsistency)
    case 'civics_org_chart': return runWithLogging(kind, text, extractOrgChartParams, buildOrgChartScene, checkOrgChartConsistency)
    case 'electric_circuit': return runWithLogging(kind, text, extractCircuitParams, buildCircuitScene, checkCircuitConsistency)
    case 'kinematics_graphs': return runWithLogging(kind, text, extractKinematicsParams, buildKinematicsGraphScene, checkKinematicsConsistency)
    case 'heights_and_distances': return runWithLogging(kind, text, extractHeightsAndDistancesParams, buildHeightsAndDistancesScene, checkHeightsAndDistancesConsistency)
    default: return null
  }
}

/** Feature flag — keep parametric routed generation OFF until explicitly enabled. Separate from ENABLE_AI_SCENE_GENERATION (the old free-form generator). */
export function isParametricSceneGenerationEnabled(): boolean {
  return process.env.ENABLE_PARAMETRIC_SCENE_GENERATION === 'true'
}
