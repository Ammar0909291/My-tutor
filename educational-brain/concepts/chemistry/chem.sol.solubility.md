# Solubility and Henry's Law — `chem.sol.solubility`

## Identity

- **KG ID**: chem.sol.solubility
- **Subject**: Chemistry
- **Domain**: Solutions (chem.sol)
- **Difficulty**: developing
- **Bloom level**: understand
- **Estimated hours**: 2
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.sol.types, chem.state.gas-laws
- **Unlocks**: none (terminal node)
- **Cross-links**: none

## Learning Objective

Students can define solubility and explain qualitatively the factors affecting solubility of solids and gases in liquids; state and apply Henry's law for the solubility of gases; and explain the applications of Henry's law to carbonation and decompression sickness in diving.

## Core Understanding

**Solubility**: the maximum amount of solute that dissolves in a given quantity of solvent at a specific temperature to form a saturated solution. Expressed as g per 100 g solvent, or mol L⁻¹ at saturation.

**Factors affecting solid solubility in liquid solvents**:
- *Temperature*: for most ionic and polar solids, solubility increases with temperature (endothermic dissolution). Exception: Ca(OH)₂, Ce₂(SO₄)₃ — solubility decreases with temperature (exothermic dissolution).
- *Nature of solute and solvent*: like-dissolves-like (polarity, hydrogen bonding, ion-dipole). NaCl dissolves readily in water but not hexane; naphthalene vice versa.
- *Pressure*: pressure has negligible effect on solid solubility (solids and liquids are nearly incompressible).

**Factors affecting gas solubility in liquid solvents**:
- *Temperature*: gas solubility in liquids decreases as temperature increases (dissolved gas has higher entropy in the gas phase; higher T favours the gas phase). Opposite to most solids.
- *Pressure*: gas solubility increases directly with partial pressure of the gas above the liquid — Henry's law.
- *Nature of gas*: gases with stronger solute–solvent interactions (CO₂ reacts with water; NH₃ hydrogen-bonds) are more soluble than noble gases.

**Henry's law**: at constant temperature, the solubility (concentration) of a gas dissolved in a liquid is directly proportional to the partial pressure of that gas above the liquid:
C = K_H × P

where C is the concentration of dissolved gas (mol L⁻¹), P is the partial pressure (atm), and K_H is the Henry's law constant (mol L⁻¹ atm⁻¹), specific to the gas–solvent pair and temperature.

Note on sign of K_H: different textbooks define K_H as P = K_H × C (K_H in atm·L·mol⁻¹, the "volatility" form) or C = K_H × P (K_H in mol·L⁻¹·atm⁻¹, the "solubility" form). The solubility form is used here; always check which definition a problem uses.

**Henry's law applications**:
- *Carbonation*: CO₂ is dissolved at high pressure (≈ 3–4 atm). When a bottle is opened, partial pressure drops to atmospheric (p_CO₂ ≈ 0.0004 atm) → C drops → CO₂ efferves.
- *Decompression sickness (the bends)*: divers breathe compressed air at depth. High p_N₂ dissolves nitrogen in blood and tissues (Henry's law). Rapid ascent → p_N₂ drops suddenly → nitrogen comes out of solution as bubbles in blood vessels → painful, potentially fatal. Safe ascent = slow enough that nitrogen departs via lungs without bubbling.
- *Oxygen in blood*: p_O₂ in lung alveoli ≈ 100 mmHg; dissolved O₂ in plasma follows Henry's law (most O₂ is actually carrier-bound to haemoglobin, but the dissolved fraction obeys Henry's law).

**Henry's law limitations**: valid only for dilute solutions, gases that don't react with the solvent, and at conditions far from the critical point of the gas.

## Mental Models

**The pressure-cap model**: imagine dissolved gas molecules as compressed springs. At high P, the springs are compressed (more gas forced into solution). Open the cap (reduce P), springs release → gas escapes. Henry's law says the number of compressed springs is proportional to the cap pressure.

**The solubility ladder for temperature**: picture a ladder where going up (increasing temperature) moves gases DOWN (less soluble) and most solids UP (more soluble). The few exceptions (Ca(OH)₂ etc.) go DOWN too — flag them explicitly as exceptions, not the rule.

## Why Students Fail

1. **Temperature increases ALL solubility**: students generalise from solid solubility (usually increases with T) to gas solubility (always decreases with T). The mechanisms differ (endothermic/exothermic dissolution; entropy of gas phase).
2. **Pressure affects solid solubility too**: students apply Henry's law indiscriminately to solid solutes. Pressure has negligible effect on solid solubility.
3. **Henry's law constants are interchangeable across textbooks**: students mix up the two K_H conventions (solubility form vs. volatility form), getting C proportional to P when it should be inversely proportional (if using the volatility form with the wrong formula).
4. **Gas solubility is zero unless it reacts**: students assume non-reactive gases (O₂, N₂, noble gases) are insoluble. All gases have non-zero solubility; the values are just small (O₂ ≈ 8 mg/L, N₂ ≈ 14 mg/L in water at 25 °C, 1 atm). Fish depend on dissolved O₂.

## Misconceptions

**MC-1 — Gas solubility increases with temperature** (Type 1, overgeneralization from solid-solubility experience)
- *Mechanism*: students learn that dissolving many solids is endothermic → more heat → more dissolving → higher solubility. They extend this to gases without recognising that dissolution of most gases is exothermic.
- *Diagnostic probe*: "Why does a warm soda go flat faster than a cold one? Is dissolved CO₂ more or less soluble at higher temperature?"
- *Characteristic phrase*: "Hot water dissolves things better, so more CO₂ would dissolve at higher temperatures."
- *Repair*: gas dissolution is exothermic (gas gives up energy when entering the liquid). Le Chatelier's principle: raising T shifts the endothermic direction → gas leaves solution. Result: gas solubility decreases with increasing T. Warm soda goes flat (CO₂ solubility is lower at warm T); fish die in warm polluted rivers (O₂ solubility drops).

**MC-2 — Henry's law applies to solid solutes** (Type 1, overgeneralization)
- *Mechanism*: students see Henry's law as a general "pressure increases solubility" rule and apply it to any solute.
- *Diagnostic probe*: "If you increase the pressure on a saturated NaCl solution, does more NaCl dissolve?"
- *Characteristic phrase*: "Higher pressure makes everything more soluble, so increasing pressure on the NaCl solution should dissolve more salt."
- *Repair*: Henry's law applies ONLY to gases dissolved in liquids. Pressure has negligible effect on solid solubility because solids are nearly incompressible — there is no phase-volume change comparable to gas compression. NaCl solubility is essentially unchanged by modest pressures. The driving force for increased gas solubility is the compression of the gas phase forcing more molecules into the liquid; no such compression occurs for solid or liquid solutes.

**MC-3 — Non-reactive gases are insoluble in water** (Type 2, perceptual intuition)
- *Mechanism*: students think "dissolving requires attraction" and assume non-reactive, non-polar gases (N₂, O₂, noble gases) cannot dissolve in polar water at all.
- *Diagnostic probe*: "Is there any dissolved oxygen in lake water? How do fish breathe?"
- *Characteristic phrase*: "Oxygen doesn't react with water and it's non-polar, so it won't dissolve."
- *Repair*: even non-reactive gases have small but non-zero solubility (weak London dispersion with water molecules). O₂ ≈ 8 mg/L in water at 25 °C, 1 atm — enough to sustain aquatic life. N₂ ≈ 14 mg/L. The bends occurs because of dissolved N₂ in blood — a non-reactive gas with measurable Henry's law solubility. "Insoluble" means very low solubility, not zero.

## Analogies

**The bouncer analogy for saturation**: a nightclub (solution) has a maximum capacity (solubility). At saturation, for every molecule let in, one is pushed out — equilibrium, not zero exchange. If you cool the club (lower T for gases), more can pack in; if you heat it, people leave.

**The fizzy water under pressure analogy**: before opening, the CO₂ and water are at peace under high partial pressure. Crack the seal → pressure drops → CO₂ is no longer content dissolved → it leaves. Henry's law says it will leave until C equilibrates to the new lower P.

## Demonstrations

**Demonstration 1 — Carbonated water opened at different temperatures**
- Open identical carbonated water bottles at 4 °C (refrigerator) and at 37 °C. The warm bottle fizzes vigorously; the cold one releases gas slowly. Quantitative: measure CO₂ volume released if possible. Students observe directly that gas solubility decreases with temperature.

## Discovery Questions

1. "At 25 °C, K_H for CO₂ in water is 3.4 × 10⁻² mol L⁻¹ atm⁻¹. The partial pressure of CO₂ in a carbonated beverage under the cap is 4.0 atm. Calculate the dissolved CO₂ concentration. After opening (p_CO₂ drops to 4 × 10⁻⁴ atm), what is the new equilibrium dissolved CO₂?" (Targets: Under cap: C = 3.4 × 10⁻² × 4.0 = 0.136 mol L⁻¹. After opening: C = 3.4 × 10⁻² × 4 × 10⁻⁴ = 1.36 × 10⁻⁵ mol L⁻¹. Ratio: 0.136/1.36×10⁻⁵ ≈ 10,000 — essentially all CO₂ leaves at atmospheric conditions.)
2. "A diver breathes air (78% N₂) at 30 m depth (total pressure ≈ 4 atm). At 25 °C, K_H for N₂ = 6.1 × 10⁻⁴ mol L⁻¹ atm⁻¹. Calculate the dissolved N₂ in the diver's blood plasma at depth and at the surface (1 atm)." (Targets: At 30 m: p_N₂ = 0.78 × 4 = 3.12 atm; C = 6.1 × 10⁻⁴ × 3.12 = 1.90 × 10⁻³ mol L⁻¹. At surface: p_N₂ = 0.78 × 1 = 0.78 atm; C = 4.76 × 10⁻⁴ mol L⁻¹. Rapid ascent forces 1.90 − 0.48 × 10⁻³ = 1.42 × 10⁻³ mol L⁻¹ of N₂ to come out of solution → bubble formation → bends.)
3. "Explain why fish in tropical warm rivers are more vulnerable to oxygen depletion than fish in cold mountain streams, even at the same atmospheric p_O₂." (Targets: Gas solubility decreases with temperature. At higher T, O₂ solubility (mg/L) is lower → less dissolved O₂ available for fish to breathe even though atmospheric O₂ partial pressure is identical. Additionally, warm water stimulates biological oxygen demand — bacteria decompose organic matter faster, consuming more dissolved O₂.)

## Teaching Sequence

1. Review from chem.sol.types: like-dissolves-like; concentration units. Review from chem.state.gas-laws: partial pressure (Dalton's law).
2. Define solubility and saturation. Distinguish unsaturated, saturated, supersaturated.
3. Factors affecting solid solubility: temperature (mostly increases) with Ca(OH)₂ as the flagged exception; pressure (negligible). "Like-dissolves-like" revisited for temperature dependence.
4. Factors affecting gas solubility: temperature DECREASES gas solubility — address MC-1 with the warm-soda demonstration.
5. Introduce Henry's law: C = K_H × P. Derive from equilibrium idea: equilibrium concentration of dissolved gas proportional to driving partial pressure. Address MC-3: even non-reactive gases have non-zero K_H.
6. Work Discovery Question 1 (CO₂ in carbonated beverage).
7. Work Discovery Question 2 (bends calculation).
8. Discussion: Discovery Question 3 (ecology application).

## Tutor Actions

- If student says gas solubility increases with T → MC-1 repair: warm soda fizzes more; exothermic dissolution goes backward at higher T.
- If student applies Henry's law to NaCl → MC-2 repair: Henry's law is gas-only; pressure has negligible effect on solid solubility.
- If student says non-reactive gases are insoluble → MC-3 repair: O₂ 8 mg/L; fish breathe it; N₂ causes the bends.
- Advance when student correctly applies Henry's law numerically and can qualitatively explain temperature effects on gas vs. solid solubility.

## Voice Teaching Notes

The critical distinction — "gas solubility goes down with temperature; solid solubility usually goes up" — is counterintuitive because students overgeneralise. Say it explicitly and anchor it immediately to a physical example: "Why does carbonated water go flat faster when warm? The CO₂ is less soluble at higher temperature." Repeat this connection until the student can self-generate the explanation.

Henry's law unit confusion is the main arithmetic pitfall. Before every calculation: "What form of Henry's law are we using? C = K_H × P or P = K_H × C?" Establish the convention explicitly.

## Assessment Signals

**Mastery gate**:
1. Student correctly predicts the direction of solubility change for both a solid and a gas when temperature is increased.
2. Student correctly applies Henry's law (C = K_H × P) to calculate dissolved gas concentration at given partial pressure.
3. Student correctly explains decompression sickness using Henry's law.
4. Student correctly states that pressure has negligible effect on solid solubility but directly affects gas solubility.

**FRAGILE signal**: student applies Henry's law correctly but cannot explain WHY gas solubility decreases with temperature (gives the rule without Le Chatelier reasoning).

**MISCONCEIVING signal**: student predicts gas solubility increases with temperature. Address MC-1 before proceeding to Henry's law calculations.

## Tutor Recovery Strategy

If stuck:
1. For gas-T relationship: use Le Chatelier on the dissolution equilibrium: N₂(g) ⇌ N₂(aq), ΔH < 0 (exothermic). "Which direction does heat push this?" → toward N₂(g) → less dissolved → solubility decreases with T.
2. For Henry's law calculation: "Write C = K_H × P. What is K_H? What is P? Multiply." Then sanity-check units: K_H in mol L⁻¹ atm⁻¹ × P in atm = C in mol L⁻¹.
3. For the bends: "What happens to N₂ solubility when a diver surfaces quickly?" → p_N₂ drops → C must drop → N₂ comes out of solution. "Where can it go?" → bubbles in blood. The visual of a soda bottle suddenly opened helps.

## Memory Hooks

- **Henry's law: C = K_H × P. Gas solubility ∝ partial pressure.**
- **Temperature: gas solubility DOWN with temperature UP. Solid solubility usually UP with T UP.**
- **Pressure: affects gas solubility (Henry's law). Does NOT affect solid solubility.**
- **Bends = dissolved N₂ bubbling out of blood when pressure drops suddenly.**

## Transfer Connections

- **chem.sol.vapour-pressure**: Raoult's law (vapour-pressure lowering by solute) is the mirror of Henry's law — both relate vapour pressure above a solution to concentration; Henry's applies to dilute dissolved gases, Raoult's to ideal liquid mixtures.
- **chem.equil.concept**: Henry's law is a special case of dissolution equilibrium; K_H is related to the equilibrium constant for the process gas ⇌ dissolved.

## Cross-Subject Connections

- **Biology (bio.physiol.respiratory)**: oxygen transport follows Henry's law for the dissolved fraction; oxygen partial pressure in alveoli controls dissolved O₂ in plasma; altitude hypoxia reduces p_O₂ → less dissolved O₂ → altitude sickness.
- **Environmental chemistry**: thermal pollution (warm power-plant discharge) reduces dissolved O₂ in receiving waters via Henry's law, threatening aquatic ecosystems — the quantitative basis for environmental impact assessment.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.sol.solubility`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.sol.solubility` as of 2026-07-23.

## Curriculum Feedback

This is a terminal node with no unlocks. The placement is appropriate — solubility and Henry's law are applications of gas-laws (chem.state.gas-laws via Dalton's law of partial pressures) and solution-type knowledge (chem.sol.types via like-dissolves-like). The ecological and physiological connections make this a high-transfer concept despite its terminal position.

## Live Transcript Analysis (2026-07-27)

**Source**: a real student session on Lesson 44 (Solubility and Henry's Law) with
Tutor Max, analyzed turn-by-turn below. This section exists to inform future
runtime improvements — it is teaching knowledge derived from observed failure,
not runtime code.

### What the Tutor Did (turn-by-turn diagnosis)

| Turn | Tutor action | Educational Brain rule | Verdict |
|------|-------------|----------------------|---------|
| 1 | "Picture a glass of soda with bubbles..." + "Read more" | OBSERVE (01§3 demo1 opening) | **Correct** — concrete anchor |
| 2 | "What do you notice about the bubbles?" | OBSERVE phase ask | **Correct** — observation question after showing |
| 3 | Student gives a good answer (buoyancy, dissolved CO₂). Tutor: "Imagine an unopened bottle. Do you see lots of bubbles?" | Second observation question | **Borderline** — the student already answered well; advancing to DEMONSTRATE would have been better |
| 4–8 | Student says "Not lots of", "Nope", "I think yes", "Got it." Tutor keeps asking: "Have you seen a similar situation?", "What do you see?", "Have you seen..." — 6 consecutive questions | QUIZ register (conversation-engine/06§1) — **max 2 questions in a row, violated** | **FAILED** — the tutor fell into the QUIZ anti-pattern. After 2 questions, the next turn MUST give something (a statement, demonstration, or observation) |
| 9–11 | Student sends "?", "No I don't have it.", ":(". Tutor: "Sorry, I got cut off" (error) × 2, then "Imagine a glass of soda..." — restarting the same anchor | ROBOT register (06§1) — no acknowledgment, identical restart | **FAILED** — the tutor restarts the same observation without acknowledging the student's distress |
| 12 | **Student: "Can you explain me the law rather than keep asking the questions?"** | too_many_questions recovery trigger (recoveryGuard.ts) | **FAILED TO DETECT** — this exact phrasing did not match any pattern; the student's clearest signal was missed by the system |
| 13 | Tutor gives a good explanation: Henry's Law stated, formula, worked example, soda/diving applications | DEMONSTRATE + EXPLAIN | **Correct** — this is what should have happened at turn 3 |
| 14 | Student: "Got it." Tutor: "Which everyday situation involves gas dissolving?" | Back to asking | **FAILED** — the correct next move after a successful explanation is GUIDED PRACTICE (a calculation), not another observation question |
| 15–end | Student says "Mineral water bottle", "No idea", "I don't have any idea about amount of co2", "I don't know" × 2. Tutor keeps asking the same observation question ("What do you notice about the gas and the liquid?") | Multiple recovery triggers missed; QUIZ register sustained | **FAILED** — the tutor ignored 5 consecutive failure signals and kept asking observation questions |

### How a Chemistry Professor Would Teach This

A chemistry professor teaching Henry's Law to a student at this level would follow
a structure closer to this:

**Phase 1 — Create the Need (30 seconds)**
- "Let me show you something." Open a bottle of soda (or describe it vividly).
  Hiss, bubbles, fizzing. "What just happened?" ONE question. If the student
  says anything about gas/bubbles/CO₂: "Exactly — the CO₂ that was dissolved
  came out. The question is: WHY was it dissolved before, and WHY did it come
  out now?"

**Phase 2 — Teach the Law (2 minutes)**
- State the law directly: "Henry's Law says the amount of gas that dissolves
  in a liquid is proportional to the pressure of that gas above the liquid.
  Double the pressure → double the dissolved gas."
- Write the equation: C = k_H × P
- Connect to the bottle: "The factory sealed CO₂ at ~3 atm. That's why so
  much dissolved. You opened it → pressure dropped to almost zero → CO₂
  can't stay → bubbles."

**Phase 3 — Guided Calculation (3 minutes)**
- "Let's calculate. k_H for CO₂ = 0.034 mol/L/atm. Under the cap, P = 3 atm.
  What's C?" Walk through together: 0.034 × 3 = 0.102 mol/L.
- "Now you open it. P drops to 0.0004 atm. What's C?" Student calculates:
  0.034 × 0.0004 = 0.0000136 mol/L. "That's 7500× less. All that CO₂ has
  to go somewhere — that's the fizz."

**Phase 4 — Application (2 minutes)**
- "Same law explains the bends. At 30m depth, pressure is 4 atm. N₂ in air is
  78%. What's the partial pressure of N₂?" Student: 0.78 × 4 = 3.12 atm.
  "So 4× more N₂ dissolves in the diver's blood. Rise too fast → pressure
  drops → N₂ bubbles in the blood."

**Phase 5 — Transfer Check (1 minute)**
- "Why do fish die in warm water?" This is the genuine test — it combines
  Henry's law with the temperature effect. If the student can answer it,
  they own the concept.

**Critical differences from the observed session:**
1. The professor TEACHES before asking. The tutor ASKED before teaching.
2. The professor gives ONE question, waits, then teaches. The tutor gave
   7+ consecutive questions before any teaching.
3. The professor moves to guided CALCULATION after explaining. The tutor
   moved back to observation questions.
4. The professor reads "I don't know" as "teach me now." The tutor read it
   as "try asking differently."
5. The professor's entire sequence takes ~10 minutes. The observed session
   spent more than 10 minutes in observation questions alone.

### Recovery Guard Gaps Discovered

Three real student messages from this transcript were not detected by the
recovery guard (`src/lib/teaching/recoveryGuard.ts`). Fixed in the same
commit as this entry:

1. **"Can you explain me the law rather than keep asking the questions?"**
   — the learner explicitly contrasts wanting an explanation with the
   questioning they're getting. Not matched by any existing `too_many_questions`
   pattern (those require "stop asking" / "too many questions" / "just explain"
   as whole-message imperatives). **Added**: pattern for
   `(explain|teach|tell|show) ... (rather than|instead of) ... (asking|question)`.

2. **"I don't have any idea about amount of co2"** — the `dont_know` strong
   pattern matched "I have no idea" but not "I don't have any idea" (the
   negated-verb variant). **Fixed**: expanded the existing pattern to include
   `i (don't|do not) have any idea`.

3. **"?"** (single bare question mark) — the confused pattern required 2+
   question marks (`\?{2,}`). A single `?` carries the same confused signal.
   **Fixed**: changed to `\?{1,}`.

4. **":("** (sad emoticon) — no emoticon detection existed. **Added**: bare
   sad-emoticon pattern (whole-message anchored, maps to `scared`).

### Root Cause: Why the System Kept Asking

The structural cause is a compounding bias across three layers:

1. **Teaching Engine default**: `INTERACTIVE_QUESTIONING` is the default action
   type for conceptual concepts — the engine's posture is "ask" unless evidence
   overrides it.

2. **Conversation State Machine**: 4 of 6 phases (`OBSERVE`, `CHECK`, `PRACTICE`,
   `TRANSFER`) call `decideNextMove() → 'ask'` by default. Only `DEMONSTRATE`
   defaults to `'show'`.

3. **Detection gaps**: the recovery guard's `too_many_questions` patterns were
   designed for direct imperatives ("stop asking", "just explain"), not for the
   more polite contrast form ("explain rather than asking") that real students
   actually use.

The safeguards (consecutiveDontKnows ≥ 2 forces 'show'; questionsAskedSinceTeach
≥ 2 forces 'teach') exist and work — but the student's responses ("Got it",
"Yed", "Ok", ":(" — bare acknowledgements and emoticons) did not fire the
counters reliably, allowing the OBSERVE-phase loop to persist across many turns.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
- v1.1.0 — 2026-07-27 — added Live Transcript Analysis section from a real
  student session; identified and documented 4 recovery guard detection gaps
  (fixed in the same commit); added turn-by-turn teaching diagnosis and
  professor-vs-AI comparison
