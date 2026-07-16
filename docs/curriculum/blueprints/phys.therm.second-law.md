# Teaching Blueprint — phys.therm.second-law

## Component 0 — Concept Identity

```yaml
concept_id: phys.therm.second-law
name: Second Law of Thermodynamics
domain: thermodynamics
difficulty:
  label: proficient
  number: 4
bloom: understand
prerequisites:
  - phys.therm.thermodynamic-processes
mastery_threshold: 0.80
estimated_hours: 5
cross_links:
  - phys.therm.entropy
  - phys.therm.carnot-cycle
  - phys.therm.refrigerators
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY
```

---

## Component 1 — Narrative Spine

**Hook (S0 novice):** Heat always flows from hot to cold — never spontaneously from cold to hot. A dropped egg always breaks — never spontaneously reassembles. A gas released from a container spreads through the room — never spontaneously reconcentrates. These are not engineering limitations — they are statements of the second law of thermodynamics, the law that governs the direction of natural processes.

**Conceptual arc:**
1. Why the first law is insufficient: the first law (energy conservation) is satisfied by heat flowing from cold to hot, by broken eggs reassembling, by gas reconcentrating — none of these happen. A second principle is needed to specify which direction.
2. Clausius statement: "Heat cannot spontaneously flow from a colder body to a hotter body without external work."
3. Kelvin-Planck statement: "No heat engine operating in a cycle can convert all the heat absorbed into work." (Q_C > 0 always.)
4. Equivalence: Clausius and Kelvin-Planck statements are logically equivalent — if either is violated, the other is too.
5. Carnot's theorem: no heat engine operating between two given temperatures can be more efficient than a Carnot engine operating between the same temperatures. η_real ≤ η_Carnot = 1 − T_C/T_H.
6. Irreversibility: all real processes are irreversible — they proceed spontaneously in only one direction. Reversible process = idealisation (quasi-static, no friction, no heat across finite ΔT).
7. Arrow of time: the second law provides the only fundamental asymmetry between past and future in physics — it defines the direction of time in macroscopic systems.
8. Statistical interpretation (qualitative): the second law arises from the overwhelming number of disordered (high-entropy) states compared to ordered (low-entropy) states. A scrambled egg is one of a huge number of possible molecular arrangements; an unscrambled egg is one of very few — spontaneous reconstitution is not impossible, just fantastically improbable.

**Closing synthesis:** The second law is the most asymmetric fundamental law in physics — unlike Newton's laws, Maxwell's equations, and quantum mechanics, it explicitly breaks time-reversal symmetry. It explains why heat engines cannot be 100% efficient, why refrigerators need power input, and why the universe evolves from order to disorder. Its statistical interpretation (via entropy) connects macroscopic thermodynamics to the microscopic world of atomic randomness.

---

## Component 2 — Worked Examples

### WE-1 (Concrete — Clausius vs. Kelvin-Planck equivalence)

**Demonstrate the logical equivalence:** Suppose a device (Device A) violates the Clausius statement — it moves 100 J of heat from a cold reservoir (T_C = 300 K) to a hot reservoir (T_H = 600 K) with no work input. Combine it with a real heat engine (η = 40%) operating between the same reservoirs. Show this combination violates the Kelvin-Planck statement.

**Engine operating:** Q_H = 250 J; Q_C = 150 J; W_out = 100 J.
**Device A violates Clausius:** takes 150 J from cold reservoir to hot reservoir with no work.

**Net result:** hot reservoir: −250 + 150 = −100 J. Cold reservoir: −150 + 150 = 0 J. Work output = 100 J.

**Summary:** Net effect is that 100 J of heat (from the hot reservoir) converted entirely to work, with no cold-reservoir interaction. This is a perfect engine with 100% efficiency — violating Kelvin-Planck.

**Conclusion:** A Clausius violator + any real engine = Kelvin-Planck violator. The statements are equivalent.

---

### WE-2 (Bridging — Carnot's theorem)

**Prove** (by contradiction) that no engine can be more efficient than a Carnot engine between the same reservoirs.

**Suppose** an engine E has η_E > η_Carnot. Operate a Carnot refrigerator (reverse Carnot engine) using work from E. Arrange so W_Ref = W_E.

**Engine E:** absorbs Q_H', rejects Q_C' = Q_H'(1 − η_E); W_E = Q_H' × η_E.
**Carnot refrigerator:** uses W_Ref = W_E, moves Q_C'' from cold to hot, takes Q_H'' = W_Ref + Q_C'' from hot.

**Choose E and refrigerator to have same Q_H'' = Q_H':**
Refrigerator COP_Carnot = T_C/(T_H − T_C) → Q_C'' = W_Ref × T_C/(T_H − T_C).
If η_E > η_Carnot and Q_H' = Q_H'': then Q_C' < Q_C'' (engine rejects less than refrigerator moves).

**Net effect:** Q_C'' − Q_C' > 0 flows from cold to hot with no net work (W_E powers the refrigerator exactly). Clausius statement violated. Contradiction — no engine can exceed η_Carnot. ✓

---

### WE-3 (Abstract — statistical interpretation)

**Qualitative:** A box contains 4 gas molecules. In the natural state, all 4 are on the left side. Calculate the probability that all 4 spontaneously end up on the left after many bounces.

**Microstates:** Each molecule independently has a 1/2 probability of being on the left side at any instant. Probability all 4 are on the left simultaneously: (1/2)⁴ = 1/16 = 6.25%.

**Scale up to N = 10²³ molecules (real gas):**
Probability all in left half: (1/2)^(10²³) ≈ 10^(−3 × 10²²) — an incomprehensibly small number. This is effectively zero.

**Connection to entropy:** S = k_B ln Ω (Boltzmann's entropy formula), where Ω is the number of microstates. All-on-left has Ω = 1 (or a very small set). Evenly distributed has Ω = 2^N. ΔS = k_B ln(2^N) = Nk_B ln 2 > 0. Natural processes proceed from low-Ω (ordered) to high-Ω (disordered) states — increasing entropy.

**Answer:** Second law is not absolute prohibition but astronomically low probability of reversal — for macroscopic systems, effectively a law.

---

## Component 3 — Misconception Engine

### MC-SECOND-LAW-IS-JUST-FIRST-LAW-RESTATEMENT

**Trigger signal:** Student says "the second law just says you can't get more work out than heat in — that's just energy conservation (first law)."

**Conflict evidence [P28]:** "First law applied to: heat flows from cold metal (300 K) to hot metal (600 K), no work exchanged. Does energy conservation prohibit this? Does the first law say anything about which direction heat flows?"

*First law: Q_cold lost = Q_hot gained — energy conserved in either direction. First law does NOT determine direction. Second law is needed.*

**Bridge text [P30]:** "The first law says energy is conserved — it makes no statement about process direction. A perfectly energy-conserving process can still be forbidden by the second law: spontaneous cold-to-hot heat flow conserves energy perfectly. The second law adds the direction principle that the first law lacks."

**Replacement text [P31]:** "First law = 'how much' energy moves (conservation). Second law = 'which way' energy moves (direction and entropy). Together they form the complete framework. The second law rules out:
(a) spontaneous cold-to-hot heat flow (Clausius);
(b) complete conversion of heat to work in a cycle (Kelvin-Planck);
(c) any decrease in total entropy of an isolated system.
None of these is derivable from energy conservation alone."

**Discrimination pairs [P33]:**
- "A process: 200 J flows from 300 K metal to 600 K metal with no work. First law satisfied?" → Yes (energy conserved). Second law satisfied? → No (Clausius violation — cold to hot without work).
- "A 100% efficient heat engine: first law satisfied?" → Yes (Q_H all becomes W). Second law satisfied? → No (Kelvin-Planck violation).

**s6_path:** "First law: energy is conserved. Second law: entropy must increase. Two different constraints on different aspects of any process."

---

### MC-SECOND-LAW-ONLY-APPLIES-TO-HEAT

**Trigger signal:** Student says "the second law is just about heat engines — it doesn't apply to chemical reactions or biological systems."

**Conflict evidence [P28]:** "A biological cell creates ordered proteins from disordered amino acids. Does the cell violate the second law by creating order? What is the cell's energy source, and what does it release to the surroundings?"

*Cell metabolises glucose (energy input), releases heat and CO₂. Net entropy of system + surroundings increases. The local decrease in entropy (protein assembly) is paid for by greater entropy increase in surroundings.*

**Bridge text [P30]:** "The second law applies to the entire universe (system + surroundings). Locally, entropy can decrease — but only at the cost of greater entropy increase elsewhere. This is how refrigerators work (decreasing entropy of food at the cost of electrical work), how life maintains order (at the cost of metabolic heat), and how crystals form (at the cost of latent heat release)."

**Replacement text [P31]:** "Second law (full statement): the total entropy of an isolated system (or the universe) never decreases. ΔS_universe ≥ 0. Local entropy can decrease (e.g., inside a refrigerator, inside a living cell) if the surroundings gain at least as much entropy. The law applies to everything: heat engines, chemical reactions, phase transitions, biological systems, cosmology."

**Discrimination pairs [P33]:**
- "Ice forms in a freezer (disorder → order). Does this violate the second law?" → No — freezer ejects more entropy (as heat via condenser) than ice formation removes.
- "Can a 'Maxwell's demon' sort gas molecules without entropy cost?" → No — the demon must store information about molecule positions, and erasing that information generates entropy (Landauer's principle).

**s6_path:** "Second law = universe entropy never decreases. Local order is allowed — at the price of greater disorder elsewhere."

---

## Component 4 — Diagnostic Probe Set

**P4-a (prereq: thermodynamic processes):** What is the efficiency of a Carnot engine between T_H = 800 K and T_C = 400 K?
*η_Carnot = 1 − 400/800 = 50%.*

**P4-b (direction of processes):** Three processes: (i) heat flows hot→cold; (ii) gas expands into vacuum; (iii) two gases unmix spontaneously. Which violates the second law?
*Only (iii) violates the second law — unmixing is a spontaneous decrease in entropy without external work. (i) and (ii) are naturally occurring (entropy-increasing) processes.*

**P4-c (Clausius statement):** State the Clausius form of the second law in one sentence.
*"Heat cannot spontaneously flow from a colder body to a hotter body."*

**P4-d (Kelvin-Planck):** An inventor claims their engine (T_H = 500 K, T_C = 300 K) has η = 50%. Is this possible?
*η_Carnot = 1 − 300/500 = 40%. No — 50% > 40% violates the Kelvin-Planck statement.*

**P4-e (statistical):** A box contains 10 molecules. What is the probability that all 10 are in the left half simultaneously?
*(1/2)^10 = 1/1024 ≈ 0.098%.*

---

## Component 5 — Socratic Thread

**Turn 1 [P41 diagnostic]:** "Heat always flows from hot to cold. Why? Does the first law require this? What law does?"

*First law doesn't — second law does.*

**Turn 2 [P06 concrete anchor]:** "Clausius: heat can't flow spontaneously cold→hot. Kelvin-Planck: no 100% efficient cyclic engine. Are these two separate laws or the same law?"

*Logically equivalent — violating one allows you to violate the other.*

**Turn 3 [P28 conflict — MC-SECOND-LAW-IS-FIRST-LAW]:** "Cold-to-hot heat flow: does energy conservation forbid it? Compute energy balance."

*Energy balance: 200 J from cold = 200 J to hot. Conservation satisfied. Second law forbids it.*

**Turn 4 [P30 bridge]:** "First law = conservation (how much). Second law = direction (which way). Together they form the complete thermodynamic framework."

**Turn 5 [P51 check-in]:** "State both classical forms of the second law."

*Clausius: heat can't spontaneously flow cold→hot. Kelvin-Planck: cyclic engine can't be 100% efficient.*

**Turn 6 [P28 conflict — MC-SECOND-LAW-ONLY-APPLIES-TO-HEAT]:** "A cell assembles an ordered protein — local entropy decreases. Does this violate the second law?"

*No — cell also releases heat to surroundings; ΔS_universe > 0.*

**Turn 7 [P52 narrow]:** "ΔS_universe ≥ 0: for reversible process, ΔS = 0; for irreversible, ΔS > 0. What process has ΔS = 0?"

*Ideal reversible (Carnot) process. All real processes: ΔS > 0.*

**Turn 8 [P62 retrieval seed]:** "P4-d: engine claims η = 50% between 500 K and 300 K. Apply the Carnot test."

*η_Carnot = 40% < 50% claimed. Impossible — Kelvin-Planck violated.*

**Turn 9 [P36 mastery probe]:** "Explain, using WE-1 logic, why a device that violates Clausius also violates Kelvin-Planck. Don't reproduce the numbers — explain the structural argument."

*Clausius violator moves Q_C cold→hot for free. Combine with real engine: engine's Q_C rejection is cancelled by the violator's cold-to-hot transfer. Net: hot reservoir → work only. That's 100% efficiency. Kelvin-Planck violated.*

---

## Component 6 — Session Flow

```
[P01 open] → [P41 diagnostic: why hot→cold not cold→hot — first law insufficient] → [P06 anchor: Clausius and Kelvin-Planck as two statements]
→ [MC-SECOND-LAW-IS-FIRST-LAW: P28 conflict → P30 bridge → P31 replacement → P33 pairs]
→ [WE-1: Clausius/Kelvin-Planck equivalence proof]
→ [P51 check-in: two classical statements]
→ [WE-2: Carnot's theorem — proof by contradiction]
→ [MC-SECOND-LAW-ONLY-APPLIES-TO-HEAT: P28 conflict (biological cell) → P30 bridge → P31 → P33]
→ [P52 narrow: ΔS_universe ≥ 0 — reversible vs irreversible]
→ [P62 retrieval seed: P4-d Carnot bound check]
→ [WE-3: statistical interpretation — microstates and probability]
→ [P36 mastery probe: structural argument for Clausius → Kelvin-Planck]
→ [P89 retrieval schedule: Day 1, Day 4, Day 14]
→ [P91 mastery gate: 80% on P4-a through P4-e]
→ [P85 regulation tail]
→ [P68 close]
```

---

## Component 7 — Differentiation Variants

**S0 (novice):** Start with everyday examples of irreversibility (dropped egg, spilled milk). Establish Clausius statement as the physical law behind these observations. Skip WE-2 (formal proof) and WE-3 (statistical). Focus on P4-b (identifying which processes violate second law) and P4-c.

**S1 (knows "second law = entropy increases," no deeper understanding):** Push on: "What does entropy increase mean physically? Can entropy locally decrease?" Force the system + surroundings framing before accepting the glib "entropy always increases."

**S4 (prereq gap — thermodynamic processes weak):** Return to phys.therm.thermodynamic-processes. Carnot's theorem (WE-2) requires understanding reversible/irreversible processes; if these are not secure, the proof is inaccessible.

**S6 (math anxiety):** Focus on Clausius and Kelvin-Planck as verbal statements (P4-c). P4-a (Carnot efficiency — simple formula) and P4-d (comparison test) are the quantitative targets. Skip WE-2 (formal proof) and WE-3 (statistical derivation).

**S7 (overconfident):** Lead with WE-2 (Carnot's theorem proof by contradiction — requires careful setup of engine + refrigerator system). Then push WE-3: "For N = 10²³ molecules, calculate ΔS when gas doubles in volume." (ΔS = Nk_B ln2 = nR ln2 — connects statistical and thermodynamic entropy.)

---

## Component 8 — Retrieval Schedule

```yaml
retrieval_events:
  - offset_days: 1
    format: P4-a (Carnot η) + P4-c (Clausius statement)
  - offset_days: 4
    format: P4-b (process direction — which violates) + P4-d (Carnot bound check)
  - offset_days: 14
    format: P4-e (10-molecule probability) + "explain why a refrigerator doesn't violate the second law even though it makes things colder"
```

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly: phys.therm.second-law ✓
V-2  prerequisites listed in KG: phys.therm.thermodynamic-processes ✓
V-3  bloom verb matches level (understand): "explain … identify … state … justify" ✓
V-4  mastery_threshold = 0.80 ✓
V-5  session_cap present: 7 TAs ✓
V-6  cpa_entry_stage correct for difficulty 4: "C (anchor; difficulty 4 → C with accelerated P track)" ✓
V-7  Narrative Spine covers hook → arc → synthesis ✓
V-8  3 worked examples (Concrete / Bridging / Abstract) ✓
V-9  Misconception Engine: 2 MCs, each with all 6 fields ✓
V-10 Diagnostic Probe Set: 5 probes (P4-a to P4-e) ✓
V-11 Socratic Thread: 9 turns, correct Primitive codes ✓
V-12 Session Flow: linear sequence with all required Primitives ✓
V-13 Differentiation Variants: S0/S1/S4/S6/S7 covered ✓
V-14 Retrieval Schedule: 3 events at Day 1/4/14 ✓
V-15 All Primitive codes valid (P01 P06 P28 P30 P31 P33 P36 P41 P51 P52 P62 P68 P85 P89 P91) ✓
V-16 cross_links pedagogically justified: entropy, carnot-cycle, refrigerators ✓
V-17 difficulty number 4 consistent with bloom=understand and estimated_hours=5 ✓
V-18 domain "thermodynamics" matches concept_id prefix phys.therm ✓
V-19 No framework/runtime/route/schema modifications ✓
V-20 Status READY ✓
```
