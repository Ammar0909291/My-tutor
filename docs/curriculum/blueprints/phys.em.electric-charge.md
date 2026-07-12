# Teaching Blueprint — phys.em.electric-charge

## Component 0 — Concept Identity & Metadata

```yaml
concept_id: phys.em.electric-charge
name: Electric Charge
domain: electromagnetism
difficulty:
  label: developing
  number: 3
bloom: understand
prerequisites:
  - phys.meas.units
mastery_threshold: 0.80
estimated_hours: 3
cross_links:
  - phys.em.coulombs-law
  - phys.em.electric-current
  - phys.em.electric-field
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 3 → C with full CPA track)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Tier)

### Tier 1 — Concrete / Intuitive (S0)

Rub a balloon on your hair — the balloon sticks to the wall. Shuffle across a carpet and touch a doorknob — you get a spark. These phenomena happen because of **electric charge**, a fundamental property of matter. There are two types: positive (like the charge on a proton) and negative (like the charge on an electron). Opposite charges attract; like charges repel. Charge is conserved — you can move it, but you cannot create or destroy it. The unit of charge is the coulomb (C), and the smallest free charge in nature is the electron: e = 1.602 × 10⁻¹⁹ C.

### Tier 2 — Conceptual / Mechanistic (S1)

**Charge types and quantisation:**
- All ordinary charge comes from protons (+e) and electrons (−e).
- Charge is quantised: Q = ne, where n is an integer and e = 1.602 × 10⁻¹⁹ C.
- Macroscopic charge involves enormous numbers of elementary charges (1 C ≈ 6.24 × 10¹⁸ electrons).

**Conservation of charge:**
In any isolated system, the total charge is constant. When you rub a balloon on hair, electrons transfer from hair to balloon — the balloon becomes negative, hair becomes positive, total remains zero. No net charge was created.

**Conductors and insulators:**
- Conductors (metals): electrons move freely → charge distributes rapidly over the surface.
- Insulators (rubber, glass): electrons are bound → charge stays where placed.
- Semiconductors: intermediate, tunable by doping.

**Charging methods:**
1. **Friction:** electrons transferred between dissimilar materials (triboelectric effect).
2. **Conduction:** direct contact with a charged object → charge shares.
3. **Induction:** charged object brought near conductor → charge redistribution without contact; grounding removes one sign → object becomes charged opposite to inducer.

**Coulomb's law preview:**
The force between charges is proportional to the product of their charges and inversely proportional to the square of the distance. (Full development in phys.em.coulombs-law.)

### Tier 3 — Formal / Atomic

**Charge quantisation (Millikan 1909):** Oil drop experiment confirmed Q = ne. Quarks carry fractional charge (±e/3, ±2e/3) but are permanently confined in hadrons — no free fractional charge observable.

**Charge density:**
- Linear: λ (C/m)
- Surface: σ (C/m²)
- Volume: ρ (C/m³)
- Total: Q = ∫ρ dV

**Conservation law (local form):**
$$\frac{\partial \rho}{\partial t} + \nabla \cdot \mathbf{J} = 0$$
(Continuity equation — charge neither created nor destroyed at any point; current J = charge flow.)

**Triboelectric series:** materials listed from most positive (tends to give up electrons: rabbit fur, glass, nylon) to most negative (tends to gain electrons: Teflon, silicon, polyester). Contact between materials far apart on the series produces larger charge transfer.

---

## Component 2 — Worked Examples

### WE-1 (Foundational — quantisation)

**Problem:** A conducting sphere has a charge of −4.80 × 10⁻¹⁸ C. How many excess electrons does it contain?

**Worked solution:**

*Step 1 — Use quantisation Q = ne:*
$$n = \frac{|Q|}{e} = \frac{4.80 \times 10^{-18}\text{ C}}{1.602 \times 10^{-19}\text{ C/electron}} = 30.0$$

*Step 2 — Interpret sign:*
Negative charge means excess electrons (not protons). The sphere has 30 excess electrons.

**Answer:** 30 excess electrons

---

### WE-2 (Conservation — charge accounting)

**Problem:** An electrically neutral rubber rod is rubbed with fur. The rod acquires a charge of −6.4 × 10⁻¹⁸ C. (a) What charge does the fur acquire? (b) How many electrons transferred?

**Worked solution:**

*Step 1 — Conservation of charge:*
Initial total charge: 0 (both neutral).
Final: Q_rod + Q_fur = 0
Q_fur = −Q_rod = +6.4 × 10⁻¹⁸ C

*Step 2 — Number of electrons transferred:*
$$n = \frac{6.4 \times 10^{-18}}{1.602 \times 10^{-19}} = 40 \text{ electrons}$$

Electrons moved FROM fur TO rod (making rod negative, fur positive).

**Answer:** Q_fur = +6.4 × 10⁻¹⁸ C; 40 electrons transferred from fur to rod.

---

### WE-3 (Induction — conceptual)

**Problem:** A positively charged rod is brought near (but does not touch) an isolated metal sphere resting on an insulating stand. Describe the charge distribution on the sphere, and explain what happens when the sphere is grounded (briefly) while the rod is still nearby.

**Worked solution:**

*Step 1 — Induction without grounding:*
The positive rod repels free protons (but protons are fixed) and attracts free electrons. Electrons migrate to the near side → near side becomes negative, far side becomes positive. Net charge of sphere = 0 still.

*Step 2 — While grounded:*
Electrons flow from ground (Earth) to the far side of the sphere (attracted by the positive rod), neutralising the far-side deficit. Sphere now has net negative charge.

*Step 3 — After grounding removed, then rod removed:*
Excess electrons spread uniformly over sphere surface. Sphere has net negative charge equal to the electrons that entered from ground. Opposite to the inducing charge (positive rod) — this is induction charging.

**Answer:** Without grounding: redistribution, net Q = 0. With grounding and then removal: sphere becomes net negative (induced charge opposite to rod).

---

## Component 3 — Misconception Profiles

### MC-CHARGE-IS-CREATED-BY-RUBBING

**Trigger signal:** Student says "rubbing creates charge" or "friction makes electric charge appear."

**Conflict evidence [P28]:** "Before rubbing: the rubber rod and the fur are both electrically neutral — they contain equal numbers of protons and electrons. After rubbing: count the charges on both objects together. Rod: −40e. Fur: +40e. Total: 0. The same number of electrons as before, just redistributed. Conservation of charge is absolute — no physical process creates or destroys net charge."

**Bridge text [P30]:** "Rubbing brings surfaces into intimate contact, allowing electrons (which are loosely bound in some materials) to transfer. The total charge of the system is conserved; you are redistributing charge, not creating it. The triboelectric effect describes which material tends to gain vs. lose electrons."

**Replacement text [P31]:** "Rubbing does not create charge. It transfers electrons from one material to another, making one object negative (gained electrons) and the other positive (lost electrons). The total charge of the system (both objects together) remains zero — conservation of charge is a fundamental law."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "Rubbing transfers electrons from fur to rod" | "Rubbing creates negative charge on the rod" |
| "Q_rod + Q_fur = 0 before and after rubbing" | "The rod gains new charge by rubbing" |
| "Total charge of isolated system is conserved" | "Friction generates charge from mechanical energy" |

**s6_path:** Use accounting language: "charge bookkeeping — every electron that appears somewhere must have come from somewhere."

---

### MC-POSITIVE-CHARGE-MEANS-PROTONS-MOVE

**Trigger signal:** Student says "positive charge flows in the direction of current" implies protons are moving, or assumes positive charges physically travel in metals.

**Conflict evidence [P28]:** "In metals, only electrons are free to move — protons are fixed in the crystal lattice. A 'positive' current direction is a historical convention (Benjamin Franklin's choice) that assumes positive carriers. In metals, electrons move in the direction opposite to conventional current. The physical motion is always electrons (or ions in solutions)."

**Bridge text [P30]:** "Conventional current flows + → − (outside the battery), and this convention works perfectly for circuit analysis. But the actual charge carriers in metallic conductors are electrons moving in the opposite direction. The convention predates the discovery of the electron — it's a useful fiction for circuit math."

**Replacement text [P31]:** "In metallic conductors, only electrons move. Conventional current direction (positive to negative) is a historical convention — the physical current is electrons flowing the other way. In electrolytes (salt solutions), both positive and negative ions move. Only in semiconductors can 'holes' (absence of electrons) act as positive carriers."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "Electrons are the charge carriers in metals" | "Protons flow in the direction of conventional current" |
| "Conventional current and electron flow are in opposite directions" | "Conventional current correctly shows which particles move" |
| "In electrolytes, positive ions move toward the negative terminal" | "Positive charge carriers move in all conductors" |

**s6_path:** Historical context: Franklin chose the wrong sign, but the convention stuck. The physics is consistent either way — just know which direction actual electrons go.

---

## Component 4 — Practice Set

### P4-a (Retrieval — fundamental facts)
State: (a) the two types of electric charge, (b) the unit and symbol of charge, (c) the elementary charge value, (d) the conservation law for charge.

**Answer key:**
(a) Positive and negative
(b) Coulomb, C
(c) e = 1.602 × 10⁻¹⁹ C
(d) The total electric charge of an isolated system is constant (cannot be created or destroyed)

---

### P4-b (Quantisation — calculation)
A charged oil drop carries a charge of +3.204 × 10⁻¹⁸ C. How many elementary charges is this?

**Answer key:** n = Q/e = 3.204 × 10⁻¹⁸ / 1.602 × 10⁻¹⁹ = **20** (20 missing electrons, i.e., 20 proton-charges excess)

---

### P4-c (Conservation — two-body problem)
Two identical conducting spheres, A (charge +8 μC) and B (charge −2 μC), are touched together and then separated. What is the final charge on each?

**Answer key:** Total Q = +8 + (−2) = +6 μC. After contact, charge distributes equally (identical spheres): Q_A = Q_B = +3 μC each.

---

### P4-d (Induction — conceptual)
A negatively charged rod is held near (not touching) one end of a neutral metal rod resting on insulators. (a) Which end of the metal rod becomes positive? (b) If the far end is briefly grounded, what happens? (c) After the ground is removed and then the rod removed, what is the net charge?

**Answer key:**
(a) The far end becomes positive (electrons repelled to near end by negative rod → far end electron-depleted → positive)
(b) Electrons flow from ground into the near end (attracted by the negative rod's influence), increasing the negative charge on the near side; positive charge on far end is reduced.
Wait — let me re-analyse: The negative rod pushes electrons away (to the far end). Far end accumulates negative charge, near end is positive. Grounding the far end: electrons flow out to ground (because far end is negative relative to ground). Far end becomes less negative → essentially neutral or positive. After removing ground, then rod: near end was positive, some electrons left via grounding. Net charge = positive (electrons left the system to ground).

**Corrected answer key:**
(a) Near end is positive (electrons repelled to far end)
(b) Electrons flow from far end to ground (far end is negative → electrons leave to neutral ground)
(c) Net charge on the rod is **positive** (opposite to the inducing negative rod)

---

### P4-e (Analysis — conductor vs. insulator)
A small paper piece is attracted to a charged balloon. The paper is a neutral insulator. Explain how this is possible.

**Answer key:** The charged balloon (say, negative) polarises the paper — it induces a charge separation: the positive side of paper molecules is pulled toward the balloon, negative side pushed away. The near surface of the paper is effectively positive. Since the attractive force (near) is stronger than the repulsive force (far, larger distance), there is a net attraction. This is electrostatic induction in insulators (polarisation), not free charge movement.

---

## Component 5 — Lesson Composition Grammar

```
[P01: session-open]
  → [P62: retrieval-seed] — "What happens when you rub a balloon on your hair? What is doing the 'electrical' thing?"
  → [P06: concrete-anchor] — "Triboelectric demo: rod + fur. Before: total charge = 0. After: rod = −40e, fur = +40e. Total = 0."
  → [P41: diagnostic] — check if student knows charge is conserved (not created)
  → [P51: check-in]

[P28: conflict-evidence] × 2 misconceptions (MC-CHARGE-IS-CREATED-BY-RUBBING, MC-POSITIVE-CHARGE-MEANS-PROTONS-MOVE)
  → [P30: bridge-text] for each
  → [P31: replacement-text] for each
  → [P33: discrimination-pairs] for each

[P06: concrete-anchor] — WE-1 (quantisation: count electrons from Q)
  → [P06: concrete-anchor] — WE-2 (conservation: charge accounting after rubbing)
  → [P52: narrow] — "In each example, verify: total charge before = total charge after."
  → [P06: concrete-anchor] — WE-3 (induction: charged rod + sphere + grounding)

[P36: mastery-probe] — P4-c (two-sphere contact) + P4-e (paper attraction)
  → if < 80%: re-address conservation and induction
  → if ≥ 80%: advance

[P51: check-in]
[P91: mastery-gate] — threshold 0.80
[P85: regulation-tail]
[P89: retrieval-schedule] — spacing: +1 day, +3 days, +7 days, +21 days
[P68: close]
```

---

## Component 6 — Assessment Items (Mastery Probes)

### AP-1 (Bloom: Remember)
What is the charge on one electron? On one proton? Are these exact negatives of each other?

**Answer:** Electron: −e = −1.602 × 10⁻¹⁹ C. Proton: +e = +1.602 × 10⁻¹⁹ C. Yes, they are equal and opposite to extraordinary precision (experimental bound: |q_e + q_p| < 10⁻²¹ e).

---

### AP-2 (Bloom: Understand)
Explain why charging by induction produces a charge opposite to the inducing charge, while charging by conduction produces a charge of the same sign.

**Answer:** Induction: the charged object attracts opposite charges to the near side of a conductor. When grounded, opposite charges enter from ground (or same-sign charges leave to ground). After grounding and rod removal, the net charge is opposite to the inducer. Conduction: direct contact allows charge to flow between objects — some of the inducer's charge transfers directly, leaving both with the same sign.

---

### AP-3 (Bloom: Apply)
Three identical spheres have charges +12 nC, −6 nC, and +3 nC. They are all brought into contact simultaneously, then separated. What is the final charge on each sphere?

**Answer:** Total Q = 12 − 6 + 3 = +9 nC. Divided equally: each sphere = +9/3 = **+3 nC**.

---

### AP-4 (Bloom: Analyze)
A student claims to have isolated a particle with charge +0.5e. Is this consistent with the Standard Model? Explain using charge quantisation.

**Answer:** Fractional charges (like quarks: +2e/3, −e/3) exist within hadrons but are permanently confined — no free fractional charge has ever been observed. A free particle with charge +0.5e would violate charge quantisation. The claim is inconsistent with established physics and would require extraordinary evidence.

---

## Component 7 — Retrieval Spacing Schedule

| Interval | Recommended activity |
|---|---|
| +1 day | State conservation law; calculate n from Q = ne |
| +3 days | Charge accounting: two objects rubbed, find charge on each |
| +7 days | Describe induction charging step-by-step; contrast with conduction |
| +21 days | Mixed: quantisation + conservation + induction in one scenario |

---

## Component 8 — Prerequisite & Unlock Map

**Prerequisite concepts (must be ≥ 0.80 mastery before this lesson):**
- `phys.meas.units` — SI units, scientific notation, fundamental constants

**Unlocked by this concept (becomes accessible after ≥ 0.80 mastery here):**
- `phys.em.coulombs-law` — force between charges
- `phys.em.electric-current` — charge flow per unit time

**Cross-domain links:**
- `phys.em.electric-field` — field produced by charge distribution
- `phys.mod.atomic-structure` — nuclear charge, electron configuration

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | domain derived correctly (phys.em→electromagnetism) | PASS |
| V-3 | difficulty number = 3 (developing), bloom = understand | PASS |
| V-4 | prerequisites listed in KG | PASS |
| V-5 | mastery_threshold = 0.80 | PASS |
| V-6 | estimated_hours = 3 | PASS |
| V-7 | cpa_entry_stage correct for difficulty 3 | PASS |
| V-8 | session_cap set | PASS |
| V-9 | Three explanation tiers present | PASS |
| V-10 | At least 2 worked examples with full solutions | PASS |
| V-11 | Exactly 2 misconception profiles | PASS |
| V-12 | Each MC has all 6 fields | PASS |
| V-13 | Practice set ≥ 5 items spanning Bloom levels | PASS |
| V-14 | Lesson grammar uses valid Primitive codes | PASS |
| V-15 | At least 4 assessment items with answers | PASS |
| V-16 | Retrieval spacing schedule present | PASS |
| V-17 | Prerequisite map and unlock map consistent with KG | PASS |
| V-18 | No implementation code or schema changes | PASS |
| V-19 | No modifications to Educational Brain, Primitive Library, or Spec | PASS |
| V-20 | status = READY | PASS |

**Blueprint status: PACKAGE_READY — all V-1..V-20 PASS**
