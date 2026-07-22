# Lenz's Law and Induced EMF Direction — `phys.em.lenzs-law`

## Identity

- **Concept ID**: `phys.em.lenzs-law` (canonical physics KG)
- **Curriculum location**: physics / electromagnetism — dependency level 6.
- **Prerequisites**: `phys.em.faradays-law` — the load-bearing part is
  already having the magnitude relationship (induced EMF proportional to
  rate of flux change); Lenz's law supplies the missing DIRECTION (the sign
  convention Faraday's law's magnitude alone does not determine on its
  own).
- **Unlocks** (from KG): none directly listed — a terminal but load-bearing
  concept, since correct EMF-direction reasoning is implicitly required
  (though not KG-encoded as a formal prerequisite) for every subsequent
  circuit-direction problem involving induction, including
  `phys.em.self-inductance` and `phys.em.mutual-inductance`.
- **Difficulty**: proficient · **Bloom**: understand · **Mastery
  threshold**: 0.80 · **Est. hours**: 4

## Learning Objective

The learner can: (1) state Lenz's law — the induced current's direction is
always such that the magnetic field it produces opposes the CHANGE in flux
that caused it, not the flux itself — and correctly distinguish "opposes
the change in flux" from the common misreading "opposes the flux" or
"opposes the current that caused it"; (2) correctly apply the right-hand
rule (or equivalent) to determine induced current direction for a given
changing-flux scenario, using Lenz's law to establish the opposing
orientation first; (3) correctly explain why Lenz's law is a direct
consequence of energy conservation — an induced current that reinforced,
rather than opposed, its own causal flux change would create a
runaway positive-feedback loop generating energy from nothing, violating
conservation of energy; (4) correctly apply Lenz's-law reasoning to at
least two qualitatively different scenarios (a magnet moving toward vs.
away from a loop; a changing current in a nearby coil) without treating
each as a separately memorized case.

## Core Understanding

Lenz's law states that an induced current always flows in the direction
that creates a magnetic field opposing the CHANGE in magnetic flux that
produced it — critically, "opposing the change," not "opposing the flux
itself" (a current can, correctly, produce a field in the SAME direction as
the existing flux, provided that flux is DECREASING, since opposing a
decrease means reinforcing/adding to what's shrinking). This directional
rule is not an independent, arbitrary empirical fact bolted onto Faraday's
law — it is a direct, necessary consequence of energy conservation: if
induced current instead reinforced the change that caused it (a growing
flux inducing a current that made the flux grow even faster), the system
would spontaneously accelerate its own energy input with no external work
being done, a violation of one of physics' most fundamental conservation
principles. Lenz's law therefore supplies the crucial minus sign in
Faraday's law's full statement (EMF = −dΦ/dt), converting a
magnitude-only relationship into a complete, direction-specified physical
law, and every correct EMF-direction determination — whether for a moving
magnet, a changing current in a neighboring coil, or a rotating loop in a
generator — reduces to the same underlying question: which flux CHANGE is
occurring (increasing or decreasing, in which direction), and what induced
current direction would oppose specifically that change.

## Mental Models

**Beginner (arriving model, often already wrong)**: "The induced current
opposes the magnetic field / flux that's present." This model correctly
captures an "opposition" theme but applies it to the wrong target (the flux
itself, rather than the CHANGE in flux), producing systematically wrong
answers whenever flux is decreasing (where the correct induced current
actually reinforces, rather than opposes, the existing flux direction, in
order to oppose its decrease). Upgrade trigger: presenting a flux-decreasing
scenario (a magnet moving AWAY from a loop) and asking the learner to apply
their own "opposes the flux" rule, then comparing to the actual (opposite-
seeming, but energy-conservation-consistent) correct answer directly
confronts the misapplied target.

**Intermediate**: "The induced current opposes the CHANGE in flux — if flux
is increasing, the induced current opposes further increase; if flux is
decreasing, the induced current opposes further decrease (which means
reinforcing the existing flux direction)." This model correctly identifies
the target of opposition, but is often applied as a memorized verbal rule
without a fluent, reasoned connection to WHY this must be true (energy
conservation), leaving the learner unable to generalize confidently to
genuinely novel scenarios that don't closely resemble a practiced example.

**Advanced**: "Lenz's law follows necessarily from energy conservation — any
induced current that reinforced its own causal flux change would create a
runaway, energy-generating feedback loop, which cannot occur; therefore the
induced current MUST oppose the change, in every possible scenario, without
needing case-by-case verification." This model grounds the directional rule
in a deeper physical necessity, enabling confident reasoning about entirely
novel scenarios by returning to the energy-conservation argument rather than
pattern-matching to a memorized case.

**Expert**: "Lenz's law, mathematically, is the origin of the minus sign in
Faraday's law (EMF = −dΦ/dt) and is the specific mechanism responsible for
the resistive 'drag' force felt when moving a conductor through a magnetic
field (eddy current braking) — a direct, macroscopically observable and
technologically exploited consequence of this microscopic directional
rule." Not required for mastery, but worth flagging as the bridge from
"abstract directional rule" to "genuinely felt physical force" for a
student ready for it.

## Why Students Fail

The dominant failure mode is target-substitution: the word "opposes" is
correctly retained, but its intended target (the CHANGE in flux) is
silently substituted for a more intuitively available target (the flux
itself, or sometimes the original cause more generally, like "the magnet"),
producing answers that are right exactly half the time (whenever flux
happens to be increasing) and confidently, systematically wrong the other
half (whenever flux is decreasing) — a genuinely insidious failure mode
because it looks like competent rule-application rather than confusion.

## Misconceptions

This concept's Blueprint (`docs/curriculum/blueprints/phys.em.lenzs-law.md`,
Component 3 — Misconception Engine) documents two misconceptions in full;
reused by reference with birth-type classification added.

- **MC-LENZS-LAW-MEANS-INDUCED-CURRENT-OPPOSES-ORIGINAL-CURRENT**: the
  belief that Lenz's law means the induced current always flows opposite to
  whatever original/causal current or motion produced it, rather than the
  more precise "opposes the CHANGE in flux" statement — a target-substitution
  error, as described above, that produces correct answers only in the
  subset of scenarios where "opposing the cause" happens to coincide with
  "opposing the flux change." **Birth type**: overgeneralization (Type 1) —
  the word "opposes" is retained faithfully, but its precise target (flux
  change specifically) is replaced with a more intuitively graspable but
  imprecise target (the cause generally), a simplification that works often
  enough in commonly-practiced examples to go undetected until a
  flux-decreasing scenario exposes the error. Detection probe: "A magnet is
  moving AWAY from a loop, so the flux through the loop is decreasing. Does
  the induced current create a magnetic field that opposes the magnet's
  motion (pulling it back), or one that reinforces the (weakening) flux
  direction?" An answer describing opposition to the magnet's motion in a
  way that doesn't correctly track flux DIRECTION (rather than correctly
  reasoning that the induced field reinforces the weakening flux, which
  happens to also create an attractive force pulling the magnet back —
  both effects are consistent with the correct "oppose the change" rule,
  but only if reasoned through the flux-change lens, not a "generically
  oppose the cause" lens) reveals imprecise underlying reasoning.
- **MC-LENZS-LAW-VIOLATES-ENERGY-CONSERVATION**: the (less common, but
  genuinely confused) belief that Lenz's law, by describing a force that
  opposes motion (e.g., resisting a magnet being pushed into a loop),
  somehow represents energy being "lost" or the system violating
  conservation, rather than correctly recognizing that Lenz's law is a
  DIRECT CONSEQUENCE of energy conservation (the opposing force is exactly
  what prevents a runaway, energy-generating feedback loop, and any work
  done against that opposing force is exactly and necessarily converted
  into the induced current's electrical energy). **Birth type**:
  perceptual intuition (Type 2) — "opposition" and "resistance" are
  perceptually associated with energy loss/dissipation in everyday
  experience (friction, air resistance), so a directional rule described as
  "opposing" is intuitively but incorrectly filed under "energy is being
  lost" rather than "energy is being correctly, necessarily converted and
  accounted for." Detection probe: "When you push a magnet into a loop and
  feel resistance from the induced current's opposing field, is energy
  being destroyed, or is it going somewhere specific?" An answer suggesting
  energy is simply lost or destroyed (rather than converted into electrical
  energy in the circuit) reveals this misconception.

## Analogies

**Best analogy — a household thermostat.** A thermostat opposes CHANGE in
temperature (turning on heating when temperature drops below setpoint,
turning on cooling when it rises above), not the temperature itself — it
doesn't try to eliminate all temperature, it specifically resists movement
away from the current/desired state. This directly targets
MC-LENZS-LAW-MEANS-INDUCED-CURRENT-OPPOSES-ORIGINAL-CURRENT by
reinforcing "opposes the CHANGE," a precise, already-familiar everyday
mechanism, rather than "opposes the thing itself" or "opposes whatever
caused the change." **Breaking point**: a thermostat is an active,
engineered feedback control system with a deliberate setpoint; Lenz's law
is a passive, automatic physical consequence with no "setpoint" concept —
useful for the change-vs-state-opposition structure only, not for the
underlying mechanism.

**Alternative analogy — a person bracing against being pushed.** If someone
pushes you forward, you instinctively brace and push back — not against
"forward" as an abstract direction in general, but specifically against
being MOVED from your current position; if instead someone tried to pull
you back to where you already were, you'd resist that pull too, in the
opposite (now forward-ish) direction. The braced response always opposes
whatever specific change is being attempted, regardless of which absolute
direction that happens to be.

**Story analogy**: Heinrich Lenz's own 1834 work, formalizing a directional
rule that made Faraday's earlier (1831) discovery of electromagnetic
induction's MAGNITUDE relationship into a complete, direction-specified law
— worth a brief mention establishing that Faraday and Lenz's contributions
are complementary (magnitude vs. direction), not competing.

**Visual analogy**: two side-by-side scenarios — a magnet approaching a
loop (flux increasing, induced current opposes further increase) and a
magnet receding from a loop (flux decreasing, induced current opposes
further decrease, meaning the induced field REINFORCES the existing flux
direction) — drawn with explicit flux-direction arrows and induced-current-
direction arrows in each case, directly and visually countering
MC-LENZS-LAW-MEANS-INDUCED-CURRENT-OPPOSES-ORIGINAL-CURRENT by showing that
the induced field's relationship to the ORIGINAL flux direction flips
between the two scenarios, even though both correctly follow the single
"oppose the change" rule.

**Anti-analogy**: do NOT describe Lenz's law as "the induced current always
opposes the magnet" or "opposes whatever caused it" as a general
shorthand — this directly installs
MC-LENZS-LAW-MEANS-INDUCED-CURRENT-OPPOSES-ORIGINAL-CURRENT; the precise
target must always be stated as "the CHANGE in flux," never simplified to
"the cause" in general.

## Demonstrations

**Physical**: drop a strong magnet through a copper or aluminum tube (a
classic, dramatic demonstration) and observe it falling dramatically slower
than an equivalent non-magnetic object dropped through the same tube —
directly illustrating Lenz's law's opposing-force consequence (eddy current
braking) in a visceral, memorable way, and directly setting up
MC-LENZS-LAW-VIOLATES-ENERGY-CONSERVATION for discussion (where does the
"lost" kinetic energy actually go? — into heat in the tube, via induced eddy
currents, a fully energy-conserving process).

**Physical (direction variant)**: use a galvanometer connected to a coil,
moving a magnet toward and then away from the coil, observing the
galvanometer deflect in OPPOSITE directions for the two motions — directly
targeting MC-LENZS-LAW-MEANS-INDUCED-CURRENT-OPPOSES-ORIGINAL-CURRENT by
showing that "the same magnet, opposite motions" produces opposite induced
current directions, which only makes sense under the "opposes the change"
reading (both scenarios have flux changing, just in opposite directions).

**Digital/interactive**: an electromagnetic induction simulator allowing
the learner to move a magnet toward/away from a loop at variable speed,
observing induced current direction and magnitude in real time.

**Teacher-demo with elicited prediction**: before revealing the galvanometer
deflection direction for the magnet-receding case, ask "will the induced
current flow the same direction as when the magnet was approaching, or the
opposite direction?" — directly surfacing
MC-LENZS-LAW-MEANS-INDUCED-CURRENT-OPPOSES-ORIGINAL-CURRENT for diagnosis.

## Discovery Questions

**Argued call: a genuine discovery design fits well here.** Need: "does the
induced current's direction depend only on which way the magnet is moving,
or on something more specific about the flux?" Playground: the learner (via
the galvanometer or simulator demonstration) tests multiple scenarios —
magnet approaching from each side, magnet receding, magnet moving at
different speeds — recording induced current direction each time. Invention:
the learner is guided to notice that the pattern that correctly predicts
every case is "the induced current opposes the CHANGE in flux," not simply
"opposes the magnet's approach" or any single-direction rule. Collision:
present the magnet-receding case explicitly as a test of whatever
"opposes-the-cause" rule the learner may have initially proposed —
does the induced current still oppose the magnet's motion (pulling it back,
which happens to coincide with reinforcing the flux direction, since the
flux is now decreasing)? Formalization: name Lenz's law explicitly, tying
it to the energy-conservation argument. Compression: "the induced current
always opposes the CHANGE in flux, never the flux (or the cause) directly
— which is exactly what energy conservation demands."

## Teaching Sequence

This concept's Blueprint (Component 6 — Session Flow Script) provides the
turn-by-turn script; cited by reference. The concept-specific sequencing
logic this entry adds: MC-LENZS-LAW-MEANS-INDUCED-CURRENT-OPPOSES-ORIGINAL-CURRENT
must be surfaced and repaired using BOTH the approaching AND receding
scenarios together, deliberately, in the same teaching turn — presenting
only the approaching-magnet case (where "opposes the cause" and "opposes
the flux change" happen to agree) risks the misconception going completely
undetected, since the student's wrong rule produces a correct answer in
that case. MC-LENZS-LAW-VIOLATES-ENERGY-CONSERVATION should be addressed
using the falling-magnet-in-a-tube demonstration directly, connecting the
felt/observed "resistance" explicitly to where the corresponding energy
actually goes (heat from induced eddy currents), since this misconception
is best resolved by tracing the energy pathway concretely rather than by
abstract argument alone.

## Tutor Actions

From `../teaching-actions/*`: DEMONSTRATION (the galvanometer
approaching/receding comparison, and the falling-magnet-in-tube
demonstration) are the two best-fit actions here, since both misconceptions
are most effectively repaired through direct, contrastive observation.
COMPARE-CONTRAST (explicitly tabulating the approaching vs. receding
scenarios side by side, with flux direction, flux change direction, and
induced current direction all listed) directly targets
MC-LENZS-LAW-MEANS-INDUCED-CURRENT-OPPOSES-ORIGINAL-CURRENT. THOUGHT-EXPERIMENT
(the "what if the induced current reinforced its own cause" runaway-feedback
scenario) fits well for grounding the energy-conservation necessity
argument (Advanced mental model).

## Voice Teaching Notes

Listen for a learner stating the rule as "it opposes the magnet" or "it
opposes what's happening" without specifically naming FLUX and its CHANGE
— this vaguer phrasing is the verbal tell for
MC-LENZS-LAW-MEANS-INDUCED-CURRENT-OPPOSES-ORIGINAL-CURRENT, even when the
learner's answer happens to be numerically/directionally correct for the
specific scenario at hand (since the vague rule only "works" by
coincidence in flux-increasing cases). The load-bearing sentence to slow
down on is the precise statement itself — "opposes the CHANGE in flux, not
the flux, and not the cause" — since any looser paraphrase risks
re-installing the imprecision this concept is built to correct. General
channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A fast, confident but INCORRECTLY-reasoned answer to the flux-decreasing
probe (e.g., reasoning from "opposes the cause" rather than "opposes the
change") signals
MC-LENZS-LAW-MEANS-INDUCED-CURRENT-OPPOSES-ORIGINAL-CURRENT even if the
final directional answer happens to be right — this concept's assessment
must probe REASONING, not just the final direction, precisely because the
imprecise rule can produce accidentally correct answers. Mastery-
certification trigger: the learner correctly determines induced current
direction for BOTH a flux-increasing and a flux-decreasing scenario,
explicitly reasoning from "opposes the change in flux" in both cases (not
from a cause-based shortcut that happens to work for only one of them),
and correctly explains why Lenz's law follows from energy conservation.
This concept's Blueprint (Component 4 — Assessment Probes) contains the
full item bank; check there before authoring new items.

## Tutor Recovery Strategy

Likeliest Recovery Engine trigger here: "wait, so does it oppose the magnet
or not?" expressed when the receding-magnet case seems to contradict the
learner's initial rule — this is exactly the intended productive confusion,
and the concept-specific shrink-to question is "forget the magnet's motion
for a second — is the flux going up or down right now? THAT's what gets
opposed." (isolating the flux-change tracking step before re-introducing
the motion/cause-based framing). See `../foundations/01-recovery-engine.md`
for generic engine mechanics.

## Memory Hooks

Concept type: concept (the precise "opposes the change" target) bound to a
procedure (determining induced current direction via right-hand-rule
reasoning) — review should always test flux-INCREASING and flux-DECREASING
scenarios together, in the same session, specifically because testing only
one type risks the imprecise "opposes the cause" rule going undetected.
Interleaving partners: `phys.em.faradays-law` (the magnitude relationship
this concept supplies direction for) and, once authored,
`phys.em.self-inductance` and `phys.em.mutual-inductance` (both of which
require correct EMF-direction reasoning as a working tool, not a
standalone topic revisited from scratch).

## Transfer Connections

**Near transfer**: any electromagnetic induction direction-determination
problem, including generator and alternator design (where induced EMF
direction must be correctly tracked through a full rotation cycle).
**Far transfer**: eddy current braking systems (used in some trains and
roller coasters, directly exploiting the falling-magnet-in-tube
demonstration's principle at engineering scale) and induction cooktops
(which rely on induced eddy currents for heating, another direct
Lenz's-law application). **Real-world transfer**: understanding why
electric brakes on some vehicles use magnetic induction (no physical
contact, no wear, directly exploiting the opposing-force consequence of
Lenz's law) as a genuine engineering application. **Expert-transfer**:
recognizing Lenz's law as a specific instance of a very general physical
principle — that any system's response to a perturbation, when the system
obeys energy conservation, must act to oppose (not reinforce) that
perturbation — a pattern recurring in Le Chatelier's principle in chemistry
and in stability analysis generally.

## Cross-Subject Connections

The KG's `cross_links` field is empty for this concept. A genuine,
KG-unencoded connection exists to chemistry (Le Chatelier's principle,
which shares the identical deep structure — a system's response to a
perturbation opposes, rather than reinforces, that perturbation, as a
consequence of underlying conservation/stability principles) — not
currently captured as a cross_link. Recorded as Curriculum Feedback below.

## Blueprint References

A Blueprint exists: `docs/curriculum/blueprints/phys.em.lenzs-law.md`
(Component-format). This entry reuses by reference: **Component 3 —
Misconception Engine** (both misconceptions, birth-type classification
added, not re-derived), **Component 6 — Session Flow Script** (cited in
Teaching Sequence), and **Component 4 — Assessment Probes** (cited in
Assessment Signals). Not restated here: Component 0 (Concept Identity),
Component 1 (Concept Explanation Blocks), Component 2 (Worked Examples),
Component 5 (Retrieval & Spacing Schedule), Component 7 (Adaptive
Branching), Component 8 (Visualisation Specification).

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept — checked against
`src/lib/teaching/assets/brainSeedAssets.ts`. None created as part of
authoring this entry.

## Curriculum Feedback

The KG's `cross_links` field is empty despite a genuine, conceptually deep
connection to chemistry's Le Chatelier's principle (both instances of the
same "systems oppose perturbations" structural pattern). Flagged for the
Curriculum Production Pipeline's own backlog, not fixed here.

## Version History

- 2026-07-22 (this session, physics EB Wave 6): initial authoring.
