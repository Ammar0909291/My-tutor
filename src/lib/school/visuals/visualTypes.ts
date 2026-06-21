/**
 * Visual Learning Aid types (Sprint BW).
 * Lightweight SVG-based visuals for Mathematics and Science explanations.
 * No canvas, no external libraries, no user editing.
 */

export type VisualType =
  | 'number_line'
  | 'fraction_bar'
  | 'percentage_grid'
  | 'coordinate_plane'
  | 'geometry_shape'
  | 'food_chain'
  | 'water_cycle'
  | 'solar_system'
  | 'force_diagram'
  | 'circuit_diagram'
  // Quantum Physics (Visual Expansion Sprint) — Phase 1 set
  | 'double_slit'
  | 'wave_function'
  | 'potential_well'
  | 'quantum_tunneling'
  | 'bloch_sphere'

export interface VisualAid {
  type: VisualType
  title: string
  description: string
}

export const VISUAL_META: Record<VisualType, { title: string; description: string }> = {
  number_line:      { title: 'Number Line',       description: 'A horizontal line showing numbers and their positions relative to zero' },
  fraction_bar:     { title: 'Fraction Bar',       description: 'A bar divided into equal parts to show fractions visually' },
  percentage_grid:  { title: 'Percentage Grid',    description: 'A 10×10 grid where filled squares represent a percentage value' },
  coordinate_plane: { title: 'Coordinate Plane',   description: 'An x-y axis system for plotting points and lines' },
  geometry_shape:   { title: 'Geometry Shapes',    description: 'Common 2D geometric shapes with labelled properties' },
  food_chain:       { title: 'Food Chain',         description: 'A linear sequence showing how energy flows from producers to consumers' },
  water_cycle:      { title: 'Water Cycle',        description: 'The continuous movement of water through evaporation, condensation, and precipitation' },
  solar_system:     { title: 'Solar System',       description: 'The Sun and the eight planets in their orbital paths' },
  force_diagram:    { title: 'Force Diagram',      description: 'An object showing the direction and nature of forces acting on it' },
  circuit_diagram:  { title: 'Electric Circuit',   description: 'A simple electric circuit showing battery, wires, switch, and bulb' },
  double_slit:      { title: 'Double-Slit Experiment', description: 'Particles passing through two slits build up a wave-like interference pattern on a screen' },
  wave_function:    { title: 'Wave Function ψ(x)',  description: 'The wavefunction ψ(x) and its probability density |ψ(x)|² (Born rule) on the same axes' },
  potential_well:   { title: 'Quantum Potential Well', description: 'An infinite square well with quantized energy levels and stationary-state wavefunctions' },
  quantum_tunneling:{ title: 'Quantum Tunneling',  description: 'A wave packet decaying exponentially through a barrier and emerging with reduced amplitude' },
  bloch_sphere:     { title: 'Bloch Sphere',       description: 'A qubit state as a vector on the Bloch sphere, with |0⟩/|1⟩ poles and a phase angle' },
}

/** Subjects where visual aids are applicable */
export const VISUAL_SUBJECTS = new Set(['mathematics', 'science', 'math', 'quantum_physics'])
