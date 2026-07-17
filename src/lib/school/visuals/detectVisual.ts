/**
 * Visual detection for Sprint BW.
 * Deterministic keyword match — no AI, no network call.
 * Returns the most relevant VisualType for a given topic context, or null.
 */

import type { VisualType } from './visualTypes'
import { VISUAL_SUBJECTS } from './visualTypes'

interface DetectVisualOptions {
  subjectSlug: string
  chapterTitle: string
  /** Optional: current lesson/node title for finer matching */
  lessonTitle?: string
}

type MatchRule = { keywords: string[]; visual: VisualType }

// Math rules — ordered by specificity (more specific first)
const MATH_RULES: MatchRule[] = [
  { keywords: ['fraction', 'fractions', 'numerator', 'denominator', 'rational number', 'part of a whole'], visual: 'fraction_bar' },
  { keywords: ['percent', 'percentage', 'per cent', 'profit and loss', 'discount', 'interest'], visual: 'percentage_grid' },
  { keywords: ['coordinate', 'cartesian', 'x-axis', 'y-axis', 'plot', 'graph', 'linear equation', 'straight line', 'slope', 'straight lines'], visual: 'coordinate_plane' },
  { keywords: ['number line', 'integers', 'negative number', 'rational number on number line', 'real number'], visual: 'number_line' },
  { keywords: ['triangle', 'quadrilateral', 'circle', 'polygon', 'angle', 'geometry', 'shape', 'area', 'perimeter', 'symmetry', 'congruence', 'similarity'], visual: 'geometry_shape' },
]

// Science rules
const SCIENCE_RULES: MatchRule[] = [
  { keywords: ['food chain', 'food web', 'producer', 'consumer', 'decomposer', 'ecosystem', 'trophic level', 'energy flow', 'herbivore', 'carnivore'], visual: 'food_chain' },
  { keywords: ['water cycle', 'evaporation', 'condensation', 'precipitation', 'transpiration', 'hydrological cycle', 'water vapor'], visual: 'water_cycle' },
  { keywords: ['solar system', 'planet', 'orbit', 'sun', 'earth moon', 'celestial', 'revolution', 'rotation of earth'], visual: 'solar_system' },
  // P0 fix: 'displacement'/'velocity'/'acceleration'/'speed' were grouped
  // here alongside genuine force/dynamics keywords — a kinematics lesson
  // titled "Displacement and Distance" or "Speed and Velocity" matched this
  // rule purely on vocabulary, producing a Force Diagram for a concept with
  // no force analysis at all. These four describe motion QUANTITIES, not
  // force interactions; removed from this group (they now fall through to
  // the registry's kinematics entries in visualRegistry.ts, or to no match,
  // rather than a wrong match). 'motion'/'newton'/'friction'/'laws of
  // motion'/'momentum' remain — those are genuinely force/dynamics-scoped.
  { keywords: ['force', 'motion', 'newton', 'friction', 'laws of motion', 'momentum'], visual: 'force_diagram' },
  { keywords: ['electric circuit', 'circuit', 'current electricity', 'resistance', 'ohm', 'voltage', 'battery', 'bulb', 'conductor', 'series', 'parallel'], visual: 'circuit_diagram' },
]

// Quantum Physics rules (Visual Expansion Sprint) — ordered most-specific first.
// 3D Production Integration Sprint — explicit "3D" / "rotate" phrasing is checked
// FIRST (most specific), so a lesson that asks for the rotatable 3D model gets the
// three_* VisualType; everything else falls through to the existing 2D rules below.
// This is the safe-selection strategy (Task 3): 2D stays the default for a plain/
// beginner explanation, 3D only surfaces when the text itself asks for it.
const QUANTUM_3D_RULES: MatchRule[] = [
  { keywords: ['3d double slit', '3d double-slit', 'double slit in 3d', 'three-dimensional double slit', 'rotate the double-slit', 'rotate the double slit'], visual: 'three_double_slit' },
  { keywords: ['3d tunneling', '3d tunnelling', 'tunneling in 3d', 'tunnelling in 3d', 'three-dimensional barrier', 'rotate the barrier'], visual: 'three_quantum_tunneling' },
  { keywords: ['3d bloch sphere', 'bloch sphere in 3d', 'rotate the bloch sphere', 'three-dimensional qubit state'], visual: 'three_bloch_sphere' },
  { keywords: ['3d stern-gerlach', '3d stern gerlach', 'stern-gerlach in 3d', 'rotate the stern-gerlach', 'rotate the magnet'], visual: 'three_stern_gerlach' },
  { keywords: ['3d orbital', '3d hydrogen orbital', 'orbital in 3d', 'rotate the orbital', 'three-dimensional electron cloud', 'orbital shapes in 3d'], visual: 'three_hydrogen_orbital' },
]

// Classical Mechanics 3D rules (Production Learning Integration Sprint) —
// same architecture as QUANTUM_3D_RULES: checked first under the 'physics'
// subject slug so mechanics-topic lesson text matches a 3D simulation;
// SCIENCE_RULES (force_diagram etc.) remains the 2D fallback for physics
// topics this table doesn't cover, exactly mirroring how QUANTUM_RULES is
// the 2D fallback for quantum_physics.
const MECHANICS_3D_RULES: MatchRule[] = [
  { keywords: ['projectile motion', 'launch angle', 'trajectory', 'ballistic motion'], visual: 'three_projectile_motion' },
  { keywords: ['centripetal force', 'circular motion', 'angular velocity'], visual: 'three_circular_motion' },
  { keywords: ['pendulum', 'oscillation', 'simple harmonic motion'], visual: 'three_pendulum_motion' },
  { keywords: ['collision', 'conservation of momentum', 'elastic collision', 'inelastic collision'], visual: 'three_momentum_collision' },
  { keywords: ['force diagram', 'net force', 'friction', 'newton laws', "newton's laws"], visual: 'three_newton_forces' },
]

// Chemistry 3D rules (Chemistry Production Learning Integration Sprint) —
// same architecture as MECHANICS_3D_RULES: checked first under the
// 'chemistry' subject slug so chemistry-topic lesson text matches a 3D
// simulation; SCIENCE_RULES remains the 2D fallback for chemistry topics
// this table doesn't cover, exactly mirroring the 'physics' branch.
const CHEMISTRY_3D_RULES: MatchRule[] = [
  { keywords: ['atomic structure', 'protons and neutrons', 'atomic nucleus', 'subatomic particle', 'atomic number', 'mass number'], visual: 'three_atomic_structure' },
  { keywords: ['electron shell', 'electron shells', 'shell configuration', 'k shell', 'l shell', 'm shell', 'electron configuration'], visual: 'three_electron_shells' },
  { keywords: ['molecular shape', 'molecular geometry', 'bond angle', 'tetrahedral', 'trigonal planar', 'vsepr'], visual: 'three_molecular_shapes' },
  { keywords: ['bond formation', 'ionic bond', 'covalent bond', 'metallic bond', 'chemical bonding', 'valence electron'], visual: 'three_bond_formation' },
  { keywords: ['crystal lattice', 'unit cell', 'lattice structure', 'crystalline solid', 'crystal structure'], visual: 'three_crystal_lattice' },
]

// Mathematics 3D rules (Mathematics Production Learning Integration Sprint) —
// same architecture as MECHANICS_3D_RULES/CHEMISTRY_3D_RULES: checked first
// under the 'mathematics' subject slug so 3D-coordinate/vector/surface/solid/
// transformation lesson text matches a 3D simulation; MATH_RULES remains the
// 2D fallback for mathematics topics this table doesn't cover, exactly
// mirroring the chemistry/physics branches.
const MATHEMATICS_3D_RULES: MatchRule[] = [
  { keywords: ['coordinate system', 'cartesian coordinates', '3d coordinates', 'xyz axes'], visual: 'three_coordinate_system' },
  { keywords: ['vector', 'vector components', 'vector magnitude', 'direction vector'], visual: 'three_vector_visualization' },
  // 'geometric solids'/'volume and surface area' checked before the generic
  // 'surface' keyword below, so a solids lesson mentioning "surface area"
  // isn't hijacked by the surface-visualization rule (Task 4 finding).
  { keywords: ['geometric solids', 'cube sphere cone cylinder', 'solid geometry', 'volume and surface area'], visual: 'three_geometric_solids' },
  { keywords: ['surface', '3d graph', 'paraboloid', 'saddle surface', 'multivariable function'], visual: 'three_surface_visualization' },
  { keywords: ['transformations', 'translation rotation scaling', 'geometric transformation'], visual: 'three_transformations' },
]

// Computer Science 3D rules (Computer Science Production Learning Integration
// Sprint) — same architecture as MECHANICS_3D_RULES/CHEMISTRY_3D_RULES/
// MATHEMATICS_3D_RULES: checked under the 'computer_science' subject slug so
// CS-topic lesson text matches a 3D simulation. Computer Science has no
// pre-existing 2D rule set, so this branch returns the 3D match directly (no
// 2D fallback table to consult), exactly mirroring the two-tier shape minus the
// fallback. Ordered most-specific first; intra-table first-match behaviour is
// reviewed in docs/COMPUTER_SCIENCE_PRODUCTION_INTEGRATION_REPORT.md (Task 4).
const COMPUTER_SCIENCE_3D_RULES: MatchRule[] = [
  { keywords: ['computer architecture', 'cpu', 'processor', 'central processing unit', 'input devices'], visual: 'three_computer_architecture' },
  { keywords: ['memory hierarchy', 'ram', 'cache', 'storage', 'memory and storage'], visual: 'three_memory_storage' },
  { keywords: ['network packet', 'packet routing', 'router', 'packet-based networking', 'packet flow'], visual: 'three_network_packet_flow' },
  { keywords: ['data structure', 'array', 'linked list', 'stack', 'queue'], visual: 'three_data_structure' },
  { keywords: ['algorithm', 'sorting', 'searching', 'sort algorithm'], visual: 'three_algorithm_visualization' },
]

// Data Science 3D rules (Data Science 3D Foundation Sprint follow-up wiring) —
// same architecture as COMPUTER_SCIENCE_3D_RULES: checked under the
// 'data_science' subject slug, no pre-existing 2D rule set, so this branch
// returns the 3D match directly. See docs/DATA_SCIENCE_3D_FOUNDATION_REPORT.md
// for the 5 visual components this table makes production-reachable.
const DATA_SCIENCE_3D_RULES: MatchRule[] = [
  { keywords: ['statistical distribution', 'histogram', 'mean and spread', 'standard deviation', 'distribution curve'], visual: 'three_statistical_distribution' },
  { keywords: ['data visualization', 'bar chart', 'scatter plot', 'trend line'], visual: 'three_data_visualization' },
  { keywords: ['correlation', 'positive correlation', 'negative correlation', 'regression'], visual: 'three_correlation' },
  { keywords: ['clustering', 'cluster center', 'unsupervised learning', 'grouped clusters'], visual: 'three_clustering' },
  { keywords: ['machine learning pipeline', 'feature preparation', 'data cleaning', 'model training', 'ml pipeline'], visual: 'three_ml_pipeline' },
]

const QUANTUM_RULES: MatchRule[] = [
  { keywords: ['double slit', 'double-slit', 'two slit', 'interference pattern', 'which-path', 'which path'], visual: 'double_slit' },
  { keywords: ['stern-gerlach', 'stern gerlach', 'spin measurement', 'spin up', 'spin down', 'spin-up', 'spin-down', 'angular momentum quantization', 'silver atom'], visual: 'stern_gerlach' },
  { keywords: ['entangle', 'entanglement', 'entangled', 'bell pair', 'bell state', 'bell inequality', 'epr', 'correlated measurement', 'no-signaling', 'spooky action'], visual: 'entanglement_pair' },
  { keywords: ['quantum circuit', 'cnot', 'hadamard', 'logic gate', 'qubit gate', 'quantum gate', 'quantum algorithm', 'circuit diagram'], visual: 'quantum_circuit' },
  { keywords: ['energy level', 'energy levels', 'spectral line', 'spectral lines', 'line spectrum', 'emission spectrum', 'absorption spectrum', 'atomic transition', 'photon emission', 'bohr model', 'electron transition'], visual: 'energy_level_diagram' },
  { keywords: ['bloch sphere', 'qubit', 'single-qubit', 'superposition state', 'quantum computer'], visual: 'bloch_sphere' },
  { keywords: ['tunnel', 'tunneling', 'tunnelling', 'barrier penetration', 'potential barrier', 'transmission probability'], visual: 'quantum_tunneling' },
  // 'energy level'/'energy levels' intentionally NOT listed here: energy_level_diagram
  // (above) matches them first via matchRules' first-match order, so they were dead
  // duplicates. potential_well stays reachable via its own distinct keywords below.
  { keywords: ['square well', 'potential well', 'infinite well', 'quantized energy', 'stationary state', 'bound state'], visual: 'potential_well' },
  { keywords: ['wavefunction', 'wave function', 'born rule', 'probability density', 'probability amplitude', 'psi', '|ψ|', 'schrödinger', 'schrodinger'], visual: 'wave_function' },
]

function matchRules(text: string, rules: MatchRule[]): VisualType | null {
  const lower = text.toLowerCase()
  for (const rule of rules) {
    if (rule.keywords.some((kw) => lower.includes(kw))) return rule.visual
  }
  return null
}

/**
 * Determine which visual (if any) best supports the current chapter/lesson context.
 * Returns null when no visual would meaningfully help.
 */
export function detectVisual(opts: DetectVisualOptions): VisualType | null {
  if (!VISUAL_SUBJECTS.has(opts.subjectSlug)) return null

  const combined = [opts.chapterTitle, opts.lessonTitle ?? ''].join(' ')

  // Mathematics — 3D rules checked first (Mathematics Production Learning
  // Integration Sprint), then MATH_RULES as the existing 2D fallback — same
  // two-tier pattern as quantum_physics/physics/chemistry above.
  if (opts.subjectSlug === 'mathematics') {
    return matchRules(combined, MATHEMATICS_3D_RULES) ?? matchRules(combined, MATH_RULES)
  }

  // Science (physics, chemistry, biology — all under 'science' slug)
  if (opts.subjectSlug === 'science') {
    return matchRules(combined, SCIENCE_RULES)
  }

  // Quantum Physics (Subject Library) — Phase 1 quantum visual set, plus the
  // 3D production visuals (3D Production Integration Sprint, Task 2): 3D rules
  // are checked first so explicit "3D"/"rotate" phrasing wins, otherwise the
  // existing 2D rules apply unchanged (zero behavior change for all existing text).
  if (opts.subjectSlug === 'quantum_physics') {
    return matchRules(combined, QUANTUM_3D_RULES) ?? matchRules(combined, QUANTUM_RULES)
  }

  // Physics (Subject Library, 'physics' slug — Classical Mechanics lessons
  // live here, distinct from the dedicated 'quantum_physics' slug). Classical
  // Mechanics Production Learning Integration Sprint: mechanics 3D rules
  // checked first, then SCIENCE_RULES (force_diagram etc.) as the existing
  // 2D fallback — same two-tier pattern as quantum_physics above.
  if (opts.subjectSlug === 'physics') {
    return matchRules(combined, MECHANICS_3D_RULES) ?? matchRules(combined, SCIENCE_RULES)
  }

  // Classical Mechanics (Subject Library, dedicated 'classical_mechanics' slug
  // — distinct from the generic 'physics' slug). Reuses the same mechanics 3D
  // rules and SCIENCE_RULES 2D fallback as 'physics' above, since both subjects
  // teach the same mechanics topics at the same visual fidelity.
  if (opts.subjectSlug === 'classical_mechanics') {
    return matchRules(combined, MECHANICS_3D_RULES) ?? matchRules(combined, SCIENCE_RULES)
  }

  // Chemistry (Subject Library, dedicated 'chemistry' slug — distinct from
  // the generic 'science' slug). Chemistry Production Learning Integration
  // Sprint: chemistry 3D rules checked first, then SCIENCE_RULES as the
  // existing 2D fallback — same two-tier pattern as physics/quantum_physics.
  if (opts.subjectSlug === 'chemistry') {
    return matchRules(combined, CHEMISTRY_3D_RULES) ?? matchRules(combined, SCIENCE_RULES)
  }

  // Biology (Subject Library, dedicated 'biology' slug — distinct from the
  // generic 'science' slug, used by senior-secondary stream catalogs).
  // SCIENCE_RULES already covers food_chain/water_cycle/solar_system, which
  // are biology/earth-science content — reuse it directly, no 3D fallback yet.
  if (opts.subjectSlug === 'biology') {
    return matchRules(combined, SCIENCE_RULES)
  }

  // Computer Science (Subject Library, dedicated 'computer_science' slug).
  // Computer Science Production Learning Integration Sprint: CS 3D rules are the
  // only rule set for this subject (no pre-existing 2D CS visuals), so the
  // branch returns the 3D match or null — same branch shape as the subjects
  // above, just without a 2D fallback table.
  if (opts.subjectSlug === 'computer_science') {
    return matchRules(combined, COMPUTER_SCIENCE_3D_RULES)
  }

  // Same shape as the 'computer_science' branch above — no pre-existing 2D
  // Data Science visuals, so this is the only rule set for this subject.
  if (opts.subjectSlug === 'data_science') {
    return matchRules(combined, DATA_SCIENCE_3D_RULES)
  }

  return null
}

/**
 * Parse a VISUAL:<type> tag from tutor response text.
 * Returns { visual, cleanText } — visual is null if no tag found.
 */
export function parseVisualTag(text: string): { visual: VisualType | null; cleanText: string } {
  const match = text.match(/\bVISUAL:\s*(\w+)\b/i)
  if (!match) return { visual: null, cleanText: text }
  const candidate = match[1].toLowerCase() as VisualType
  const VALID: Set<string> = new Set([
    'number_line', 'fraction_bar', 'percentage_grid', 'coordinate_plane',
    'geometry_shape', 'food_chain', 'water_cycle', 'solar_system',
    'force_diagram', 'circuit_diagram',
    'double_slit', 'wave_function', 'potential_well', 'quantum_tunneling', 'bloch_sphere',
    'energy_level_diagram', 'quantum_circuit', 'stern_gerlach', 'entanglement_pair',
    // 3D Production Integration Sprint — explicit 3D requests via the VISUAL: tag.
    'three_double_slit', 'three_quantum_tunneling', 'three_bloch_sphere',
    'three_stern_gerlach', 'three_hydrogen_orbital',
    'three_projectile_motion', 'three_newton_forces', 'three_momentum_collision',
    'three_circular_motion', 'three_pendulum_motion',
    // Chemistry Production Learning Integration Sprint.
    'three_atomic_structure', 'three_electron_shells', 'three_molecular_shapes',
    'three_bond_formation', 'three_crystal_lattice',
    // Mathematics Production Learning Integration Sprint.
    'three_coordinate_system', 'three_vector_visualization', 'three_surface_visualization',
    'three_geometric_solids', 'three_transformations',
    // Computer Science Production Learning Integration Sprint.
    'three_computer_architecture', 'three_memory_storage', 'three_network_packet_flow',
    'three_data_structure', 'three_algorithm_visualization',
    // Data Science 3D Foundation Sprint.
    'three_statistical_distribution', 'three_data_visualization', 'three_correlation',
    'three_clustering', 'three_ml_pipeline',
  ])
  const visual = VALID.has(candidate) ? candidate as VisualType : null
  // Only strip the matched text when it's a recognized tag. An unrecognized
  // candidate (typo, or "VISUAL:" appearing incidentally in real prose) is not
  // a tag at all and must be left in the displayed text, not silently eaten.
  const cleanText = visual ? text.replace(/\bVISUAL:\s*\w+\b\n?/i, '').trim() : text
  return { visual, cleanText }
}

/** System prompt block added to school-mode tutor context */
export function buildVisualsSystemBlock(availableVisual: VisualType | null): string {
  if (!availableVisual) return ''
  const all = [
    'number_line', 'fraction_bar', 'percentage_grid', 'coordinate_plane',
    'geometry_shape', 'food_chain', 'water_cycle', 'solar_system',
    'force_diagram', 'circuit_diagram',
    'double_slit', 'wave_function', 'potential_well', 'quantum_tunneling', 'bloch_sphere',
    'energy_level_diagram', 'quantum_circuit', 'stern_gerlach', 'entanglement_pair',
    'three_double_slit', 'three_quantum_tunneling', 'three_bloch_sphere',
    'three_stern_gerlach', 'three_hydrogen_orbital',
    'three_projectile_motion', 'three_newton_forces', 'three_momentum_collision',
    'three_circular_motion', 'three_pendulum_motion',
    'three_atomic_structure', 'three_electron_shells', 'three_molecular_shapes',
    'three_bond_formation', 'three_crystal_lattice',
    'three_coordinate_system', 'three_vector_visualization', 'three_surface_visualization',
    'three_geometric_solids', 'three_transformations',
    'three_computer_architecture', 'three_memory_storage', 'three_network_packet_flow',
    'three_data_structure', 'three_algorithm_visualization',
    'three_statistical_distribution', 'three_data_visualization', 'three_correlation',
    'three_clustering', 'three_ml_pipeline',
  ]
  return `\n\nVISUAL LEARNING AID: A visual diagram is available for this topic. When your response contains an explanation where a diagram would genuinely help the student visualise the concept (e.g. showing a number line when explaining integers, a fraction bar when explaining fractions, a circuit when explaining electricity), add the following tag on its own line at the END of your response:
VISUAL: ${availableVisual}
Available types: ${all.join(', ')}
Rules:
- Add at most ONE VISUAL tag per response.
- Only add it when the explanation DIRECTLY benefits from the visual — not for every response.
- Never mention "the diagram" in your explanation text — the student sees it automatically.
- Do not add VISUAL if your response is a question, correction, or short reply.`
}
