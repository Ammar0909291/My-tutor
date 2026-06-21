# Classical Mechanics — Curriculum Research Audit (Task 1)

**Status: research/design only.** No code, no DB, no subject registration. Synthesizes the common
structure across MIT 8.01 (Classical Mechanics), MIT 8.012 (honors), Stanford Physics 41/61, Caltech
Ph1, Cambridge Natural Sciences (Part IA Physics/Mechanics & Dynamics), and Oxford Physics (Prelims
Mechanics + Part A Classical Mechanics), to ground the master curriculum in
`CLASSICAL_MECHANICS_MASTER_CURRICULUM.md`.

## 1. Common curriculum structure across the reviewed programs

All six programs converge on the same five-stage arc, differing mainly in pace and rigor:

1. **Kinematics & vectors** — position/velocity/acceleration, vector algebra, units, 1D and 2D motion
   (projectile motion is the universal first "non-trivial" problem in every syllabus reviewed).
2. **Newtonian dynamics** — F = ma, force identification (gravity, normal, tension, friction, spring),
   free-body diagrams, Newton's three laws, circular motion and centripetal force.
3. **Conservation laws** — work–energy theorem, potential energy, conservation of energy, momentum
   and impulse, collisions (elastic/inelastic), center of mass.
4. **Rotational mechanics & gravitation** — torque, moment of inertia, angular momentum, rolling
   motion, rigid-body rotation, Kepler's laws, Newtonian gravitation, orbits.
5. **Analytical mechanics** — oscillations (SHM, damped/driven, resonance), introduction to Lagrangian
   mechanics (generalized coordinates, the Euler–Lagrange equation), and in the most advanced courses
   (MIT 8.012, Cambridge Part IB, Oxford Part A) Hamiltonian mechanics, normal modes, rigid-body
   dynamics (Euler's equations), and a brief touch of nonlinear/chaotic dynamics.

MIT 8.01 and Stanford 41 stop at stage 4 plus basic oscillations (algebra/early-calculus, first-year
level). MIT 8.012, Cambridge, Caltech Ph1, and Oxford push fully into stage 5, ending most sequences
with Lagrangian mechanics as the capping achievement of an undergraduate mechanics track — directly
mirroring the role Hilbert-space formalism played as the capping achievement of the Quantum Physics
curriculum (Level 3 there). This validates using **analytical mechanics as the natural "Level 3-style"
formal-reformulation pivot** in this curriculum, exactly as Dirac notation was for Quantum Physics.

## 2. Prerequisite chains identified

- **Math-before-physics gating**: every program requires single-variable calculus (derivatives,
  integrals) before kinematics is treated rigorously, and vector calculus / multivariable calculus
  before rotational dynamics and Lagrangian mechanics. Differential equations (especially the SHM
  equation, d²x/dt² = -ω²x) is a hard prerequisite for oscillations everywhere.
- **Physical chain**: kinematics → forces → work/energy → momentum → rotation → gravitation →
  oscillations → Lagrangian/Hamiltonian formalism. No reviewed program introduces rotation before
  linear momentum/energy, or Lagrangian mechanics before Newtonian forces are fully internalized —
  the formalism is always taught as a *reformulation* of already-mastered physical intuition, never
  as a replacement path in.
- **Conceptual chain**: free-body-diagram fluency is the single most load-bearing prerequisite skill —
  it gates correct treatment of friction, circular motion, rotational dynamics, and even Lagrangian
  generalized forces in every syllabus reviewed.

## 3. Beginner difficulties (cross-program consensus)

- Distinguishing **vector vs. scalar** quantities, and resolving vectors into components (universally
  the first stumbling block, predating any dynamics).
- Confusing **velocity and acceleration**, and misreading position/velocity/acceleration graphs
  (sign of slope vs. sign of the quantity itself).
- Drawing **incomplete or incorrect free-body diagrams** — omitting normal force, double-counting
  gravity and weight, inventing a "force of motion."
- Treating **friction as a fixed quantity** rather than reactive (kinetic vs. static, and the
  static-friction-can-be-less-than-maximum point).
- Conflating **mass and weight**, and misapplying F=ma in non-inertial (accelerating/rotating) frames
  without recognizing the need for a pseudo-force.
- In rotation: confusing **torque and force**, and moment of inertia as a fixed property of an object
  rather than axis-dependent.
- In energy: treating **potential energy as an absolute quantity** rather than reference-dependent, and
  misapplying energy conservation when non-conservative forces (friction, air resistance) are present.

## 4. Misconception clusters (high-level — full mapping in `CLASSICAL_MECHANICS_MISCONCEPTIONS.md`)

Five clusters recur across physics-education research underlying all six programs' diagnostic
practices (consistent with the Force Concept Inventory, the most widely used mechanics diagnostic in
the reviewed institutions):

1. **Force/motion misconceptions** — "motion implies a force," "force is a property of an object," no
   force ⇒ no motion (Aristotelian persistence).
2. **Inertia misconceptions** — heavier objects "want to stay still more," inertia conflated with
   momentum or with friction.
3. **Gravity misconceptions** — heavier objects fall faster (vacuum-independent reasoning), gravity
   "turns off" in space, normal force misunderstood as a reaction to gravity only.
4. **Momentum misconceptions** — momentum and force conflated, "momentum is used up" in collisions,
   confusing momentum conservation with energy conservation.
5. **Energy misconceptions** — energy "runs out" rather than transforms, kinetic and potential energy
   treated as independently conserved rather than total mechanical energy, work confused with force or
   with energy itself.

## 5. Visual-learning opportunities (high-level — full mapping in `CLASSICAL_MECHANICS_VISUALS.md`)

Mechanics is the most visually-native physics subject reviewed — every program's lecture materials and
problem sets are built around diagrams that animate cleanly with the existing `revealStep`-gated SVG
pattern proven on Quantum Physics: free-body force diagrams, projectile trajectories, inclined-plane
decompositions, circular-motion vector diagrams, momentum-collision before/after panels, energy-bar
diagrams, pendulum phase portraits, and spring/oscillator amplitude-vs-time traces. This gives Classical
Mechanics a higher visual-density ceiling than Quantum Physics's 9 production visuals, consistent with
its #1 ranking on "visual learning value" in `ADVANCED_SUBJECT_EXPANSION_REPORT.md`.

## 6. Implications for the master curriculum

- Use a **7-level structure mirroring Quantum Physics's proven shape**: Levels 1–2 build math +
  kinematics + Newtonian force foundations (mirrors QM's Level 1–2 "foundations + wave intuition"),
  Level 3 reaches a **formal reformulation pivot** (Lagrangian mechanics, mirroring QM's Hilbert-space
  pivot at Level 3), Levels 4–5 cover advanced applied systems (rotation, gravitation, oscillations —
  mirrors QM's "advanced systems" Level 4), Level 6 covers Hamiltonian/rigid-body/normal-mode
  formalism (mirrors QM's Level 5–6 "modern formalism" arc), and Level 7 is a **research-literacy
  capstone** (chaos, continuum mechanics, nonlinear dynamics orientation) — directly mirroring QM's
  Level 7 "Research Foundations — Orientation & Literacy" design decision.
- Free-body-diagram fluency must be an explicit, separately-assessed competency early (Level 1–2), not
  folded silently into "forces" — it is the single highest-leverage prerequisite skill identified above.
- Target scale comparable to Quantum Physics (33 units / 144 lessons) given Classical Mechanics' larger
  visual surface and broader exam relevance (CBSE/UP Board/JEE/engineering-prep, per Task 8 review).
