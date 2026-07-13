# Electric Charge — `phys.em.electric-charge`

## Identity

- **Concept ID**: `phys.em.electric-charge`
- **Display name**: Electric Charge
- **Domain**: electromagnetism
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.75
- **Estimated hours**: 3
- **Requires**: `phys.meas.units`
- **Unlocks**: `phys.em.coulombs-law`, `phys.em.electric-current`
- **Load-bearing prerequisite content**:
  - From `phys.meas.units`: the coulomb (C) as a unit, scientific notation for very small quantities (elementary charge e = 1.6 × 10⁻¹⁹ C); the distinction between a quantity and its unit; signed quantities (charge can be positive or negative)

---

## Mental models (4-stage progression)

**Stage 1 — Beginner**: Everything is made of atoms. Atoms contain a positive nucleus and negative electrons surrounding it. When two objects are rubbed together, electrons can transfer from one to the other. The object that gains electrons becomes negatively charged; the one that loses electrons becomes positively charged. Like charges repel; unlike charges attract.

**Stage 2 — Intermediate**: Electric charge is a fundamental property of matter, measured in coulombs (C). Charge is quantised: it comes in integer multiples of the elementary charge e = 1.6 × 10⁻¹⁹ C. Charge is conserved: in any closed system, the total charge before equals the total charge after any process (charging by rubbing, conduction, or induction). The conventional current direction is defined as the direction of positive charge flow (even though electrons, carrying negative charge, actually flow in the opposite direction in metal conductors).

**Stage 3 — Advanced**: Charge is a Lorentz scalar — all observers agree on the total charge in a system regardless of relative motion. The Coulomb is defined via the elementary charge: 1 C is exactly 1/(1.602176634 × 10⁻¹⁹) elementary charges (SI 2019 redefinition). Polarisation occurs when external fields separate charge within a neutral object without net transfer: the object remains neutral overall but develops a dipole moment. Static induction allows a charged object to attract a neutral conductor.

**Stage 4 — Expert / University**: Charge is the conserved Noether charge corresponding to the U(1) gauge symmetry of electromagnetism. Fractional charges (quarks carry ±⅓e and ±⅔e) exist but are always confined within hadrons; the only observed free particles carry integer multiples of e. Renormalisation group flow changes the effective value of the electric charge at high energies (running coupling).

**Model versioning**: Stage 2 is the operative model for all secondary-level electrostatics and circuits. Stage 3 is needed before polarisation and induction are taught. Stage 4 is university quantum field theory.

---

## Why beginners fail

The dominant root cause is **sign confusion**: learners know that there are positive and negative charges, but when asked to track what happens to charge during a process — rubbing, grounding, induction — they lose the sign. The failure is not conceptual but arithmetic: they cannot keep track of which object gave up electrons and which received them, and they confuse "gaining electrons" (becoming negative) with "becoming positive."

The secondary root cause is **"electricity = electrons flowing out of a battery"**: learners build a model in which electricity is a substance (electrons) produced by the battery and consumed by the light bulb. This model fails when confronted with AC circuits (electrons oscillate), circuits with capacitors (charge accumulates), and conventional current direction (defined as positive charge flow, opposite to electron flow).

---

## Misconception library

**M1 — "Charging by rubbing creates charge from nothing"**
- Characteristic phrase: "Rubbing makes the electrons appear" or "The charge came from the rubbing."
- Probe: "When you rub a glass rod with silk, the glass becomes positive. Where does the charge on the glass come from?"
- Expected wrong answer: "The rubbing creates positive charge on the glass."
- Recovery: no charge is created. Electrons transfer from glass to silk. Glass loses electrons → becomes positive (net). Silk gains electrons → becomes negative (net). Total charge of the glass-rod + silk system is zero before and zero after. Conservation of charge is absolute.

**M2 — "Negative charge is the absence of positive charge"**
- Characteristic phrase: "There's no charge there — it's just negative" or "Negative means empty."
- Probe: "A balloon is rubbed and becomes negatively charged. What does it contain that makes it negative?"
- Expected wrong answer: "Negative charge is just missing positive charge; the balloon has less than normal."
- Recovery: negative charge is a real physical thing — electrons. The balloon has gained electrons (negative particles). It is not missing positive charges. Both positive charges (protons, in the nucleus) and negative charges (electrons, in/on the material) are real, distinct particles. The net charge is the algebraic sum.

**M3 — "Like charges attract when you bring two charged rods close"**
- Characteristic phrase: "Two positive rods will attract because they both want electrons."
- Probe: "Two rods, both positively charged, are brought near each other. What do they do?"
- Expected wrong answer: "They attract."
- Recovery: like charges repel; unlike charges attract. This is an empirical fact, confirmed by experiment. Two positive rods push each other apart. Physically: both rods have a deficit of electrons; the positive nuclear charges in each rod push against the positive nuclear charges in the other, resulting in repulsion. The intuition "wants electrons" is not a reliable guide; use the empirical rule.

**M4 — "Electrons flow from negative terminal to positive terminal of a battery, so conventional current goes the same way"**
- Characteristic phrase: "Current goes from minus to plus, same as electrons."
- Probe: "In a simple circuit, electrons flow from the negative terminal of the battery through the external circuit to the positive terminal. In which direction does the conventional current flow?"
- Expected wrong answer: "From negative to positive — the same direction as electrons."
- Recovery: conventional current is defined as the direction a positive charge would flow — it flows from the positive terminal through the external circuit to the negative terminal. Electrons flow in the opposite direction. This historical convention (established before the electron was discovered) is now fixed. In metal circuits, only electrons move; in other contexts (plasma, electrolytes) positive charges do move in the conventional current direction.

---

## Explanation library

**E1 — The atom as a charge accounting ledger**
Every atom starts neutral: the number of protons (positive, in the nucleus, fixed) equals the number of electrons (negative, in orbitals, can be removed or added). The atomic number Z is both the proton count and the normal electron count. If you remove one electron: net charge = +e. If you add two electrons: net charge = −2e. Charging is always about moving electrons, not protons (which are bound in the nucleus).

**E2 — Conservation of charge as accounting**
Before any charging process, write down the total charge of the system. After, write it again. They must be equal. "Glass rod (0) + silk (0) = 0 total. After rubbing: glass (+ne) + silk (−ne) = 0 total." This ledger approach catches every error: if the totals disagree, electrons were invented or destroyed, which is impossible.

**E3 — The electron flow vs. conventional current distinction**
"Franklin chose 'positive' for the type of charge that accumulated on his glass rod, before anyone knew about electrons. When electrons were discovered, they turned out to have negative charge — opposite to Franklin's convention. So the direction of electron flow in a wire is opposite to the conventional current direction. Both descriptions are valid; you just must be consistent about which one you are using."

---

## Analogy library

**Primary analogy — Charge as financial credit and debt**
Positive charge is like money (an excess of positive credits). Negative charge is like debt (an excess of negative). A neutral object has balanced books. Rubbing transfers credits from one object to another — one gets richer (positive), one gets more indebted (negative). The total money in the system (charge) is conserved: no rubbing process prints money or destroys it. Like-signed accounts (both in debt, both in credit) push each other away; unlike accounts (one rich, one in debt) attract each other.

**Breaking point**: The financial analogy breaks for quantisation: money is divisible to fractions, but charge comes in discrete units of e. Also, the analogy does not convey that electrons are physical particles that move, while "debt" is an abstraction.

**Anti-analogy — "Electricity is like water in a pipe"**
The water-in-pipe analogy is useful for circuits but harmful at the charge-concept stage. Water always flows in one direction and "carries" through the pipe; electrons do not carry a separate substance — they ARE the charge. Using the water analogy prematurely embeds M4 (directional confusion) and delays the understanding that both positive and negative charges are real.

---

## Demonstration library

**D1 — Van de Graaff generator hair demonstration**
A student places their hand on a Van de Graaff generator dome. Their hair stands on end. Each hair strand acquires the same sign charge; they repel each other and point away from the head. This demonstrates: (1) charge can be transferred, (2) like charges repel, (3) even very small forces are detectable when charges are macroscopically separated.

**D2 — Charged rod and neutral paper bits**
Rub a balloon or PVC rod with wool. Bring it near small torn bits of paper. The bits jump to the rod — attraction of a charged object to a neutral one. This demonstrates charge polarisation: the charged rod induces a separation of charge in the neutral paper; the near surface becomes oppositely charged and is attracted. This is not a violation of "like repels, unlike attracts" — the paper is not charged overall, but its charge distribution is distorted.

**D3 — Electroscope**
Bring a charged rod near (not touching) an electroscope: the leaves diverge (induction). Touch the rod to the electroscope: the leaves diverge more (conduction). Ground the electroscope while the rod is near: leaves collapse (electrons flow in or out). Remove rod: leaves diverge again with opposite sign (induction charging). This sequence demonstrates all three charging mechanisms in sequence.

---

## Discovery lesson

**Argue for direct instruction with discovery elements** (appropriate because the atomic model is not self-evident from observation):

The key empirical observations (like repels, unlike attracts; rubbing transfers charge) can be discovered from experiment with charged rods and the electroscope. Present: two rubbed rods of the same material — observe repulsion. Two rods of different materials — observe attraction (sometimes). From this: two types of charge; same type repels, different types attract. The conservation principle requires direct instruction: it is not observable from a single experiment that no charge is created, only transferred.

The naming convention (positive/negative, proton/electron) is purely historical and must be taught directly — there is no discoverable reason why the glass rod is called "positive."

---

## Teaching actions

**TA1 — Charge ledger for every problem**: For any problem involving charge transfer, require the learner to write total charge before and after the process as a ledger. Totals must match. This enforces conservation and catches sign errors.

**TA2 — Agent-recipient labelling for electron transfer**: When describing rubbing or conduction, require: "Which object loses electrons? Which gains electrons? What is the resulting sign of each?" Never accept "it becomes charged" without specifying the sign.

**TA3 — Conventional vs. electron current quiz**: Whenever "current" appears after this concept, ask: "Are we talking about conventional current or electron flow? Which direction?" This prevents M4 from becoming embedded.

**TA4 — Elementary charge unit check**: Whenever a charge in coulombs is given as a small number (e.g., −3.2 × 10⁻¹⁹ C), ask: "How many elementary charges is this?" (= 2). This connects the abstract unit to the particle count.

---

## Voice teaching

> "Everything starts neutral — equal protons and electrons. Charging is always about moving electrons, because protons are locked in the nucleus. If you pull electrons away from an object, it becomes positive. If you push extra electrons onto it, it becomes negative. The total count of charges — positive plus negative — across your whole system never changes. No rubbing creates charge; it only moves it."

> "Like charges repel; unlike attract. I know this sounds like a rule to memorise, but think about it physically: two objects both short on electrons are both 'wanting' electrons — they're competitors, not partners. Two objects where one has extra and one is short — they're complementary. This isn't a rule; it's the observed behaviour of charge, tested in every experiment."

> "Conventional current is a historical choice that cannot be changed now. Franklin declared the charge on glass to be positive in the 1700s. We now know electrons are negative and they flow from negative to positive through a wire. So conventional current — the direction we use in all circuit equations — flows from positive to negative. Electrons flow the other way. Both directions are real; they just describe different things. In the equations, always use conventional current unless a problem specifically asks for electron flow."

---

## Assessment

**Mastery gate**: The learner can (1) explain charge as a property of particles, not a substance; (2) apply conservation of charge to a charging-by-rubbing or conduction problem with correct signs; (3) state the elementary charge and use it to count charges; (4) distinguish conventional current direction from electron flow direction.

**Formative golden probe**
> "A neutral metal sphere A and a positively charged rod B are placed in contact momentarily, then separated. (a) What type of charge carriers move during contact? (b) In which direction do they move — from A to B or from B to A? (c) What is the sign of A's charge after separation? (d) Is the total charge of A + B before contact equal to the total charge after contact? (e) If A now has charge +3.2 × 10⁻¹⁹ C, how many elementary charges is that?"

- (a)–(c): targets M1 and M2 (electrons are the mobile carriers; they move from A to B since B is positive and attracts them; A becomes positive)
- (d): conservation check
- (e): links coulombs to elementary charge count

**Confidence calibration question**
After (b): "How confident are you about which direction the electrons move?" (1–5). Incorrect direction answers with high confidence indicate M1 or M2 is deeply embedded.

**Delayed retrieval check (48 h / 7 days)**
"A glass rod rubbed with silk becomes positively charged. (a) What happens to the electrons during rubbing? (b) What is the charge of the silk? (c) If the glass rod has a charge of +8 × 10⁻¹⁹ C, how many electrons were transferred?" (Tests conservation and elementary charge.)

---

## Recovery notes

**Failure mode A — Sign confusion in charging problems**
Return to the charge ledger (TA1). Write every step: "Before: glass = 0, silk = 0. Electrons move from glass to silk. After: glass has lost electrons → positive. Silk has gained electrons → negative." Enforce the ledger until sign tracking is automatic.

**Failure mode B — M2 persists ("negative = missing positive")**
Ask: "What is an electron? Is it a real particle?" Confirm: yes, electrons are real, measurable particles with mass and charge. "So negative charge is electrons — an excess of real particles with negative charge, not a deficit of positive ones." Distinguish: the nucleus has protons (positive), the electron cloud has electrons (negative). A negatively charged object has more electrons than protons. Count the excess.

**Failure mode C — Conventional current confusion**
Draw the circuit. Label: "Electrons flow this way (arrow)." Write "Conventional current flows this way (opposite arrow)." Show that all circuit equations (Ohm's law, Kirchhoff's laws) use conventional current. "In this course, unless the problem says 'electron flow,' use conventional current — the direction a positive charge would move."

---

## Memory & review

**Memory type**: Concept (charge as property, conservation) + fact (like/unlike, e = 1.6 × 10⁻¹⁹ C) + procedure (charge ledger, sign tracking).

**Spaced retrieval schedule**: Day 1, Day 3, Day 7, Day 21.

**Retrieval prompts**:
- "What is the elementary charge in coulombs?"
- "A neutral rod is rubbed and becomes negatively charged. What happened to the electrons?"
- "What is the total charge of a system before and after a charging process?"
- "In a metal wire, which particles actually move? In which direction does the conventional current flow?"

**Interleaving**: After mastery, interleave charge problems with Coulomb's law problems (upcoming) and circuit problems (current) so the learner retrieves the charge concept in its application contexts.

---

## Transfer map

**Immediate transfers**:
- `phys.em.coulombs-law`: force between two charges requires the sign and magnitude of each charge; conservation and quantisation are used to determine charge quantities
- `phys.em.electric-current`: current = charge per unit time (I = dQ/dt); the charge concept is the foundation of all circuit quantities

**Downstream transfers**:
- `phys.em.electric-field`: the electric field is defined in terms of the force per unit charge on a test charge
- `phys.em.electric-potential`: potential energy per unit charge — requires fluency with the charge concept
- `phys.em.capacitance`: charge storage — requires understanding charge accumulation and sign

**Cross-subject transfers**:
- `chem` — ionic bonding (charge transfer between atoms), electrolysis (charge carries current in solution), oxidation states (electrons gained/lost)
- Biology — nerve impulse transmission (ion movement creates charge separation across membranes); resting potential, action potential

---

## Curriculum feedback

The KG description correctly identifies quantisation and conservation as the two defining properties. The two unlocks (Coulomb's law, electric current) are the correct immediate applications.

One gap: `phys.em.electric-field` is not listed as unlocked here, even though the electric field is the direct consequence of the existence of charge. The teaching sequence logically goes: charge → Coulomb's law → electric field. Consider whether `phys.em.electric-field` should be added as a transitive unlock or whether `phys.em.coulombs-law` is an acceptable intermediate.

The KG does not mention the distinction between conductors and insulators — a concept that belongs here (it determines which materials allow charge to flow) but may be assigned its own node. If no separate node exists, consider noting that conductors/insulators should be introduced in this concept entry's first treatment.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
