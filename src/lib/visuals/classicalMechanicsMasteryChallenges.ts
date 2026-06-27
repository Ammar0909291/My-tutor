/**
 * Classical Mechanics Visual Mastery — challenge bank (Classical Mechanics
 * Subject Library sprint). Static, hand-authored multiple-choice challenges
 * paired with the 5 highest-value existing mechanics VisualCard types
 * (three_newton_forces, three_projectile_motion, three_circular_motion,
 * three_momentum_collision, three_pendulum_motion). Purely additive data —
 * no new challenge framework; reuses the existing VisualMasterySignal /
 * EvidenceRecord pipeline via createMasteryEmitter (visualType:
 * 'classical_mechanics_interactive'). Mirrors quantumMasteryChallenges.ts.
 */
import type { VisualType } from '@/lib/school/visuals/visualTypes'

export interface ClassicalMechanicsMasteryChallenge {
  id: string
  /** Which existing mechanics VisualCard renders the diagram for this challenge. */
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

export const CLASSICAL_MECHANICS_MASTERY_CHALLENGES: ClassicalMechanicsMasteryChallenge[] = [
  {
    id: 'newton_forces_constant_velocity',
    visual: 'three_newton_forces',
    concept: 'newton_first_law',
    question: 'An object moves in a straight line at constant velocity. What can you say about the net force on it?',
    options: ['The net force must be zero', 'There must be a constant forward force keeping it moving', 'The net force must equal its weight'],
    correctIndex: 0,
    misconceptionType: 'cm_inertia_requires_force',
  },
  {
    id: 'newton_forces_balanced_state',
    visual: 'three_newton_forces',
    concept: 'newton_first_law_balance',
    question: 'In the final state shown, gravity and the normal force are equal and opposite. What does this tell you about the object?',
    options: ['It is accelerating downward', 'It is in equilibrium — no change in its motion', 'It is about to fall through the surface'],
    correctIndex: 1,
    misconceptionType: 'cm_inertia_requires_force',
  },
  {
    id: 'projectile_horizontal_velocity',
    visual: 'three_projectile_motion',
    concept: 'projectile_velocity_components',
    question: 'As the ball rises and falls along its parabolic path, what happens to its horizontal velocity component (ignoring air resistance)?',
    options: ['It stays constant throughout the flight', 'It decreases to zero at the peak, then reverses', 'It increases the whole time, just like the vertical component'],
    correctIndex: 0,
    misconceptionType: 'cm_energy_conservation_sign',
  },
  {
    id: 'projectile_peak_velocity',
    visual: 'three_projectile_motion',
    concept: 'projectile_peak_height',
    question: 'At the very peak of the trajectory, what is true about the velocity?',
    options: ['Velocity is exactly zero', 'The vertical component is zero, but the horizontal component is not', 'Both components are zero'],
    correctIndex: 1,
    misconceptionType: 'cm_energy_conservation_sign',
  },
  {
    id: 'circular_motion_force_direction',
    visual: 'three_circular_motion',
    concept: 'centripetal_force_direction',
    question: 'For an object moving in a circle, which way does the centripetal force vector shown actually point?',
    options: ['Outward, away from the center', 'Inward, toward the center', 'Tangent to the circle, in the direction of motion'],
    correctIndex: 1,
    misconceptionType: 'cm_centripetal_force_outward',
  },
  {
    id: 'circular_motion_velocity_direction',
    visual: 'three_circular_motion',
    concept: 'centripetal_velocity_direction',
    question: 'The velocity vector shown is tangent to the circle. Why is a centripetal force still needed if the object isn\'t flying outward?',
    options: ['It isn\'t needed — the motion would continue in a circle without any force', 'It continuously changes the direction of the velocity, keeping the path curved', 'It speeds the object up at every point on the circle'],
    correctIndex: 1,
    misconceptionType: 'cm_centripetal_force_outward',
  },
  {
    id: 'momentum_collision_conservation',
    visual: 'three_momentum_collision',
    concept: 'momentum_conservation',
    question: 'In the collision shown, what quantity is guaranteed to be conserved (assuming no external forces)?',
    options: ['Total kinetic energy, always', 'Total momentum of the two-object system', 'The speed of each individual object'],
    correctIndex: 1,
    misconceptionType: 'cm_momentum_energy_confusion',
  },
  {
    id: 'momentum_collision_energy',
    visual: 'three_momentum_collision',
    concept: 'momentum_vs_kinetic_energy',
    question: 'After an inelastic collision where the objects stick together, what happens to total kinetic energy compared to before?',
    options: ['It stays exactly the same as momentum is conserved', 'Some kinetic energy is converted to other forms (heat, deformation), so it decreases', 'It always increases'],
    correctIndex: 1,
    misconceptionType: 'cm_momentum_energy_confusion',
  },
  {
    id: 'pendulum_energy_exchange',
    visual: 'three_pendulum_motion',
    concept: 'pendulum_energy_conservation',
    question: 'As the pendulum bob swings from its highest point to the lowest point of its arc, what happens to its energy (ignoring friction)?',
    options: ['Potential energy converts to kinetic energy, total mechanical energy stays constant', 'Both potential and kinetic energy decrease', 'Energy is lost permanently at the lowest point'],
    correctIndex: 0,
    misconceptionType: 'cm_shm_period_misconception',
  },
  {
    id: 'pendulum_period_dependence',
    visual: 'three_pendulum_motion',
    concept: 'pendulum_period_factors',
    question: 'For a simple pendulum with small swings, what does its period mainly depend on?',
    options: ['The mass of the bob', 'The length of the string (and gravity), not the mass', 'The amplitude of the swing, for any swing size'],
    correctIndex: 1,
    misconceptionType: 'cm_shm_period_misconception',
  },
]
