# Fields in Matter: D, H and Boundary Conditions — `phys.em.fields-in-matter`

## Identity

- **Concept ID**: `phys.em.fields-in-matter`
- **Curriculum location**: physics / electricity and magnetism (fields in materials)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.em.dielectrics` — the load-bearing part is that a dielectric raises
    capacitance by ε_r because it polarises; its chain includes Gauss's law.
  - `phys.em.magnetic-materials` — the load-bearing part is magnetisation (dia-, para-,
    ferromagnetism) and relative permeability μ_r.
  - `phys.em.amperes-law` — the load-bearing part is ∮B·dl = μ₀I, which becomes
    ∮H·dl = I_free in matter.
- **Unlocks** (from KG): none listed. Leads to Maxwell's equations in media, waveguides
  and optical properties of materials.
- **Difficulty**: expert · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 3 · **References**: Griffiths, Introduction to Electrodynamics Ch. 4 and 6

## Learning Objective

After this concept, the learner can:

1. Explain polarisation and bound charge, and use D = ε₀E + P = ε_rε₀E with Gauss's law
   for free charge.
2. Explain magnetisation and bound current, and use H = B/μ₀ − M with Ampère's law for
   free current.
3. Compute E, D, P in a dielectric-filled capacitor and H, B in a cored solenoid.
4. Apply the boundary conditions on D, E, B and H.

## Core Understanding

Matter responds to fields. In a dielectric placed in an electric field, each molecule's positive and negative charges shift slightly apart — the material polarises. Deep inside, neighbouring shifts cancel, but at the surfaces a thin layer of bound charge is left: negative next to a positive capacitor plate, positive next to a negative one. That bound charge produces a field opposing the applied one, so the total electric field inside the dielectric is weaker. The polarisation P (dipole moment per unit volume) measures the response; its surface value is the bound charge per area. Because bound charge is awkward to track, we define the electric displacement D = ε₀E + P. Gauss's law for D involves only the free charge we place on conductors: ∮D·dA = Q_free. In a linear dielectric, D = ε_rε₀E. For a capacitor with free charge density 1.0 × 10⁻⁶ C/m² filled with glass of ε_r = 4: D = 1.0 × 10⁻⁶ C/m², E = D/(ε_rε₀) ≈ 2.8 × 10⁴ V/m — a quarter of the 1.13 × 10⁵ V/m with no glass — and P = D − ε₀E = 7.5 × 10⁻⁷ C/m².

Magnetic materials behave analogously. In iron, atomic magnetic moments line up, and the aligned moments act like currents circulating around the surface of the material — bound currents. The magnetisation M (magnetic moment per unit volume) measures this. We define the magnetising field H = B/μ₀ − M, and Ampère's law for H involves only free current, the current in the wires we control: ∮H·dl = I_free. In a linear material, B = μ_rμ₀H. In a long solenoid with 1000 turns per metre carrying 2 A, H = nI = 2000 A/m whether the core is air or iron. With air, B ≈ 2.5 mT; with an iron core of μ_r = 500, B ≈ 1.26 T. H and B are different quantities: H follows the free current, while B = μ₀(H + M) includes the material's response.

At a boundary between two materials with no free charge or current on the surface, a small Gauss pillbox and a thin Ampère loop give four rules: the normal component of D is continuous, the tangential component of E is continuous, the normal component of B is continuous, and the tangential component of H is continuous. So the normal E jumps — a field of 1.0 × 10⁵ V/m normal to a vacuum–glass (ε_r = 4) surface becomes 2.5 × 10⁴ V/m inside — and field lines bend as they cross, much as light refracts.

## Mental Models

- **Beginner (arriving)**: matter is passive; a dielectric adds field; H and B are the
  same thing.
- **Intermediate**: polarisation → bound charge → weaker E; D sees free charge only;
  magnetisation → bound current; H sees free current only; four boundary conditions.
- **Advanced**: bound charge densities ρ_b = −∇·P, σ_b = P·n̂; bound currents J_b =
  ∇×M; linear media and susceptibilities χ_e, χ_m.
- **Expert**: nonlinear and anisotropic media; hysteresis; frequency-dependent ε(ω).
- **Versioning note**: install the intermediate model; mention χ_e and χ_m as the
  material constants behind ε_r and μ_r.

## Why Students Fail

"Adding material" sounds like adding field. D and H are introduced as formal
definitions without the bound-source motivation, so they look like duplicate fields.
And boundary conditions are memorised rather than derived from a pillbox and a loop.

## Misconceptions

**M1 — Inserting a dielectric strengthens the electric field**
- *Why*: "more material, more field" (type 4).
- *Symptom / phrases*: "the glass adds its charges to the field".
- *Detection probe (verbatim)*: "With the same free charge on the plates, is the
  electric field inside the glass bigger or smaller than it was in vacuum?"
- *Recovery*: the falling voltage of an isolated capacitor; bound charge opposing.
- *Verification*: compute E with and without the slab.

**M2 — H and B are the same field in different units**
- *Why*: the letters appear interchangeably in early courses (type 5).
- *Symptom*: "B and H both go up by μ_r".
- *Detection probe*: "A solenoid's current is unchanged but an iron core is inserted.
  Which changes a lot: H or B?"
- *Recovery*: Ampère's law for H counts free current only.
- *Verification*: compute H and B with and without a core.

**M3 — Every field component is continuous across a boundary**
- *Why*: "fields don't jump" intuition (type 5).
- *Symptom*: normal E taken as continuous.
- *Detection probe*: "Is normal E continuous across a vacuum–glass boundary?"
- *Recovery*: the pillbox — normal D is continuous, so normal E jumps by ε_r.
- *Verification*: apply all four rules to one boundary.

## Analogies

- **Best analogy**: a crowd of people each stepping slightly towards a stage — the
  middle looks unchanged, but one edge gains a line of people and the other loses one
  (bound surface charge).
  *Breaking point*: molecules don't choose; the shift is tiny and proportional to E.
- **Alternative**: H as "what you pay for" (free current) and B as "what you get"
  (including the material's bonus).
  *Breaking point*: illustrative only.
- **Anti-analogy to avoid**: "D and H are just E and B multiplied by constants in
  vacuum, so they're the same." It installs M2.

## Demonstrations

- **Home**: none safe at home; use simulations of polarised molecules.
- **Teacher demo**: an electrometer on an isolated charged capacitor as a glass or
  Perspex slab slides in (reading drops); a solenoid with and without an iron core and
  a Hall probe (B jumps; the ammeter reading, hence H, unchanged).
- **Prediction before demo**: "will the electrometer reading rise or fall?"

## Discovery Questions

**Structure**:
1. *Need*: "How do we calculate fields when matter is present?"
2. *Discovery*: falling voltage; rising B.
3. *Direct instruction*: P, D, M, H and the four boundary rules.
4. *Apply*: capacitors, electromagnets, refraction of field lines.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): glass and iron.
2. **Worked examples** (high fit): 2.8 × 10⁴ V/m; 2000 A/m → 1.26 T; 2.5 × 10⁴ V/m
   across a boundary.
3. **Error exposure** (high fit for M1/M2): the bound-charge picture; fixed H, jumping B.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) D = 1.0 × 10⁻⁶ C/m²; E = D/(4ε₀) ≈ 2.8 × 10⁴ V/m; P = 7.5 × 10⁻⁷ C/m².
   (b) H = 1000 × 2 = 2000 A/m; B = 500 × 4π × 10⁻⁷ × 2000 ≈ 1.26 T.
   (c) Normal D continuous: E_glass = 1.0 × 10⁵ / 4 = 2.5 × 10⁴ V/m.

2. **ERROR-ANALYSIS** — a student says the glass strengthens E. Show the electrometer.

3. **PREDICTION-BEFORE-DEMO** — before the slab slides in, ask the reading's direction.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "define D and H" → "E for σ_f = 2 × 10⁻⁶ C/m², ε_r = 5" → "the four boundary rules".

## Voice Teaching Notes

*How it sounds when taught well*: the tutor says "free" every time D or H is used;
draws the bound charges on the dielectric's faces before writing D.

*Load-bearing sentence to slow down on*: "D and H are fixed by the free charges and
currents we control; E and B include the material's response."

*What to listen for*: "the slab adds field" → M1; "H is just B" → M2; "everything is
continuous" → M3.

## Assessment Signals

**Diagnostic — golden probe**: "Same free charge — E in the glass bigger or smaller?"
Correct: smaller, by ε_r.

**Distractor-mapped items**:
- "E in glass (ε_r = 4) for σ_f = 10⁻⁶ C/m²?" Options: ≈ 2.8 × 10⁴ V/m; ≈ 4.5 × 10⁵
  V/m; ≈ 1.13 × 10⁵ V/m. Answer: the first. "4.5 × 10⁵" targets M1.
- "Iron core inserted at fixed current: H?" Options: unchanged; ×μ_r; zero. Answer:
  unchanged. "×μ_r" targets M2.

**Guided practice → independent practice fading ladder**:
1. Bound charge and P (3 items).
2. D and E in capacitors (3 items).
3. H and B in solenoids (3 items).
4. Boundary conditions (2 items).
5. (Unscaffolded) design a capacitor or electromagnet.

**Mastery gate set** (per assessment/05):
- *Production*: one D/E/P and one H/B calculation.
- *New surface*: transformer cores.
- *Mixed*: electric items interleaved with magnetic items.
- *Delayed*: one-week check — why glass lowers the voltage.

**Calibration note**: learners recite D = ε₀E + P; the check that reveals
miscalibration is "what happens to E when the slab goes in?"

## Tutor Recovery Strategy

*Likeliest utterance*: "the dielectric makes the field stronger" (M1).

*Concept-specific smaller question*: "What sign of bound charge appears next to the
positive plate?"

*M2 recovery*: "Has the free current in the coil changed?"

## Memory Hooks

- **Concept type**: definitions (P, D, M, H) + rules (boundary conditions).
- **Review form** (per Delivery 2 §8): "free sources → D, H" and the four boundary rules
  as spaced retrieval; calculations as distributed practice.
- **Automaticity target**: "D = ε₀E + P; H = B/μ₀ − M; normal D, B and tangential E, H
  continuous".
- **Interleaving partners**: `phys.em.dielectrics`, `phys.em.magnetic-materials`,
  `phys.em.amperes-law`.

## Transfer Connections

- *Near*: `phys.em.dielectrics` — capacitance with ε_r.
- *Near*: `phys.em.maxwells-equations` — the equations in media.
- *Far*: refractive index n = √(ε_rμ_r) and optics of materials.
- *Real-world*: capacitors, transformer cores, magnetic shielding, MRI.
- *Expert transfer*: metamaterials with engineered ε and μ.

## Cross-Subject Connections

- **Chemistry**: molecular polarisability, polar molecules.
- **Engineering**: insulation, transformer design.
- **Materials science**: ferroelectrics and ferromagnets.
- **Mathematics**: flux and circulation integrals; vector components.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.em.fields-in-matter.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-04 under the coverage-driven KG extension, advanced tier
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §B item 41). The audit listed
`phys.em.dielectrics` and `phys.em.magnetic-materials`; `phys.em.amperes-law` is added
because Ampère's law for H is load-bearing and is not in either chain (KGCS P1).

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-04): Initial full-standard entry, written with the KG node under the coverage-driven extension (advanced tier).
