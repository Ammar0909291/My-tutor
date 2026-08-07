/**
 * Concept → Representation mapping.
 *
 * Returns an ORDERED list of candidate representations for a concept, most
 * specific first, always ending in the universal structural archetypes. The
 * resolver walks the list and takes the first that renders, so "what should we
 * draw" and "could we actually draw it" stay separate concerns.
 *
 * Purely deterministic: a keyword table over the concept's own KG title and
 * description, plus its domain prefix. No LLM, no inference, no scoring.
 *
 * WHY A LIST AND NOT A SINGLE ANSWER: a structural archetype can legitimately
 * decline (a "process" archetype refuses to draw a two-box flowchart from a
 * one-sentence description). Returning a ladder lets the concept degrade to a
 * simpler honest figure instead of collapsing straight to text.
 */

import type { Representation } from './types'
import type { ArchetypeContext } from './archetypes'
import { mentions } from './conceptText'

interface KeywordRule {
  representation: Representation
  keywords: readonly string[]
}

/**
 * Specific subject phenomena, checked before domain defaults. Order matters:
 * the first match wins, so narrower phrases must precede broader ones.
 */
const KEYWORD_RULES: readonly KeywordRule[] = [
  // physics — motion & mechanics
  { representation: 'free_body_diagram', keywords: ['free body', 'free-body', 'net force', 'newton\'s second', 'newtons second', 'equilibrium of forces'] },
  { representation: 'projectile',        keywords: ['projectile', 'trajectory', 'launch angle'] },
  { representation: 'circular_motion',   keywords: ['circular motion', 'centripetal', 'angular velocity', 'uniform circular'] },
  { representation: 'pendulum',          keywords: ['pendulum', 'simple harmonic', 'oscillat'] },
  { representation: 'collision',         keywords: ['collision', 'momentum', 'impulse', 'elastic', 'inelastic'] },
  { representation: 'orbit',             keywords: ['orbit', 'satellite', 'planetary', 'gravitation', 'kepler'] },
  { representation: 'vector',            keywords: ['vector', 'scalar', 'dot product', 'cross product', 'resultant', 'displacement'] },
  { representation: 'force_diagram',     keywords: ['force', 'friction', 'tension', 'normal force', 'weight'] },
  { representation: 'motion_graph',      keywords: ['kinematic', 'velocity-time', 'displacement-time', 'acceleration', 'motion graph'] },
  // physics — fields, waves, optics, electricity
  { representation: 'circuit',       keywords: ['circuit', 'resistor', 'ohm', 'current', 'voltage', 'capacitor', 'kirchhoff'] },
  { representation: 'ray_optics',    keywords: ['ray', 'lens', 'mirror', 'refraction', 'reflection', 'optic'] },
  { representation: 'wave',          keywords: ['wave', 'wavelength', 'amplitude', 'frequency', 'interference', 'diffraction', 'sound'] },
  { representation: 'field',         keywords: ['field', 'magnetic', 'electric field', 'flux', 'induction'] },
  { representation: 'energy_levels', keywords: ['energy level', 'orbital energy', 'spectrum', 'spectra', 'quantis', 'quantiz', 'band'] },
  // chemistry
  { representation: 'electron_shells', keywords: ['electron shell', 'electron configuration', 'valence', 'orbital'] },
  { representation: 'bond',            keywords: ['bond', 'covalent', 'ionic', 'metallic bond'] },
  { representation: 'molecule',        keywords: ['molecul', 'vsepr', 'geometry of', 'isomer', 'functional group'] },
  { representation: 'crystal',         keywords: ['crystal', 'lattice', 'unit cell', 'solid state'] },
  { representation: 'periodic_trend',  keywords: ['periodic', 'electronegativity', 'ionisation', 'ionization', 'atomic radius'] },
  { representation: 'atom',            keywords: ['atom', 'nucleus', 'isotope', 'proton', 'neutron'] },
  // biology
  { representation: 'dna',                keywords: ['dna', 'rna', 'nucleotide', 'double helix', 'transcription', 'translation'] },
  { representation: 'punnett',            keywords: ['punnett', 'mendel', 'allele', 'genotype', 'inheritance'] },
  { representation: 'food_chain',         keywords: ['food chain', 'food web', 'predator', 'trophic'] },
  { representation: 'ecological_pyramid', keywords: ['ecological pyramid', 'biomass', 'energy pyramid'] },
  { representation: 'water_cycle',        keywords: ['water cycle', 'evaporation', 'condensation', 'precipitation', 'nitrogen cycle', 'carbon cycle'] },
  { representation: 'cell',               keywords: ['cell', 'organelle', 'membrane', 'mitochondri', 'nucleus of the cell', 'tissue', 'organ'] },
  // mathematics
  { representation: 'fraction',          keywords: ['fraction', 'numerator', 'denominator', 'mixed number'] },
  { representation: 'percentage',        keywords: ['percent', 'percentage'] },
  { representation: 'number_line',       keywords: ['number line', 'integer', 'counting', 'place value', 'rounding', 'ordering'] },
  { representation: 'probability_tree',  keywords: ['probability', 'outcome', 'sample space', 'combinator'] },
  { representation: 'geometric_solid',   keywords: ['solid', 'polyhedron', 'volume', 'surface area', 'prism', 'sphere', 'cone'] },
  { representation: 'transformation',    keywords: ['transformation', 'rotation', 'reflection', 'translation', 'dilation', 'symmetry'] },
  { representation: 'coordinate_system', keywords: ['coordinate', 'cartesian', 'axes', 'quadrant'] },
  { representation: 'geometry',          keywords: ['triangle', 'circle', 'angle', 'polygon', 'quadrilateral', 'geometr', 'theorem', 'perimeter', 'area'] },
  { representation: 'graph',             keywords: ['function', 'equation', 'slope', 'linear', 'quadratic', 'derivative', 'integral', 'graph'] },
  { representation: 'chart',             keywords: ['statistic', 'data', 'distribution', 'mean', 'median', 'histogram', 'correlation'] },
  // computer science
  { representation: 'data_structure', keywords: ['array', 'list', 'stack', 'queue', 'tree', 'graph structure', 'hash'] },
  { representation: 'algorithm',      keywords: ['algorithm', 'sort', 'search', 'complexity', 'recursion'] },
  { representation: 'network',        keywords: ['network', 'protocol', 'packet', 'tcp', 'http', 'internet'] },
  { representation: 'memory',         keywords: ['memory', 'storage', 'cache', 'pointer', 'heap'] },
  { representation: 'architecture',   keywords: ['architecture', 'processor', 'cpu', 'compiler', 'operating system'] },
]

/** Domain-prefix defaults, used when no keyword rule matched. */
const DOMAIN_DEFAULTS: Readonly<Record<string, Representation>> = {
  'phys.mech':   'force_diagram',
  'phys.meas':   'vector',
  'phys.em':     'field',
  'phys.wave':   'wave',
  'phys.optics': 'ray_optics',
  'phys.therm':  'chart',
  'phys.mod':    'energy_levels',
  'phys.qm':     'energy_levels',
  'phys.particle': 'block_diagram',
  'phys.stat':   'chart',
  'phys.rel':    'block_diagram',
  'chem.atomic': 'atom',
  'chem.bond':   'bond',
  'chem.period': 'periodic_trend',
  'chem.solid':  'crystal',
  'chem.org':    'molecule',
  'bio.cell':    'cell',
  'bio.eco':     'food_chain',
  'bio.gen':     'dna',
  'math.arith':  'number_line',
  'math.alg':    'graph',
  'math.geom':   'geometry',
  'math.calc':   'graph',
  'math.trig':   'geometry',
  'math.stat':   'chart',
  'math.prob':   'probability_tree',
  'math.vec':    'vector',
  'math.found':  'hierarchy',
  'math.nt':     'number_line',
  'cs.ds':       'data_structure',
  'cs.algo':     'algorithm',
  'cs.net':      'network',
  'cs.found':    'architecture',
}

/**
 * The universal tail. Every concept ends here, in this order. `comparison` and
 * `process` self-decline unless the text genuinely supports them, so a concept
 * only reaches `labelled_figure` when nothing more specific was honest.
 */
const UNIVERSAL_TAIL: readonly Representation[] = [
  'comparison',
  'process',
  'hierarchy',
  'block_diagram',
  'labelled_figure',
]

/**
 * Ordered representation candidates for a concept. Never empty — the tail
 * guarantees at least one graphical attempt for every concept in every KG.
 */
export function conceptRepresentations(ctx: ArchetypeContext): readonly Representation[] {
  const haystack = `${ctx.title}. ${ctx.description}`
  const out: Representation[] = []
  const add = (r: Representation) => { if (!out.includes(r)) out.push(r) }

  for (const rule of KEYWORD_RULES) {
    if (mentions(haystack, rule.keywords)) add(rule.representation)
    if (out.length >= 3) break      // three specific candidates is plenty
  }

  for (const [prefix, representation] of Object.entries(DOMAIN_DEFAULTS)) {
    if (ctx.conceptId.startsWith(`${prefix}.`)) { add(representation); break }
  }

  UNIVERSAL_TAIL.forEach(add)
  return out
}
