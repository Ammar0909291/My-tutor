# Angular Momentum Addition (Clebsch-Gordan) — `phys.qm.angular-momentum-addition`

## Identity

- **Concept ID**: `phys.qm.angular-momentum-addition` (canonical physics
  KG)
- **Curriculum location**: physics / quantum mechanics — dependency
  level 17.
- **Prerequisites**: `phys.qm.spin`, `phys.qm.hydrogen-atom-qm` —
  combining orbital angular momentum and spin (the spin-orbit coupling
  context) requires both already-established quantum numbers.
- **Unlocks** (from KG): none — leaf node (cross-linked to `phys.qm.
  identical-particles`, `phys.qm.scattering-theory-born-approximation`).
- **Difficulty**: expert · **Bloom**: analyze · **Mastery threshold**: 0.85
  · **Est. hours**: 10

## Learning Objective

The learner can: (1) correctly explain that z-COMPONENTS of angular
momentum add directly (Mⱼ=m₁+m₂), but the TOTAL quantum number j does
NOT add classically — j ranges over MULTIPLE values from |j₁−j₂| to
j₁+j₂ in integer steps, requiring diagonalization to find, not simple
addition; (2) correctly explain that combining two angular momenta
generally produces MULTIPLE possible total j values, not just one — e.g.
j₁=1 and j₂=½ give TWO totals (j=3/2 AND j=1/2), and the total state
count (2j₁+1)(2j₂+1) must match the sum over all resulting j
multiplicities as a mandatory consistency check.

## Core Understanding

When two quantum systems with angular momenta j₁ and j₂ combine, the
total angular momentum j ranges from |j₁−j₂| to j₁+j₂ in integer steps,
with Clebsch-Gordan coefficients giving the coupled-basis expansion. A
first persistent error assumes total angular momentum adds the same way
z-components do — believing "j = j₁+j₂ always," directly analogous to
adding m-values — but while Mⱼ=m₁+m₂ DOES hold exactly for
z-components, the TOTAL quantum number j spans a RANGE of values
(|j₁−j₂| to j₁+j₂), and finding which states have which j requires
diagonalizing J² in the uncoupled basis (or applying ladder-operator
techniques), not simple classical vector addition. A second error,
often paired with the first, assumes combining two angular momenta
yields only ONE resulting total — e.g. "j₁=1 and j₂=½ gives j=3/2 only"
— but this combination genuinely produces TWO total angular momenta:
j=3/2 (four states, m_j=−3/2 to +3/2) AND j=1/2 (two states, m_j=±1/2),
with the total state count (2·1+1)(2·½+1)=3×2=6 matching 4+2=6 exactly
— this state-count check is the mandatory verification that catches
under-enumeration of possible j values.

## Mental Models

**Beginner**: "Total angular momentum j just adds like z-components: j =
j₁+j₂; combining j₁=1 and j₂=½ gives only j=3/2." Upgrade trigger:
computing the total state count (2j₁+1)(2j₂+1)=6 for j₁=1, j₂=½ and
finding that j=3/2 alone only accounts for 4 states (missing 2) directly
confronts the single-total assumption, forcing the discovery of the
second j=1/2 sector.

**Intermediate**: "Mⱼ=m₁+m₂ always holds for z-components; the total j
ranges from |j₁−j₂| to j₁+j₂ in integer steps, generally producing
MULTIPLE possible totals; the state-count check (2j₁+1)(2j₂+1) = Σ(2j+1)
over all resulting j values verifies completeness." This model correctly
captures both points but may still need to explicitly run the ladder-
operator method or the state-count check for an unfamiliar j₁,j₂
combination rather than assuming a single "obvious" total.

**Advanced**: "Always list ALL possible j values from |j₁−j₂| to j₁+j₂
before proceeding, and always verify the total state count matches
(2j₁+1)(2j₂+1) as a mandatory consistency check."

**Expert**: the Clebsch-Gordan coefficient derivation via the lowering-
operator method (starting from the stretched state |j₁+j₂,j₁+j₂⟩ and
applying J₋=J₋⁽¹⁾+J₋⁽²⁾ repeatedly, using orthogonality to extract
lower-j states) and its direct application to hydrogen's spin-orbit
fine-structure splitting into 2p₁/₂ and 2p₃/₂ sub-levels — not required
for mastery, natural bridge to spectroscopic fine-structure analysis.

## Why Students Fail

The dominant failure is assuming total angular momentum j adds
classically like z-components (j=j₁+j₂ as a single value), rather than
ranging over a full set of possible values from |j₁−j₂| to j₁+j₂; a
closely related failure is assuming only ONE total j value results from
combining two angular momenta, missing that multiple totals generally
coexist and must all be enumerated, verified by a state-count check.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.qm.angular-momentum-
addition.md`, C2 Misconception Register) documents two; reused by
reference with birth-type added.

- **MC-AMA-VECTOR-ADD (total angular momentum J=L+S just adds the
  z-components: M=m_L+m_S, extended to imply j adds the same way)**:
  believing "I add m_L=1 and m_S=1/2 to get M=3/2 [and therefore
  j=3/2]." **Birth type**: overgeneralization (Type 1) — the genuinely
  correct z-component addition rule (Mⱼ=m₁+m₂) is incorrectly extended
  to imply the TOTAL quantum number j also adds directly, missing that
  states with the same M but different j must be found by diagonalizing
  J² in the uncoupled basis, not by simple addition. Probe: "Given
  m_L=1, m_S=1/2, what total angular momentum quantum number does this
  correspond to?"
- **MC-AMA-ONE-TOTAL-J (adding j₁=1 and j₂=1/2 gives j=3/2 only)**:
  believing "total spin is just 1+1/2=3/2," missing the second sector.
  **Birth type**: overgeneralization (Type 1) — the "obvious" maximum
  total (j₁+j₂) is treated as the only possible result, missing that
  angular momentum addition generally produces MULTIPLE possible totals
  ranging down to |j₁−j₂|, with the total state count
  (2j₁+1)(2j₂+1) requiring all of them to be included. Probe: "Adding
  j₁=1 and j₂=1/2 gives j=3/2 only?" [prompting the state-count check].

## Analogies

**Best**: the classical triangle inequality for vector addition — two
vectors of length j₁ and j₂ can combine to give any resultant length
between |j₁−j₂| and j₁+j₂ depending on their relative angle — directly
targets MC-AMA-ONE-TOTAL-J by making the RANGE of possible totals
intuitive (not just the maximum), while the anti-analogy below stops
students from over-trusting the classical picture for the quantized
result.

**Anti-analogy**: do NOT say "adding two angular momenta is exactly like
adding two classical vectors" without immediately qualifying it — this
directly risks installing MC-AMA-VECTOR-ADD, since classical vectors
add to a single continuous resultant, while quantum angular momenta
produce a discrete SET of possible j values (in integer steps from
|j₁−j₂| to j₁+j₂), each with its own multiplicity, not one continuous
answer.

## Demonstrations

Worked-example: add j₁=1/2 and j₂=1/2 (two spin-1/2 particles),
deriving both the triplet (j=1, 3 states: |↑↑⟩, (|↑↓⟩+|↓↑⟩)/√2, |↓↓⟩)
and singlet (j=0, 1 state: (|↑↓⟩−|↓↑⟩)/√2) sectors, verifying
4=(2·½+1)² total states — directly targets MC-AMA-ONE-TOTAL-J by
showing both sectors emerge necessarily, not just the "obvious" triplet.
Worked-example: derive the Clebsch-Gordan coefficients for j₁=1, j₂=1/2
(spin-orbit coupling for a p-electron) via the lowering-operator method,
applying it directly to hydrogen's 2p fine-structure splitting into
2p₁/₂ and 2p₃/₂ — grounds the abstract formalism in a real spectroscopic
result.

## Discovery Questions

Discovery-style: "For j₁=3/2 and j₂=1, list ALL possible total j values.
Count the total number of states two ways: (a) summing (2j+1) over your
list of j values, and (b) computing (2j₁+1)(2j₂+1) directly. Do they
match?" — learner discovers the full j=5/2,3/2,1/2 set (verified via
8+6+4=18? recompute: actually (2·3/2+1)(2·1+1)=4×3=12, matching
5/2+3/2+1/2 state counts 6+4+2=12) is required for the counts to agree,
directly confronting MC-AMA-ONE-TOTAL-J's single-total assumption
through a self-verifying arithmetic check.

## Teaching Sequence

Blueprint's C4 Teaching-Action Sequence cited by reference (7 TAs:
spin-orbit-splitting physical motivation → coupled/uncoupled basis
notation → Clebsch-Gordan expansion formula → MC-AMA-ONE-TOTAL-J
diagnostic via state-counting → spin-orbit worked example (j=3/2,1/2
sectors) → lowering-operator pattern drill → independent practice).
MC-AMA-VECTOR-ADD is addressed first during the coupled/uncoupled basis
notation-building (distinguishing Mⱼ=m₁+m₂ from the full j
determination), before MC-AMA-ONE-TOTAL-J during the dedicated
state-counting diagnostic.

## Tutor Actions

WORKED-EXAMPLE (two spin-1/2 particles: triplet j=1 plus singlet j=0,
state count verified); WORKED-EXAMPLE (j₁=1,j₂=1/2 spin-orbit coupling,
Clebsch-Gordan coefficients derived via lowering operators, applied to
hydrogen 2p fine structure); THOUGHT-EXPERIMENT (state-count
verification: summing (2j+1) over all resulting j values against
(2j₁+1)(2j₂+1)); ANALOGY (classical triangle inequality for vector
addition, with explicit quantization caveat).

## Voice Teaching Notes

Listen for "j just adds like the z-components" or "there's only one
total j" — the two direct misconception tells. Load-bearing sentence:
"z-components always just add — Mⱼ=m₁+m₂, no exceptions — but the TOTAL
j comes in a whole RANGE of possible values, from |j₁−j₂| up to j₁+j₂,
and you have to check the state count to make sure you haven't missed
one." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner assuming j adds directly like z-components signals
MC-AMA-VECTOR-ADD (full repair via the coupled-vs-uncoupled-basis
distinction and diagonalization requirement). A learner listing only
the maximum total j signals MC-AMA-ONE-TOTAL-J (full repair via the
state-count verification exercise). Mastery trigger: correctly listing
ALL possible total j values for any j₁,j₂ pair AND correctly verifying
the state count AND correctly deriving at least one Clebsch-Gordan
coefficient via the lowering-operator method. Blueprint's C5 Mastery-
Probe Set (MP-1 through MP-5) cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget quantum angular momentum for a second — if
two sticks of length 3 and length 1 are joined at a hinge, can the total
end-to-end distance be ANY single fixed number, or does it depend on the
hinge angle — ranging between some minimum and maximum?" (isolating the
range-not-single-value intuition before reapplying it to total angular
momentum specifically). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (Mⱼ=m₁+m₂ always; total j ranges over MULTIPLE values from
|j₁−j₂| to j₁+j₂; state-count check (2j₁+1)(2j₂+1)=Σ(2j+1) verifies
completeness) bound to procedure (listing all possible j values;
verifying state counts; deriving Clebsch-Gordan coefficients via
lowering operators). Interleave with `phys.qm.spin`, `phys.qm.hydrogen-
atom-qm`, and `phys.qm.operators`.

## Transfer Connections

Near: any two-angular-momentum coupling problem (spin-orbit coupling,
two-electron spin coupling, nuclear spin coupling). Far: scattering
theory's partial-wave decomposition (orbital angular momentum of the
scattered particle uses the identical Clebsch-Gordan technology) and
identical-particle symmetrization (the coupled spin states' symmetric/
antisymmetric character determines allowed spatial wave-function
symmetry). Real-world: explaining hydrogen's fine-structure spectral
doublets (2p₁/₂ vs. 2p₃/₂ splitting) directly observed in
spectroscopy. Expert: general Clebsch-Gordan coefficient tables and the
Wigner-Eckart theorem for matrix elements of tensor operators.

## Cross-Subject Connections

KG `cross_links` lists `phys.qm.identical-particles` and `phys.qm.
scattering-theory-born-approximation` (both physics, not yet
authored). No genuine cross-subject connection identified at this
authoring pass.

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.qm.angular-momentum-
addition.md`, C0-C9 format). Reuses: C2 Misconception Register and its
C5 Mastery-Probe Set by reference. Not restated: C0 Concept Metadata,
C3 full worked-example derivations, C4 full Teaching-Action Sequence
detail, C6 Known Sticking Points, C7 Adaptive-Teaching Rules, C8
Session-Flow Template.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

None. Prerequisites (`phys.qm.spin`, `phys.qm.hydrogen-atom-qm`) are
necessary and sufficient; no ambiguity or overlap found with sibling
concepts.

## Version History

- 2026-07-23 (physics EB Wave 17): initial authoring.
