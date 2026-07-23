# Selection Rules and Transition Probabilities — `phys.qm.selection-rules`

## Identity

- **Concept ID**: `phys.qm.selection-rules` (canonical physics KG)
- **Curriculum location**: physics / quantum mechanics — dependency
  level 17.
- **Prerequisites**: `phys.qm.operators`, `phys.qm.hydrogen-atom-qm` —
  selection rules are derived from parity and angular-momentum
  properties of the hydrogen wave functions already established.
- **Unlocks** (from KG): none — leaf node.
- **Difficulty**: expert · **Bloom**: analyze · **Mastery threshold**: 0.80
  · **Est. hours**: 6

## Learning Objective

The learner can: (1) correctly explain that "forbidden" transitions are
NOT impossible — they occur via weaker higher-multipole or multi-photon
processes, simply much SLOWER (by factors of 10⁶-10⁸ or more) than
allowed electric-dipole transitions; (2) correctly explain that Δn is
UNRESTRICTED for electric dipole transitions — only l, m, and spin are
constrained (Δl=±1, Δm=0,±1, Δs=0); transitions with any Δn value are
allowed as long as the angular-momentum/parity rules are satisfied;
(3) correctly explain that Δl=±1 arises from the JOINT requirement of
BOTH parity conservation (r⃗ is odd, forcing opposite parities, hence odd
Δl) AND photon angular-momentum conservation (|Δl|≤1) — parity alone
would permit Δl=±1,±3,±5,..., and only combining both constraints forces
exactly Δl=±1; (4) correctly explain that electric dipole transitions
CANNOT flip total spin (Δs=0), since the dipole operator r⃗ acts only on
spatial coordinates, never on spin — spin-flip transitions (like
helium's singlet-triplet intercombination line) are therefore strongly
suppressed.

## Core Understanding

Atomic transitions are governed by selection rules arising from
conservation laws and symmetry: for electric dipole (E1) transitions,
Δl=±1, Δm=0,±1, Δs=0, with Δn unrestricted. A first persistent error
takes the word "forbidden" literally, assuming such transitions are
impossible — but hydrogen's 2s state DOES decay to 1s, via two-photon
emission with τ≈0.12 s (measurably slower than 2p's τ≈1.6 ns by a factor
of ~10⁸, but not infinitely slow); "forbidden" means the E1 matrix
element vanishes, so decay proceeds through weaker higher-order
processes (M1, E2, multi-photon), not that decay never happens. A
second error, by analogy to Δl=±1, assumes Δn must also be restricted
(often to ±1) — but the Coulomb potential has no dependence on the
radial quantum number's coupling to angular momentum or parity; Δn is
entirely unconstrained, and the Balmer Hβ line (n=4→n=2) is a perfectly
ordinary, strong transition. A third error attributes Δl=±1 to angular-
momentum conservation ALONE (the photon carries 1ℏ, "so something must
change by 1") — but this reasoning alone would equally permit Δl=0 for
certain polarizations; the actual derivation requires BOTH parity
conservation (r⃗'s odd parity forces the initial and final states to have
opposite parity, i.e. Δl odd) AND angular-momentum conservation
(|Δl|≤1), and only the intersection of these two constraints yields
exactly Δl=±1. A fourth error assumes any Δl=±1 transition is E1-allowed
regardless of spin — but the dipole operator r⃗ acts purely on spatial
coordinates and cannot flip total spin (Δs=0); helium's singlet-to-
triplet "intercombination" transition, despite satisfying Δl=±1, is
strongly E1-forbidden by this spin rule, giving the metastable triplet
state a lifetime of ~8000 seconds.

## Mental Models

**Beginner**: "Forbidden means impossible; Δn must be restricted like
Δl; Δl=±1 comes purely from the photon's angular momentum; any Δl=±1
transition is allowed regardless of spin." Upgrade trigger: comparing
hydrogen 2p's 1.6 ns lifetime to 2s's measured (not infinite) 0.12 s
lifetime directly confronts the forbidden-means-impossible assumption;
listing all E1-allowed n=3→n=1,2 transitions and finding multiple
different Δn values (all satisfying only Δl=±1) directly confronts the
Δn-restriction assumption.

**Intermediate**: "Forbidden means suppressed by a specific factor, not
impossible; Δn is unrestricted, only l/m/s are constrained; Δl=±1
requires BOTH parity and angular-momentum conservation together; E1
transitions cannot flip spin." This model correctly captures all four
points but may still need to explicitly verify parity AND spin
separately (not just Δl) before classifying an unfamiliar transition as
E1-allowed.

**Advanced**: "Always distinguish 'forbidden' (suppressed, still occurs)
from 'impossible,' and always check parity, angular momentum, AND spin
together — not any single rule in isolation — before classifying a
transition as E1-allowed or forbidden."

**Expert**: Fermi's golden rule derivation of the transition rate
Γ=(e²ω³/3πε₀ℏc³)|⟨f|r⃗|i⟩|², and the astrophysical significance of
forbidden lines (e.g. [O III] at 500.7 nm) observable in low-density
nebulae where collisional deactivation is too slow to compete with the
forbidden decay rate — not required for mastery, natural bridge to
`phys.qm.perturbation-theory`'s Fermi golden rule framework.

## Why Students Fail

The dominant failure is taking "forbidden" literally as "impossible"
rather than "strongly suppressed"; closely related failures include
assuming Δn is restricted by analogy to Δl, attributing the Δl=±1 rule
to angular momentum alone rather than the joint parity-plus-angular-
momentum requirement, and forgetting that electric dipole transitions
cannot flip total spin.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.qm.selection-rules.md`,
Section 4 Misconception Library) documents four; reused by reference
with birth-type added.

- **MC-1 (forbidden transitions are impossible)**: believing "no —
  it's forbidden" means the transition cannot occur at all. **Birth
  type**: language contamination (Type 3) — the everyday meaning of
  "forbidden" (prohibited, cannot happen) is mapped onto its technical
  meaning (the leading-order E1 matrix element vanishes), missing that
  higher-order processes (two-photon emission, M1, E2) still allow decay,
  just far more slowly. Probe: "Can the 2s state of hydrogen decay to
  1s by photon emission?"
- **MC-2 (Δn=±1 is a selection rule)**: believing "no — Δn must be
  ±1." **Birth type**: overgeneralization (Type 1) — the genuine Δl=±1
  rule is over-extended by analogy to apply to Δn as well, missing that
  the Coulomb potential's radial structure is unconstrained by angular-
  momentum/parity conservation. Probe: "Is the transition from n=4 to
  n=2 with Δl=−1 allowed?"
- **MC-3 (Δl=±1 is because the photon removes one unit of angular
  momentum, alone)**: believing "because the photon carries ℏ, so
  something must change by 1." **Birth type**: overgeneralization (Type
  1) — a genuine but PARTIAL truth (angular-momentum conservation) is
  treated as the complete explanation, missing that parity conservation
  is an equally necessary, independent constraint that together with
  angular momentum forces exactly Δl=±1 (not Δl=0, which angular
  momentum alone might permit). Probe: "Why is Δl=±1 the selection
  rule?"
- **MC-4 (spin-flip transitions are E1 allowed)**: believing "yes, as
  long as Δl=±1," forgetting the spin rule. **Birth type**:
  overgeneralization (Type 1) — only the Δl rule is retained in memory,
  missing the additional Δs=0 constraint, since the dipole operator
  acts purely on spatial coordinates and never touches spin. Probe: "In
  helium, is a transition from the triplet state to the singlet state
  allowed at E1?"

## Analogies

**Best**: chess piece moves — a bishop can only move diagonally, a rook
only straight; Δl=±1 is the "legal move" for electric dipole
transitions, and a Δl=0 "move" is not a legal E1 move — but unlike chess,
where illegal moves are truly impossible, a quantum "illegal move" can
still happen via a different, weaker mechanism (a different game piece
entirely — M1, E2, or multi-photon processes) — directly targets MC-1 by
explicitly naming where the chess analogy breaks (quantum forbidden ≠
absolutely impossible, unlike chess).

**Anti-analogy**: do NOT say "the photon carries one unit of angular
momentum, so Δl must change by exactly 1" as a complete explanation —
this directly installs MC-3 by omitting the equally necessary parity
argument; angular momentum conservation alone permits Δl=0 for certain
photon polarizations, and only the combination with parity forces the
exact Δl=±1 result.

## Demonstrations

Worked-example: compare measured lifetimes — hydrogen 2p (τ≈1.6 ns,
E1-allowed), hydrogen 2s (τ≈0.12 s via two-photon, E1-forbidden), helium
metastable triplet (τ≈8000 s, spin-forbidden) — directly targets MC-1 by
making "forbidden = slower, not impossible" numerically concrete across
three escalating orders of suppression. Worked-example: enumerate all
E1-allowed and E1-forbidden transitions from hydrogen's n=3 level to
n=2 and n=1, showing multiple different Δn values among the allowed set
— directly targets MC-2.

## Discovery Questions

Discovery-style: "The parity of ψ_nlm is (−1)^l, and r⃗ is odd under
parity. For ⟨f|r⃗|i⟩ to be nonzero, what parity relationship must ψ_f and
ψ_i satisfy? What does this imply for Δl? Now add: the photon carries
angular momentum 1ℏ, so |Δl|≤1. Combining both constraints, what is
Δl exactly?" — learner derives Δl=±1 from first principles (parity AND
angular momentum together), rather than being told the rule, directly
confronting MC-3's incomplete single-constraint explanation.

## Teaching Sequence

Blueprint's Section 9 Teaching Actions cited by reference (3 actions,
session_cap 3: show the parity argument — odd operator times opposite-
parity states gives a nonzero, even integrand → compare 2p vs. 2s
lifetimes to show forbidden ≠ impossible → identify which n=3→n=1
transitions are E1-allowed vs. forbidden). MC-3 (parity+angular-momentum
derivation) is addressed first via the parity-argument construction,
before MC-1 (forbidden≠impossible) during the lifetime comparison,
before MC-2 (Δn unrestricted) during the transition-enumeration
exercise, with MC-4 (spin rule) addressed via the helium intercombination
example woven into the closing discussion.

## Tutor Actions

WORKED-EXAMPLE (lifetime comparison: 2p 1.6 ns vs. 2s 0.12 s vs. helium
triplet 8000 s); WORKED-EXAMPLE (complete enumeration of E1-allowed/
forbidden transitions from n=3 to n=1,2); THOUGHT-EXPERIMENT (deriving
Δl=±1 from parity plus angular-momentum conservation, step by step);
ANALOGY (chess piece legal moves, with the explicit breaking point that
quantum "illegal" moves can still occur via a different mechanism).

## Voice Teaching Notes

Listen for "forbidden means impossible," "Δn must be ±1," "Δl=±1 is
just from the photon's angular momentum," or "spin-flip is fine as long
as Δl=±1" — the four direct misconception tells. Load-bearing sentence:
"forbidden means much slower, not impossible — the 2s state still
decays, just 100 million times slower; Δn is wide open, only l, m, and
spin are constrained; Δl=±1 needs BOTH parity and angular momentum
together; and the dipole operator never touches spin, so spin-flips are
suppressed too." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner treating forbidden as impossible signals MC-1 (full repair
via the 2p/2s/helium-triplet lifetime comparison). A learner restricting
Δn signals MC-2 (full repair via the n=3 transition enumeration). A
learner attributing Δl=±1 to angular momentum alone signals MC-3 (full
repair via the joint parity-plus-angular-momentum derivation). A learner
ignoring the spin selection rule signals MC-4 (full repair via the
helium intercombination-line lifetime). Mastery trigger: correctly
applying E1 selection rules to predict allowed transitions AND correctly
explaining the parity argument AND correctly distinguishing "forbidden"
from "impossible." Blueprint's Section 11 Assessment (FA-1 through FA-4)
cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget atoms for a second — if a rule says 'you
can't do X the easy way,' does that mean X is truly impossible, or just
that you'd need a harder, slower way to do it?" (isolating the
suppressed-vs-impossible distinction in the abstract before reapplying
it to forbidden atomic transitions specifically). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (forbidden = suppressed, not impossible; Δn unrestricted, only
l/m/s constrained; Δl=±1 from parity AND angular momentum together;
Δs=0 for E1, spin-flips suppressed) bound to procedure (checking parity,
angular momentum, and spin together before classifying a transition;
comparing lifetimes across allowed/forbidden cases). Interleave with
`phys.qm.operators`, `phys.qm.hydrogen-atom-qm`, and `phys.qm.
perturbation-theory`.

## Transfer Connections

Near: vibrational (Δv=±1) and rotational (ΔJ=±1) molecular selection
rules, following the same parity-argument logic. Far: astrophysical
forbidden-line diagnostics (nebular density/temperature measured via
lines unobservable in lab discharge tubes) and laser physics
(metastable upper lasing levels, like the HeNe laser's triplet
reservoir state, exploit forbidden-transition long lifetimes). Real-
world: understanding why hydrogen's visible spectrum has exactly the
lines it does, and why some excited atomic states persist far longer
than others. Expert: nuclear gamma-ray selection rules, following
identical angular-momentum and parity arguments at a different energy
scale.

## Cross-Subject Connections

KG `cross_links` empty. A real cross-subject connection exists to
chemistry/astrochemistry (forbidden-line spectroscopy used to diagnose
interstellar and nebular conditions) — recorded honestly as a
Curriculum Feedback item, not fixed (no KG file modified).

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.qm.selection-
rules.md`, numbered-Section format). Reuses: Section 4 Misconception
Library by reference. Not restated: Section 0 Concept Metadata, Section
1 Concept Spine full formula set, Section 5 Explanation Library, Section
7 Demonstration Library full procedures, Section 8 Discovery Lesson full
sequence, Section 11 Assessment full item text, Section 12 Recovery
Notes, Section 13 Memory and Review schedule, Section 14 Transfer Map.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

A real, if not KG-encoded, cross-subject connection exists to
astrochemistry (forbidden-line diagnostics of nebular conditions) —
recorded honestly, not fixed (no KG or Blueprint file modified).

## Version History

- 2026-07-23 (physics EB Wave 17): initial authoring.
