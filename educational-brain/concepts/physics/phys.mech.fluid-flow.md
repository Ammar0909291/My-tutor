# Equation of Continuity, Streamline and Turbulent Flow — `phys.mech.fluid-flow`

## Identity

- **Concept ID**: `phys.mech.fluid-flow`
- **Curriculum location**: physics / classical mechanics (fluids)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.mech.pressure-fluids` — the load-bearing part is the fluid model itself:
    a liquid fills its container, is nearly incompressible, and transmits pressure.
- **Unlocks** (from KG): `phys.mech.bernoulli`.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: NCERT Physics Class 11 Ch. 10 (Mechanical Properties of Fluids)

## Learning Objective

After this concept, the learner can:

1. State the equation of continuity, A₁v₁ = A₂v₂, and explain why it holds.
2. Compute speeds and volume flow rates in pipes of changing cross-section.
3. Distinguish streamline from turbulent flow.
4. Use the Reynolds number to judge when flow becomes turbulent.

## Core Understanding

Water hardly compresses, and in steady flow through a full pipe it cannot pile up anywhere or vanish. So every second the same volume of water must cross every section of the pipe. That volume per second, the volume flow rate, is the cross-sectional area times the speed: Q = Av. Hence A₁v₁ = A₂v₂ — the equation of continuity. Where a pipe narrows, the water must speed up; where it widens, the water slows down. Water flowing at 1.5 m/s through a 4 cm² pipe carries 4 × 10⁻⁴ × 1.5 = 6 × 10⁻⁴ m³ each second (0.6 litres per second); where the pipe narrows to 1 cm² it must flow at 6 m/s to carry the same 0.6 L/s. Halve a pipe's diameter and its area falls to a quarter, so the speed rises four times.

This explains everyday flows. A thumb over the end of a hose shrinks the opening, so the water leaves faster and squirts further. A falling stream of tap water speeds up under gravity, so it narrows. A river races through a narrow gorge and slows where it widens into a lake. In the body the aorta divides into billions of capillaries; each is tiny, but their total cross-section is hundreds of times larger, so blood slows right down in them — giving time for exchange with the tissues.

At low speeds a fluid moves in smooth layers: each particle follows the path of the one ahead, along streamlines that never cross (a particle cannot have two velocities at one point). This is streamline or laminar flow. Above a critical speed the flow breaks into irregular swirls and eddies — turbulent flow, as in rising smoke that breaks up or white water. The Reynolds number Re = ρvD/η (density, speed, pipe diameter, viscosity) judges which: in a pipe, flow is streamline below about 2000. For water (η = 10⁻³ Pa·s) in a 2 cm pipe, Re reaches 2000 at only about 0.1 m/s.

Whether flow is smooth or turbulent depends on the Reynolds number, Re = ρvD/η, which compares inertia with viscosity. In a pipe, flow is laminar below about 2000 and turbulent above about 3000. Water (η = 1.0 × 10⁻³ Pa·s) at 1.0 m/s in a 2.0 cm pipe has Re = 1000 × 1.0 × 0.02/0.001 = 20 000, which is turbulent; slowed to 0.1 m/s it has Re = 2000, at the edge of laminar flow.

## Mental Models

- **Beginner (arriving)**: squeezing a flow slows it; flow gets used up along a pipe.
- **Intermediate**: Q = Av constant; speed ∝ 1/area; streamlines don't cross;
  turbulence above a critical Reynolds number.
- **Advanced**: continuity for compressible flow, ρAv = constant; mass conservation
  as the general principle; the transition region 2000–4000.
- **Expert**: the continuity equation ∂ρ/∂t + ∇·(ρv) = 0; turbulence as an open
  problem in physics.
- **Versioning note**: install the intermediate model; mention ρAv for gases.

## Why Students Fail

"Squeezed" suggests "slowed" in everyday language. The flow rate and the speed are
not separated, so a speed change is read as a change in how much flows. And area
scales with the square of diameter, which learners forget.

## Misconceptions

**M1 — A fluid slows down where a pipe narrows**
- *Why*: "squeezed means slowed" intuition (type 4).
- *Symptom / phrases*: "it's harder to get through the narrow part, so it slows".
- *Detection probe (verbatim)*: "Water flows at 1.5 m/s through a pipe of
  cross-section 4 cm², which then narrows to 1 cm². How fast does it flow in the
  narrow part?"
- *Recovery*: where would the extra water go? The hose and thumb.
- *Verification*: three area-ratio predictions.

**M2 — The flow rate falls along a pipe as fluid is used up**
- *Why*: flow pictured as consumed (type 2).
- *Symptom*: "less comes out at the far end".
- *Detection probe*: "In a long horizontal pipe with steady flow and no leaks, is the
  volume of water leaving each second less than the volume entering?"
- *Recovery*: a full, rigid pipe cannot store the difference.
- *Verification*: identify what stays constant (Q) and what changes (v).

**M3 — Halving the diameter doubles the speed**
- *Why*: area treated as proportional to diameter (type 5).
- *Symptom*: "×2" instead of "×4".
- *Detection probe*: "A pipe's diameter halves. By what factor does the speed change?"
- *Recovery*: A = πd²/4 — half the diameter, a quarter of the area.
- *Verification*: two diameter-change items.

## Analogies

- **Best analogy**: a crowd leaving a stadium through a narrowing corridor — to get
  the same number of people out per minute, everyone in the narrow part must walk
  faster.
  *Breaking point*: people can bunch up; an incompressible liquid cannot.
- **Alternative**: traffic on a road narrowing from three lanes to one at constant
  flow.
  *Breaking point*: real traffic jams — compressible "fluid".
- **Anti-analogy to avoid**: "squeezing a tube of toothpaste slows it." It installs
  M1.

## Demonstrations

- **Home**: thumb over a hose; watch a tap stream narrow as it falls.
- **Teacher demo**: dye injected into water flowing through a glass tube with a
  constriction — streamlines crowd together where it narrows; increase the speed until
  the dye breaks into eddies.
- **Prediction before demo**: "in the narrow part, will the dye move faster or
  slower?"

## Discovery Questions

**Structure**:
1. *Need*: "Why does the hose squirt further with a thumb over it?"
2. *Discovery*: equal-volume slugs through wide and narrow sections.
3. *Direct instruction*: Q = Av, continuity, streamline vs turbulent, Re.
4. *Apply*: rivers, arteries, nozzles.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): the hose and the thumb.
2. **Worked examples** (high fit): 4 cm² → 1 cm², 1.5 → 6 m/s, 0.6 L/s; Re = 2000 at
   0.1 m/s.
3. **Error exposure** (high fit for M1/M2): the "extra water" question.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) A₁v₁ = 4 cm² × 1.5 m/s → v₂ = 6 m/s at 1 cm².
   (b) Q = 4 × 10⁻⁴ × 1.5 = 6 × 10⁻⁴ m³/s = 0.6 L/s.
   (c) v at Re = 2000: 2000 × 10⁻³ / (1000 × 0.02) = 0.1 m/s.

2. **ERROR-ANALYSIS** — a student predicts slower flow in the narrow part. Ask where
   the extra water would go.

3. **PREDICTION-BEFORE-DEMO** — before the dye demo, ask faster or slower.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "state continuity" → "10 cm² at 2 m/s into 2.5 cm²" → "streamline vs turbulent".

## Voice Teaching Notes

*How it sounds when taught well*: the tutor says "same volume every second" before
any formula; separates "how much flows" from "how fast"; squares the diameter aloud.

*Load-bearing sentence to slow down on*: "Water can't pile up in a full pipe, so the
same volume must pass every section each second — narrower means faster."

*What to listen for*: "slower in the narrow bit" → M1; "less comes out" → M2; "half
the diameter, double the speed" → M3.

## Assessment Signals

**Diagnostic — golden probe**: "1.5 m/s in 4 cm², narrowing to 1 cm². Speed?"
Correct: 6 m/s.

**Distractor-mapped items**:
- "Speed in the narrow part?" Options: 6 m/s, 0.375 m/s, 1.5 m/s, 3 m/s. Answer:
  6 m/s. "0.375 m/s" targets M1.
- "Diameter halves: speed?" Options: ×4, ×2, ×½, unchanged. Answer: ×4. "×2"
  targets M3.

**Guided practice → independent practice fading ladder**:
1. Volume flow rate (3 items).
2. Continuity speeds (3 items).
3. Diameter-change items (2 items).
4. Streamline vs turbulent and Re (3 items).
5. (Unscaffolded) design a nozzle for a target speed.

**Mastery gate set** (per assessment/05):
- *Production*: one continuity and one flow-rate calculation.
- *New surface*: blood in capillaries.
- *Mixed*: continuity items interleaved with flow-type items.
- *Delayed*: one-week check — the tap stream.

**Calibration note**: learners can use A₁v₁ = A₂v₂ with areas given; the check that
reveals miscalibration is a diameter change.

## Tutor Recovery Strategy

*Likeliest utterance*: "it slows down because it's squeezed" (M1).

*Concept-specific smaller question*: "If 0.6 litres arrive each second, how much must
leave the narrow part each second?"

*M2 recovery*: "Where could the missing water go in a full pipe?"

## Memory Hooks

- **Concept type**: principle (conservation of volume flow) + classification (flow
  types).
- **Review form** (per Delivery 2 §8): continuity as spaced retrieval; area ratios as
  distributed practice.
- **Automaticity target**: "Av = constant; area ∝ d²".
- **Interleaving partners**: `phys.mech.pressure-fluids`, `phys.mech.bernoulli`,
  `phys.mech.viscosity`.

## Transfer Connections

- *Near*: `phys.mech.bernoulli` — faster flow, lower pressure.
- *Near*: `phys.mech.viscosity` — what sets the critical speed.
- *Far*: aerodynamics and weather.
- *Real-world*: hose nozzles, plumbing, rivers, blood vessels, carburettors.
- *Expert transfer*: computational fluid dynamics.

## Cross-Subject Connections

- **Biology**: blood flow through arteries and capillaries.
- **Geography**: river speed in gorges and estuaries.
- **Engineering**: pipe sizing, irrigation.
- **Mathematics**: inverse proportion; area scaling with d².

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.mech.fluid-flow.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 9). Per the audit,
`phys.mech.bernoulli` now requires this node; its former direct requirement on
`phys.mech.pressure-fluids` is dropped because it is reached through this node (KGCS P2,
transitive reduction). "Continuity" had zero hits in the physics corpus before this
node.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.
- 2026-10-04 (coverage-driven KG extension, audit §C): added Reynolds number to Core Understanding, with one probe.
