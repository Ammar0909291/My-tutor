# phys.em.magnetic-materials — Dia-, Para-, and Ferromagnetism

## 1. Identity

| Field | Value |
|---|---|
| **Concept ID** | `phys.em.magnetic-materials` |
| **Display name** | Dia-, Para-, and Ferromagnetism |
| **KG requires** | `phys.em.magnetic-field` |
| **KG unlocks** | `phys.em.magnetic-dipole` |
| **Difficulty** | proficient |
| **Bloom level** | understand |
| **Mastery threshold** | 0.75 |
| **Estimated hours** | 4 |
| **KG description** | Materials are classified as diamagnetic, paramagnetic, or ferromagnetic based on their response to external magnetic fields. |

---

## 2. Mental Models

### Stage 1 — Intuitive (no formalism)

Every atom is a tiny magnet because electrons orbit nuclei and spin on their own axes. In most materials these tiny magnets point in random directions and cancel out — the material looks non-magnetic. An external field is like a teacher calling a class to face forward: some students snap to attention (paramagnetic), some swing partly around against the tide (diamagnetic), and a few lock arms with neighbours and stay facing forward even after the teacher leaves (ferromagnetic).

### Stage 2 — Quantitative entry

The key quantity is **magnetic susceptibility χ**:

**B**_inside = μ₀(1 + χ)**H** = μᵣμ₀**H**

where μᵣ = 1 + χ is the **relative permeability**.

| Class | χ | μᵣ | Example |
|---|---|---|---|
| Diamagnetic | −10⁻⁵ to −10⁻⁶ (small, negative) | slightly < 1 | copper, water, bismuth |
| Paramagnetic | +10⁻⁵ to +10⁻³ (small, positive) | slightly > 1 | aluminium, oxygen, platinum |
| Ferromagnetic | +10² to +10⁵ (large, positive) | ≫ 1 | iron, nickel, cobalt |

### Stage 3 — Microscopic mechanism

**Diamagnetism** — present in ALL materials, usually swamped by other effects. An external **B** induces orbital currents (Lenz's law at the atomic scale) that oppose the applied field. Net effect: the material is *weakly repelled*. No permanent dipoles involved — effect disappears when field is removed.

**Paramagnetism** — atoms have permanent magnetic dipole moments (from unpaired electron spins). Without a field these are thermally randomised. An applied field partially aligns them, producing a weak *attraction*. Alignment competes with thermal agitation → **Curie's law**: χ = C/T. Remove the field, thermal randomisation wins immediately — no remnant magnetisation.

**Ferromagnetism** — permanent dipoles exist AND neighbouring atoms couple quantum mechanically via **exchange interaction**, creating **magnetic domains** (microscopic regions, ~10⁻⁴–10⁻¹ m) where all dipoles are parallel. In an unmagnetised sample, domains point in random directions. An external field grows and aligns favourable domains via two mechanisms: *domain wall motion* (low field) and *domain rotation* (high field). The **hysteresis loop** (B vs. H) summarises the history-dependent response: **remnant field B_r** (field remaining after H returns to zero) and **coercive field H_c** (reverse field needed to demagnetise). Above the **Curie temperature T_C** (1043 K for iron), thermal energy destroys domain order — ferromagnetism collapses to paramagnetism.

### Stage 4 — Model versioning

The three-category scheme is a mean-field approximation. Full picture adds: antiferromagnetism (neighbouring dipoles anti-parallel, no net moment — MnO, NiO), ferrimagnetism (anti-parallel but unequal moments — magnetite Fe₃O₄), and metamagnetism (field-induced first-order transitions). Hysteresis is a mesoscopic, not atomic, phenomenon — domain wall pinning at defects determines H_c. Quantum treatment requires exchange integrals and band theory; classical orbit models are placeholders only.

---

## 3. Why Beginners Fail

1. **Category conflation** — learners merge diamagnetic and paramagnetic under "non-magnetic" and treat ferromagnetic as the only meaningful class, missing that every material has a susceptibility.
2. **Direction confusion** — paramagnets are attracted; diamagnets are repelled. Beginners expect all materials near a magnet to be attracted, so diamagnetic repulsion seems impossible or exotic.
3. **Permanence misconception** — learners expect all magnetised materials to stay magnetised. The Curie law destruction of paramagnetism, and the remnant-field concept for ferromagnets, are both non-obvious.
4. **Mechanism abstraction failure** — the word "domain" is used without spatial reality. Learners cannot distinguish a domain from an atom, preventing correct application of the hysteresis concept.

---

## 4. Misconception Library

### M1 — "All materials are either magnetic or non-magnetic"

**Probe**: "A piece of copper is placed near a strong magnet. What happens?"  
**Characteristic phrase**: "Copper is non-magnetic, so nothing happens."  
**What's wrong**: Copper is diamagnetic — it is weakly repelled. The binary framing erases diamagnetism entirely.  
**Recovery**: Demonstrate superconductor (perfect diamagnet) levitation, then scale down to bismuth levitation over a strong magnet. Show that "non-magnetic" really means "magnetically weak," not "magnetically neutral." Introduce susceptibility as a continuous variable.

### M2 — "Paramagnets stay magnetised when the field is removed"

**Probe**: "An aluminium rod is placed inside a solenoid and the current is switched off. Is the rod now a permanent magnet?"  
**Characteristic phrase**: "It should stay magnetised because the field aligned the atoms."  
**What's wrong**: Thermal energy randomises paramagnetic dipoles the instant the external field is removed — no remnant magnetisation. Only ferromagnets retain B_r.  
**Recovery**: Use Curie's law (χ = C/T): high temperature weakens alignment. At room temperature, kT ≫ μB for most paramagnets → alignment is tiny even with the field present, let alone after removal.

### M3 — "Ferromagnetic materials are always permanently magnetised"

**Probe**: "You heat an iron nail above 1043 K and let it cool in a field-free environment. Is it now a permanent magnet?"  
**Characteristic phrase**: "Iron is always magnetic."  
**What's wrong**: (a) Heating above T_C destroys ferromagnetism; (b) cooling in zero field re-forms domains in random directions → zero net magnetisation. The material is ferromagnetic (capable of being magnetised) but not magnetised (not currently so).  
**Recovery**: Distinguish the property (ferromagnetism) from the state (magnetised). Introduce the distinction between B_r (material property from hysteresis) and current magnetisation (history-dependent state).

### M4 — "The three classes are equally common and equally important"

**Probe**: "If I grab ten random materials from a lab bench, how many would you expect to be ferromagnetic?"  
**Characteristic phrase**: "Maybe three or four, since there are three types."  
**What's wrong**: Only three elements are ferromagnetic at room temperature (Fe, Ni, Co) and a handful of alloys/compounds. The vast majority of materials are diamagnetic or paramagnetic. Ferromagnetism is technologically dominant but physically rare.  
**Recovery**: Map the periodic table: most elements are diamagnetic or weakly paramagnetic; ferromagnetism occurs only when the exchange interaction energy exceeds kT, which requires the narrow d-band of the 3d transition metals under specific filling.

---

## 5. Explanation Library

### Explanation A — Susceptibility as a response coefficient

A material's magnetic response is characterised by how much internal magnetisation **M** it develops per unit applied field **H**: **M** = χ**H**. Total **B** inside = μ₀(**H** + **M**) = μ₀(1 + χ)**H**. This single number χ classifies all three types: negative (dia), small positive (para), large positive (ferro). The classification is not binary — it is a continuous spectrum with ferromagnets at the extreme end.

### Explanation B — Hysteresis loop and its engineering parameters

Plot B (y-axis) vs. H (x-axis) as H cycles from +H_max to −H_max and back. The loop does not retrace itself — B lags H. Key parameters:
- **Saturation B_s**: maximum B achievable (all domains aligned)
- **Remnant field B_r**: B when H returns to zero (read-out state for magnetic recording)
- **Coercive field H_c**: magnitude of reverse H needed to drive B to zero

*Hard* magnetic materials (permanent magnets): large H_c, large B_r — domains hard to move.  
*Soft* magnetic materials (transformer cores): small H_c, small B_r — domains easy to move, low hysteresis loss per cycle.

### Explanation C — Temperature dependence

Paramagnetism: χ_para = C/T (Curie's law). Cooling concentrates the alignment; heating randomises it. At room temperature, χ_para ~ 10⁻³ even at saturation; practical effect negligible.

Ferromagnetism: below T_C, exchange interaction dominates kT — domain order stable. Above T_C, kT wins — collapses to paramagnetism. For iron: T_C = 1043 K; for nickel: 627 K; for cobalt: 1388 K.

---

## 6. Analogy Library

### Primary analogy — The classroom and the teacher

Imagine each atom is a student holding a compass needle (their magnetic dipole). In a diamagnetic classroom: students face random directions, and when the teacher shouts "face the board," they instinctively back away slightly. In a paramagnetic classroom: students have their own preferred directions but weakly turn toward the board when told; when the teacher leaves, they drift back. In a ferromagnetic classroom: students lock arms with their neighbours and turn together as a group — entire rows (domains) rotate at once; even when the teacher leaves, the social pressure of arm-locking keeps many rows facing the original direction.

**Breaking point**: the analogy hides the quantum mechanical origin of domain coupling. "Arm-locking" suggests a mechanical contact force; the real exchange interaction is a quantum overlap of electron wavefunctions — it can be antiferromagnetic (arms push away, anti-parallel alignment) as well as ferromagnetic. The analogy also fails to capture hysteresis: once students let go and re-form, there is no memory of the previous arrangement.

### Anti-analogy — "Magnetism is like gravity"

Students sometimes reason: "stronger magnet → stronger attraction, just like heavier mass → more gravity." This fails because diamagnets are *repelled*, not attracted, and because susceptibility is a material property unrelated to an object's mass. Unlike gravity, the magnetic response can be positive, negative, or field-history-dependent. Never use gravitational analogies for susceptibility reasoning.

---

## 7. Demonstration Library

### Demo A — Bismuth repulsion (diamagnetism visible)

**Setup**: Hang a small bismuth cylinder from a thread between the poles of a strong neodymium magnet (or electromagnet).  
**Observation**: The bismuth is *repelled* — it swings to the side or sits at a clearly off-centre equilibrium between the poles.  
**Why it works**: Bismuth has one of the largest diamagnetic susceptibilities of any element (χ ≈ −1.7 × 10⁻⁴). The induced opposing magnetisation is just large enough to be visible.  
**Contrast**: Replace bismuth with aluminium → weakly attracted (paramagnetic). Replace with iron → strongly attracted (ferromagnetic). Three materials, three behaviours, same magnet.

### Demo B — Hysteresis with a nail and coil

**Setup**: Wind 100 turns of insulated wire around an iron nail. Connect to a DC supply with a reversible switch. Place a small compass near the nail.  
**Procedure**: (1) Switch on current — compass deflects (nail magnetised). (2) Switch off — compass stays deflected (remnant field B_r). (3) Reverse current gradually — compass first returns to zero, then deflects the other way (coercive field H_c passed).  
**Teaching target**: B_r is visible as the residual deflection; H_c is the current value at zero deflection. Cycling the current traces the hysteresis loop in real time.

### Demo C — Curie point (ferromagnetic → paramagnetic transition)

**Setup**: Hang a piece of iron or nickel wire from one end of a balance, with a strong magnet below the other end (holding it down). Heat the metal with a Bunsen burner.  
**Observation**: As the metal reaches T_C, it stops being attracted — the magnet end rises and the balance tips.  
**Teaching target**: Ferromagnetism is a phase transition, not a permanent property. Above T_C, the material becomes paramagnetic: susceptibility drops by four orders of magnitude.

---

## 8. Discovery Lesson

### Stance: Argue the inductive case — *observe first, classify second*

**Why inductive here**: The three-category classification is non-obvious from everyday experience (most familiar magnetic effects are ferromagnetic). A direct-instruction opening ("there are three types") would give learners labels before phenomena. Observation-first creates genuine puzzlement — particularly around the *repulsion* of diamagnets — that makes the classification feel earned rather than arbitrary.

**Opening question**: "I have four objects: a copper coin, an aluminium rod, an iron nail, and a bismuth cylinder. Before I bring a strong magnet near each one, predict what will happen — attract, repel, or nothing?"

**Sequence**:
1. Learners predict (almost all will say "attract or nothing").
2. Bring magnet near each — iron obviously attracted, others seem inert at first.
3. Use a more sensitive setup (thread suspension) to show aluminium is *very slightly* attracted and bismuth is *slightly repelled*. Ask: "How can the same magnet attract one and repel the other?"
4. Introduce susceptibility χ as the classifier, not a binary property. Show the three-row table of χ values.
5. Reveal the microscopic story: domain structure for iron (big effect), thermal randomisation for aluminium (small positive effect), induced opposing currents for copper/bismuth (tiny negative effect).
6. Closure: What question does the hysteresis loop answer? Have learners sketch what they expect B vs. H to look like if the material "remembers" — then reveal the actual loop.

**Direct instruction argument**: If the topic were introduced as taxonomy first, learners would memorise the table without building any model of *why* responses differ. The inductive path is worth the extra time because the central mystery (diamagnetic repulsion) cannot be guessed from everyday experience.

---

## 9. Teaching Actions

| Prior state | Action |
|---|---|
| Learner conflates dia/para as "non-magnetic" | Demo A (bismuth repulsion) → introduce χ as a signed number |
| Learner thinks paramagnets stay magnetised | Curie's law calculation at room temperature: μB ≪ kT → < 0.1% alignment |
| Learner cannot distinguish "ferromagnetic" from "magnetised" | Demo B (hysteresis nail) + Demo C (Curie point) in sequence |
| Learner cannot use the hysteresis loop | Give a blank H-axis, have learner place B_r and H_c from a verbal description, then compare to a real loop |
| Learner asks "why does exchange interaction happen?" | Acknowledge this is quantum mechanics (overlapping wavefunctions, Pauli exclusion + Coulomb energy competition). State the classical domain picture is sufficient at this level — the exchange integral produces domain order, which is what the hysteresis loop describes. |

---

## 10. Voice Teaching

### Opening (curiosity spike)
"Here is a piece of bismuth. And here is a very strong magnet. I'm going to bring them together — and the bismuth is going to *move away* from the magnet. Watch."

### Core explanation (susceptibility)
"Every material responds to a magnetic field — the question is just *how much* and in *which direction*. We measure that with a number called susceptibility, χ. Negative χ: the material makes its own field opposing the applied one — it's pushed away. Small positive χ: tiny attraction, disappears when you remove the field. Large positive χ: the material contains magnetic domains and can stay magnetised on its own. Iron is the third type. Bismuth is the first."

### Misconception interrupt
"Here's the trap: you might think 'copper is non-magnetic, so nothing happens.' That's almost right — copper is *very weakly* diamagnetic. The number is so small you need a delicate experiment to see it. But 'nothing happens' and 'pushed away slightly' are categorically different. One is zero; the other is negative."

### Closing (transfer hook)
"Ferromagnetic hysteresis is why hard drives work: write a '1' by magnetising a domain; the domain stays magnetised (remnant field B_r) when the write head moves away. The coercive field H_c is how hard it is to flip that bit — you want it large enough that accidental fields don't erase your data, but not so large the write head can't flip it deliberately."

---

## 11. Assessment

### Mastery gate

The learner can:
1. Predict the sign of force (attract/repel/negligible) for a given material and justify using χ.
2. Identify B_r and H_c on a hysteresis loop diagram and state their physical meaning.
3. Explain why a paramagnetic material shows no remnant field after the external field is removed.
4. State what happens to a ferromagnet heated above its Curie temperature.

### Formative golden probe

> "An oxygen molecule is paramagnetic (χ > 0). A hydrogen molecule is diamagnetic (χ < 0). If both are placed in a non-uniform magnetic field, in which direction does each move?"

*Correct response*: Oxygen moves toward the stronger-field region (attracted); hydrogen moves toward the weaker-field region (repelled). (Non-uniform field creates a force on dipoles: **F** = ∇(**m**·**B**); positive χ → **m** parallel to **B** → force toward strong field; negative χ → **m** anti-parallel → force away.)  
*Likely error*: Saying hydrogen "does nothing." Flag this as the diamagnetic-invisibility misconception (M1).

### Confidence calibration

After the golden probe, ask: "How confident are you in that answer — 0%, 50%, or 100%?" Then reveal the answer. Learners who say 100% and are wrong have uncalibrated overconfidence about magnetic force direction — they are pattern-matching "oxygen is important in biology → must be strongly magnetic." Assign a follow-up calculation: compute the actual force on an oxygen molecule in a 1 T/m field gradient at room temperature (use Langevin paramagnetism; result is ~10⁻²⁸ N — negligible mechanically, but measurable with a Gouy balance).

### Delayed retrieval check (next session opener)

"What is the difference between a ferromagnet and a paramagnet in terms of what happens after the external field is turned off?"

Expected: Ferromagnet retains B_r; paramagnet returns to zero. If the learner says "both return to zero" — reteach the domain/hysteresis section. If the learner says "both stay magnetised" — reteach Curie's law and thermal randomisation.

---

## 12. Recovery Notes

**Recovery sequence for persistent domain/hysteresis confusion**:
1. Start with a single domain (one arrow). External H flips it above H_c. Below H_c it stays. That is the one-domain hysteresis loop (a rectangle). Draw it.
2. A real material has millions of domains with different orientations and different coercive fields. The smooth S-shaped loop is the average of millions of rectangular loops. Draw the overlay.
3. Now B_r and H_c are visible as statistical quantities, not arbitrary parameters.
4. If the learner still cannot apply: run Demo B and have the learner annotate the compass deflection against the current — map deflection angle to B_r and H_c directly.

**Recovery sequence for dia/para confusion**:
1. Remind the learner that *both* effects are real but tiny compared with ferromagnetism — that is why they are hard to observe in everyday life.
2. The sign difference comes from mechanism: diamagnetism is always opposing (Lenz's law analog at atomic scale); paramagnetism is always aligning. They coexist — diamagnetism is *always* present but usually swamped by paramagnetism or ferromagnetism.
3. Use a Venn diagram: "diamagnetic effect" is a circle inside the full set; "paramagnetic effect" is a different, non-overlapping circle; ferromagnetism is a third (and usually much larger) circle. Many materials only have the diamagnetic circle.

---

## 13. Memory & Review

**Memory type**: Categorical + relational (three-way classification with quantitative anchor)

**Encoding hooks**:
- **DIA**: *D*iamagnets *D*efy the field (repulsion mnemonic)
- **PARA**: *P*aramagnets *P*artly align (temporary, weak)
- **FERRO**: *F*erromagnets *F*reeze their alignment in domains (history-dependent)
- χ sign rule: negative = opposes = repels; positive = aligns; large = remembers

**Spaced retrieval schedule**:
- Session +1: "Name one example of each magnetic class. Which is repelled?"
- Week 1: "Sketch a hysteresis loop. Mark B_r and H_c."
- Week 3: "Why does paramagnetism weaken as temperature increases?"
- Month 2: "You need a material for a transformer core. Should χ be large or small? Should H_c be large or small? Why?"

**Interleave with**: `phys.em.magnetic-field` (field concept prerequisite), `phys.em.magnetic-dipole` (the atomic moment underpinning all three classes)

---

## 14. Transfer Map

| Target concept | Bridge |
|---|---|
| `phys.em.magnetic-dipole` | Atomic magnetic dipole moment is the microscopic origin of χ in all three classes |
| `phys.em.faradays-law` | Electromagnetic induction in transformer cores depends on soft-ferromagnet properties (low H_c for low hysteresis loss) |
| Engineering — data storage | Hard magnetic materials (large H_c): bits written by field, retained by coercivity |
| Engineering — motors/generators | Soft magnetic materials (low H_c): cores cycle B without losing energy to hysteresis |
| Medicine — MRI | Contrast agents (gadolinium) are paramagnetic; ferromagnetic nanoparticles used in hyperthermia cancer therapy |
| Chemistry — molecular magnetism | Unpaired electrons in transition-metal complexes determine paramagnetic or diamagnetic character — ESR/NMR interpretations |
| Quantum mechanics | Exchange interaction origin of ferromagnetism; Bohr magneton as unit of atomic moment |

---

## 15. Curriculum Feedback

**KG note**: The prerequisite `phys.em.magnetic-field` is sufficient — no quantum mechanics is assumed. The concept lives comfortably at the proficient level. `phys.em.magnetic-dipole` is the correct downstream unlock: the atomic dipole *is* the microscopic element of susceptibility, and understanding its torque and precession deepens every mechanism in this entry.

**Authoring note**: The three-class scheme should be introduced with explicit χ values (signed, orders of magnitude) as early as possible. The word "non-magnetic" should be retired at this level — every material has a susceptibility. The Curie point demonstration (Demo C) is the single most memorable teaching moment in this concept: it makes the phase-transition nature of ferromagnetism physically unmistakable.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
