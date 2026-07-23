# Nuclear Reactions and Q-Value — `phys.mod.nuclear-reactions`

## Identity

- **Concept ID**: `phys.mod.nuclear-reactions` (canonical physics KG)
- **Curriculum location**: physics / modern physics (nuclear physics) —
  dependency level 15.
- **Prerequisites**: `phys.mod.radioactive-decay` — nuclear reactions
  generalize the Q-value calculation already used for decay to induced,
  two-body reactions.
- **Unlocks** (from KG): `phys.mod.binding-energy`, `phys.particle.four-forces`.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 6

## Learning Objective

The learner can: (1) correctly explain that Q-value is the TOTAL kinetic
energy released, shared between products according to momentum
conservation, NOT the kinetic energy of any single product; (2) correctly
explain that a charge-and-mass-number-balanced equation is NECESSARY but
NOT SUFFICIENT for a reaction to proceed spontaneously — Q must also be
positive (or, for Q<0, the projectile must exceed a threshold energy);
(3) correctly explain that atomic mass tables (with decimal precision),
not integer mass numbers, must be used to compute Q, since integer masses
always give Δm=0.

## Core Understanding

Every nuclear reaction must conserve charge (ΣZ), mass/baryon number
(ΣA), energy, and momentum. The Q-value Q=(Σm_reactants−Σm_products)c²
measures the total energy released (Q>0, exothermic) or required (Q<0,
endothermic). A common error treats Q as the kinetic energy handed to ONE
product — but momentum conservation forces a definite SPLIT of Q between
products (e.g., in D-T fusion, Q=17.6 MeV splits as KE_α≈3.5 MeV,
KE_n≈14.1 MeV, in inverse proportion to mass). A second error treats
conservation-law balance (ΣZ, ΣA matching) as sufficient grounds for a
reaction to "happen" — balance only rules out IMPOSSIBLE reactions; a
balanced, endothermic (Q<0) reaction additionally requires the projectile
to exceed a threshold energy E_th=|Q|(1+m_projectile/m_target), because
momentum conservation in the lab frame means not all of the projectile's
kinetic energy is available to supply |Q|. A third error uses integer
mass numbers (A) as if they were the actual atomic mass — but Δm is a
tiny fraction of A (milliunits), so integer arithmetic always gives Δm=0
and predicts zero energy release; genuine Q-value calculations require
tabulated atomic masses to 4-6 decimal places.

## Mental Models

**Beginner**: "The Q-value is the kinetic energy the emitted particle
gets; if I balance Z and A, the reaction happens; mass number IS the
mass." Upgrade trigger: computing the two-body momentum split for D-T
fusion explicitly (finding the neutron gets 4× the alpha's kinetic
energy, not an equal or arbitrary share) directly confronts the
single-particle-gets-Q assumption.

**Intermediate**: "Q is the total energy released, split between products
by momentum conservation; balance is necessary but not sufficient — Q's
sign and, if negative, the threshold energy determine whether the
reaction proceeds; real atomic masses (not integers) must be used." This
model handles most reactions correctly but may still need an explicit
threshold-energy calculation when Q<0.

**Advanced**: "Always compute Q from tabulated atomic masses first,
classify exothermic/endothermic, and — for endothermic reactions — always
check the lab-frame threshold energy before concluding a reaction can
proceed at a given projectile energy."

**Expert**: connecting Q-value calculations to the binding-energy-per-
nucleon curve (reactions moving toward the A≈56 peak release energy;
reactions moving away absorb it) and to the four-vector invariant
treatment of threshold energy — not required for mastery, natural bridge
to `phys.mod.binding-energy`.

## Why Students Fail

The dominant failure is treating the Q-value as the kinetic energy of a
single named product rather than the total energy split by momentum
conservation; closely related failures include mistaking a
charge/mass-balanced equation for a spontaneously-occurring one (ignoring
Q's sign and threshold energy), and using integer mass numbers instead of
tabulated atomic masses, which silently zeroes out any computed energy
release.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mod.nuclear-reactions.md`,
§4 Misconception Library) documents four; reused by reference with
birth-type added.

- **MC-1 (Q-value equals kinetic energy of products, i.e. one named
  product gets all of Q)**: believing "the alpha gets 17.6 MeV of kinetic
  energy" for D-T fusion. **Birth type**: overgeneralization (Type 1) —
  the single-body idea "released energy becomes kinetic energy of THE
  particle" is extended to a two-body final state without accounting for
  momentum conservation splitting the energy by inverse mass ratio.
  Probe: "If Q=17.6 MeV for D-T fusion and the reactants are at rest,
  where exactly does 17.6 MeV go?"
- **MC-2 (a balanced equation means the reaction happens
  spontaneously)**: believing "I balanced Z and A, so the reaction is
  allowed [to happen on its own]." **Birth type**: instruction-induced
  (Type 5) — conservation-law balancing is drilled heavily as the first
  procedural step, leading students to treat it as sufficient rather than
  merely necessary, missing the separate role of Q's sign and threshold
  energy. Probe: "Is ¹⁴N+⁴He→¹⁷O+¹H balanced? Will it happen if you just
  mix nitrogen gas and helium?"
- **MC-3 (atomic mass ≈ mass number, so Δm ≈ 0)**: believing "the mass
  number is 1, so m = 1 u" for ¹H. **Birth type**: notation-induced (Type
  4) — the convenient integer mass-number notation used for balancing
  equations is mistakenly carried over into energy calculations, where
  the small deviation from the integer (mass defect) is the entire
  physical content. Probe: "If ¹H has mass 1.0000 u and the table says
  1.007825 u, which do you use for Q?"
- **MC-4 (nuclear reactions change the number of protons arbitrarily)**:
  believing "Z increased from 6 to 7 in carbon-14 decay" without tracking
  the emitted particle's charge. **Birth type**: perceptual intuition
  (Type 2) — the visible change in the nucleus's identity (C→N) is
  registered without accounting for the emitted electron's charge, which
  is easy to overlook since it leaves the nucleus. Probe: "In beta-minus
  decay, a neutron becomes a proton. Doesn't that violate conservation of
  Z?"

## Analogies

**Best**: currency exchange with a fee — sending €100 internationally, the
recipient gets less (or, for endothermic reactions, needs to pay a fee
upfront) — directly targets the Q-value-as-net-transaction idea, distinct
from the misconception that one party (one particle) unilaterally
receives the full difference.

**Anti-analogy**: do NOT say "nuclear reactions release energy just like
burning chemical fuel" — this directly installs an energy-scale
misconception, since nuclear Q-values (MeV) exceed chemical bond energies
(eV) by a factor of roughly 10⁷; treating them as "the same kind of
release, just bigger" hides the qualitatively different physical
mechanism (rest-mass conversion vs. electron rearrangement).

## Demonstrations

Worked-example: compute the two-body momentum split for D-T fusion
(²H+³H→⁴He+n, Q=17.59 MeV) explicitly, showing KE_α≈3.5 MeV and
KE_n≈14.1 MeV in inverse proportion to mass — directly targets MC-1.
Worked-example: redo a fusion Q calculation first with integer masses
(Δm=0, Q=0) then with table values (Δm=0.018884 u, Q=17.59 MeV) — directly
targets MC-3.

## Discovery Questions

Discovery-style: "¹⁴N+⁴He→¹⁷O+¹H is balanced in Z and A. Will it happen if
you just mix nitrogen gas and alpha particles at room temperature?" —
learner discovers Q=−1.19 MeV (endothermic) and computes the required
threshold energy (≈1.53 MeV lab frame), confronting the
balanced-means-spontaneous assumption (MC-2) directly.

## Teaching Sequence

Blueprint's §9 Teaching Actions cited by reference (6 actions: activate
prior Q-value knowledge from radioactive decay → drill Z/A balancing →
mass-table exercise building the D-T fusion Q calculation → sign-
convention classification exercise → threshold-energy calculation for an
endothermic reaction → synthesis problem on a new reaction). MC-3
(integer-mass trap) is addressed early during the mass-table exercise,
before MC-1 (single-particle-gets-Q) during the D-T momentum-split
discussion, before MC-2 (balance≠spontaneity) during the threshold-energy
section, before MC-4 (charge tracking) which recurs whenever a beta-decay-
type reaction appears in synthesis problems.

## Tutor Actions

WORKED-EXAMPLE (D-T fusion two-body momentum split, KE_α vs. KE_n);
WORKED-EXAMPLE (integer-mass vs. table-value Q comparison, Δm=0 vs.
Δm=0.018884 u); THOUGHT-EXPERIMENT (is ¹⁴N+⁴He→¹⁷O+¹H spontaneous at room
temperature?); DEMONSTRATION (energy-scale comparison: chemical eV vs.
nuclear MeV, factor ~10⁷).

## Voice Teaching Notes

Listen for "the [named particle] gets all the energy," "it's balanced so
it happens," or "the mass number is close enough" — the three direct
misconception tells. Load-bearing sentence: "Q is the total released
energy, split by momentum — not handed to one particle; and balanced
doesn't mean spontaneous, check the sign of Q and the threshold energy."
Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner assigning the full Q to one named product signals MC-1 (full
repair via the momentum-split worked example). A learner treating a
balanced equation as sufficient for spontaneity signals MC-2 (full repair
via the threshold-energy discovery question). A learner using integer
masses signals MC-3 (full repair via the integer-vs-table comparison). A
learner failing to track emitted-particle charge signals MC-4. Mastery
trigger: correctly balancing a reaction AND correctly computing Q from
tabulated masses AND correctly classifying exothermic/endothermic AND (for
Q<0) correctly applying the threshold-energy formula. Blueprint's §11
Assessment (Formative Assessments 1-4) cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the full reaction for a second — two unequal
masses on a frictionless surface, connected by a compressed spring that's
released. Do they get equal kinetic energy, or does the lighter one get
more?" (isolating the inverse-mass-ratio momentum-split intuition before
reapplying it to nuclear products). See `../foundations/01-recovery-
engine.md`.

## Memory Hooks

Concept (Q = total energy released, split by momentum conservation;
balance is necessary but not sufficient; use table masses not integers)
bound to procedure (balance Z/A → look up masses → compute Δm → Q →
classify → threshold if needed). Interleave with
`phys.mod.radioactive-decay` and, once authored, `phys.mod.binding-energy`
and `phys.rel.mass-energy`.

## Transfer Connections

Near: any nuclear-reaction balancing-and-Q-value problem, in either
direction (exothermic fusion or endothermic transmutation). Far: particle
physics (quark-level processes like β⁻ decay as d→u+e⁻+ν̄, same
conservation laws at higher energy scale) and astrophysics (stellar
nucleosynthesis sequences, which reactions power which stellar stage).
Real-world: nuclear reactor energy budgeting, PET radiotracer Q-values
setting maximum positron range (image resolution). Expert: the Gamow
factor / tunneling treatment of reaction rates through the Coulomb
barrier, connecting directly to `phys.qm.quantum-tunneling`.

## Cross-Subject Connections

KG `cross_links` empty. A real cross-subject connection exists to
chemistry (nuclear chemistry, radiochemistry) and biology (radiotracer
methods in medical imaging) — recorded honestly as a Curriculum Feedback
item, not fixed (no KG file modified).

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.mod.nuclear-
reactions.md`, numbered-section format). Reuses: §4 Misconception
Library by reference. Not restated: §0 Concept Metadata, §1 Concept Spine
formula derivations, §5 Explanation Library, §7 Demonstration Library
full procedures, §8 Discovery Lesson full sequence, §11 Assessment full
item text, §12 Recovery Notes, §13 Memory and Review schedule, §14
Transfer Map.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

A real cross-subject connection to chemistry (radiochemistry) and biology
(medical radiotracers) exists but is not KG-encoded — recorded honestly,
not fixed (no KG or Blueprint file modified).

## Version History

- 2026-07-23 (physics EB Wave 15): initial authoring.
