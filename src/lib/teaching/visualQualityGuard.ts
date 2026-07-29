/**
 * B.8-14, C.15-23, D.24-30 — Visual Quality Guard.
 *
 * Runtime post-LLM checks that ensure visual content is:
 *  - concept-relevant (not merely subject-related)
 *  - educationally labeled (quantum numbers, MO labels, etc.)
 *  - narration-synced (text never references invisible elements)
 *  - low misconception risk
 *
 * Pure module: no DB, no I/O. All functions are deterministic and testable.
 * Integrates with the existing visualRegistry.ts and visualIntelligence.ts
 * without duplicating their logic.
 */

// ── B.8-14: Visual Relevance Filtering ──────────────────────────────────────

/**
 * B.11: Detect decorative/generic visuals that add no educational value.
 * A visual is decorative if the response text never substantively references
 * what the visual shows — it's just "pretty" filler.
 */
export function isDecorativeVisual(
  responseText: string,
  visualType: string | null,
): boolean {
  if (!visualType) return false
  const lower = responseText.toLowerCase()
  const VISUAL_CONCEPT_TERMS: Record<string, string[]> = {
    force_diagram: ['force', 'arrow', 'newton', 'vector', 'tension', 'friction', 'equilibrium', 'free body'],
    coordinate_plane: ['graph', 'axis', 'x-axis', 'y-axis', 'plot', 'slope', 'intercept', 'coordinate'],
    number_line: ['number line', 'point', 'interval', 'distance', 'scale'],
    geometry_shape: ['triangle', 'angle', 'side', 'vertex', 'polygon', 'area', 'perimeter'],
    circuit_diagram: ['circuit', 'resistor', 'current', 'voltage', 'battery', 'wire'],
    fraction_bar: ['fraction', 'numerator', 'denominator', 'part', 'whole', 'divide'],
    percentage_grid: ['percent', 'grid', 'shade', 'portion', 'out of 100'],
    three_atomic_structure: ['atom', 'proton', 'neutron', 'electron', 'nucleus', 'shell', 'orbital'],
    three_electron_shells: ['shell', 'electron', 'configuration', 'orbit', 'energy level', 'k shell', 'l shell'],
    three_bond_formation: ['bond', 'ionic', 'covalent', 'electron', 'sharing', 'transfer'],
    three_molecular_shapes: ['molecule', 'shape', 'geometry', 'tetrahedral', 'linear', 'bent', 'vsepr'],
    three_crystal_lattice: ['lattice', 'crystal', 'unit cell', 'structure', 'solid'],
    food_chain: ['food chain', 'producer', 'consumer', 'predator', 'prey', 'energy flow', 'trophic'],
    water_cycle: ['water cycle', 'evaporation', 'condensation', 'precipitation', 'runoff'],
    three_vector_visualization: ['vector', 'magnitude', 'direction', 'component', 'resultant'],
    three_projectile_motion: ['projectile', 'trajectory', 'launch', 'parabola', 'range'],
    three_newton_forces: ['force', 'newton', 'action', 'reaction', 'net force'],
    three_momentum_collision: ['momentum', 'collision', 'elastic', 'inelastic', 'conservation'],
    three_pendulum_motion: ['pendulum', 'swing', 'period', 'frequency', 'oscillation'],
    three_circular_motion: ['circular', 'centripetal', 'angular', 'radius', 'rotation'],
    three_geometric_solids: ['solid', 'cube', 'sphere', 'cylinder', 'cone', 'volume', 'surface area'],
    three_transformations: ['transformation', 'rotation', 'reflection', 'translation', 'dilation'],
  }
  const terms = VISUAL_CONCEPT_TERMS[visualType]
  if (!terms) return false
  return !terms.some((t) => lower.includes(t))
}

/**
 * B.10: Detect visuals with high misconception risk for the current concept.
 * Returns the risk reason if the visual+concept combination is known to cause
 * misconceptions, null otherwise.
 */
export function detectMisconceptionRiskVisual(
  conceptId: string | null,
  visualType: string | null,
): string | null {
  if (!conceptId || !visualType) return null
  const RISKY_COMBOS: Record<string, Record<string, string>> = {
    'three_atomic_structure': {
      'chem.atomic.quantum-numbers': 'Bohr model visual misleads about quantum orbital shapes — students think electrons orbit in fixed circles',
      'chem.atomic.orbital-theory': 'Bohr model visual contradicts orbital probability cloud concept being taught',
    },
    'three_electron_shells': {
      'chem.atomic.quantum-numbers': 'Shell diagram suggests electrons have fixed orbits, contradicting quantum number teaching (especially l and mₗ)',
    },
    'force_diagram': {
      'phys.mech.kinetic-energy': 'Force diagram for a pure energy quantity misleads students into thinking energy IS a force',
      'phys.mech.potential-energy': 'Force diagram for potential energy conflates energy with force',
      'phys.mech.power': 'Force diagram for power (energy/time) misleads about power being a force',
    },
  }
  return RISKY_COMBOS[visualType]?.[conceptId] ?? null
}

// ── C.15-23: Visual Accuracy ────────────────────────────────────────────────

/**
 * C.17-18: Detect narration referencing visual elements that don't exist
 * in the current visual type. Returns a list of phantom references.
 *
 * This catches the case where the LLM says "notice the red arrow" but the
 * visual doesn't have arrows, or "see the orbital shape" when showing a
 * Bohr shell diagram.
 */
export function detectNarrationPhantoms(
  responseText: string,
  visualType: string | null,
): string[] {
  if (!visualType) return []
  const lower = responseText.toLowerCase()
  const phantoms: string[] = []

  const VISUAL_CAPABILITIES: Record<string, { has: string[]; lacks: string[] }> = {
    three_electron_shells: {
      has: ['shell', 'electron', 'nucleus', 'ring', 'circle', 'dot'],
      lacks: ['orbital shape', 'probability cloud', 'wave function', 'lobe', 'dumbbell', 'p orbital', 'd orbital', 'electron cloud density'],
    },
    three_atomic_structure: {
      has: ['atom', 'proton', 'neutron', 'electron', 'nucleus', 'sphere'],
      lacks: ['orbital', 'probability cloud', 'wave function', 'lobe', 'dumbbell shape', 'quantum number'],
    },
    force_diagram: {
      has: ['arrow', 'force', 'direction', 'magnitude', 'label', 'vector'],
      lacks: ['energy bar', 'potential graph', 'kinetic energy curve', 'power curve'],
    },
    coordinate_plane: {
      has: ['axis', 'point', 'line', 'curve', 'slope', 'graph', 'plot'],
      lacks: ['3d', 'rotation', 'sphere', 'solid', 'volume'],
    },
    number_line: {
      has: ['line', 'point', 'number', 'mark', 'tick', 'interval'],
      lacks: ['plane', 'area', 'graph', 'curve', 'shape'],
    },
    circuit_diagram: {
      has: ['wire', 'resistor', 'battery', 'switch', 'current flow', 'component'],
      lacks: ['magnetic field line', 'electromagnetic wave', 'photon'],
    },
    geometry_shape: {
      has: ['angle', 'side', 'vertex', 'line', 'shape', 'triangle', 'polygon'],
      lacks: ['3d', 'volume', 'depth', 'cross-section'],
    },
    fraction_bar: {
      has: ['bar', 'part', 'whole', 'section', 'shaded', 'piece'],
      lacks: ['graph', 'axis', 'curve', 'plot'],
    },
  }

  const capabilities = VISUAL_CAPABILITIES[visualType]
  if (!capabilities) return []

  const REFERENCE_PATTERNS = [
    /\b(?:notice|see|look at|observe|check)\s+(?:the|how|that)\s+([^.!?\n]{3,40})/gi,
    /\b(?:in the (?:diagram|visual|figure|image))\s*,?\s*([^.!?\n]{3,40})/gi,
    /\b(?:the (?:diagram|visual|figure) shows?)\s+([^.!?\n]{3,40})/gi,
  ]

  for (const pattern of REFERENCE_PATTERNS) {
    for (const match of lower.matchAll(pattern)) {
      const referencedContent = match[1]?.trim()
      if (!referencedContent) continue
      for (const lackedTerm of capabilities.lacks) {
        if (referencedContent.includes(lackedTerm)) {
          phantoms.push(`Text references "${lackedTerm}" but ${visualType} cannot display this`)
        }
      }
    }
  }

  return phantoms
}

/**
 * C.20: Auto-inject educational labels into the system prompt based on
 * the concept being taught. These labels tell the LLM which specific
 * symbols/notations to use when referencing visual elements.
 */
export function getEducationalLabels(conceptId: string | null): string | null {
  if (!conceptId) return null

  const CONCEPT_LABELS: Record<string, string> = {
    'chem.atomic.quantum-numbers': 'Use these exact labels when referencing quantum numbers: n (principal), l (azimuthal/angular momentum), mₗ (magnetic), mₛ (spin). Always use subscript notation.',
    'chem.atomic.electronic-config': 'Label shells as K(n=1), L(n=2), M(n=3), N(n=4). Show electron counts per shell explicitly.',
    'chem.atomic.orbital-theory': 'Label orbitals by type: s (spherical), p (dumbbell), d (clover), f. Use n and l quantum numbers.',
    'chem.bond.covalent-bonding': 'Label: Bonding MO (σ, π), Antibonding MO (σ*, π*). Show electron pairs with dots or lines.',
    'chem.bond.ionic-bonding': 'Label: cation (+), anion (−). Show electron transfer direction with arrow. Label charge values.',
    'chem.bond.metallic-bonding': 'Label: metal cation cores, delocalized electron sea. Show positive charge on cations.',
    'chem.bond.vsepr': 'Label bond angles (e.g., 109.5° tetrahedral, 120° trigonal planar, 180° linear). Name the geometry.',
    'phys.mech.newtons-second-law': 'Label: F = ma. Show net force (ΣF), mass (m), acceleration (a). Use SI units (N, kg, m/s²).',
    'phys.mech.projectile-motion': 'Label: v₀ (initial velocity), θ (launch angle), g (gravity = 9.8 m/s²), range (R), max height (H).',
    'phys.mech.momentum': 'Label: p = mv. Show momentum (p), mass (m), velocity (v). Before/after collision states.',
    'phys.em.ohms-law': 'Label: V = IR. Show voltage (V, in volts), current (I, in amperes), resistance (R, in ohms Ω).',
    'phys.em.kirchhoffs-laws': 'Label: KCL (ΣI = 0 at junction), KVL (ΣV = 0 around loop). Show current directions.',
    'phys.wave.wave-properties': 'Label: amplitude (A), wavelength (λ), frequency (f), period (T). Show crest, trough, node.',
    'math.geom.pythagorean-theorem': 'Label: a² + b² = c². Identify hypotenuse (c) and legs (a, b). Show right angle mark.',
    'math.trig.trigonometric-ratios': 'Label: sin θ = O/H, cos θ = A/H, tan θ = O/A. Mark opposite (O), adjacent (A), hypotenuse (H).',
    'math.calc.differentiation': 'Label: f(x) curve, tangent line at point, slope = f\'(x). Show Δy/Δx approaching dy/dx.',
    'math.calc.integration': 'Label: ∫f(x)dx = area. Shade the area under the curve. Show limits a, b on x-axis.',
    'bio.gen.mendels-laws': 'Label: P (parent), F1 (first generation), F2 (second generation). Show dominant/recessive alleles.',
    'bio.mol.dna-structure': 'Label: sugar-phosphate backbone, nitrogenous bases (A-T, G-C). Show 5\' and 3\' ends.',
  }

  return CONCEPT_LABELS[conceptId] ?? null
}

/**
 * C.21: Build a visual capability awareness block for the system prompt.
 * Tells the LLM exactly what the current visual CAN and CANNOT show,
 * preventing narration that references invisible elements.
 */
export function buildVisualCapabilityBlock(
  visualType: string | null,
  conceptId: string | null,
): string {
  if (!visualType) return ''

  const labels = getEducationalLabels(conceptId)
  const labelBlock = labels ? `\nEDUCATIONAL LABELS: ${labels}` : ''

  const CAPABILITY_DESCRIPTIONS: Record<string, { canShow: string; cannotShow: string }> = {
    three_electron_shells: {
      canShow: 'concentric shells (K, L, M, N), electrons as dots on each shell, nucleus at center, element symbol and atomic number',
      cannotShow: 'orbital shapes (s/p/d/f lobes), probability clouds, wave functions, electron spin, quantum numbers directly',
    },
    three_atomic_structure: {
      canShow: 'protons, neutrons, electrons, nucleus, atomic number, mass number, basic particle arrangement',
      cannotShow: 'orbital shapes, electron configuration details, quantum states, energy levels, spectral lines',
    },
    force_diagram: {
      canShow: 'force arrows with magnitude/direction labels, net force, angle between forces, component decomposition',
      cannotShow: 'energy bars, potential energy graphs, work done areas, power curves, momentum before/after',
    },
    coordinate_plane: {
      canShow: '2D axes (x, y), plotted points, lines, curves, shaded regions, intercepts, slopes',
      cannotShow: '3D objects, volume, cross-sections, physical objects, circuit elements',
    },
    circuit_diagram: {
      canShow: 'resistors, batteries, switches, wires, current flow direction, voltage labels, component symbols',
      cannotShow: 'magnetic field lines, electromagnetic waves, internal component structure, charge carrier motion',
    },
    geometry_shape: {
      canShow: '2D shapes, angles with degree marks, side lengths, vertices, perpendicular/parallel marks',
      cannotShow: '3D solids, volumes, cross-sections, surface areas of 3D objects',
    },
    three_molecular_shapes: {
      canShow: 'molecular geometry (linear, bent, trigonal planar, tetrahedral, etc.), bond angles, atom positions, lone pairs',
      cannotShow: 'orbital hybridization visualization, molecular orbital diagrams, energy level diagrams',
    },
  }

  const desc = CAPABILITY_DESCRIPTIONS[visualType]
  if (!desc) return labelBlock

  return `
VISUAL CAPABILITY AWARENESS (${visualType}):
- This visual CAN show: ${desc.canShow}
- This visual CANNOT show: ${desc.cannotShow}
- NEVER describe or reference elements this visual cannot display.
- If you need to explain something the visual cannot show, say so explicitly: "This diagram shows the shell model. The orbital shapes we'll discuss are a deeper level not shown here."${labelBlock}`
}

// ── D.24-30: Pedagogical Visual Quality ─────────────────────────────────────

export interface VisualQualityScore {
  score: number // 0-100
  reasons: string[]
  shouldSuppress: boolean
}

/**
 * D.26: Score a visual's quality/relevance for the current teaching context.
 * Low scores indicate the visual should be suppressed.
 */
export function scoreVisualQuality(
  visualType: string | null,
  conceptId: string | null,
  responseText: string,
  isRepeat: boolean,
): VisualQualityScore {
  if (!visualType) return { score: 0, reasons: ['no visual available'], shouldSuppress: true }

  let score = 50
  const reasons: string[] = []

  // Concept-specific exact match is the highest signal
  const isExactMatch = conceptId != null && !conceptId.includes('.')
  if (isExactMatch) {
    score += 20
    reasons.push('exact concept match')
  }

  // Decorative check
  if (isDecorativeVisual(responseText, visualType)) {
    score -= 30
    reasons.push('response text never references what the visual shows')
  }

  // Misconception risk
  const misconceptionRisk = detectMisconceptionRiskVisual(conceptId, visualType)
  if (misconceptionRisk) {
    score -= 40
    reasons.push(`misconception risk: ${misconceptionRisk}`)
  }

  // Phantom narration
  const phantoms = detectNarrationPhantoms(responseText, visualType)
  if (phantoms.length > 0) {
    score -= 15 * phantoms.length
    reasons.push(`narration references ${phantoms.length} invisible element(s)`)
  }

  // Repeat penalty
  if (isRepeat) {
    score -= 20
    reasons.push('visual already shown this lesson')
  }

  // Short response — visual likely irrelevant
  const wordCount = responseText.split(/\s+/).length
  if (wordCount < 20) {
    score -= 15
    reasons.push('response too short for visual to add value')
  }

  score = Math.max(0, Math.min(100, score))
  return {
    score,
    reasons,
    shouldSuppress: score < 25,
  }
}

// ── E.31: Quantum Numbers Lesson Fixes ──────────────────────────────────────

/**
 * E.31: Build quantum-numbers-specific teaching constraints.
 * Addresses: incorrect hydrogen emphasis, missing shell/electron labels,
 * narration referencing invisible objects, generic 3D atom reuse,
 * no Bohr→quantum transition explanation.
 */
export function buildQuantumNumbersConstraints(conceptId: string | null): string {
  if (conceptId !== 'chem.atomic.quantum-numbers') return ''

  return `

QUANTUM NUMBERS LESSON CONSTRAINTS (concept-specific, mandatory):

1. HYDROGEN CONTEXT: Hydrogen (Z=1) is the simplest example. Use it to introduce n=1 ONLY, then immediately move to multi-electron atoms (e.g., Carbon Z=6) to show why l, mₗ, and mₛ matter. Do NOT spend more than 2 sentences on hydrogen alone.

2. SHELL/ELECTRON LABELS (mandatory in every explanation):
   - n = principal quantum number (energy level/shell: 1, 2, 3...)
   - l = azimuthal quantum number (subshell shape: 0=s, 1=p, 2=d, 3=f)
   - mₗ = magnetic quantum number (orbital orientation: -l to +l)
   - mₛ = spin quantum number (+½ or -½)
   Always write these with proper subscripts and define each symbol.

3. BOHR→QUANTUM TRANSITION (required before teaching quantum numbers):
   Begin by acknowledging what the student already knows (shell model/Bohr model), then explain WHY it's incomplete: "The shell model shows electrons in circular orbits, but quantum mechanics reveals they exist in probability clouds called orbitals. Quantum numbers are the 'address system' for these orbitals."

4. VISUAL HONESTY: If showing a shell diagram (Bohr model):
   - Explicitly say: "This simplified shell diagram helps us count electrons, but real orbitals have different shapes."
   - Never say "see the orbital shape" when showing a shell diagram.
   - Never reference p-orbital lobes, d-orbital clover shapes, or probability clouds unless the visual actually shows them.

5. NUCLEUS: Never over-emphasize the nucleus structure — quantum numbers describe ELECTRONS, not the nucleus. Mention the nucleus only to establish the electron's relationship to it.

6. PROGRESSION: Teach in order: n first (which shell) → l second (which subshell shape) → mₗ third (which orientation) → mₛ last (which spin). Each builds on the previous.`
}

// ── Combined guard (integrates with route.ts) ───────────────────────────────

export interface VisualGuardResult {
  suppressVisual: boolean
  suppressReason: string | null
  qualityScore: VisualQualityScore | null
  phantomReferences: string[]
  systemPromptAdditions: string
}

/**
 * Run the full visual quality guard. Called from route.ts after the visual
 * type is resolved but before the response is finalized.
 */
export function runVisualQualityGuard(input: {
  responseText: string
  visualType: string | null
  conceptId: string | null
  isRepeat: boolean
}): VisualGuardResult {
  const { responseText, visualType, conceptId, isRepeat } = input

  const phantomReferences = detectNarrationPhantoms(responseText, visualType)
  const qualityScore = scoreVisualQuality(visualType, conceptId, responseText, isRepeat)
  const misconceptionRisk = detectMisconceptionRiskVisual(conceptId, visualType)

  let suppressVisual = false
  let suppressReason: string | null = null

  if (qualityScore.shouldSuppress) {
    suppressVisual = true
    suppressReason = `quality score ${qualityScore.score}/100: ${qualityScore.reasons.join('; ')}`
  }

  if (misconceptionRisk) {
    suppressVisual = true
    suppressReason = misconceptionRisk
  }

  const systemPromptAdditions = [
    buildVisualCapabilityBlock(visualType, conceptId),
    buildQuantumNumbersConstraints(conceptId),
  ].filter(Boolean).join('\n')

  return {
    suppressVisual,
    suppressReason,
    qualityScore,
    phantomReferences,
    systemPromptAdditions,
  }
}
