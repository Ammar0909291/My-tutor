/**
 * Educational Archetype Engine.
 *
 * ~40 reusable educational figure templates that between them cover the
 * curriculum, replacing the idea of authoring a bespoke visual per concept
 * (1,775 concepts) or falling back to ASCII when the registry has no row.
 *
 * ARCHITECTURAL RULE: an archetype is a TEACHING object, not a component. It
 * declares what kind of figure the concept deserves; how that figure gets drawn
 * is resolved afterwards, and always by an EXISTING renderer:
 *
 *   card  → VisualCard          (50 existing SVG / three.js components)
 *   spec  → VisualRenderer      (GraphRenderer / NumberLine / Geometry / ProcessFlow)
 *   scene → SceneSpecRenderer   (three.js, generic primitive vocabulary)
 *
 * Two classes of archetype exist, and the difference is worth being explicit
 * about because it is a real quality difference, not a formality:
 *
 *  A. CARD-BACKED (the majority). A purpose-built, hand-authored component
 *     already exists for this kind of figure. Highest teaching quality.
 *
 *  B. STRUCTURALLY GENERATED. No bespoke component exists, so the figure is
 *     composed from generic primitives and labelled from the concept's own KG
 *     text. Genuinely graphical and genuinely about the concept, but generic in
 *     shape. These decline (return null) when the source text cannot support an
 *     honest figure, so the resolver moves on instead of drawing a lie.
 *
 * NO LLM. NO NETWORK. NO RANDOMNESS. Same concept in, same bytes out.
 */

import type { VisualType } from '@/lib/school/visuals/visualTypes'
import type { SceneSpec, SceneObject, Vec3 } from '@/lib/teaching/sceneSpec'
import { parseVisualSpec } from '@/lib/visuals/visualSpec'
import type { EducationalPurpose, Representation, VisualPayload } from './types'
import { clamp, extractSteps, extractKeyTerms, extractComparisonPair } from './conceptText'

/** Everything an archetype may read. All of it comes from the canonical KG. */
export interface ArchetypeContext {
  conceptId: string
  title: string
  description: string
  prerequisites: readonly string[]
  difficulty?: string
}

export interface Archetype {
  representation: Representation
  /** Default teaching purpose for this figure; the resolver may override it. */
  purpose: EducationalPurpose
  /** Class A: draw with this existing VisualCard component. */
  card?: VisualType
  /** Class B: compose from primitives. Returns null when it cannot do so honestly. */
  build?: (ctx: ArchetypeContext) => VisualPayload | null
}

// ── scene helpers ────────────────────────────────────────────────────────────

const COLORS = {
  primary: '#4C8DFF',
  accent: '#FFB020',
  neutral: '#9AA5B8',
  positive: '#39C46E',
} as const

function label(text: string, position: Vec3, color: string = COLORS.neutral): SceneObject {
  return { type: 'label', text: clamp(text, 40), position, color }
}

function scene(
  ctx: ArchetypeContext,
  suffix: string,
  sceneType: SceneSpec['sceneType'],
  steps: SceneSpec['steps'],
  teachingGoal: string,
): VisualPayload {
  return {
    renderer: 'scene',
    sceneSpec: {
      id: `${ctx.conceptId}:${suffix}`,
      title: clamp(ctx.title, 60),
      sceneType,
      teachingGoal: clamp(teachingGoal, 120),
      ariaLabel: clamp(`${ctx.title}: ${ctx.description}`, 200),
      steps,
    },
  }
}

/** Build a process_flow VisualSpec, or null when the text has no real sequence. */
function processFlow(ctx: ArchetypeContext, orientation: 'vertical' | 'horizontal'): VisualPayload | null {
  const steps = extractSteps(ctx.description)
  if (steps.length < 2) return null
  const spec = parseVisualSpec({
    type: 'process_flow',
    title: clamp(ctx.title, 80),
    steps: steps.slice(0, 12).map((s) => ({ title: s })),
    orientation,
  })
  return spec ? { renderer: 'spec', visualSpec: spec } : null
}

// ── Class B builders ─────────────────────────────────────────────────────────

/**
 * Free body diagram — a body with labelled force arrows. Force COUNT comes from
 * the concept's own text (how many force-like terms it names), never invented.
 */
function buildFreeBody(ctx: ArchetypeContext): VisualPayload | null {
  const terms = extractKeyTerms(ctx.title, ctx.description, 4)
  if (terms.length === 0) return null
  const dirs: Vec3[] = [[0, 2, 0], [0, -2, 0], [2, 0, 0], [-2, 0, 0]]
  const arrows: SceneObject[] = terms.slice(0, 4).map((t, i) => ({
    type: 'arrow',
    from: [0, 0, 0] as Vec3,
    to: dirs[i],
    text: t,
    color: i === 0 ? COLORS.accent : COLORS.primary,
  }))
  const labels = terms.slice(0, 4).map((t, i) =>
    label(t, [dirs[i][0] * 1.25, dirs[i][1] * 1.25, 0], COLORS.neutral))
  return scene(ctx, 'fbd', 'diagram', [
    { narration: 'The body under study.', objects: [{ type: 'particle', position: [0, 0, 0], radius: 0.45, color: COLORS.neutral, text: clamp(ctx.title, 30) }] },
    { narration: 'The forces acting on it.', objects: arrows },
    { narration: 'Each force, named.', objects: labels },
  ], 'Identify every force acting on the body and its direction.')
}

/** A labelled vector in space — magnitude and direction made visible. */
function buildVectorScene(ctx: ArchetypeContext): VisualPayload {
  return scene(ctx, 'vector', 'diagram', [
    { narration: 'Start at the origin.', objects: [{ type: 'point', position: [0, 0, 0], radius: 0.18, color: COLORS.neutral }] },
    { narration: 'The vector: how far, and which way.', objects: [{ type: 'vector', from: [0, 0, 0], to: [3, 2, 0], color: COLORS.primary, text: clamp(ctx.title, 30) }] },
    { narration: 'Its components along each axis.', objects: [
      { type: 'arrow', from: [0, 0, 0], to: [3, 0, 0], color: COLORS.neutral, thickness: 0.03 },
      { type: 'arrow', from: [3, 0, 0], to: [3, 2, 0], color: COLORS.neutral, thickness: 0.03 },
      label('x-component', [1.5, -0.35, 0]),
      label('y-component', [3.45, 1, 0]),
    ] },
  ], 'A vector has both a magnitude and a direction.')
}

/** Wave — a sine path with wavelength/amplitude annotations. */
function buildWave(ctx: ArchetypeContext): VisualPayload {
  const points: Vec3[] = []
  for (let i = 0; i <= 48; i++) {
    const x = (i / 48) * 6 - 3
    points.push([x, Math.sin(x * 2) * 1.2, 0])
  }
  return scene(ctx, 'wave', 'plot', [
    { narration: 'The equilibrium line.', objects: [{ type: 'path', points: [[-3, 0, 0], [3, 0, 0]], color: COLORS.neutral }] },
    { narration: 'The wave itself.', objects: [{ type: 'path', points, color: COLORS.primary, text: clamp(ctx.title, 30) }] },
    { narration: 'Amplitude and wavelength.', objects: [
      { type: 'arrow', from: [-2.36, 0, 0], to: [-2.36, 1.2, 0], color: COLORS.accent },
      label('amplitude', [-2.0, 0.7, 0], COLORS.accent),
      { type: 'arrow', from: [-2.36, -1.6, 0], to: [0.78, -1.6, 0], color: COLORS.accent },
      label('wavelength', [-0.9, -1.95, 0], COLORS.accent),
    ] },
  ], 'Read amplitude and wavelength directly off the waveform.')
}

/** A field as a grid of direction arrows. */
function buildField(ctx: ArchetypeContext): VisualPayload {
  const arrows: SceneObject[] = []
  for (let x = -2; x <= 2; x += 2) {
    for (let y = -2; y <= 2; y += 2) {
      arrows.push({ type: 'arrow', from: [x, y, 0], to: [x + 0.9, y, 0], color: COLORS.primary, thickness: 0.03 })
    }
  }
  return scene(ctx, 'field', 'diagram', [
    { narration: 'The source.', objects: [{ type: 'particle', position: [-3.2, 0, 0], radius: 0.35, color: COLORS.accent, text: clamp(ctx.title, 24) }] },
    { narration: 'The field at every point in space.', objects: arrows },
    { narration: 'A test object feels the field where it sits.', objects: [
      { type: 'point', position: [1, 2, 0], radius: 0.2, color: COLORS.positive },
      label('test object', [1.1, 2.45, 0], COLORS.positive),
    ] },
  ], 'A field assigns a direction and strength to every point in space.')
}

/** Hierarchy / tree — one root, N children drawn from the concept's own terms. */
function buildHierarchy(ctx: ArchetypeContext): VisualPayload | null {
  const terms = extractKeyTerms(ctx.title, ctx.description, 5)
  if (terms.length < 2) return null
  const kids = terms.slice(0, 5)
  const spread = 1.6
  const offset = ((kids.length - 1) * spread) / 2
  const nodes: SceneObject[] = []
  const edges: SceneObject[] = []
  kids.forEach((t, i) => {
    const x = i * spread - offset
    nodes.push({ type: 'node', position: [x, -1.8, 0], radius: 0.3, color: COLORS.primary, text: t })
    edges.push({ type: 'path', points: [[0, 0, 0], [x, -1.8, 0]], color: COLORS.neutral })
  })
  return scene(ctx, 'hierarchy', 'diagram', [
    { narration: 'The parent idea.', objects: [{ type: 'node', position: [0, 0, 0], radius: 0.42, color: COLORS.accent, text: clamp(ctx.title, 30) }] },
    { narration: 'What it branches into.', objects: edges },
    { narration: 'Each branch, named.', objects: nodes },
  ], 'See how the parts sit under the whole.')
}

/** Side-by-side comparison bars — only for genuinely comparative concepts. */
function buildComparison(ctx: ArchetypeContext): VisualPayload | null {
  const pair = extractComparisonPair(ctx.title, ctx.description)
  if (!pair) return null
  return scene(ctx, 'comparison', 'comparison', [
    { narration: `First: ${pair[0]}.`, objects: [
      { type: 'bar', position: [-1.2, 0, 0], size: 2.2, color: COLORS.primary, text: pair[0] },
      label(pair[0], [-1.2, -0.6, 0]),
    ] },
    { narration: `Second: ${pair[1]}.`, objects: [
      { type: 'bar', position: [1.2, 0, 0], size: 1.4, color: COLORS.accent, text: pair[1] },
      label(pair[1], [1.2, -0.6, 0]),
    ] },
    { narration: 'What differs, and why it matters.', objects: [label('compare', [0, 2.2, 0], COLORS.neutral)] },
  ], `Contrast ${pair[0]} with ${pair[1]}.`)
}

/** Block diagram — named blocks connected in order. */
function buildBlockDiagram(ctx: ArchetypeContext): VisualPayload | null {
  const terms = extractKeyTerms(ctx.title, ctx.description, 4)
  if (terms.length < 2) return null
  const objs: SceneObject[] = []
  const arrows: SceneObject[] = []
  terms.forEach((t, i) => {
    const x = i * 2.2 - ((terms.length - 1) * 2.2) / 2
    objs.push({ type: 'node', position: [x, 0, 0], radius: 0.42, color: COLORS.primary, text: t })
    if (i > 0) arrows.push({ type: 'arrow', from: [x - 2.2 + 0.5, 0, 0], to: [x - 0.5, 0, 0], color: COLORS.neutral })
  })
  return scene(ctx, 'block', 'process', [
    { narration: 'The blocks involved.', objects: objs },
    { narration: 'How they connect.', objects: arrows },
  ], 'Follow the path from one block to the next.')
}

/**
 * Labelled figure — the universal last GRAPHICAL resort.
 *
 * A central subject with its named parts radiating around it. Deliberately the
 * lowest-ranked archetype: it is honest and concept-specific, but generic in
 * shape. It exists so that "no graphic at all" stops being an outcome, and it
 * requires at least two real terms so it cannot degenerate into a lone circle.
 */
function buildLabelledFigure(ctx: ArchetypeContext): VisualPayload | null {
  const terms = extractKeyTerms(ctx.title, ctx.description, 6)
  if (terms.length < 2) return null
  const ring: SceneObject[] = []
  const spokes: SceneObject[] = []
  terms.forEach((t, i) => {
    const a = (i / terms.length) * Math.PI * 2
    const p: Vec3 = [Math.cos(a) * 2.6, Math.sin(a) * 2.6, 0]
    ring.push({ type: 'node', position: p, radius: 0.26, color: COLORS.primary, text: t })
    spokes.push({ type: 'path', points: [[0, 0, 0], p], color: COLORS.neutral })
  })
  return scene(ctx, 'figure', 'diagram', [
    { narration: 'The subject.', objects: [{ type: 'node', position: [0, 0, 0], radius: 0.5, color: COLORS.accent, text: clamp(ctx.title, 30) }] },
    { narration: 'Its parts.', objects: spokes },
    { narration: 'Each part, named.', objects: ring },
  ], 'Name each part and say what it does.')
}

// ── the archetype table ──────────────────────────────────────────────────────
/**
 * THE catalogue. Adding curriculum coverage means adding a row here or a
 * mapping in conceptArchetype.ts — never a new renderer, and never a
 * per-concept authored visual.
 */
export const ARCHETYPES: Record<Representation, Archetype> = {
  // ── physics: mechanics & motion (all card-backed) ──
  vector:            { representation: 'vector',            purpose: 'explain',     card: 'three_vector_visualization', build: buildVectorScene },
  force_diagram:     { representation: 'force_diagram',     purpose: 'explain',     card: 'force_diagram' },
  free_body_diagram: { representation: 'free_body_diagram', purpose: 'demonstrate', card: 'three_newton_forces', build: buildFreeBody },
  projectile:        { representation: 'projectile',        purpose: 'simulate',    card: 'three_projectile_motion' },
  circular_motion:   { representation: 'circular_motion',   purpose: 'simulate',    card: 'three_circular_motion' },
  pendulum:          { representation: 'pendulum',          purpose: 'simulate',    card: 'three_pendulum_motion' },
  collision:         { representation: 'collision',         purpose: 'simulate',    card: 'three_momentum_collision' },
  orbit:             { representation: 'orbit',             purpose: 'simulate',    card: 'solar_system' },
  motion_graph:      { representation: 'motion_graph',      purpose: 'derive',      card: 'coordinate_plane' },

  // ── physics: fields, waves, optics, electricity ──
  circuit:       { representation: 'circuit',       purpose: 'explain',     card: 'circuit_diagram' },
  ray_optics:    { representation: 'ray_optics',    purpose: 'demonstrate', build: buildBlockDiagram },
  wave:          { representation: 'wave',          purpose: 'explain',     card: 'wave_function', build: buildWave },
  field:         { representation: 'field',         purpose: 'explore',     build: buildField },
  energy_levels: { representation: 'energy_levels', purpose: 'explain',     card: 'energy_level_diagram' },

  // ── chemistry ──
  atom:            { representation: 'atom',            purpose: 'explain', card: 'three_atomic_structure' },
  electron_shells: { representation: 'electron_shells', purpose: 'explain', card: 'three_electron_shells' },
  molecule:        { representation: 'molecule',        purpose: 'explore', card: 'three_molecular_shapes' },
  bond:            { representation: 'bond',            purpose: 'explain', card: 'three_bond_formation' },
  crystal:         { representation: 'crystal',         purpose: 'explore', card: 'three_crystal_lattice' },
  periodic_trend:  { representation: 'periodic_trend',  purpose: 'compare', card: 'three_electron_shells' },

  // ── biology ──
  cell:               { representation: 'cell',               purpose: 'explain', build: buildLabelledFigure },
  dna:                { representation: 'dna',                purpose: 'explain', build: buildLabelledFigure },
  food_chain:         { representation: 'food_chain',         purpose: 'explain', card: 'food_chain' },
  water_cycle:        { representation: 'water_cycle',        purpose: 'explain', card: 'water_cycle' },
  punnett:            { representation: 'punnett',            purpose: 'derive',  build: buildBlockDiagram },
  ecological_pyramid: { representation: 'ecological_pyramid', purpose: 'compare', build: buildHierarchy },

  // ── mathematics ──
  graph:             { representation: 'graph',             purpose: 'derive',      card: 'coordinate_plane' },
  number_line:       { representation: 'number_line',       purpose: 'explain',     card: 'number_line' },
  fraction:          { representation: 'fraction',          purpose: 'explain',     card: 'fraction_bar' },
  percentage:        { representation: 'percentage',        purpose: 'explain',     card: 'percentage_grid' },
  coordinate_system: { representation: 'coordinate_system', purpose: 'explain',     card: 'three_coordinate_system' },
  geometry:          { representation: 'geometry',          purpose: 'explain',     card: 'geometry_shape' },
  geometric_solid:   { representation: 'geometric_solid',   purpose: 'explore',     card: 'three_geometric_solids' },
  transformation:    { representation: 'transformation',    purpose: 'demonstrate', card: 'three_transformations' },
  chart:             { representation: 'chart',             purpose: 'compare',     card: 'three_data_visualization' },
  probability_tree:  { representation: 'probability_tree',  purpose: 'derive',      build: buildHierarchy },

  // ── computer science ──
  data_structure: { representation: 'data_structure', purpose: 'explore',     card: 'three_data_structure' },
  algorithm:      { representation: 'algorithm',      purpose: 'demonstrate', card: 'three_algorithm_visualization' },
  network:        { representation: 'network',        purpose: 'explain',     card: 'three_network_packet_flow' },
  architecture:   { representation: 'architecture',   purpose: 'explain',     card: 'three_computer_architecture' },
  memory:         { representation: 'memory',         purpose: 'explain',     card: 'three_memory_storage' },

  // ── universal structural archetypes ──
  timeline:        { representation: 'timeline',        purpose: 'review',  build: (c) => processFlow(c, 'horizontal') },
  flowchart:       { representation: 'flowchart',       purpose: 'explain', build: (c) => processFlow(c, 'vertical') },
  process:         { representation: 'process',         purpose: 'explain', build: (c) => processFlow(c, 'vertical') },
  hierarchy:       { representation: 'hierarchy',       purpose: 'explain', build: buildHierarchy },
  comparison:      { representation: 'comparison',      purpose: 'compare', build: buildComparison },
  block_diagram:   { representation: 'block_diagram',   purpose: 'explain', build: buildBlockDiagram },
  labelled_figure: { representation: 'labelled_figure', purpose: 'explain', build: buildLabelledFigure },
}

/**
 * Draw an archetype. Prefers the hand-authored component (Class A) and falls
 * back to structural generation (Class B). Returns null when the archetype
 * cannot honestly render this concept — the resolver then tries the next one.
 */
export function renderArchetype(
  representation: Representation,
  ctx: ArchetypeContext,
): VisualPayload | null {
  const archetype = ARCHETYPES[representation]
  if (!archetype) return null
  if (archetype.card) return { renderer: 'card', visualType: archetype.card }
  try {
    return archetype.build ? archetype.build(ctx) : null
  } catch {
    return null   // a throwing builder must never break the turn
  }
}
