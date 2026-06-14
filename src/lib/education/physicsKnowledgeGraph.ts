import type { KnowledgeNode } from './educationTypes'

export const PHYSICS_KNOWLEDGE_GRAPH: KnowledgeNode[] = [
  // ─── UNITS AND MEASUREMENTS ──────────────────────────────────
  { id: 'physics.units_measurement', domain: 'physics', title: 'Units and Measurement', description: 'Physical quantities and SI units; fundamental and derived units; dimensions and dimensional analysis; significant figures; errors in measurement — absolute, relative, percentage; least count of instruments', difficulty: 'foundational', prerequisites: [] },

  // ─── KINEMATICS ──────────────────────────────────────────────
  { id: 'physics.kinematics_1d', domain: 'physics', title: 'Motion in a Straight Line', description: 'Distance vs displacement; speed vs velocity; acceleration; equations of motion (v=u+at, s=ut+½at², v²=u²+2as); graphical analysis — position-time, velocity-time; free fall and g; relative motion in 1D', difficulty: 'foundational', prerequisites: ['physics.units_measurement'] },
  { id: 'physics.kinematics_2d', domain: 'physics', title: 'Motion in a Plane', description: 'Scalars and vectors; vector addition — triangle and parallelogram law; resolution of vectors; unit vectors; projectile motion — time of flight, range, maximum height; uniform circular motion — centripetal acceleration', difficulty: 'developing', prerequisites: ['physics.kinematics_1d'] },

  // ─── LAWS OF MOTION ──────────────────────────────────────────
  { id: 'physics.laws_of_motion', domain: 'physics', title: 'Laws of Motion', description: 'Newton\'s three laws; inertia; momentum; impulse; free body diagrams; friction — static, kinetic, rolling; laws of friction; banking of roads; pseudo force in non-inertial frames', difficulty: 'developing', prerequisites: ['physics.kinematics_2d'] },
  { id: 'physics.work_energy', domain: 'physics', title: 'Work, Energy and Power', description: 'Work done by constant and variable force; kinetic and potential energy; work-energy theorem; conservation of mechanical energy; power; elastic and inelastic collisions in 1D and 2D; coefficient of restitution', difficulty: 'developing', prerequisites: ['physics.laws_of_motion'] },
  { id: 'physics.rotation', domain: 'physics', title: 'Rotational Motion and Rigid Bodies', description: 'Centre of mass; torque; angular momentum; moment of inertia; theorems of parallel and perpendicular axes; rolling motion; conservation of angular momentum; rotational kinetic energy', difficulty: 'proficient', prerequisites: ['physics.work_energy'] },
  { id: 'physics.gravitation', domain: 'physics', title: 'Gravitation', description: 'Newton\'s law of gravitation; gravitational field and potential; acceleration due to gravity; variation of g with altitude and depth; satellites — orbital velocity, escape velocity, binding energy; geostationary and polar satellites; Kepler\'s laws', difficulty: 'developing', prerequisites: ['physics.laws_of_motion'] },

  // ─── PROPERTIES OF MATTER ────────────────────────────────────
  { id: 'physics.elasticity', domain: 'physics', title: 'Mechanical Properties of Solids', description: 'Stress and strain; elastic moduli — Young\'s, bulk, shear; stress-strain curve; Hooke\'s law; elastic potential energy; applications of elasticity', difficulty: 'developing', prerequisites: ['physics.laws_of_motion'] },
  { id: 'physics.fluids', domain: 'physics', title: 'Mechanical Properties of Fluids', description: 'Pressure in fluids; Pascal\'s law; Archimedes\' principle; streamline and turbulent flow; equation of continuity; Bernoulli\'s theorem and applications; viscosity; Stokes\' law; surface tension — cohesion, adhesion, capillarity', difficulty: 'developing', prerequisites: ['physics.elasticity'] },
  { id: 'physics.thermal', domain: 'physics', title: 'Thermal Properties of Matter', description: 'Temperature and heat; specific heat capacity; calorimetry; change of state — latent heat; thermal expansion; heat transfer — conduction, convection, radiation; Newton\'s law of cooling; blackbody radiation; Stefan\'s law', difficulty: 'developing', prerequisites: ['physics.units_measurement'] },
  { id: 'physics.thermodynamics', domain: 'physics', title: 'Thermodynamics', description: 'Thermodynamic systems and processes; zeroth, first and second laws of thermodynamics; internal energy; work done by/on gas; heat engines and refrigerators; Carnot cycle and efficiency; entropy concept', difficulty: 'proficient', prerequisites: ['physics.thermal'] },
  { id: 'physics.kinetic_theory', domain: 'physics', title: 'Kinetic Theory of Gases', description: 'Ideal gas equation; assumptions of kinetic theory; pressure and temperature at molecular level; RMS, mean and most probable speeds; degrees of freedom; law of equipartition of energy; mean free path', difficulty: 'proficient', prerequisites: ['physics.thermodynamics'] },

  // ─── OSCILLATIONS AND WAVES ──────────────────────────────────
  { id: 'physics.oscillations', domain: 'physics', title: 'Oscillations', description: 'Simple harmonic motion — displacement, velocity, acceleration; energy in SHM; simple pendulum; spring-mass system; damped and forced oscillations; resonance', difficulty: 'proficient', prerequisites: ['physics.work_energy'] },
  { id: 'physics.waves', domain: 'physics', title: 'Waves', description: 'Wave motion — transverse and longitudinal; wave equation; speed of wave; superposition principle; reflection, refraction; standing waves; modes of vibration; beats; Doppler effect', difficulty: 'proficient', prerequisites: ['physics.oscillations'] },

  // ─── OPTICS ──────────────────────────────────────────────────
  { id: 'physics.ray_optics', domain: 'physics', title: 'Ray Optics', description: 'Reflection — plane and spherical mirrors; mirror formula; refraction — Snell\'s law, total internal reflection; refraction through prism; lenses — thin lens formula, lens maker\'s equation; magnification; optical instruments — microscope, telescope', difficulty: 'proficient', prerequisites: ['physics.waves'] },
  { id: 'physics.wave_optics', domain: 'physics', title: 'Wave Optics', description: 'Huygens\' principle; interference — Young\'s double slit experiment; coherence; diffraction — single slit; resolving power; polarisation — Brewster\'s law, Malus\' law', difficulty: 'advanced', prerequisites: ['physics.ray_optics'] },

  // ─── ELECTROSTATICS ──────────────────────────────────────────
  { id: 'physics.electrostatics', domain: 'physics', title: 'Electric Charges and Fields', description: 'Charge quantisation and conservation; Coulomb\'s law; electric field — point charge, dipole, continuous distributions; Gauss\'s law and applications; electric field lines; torque on dipole in uniform field', difficulty: 'proficient', prerequisites: ['physics.units_measurement'] },
  { id: 'physics.electric_potential', domain: 'physics', title: 'Electrostatic Potential and Capacitance', description: 'Electric potential and potential energy; equipotential surfaces; relation between E and V; capacitors — parallel plate, spherical, cylindrical; dielectrics; energy stored in capacitor; series and parallel combinations; Van de Graaff generator', difficulty: 'proficient', prerequisites: ['physics.electrostatics'] },

  // ─── CURRENT ELECTRICITY ─────────────────────────────────────
  { id: 'physics.current_electricity', domain: 'physics', title: 'Current Electricity', description: 'Electric current; Ohm\'s law and its limitations; resistivity and conductivity; temperature dependence of resistance; EMF; Kirchhoff\'s laws; Wheatstone bridge; potentiometer; combination of cells; power dissipation', difficulty: 'proficient', prerequisites: ['physics.electric_potential'] },

  // ─── MAGNETISM ───────────────────────────────────────────────
  { id: 'physics.magnetism_matter', domain: 'physics', title: 'Magnetism and Matter', description: 'Bar magnet; magnetic field lines; Earth\'s magnetism; magnetic properties of materials — dia, para, ferromagnetic; Curie\'s law; hysteresis; permanent magnets and electromagnets', difficulty: 'developing', prerequisites: ['physics.current_electricity'] },
  { id: 'physics.magnetic_effects', domain: 'physics', title: 'Moving Charges and Magnetism', description: 'Magnetic force on moving charge; Lorentz force; cyclotron; force on current-carrying conductor; torque on current loop; galvanometer; Biot-Savart law; Ampere\'s circuital law; solenoid and toroid', difficulty: 'proficient', prerequisites: ['physics.magnetism_matter'] },
  { id: 'physics.electromagnetic_induction', domain: 'physics', title: 'Electromagnetic Induction', description: 'Faraday\'s laws; Lenz\'s law; motional EMF; eddy currents; self and mutual inductance; energy stored in inductor; transformers', difficulty: 'advanced', prerequisites: ['physics.magnetic_effects'] },
  { id: 'physics.ac_circuits', domain: 'physics', title: 'Alternating Current', description: 'AC generator; RMS and peak values; phase; AC circuits — resistive, inductive, capacitive; phasor diagrams; impedance; resonance in LCR circuit; power factor; LC oscillations; transformers', difficulty: 'advanced', prerequisites: ['physics.electromagnetic_induction'] },

  // ─── MODERN PHYSICS ──────────────────────────────────────────
  { id: 'physics.electromagnetic_waves', domain: 'physics', title: 'Electromagnetic Waves', description: 'Displacement current; Maxwell\'s equations (conceptual); EM wave properties; electromagnetic spectrum — radio, microwave, IR, visible, UV, X-ray, gamma; uses of each band', difficulty: 'advanced', prerequisites: ['physics.ac_circuits'] },
  { id: 'physics.dual_nature', domain: 'physics', title: 'Dual Nature of Radiation and Matter', description: 'Photoelectric effect; work function; Einstein\'s photoelectric equation; de Broglie hypothesis; wave-particle duality; Davisson-Germer experiment; Heisenberg uncertainty principle', difficulty: 'advanced', prerequisites: ['physics.wave_optics'] },
  { id: 'physics.atoms', domain: 'physics', title: 'Atoms', description: 'Rutherford\'s experiment; Bohr\'s model of hydrogen atom; spectral series; energy levels; hydrogen spectrum; limitations of Bohr\'s model; atomic spectra', difficulty: 'advanced', prerequisites: ['physics.dual_nature'] },
  { id: 'physics.nuclei', domain: 'physics', title: 'Nuclei', description: 'Composition and size of nucleus; nuclear binding energy; mass defect; radioactivity — alpha, beta, gamma decay; half-life and decay law; nuclear fission and fusion; nuclear reactor; radiation hazards', difficulty: 'advanced', prerequisites: ['physics.atoms'] },
  { id: 'physics.semiconductors', domain: 'physics', title: 'Semiconductor Electronics', description: 'Energy bands; intrinsic and extrinsic semiconductors; p-n junction diode; forward and reverse bias; rectifiers; Zener diode; transistor — BJT; logic gates — AND, OR, NOT, NAND, NOR; integrated circuits overview', difficulty: 'advanced', prerequisites: ['physics.current_electricity', 'physics.atoms'] },

  // ─── COMMUNICATION SYSTEMS ───────────────────────────────────
  { id: 'physics.communication', domain: 'physics', title: 'Communication Systems', description: 'Elements of communication — transmitter, channel, receiver; bandwidth; modulation — AM, FM; propagation of EM waves; satellite communication; optical fibre; internet and mobile telephony', difficulty: 'developing', prerequisites: ['physics.electromagnetic_waves'] },
]

export function getPhysicsNode(id: string): KnowledgeNode | undefined {
  return PHYSICS_KNOWLEDGE_GRAPH.find((n) => n.id === id)
}

export function getPhysicsNodesByDomain(domain: string): KnowledgeNode[] {
  return PHYSICS_KNOWLEDGE_GRAPH.filter((n) => n.domain === domain)
}
