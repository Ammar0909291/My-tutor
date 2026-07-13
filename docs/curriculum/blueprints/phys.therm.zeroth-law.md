# Teaching Blueprint — phys.therm.zeroth-law

## Component 0 — Concept Identity

```yaml
concept_id: phys.therm.zeroth-law
name: Zeroth Law of Thermodynamics
domain: thermodynamics
difficulty:
  label: developing
  number: 3
bloom: understand
prerequisites:
  - phys.therm.temperature
mastery_threshold: 0.80
estimated_hours: 2
cross_links:
  - phys.therm.ideal-gas-law
  - phys.therm.heat-transfer
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 3 → C with full CPA track)
status: READY
```

---

## Component 1 — Narrative Spine

**Hook (S0 novice):** You calibrate a thermometer by placing it in ice water (0°C) and boiling water (100°C). Then you use that thermometer to measure an unknown sample. You trust that if the thermometer reads the same value for two objects, those two objects are at the same temperature. But WHY is that trust justified? What physical principle says that "same thermometer reading" means "same temperature"?

**Conceptual arc:**
1. Operational definition of thermal equilibrium: two objects are in thermal equilibrium when no heat flows between them on contact.
2. The Zeroth Law (formal statement): if object A is in thermal equilibrium with object C, and object B is in thermal equilibrium with object C, then A is in thermal equilibrium with B.
3. Symbolic: A↔C and B↔C → A↔B. (↔ = "in thermal equilibrium with")
4. Why "zeroth"? The first and second laws were formulated first. When physicists realised this more fundamental principle had been assumed implicitly in all thermometry, they retroactively named it "zeroth" to preserve the existing numbering.
5. Thermometer as "object C": the thermometer (C) reaches equilibrium with body A → same temperature. Then the same thermometer reaches equilibrium with body B → same temperature. Zeroth law guarantees A and B are at the same temperature.
6. Temperature as an equivalence class: the Zeroth Law partitions all physical objects into equivalence classes of "same temperature." Temperature is the label for each class.
7. Consequence: temperature is a transitive, symmetric, and reflexive relation — the mathematical properties of an equivalence relation.
8. Practical implication: thermometry works. Without the Zeroth Law, there would be no logical basis for using any thermometer to compare temperatures of two different objects.

**Closing synthesis:** The Zeroth Law is the logical foundation of thermometry. It is so obvious that it went unstated for decades — yet without it, the concept of "temperature" collapses. The law says that temperature is a consistent, transitive property: if A = C and B = C (in temperature) then A = B. This transitivity is what makes a thermometer trustworthy.

---

## Component 2 — Worked Examples

### WE-1 (Concrete — applying the law)

**Scenario:** Three metal blocks A, B, C are placed in contact with a thermometer one at a time. Block A gives a reading of 47°C; block B gives 47°C; block C gives 63°C.

(a) Are A and B in thermal equilibrium with each other?
(b) If A and C are brought into contact, which way does heat flow?
(c) After A and C reach equilibrium, what is the final temperature (assume equal heat capacities and equal masses)?

**(a):** By the Zeroth Law, A is in equilibrium with the thermometer at 47°C, and B is in equilibrium with the thermometer at 47°C. Therefore A is in equilibrium with B — no heat flows if they are brought into contact. ✓

**(b):** A is at 47°C, C is at 63°C. Heat flows from C (higher T) to A (lower T).

**(c):** For equal masses m and equal heat capacity c: Q_lost = Q_gained.
mc(63 − T_f) = mc(T_f − 47) → 63 − T_f = T_f − 47 → T_f = (63 + 47)/2 = 55°C.

**Answer:** (a) Yes — in equilibrium. (b) C → A. (c) T_f = 55°C.

---

### WE-2 (Bridging — thermometer reliability)

**Scenario:** A student argues: "My thermometer reads 25°C for glass of water, and 25°C for a metal bar. But maybe the glass of water and metal bar are at different temperatures — perhaps my thermometer just responds the same way to two different things."

**Challenge:** Use the Zeroth Law to explain why this reasoning is incorrect, and what physical test would resolve any remaining doubt.

**Explanation:** When the thermometer is in thermal equilibrium with the water (reading 25°C), no heat flows between thermometer and water — they are at the same temperature by the definition of thermal equilibrium. Similarly for the metal bar. The Zeroth Law then guarantees water and bar are in equilibrium with each other, hence the same temperature.

**Empirical test:** Remove the thermometer. Place the water glass and metal bar in direct thermal contact. Wait for steady state. If no heat flows (temperature doesn't change), the Zeroth Law is confirmed. In practice, any sensitive temperature probe would show zero temperature difference after equilibration.

**Answer:** The Zeroth Law is precisely the physical principle ruling out the student's scenario. Thermal equilibrium with the same thermometer → thermal equilibrium with each other.

---

### WE-3 (Abstract — equivalence relation)

**Show** that "is in thermal equilibrium with" defines an equivalence relation on the set of all physical objects.

**Three properties required:**

**Reflexive:** Is every object in thermal equilibrium with itself? Yes — an isolated object has no net heat flow to itself. ✓

**Symmetric:** If A is in thermal equilibrium with B, is B in thermal equilibrium with A? Yes — thermal equilibrium means zero net heat flow in either direction; the relationship is symmetric by definition. ✓

**Transitive:** If A ↔ C and B ↔ C, is A ↔ B? This is exactly the Zeroth Law — it provides transitivity. ✓

**Conclusion:** "Is in thermal equilibrium with" is an equivalence relation. It partitions all objects into equivalence classes, each class characterized by a single real number: the temperature. Temperature is therefore a well-defined quantity whose existence is guaranteed by the Zeroth Law.

---

## Component 3 — Misconception Engine

### MC-ZEROTH-LAW-TRIVIAL

**Trigger signal:** Student says "of course if A = B and A = C then B = C — that's just math, not physics."

**Conflict evidence [P28]:** "Is this always true for physical properties? Block A is the same colour as paint sample C; paint sample C matches colour of object B. Does it follow that A and B are the same colour? Now consider: Object A has the same pressure as fluid C; fluid C has the same pressure as object B. Does it follow that A and B are in pressure equilibrium? What about electrical potential? Can you think of a physical property where this transitivity FAILS?"

*Colour: not necessarily (metamerism — two objects match a reference under one light but not under another). Pressure equilibrium: can fail in complex connected systems. The transitivity of thermal equilibrium is a non-trivial empirical fact, not a logical necessity.*

**Bridge text [P30]:** "The Zeroth Law is empirical — it is a physical law, not a logical truth. It has been tested millions of times through thermometry and has always held. But in principle, temperature could have been a non-transitive property of matter (imagine a material where A ↔ C and B ↔ C but A and B exchanged heat when brought together). The fact that this never happens is what makes thermometry possible."

**Replacement text [P31]:** "The Zeroth Law makes a testable, falsifiable claim about the physical world: thermal equilibrium is transitive. If you ever found two objects that individually equilibrated with the same thermometer but exchanged heat when brought together, the Zeroth Law would be violated. It has never been violated. Its non-triviality is why it earns the status of a law of physics."

**Discrimination pairs [P33]:**
- "Two colour samples match a reference under sunlight. Are they the same colour under fluorescent light?" → Not necessarily (metamerism). Colour matching is not transitive. Temperature is — the Zeroth Law asserts this.
- "Can you state the Zeroth Law's content in one sentence without using the word 'temperature'?" → "If two objects are each in thermal equilibrium with a third object, they are in thermal equilibrium with each other." Temperature is then defined as the common property.

**s6_path:** "The law is simple to state but profound in content — it says that the physical world permits a consistent, transitive temperature scale to exist."

---

### MC-THERMAL-EQUILIBRIUM-IS-SAME-TEMPERATURE-TRIVIALLY

**Trigger signal:** Student says "thermal equilibrium just means same temperature — it's circular, not a useful definition."

**Conflict evidence [P28]:** "Define 'same temperature' without using the concept of temperature. How do you know two objects are at the same temperature without measuring temperature first? What operational test can you perform using only heat flow observations?"

*You can observe whether heat flows between two objects in contact. If no heat flows, they are in thermal equilibrium. This is empirically testable without presupposing any temperature concept.*

**Bridge text [P30]:** "Thermal equilibrium (defined operationally: no net heat flow on contact) is the primitive concept. Temperature is the derived concept — it is the property that two objects share when they are in thermal equilibrium. The Zeroth Law then guarantees that this property is consistent and transitive. The logical order is: heat flow observation → equilibrium definition → temperature concept, not the other way around."

**Replacement text [P31]:** "The correct logical chain: (1) We observe that some pairs of objects in contact exchange heat (disequilibrium), and others do not (equilibrium). (2) We define 'thermal equilibrium' as the no-heat-flow state — this is a direct physical observation. (3) The Zeroth Law tells us this relation is transitive. (4) We then define 'temperature' as the label for each equivalence class. Temperature is not assumed — it is derived from the observable fact of heat flow."

**Discrimination pairs [P33]:**
- "Without any thermometer, how could you determine experimentally that two objects are at the same temperature?" → Bring them into contact; observe (over sufficient time) whether any heat flows. If not, they are in equilibrium.
- "Does the Zeroth Law say anything about what temperature IS, or only about when two temperatures are EQUAL?" → Only about when they are equal (transitivity of equilibrium). The Zeroth Law doesn't define the Kelvin scale or any numerical value — those require additional conventions (like fixing the triple point of water).

**s6_path:** "Thermal equilibrium is the observation; temperature is the name we give to the property that objects share when in equilibrium."

---

## Component 4 — Diagnostic Probe Set

**P4-a (prereq check):** Two objects at the same temperature: which way does heat flow when they are brought into contact?
*No heat flows — they are in thermal equilibrium.*

**P4-b (law application):** Object X is in thermal equilibrium with Object Y. Object Z is also in thermal equilibrium with Object Y. What does the Zeroth Law tell you about X and Z?
*X and Z are in thermal equilibrium with each other.*

**P4-c (thermometer justification):** A thermometer reads 37°C for patient A and 37°C for patient B. The Zeroth Law justifies concluding what?
*Patients A and B are at the same temperature — in thermal equilibrium with each other (though not literally in contact).*

**P4-d (why "zeroth"):** Why was this law called "zeroth" rather than given the next available number?
*It was recognized after the 1st and 2nd laws were named, but is more fundamental (logically precedes them). Named "zeroth" to preserve the existing numbering system.*

**P4-e (equivalence class):** State the three properties that "is in thermal equilibrium with" satisfies, and identify which one the Zeroth Law specifically provides.
*Reflexive (trivially), symmetric (by definition of equilibrium), transitive (← this is what the Zeroth Law provides).*

---

## Component 5 — Socratic Thread

**Turn 1 [P41 diagnostic]:** "You dip a thermometer into two different cups of water and get the same reading for both. Do you trust that the two cups are at the same temperature? What justifies that trust?"

*Expected: "Yes, because the thermometer reads the same." Push further: what physical principle justifies this?*

**Turn 2 [P06 concrete anchor]:** "Define 'thermal equilibrium' without using the word 'temperature.' What would you observe physically?"

*No net heat flow between objects in contact.*

**Turn 3 [P30 bridge]:** "If cup A is in thermal equilibrium with the thermometer, and cup B is also in thermal equilibrium with the thermometer — is it guaranteed that A and B are in equilibrium with each other?"

*This is the Zeroth Law — yes, empirically, always.*

**Turn 4 [P28 conflict — MC-ZEROTH-LAW-TRIVIAL]:** "Is this a logical necessity? Give a counterexample where a similar 'if A=C and B=C then A=B' structure fails for another physical property."

*Colour metamerism — same match under one illuminant, different under another. Shows the Zeroth Law is empirical, not logical.*

**Turn 5 [P51 check-in]:** "So the Zeroth Law makes temperature a well-defined, consistent property. In math terms, what kind of relation does this make 'thermal equilibrium'?"

*An equivalence relation — reflexive, symmetric, transitive.*

**Turn 6 [P52 narrow]:** "What does the Zeroth Law specifically provide that reflexivity and symmetry don't? Name it."

*Transitivity — and that's what allows a thermometer to compare any two objects.*

**Turn 7 [P28 conflict — MC-THERMAL-EQUILIBRIUM-TRIVIALLY-CIRCULAR]:** "Student says: 'thermal equilibrium just means same temperature.' What's wrong with that as a definition?"

*It's circular. The correct order: heat flow observation → equilibrium → temperature. Not the reverse.*

**Turn 8 [P62 retrieval seed]:** "State the Zeroth Law in one sentence without using the word 'temperature.' Then explain what temperature IS given that statement."

*"If A is in thermal equilibrium with C, and B is in thermal equilibrium with C, then A is in thermal equilibrium with B." Temperature = the label for the equivalence class of mutually equilibrated objects.*

**Turn 9 [P36 mastery probe]:** "Three rods X, Y, Z are manufactured. X and Y are brought into contact — no heat flows. Y and Z are brought into contact — heat flows from Y to Z. What can you conclude about temperatures T_X, T_Y, T_Z, and what happens when X and Z are brought into contact?"

*Y and Z not in equilibrium: T_Y > T_Z (heat flows Y→Z). X and Y ARE in equilibrium: T_X = T_Y. By Zeroth Law? No — we need transitivity: T_X = T_Y and T_Y > T_Z → T_X > T_Z. When X and Z contact, heat flows X → Z.*

---

## Component 6 — Session Flow

```
[P01 open] → [P41 diagnostic: thermometer trust question] → [P06 anchor: thermal equilibrium without "temperature"]
→ [P30 bridge: Zeroth Law statement]
→ [MC-ZEROTH-LAW-TRIVIAL: P28 conflict (colour metamerism) → P31 replacement → P33 pairs]
→ [WE-1: three blocks scenario — applying the law]
→ [P51 check-in]
→ [P52 narrow: transitivity = the specific contribution of the Zeroth Law]
→ [MC-THERMAL-EQUILIBRIUM-TRIVIALLY-CIRCULAR: P28 → P30 → P31 → P33]
→ [WE-2: thermometer reliability challenge and resolution]
→ [P62 retrieval seed: law stated without "temperature"]
→ [WE-3: equivalence relation proof]
→ [P36 mastery probe: X/Y/Z rod scenario]
→ [P89 retrieval schedule: Day 1, Day 4, Day 14]
→ [P91 mastery gate: 80% on P4-a through P4-e]
→ [P85 regulation tail]
→ [P68 close]
```

---

## Component 7 — Differentiation Variants

**S0 (novice):** Start with the thermometer scenario: why do you trust a thermometer? Build the Zeroth Law from the physical intuition of "thermometer as a common reference." Skip WE-3 (abstract equivalence relation).

**S1 (knows the law's name, no depth):** Ask "state the Zeroth Law without using 'temperature'" — most S1 students cannot. This gap drives the session. Then WE-3 to formalise.

**S4 (prereq gap — temperature weak):** Return to phys.therm.temperature. P4-a reveals the gap: if the student doesn't know that same temperature ↔ no heat flow, the operational definition of equilibrium is inaccessible.

**S6 (math anxiety):** Emphasise physical story and avoid equivalence relation formalism. WE-1 (numerical three-block scenario) is the core. P4-a through P4-d are sufficient for mastery.

**S7 (overconfident):** Lead with P4-e (three properties — which does the Zeroth Law provide?) and WE-3 (equivalence relation proof). Challenge them to produce the counterexample in MC-ZEROTH-LAW-TRIVIAL before presenting it.

---

## Component 8 — Retrieval Schedule

```yaml
retrieval_events:
  - offset_days: 1
    format: P4-a (heat flow at same T) + P4-b (law application)
  - offset_days: 4
    format: P4-c (thermometer justification) + P4-d (why "zeroth")
  - offset_days: 14
    format: P4-e (three properties — which one is the Zeroth Law?) + "state the law without the word temperature, then define temperature from that statement"
```

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly: phys.therm.zeroth-law ✓
V-2  prerequisites listed in KG: phys.therm.temperature ✓
V-3  bloom verb matches level (understand): "explain … justify … identify … state" ✓
V-4  mastery_threshold = 0.80 ✓
V-5  session_cap present: 7 TAs ✓
V-6  cpa_entry_stage correct for difficulty 3: "C (anchor; difficulty 3 → C with full CPA track)" ✓
V-7  Narrative Spine covers hook → arc → synthesis ✓
V-8  3 worked examples (Concrete / Bridging / Abstract) ✓
V-9  Misconception Engine: 2 MCs, each with all 6 fields ✓
V-10 Diagnostic Probe Set: 5 probes (P4-a to P4-e) ✓
V-11 Socratic Thread: 9 turns, correct Primitive codes ✓
V-12 Session Flow: linear sequence with all required Primitives ✓
V-13 Differentiation Variants: S0/S1/S4/S6/S7 covered ✓
V-14 Retrieval Schedule: 3 events at Day 1/4/14 ✓
V-15 All Primitive codes valid (P01 P06 P28 P30 P31 P33 P36 P41 P51 P52 P62 P68 P85 P89 P91) ✓
V-16 cross_links pedagogically justified: ideal-gas-law, heat-transfer ✓
V-17 difficulty number 3 consistent with bloom=understand and estimated_hours=2 ✓
V-18 domain "thermodynamics" matches concept_id prefix phys.therm ✓
V-19 No framework/runtime/route/schema modifications ✓
V-20 Status READY ✓
```
