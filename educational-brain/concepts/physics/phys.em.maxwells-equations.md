# Maxwell's Equations — `phys.em.maxwells-equations`

## Identity

- **Concept ID**: `phys.em.maxwells-equations` (canonical physics KG)
- **Curriculum location**: physics / electromagnetism — dependency level 7.
- **Prerequisites**: `phys.em.gauss-law`, `phys.em.amperes-law`,
  `phys.em.faradays-law` — the four Maxwell equations are precisely these
  three already-secure laws (Gauss's law for E, Ampere's law, Faraday's
  law) plus Gauss's law for B and Ampere's law's displacement-current
  correction, unified into one coupled system.
- **Unlocks** (from KG): `phys.em.electromagnetic-waves` — a genuine hub
  concept and the capstone of the classical electromagnetism domain.
- **Difficulty**: expert · **Bloom**: analyze · **Mastery threshold**: 0.80
  · **Est. hours**: 10

## Learning Objective

The learner can: (1) correctly explain that the four Maxwell equations
form a single COUPLED system, not four independent, separately-applicable
laws — specifically, that Faraday's law (changing B creates E) and the
Ampere-Maxwell law (changing E creates B, via the displacement-current
term) must be combined together to derive the electromagnetic wave
equation, a result impossible from either law alone; (2) correctly explain
that "displacement current," I_d = ε₀dΦ_E/dt, is NOT a flow of actual
charge (no electron crosses a capacitor gap) — it is a time-varying
electric-flux term that produces a magnetic field exactly as real current
does, a genuine field effect, not literal charge motion; (3) correctly
identify which of the four equations governs a given physical scenario.

## Core Understanding

Maxwell's four equations — Gauss's law for E, Gauss's law for B (no
magnetic monopoles), Faraday's law, and the Ampere-Maxwell law (Ampere's
law plus the displacement-current correction) — are not four separate,
independently-applicable tools to be picked between; they form one
COUPLED system whose deepest consequence, the existence of self-propagating
electromagnetic waves, emerges ONLY from their combination. Specifically,
taking the curl of Faraday's law and substituting the Ampere-Maxwell law
(using ∇·E = 0 in vacuum) produces the wave equation ∇²E = μ₀ε₀∂²E/∂t² —
this derivation genuinely BREAKS at the substitution step without the
displacement-current term, meaning no wave prediction (and no explanation
for light itself as an electromagnetic wave) exists without treating the
two curl equations as coupled. The Ampere-Maxwell law's displacement
current, I_d = ε₀dΦ_E/dt, is often misread as literal charge flow (as
between capacitor plates during charging) — but it is fundamentally a
FIELD quantity, the rate of change of electric flux, producing a magnetic
field exactly as a real conduction current would, with no electron ever
crossing the gap; the historical name "displacement current" is a
genuine misnomer that invites this literal-charge-flow misreading.

## Mental Models

**Beginner**: "each Maxwell equation is a separate tool — use Gauss's law
for symmetric charge problems, Ampere's law for current-loop problems,
Faraday's law for changing-flux problems, applied one at a time as
needed." Upgrade trigger: attempting to derive the electromagnetic wave
equation using only Faraday's law (impossible without the coupled
Ampere-Maxwell term) directly confronts the isolated-application
assumption.

**Intermediate**: "the four equations are coupled — Faraday's law (dB/dt
creates E) and the Ampere-Maxwell law (dE/dt creates B) combine to predict
self-propagating waves." This model correctly captures the coupling, but
sometimes still imagines displacement current as literal charge motion
between capacitor plates.

**Advanced**: "displacement current is a field effect (dΦ_E/dt), not
charge flow — no electron crosses the capacitor gap, yet the changing E
field there produces a real, measurable B field, exactly continuing the
current's magnetic effect across the gap so Ampere's law remains
consistent everywhere."

**Expert**: Maxwell's equations in covariant (relativistic) tensor form,
unifying E and B as a single electromagnetic field tensor — not required
for mastery, a natural extension toward special relativity.

## Why Students Fail

The dominant failure is treating the four equations as an independent
toolkit rather than a coupled system, missing that the wave-equation
derivation specifically requires combining two of them; a second, distinct
failure is taking the historical name "displacement current" literally,
imagining actual charge motion across a physical gap.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.em.maxwells-equations.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-MAXWELL-FOUR-EQUATIONS-ARE-INDEPENDENT**: treating each equation in
  isolation — e.g. calculating B from Ampere's law without considering
  whether a changing E field is also present, or stating "Faraday's law
  only applies to inductors." **Birth type**: instruction-induced (Type 5)
  — the four equations are often taught and practiced as separate,
  sequential topics (each with its own problem set), reinforcing an
  isolated-tool mental model rather than a coupled-system one. Probe: "Can
  you derive that light travels as a wave using ONLY Faraday's law, without
  reference to the Ampere-Maxwell law? Why or why not?"
- **MC-DISPLACEMENT-CURRENT-IS-REAL-CURRENT**: describing displacement
  current as "electrons jumping across the gap" between capacitor plates,
  or asking "which direction do the electrons move in the displacement
  current?" **Birth type**: language contamination (Type 3) — the
  historical name "displacement current," chosen for mathematical
  analogy to real current (both produce B, both appear in Ampere's law),
  is taken literally as describing actual charge displacement. Probe:
  "As a capacitor charges, does any electron actually cross the gap
  between its plates? Does a magnetic field exist in that gap anyway?"

## Analogies

**Best**: two dance partners whose movements are locked together (one
partner's motion determines the other's, and neither can be analyzed
alone) — directly targets MC-MAXWELL-FOUR-EQUATIONS-ARE-INDEPENDENT by
giving a concrete image of genuine coupling, where the wave-equation
result is the "dance" that only exists when both partners (Faraday's law
and the Ampere-Maxwell law) move together.

**Anti-analogy**: do NOT say "displacement current flows through the gap"
as an unqualified shorthand — this phrasing directly installs
MC-DISPLACEMENT-CURRENT-IS-REAL-CURRENT by implying literal charge
transport across a physical gap where none occurs.

## Demonstrations

Conceptual: step through the wave-equation derivation explicitly, showing
the substitution step that requires the Ampere-Maxwell displacement-current
term, and showing the derivation stalls without it — directly targets
MC-MAXWELL-FOUR-EQUATIONS-ARE-INDEPENDENT. Conceptual: display a timeline
of the E field growing between capacitor plates during charging alongside
the resulting B field, explicitly noting I_d = ε₀dΦ_E/dt is a rate-of-flux
quantity with no electron crossing the gap — directly targets
MC-DISPLACEMENT-CURRENT-IS-REAL-CURRENT.

## Discovery Questions

Discovery-style: "using only Faraday's law, can you show that light must
travel as a self-propagating wave?" — learner attempts, discovers the
derivation requires a second, coupled equation (Ampere-Maxwell), directly
confronting MC-MAXWELL-FOUR-EQUATIONS-ARE-INDEPENDENT.

## Teaching Sequence

Blueprint's worked-example and assessment components cited by reference.
MC-DISPLACEMENT-CURRENT-IS-REAL-CURRENT is addressed first (establishing
displacement current as a field quantity, not charge flow), before
MC-MAXWELL-FOUR-EQUATIONS-ARE-INDEPENDENT, since correctly understanding
displacement current as the Ampere-Maxwell law's own extra term is the
prerequisite for then showing how that term couples with Faraday's law to
produce the wave equation.

## Tutor Actions

WORKED-EXAMPLE (I_d calculation for a charging capacitor; step-by-step
wave-equation derivation from the coupled curl equations; four-equation
identification exercise across varied scenarios); THOUGHT-EXPERIMENT (can
the wave equation be derived from Faraday's law alone?); DIAGNOSTIC (which
Maxwell equation governs this specific scenario, across several
scenarios).

## Voice Teaching Notes

Listen for "electrons jump across the gap" or each equation applied in
isolation without checking for coupling — the two direct misconception
tells. Load-bearing sentence: "displacement current is a changing field,
not moving charge — and the wave equation only exists because two of these
equations are locked together." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner describing displacement current as literal charge flow signals
MC-DISPLACEMENT-CURRENT-IS-REAL-CURRENT (MISCONCEIVING, full repair via
the field-vs-charge-flow demonstration). A learner unable to explain why
the wave equation requires combining two equations signals
MC-MAXWELL-FOUR-EQUATIONS-ARE-INDEPENDENT (full repair via the
step-by-step derivation). Mastery trigger: correctly deriving the wave
equation from the coupled Faraday/Ampere-Maxwell system, AND correctly
explaining displacement current as a field-flux rate, not charge motion.
Blueprint's assessment component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the full derivation for a second — does an
electron actually cross the gap between charging capacitor plates?"
(isolating the field-vs-charge-flow distinction before tackling the
coupled-system argument). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (coupled-system nature; displacement current as field quantity)
bound to procedure (wave-equation derivation). Interleave with
`phys.em.gauss-law`, `phys.em.amperes-law`, and `phys.em.faradays-law`
(the three prerequisite laws whose coupling is the entire point), and,
once authored, `phys.em.electromagnetic-waves` (the direct capstone
successor).

## Transfer Connections

Near: any problem requiring identification of which Maxwell equation
governs a scenario, or derivation steps using the coupled system. Far:
antenna design and wireless communication engineering (both direct
applications of electromagnetic wave generation via the Maxwell-equation
coupling) and the historical unification of electricity, magnetism, and
optics into one theory. Real-world: understanding that light, radio waves,
and X-rays are the same phenomenon (electromagnetic waves) at different
frequencies, a direct consequence of this derivation. Expert: the
covariant tensor formulation unifying E and B fields relativistically.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified;
honest "weak but real" assessment.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
worked-example/assessment components by reference. Not restated: Concept
Identity & Metadata, Concept Explanation Multi-Tier, Lesson Composition
Grammar, Retrieval Spacing Schedule, Prerequisite & Unlock Map, Validation
Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No cross-subject connection found beyond physics itself.

## Version History

- 2026-07-22 (physics EB Wave 7): initial authoring.
