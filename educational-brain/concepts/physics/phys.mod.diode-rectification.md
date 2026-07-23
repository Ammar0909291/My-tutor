# Diode Rectifying Behavior — `phys.mod.diode-rectification`

## Identity

- **Concept ID**: `phys.mod.diode-rectification` (canonical physics KG)
- **Curriculum location**: physics / modern physics (semiconductor
  physics extension) — dependency level 24 (the terminal node of the
  entire physics knowledge graph).
- **Prerequisites**: `phys.mod.pn-junction` (the equilibrium depletion
  region and built-in potential this concept's applied-bias mechanism
  directly builds on).
- **Unlocks** (from KG): none — the capstone of the six-concept
  semiconductor-physics sub-sequence.
- **Difficulty**: expert · **Bloom**: analyze · **Mastery threshold**:
  0.70 · **Est. hours**: 5

## Learning Objective

The learner can: (1) correctly explain the forward/reverse bias
mechanism in terms of depletion-region width — forward bias narrows it
and overcomes the built-in field, reverse bias widens it and reinforces
that field; (2) correctly identify a diode's forward current-voltage
relationship as exponential, not linear like a resistor's; (3) correctly
state that reverse current is small but genuinely nonzero (carried by
minority carriers), not exactly zero; (4) correctly explain rectification
as exploiting this forward/reverse asymmetry to convert AC into
pulsating DC.

## Core Understanding

Forward bias narrows a p-n junction's depletion region and allows
current to flow readily, while reverse bias widens it and blocks current
almost entirely, giving the p-n junction diode its distinctive
asymmetric, rectifying current-voltage behavior. A diode is not a
symmetric resistor whose current simply scales with applied voltage in
either direction — its one-way behavior is a direct, mechanistic
consequence of how an externally applied voltage interacts with the
equilibrium depletion region and built-in potential already established
in the prerequisite concept. A first persistent error believes a diode's
forward current-voltage relationship is linear like a resistor's,
missing that it rises roughly exponentially once past the turn-on
threshold. A second error assumes an absolute, sharp voltage threshold
below which literally zero current flows, missing that the underlying
relationship is a smooth, continuous exponential curve with no true
discontinuity. A third error believes reverse current is exactly zero,
missing that a small but genuinely nonzero leakage current, carried by
minority carriers, always flows. A fourth error confuses reverse
breakdown with an intensified version of ordinary reverse leakage,
missing that breakdown is a qualitatively different, distinct physical
regime.

## Mental Models

**Beginner**: "A diode should behave like a resistor once it's
conducting — double the voltage, double the current; below the turn-on
voltage, there's absolutely no current at all; reverse bias means
absolutely no current flows at all, period." Upgrade trigger: tracing
the actual I-V characteristic curve directly against an imagined
straight line, noting the clear exponential curvature, directly
confronts the linear-behavior assumption; zooming into the I-V curve's
"knee" region, showing it as continuous rather than a vertical jump,
directly confronts the sharp-threshold assumption; presenting the
reverse-bias region as a small but nonzero, roughly flat line — connected
explicitly to minority carrier motion — directly confronts the exactly-
zero assumption.

**Intermediate**: "Diode forward current-voltage behavior is
exponential, not linear/ohmic — a genuinely nonlinear circuit element;
the turn-on voltage is a practical, useful approximation of a smooth
exponential relationship, not a literal, physically sharp discontinuity;
reverse-bias current is small but genuinely nonzero (the reverse
saturation/leakage current, carried by minority carriers), not exactly
zero." This model correctly captures the three core distinctions but may
still need practice distinguishing ordinary reverse leakage from the
qualitatively distinct breakdown regime.

**Advanced**: always frame forward and reverse bias as two opposite
mechanisms acting on the same depletion-region-and-built-in-field system
(narrowing/overcoming vs. widening/reinforcing) rather than as
independent phenomena, and always describe rectification as exploiting
this forward/reverse asymmetry across an AC cycle rather than treating
it as an unexplained device property.

**Expert**: the connection to specialized diode types (Zener diodes
deliberately engineered for a sharp, controlled breakdown voltage used in
voltage regulation; LEDs exploiting forward-bias recombination to emit
light) and to real power-electronics applications (rectifier circuits as
the foundational first stage of virtually every AC-powered electronic
device, AM radio demodulation) — not required for mastery, the capstone
application closing the entire semiconductor-physics sub-sequence.

## Why Students Fail

The dominant failure is believing a diode's forward current-voltage
relationship is linear like a resistor's, missing its genuinely
nonlinear, roughly exponential shape; a closely related failure assumes
an absolute, sharp voltage threshold below which literally zero current
flows, missing that the underlying relationship is smooth and
continuous; a further failure believes reverse current is exactly zero,
missing the small but genuinely nonzero minority-carrier leakage
current; a final failure confuses reverse breakdown with an intensified
version of ordinary reverse leakage, missing that breakdown is a
distinct, qualitatively different physical regime reached only at a
specific high voltage.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mod.diode-
rectification.md`, Section 4 Misconception Library) documents three;
reused by reference with birth-type added.

- **MC-1 ("a diode's forward current-voltage relationship is linear,
  like a resistor's")**: believing "a diode should behave like a
  resistor once it's conducting — double the voltage, double the
  current." **Birth type**: overgeneralization (Type 1) — prior
  extensive experience with Ohm's-law-obeying resistors leads students
  to assume all circuit components follow a similarly linear
  relationship. Probe: "If you double the forward voltage applied to a
  diode (while staying above its turn-on voltage), does the current
  through it also roughly double, the way it would for a simple
  resistor following Ohm's law?"
- **MC-2 ("there is an absolute, sharp voltage threshold below which
  literally zero current flows in the forward direction")**: believing
  "below the turn-on voltage, there's absolutely no current at all —
  it's a hard cutoff." **Birth type**: language contamination (Type 3)
  — the practical, commonly-used "turn-on voltage" approximation is
  over-interpreted as a literal, sharp physical discontinuity. Probe:
  "Below the nominal 0.6–0.7 V 'turn-on' voltage for a silicon diode, is
  the forward current exactly, mathematically zero, or just very
  small?"
- **MC-3 ("reverse current is exactly zero under reverse bias")**:
  believing "reverse bias means absolutely no current flows at all,
  period." **Birth type**: language contamination (Type 3) — the common
  simplification "reverse bias blocks current" is over-interpreted as a
  literal, exact-zero claim rather than a practical approximation. Probe:
  "Under reverse bias (below the breakdown voltage), is the current
  through a diode exactly, mathematically zero, or just very small?"

## Analogies

**Best**: a one-way check valve in a pipe, fitted with a small spring
that must be overcome before it opens. Pushing water in the "forward"
direction: once pressure exceeds the spring's threshold, the valve opens
and water flows freely, with flow rate rising rapidly beyond that
threshold. Pushing water in "reverse": the valve seals more tightly,
allowing at most a tiny seepage, essentially independent of reverse
pressure — until pressure becomes so extreme the valve mechanism fails
entirely (breakdown). Explicitly breaks down at one point: a real check
valve's forward flow, once past the spring threshold, is generally
closer to proportional than the diode's genuinely exponential current-
voltage relationship — the analogy captures the "threshold, then flows
freely one way, blocks the other" structure but not the specific
exponential mathematical form.

**Anti-analogy**: do NOT say "a diode is just a resistor that only
works in one direction" — this directly reinforces MC-1 by implying a
linear (ohmic) forward relationship; a diode's forward behavior is
fundamentally nonlinear (exponential), not merely "one-directional but
otherwise resistor-like."

## Demonstrations

Worked-example: build the full diode I-V characteristic curve live
(forward exponential rise past the knee, flat small reverse leakage,
sharp breakdown at high reverse voltage), having the learner identify
and label each of the three distinct regions — directly targets MC-1 and
MC-2 by making the actual curve shape concrete. Worked-example: draw the
three depletion-region diagrams (unbiased, forward-biased/narrowed,
reverse-biased/widened) side by side, directly connecting applied
voltage direction to the resulting mechanism and current behavior.

## Discovery Questions

Discovery-style: "You just learned that a p-n junction, left alone,
settles into a stable equilibrium. Now connect a battery to it.
Depending on which way you connect it, one direction lets substantial
current flow easily, and the other direction blocks almost all current.
Why would connecting the exact same battery in two different
orientations produce such wildly different results?" — learner
discovers (through the forward/reverse mechanism resolution — narrowing
and overcoming the built-in field vs. widening and reinforcing it) that
the same applied voltage produces dramatically asymmetric outcomes
depending on direction, directly setting up the full I-V curve
investigation.

## Teaching Sequence

Blueprint's Section 9 Teaching Actions cited by reference (5 actions,
session cap 5: forward/reverse mechanism explanation alongside the
depletion-region-width comparison, establishing the mechanistic
connection to the prerequisite concept → I-V characteristic curve build
directly confronting MC-1 and MC-2 → direct probe of MC-3 using the I-V
curve's reverse region → rectification diagram connecting the
sub-sequence to its capstone application → consolidation exercise
predicting forward conduction, reverse leakage, or breakdown for a given
circuit). MC-1 and MC-2 are addressed together via the I-V curve build,
before MC-3 via the reverse-region probe.

## Tutor Actions

EXPLAIN + DEMONSTRATE (forward/reverse mechanisms alongside the
depletion-region-width comparison, establishing the mechanistic
connection to the prerequisite concept); DEMONSTRATE + CHALLENGE (I-V
characteristic curve build, directly confronting MC-1 and MC-2);
CHALLENGE (direct probe of MC-3, using the I-V curve's reverse region);
TRANSFER (rectification diagram, connecting the entire semiconductor
sub-sequence to its capstone real-world application); SYNTHESIS
(consolidation exercise: given a diode circuit's applied voltage and
direction, predict forward conduction, reverse leakage, or breakdown,
justifying with the full mechanism chain).

## Voice Teaching Notes

Listen for "a diode should behave like a resistor," "below the turn-on
voltage there's absolutely no current," or "reverse bias means
absolutely no current flows, period" — the three most frequent
misconception tells. Load-bearing sentence: "A diode's one-way behavior
isn't magic or an arbitrary engineering choice — it's a direct,
mechanistic consequence of how an applied voltage either fights against
or reinforces the same depletion region and built-in potential you
already understand. And this single asymmetric behavior — allow one
way, block the other — is the foundational trick behind converting the
alternating current from your wall outlet into the steady direct current
every electronic device actually needs." Channel-reality caveats owned
by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner assuming a diode's forward behavior is linear signals MC-1
(full repair via the I-V curve build, tracing its curvature against an
imagined straight line). A learner assuming an absolute zero-current
threshold signals MC-2 (full repair via zooming into the I-V curve's
knee region, showing continuity). A learner assuming reverse current is
exactly zero signals MC-3 (full repair via the I-V curve's reverse
region, connected to minority carrier motion). Mastery trigger: correctly
explaining the forward/reverse bias mechanism in depletion-region terms,
correctly identifying the I-V curve as exponential not linear, and
correctly explaining rectification as exploiting this asymmetry.
Blueprint's Section 11 Assessment (FA-1 through FA-4) cited for the full
item bank.

## Tutor Recovery Strategy

Shrink-to question: "does describing 'rush hour' as starting 'at 5 PM
sharp' mean traffic literally jumps from zero to heavy at that exact
instant, or is it a useful practical marker on a smooth, continuously
increasing trend?" (isolating the practical-approximation-vs-literal-
discontinuity pattern before re-applying it specifically to the diode's
turn-on voltage). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (forward bias narrowing the depletion region and overcoming the
built-in field; reverse bias widening it and reinforcing that field; the
exponential, not linear, forward I-V relationship; genuinely nonzero
reverse leakage current carried by minority carriers; rectification as
exploiting forward/reverse asymmetry) bound to procedure (predicting
forward conduction, reverse leakage, or breakdown from a given applied
voltage and direction; tracing the I-V curve's three distinct regions).
Interleave with `phys.mod.pn-junction` (prerequisite — the equilibrium
depletion region and built-in potential this concept's applied-bias
mechanism directly builds on).

## Transfer Connections

Near: applying the same forward/reverse bias reasoning to specialized
diode types (Zener diodes engineered for controlled breakdown voltage
used in voltage regulation; LEDs exploiting forward-bias recombination
to emit light). Far: power electronics and circuit design (rectifier
circuits as the foundational first stage of virtually every AC-powered
electronic device), radio and communications engineering (AM radio
demodulation via diode rectification), and the general engineering
principle of exploiting an asymmetric physical mechanism to achieve
directional device behavior — also seen in mechanical check valves and
biological ion channels. Real-world: every electronic device's power
supply, converting wall-outlet AC to usable DC. Expert: the general
principle that an externally applied perturbation can either work with
or against a system's own internal equilibrium-restoring mechanism,
producing dramatically asymmetric responses depending on direction.

## Cross-Subject Connections

KG `cross_links` not separately checked this batch (not required by the
Blueprint's Section 15 Curriculum Feedback, which records no open
issues); the asymmetric-response-to-directional-perturbation structural
pattern (shared with mechanical check valves and biological ion
channels) is the primary cross-subject bridge, already covered under
Transfer Connections above.

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.mod.diode-
rectification.md`, numbered-Section format). Reuses: Section 4
Misconception Library by reference. Not restated: Section 0 Concept
Metadata, Section 1 Concept Spine full formula derivations, Section 5
Explanation Library, Section 7 Demonstration Library full walkthroughs,
Section 8 Discovery Lesson full sequence, Section 11 Assessment full
item text, Section 12 Recovery Notes, Section 13 Memory and Review
schedule, Section 14 Transfer Map.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No open issues found this batch — prerequisite adequacy
(`phys.mod.pn-junction`) and the absence of a further unlock (correctly
reflecting this concept's role as the terminal capstone of the
six-concept semiconductor-physics sub-sequence: energy bands →
classification → intrinsic → extrinsic/doping → p-n junction → diode
rectification) are both internally consistent with the Blueprint's own
Section 15 findings. This is the final physics KG concept authored under
this program — physics Educational Brain coverage now stands at 238/238
(100%).

## Version History

- 2026-07-23 (physics EB Wave 24, FINAL): initial authoring. Physics
  Educational Brain coverage reaches 238/238 (100%) with this entry.
