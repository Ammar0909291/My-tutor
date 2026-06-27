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
  // Quantum Physics (Visual Expansion Phase 2)
  | 'energy_level_diagram'
  | 'quantum_circuit'
  | 'stern_gerlach'
  | 'entanglement_pair'
  // 3D Educational Engine (Foundation Sprint 1) — engine types, not subject visuals
  | 'three_particle_system'
  // 3D Quantum Simulations Phase 1
  | 'three_double_slit'
  | 'three_quantum_tunneling'
  | 'three_bloch_sphere'
  | 'three_stern_gerlach'
  | 'three_hydrogen_orbital'
  // Classical Mechanics 3D Foundation Sprint
  | 'three_projectile_motion'
  | 'three_newton_forces'
  | 'three_momentum_collision'
  | 'three_circular_motion'
  | 'three_pendulum_motion'
  // Chemistry 3D Foundation Sprint
  | 'three_atomic_structure'
  | 'three_electron_shells'
  | 'three_molecular_shapes'
  | 'three_bond_formation'
  | 'three_crystal_lattice'
  // Mathematics 3D Foundation Sprint
  | 'three_coordinate_system'
  | 'three_vector_visualization'
  | 'three_surface_visualization'
  | 'three_geometric_solids'
  | 'three_transformations'
  // Computer Science 3D Foundation Sprint
  | 'three_computer_architecture'
  | 'three_memory_storage'
  | 'three_network_packet_flow'
  | 'three_data_structure'
  | 'three_algorithm_visualization'
  // Data Science 3D Foundation Sprint
  | 'three_statistical_distribution'
  | 'three_data_visualization'
  | 'three_correlation'
  | 'three_clustering'
  | 'three_ml_pipeline'

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
  energy_level_diagram: { title: 'Energy Level Diagram', description: 'Atomic energy levels with absorption and emission transitions producing a spectral line' },
  quantum_circuit:  { title: 'Quantum Circuit',    description: 'A two-qubit circuit with a Hadamard gate, CNOT entangling gate, and measurement' },
  stern_gerlach:    { title: 'Stern–Gerlach Experiment', description: 'An atom beam split by an inhomogeneous magnet into two discrete spin-up/spin-down spots' },
  entanglement_pair:{ title: 'Entangled Pair',     description: 'A Bell pair separating to two labs, where measuring one instantly correlates the other' },
  three_particle_system: { title: '3D Particle System', description: 'A reusable 3D particle simulation showing particles, motion, proximity interactions, and a highlighted particle' },
  three_double_slit: { title: '3D Double-Slit Experiment', description: 'A 3D double-slit simulation: source, two-slit barrier, propagating wavefronts, and a building interference pattern' },
  three_quantum_tunneling: { title: '3D Quantum Tunneling', description: 'A 3D tunneling simulation: a fixed-height barrier, an incoming wave packet, exponential penetration, and a reduced-amplitude transmitted packet' },
  three_bloch_sphere: { title: '3D Bloch Sphere', description: 'A 3D Bloch sphere: poles, equator, a superposition state vector, and phase precession' },
  three_stern_gerlach: { title: '3D Stern–Gerlach Experiment', description: 'A 3D Stern–Gerlach simulation: a beam, an inhomogeneous magnet, beam splitting, and two discrete spin detectors' },
  three_hydrogen_orbital: { title: '3D Hydrogen Orbital Explorer', description: 'A 3D hydrogen orbital explorer: nucleus, 1s/2s/2p probability clouds, and a comparison view' },
  three_projectile_motion: { title: '3D Projectile Motion', description: 'A 3D projectile motion simulation: ground plane, launch point, traced parabolic path, decomposed velocity vector, and the completed trajectory' },
  three_newton_forces: { title: "3D Newton's Forces", description: "A 3D Newton's-laws simulation: an object, the gravity and normal force vectors, the net-force explanation, and the final balanced-force state" },
  three_momentum_collision: { title: '3D Momentum Collision', description: 'A 3D momentum-collision simulation: two objects with motion vectors, the collision, the momentum transfer, and the final post-collision velocities' },
  three_circular_motion: { title: '3D Circular Motion', description: 'A 3D circular-motion simulation: the orbit path, a moving body, its velocity vector, the centripetal force vector, and the full motion animating' },
  three_pendulum_motion: { title: '3D Pendulum Motion', description: 'A 3D pendulum simulation: pivot, string, bob, the swing motion, and an energy indicator tracking kinetic vs potential energy' },
  three_atomic_structure: { title: '3D Atomic Structure', description: 'A 3D atom model: nucleus, protons and neutrons, an electron shell, multiple shells, and the completed orbiting atom' },
  three_electron_shells: { title: '3D Electron Shells', description: 'A 3D electron-shell model: nucleus, K shell, L shell, M shell, and each shell populated with its electrons' },
  three_molecular_shapes: { title: '3D Molecular Shapes', description: 'A 3D tetrahedral molecule built up from its atoms, bonds, overall geometry, labeled bond angles, and the final molecule' },
  three_bond_formation: { title: '3D Bond Formation', description: 'A 3D chemical-bonding simulation: separate atoms, their valence electrons, the approach, bond formation, and the stable molecule' },
  three_crystal_lattice: { title: '3D Crystal Lattice', description: 'A 3D crystal-lattice model: a single unit cell, the repeated structure, lattice growth, a symmetry plane, and the completed crystal' },
  three_coordinate_system: { title: '3D Coordinate System', description: 'A 3D coordinate system: X, Y, and Z axes built up in order, a labeled coordinate point, and the completed system with projection lines' },
  three_vector_visualization: { title: '3D Vector Visualization', description: 'A 3D vector visualization: the origin, the vector arrow, its magnitude, its directional components, and the completed visualization' },
  three_surface_visualization: { title: '3D Surface Visualization', description: 'A 3D surface visualization of z = x squared plus y squared: axes, a flat grid, the generated curved surface, contour rings, and the completed shaded surface' },
  three_geometric_solids: { title: '3D Geometric Solids', description: 'A set of 3D geometric solids: a cube, a sphere, a cylinder, a cone, each introduced in turn, then a side-by-side comparison view' },
  three_transformations: { title: '3D Transformations', description: 'A 3D geometric transformations sequence: an original cube, then its translation, rotation, and scaling, each introduced in turn, then a side-by-side comparison view' },
  three_computer_architecture: { title: '3D Computer Architecture', description: 'A 3D computer-architecture model: input devices, the CPU, memory, storage, and the data flow connecting them' },
  three_memory_storage: { title: '3D Memory Hierarchy', description: 'A 3D memory hierarchy: the CPU, RAM, cache, and storage as a speed-versus-size pyramid, and the path data takes moving up toward the CPU' },
  three_network_packet_flow: { title: '3D Network Packet Flow', description: 'A 3D packet-networking model: a sender, a created packet, a multi-hop router path, the destination, and the completed transmission' },
  three_data_structure: { title: '3D Data Structures', description: 'A 3D data-structures comparison: an array, a linked list, a stack, a queue, and how each stores and accesses data' },
  three_algorithm_visualization: { title: '3D Algorithm Visualization', description: 'A 3D sorting-algorithm flow: unsorted bars, a comparison, a swap, partial progress, and the final sorted result' },
  three_statistical_distribution: { title: '3D Statistical Distribution', description: 'A 3D statistical distribution: axes, data points, a histogram, the distribution curve, and summary statistics showing the mean and spread' },
  three_data_visualization: { title: '3D Data Visualization', description: 'A 3D data-visualization sequence: a dataset, a bar chart, a scatter plot, a trend line, and a comparison view of relationships and trends' },
  three_correlation: { title: '3D Correlation', description: 'A 3D correlation model: axes, random points, positive correlation, negative correlation, and a side-by-side comparison of correlation strength and direction' },
  three_clustering: { title: '3D Clustering', description: 'A 3D clustering model: a dataset of unclassified points, cluster centers, point assignment to the nearest center, and the final grouped clusters' },
  three_ml_pipeline: { title: '3D Machine Learning Pipeline', description: 'A 3D machine-learning pipeline: raw data, cleaning, feature preparation, the model, and the prediction output as a training and prediction workflow' },
}

/** Subjects where visual aids are applicable */
export const VISUAL_SUBJECTS = new Set(['mathematics', 'science', 'math', 'quantum_physics', 'physics', 'chemistry', 'computer_science', 'biology'])

