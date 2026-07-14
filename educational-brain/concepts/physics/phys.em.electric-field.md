# Electric Field and Field Lines — `phys.em.electric-field`

## Identity

- **Concept ID**: `phys.em.electric-field`
- **Display name**: Electric Field and Field Lines
- **Domain**: electromagnetism
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.80
- **Estimated hours**: 4
- **Requires**: `phys.em.coulombs-law`
- **Unlocks**: `phys.em.electric-dipole`, `phys.em.gauss-law`, `phys.em.magnetic-force`
- **Load-bearing prerequisite content**:
  - From `phys.em.coulombs-law`: F = kq₁q₂/r² — force between point charges is proportional to each charge and inversely proportional to r²; the force on a positive charge in one location is directed away from a positive source charge and toward a negative source charge; superposition principle — the total force on a charge is the vector sum of forces from all other charges.
  - The electric field is defined as the force that the source charge arrangement would exert on a unit positive test charge placed at a point — it is a property of the source arrangement alone, independent of the test charge placed there.

---

## Mental models (4-stage progression)

**Stage 1 — Beginner**: An electric field is the "invisible influence" a charged object creates in the space around it. If you put a small positive test charge at any point near a source charge, the field tells you which way the test charge would be pushed or pulled, and how hard. Field lines are a map of this influence: they show the direction a positive charge would move at every point.

**Stage 2 — Intermediate**: The electric field **E** at a point is defined as the force **F** per unit positive test charge q₀ placed at that point: **E** = **F**/q₀. The SI unit is N/C (equivalent to V/m). For a point charge Q, the field at distance r is E = kQ/r², directed away from Q if Q > 0, toward Q if Q < 0. Field lines: (1) start on positive charges and end on negative charges (or go to infinity); (2) never cross each other; (3) the density (lines per area) represents field strength; (4) the tangent to a field line at any point gives the field direction there. By superposition, the total field from multiple charges is the vector sum of individual fields.

**Stage 3 — Advanced**: The electric field is a vector field — it assigns a vector **E**(r) to every point in space. The relationship **E** = **F**/q₀ is valid only in the limit q₀ → 0 (the test charge must be small enough not to disturb the source distribution). Gauss's law (∮ **E**·d**A** = Q_enc/ε₀) relates the flux of **E** through a closed surface to the enclosed charge — a far more efficient route to the field when symmetry permits (spherical, cylindrical, or planar). The concept of electric potential V and the relation **E** = −∇V connect the vector field to a scalar (much easier to compute for complex distributions).

**Stage 4 — Expert / University**: Maxwell's equations unify the electric field with the magnetic field: a time-varying magnetic field generates an electric field (Faraday's law ∇×**E** = −∂**B**/∂t), and conversely. In free space, **E** and **B** propagate together as electromagnetic waves. The quantum field theory picture replaces the classical field with a quantum field operator; photon exchange is the mechanism of electromagnetic interaction (QED).

**Model versioning**: Stage 2 is the operative model for secondary-level problems. Stage 3 (Gauss's law) is needed for symmetric charge distributions. Stage 4 is university electromagnetic theory.

---

## Why beginners fail

The dominant root cause is **field as a property of the test charge, not the source**: learners believe "the electric field at a point depends on what charge you put there." They reason: "If I put a larger charge at the point, there will be a larger force, so there must be a larger field." This conflates the force (which depends on the test charge) with the field (which does not). The field is a property of the source arrangement alone — it exists even with no test charge present, and it tells you what force would act on a unit positive charge placed there.

The secondary root cause is **field line density confusion**: learners treat field lines as literal paths charges travel (like train tracks), not as a mapping tool. They conclude that a charge placed off a field line "feels no force" or that charges "follow" field lines continuously rather than accelerating along the tangent direction.

---

## Misconception library

**M1 — "The electric field depends on the test charge placed there"**
- Characteristic phrase: "If I put a bigger charge there, the field gets stronger."
- Probe: "A +1 µC charge is placed at point P near a fixed +10 µC source. I then replace the +1 µC with a +10 µC charge. Does the electric field at P change?"
- Expected wrong answer: "Yes — the force increases, so the field must be bigger."
- Recovery: the electric field is defined as E = F/q₀. When you put a larger test charge there, F increases — but q₀ increases by the same factor, so F/q₀ is unchanged. The field is a ratio: force per unit test charge. It is determined entirely by the source arrangement (the fixed +10 µC). The test charge changes the force but not the field. Analogously, atmospheric pressure at a point doesn't change depending on the size of the object you place there.

**M2 — "Field lines are the paths that charges actually travel"**
- Characteristic phrase: "The positive charge will travel along this field line."
- Probe: "A positive charge is released from rest at a point where the field line curves. Which direction will the charge initially accelerate?"
- Expected wrong answer: "Along the curved field line" (implying it immediately follows the curve).
- Recovery: the field line direction gives the instantaneous force direction on a positive charge at that point — it is a tangent, not the trajectory. A released charge accelerates along the tangent to the field line at its current position, but as it moves the tangent direction changes, so the actual path curves differently (it follows a trajectory determined by F = ma at each instant, not by tracing a field line). Field lines are a map, not a roadway.

**M3 — "Field lines can cross"**
- Characteristic phrase: "At this point between the charges the fields cancel, so lines can pass through each other."
- Probe: "Can two electric field lines ever cross each other? What would it mean if they did?"
- Expected wrong answer: "Yes, when fields from two sources overlap, the lines from each source pass through the space and can cross."
- Recovery: field lines can never cross because the electric field at each point has exactly one direction (determined by vector superposition). If two lines crossed at a point, it would mean the field at that point has two directions simultaneously — which is physically impossible. At points where fields from multiple sources cancel (E = 0), there are no field lines at all; the lines terminate on charges or go to infinity — they do not cross.

**M4 — "A denser pack of field lines means more charges, not stronger field"**
- Characteristic phrase: "There are more lines near the charge because there are more charges."
- Probe: "Near the surface of a sphere of charge, field lines are closely packed. Far away, they are spread out. Does this mean there are more charges near the surface?"
- Expected wrong answer: "Yes — the lines are denser because the charges are concentrated near the surface."
- Recovery: the number of field lines drawn is a convention; what matters is their density — lines per unit area perpendicular to the field direction. Denser lines = stronger field. Near a point charge, the field is stronger (E = kQ/r² is large for small r); the same number of lines emanating from the charge are compressed into a smaller surface area, making them denser. This is not because there are more charges — it is because the field is stronger closer to the source.

---

## Explanation library

**E1 — The field as a test-charge ratio (definition)**
"Set up the source charge arrangement. Now imagine placing a tiny +1 C test charge at every point in space and measuring the force on it. At each point, the electric field E = F/q₀. The field is what the source creates — a property of the source and the point, not of the test charge. If you then placed a +2 C charge, the force would double, but E = (2F)/(2q₀) = F/q₀ — unchanged. The test charge 'reveals' the field; it doesn't create or change it."

**E2 — Field from a point charge (quantitative)**
"For a point charge Q, the field at distance r is E = kQ/r². Direction: away from Q if Q > 0; toward Q if Q < 0. The field falls off as 1/r² — at twice the distance, the field is one-quarter as strong. At r = 0.1 m from a +1 µC charge: E = (8.99×10⁹ × 10⁻⁶) / (0.1)² = 8.99×10⁵ N/C. A +2 µC test charge placed there feels F = q₀E = 2×10⁻⁶ × 8.99×10⁵ ≈ 1.8 N toward the test charge."

**E3 — Superposition of fields (two charges)**
"To find the field from two charges, find **E**₁ and **E**₂ separately (each using E = kQ/r² in the correct direction) and add them as vectors. If the two charges are +Q and −Q separated by distance d (a dipole), the fields reinforce between the charges and at the midpoint they add constructively. At a point far away (r >> d), the field falls off as 1/r³ (not 1/r²) because the near and far contributions partially cancel, leaving only the 'net' dipole contribution."

---

## Analogy library

**Primary analogy — Gravitational field (structure-identical)**
The gravitational field **g** at a point is defined as the gravitational force per unit mass placed there: **g** = **F**/m. The electric field **E** at a point is the electrostatic force per unit positive test charge: **E** = **F**/q₀. Both are "force per unit something" fields; both follow an inverse-square law; both use superposition; both have field lines (mass plays the role of charge, but gravity is always attractive). This analogy is nearly exact at the mathematical structure level and makes field lines immediately intuitive for learners who have met gravitational fields.

**Breaking point**: (1) Gravitational field lines only point toward masses (gravity is always attractive); electric field lines start on positive and end on negative charges (can be repulsive or attractive). (2) There is no gravitational equivalent of shielding (no Faraday cage for gravity); electric fields can be shielded by conductors. (3) Gravitational field strength on Earth's surface is approximately uniform (9.8 N/kg); electric fields vary enormously depending on charge arrangement.

**Anti-analogy — "The field is the force"**
The electric field is NOT the force on the test charge — it is the force per unit test charge. Stating "E = 500 N at this point" is a unit error and a conceptual error. The force on a specific charge q at that point is F = qE — the force depends on which charge is placed there; the field does not. Learners who write F in place of E in their field diagrams confuse the source property (E, fixed by the source) with the interaction outcome (F, depends on which test charge you chose).

---

## Demonstration library

**D1 — Van de Graaff generator field mapping (qualitative)**
Use grass seeds (or hair) suspended in a non-conducting liquid (castor oil) around a Van de Graaff generator. The seeds align with the electric field direction — a real-time map of field lines around the sphere. Change the geometry (add a grounded plate) and the pattern changes. This shows that field lines are a real spatial structure, not a cartoon.

**D2 — Two-charge field mapping with grass seeds**
Place two metal spheres (one positive, one negative) with castor oil and seeds between them. The seeds align to show the dipole field pattern — lines going from positive to negative, curving around the outside. Compare to the like-charge arrangement (two positives): lines repel and curve away from both spheres. No lines cross.

**D3 — Faraday cage shielding**
Place a small radio (or LED circuit) inside a metal mesh cage. The signal is attenuated or stopped — the mesh redistributes surface charges to cancel the external field inside. This demonstrates that conductors in equilibrium have zero internal field (all charges redistribute to the surface), a direct consequence of E field principles and a precursor to Gauss's law.

---

## Discovery lesson

**Argue for direct instruction with guided derivation**:

The field concept is a formal mathematical abstraction — there is no raw observational pathway that leads a learner to invent "force per unit test charge" independently. However, guided derivation earns the concept rather than handing it over:

Start with a settled result: "We know that the force between two point charges is F = kq₁q₂/r². Suppose we fix a source charge Q and slide a test charge q₀ around it. How does the force depend on q₀?" (Proportionally — twice the test charge, twice the force.) "How does it depend on the location?" (Only through r and direction to Q.)

"Now suppose I want to describe only what the source Q does — separating its effect from whatever test charge I happen to place there. What mathematical operation would let me write 'the influence of Q at point P, regardless of test charge'?" Guide to: F/q₀ — dividing out the test charge. This ratio depends only on Q and r, not on q₀. "That ratio is the electric field: **E** = **F**/q₀." The abstraction is earned.

---

## Teaching actions

**TA1 — Source vs. test charge discipline**: Before any field calculation, require the learner to identify: "Which is the source? Which is the test charge?" The field is calculated from the source configuration; the force on any given charge is then F = qE. Never conflate the two roles.

**TA2 — Direction declaration**: For every field vector drawn or stated, require the learner to state: "This field points in this direction because a positive test charge placed here would be pushed/pulled in this direction by the source." This prevents sign errors and makes the direction physical.

**TA3 — Field line rules check**: After drawing any field-line diagram, apply the four rules: (1) Did every line start on a positive charge or come from infinity? (2) Did every line end on a negative charge or go to infinity? (3) Do any lines cross? (If yes, erase one and fix it.) (4) Is line density proportional to field strength?

**TA4 — Superposition vector addition**: For two-charge problems, require the learner to find **E**₁ and **E**₂ at the target point as separate vectors (magnitude from E=kQ/r², direction from charge sign and position), then add them with explicit vector components. Learners who add magnitudes algebraically without considering direction produce systematic sign errors in multi-charge configurations.

---

## Voice teaching

> "The electric field at a point is not what a charge feels — it's what any unit positive charge would feel if placed there. E = F/q₀. The source creates the field; the test charge merely reveals it. Change the test charge and the force changes, but F/q₀ — the field — stays the same. The field is a property of the source arrangement, not of whatever probe you use."

> "Field lines are a map, not a track. A positive charge at any point accelerates in the direction of the field line tangent at that moment. As it moves, the tangent direction changes, so the path curves away from the field line. Field lines tell you the instantaneous force direction everywhere — they don't predict the trajectory."

> "Two field lines never cross because the field at each point has exactly one direction. If two lines crossed, the field at the crossing point would have two directions simultaneously — impossible. At the point where two equal and opposite fields cancel exactly, E = 0, and there simply are no field lines — the lines from each charge stop before reaching that point."

---

## Assessment

**Mastery gate**: The learner can (1) define **E** = **F**/q₀ and state that it is a property of the source, not the test charge; (2) calculate E from a point charge (E = kQ/r², correct direction); (3) apply superposition to find the net field from two or more charges by vector addition; (4) correctly draw or interpret a field-line diagram (start/end rules, no crossing, density = strength).

**Formative golden probe**
> "A +5 µC point charge is fixed at the origin. (a) Find the electric field at a point P located 0.2 m from the charge. (b) A +3 µC test charge is placed at P. What force acts on it? (c) The +3 µC is replaced by a −6 µC charge. What is the electric field at P now? (d) Draw the field lines around the +5 µC charge for r = 0.1 m and r = 0.2 m. How does the line density compare?"

- (a): E = kQ/r² = (8.99×10⁹ × 5×10⁻⁶) / (0.2)² = 1.12×10⁶ N/C, directed away from origin
- (b): F = qE = 3×10⁻⁶ × 1.12×10⁶ = 3.37 N, directed away from origin
- (c): The field at P is still 1.12×10⁶ N/C away from the origin — the test charge doesn't change the field. (The force on the −6 µC would be 6.74 N toward the origin, but the question asks about the field.)
- (d): At r = 0.1 m, the same lines pass through a sphere of half the radius — area is one-quarter as large — so line density is four times greater; field is four times stronger.

**Confidence calibration question**
After (c): "How sure are you that the field didn't change when the test charge changed?" (1–5). Low confidence → M1 (field depends on test charge) is still active; use E1 explanation.

**Delayed retrieval check (48 h / 7 days)**
"Two positive charges of equal magnitude are placed 10 cm apart. Where (if anywhere) between them is the electric field zero? Where is it zero outside the line connecting them?" (Between them — by symmetry, the point equidistant from both; outside — nowhere on the line, because both fields point outward in the same direction on either side. This tests superposition and direction simultaneously.)

---

## Recovery notes

**Failure mode A — M1 persists (field depends on test charge)**
Run the ratio argument explicitly: "Write down F = kQq₀/r². Now divide both sides by q₀. What do you get on the left? On the right?" The learner should see that q₀ cancels from the right side — the ratio F/q₀ = kQ/r² has no q₀ in it. "So if q₀ doubles, what happens to F/q₀?" The arithmetic forces the conclusion that the ratio is invariant. Then name the ratio E.

**Failure mode B — M2 persists (field lines = actual paths)**
Use D1 (grass seeds or iron filings around a magnet as a structural analogy). "Do the seeds move along the lines, or do they align with them?" They align. "Now, if a positive charge starts from rest at a point, it begins moving in the tangent direction — but then the tangent direction changes. Is the path the same as the field line?" Compute one step: take the starting field direction, compute the acceleration, move one small step. The new position has a slightly different field direction. The path diverges from the field line.

**Failure mode C — Field line density confusion (M4)**
Draw two field-line maps: a sphere with 8 lines at r=1 (large circle) vs. the same 8 lines at r=0.5 (small circle). Count lines per centimetre of arc. The small circle has twice the line density. "More lines per unit area means stronger field — not more charges. The charges are the same in both cases. What changed is r."

---

## Memory & review

**Memory type**: Definition (E = F/q₀) + formula (E = kQ/r² for point charge) + four field-line rules + superposition principle.

**Spaced retrieval schedule**: Day 1, Day 3, Day 7, Day 21.

**Retrieval prompts**:
- "Define the electric field. What are its SI units?"
- "If the distance from a point charge doubles, what happens to the electric field magnitude?"
- "List the four rules for drawing electric field lines."
- "A +2 µC and −2 µC charge are placed 4 cm apart. Where is the electric field largest in magnitude? Smallest?"

**Interleaving**: After mastery, interleave electric field problems with electric potential problems (V = kQ/r, **E** = −dV/dr). Learners must distinguish scalar (V) from vector (**E**) computations — a persistent confusion that only multiple mixed-type problems can resolve.

---

## Transfer map

**Immediate transfers**:
- `phys.em.electric-dipole`: two equal and opposite charges — the dipole field pattern is the canonical application of field superposition
- `phys.em.gauss-law`: electric flux = ∮ **E**·d**A** = Q_enc/ε₀; uses the field concept and requires understanding field direction for the dot product

**Downstream transfers**:
- `phys.em.magnetic-force`: F = q**v**×**B** — the magnetic force on a moving charge in a field; structurally parallel to the electric force F = q**E**
- Electric potential energy and potential: U = qV, **E** = −∇V — the energy picture of the same force field
- Capacitors: E = σ/ε₀ between the plates (uniform field), relates stored charge to field strength

**Cross-subject transfers**:
- `chem` — chemical bonding: the electrostatic field of the nucleus attracts electrons; covalent bonds arise from shared regions of high electron probability between positive nuclei — the underlying physics is the Coulomb field
- Biology — membrane potential: the electric field across a nerve cell membrane (~7×10⁷ V/m) is what drives ion channel opening; the field concept is directly the mechanism of signal propagation in neurons

---

## Curriculum feedback

The KG description "the electric field at a point is the electrostatic force per unit positive test charge placed at that point" is precise and complete. The three unlocks (electric-dipole, gauss-law, magnetic-force) represent appropriate immediate applications.

One gap: the KG does not mention field superposition explicitly. Superposition is the key computational tool for multi-charge problems and the principle that makes field lines a coherent (non-crossing) representation. It should appear in the learning outcomes.

A second gap: the KG does not mention that **E** = kQ/r² gives the field from a point charge. The definition E = F/q₀ alone is insufficient for calculation — learners need the explicit formula for the field from the source charge distribution. Point-charge field is the foundational calculation from which all other configurations (dipole, line charge via Gauss's law) are derived.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
