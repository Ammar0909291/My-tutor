# LC Oscillations and Resonance — `phys.em.lc-circuits`

## Identity

- **Concept ID**: `phys.em.lc-circuits` (canonical physics KG)
- **Curriculum location**: physics / electromagnetism — dependency level 8.
- **Prerequisites**: `phys.em.self-inductance`, `phys.em.capacitance`,
  `phys.em.ac-basics` — an LC circuit combines the already-secure energy
  storage mechanisms of inductors (½LI²) and capacitors (½CV²) into one
  oscillating system, directly paralleling the mechanical mass-spring
  oscillator.
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: advanced · **Bloom**: analyze · **Mastery threshold**: 0.80
  · **Est. hours**: 6

## Learning Objective

The learner can: (1) correctly state that an IDEAL (R=0) LC circuit
oscillates FOREVER with constant amplitude — energy conservation is
exact, Q(t)=Q₀cos(ω₀t) — and correctly explain that any observed decay in
a real circuit is due to resistance, NOT an intrinsic property of the LC
combination itself; (2) correctly compute the energy split between
capacitor and inductor at various points in the cycle, correctly stating
that at the moment of MAXIMUM current, ALL energy is in the inductor
(100%/0%), not a 50/50 split — the equal-split moment (50%/50%) occurs
only at specific intermediate times (t=T/8, 3T/8, ...), not as the
"typical" state.

## Core Understanding

An IDEAL LC circuit (zero resistance) oscillates INDEFINITELY with
constant amplitude — this is a direct, exact mathematical consequence of
energy conservation: total energy U = Q²/(2C) + ½LI² remains constant at
every instant, with the charge oscillating as Q(t) = Q₀cos(ω₀t) forever,
paralleling how an ideal (frictionless) mass-spring system oscillates
perpetually. Any decay observed in a REAL LC circuit is caused
specifically by resistance (R>0, the equivalent of friction in the
mechanical analogy) — resistance is the loss mechanism, not something
inherent to the LC combination itself; the ideal (R=0) model remains
genuinely useful for computing the natural frequency ω₀ and initial
conditions even though real circuits always have some resistance. A
second, independent subtlety concerns HOW energy splits between the
capacitor and inductor throughout the cycle: at the moment of maximum
current (I=I_max, Q=0), ALL of the total energy resides in the inductor
(U_L = U_total, U_C = 0) — a 100%/0% split, not a 50/50 split as a naive
guess might suggest; the energy trades COMPLETELY between the two
elements each quarter cycle (100% capacitor at t=0, 100% inductor at
t=T/4), with an exactly EQUAL 50/50 split occurring only at specific
intermediate instants (t=T/8, 3T/8, ...) — a passing moment, not the
typical or average state.

## Mental Models

**Beginner**: "An LC circuit's oscillation will eventually die out on its
own, even with zero resistance; at the moment of maximum current, energy
is split roughly 50/50 between the capacitor and inductor." Upgrade
trigger: solving the ideal (R=0) LC differential equation directly,
finding Q(t)=Q₀cos(ω₀t) with no decay term whatsoever, directly confronts
the self-decay assumption; computing U_C and U_L explicitly at I=I_max
(finding 0% and 100% respectively) directly confronts the 50/50
assumption.

**Intermediate**: "Ideal LC (R=0) oscillates forever, constant amplitude;
energy splits COMPLETELY (100%/0%) at the quarter-cycle points, with
50/50 only at the specific in-between instants." This model correctly
captures both core results, but sometimes still expects some
"reasonable" fractional split (like 50/50) at the maximum-current moment
out of a general averaging intuition.

**Advanced**: "Real LC circuits always have SOME resistance, causing
genuine exponential decay — but that decay is entirely attributable to R,
never to the ideal LC combination itself, which the mathematics proves
conserves energy exactly."

**Expert**: the LC circuit as the exact electrical analog of the
mechanical mass-spring SHM system (L↔m, 1/C↔k, Q↔x, I↔v) — a natural
cross-domain consolidation directly connecting to `phys.wave.spring-mass`,
not required for mastery.

## Why Students Fail

The dominant failure is expecting an ideal (lossless) LC circuit to
eventually stop oscillating on its own, not recognizing that decay
requires an actual dissipative mechanism (resistance) that the ideal
model explicitly excludes; a second, distinct failure is assuming energy
splits evenly (50/50) between capacitor and inductor at the maximum-
current moment, rather than recognizing the complete (100%/0%) trade-off
characteristic of SHM-like energy exchange.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.em.lc-circuits.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-LC-CIRCUIT-OSCILLATION-STOPS-WITHOUT-RESISTANCE**: believing an
  LC circuit will eventually stop oscillating on its own, even with zero
  resistance. **Birth type**: overgeneralization (Type 1) — everyday
  experience with real oscillating systems (which DO eventually stop,
  due to inevitable friction/resistance) is incorrectly extended to the
  idealized zero-resistance case, where the mathematics proves no decay
  occurs. Probe: "For an ideal LC circuit with R=0 exactly, does the
  oscillation eventually die out, or does it continue forever?"
- **MC-ENERGY-STORED-IN-LC-CIRCUIT-IS-HALF-INITIAL**: believing that at
  the moment of maximum current, the capacitor has lost half its energy
  (misapplying an even energy split). **Birth type**: perceptual
  intuition (Type 2) — "energy splitting between two things" intuitively
  suggests an even (50/50) division, without tracing through the actual
  SHM-like complete trade-off, where one element holds ALL the energy at
  specific moments. Probe: "At the exact moment when current is
  maximum (and charge on the capacitor is zero), how much of the total
  energy is stored in the capacitor — half, none, or all of it?"

## Analogies

**Best**: an ideal (frictionless) mass-spring system — it genuinely
oscillates forever with no external loss mechanism, exactly paralleling
the ideal LC circuit; at maximum spring compression, velocity (and hence
KE) is exactly zero (ALL energy in the spring), and at the equilibrium
position, spring PE is exactly zero (ALL energy is kinetic) — directly
targets both misconceptions by mapping the electrical system onto the
already-familiar mechanical SHM energy trade-off.

**Anti-analogy**: do NOT say "energy shifts back and forth between the
capacitor and inductor" without specifying the COMPLETE nature of the
trade-off — this vague phrasing invites
MC-ENERGY-STORED-IN-LC-CIRCUIT-IS-HALF-INITIAL by suggesting a partial,
even split rather than the actual 100%/0% alternation.

## Demonstrations

Conceptual: solve the ideal LC differential equation directly (R=0),
showing Q(t)=Q₀cos(ω₀t) with constant amplitude and no decay term —
directly targets MC-LC-CIRCUIT-OSCILLATION-STOPS-WITHOUT-RESISTANCE.
Worked-example: compute U_C and U_L explicitly at t=0, T/8, T/4, showing
100%/0%, 50%/50%, and 0%/100% respectively — directly targets
MC-ENERGY-STORED-IN-LC-CIRCUIT-IS-HALF-INITIAL by showing the full
progression, not just the endpoint.

## Discovery Questions

Discovery-style: "if an LC circuit truly has zero resistance anywhere,
what mechanism could possibly cause its oscillation to lose energy over
time?" — learner reasons through the absence of any loss mechanism,
directly confronting
MC-LC-CIRCUIT-OSCILLATION-STOPS-WITHOUT-RESISTANCE.

## Teaching Sequence

Blueprint's discrimination-pairs component cited by reference.
MC-LC-CIRCUIT-OSCILLATION-STOPS-WITHOUT-RESISTANCE is addressed first
(establishing the ideal LC circuit's perpetual, undecaying oscillation),
before MC-ENERGY-STORED-IN-LC-CIRCUIT-IS-HALF-INITIAL, since trusting
that the ideal oscillation continues indefinitely with constant total
energy is the prerequisite for then correctly tracing how that constant
total is DISTRIBUTED between the two elements throughout the cycle.

## Tutor Actions

WORKED-EXAMPLE (ideal LC differential equation solved showing no decay;
U_C/U_L computed at several cycle points); DEMONSTRATION (mass-spring
mechanical analogy mapped explicitly onto the LC circuit's energy
trade-off); COMPARE-CONTRAST (ideal R=0 vs. real R>0 LC circuit
behavior).

## Voice Teaching Notes

Listen for "the oscillation will eventually stop" applied to an ideal
(R=0) circuit, or an assumed 50/50 energy split at maximum current — the
two direct misconception tells. Load-bearing sentence: "with truly zero
resistance, there's nothing to eat the energy — it oscillates forever;
and at maximum current, the inductor holds ALL the energy, not half."
Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner expecting an ideal LC circuit to eventually stop oscillating
signals MC-LC-CIRCUIT-OSCILLATION-STOPS-WITHOUT-RESISTANCE
(MISCONCEIVING, full repair via the differential-equation solution). A
learner claiming a 50/50 energy split at maximum current signals
MC-ENERGY-STORED-IN-LC-CIRCUIT-IS-HALF-INITIAL (full repair via the
full-cycle energy computation). Mastery trigger: correctly stating ideal
LC oscillation is undecaying, AND correctly computing the complete
(100%/0%) energy trade-off at the quarter-cycle points. Blueprint's
assessment component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the whole cycle for a second — if R is
EXACTLY zero, is there anywhere for energy to actually leave the
circuit?" (isolating the absent-loss-mechanism check before discussing
decay). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (ideal undecaying oscillation; complete energy trade-off) bound
to procedure (U_C/U_L calculation at a given cycle point). Interleave
with `phys.em.self-inductance`, `phys.em.capacitance`, and
`phys.wave.spring-mass` (the direct mechanical-SHM analogy, already
authored, for explicit cross-reference).

## Transfer Connections

Near: any LC circuit energy or frequency calculation, including radio
tuning circuits. Far: wireless communication engineering (LC resonant
circuits as the basis for radio-frequency tuning and filtering) and
MRI machine design (resonant LC circuits generating precise
radio-frequency pulses). Real-world: understanding how an old radio's
tuning dial selects a station by adjusting an LC circuit's resonant
frequency to match the broadcast signal. Expert: the LC circuit as the
exact electrical analog of mechanical SHM.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified
beyond the intra-physics mechanical-SHM analogy already discussed;
honest "weak but real" assessment at the cross-subject level.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
discrimination-pairs component by reference. Not restated: Concept
Identity & Metadata, Concept Explanation Multi-Tier, Worked Examples,
Lesson Composition Grammar, Retrieval Spacing Schedule, Prerequisite &
Unlock Map, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No genuine cross-SUBJECT connection found; the strongest connection
(mechanical SHM analogy) is intra-physics, honestly recorded.

## Version History

- 2026-07-23 (physics EB Wave 8): initial authoring.
