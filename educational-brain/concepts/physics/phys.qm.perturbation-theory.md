# Time-Independent Perturbation Theory — `phys.qm.perturbation-theory`

## Identity

- **Concept ID**: `phys.qm.perturbation-theory` (canonical physics KG)
- **Curriculum location**: physics / quantum mechanics — dependency
  level 17.
- **Prerequisites**: `phys.qm.operators`, `phys.qm.hydrogen-atom-qm` —
  perturbation theory computes matrix elements of operators between the
  exact hydrogen wave functions already established.
- **Unlocks** (from KG): none — leaf node.
- **Difficulty**: expert · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 8

## Learning Objective

The learner can: (1) correctly explain that perturbation theory does NOT
"always work" — it converges only when the perturbation's matrix
elements are much smaller than the unperturbed level spacings, and can
diverge or give nonsensical results otherwise; (2) correctly explain that
the first-order ENERGY correction Eₙ¹=⟨φₙ⁰|Ĥ'|φₙ⁰⟩ involves only the
DIAGONAL matrix element (no sum), distinct from the first-order STATE
correction |φₙ¹⟩, which sums over OFF-DIAGONAL matrix elements —
conflating the two formulas gives a completely wrong quantity;
(3) correctly explain that the standard non-degenerate perturbation
formula BREAKS DOWN for degenerate unperturbed levels (division by zero
in the energy denominator) — degenerate perturbation theory requires
diagonalizing the perturbation within the degenerate subspace first;
(4) correctly explain that time-independent perturbation theory shifts
energy levels and mixes STATIONARY states — it does NOT cause
transitions between states, which require time-DEPENDENT perturbation
theory instead.

## Core Understanding

When a Hamiltonian Ĥ=Ĥ⁰+λĤ' consists of an exactly-solvable part plus a
small perturbation, energies and wave functions can be expanded in
powers of λ, with the first-order energy correction simply
Eₙ¹=⟨φₙ⁰|Ĥ'|φₙ⁰⟩. A first persistent error treats perturbation theory as
universally applicable — but it is a power-series expansion that
converges only when |⟨φₘ⁰|Ĥ'|φₙ⁰⟩|≪|Eₙ⁰−Eₘ⁰| for all m≠n; when the
perturbation is comparable to level spacings, higher-order corrections
can exceed lower-order ones and the series diverges, requiring exact
diagonalization or variational methods instead. A second error confuses
the first-order energy correction formula (a single diagonal matrix
element, Eₙ¹=⟨n|Ĥ'|n⟩) with the first-order STATE correction formula (a
sum over off-diagonal matrix elements divided by energy denominators,
|φₙ¹⟩=Σ_{m≠n}[⟨m|Ĥ'|n⟩/(Eₙ⁰−Eₘ⁰)]|φₘ⁰⟩) — using the sum formula for
energy gives a completely different, wrong quantity. A third error
mechanically applies the non-degenerate formula to degenerate levels
(e.g. hydrogen's 2p states with l=1, m=−1,0,+1) — but the state-
correction denominator Eₙ⁰−Eₘ⁰ vanishes for other states in the SAME
degenerate subspace, causing division by zero; degenerate perturbation
theory instead diagonalizes Ĥ' restricted to the degenerate subspace,
whose eigenvalues give the correct first-order energy corrections. A
fourth error assumes a constant perturbation (like a static electric
field) causes TRANSITIONS between energy levels — but time-independent
perturbation theory shifts and mixes STATIONARY states only; genuine
transitions (with rates given by Fermi's golden rule) require a
time-DEPENDENT perturbation, oscillating at the resonant frequency.

## Mental Models

**Beginner**: "Perturbation theory works for any small H'; the energy
correction formula is a sum over m≠n; the non-degenerate formula applies
regardless of degeneracy; a constant electric field causes transitions
between levels." Upgrade trigger: applying perturbation theory to a
two-level system where H' is comparable to the level splitting (finding
the correction exceeds the unperturbed energy, an obviously wrong
result) directly confronts the always-works assumption; deriving
Eₙ¹=⟨n|H'|n⟩ by projecting the first-order Schrödinger equation onto
⟨φₙ⁰| (finding a single diagonal term, not a sum) directly confronts the
sum-formula confusion.

**Intermediate**: "Perturbation theory converges only when matrix
elements are much smaller than level spacings; Eₙ¹ is a single diagonal
matrix element while |φₙ¹⟩ is a sum of off-diagonal terms; degenerate
subspaces require diagonalizing H' first; constant perturbations shift
levels, they don't cause transitions." This model correctly captures all
four points but may still need to explicitly verify the convergence
condition or check for degeneracy before applying the formula to an
unfamiliar system.

**Advanced**: "Always check the convergence condition
|⟨m|H'|n⟩|≪|Eₙ⁰−Eₘ⁰| before trusting a perturbative result, and always
check for degeneracy in the relevant subspace before applying the
non-degenerate formula."

**Expert**: the full second-order treatment (Eₙ²=Σ_{m≠n}|⟨m|H'|n⟩|²/
(Eₙ⁰−Eₘ⁰), always negative for the ground state since all denominators
are negative) and the application to hydrogen's fine structure
(relativistic kinetic correction, spin-orbit coupling, Darwin term,
combining into the observed j-dependent doublet splitting) — not
required for mastery, natural bridge to `phys.qm.selection-rules`'s
matrix-element vanishing conditions.

## Why Students Fail

The dominant failure is treating perturbation theory as universally
valid without checking the convergence condition; closely related
failures include conflating the first-order energy correction formula
(diagonal, no sum) with the first-order state correction formula (sum
over off-diagonal terms), mechanically applying the non-degenerate
formula to degenerate levels (causing division by zero), and assuming a
static perturbation causes transitions rather than merely shifting
stationary-state energies.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.qm.perturbation-theory.md`,
Section 4 Misconception Library) documents four; reused by reference
with birth-type added.

- **MC-1 (perturbation theory always works)**: believing "you can
  always use perturbation theory — just add more terms." **Birth
  type**: instruction-induced (Type 5) — textbooks typically present
  only clean, convergent examples, building over-confidence in the
  method's universal applicability, missing that the series can diverge
  when matrix elements are comparable to level spacings. Probe: "When
  does perturbation theory fail?"
- **MC-2 (first-order energy correction requires summing over all
  m≠n)**: believing "Eₙ¹=Σ_{m≠n}⟨m|H'|n⟩." **Birth type**: notation-
  induced (Type 4) — the sum-over-off-diagonal-terms structure of the
  STATE correction formula is confused with the DIAGONAL-only ENERGY
  correction formula, since both involve similar-looking matrix element
  notation. Probe: "Write the formula for the first-order energy
  correction Eₙ¹."
- **MC-3 (non-degenerate perturbation theory works for degenerate
  levels)**: believing "yes, just apply the formula to each m
  separately." **Birth type**: overgeneralization (Type 1) — the
  non-degenerate formula is mechanically applied without checking its
  validity condition, missing that a zero energy denominator (from
  degenerate states in the same subspace) makes the formula break down.
  Probe: "The 2p states of hydrogen are degenerate. Can I use
  Eₙ¹=⟨n|H'|n⟩ for each?"
- **MC-4 (perturbation theory causes transitions)**: believing "yes —
  the electric field perturbs the system and causes transitions."
  **Birth type**: overgeneralization (Type 1) — the general notion that
  "perturbing" a system implies making it change state is applied
  without distinguishing time-independent from time-dependent
  perturbation theory, missing that a CONSTANT perturbation shifts
  stationary-state energies rather than driving transitions between
  them. Probe: "If I apply a constant electric field, does perturbation
  theory tell me how fast the electron transitions between levels?"

## Analogies

**Best**: a Taylor expansion — f(a+ε)≈f(a)+εf'(a)+ε²f''(a)/2+... —
perturbation theory is exactly this, but for energy as a function of
perturbation strength λ, directly targeting MC-1 by making the
convergence condition concrete: just as a Taylor series converges only
within a radius of convergence, the perturbation series converges only
when λ and the matrix elements are small enough.

**Anti-analogy**: do NOT say "perturbation theory works for anything
small" without immediately specifying "small compared to the RELEVANT
level spacing" — this vague framing directly feeds MC-1 and MC-3;
smallness must always be judged relative to the specific energy
denominator in play, not as an absolute property of H'.

## Demonstrations

Worked-example: derive Eₙ¹=⟨φₙ⁰|Ĥ'|φₙ⁰⟩ by substituting the perturbative
expansion into the Schrödinger equation, collecting order-λ terms, and
projecting onto ⟨φₙ⁰| — directly targets MC-2 by showing the diagonal-
only result emerges from cancellation of the Ĥ⁰ terms, not from a sum.
Worked-example: set up the 2×2 degenerate-subspace matrix for hydrogen's
n=2 Stark effect and diagonalize it, contrasting with the non-degenerate
formula's division-by-zero failure — directly targets MC-3.

## Discovery Questions

Discovery-style: "A particle is in the ground state of an infinite
square well. Apply a small bump potential at the center. Compute E₁¹ and
E₂¹ separately — why are they different, given the bump has the same
height for both?" — learner discovers the correction depends on wave-
function OVERLAP with the perturbation (n=2 has a node exactly at the
bump's center, "feeling" less of it), directly reinforcing that Eₙ¹ is a
specific expectation value, not a generic property of H' alone.

## Teaching Sequence

Blueprint's Section 9 Teaching Actions cited by reference (3 actions,
session_cap 3: derive Eₙ¹=⟨n|H'|n⟩ from first-order projection → show
the parity argument killing first-order Stark shift for the ground state
→ set up the degenerate-subspace matrix for hydrogen n=2 Stark effect).
MC-2 (energy vs. state correction confusion) is addressed first via the
derivation, before MC-1 (convergence) during the parity/Stark discussion,
before MC-3 (degenerate case) during the degenerate-subspace matrix
setup, with MC-4 (transitions) addressed via an explicit contrast with
time-dependent perturbation theory in the closing discussion.

## Tutor Actions

WORKED-EXAMPLE (Eₙ¹=⟨n|H'|n⟩ derived by first-order projection);
WORKED-EXAMPLE (degenerate-subspace matrix diagonalized for hydrogen
n=2 Stark effect); THOUGHT-EXPERIMENT (particle-in-a-box with a central
bump, comparing E₁¹ vs. E₂¹ via wave-function overlap); ANALOGY (Taylor
expansion as the mathematical template for perturbative energy
expansion).

## Voice Teaching Notes

Listen for "perturbation theory always works," "the energy correction is
a sum over m≠n," "just apply the formula regardless of degeneracy," or
"a constant field causes transitions" — the four direct misconception
tells. Load-bearing sentence: "perturbation theory only works when the
correction is small compared to the SPECIFIC level spacing you're
looking at; the energy correction is one diagonal term, not a sum;
degenerate levels need their own special treatment; and a constant
field shifts energies, it doesn't cause jumps between them." Channel-
reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner applying perturbation theory without checking convergence
signals MC-1 (full repair via the two-level-system divergence example).
A learner using the sum formula for energy correction signals MC-2 (full
repair via the first-order projection derivation). A learner applying
the non-degenerate formula to degenerate levels signals MC-3 (full
repair via the degenerate-subspace matrix diagonalization). A learner
expecting a constant perturbation to cause transitions signals MC-4
(full repair via the explicit time-independent vs. time-dependent
contrast). Mastery trigger: correctly deriving Eₙ¹ AND correctly
applying it to at least one physical problem AND correctly recognizing
when degenerate perturbation theory is needed. Blueprint's Section 11
Assessment (FA-1 through FA-4) cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget quantum mechanics for a second — if I ask
you to approximate f(x) near x=a using a Taylor series, does that
approximation stay good for ANY distance from a, or only close by?"
(isolating the small-parameter/convergence-radius intuition before
reapplying it to perturbation strength specifically). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (perturbation theory converges only when H' is small relative to
level spacing; Eₙ¹ is diagonal-only, |φₙ¹⟩ sums off-diagonal terms;
degenerate levels need subspace diagonalization; static perturbations
shift levels, they don't cause transitions) bound to procedure (deriving
Eₙ¹ via first-order projection; checking for degeneracy before applying
formulas; distinguishing time-independent from time-dependent
perturbation contexts). Interleave with `phys.qm.operators`,
`phys.qm.hydrogen-atom-qm`, and `phys.qm.selection-rules`.

## Transfer Connections

Near: fine structure of hydrogen, Stark effect (linear for degenerate
n=2, quadratic for non-degenerate n=1), Zeeman effect, crystal-field
splitting of d-orbitals. Far: nuclear shell-model corrections and
BCS-theory electron-phonon coupling in superconductivity (both
perturbative expansions in a small coupling). Real-world: precision
atomic spectroscopy relies on perturbative fine-structure and hyperfine
corrections. Expert: the universal role of perturbative expansion across
physics — classical orbital perturbation, the statistical-mechanics
virial expansion, and Feynman-diagram perturbation in field theory all
share this same underlying logic.

## Cross-Subject Connections

KG `cross_links` empty. No genuine cross-subject connection identified
at this authoring pass — perturbation theory's applications (Stark/
Zeeman effects, fine structure) are physics-internal; its broader
mathematical template (expansion in a small parameter) recurs across
disciplines but no specific KG-anchored connection was found.

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.qm.perturbation-
theory.md`, numbered-Section format). Reuses: Section 4 Misconception
Library by reference. Not restated: Section 0 Concept Metadata, Section
1 Concept Spine full formula set, Section 5 Explanation Library, Section
7 Demonstration Library full procedures, Section 8 Discovery Lesson full
sequence, Section 11 Assessment full item text, Section 12 Recovery
Notes, Section 13 Memory and Review schedule, Section 14 Transfer Map.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

None. Prerequisites (`phys.qm.operators`, `phys.qm.hydrogen-atom-qm`)
are necessary and sufficient; no ambiguity or overlap found with sibling
concepts.

## Version History

- 2026-07-23 (physics EB Wave 17): initial authoring.
