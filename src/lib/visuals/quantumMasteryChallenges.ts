/**
 * Quantum Visual Mastery — challenge bank (Visual Mastery Integration Sprint).
 * Static, hand-authored multiple-choice challenges paired with the 5
 * highest-value existing quantum VisualCard types. Purely additive data —
 * no new challenge framework; reuses the existing VisualMasterySignal /
 * EvidenceRecord pipeline via createMasteryEmitter (visualType: 'quantum_interactive').
 */
import type { VisualType } from '@/lib/school/visuals/visualTypes'

export interface QuantumMasteryChallenge {
  id: string
  /** Which existing quantum VisualCard renders the diagram for this challenge. */
  visual: VisualType
  /** revealStep to pin the diagram at (Infinity = fully revealed, the default teaching end-state). */
  revealStep?: number
  concept: string
  question: string
  options: string[]
  correctIndex: number
  /** The registered misconception theme this challenge targets (misconceptionEngine.ts RULES). */
  misconceptionType: string
}

export const QUANTUM_MASTERY_CHALLENGES: QuantumMasteryChallenge[] = [
  {
    id: 'double_slit_interference_region',
    visual: 'double_slit',
    concept: 'double_slit_interference',
    question: 'Where do the bright and dark fringes appear?',
    options: ['On the barrier, between the two slits', 'On the screen, where the two waves overlap', 'Only directly behind each slit, nowhere else'],
    correctIndex: 1,
    misconceptionType: 'quantum_wave_particle_duality',
  },
  {
    id: 'double_slit_one_slit_closed',
    visual: 'double_slit',
    concept: 'double_slit_which_path',
    question: 'If you close one slit, what happens to the interference pattern?',
    options: ['It stays exactly the same', 'It disappears — you get a single-slit blob, no fringes', 'It doubles in brightness'],
    correctIndex: 1,
    misconceptionType: 'quantum_wave_particle_duality',
  },
  {
    id: 'wave_function_psi_vs_density',
    visual: 'wave_function',
    concept: 'wave_function_born_rule',
    question: 'What does |ψ(x)|² represent, as opposed to ψ(x) itself?',
    options: ['The exact position of the particle', 'The probability density of finding the particle at x', 'The particle\'s momentum'],
    correctIndex: 1,
    misconceptionType: 'quantum_measurement_collapse',
  },
  {
    id: 'wave_function_can_be_negative',
    visual: 'wave_function',
    concept: 'wave_function_amplitude',
    question: 'ψ(x) can be negative in places. Why is |ψ(x)|² never negative?',
    options: ['Because ψ(x) is never actually negative', 'Because squaring (or |·|²) always gives a non-negative value, as required for a probability density', 'Because the Born rule forbids negative wavefunctions'],
    correctIndex: 1,
    misconceptionType: 'quantum_measurement_collapse',
  },
  {
    id: 'tunneling_transmitted_wave',
    visual: 'quantum_tunneling',
    concept: 'quantum_tunneling_transmission',
    question: 'After the barrier, the transmitted wave has the same shape as before but is...',
    options: ['Reduced in amplitude (lower probability), same wavelength', 'Increased in amplitude', 'Shifted to a completely different wavelength'],
    correctIndex: 0,
    misconceptionType: 'quantum_tunneling',
  },
  {
    id: 'tunneling_barrier_region',
    visual: 'quantum_tunneling',
    concept: 'quantum_tunneling_barrier',
    question: 'Inside the barrier region (E < V₀), how does the wave behave?',
    options: ['It oscillates exactly as it does outside the barrier', 'It decays exponentially — the particle does not "borrow" energy to cross', 'It stops completely and cannot be inside the barrier at all'],
    correctIndex: 1,
    misconceptionType: 'quantum_tunneling',
  },
  {
    id: 'bloch_sphere_poles',
    visual: 'bloch_sphere',
    concept: 'bloch_sphere_basis_states',
    question: 'What do the north and south poles of the Bloch sphere represent?',
    options: ['Two different qubits', 'The computational basis states |0⟩ and |1⟩', 'The two possible measurement devices'],
    correctIndex: 1,
    misconceptionType: 'quantum_computing',
  },
  {
    id: 'bloch_sphere_state_vector',
    visual: 'bloch_sphere',
    concept: 'bloch_sphere_superposition',
    question: 'A state vector pointing to the equator of the Bloch sphere represents...',
    options: ['An equal superposition of |0⟩ and |1⟩', 'A qubit that is broken or undefined', 'The qubit measured as exactly |0⟩'],
    correctIndex: 0,
    misconceptionType: 'quantum_computing',
  },
  {
    id: 'entanglement_correlated_outcomes',
    visual: 'entanglement_pair',
    concept: 'entanglement_correlation',
    question: 'Lab A measures spin-up. What does Lab B then measure on its entangled partner?',
    options: ['A random, uncorrelated result', 'The correlated outcome dictated by the entangled state (e.g. always spin-down for this pair)', 'Nothing — B\'s particle is destroyed'],
    correctIndex: 1,
    misconceptionType: 'quantum_entanglement',
  },
  {
    id: 'entanglement_no_signaling',
    visual: 'entanglement_pair',
    concept: 'entanglement_no_signaling',
    question: 'Can Lab A send a faster-than-light message to Lab B using entanglement alone?',
    options: ['Yes, instantly, because measurement is instantaneous', 'No — each individual result looks random; no usable signal is transmitted', 'Only if the particles are closer than 1 metre apart'],
    correctIndex: 1,
    misconceptionType: 'quantum_entanglement',
  },
]
