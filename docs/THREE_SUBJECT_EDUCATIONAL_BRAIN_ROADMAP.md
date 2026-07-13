# THREE-SUBJECT EDUCATIONAL BRAIN ROADMAP

**Version:** 1.0.0  
**Date:** 2026-07-11  
**Scope:** Mathematics · Physics · English (canonical launch subjects)  
**Status:** CANONICAL — supersedes all prior multi-subject planning documents

---

## GOVERNING PRINCIPLE

The Educational Brain is NOT an AI tutor. It is the world's most structured knowledge base of HOW TO TEACH every important concept to every kind of learner. The AI is NOT the moat. The Educational Brain IS the moat. The long-term objective is to reduce AI reasoning over time, not increase it. Every asset must eventually function as a complete teaching protocol capable of replacing an expert teacher through deterministic Teaching Actions.

**The Educational Brain does NOT store explanations. It stores HOW TO TEACH.**

Chemistry, Biology, and Computer Science are future expansion subjects. They do not exist in v1. All planning, allocation, and strategy in this document treats the canonical platform as exactly three subjects: Mathematics (908 concepts), Physics (194 concepts), English (216 concepts) — 1,318 concepts total.

---

## SECTION 1: EXECUTIVE SUMMARY

### The Problem This Document Solves

Every previous planning document in this repository treated six subjects as the launch scope. That framing created planning pressure toward breadth — spreading the limited authoring capacity across 1,712 concepts in six subjects, diluting depth in all of them. This document corrects that framing permanently.

The canonical launch scope is 1,318 concepts across three subjects. This is not a reduction — it is a strategic focus that makes depth possible. The Educational Brain grows its moat not by covering more concepts but by covering fewer concepts more thoroughly.

### The Core Strategy in Five Sentences

The Educational Brain's value is depth of Teaching Intelligence, not breadth of curriculum coverage. A single concept with 8 teaching protocols, 36 Teaching Actions, and 6 misconception engines is worth more than 36 concepts with one paragraph each. The three-subject scope allows the Educational Brain to reach Teaching Protocol depth for the highest-value concepts before expansion. Expansion to Chemistry, Biology, and CS happens only after the Teaching Intelligence model is proven in three subjects. Proof means: a student encountering the Educational Brain for the first time learns a concept more effectively than they would from any textbook, video, or generic AI tutor.

### Summary of Deliverables This Document Defines

| Deliverable | Timeline | Target |
|---|---|---|
| Teaching Protocol: 50 priority concepts | Months 1–6 | Full 8-protocol depth per concept |
| Teaching Primitive Library | Month 1 | 91 primitives specified |
| Composition Grammar | Month 1 | 10 hard rules codified |
| Evidence Engine integration spec | Month 2 | Per-action outcome tracking |
| Phase 1 Brain (foundational layer) | Month 4 | 20 Math + 15 Physics + 15 English |
| Phase 2 Brain (core expansion) | Month 6 | Full 50 concepts at full depth |
| Phase 3 Brain (long-tail coverage) | Month 12+ | Top 200 concepts |

---

## SECTION 2: CORRECTED ROI ANALYSIS

### Why ROI Must Be Computed on Three Subjects Only

ROI in the Educational Brain is not about covering more students or more topics. It is about teaching impact per hour of authoring. A Teaching Protocol that enables 10,000 students to truly understand a concept is worth more than 100 protocols that produce superficial comprehension in 100 students each.

ROI = (concepts_unblocked × students_affected × depth_of_teaching_improvement) / authoring_hours

### The Four ROI Multipliers

**Multiplier 1: Transitive Reach**  
A concept's transitive descendants (TD) is the count of concepts that depend on it directly or transitively. A Teaching Protocol for a concept with TD=907 means every downstream concept benefits from correct foundational understanding. This is the compounding effect — understanding one root concept correctly compounds across the entire subject.

**Multiplier 2: In-Degree (Convergence)**  
A concept's in-degree is the count of concepts that directly name it as a prerequisite. High in-degree concepts are prerequisite convergence points — every student who misunderstands them carries that misunderstanding into multiple downstream learning paths simultaneously. A misconception engine for a high-in-degree concept is therefore a multi-path failure prevention asset.

**Multiplier 3: Cross-Subject Transfer**  
Some concepts appear structurally in more than one subject. A Teaching Protocol for mathematical functions benefits physics students encountering wave functions, field equations, and transfer functions. A Teaching Protocol for probability benefits physics students in quantum mechanics and thermodynamics. Cross-subject primitives multiply ROI beyond the host subject.

**Multiplier 4: Student Volume**  
Foundational concepts are encountered by every student. Advanced concepts are encountered by a fraction. A Teaching Protocol for arithmetic fractions will serve every student who ever opens the platform. A Teaching Protocol for algebraic topology will serve doctoral students only.

### ROI Tier Definitions

**Tier A (Maximum ROI):** TD ≥ 100 AND (in-degree ≥ 8 OR cross-subject use confirmed). Author to full 8-protocol depth. Every authoring hour here creates compounding returns across the entire subject graph.

**Tier B (High ROI):** TD ≥ 50 OR in-degree ≥ 5. Author to 4-protocol minimum. Full depth added in Phase 2.

**Tier C (Standard ROI):** TD ≥ 10 OR in-degree ≥ 2. Author to 2-protocol minimum. Long-tail coverage in Phase 3.

**Tier D (Specialty ROI):** TD < 10 AND in-degree < 2. Author only after Tiers A–C are complete in their subject. Do not prioritise in v1.

### Failure Prevention Estimate (Revised for Three Subjects)

Based on KG centrality analysis: the top 20 concepts by combined TD + in-degree score account for approximately 65–75% of all prerequisite-gap failures across the three subjects. This estimate is based on the structure of the KGs, not on observed student data (Evidence Engine will provide real data after launch).

**Revised estimate (3-subject scope):**  
- Top 5 concepts: prevent ~35% of prerequisite-gap failures  
- Top 20 concepts: prevent ~65% of prerequisite-gap failures  
- Top 50 concepts: prevent ~85% of prerequisite-gap failures  
- Top 200 concepts: prevent ~97% of prerequisite-gap failures  

The 3% tail represents highly specialised concepts where prerequisite gaps are rare by definition.

---

## SECTION 3: TOP 50 CONCEPTS — THREE SUBJECTS ONLY

All concepts ranked by composite ROI score: (transitive_descendants × 0.5) + (in_degree × 50) + (cross_subject_multiplier × 100). The cross-subject multiplier is 1 for concepts used structurally in another canonical subject, 0 otherwise.

### Mathematics — Priority Concepts

KG: 908 concepts. Foundation domain anchors all downstream mathematics.

| Rank | Concept ID | TD | In° | Cross-Subject | Protocol Priority |
|---|---|---|---|---|---|
| M01 | math.func.function-concept | 100s | 19 | Physics (wave fn, field eq) | **IMPLEMENTED** — reference protocol |
| M02 | math.found.set-theory | 825 | 11 | — | Tier A |
| M03 | math.arith.fractions | ~400 | 11 | Physics (ratio analysis) | Tier A |
| M04 | math.calc.limits | ~300 | 11 | Physics (derivatives in kinematics) | Tier A |
| M05 | math.geom.coordinate-plane | ~350 | 11 | Physics (vector decomposition) | Tier A |
| M06 | math.trig.trig-functions | ~250 | 11 | Physics (waves, oscillation) | Tier A + Cross-Subject |
| M07 | math.calc.definite-integral | ~200 | 12 | Physics (work, area under curve) | Tier A + Cross-Subject |
| M08 | math.found.proof | ~200 | 10 | — | Tier A |
| M09 | math.found.mathematical-thinking | 907 | ~3 | — | Tier A (extreme TD) |
| M10 | math.found.mathematical-language | 859 | ~3 | — | Tier A (extreme TD) |
| M11 | math.found.logic | 853 | ~3 | — | Tier A (extreme TD) |
| M12 | math.abst.group-theory | ~150 | 12 | — | Tier B |
| M13 | math.alg.linear-equations | ~300 | ~8 | Physics (force equations) | Tier A |
| M14 | math.alg.quadratic-equations | ~200 | ~7 | Physics (projectile motion) | Tier A |
| M15 | math.calc.derivatives | ~200 | ~9 | Physics (velocity, acceleration) | Tier A + Cross-Subject |
| M16 | math.alg.simultaneous-equations | ~150 | ~6 | Physics (circuit analysis) | Tier B |
| M17 | math.stat.probability-basics | ~100 | ~5 | — | Tier B |
| M18 | math.arith.ratio-proportion | ~200 | ~7 | Physics (density, pressure) | Tier B |
| M19 | math.geom.angles | ~150 | ~6 | Physics (optics, wave angles) | Tier B |
| M20 | math.arith.percentages | ~150 | ~5 | — | Tier B |

*Note: TD values marked with ~ are estimated from subject-domain topology. Exact values require a targeted Python run on the full mathematics graph.*

### Physics — Priority Concepts

KG: 194 concepts. Measurement and mechanics domains are the universal foundation.

| Rank | Concept ID | TD | In° | Cross-Subject | Protocol Priority |
|---|---|---|---|---|---|
| P01 | phys.meas.units | 193 | 8 | — | Tier A (extreme TD — nearly entire KG) |
| P02 | phys.meas.scalars-vectors | 86 | ~4 | Math (vector spaces) | Tier A |
| P03 | phys.mech.displacement | 85 | ~4 | Math (coordinate geometry) | Tier A |
| P04 | phys.mech.velocity | 84 | ~4 | Math (derivatives) | Tier A |
| P05 | phys.mech.acceleration | 83 | ~4 | Math (second derivatives) | Tier A |
| P06 | phys.mech.kinematics-1d | 82 | ~4 | — | Tier A |
| P07 | phys.em.electric-charge | 76 | ~3 | — | Tier A |
| P08 | phys.mech.force | 72 | ~5 | — | Tier A |
| P09 | phys.mech.newtons-second-law | 70 | 9 | — | Tier A (highest in-degree in Physics) |
| P10 | phys.em.electric-current | 67 | ~4 | — | Tier A |
| P11 | phys.wave.wave-properties | ~50 | 5 | — | Tier B |
| P12 | phys.qm.schrodinger-equation | ~30 | 5 | Math (differential equations) | Tier B |
| P13 | phys.mech.work | ~40 | 4 | — | Tier B |
| P14 | phys.mech.kinetic-energy | ~35 | 4 | — | Tier B |
| P15 | phys.therm.temperature | ~40 | 4 | — | Tier B |

### English — Priority Concepts

KG: 216 concepts. Phonics domain is the structural base for all English literacy.

| Rank | Concept ID | TD | In° | Protocol Priority |
|---|---|---|---|---|
| E01 | eng.phonics.phonemic-awareness | 212 | ~3 | Tier A (extreme TD — nearly entire KG) |
| E02 | eng.phonics.print-concepts | 180 | ~3 | Tier A |
| E03 | eng.phonics.alphabet-recognition | 179 | ~3 | Tier A |
| E04 | eng.phonics.rhyming | 179 | ~3 | Tier A |
| E05 | eng.phonics.blending-segmenting | 178 | ~3 | Tier A |
| E06 | eng.phonics.letter-sound-correspondence | 177 | ~3 | Tier A |
| E07 | eng.phonics.consonants | 173 | ~3 | Tier A |
| E08 | eng.phonics.short-vowels | 173 | ~3 | Tier A |
| E09 | eng.phonics.consonant-blends | 172 | ~3 | Tier A |
| E10 | eng.phonics.digraphs | 171 | ~3 | Tier A |
| E11 | eng.grammar.word-classes-overview | ~50 | 5 | Tier A |
| E12 | eng.grammar.nouns | ~40 | 5 | Tier A |
| E13 | eng.grammar.present-tenses | ~40 | 5 | Tier A |
| E14 | eng.literature.narrative-elements | ~40 | 5 | Tier B |
| E15 | eng.vocab.word-recognition | ~30 | 4 | Tier B |

### Full Top 50 Ranked List (Cross-Subject Composite)

The full ranked list orders all 50 targets by composite ROI score. Concepts with cross-subject structural use are elevated above their raw KG score to reflect compounding impact.

| Rank | ID | Subject | Composite ROI | Tier | Status |
|---|---|---|---|---|---|
| 1 | math.func.function-concept | Math | MAXIMUM | A | IMPLEMENTED |
| 2 | phys.meas.units | Physics | Extreme TD | A | Not started |
| 3 | math.found.mathematical-thinking | Math | Extreme TD | A | Not started |
| 4 | math.found.mathematical-language | Math | Extreme TD | A | Not started |
| 5 | math.found.logic | Math | Extreme TD | A | Not started |
| 6 | math.found.set-theory | Math | High TD + High In° | A | Not started |
| 7 | eng.phonics.phonemic-awareness | English | Extreme TD | A | Not started |
| 8 | eng.phonics.print-concepts | English | High TD | A | Not started |
| 9 | eng.phonics.alphabet-recognition | English | High TD | A | Not started |
| 10 | phys.mech.newtons-second-law | Physics | High TD + Highest In° | A | Not started |
| 11 | math.calc.definite-integral | Math | High TD + High In° + Cross | A | Not started |
| 12 | math.calc.limits | Math | High TD + High In° + Cross | A | Not started |
| 13 | math.calc.derivatives | Math | High TD + High In° + Cross | A | Not started |
| 14 | math.trig.trig-functions | Math | High TD + High In° + Cross | A | Not started |
| 15 | math.geom.coordinate-plane | Math | High TD + High In° + Cross | A | Not started |
| 16 | math.arith.fractions | Math | High TD + High In° | A | Not started |
| 17 | phys.meas.scalars-vectors | Physics | High TD + Cross | A | Not started |
| 18 | phys.mech.displacement | Physics | High TD | A | Not started |
| 19 | phys.mech.velocity | Physics | High TD + Cross | A | Not started |
| 20 | phys.mech.acceleration | Physics | High TD + Cross | A | Not started |
| 21 | phys.mech.kinematics-1d | Physics | High TD | A | Not started |
| 22 | math.alg.linear-equations | Math | High TD + Cross | A | Not started |
| 23 | phys.em.electric-charge | Physics | High TD | A | Not started |
| 24 | math.arith.ratio-proportion | Math | High TD + Cross | B | Not started |
| 25 | phys.mech.force | Physics | High TD | A | Not started |
| 26 | phys.em.electric-current | Physics | High TD | A | Not started |
| 27 | math.alg.quadratic-equations | Math | High TD + Cross | A | Not started |
| 28 | math.found.proof | Math | High TD + High In° | A | Not started |
| 29 | eng.phonics.rhyming | English | High TD | A | Not started |
| 30 | eng.phonics.blending-segmenting | English | High TD | A | Not started |
| 31 | eng.phonics.letter-sound-correspondence | English | High TD | A | Not started |
| 32 | eng.phonics.consonants | English | High TD | A | Not started |
| 33 | eng.phonics.short-vowels | English | High TD | A | Not started |
| 34 | eng.phonics.consonant-blends | English | High TD | A | Not started |
| 35 | eng.phonics.digraphs | English | High TD | A | Not started |
| 36 | eng.grammar.word-classes-overview | English | High In° | A | Not started |
| 37 | eng.grammar.nouns | English | High In° | A | Not started |
| 38 | eng.grammar.present-tenses | English | High In° | A | Not started |
| 39 | phys.wave.wave-properties | Physics | Medium TD + High In° | B | Not started |
| 40 | math.abst.group-theory | Math | Medium TD + High In° | B | Not started |
| 41 | math.stat.probability-basics | Math | Medium TD | B | Not started |
| 42 | math.alg.simultaneous-equations | Math | Medium TD + Cross | B | Not started |
| 43 | phys.mech.work | Physics | Medium TD + High In° | B | Not started |
| 44 | phys.mech.kinetic-energy | Physics | Medium TD + High In° | B | Not started |
| 45 | phys.therm.temperature | Physics | Medium TD + High In° | B | Not started |
| 46 | eng.literature.narrative-elements | English | Medium TD + High In° | B | Not started |
| 47 | eng.vocab.word-recognition | English | Medium TD + High In° | B | Not started |
| 48 | math.geom.angles | Math | Medium TD + Cross | B | Not started |
| 49 | phys.qm.schrodinger-equation | Physics | Medium TD + High In° + Cross | B | Not started |
| 50 | eng.grammar.verbs | English | Medium In° | B | Not started |

---

## SECTION 4: TEACHING PROTOCOL PRIORITIES

### What a Teaching Protocol Contains

A Teaching Protocol is not a lesson plan. It is a complete specification of HOW to teach a concept to every known type of learner the Educational Brain will encounter. The reference implementation (`docs/curriculum/protocols/math.func.function-concept.md`) contains:

- Student State Classification (10 types: S0–S9)
- Diagnostic Battery (3-step identification)
- Protocol Selection Matrix (which protocol activates for which state)
- 8 Teaching Protocols (A–H), one per major student state cluster
- 36 Teaching Actions (2–7 Primitives each)
- Misconception Engine (6 misconceptions × symptom + mental model + diagnostic + primary move + alternative + recovery + evidence schema)
- Full Adaptation Decision Tree (every failure mode addressed)
- 5-Item Mastery Gate (non-negotiable verification before concept closure)
- Critique (remaining AI dependencies and missing elements)
- Estimation (total Teaching Actions needed for 99% coverage)

**Authoring time per reference-quality protocol:** 16–24 hours.  
**Target for Phase 1 (20 priority concepts):** 320–480 hours authoring.

### Protocol Depth Tiers

**Full Protocol (8 protocols, 36+ TAs, full misconception engine):**  
- Required for all Rank 1–20 concepts  
- Minimum: 5 student states, 6 Teaching Actions per state, 3 misconceptions with full engine  
- Target: math.func.function-concept depth for all

**Standard Protocol (4 protocols, 16+ TAs, core misconception coverage):**  
- Required for Rank 21–50 concepts  
- Minimum: 3 student states, 4 Teaching Actions per state, 2 misconceptions with full engine  
- Enhanced to Full Protocol in Phase 2

**Starter Protocol (2 protocols, 8 TAs, 1 misconception):**  
- For concepts entering Phase 3 long-tail authoring  
- Not acceptable for any Rank 1–50 concept

### The Protocol Depth Constraint

**Hard rule:** No new concept should begin authoring until the preceding concept in its tier has been completed to minimum depth. Authoring 50 concepts to Starter Protocol depth is strictly worse than authoring 20 concepts to Full Protocol depth. The Educational Brain's value is in depth, not count.

### Teaching Protocol Authoring Order

The authoring order below is dependency-ordered — concepts with the highest prerequisite-impact are authored first, so that their Teaching Protocols immediately benefit students learning any downstream concept.

**Wave 1 (Months 1–2): Foundational Anchors**

These concepts appear at the root of their subject's dependency graph. Getting them right is the highest-leverage investment possible.

1. `math.found.mathematical-thinking` — the root of mathematical cognition. Every student encounters this. Every misconception about "being a maths person" lives here.
2. `math.found.mathematical-language` — the second root. Mathematical notation is a barrier for most students; explicit language instruction unlocks the rest of the graph.
3. `math.found.logic` — the structural foundation of proof, argument, and mathematical reasoning.
4. `phys.meas.units` — the root of the entire Physics KG (TD=193). Unit confusion is the #1 source of physics errors across all levels.
5. `eng.phonics.phonemic-awareness` — the root of the entire English KG (TD=212). A student who cannot decode phonemes cannot access any downstream English concept.

**Wave 2 (Months 2–3): High-Convergence Concepts**

These concepts have the highest in-degree in their subjects — they are prerequisite to the most downstream concepts simultaneously.

6. `math.func.function-concept` — **ALREADY IMPLEMENTED** (reference protocol, 36 TAs, 6 misconceptions)
7. `math.found.set-theory` — 11 direct downstream concepts depend on it
8. `math.arith.fractions` — 11 direct downstream concepts depend on it
9. `phys.mech.newtons-second-law` — 9 direct downstream concepts (highest in Physics)
10. `eng.grammar.word-classes-overview` — 5 direct downstream concepts (highest in English grammar)

**Wave 3 (Months 3–4): Cross-Subject Bridge Concepts**

These concepts appear structurally in more than one canonical subject. A student who understands them correctly in one subject transfers correctly to another.

11. `math.calc.limits` — foundational in Math and required for physics derivatives
12. `math.calc.derivatives` — required for velocity and acceleration in Physics
13. `math.calc.definite-integral` — required for work, energy, and area calculations in Physics
14. `math.trig.trig-functions` — required for waves, oscillation, and optics in Physics
15. `math.geom.coordinate-plane` — required for vector decomposition in Physics

**Wave 4 (Months 4–5): Subject-Specific Expansions**

16–25: Complete the top 10 Physics concepts (P01–P10 above)  
26–35: Complete the top 10 English Phonics concepts (E01–E10 above)  
36–40: Math Algebra foundations (linear equations, quadratic equations, simultaneous equations, ratio-proportion, percentages)

**Wave 5 (Month 6): Phase 1 Completion**

41–50: Remaining Tier B concepts from Section 3

---

## SECTION 5: EDUCATIONAL BRAIN GROWTH MODEL

### Three-Phase Model

The Educational Brain does not grow linearly. It grows in compounding phases where each phase enables the next. The phases are defined by Teaching Intelligence density, not concept count.

---

### Phase 1: The Foundation Layer (Months 1–6)

**Objective:** 50 concepts at full Teaching Protocol depth.  
**Coverage:** ~4% of the 1,318-concept graph by count.  
**Failure prevention:** ~85% of all prerequisite-gap failures (Section 2 estimate).  
**Student types served:** All 10 student states (S0–S9) for 50 concepts.  
**Teaching Actions authored:** ~1,800 (50 concepts × 36 average).  
**Primitives in use:** 91 primitives from the full library.  
**Misconception engines authored:** ~300 (50 concepts × 6 average).

**Phase 1 success criteria:**
- Every Rank 1–50 concept has a complete Teaching Protocol
- No Teaching Protocol falls below Standard depth
- Every misconception engine has: symptom + mental model + diagnostic + primary move + alternative + recovery + evidence schema
- AI Removal Test passes for all 50 protocols
- Mastery Verification Gate (5 items) passes for all 50 protocols
- Evidence Engine collecting outcome data for all 50 protocols

**What Phase 1 does NOT contain:**
- Any concept not in Rank 1–50
- Any Chemistry, Biology, or CS concept
- Any protocol that relies primarily on AI elaboration rather than deterministic Teaching Actions

**The compounding threshold:**  
Phase 1 is complete when the Brain can demonstrably teach the 50 priority concepts to mastery for all 10 student types without requiring AI-generated elaboration for any student type on any concept. Before this threshold: the Brain is a prototype. After this threshold: the Brain is an asset.

---

### Phase 2: The Core Expansion (Months 7–18)

**Objective:** Top 200 concepts at Standard Protocol minimum, top 50 at Full Protocol depth.  
**Coverage:** ~15% of the 1,318-concept graph.  
**Failure prevention:** ~97% of prerequisite-gap failures.  
**Teaching Actions authored:** ~5,000 cumulative.

**Phase 2 priorities:**
- Extend all Rank 1–50 protocols from Standard to Full depth
- Author Standard Protocols for concepts with TD ≥ 20 across all three subjects
- Begin systematic cross-subject bridge documentation (Math→Physics transfer)
- Introduce the Evidence Engine feedback loop: protocols with low mastery rates get revised first
- Begin spaced review Teaching Actions (Phase 1 excluded these)

**Phase 2 is triggered by:**  
(a) Phase 1 success criteria confirmed  
(b) Evidence Engine producing at least 30 days of outcome data  
(c) At least one misconception engine has been revised based on evidence (proving the feedback loop works)

---

### Phase 3: The Long Tail (Month 19+)

**Objective:** All 1,318 concepts at Starter Protocol minimum; top 500 at Standard or Full depth.  
**Coverage:** 100% of the 1,318-concept graph at some depth.  
**Teaching Actions authored:** ~15,000 cumulative.

**Phase 3 characteristics:**
- Authoring becomes partially systematic: the Composition Grammar enables structured generation of Starter Protocols from concept metadata
- The Evidence Engine drives authoring priority: concepts with the most student failures get authored first, regardless of their KG rank
- Spaced review and interleaving protocols enter the Brain for all authored concepts
- Cross-subject teaching (a Physics concept taught through a Math framework) becomes possible

**Subject expansion gating:**  
Chemistry, Biology, and CS expansion is gated on Phase 2 completion. Specifically:
- The Teaching Primitive Library must be validated as domain-independent (any primitive works in any subject)
- The Composition Grammar must be verified as producing valid protocols in a new subject without domain-specific modification
- At least one full Teaching Protocol must be authored for a non-canonical subject as a portability proof
- The Evidence Engine must be producing calibrated difficulty estimates (not just binary pass/fail)

---

### The Compounding Model Visualised

```
Month 1-6:   50 concepts, full depth
             ████████████ 85% failure prevention
             Teaching Intelligence density: HIGH

Month 7-18:  200 concepts, standard depth
             ████████████████████ 97% failure prevention
             Teaching Intelligence density: EXPANDING

Month 19+:   1,318 concepts, all depths
             ████████████████████████████ 99%+ failure prevention
             Teaching Intelligence density: COMPLETE (v1)

After proof: Chemistry, Biology, CS expansion
             Evidence-driven protocol authoring
             Primitive Library validated cross-domain
```

---

## SECTION 6: SIX-MONTH ROADMAP

### Month 1: Infrastructure and First Wave

**Week 1–2: Teaching Primitive Library**
- Publish the complete 91-primitive library to `docs/curriculum/primitives/PRIMITIVE_LIBRARY.md`
- Specify the 10 Composition Grammar rules in `docs/curriculum/primitives/COMPOSITION_GRAMMAR.md`
- Identify the 20 highest-frequency primitives (appear in ≥ 80% of Teaching Actions)
- Produce authoring templates for the 5 most common 3-primitive sequences

**Week 3–4: First Wave Authoring Begins**
- Author `math.found.mathematical-thinking` to Full Protocol depth
- Author `phys.meas.units` to Full Protocol depth
- Author `eng.phonics.phonemic-awareness` to Full Protocol depth

**Month 1 deliverables:**
- Primitive Library (91 primitives specified)
- Composition Grammar (10 rules codified)
- 3 Full Protocols authored (plus math.func.function-concept already done)
- Authoring workflow documented: from concept selection → diagnostic battery → protocol selection matrix → TA authoring → misconception engine → mastery gate → AI Removal Test

---

### Month 2: Foundational Anchor Completion

**Concepts authored this month (Wave 1 remaining + Wave 2 start):**
- `math.found.mathematical-language` — Full Protocol
- `math.found.logic` — Full Protocol
- `math.found.set-theory` — Full Protocol
- `math.arith.fractions` — Full Protocol
- `phys.mech.newtons-second-law` — Full Protocol

**Month 2 deliverables:**
- 9 Full Protocols total (5 new + 4 from Month 1)
- Misconception co-occurrence map for Math foundations (which misconceptions appear together)
- Cross-subject bridge documentation: Math→Physics for measurement and algebra

---

### Month 3: Cross-Subject Bridge Concepts

**Concepts authored this month (Wave 3):**
- `math.calc.limits` — Full Protocol
- `math.calc.derivatives` — Full Protocol
- `math.calc.definite-integral` — Full Protocol
- `math.trig.trig-functions` — Full Protocol
- `math.geom.coordinate-plane` — Full Protocol

**Month 3 deliverables:**
- 14 Full Protocols total
- Cross-subject bridge section in each Math-Physics protocol: "How this concept appears in Physics"
- First draft of the Teaching Protocol Review Checklist (30 items from TEACHING_ASSET_PHILOSOPHY.md applied to all 14 protocols)

---

### Month 4: Physics and English Foundations

**Concepts authored this month:**
- Physics: `phys.meas.scalars-vectors`, `phys.mech.displacement`, `phys.mech.velocity`, `phys.mech.acceleration`, `phys.mech.kinematics-1d`
- English: `eng.phonics.print-concepts`, `eng.phonics.alphabet-recognition`, `eng.phonics.rhyming`, `eng.phonics.blending-segmenting`, `eng.phonics.letter-sound-correspondence`

**Month 4 deliverables:**
- 24 Full Protocols total
- English phonics teaching methodology: CPA equivalent for phonics (phonemic → graphemic → orthographic)
- Evidence Engine integration: outcome tracking per Teaching Action becomes active

---

### Month 5: Subject Expansions

**Concepts authored this month:**
- Physics: `phys.em.electric-charge`, `phys.mech.force`, `phys.em.electric-current`, `phys.wave.wave-properties`, `phys.mech.work`
- English: `eng.phonics.consonants`, `eng.phonics.short-vowels`, `eng.phonics.consonant-blends`, `eng.phonics.digraphs`, `eng.grammar.word-classes-overview`
- Math: `math.alg.linear-equations`, `math.alg.quadratic-equations`

**Month 5 deliverables:**
- 36 Full Protocols total
- First Evidence Engine report: which Teaching Actions are producing mastery fastest
- Revised Tier A misconception engines for concepts with evidence of student difficulty

---

### Month 6: Phase 1 Completion

**Concepts authored this month:**
- Complete remaining Rank 37–50 concepts at Standard Protocol minimum
- Upgrade lowest-performing Standard Protocols to Full Protocol depth (Evidence Engine guided)

**Month 6 deliverables:**
- 50 protocols complete (Rank 1–50 all authored)
- Phase 1 success criteria verified (Section 5)
- Evidence Engine report: failure prevention estimate validated against real data
- Phase 2 planning document: which concepts come next, in what order, based on evidence

---

### Month-by-Month Protocol Count

| Month | New Protocols | Cumulative | Depth |
|---|---|---|---|
| Start | 1 (math.func.function-concept) | 1 | Full |
| Month 1 | 3 | 4 | Full |
| Month 2 | 5 | 9 | Full |
| Month 3 | 5 | 14 | Full |
| Month 4 | 10 | 24 | Full |
| Month 5 | 12 | 36 | Full/Standard |
| Month 6 | 14 | 50 | Full/Standard |

---

## SECTION 7: LAUNCH STRATEGY

### What "Launch" Means for the Educational Brain

The Educational Brain is not launched as a public feature. It launches as a quality gate: the minimum viable state where a student encountering the Brain for the first time consistently learns a concept more effectively than they would from any textbook, video, or generic AI tutor.

This is a high bar. It is the right bar. A lower bar produces a generic tutor. The higher bar produces a moat.

### Launch Conditions (All Required)

1. **Protocol completeness:** At least 20 Rank A concepts at Full Protocol depth across all three subjects (minimum 6 Math, 7 Physics, 7 English).

2. **Student state coverage:** For each of the 20 launch concepts, Teaching Protocols exist for at minimum student states S0 (Complete Novice), S1 (Procedural Carrier), S2 (Misconception Carrier), and S6 (Low Confidence). These four states represent ~80% of real students.

3. **Misconception engine coverage:** Each of the 20 launch concepts has at minimum 3 misconception engines fully specified (symptom + mental model + diagnostic + primary move + alternative + recovery + evidence schema).

4. **AI Removal Test:** All 20 launch protocols pass the AI Removal Test — if the AI were replaced by a rule engine reading the protocol, the student would still receive effective teaching.

5. **Mastery Verification Gate:** All 20 launch protocols include a 5-item Mastery Gate with response protocols for each item.

6. **Evidence Engine active:** Outcome tracking is recording student response data against Teaching Action codes.

**Estimated timeline to launch conditions:** Month 4 (24 protocols complete).

### Launch Sequencing by Subject

**Mathematics launches first** (Month 4):  
Math has the most authored depth (math.func.function-concept is already at reference implementation quality) and the highest cross-subject leverage. Math foundations unlock Physics teaching.

**Physics launches second** (Month 5):  
Physics launch is contingent on Math-Physics bridge protocols being authored. A student who begins physics without the math bridge receives disconnected instruction — the Brain must know when to trigger a math prerequisite Teaching Protocol from within a physics session.

**English launches third** (Month 5, concurrent with Physics):  
English is structurally independent of Math and Physics at the foundational level. The phonics protocols can be authored and launched in parallel with the Math-Physics bridge work.

### The Student's First Session

When a student opens the Educational Brain for the first time, the Brain must:

1. Identify the student's entry concept (what they came to learn)
2. Run the Diagnostic Battery for that concept to determine student state
3. Select the appropriate Teaching Protocol for that state
4. Begin at Teaching Action 1 of the selected protocol
5. Monitor for misconception signals during the student's responses
6. Activate the Misconception Engine if a trigger signal is detected
7. Progress through Teaching Actions based on student response quality
8. Apply the Mastery Verification Gate before declaring concept mastery
9. Record all outcomes to the Evidence Engine

This 9-step sequence must work for all 20 launch concepts before launch. For concepts not yet in the Brain, the system falls back to the AI's best effort — but that fallback is not a feature, it is a gap. Every fallback represents a missing Teaching Protocol.

### Anti-Launch Criteria (Launch Blocked If Any Apply)

- Any launch concept has fewer than 3 misconception engines
- Any launch concept has no Diagnostic Battery
- Any launch concept's AI Removal Test fails
- The Evidence Engine is not recording Teaching Action outcomes
- The Math→Physics bridge is not authored for the 3 Rank A cross-subject concepts

---

## SECTION 8: LONG-TERM EXPANSION STRATEGY

### When Does Expansion to New Subjects Begin?

**Gate 1 (Non-negotiable):** Phase 2 complete — top 200 concepts authored across three subjects.  
**Gate 2 (Non-negotiable):** Evidence Engine has produced at least 90 days of outcome data.  
**Gate 3 (Non-negotiable):** Primitive Library validated as domain-independent (expansion test, see below).

### The Domain Independence Test

Before expanding to Chemistry (or any new subject), the following test must pass:

1. Select 3 concepts from the new subject's KG.
2. Attempt to write Teaching Actions for them using only the existing 91 Primitive Library — no new primitives.
3. Apply the 10 Composition Grammar rules without modification.
4. If all 3 concepts produce valid Teaching Actions without requiring new primitives or grammar modifications, the Library is validated as domain-independent for that subject.
5. If any concept requires a new primitive or grammar modification, document the new primitive/rule, add it to the Library/Grammar, and re-test.

**Prediction:** Chemistry expansion will require 0–5 new primitives (the CPA framework extends naturally to molecular visualisation). Biology expansion will require 5–12 new primitives (organism-scale processes require new demonstration primitives). CS expansion will require 3–8 new primitives (computational thinking has partially different cognitive patterns from mathematical thinking).

### Subject Expansion Priority Order

Chemistry expands first because:
- Chemistry shares the most structural overlap with Mathematics (equations, ratios, stoichiometry map directly to Arithmetic primitives)
- Chemistry and Physics share misconceptions (energy, temperature, state) — cross-subject misconception engines can be shared
- Chemistry has an existing KG (187 concepts) that was validated PASS
- The authoring team is most familiar with STEM subjects

Biology expands second because:
- Biology has the largest unique teaching requirements (evolution, ecology, systems biology require new organisational primitives)
- Biology's KG (89 concepts) is the smallest, reducing authoring load
- Biological systems thinking is a new cognitive domain that should benefit from a more mature Primitive Library

Computer Science expands third because:
- CS has fundamentally different student types (programming beginners have distinct failure modes not covered by S0–S9 in Math/Physics/English)
- CS requires new student state definitions before protocols can be authored
- CS has the highest risk of AI-dependency in Teaching Actions (code demonstration is hard to make AI-independent)

### Cross-Subject Teaching Intelligence

As expansion proceeds, the Educational Brain develops a cross-subject teaching capability that no textbook or AI tutor can replicate:

**Example 1 — The Math-Physics Bridge:**  
A Physics student struggling with kinematics is identified as having a deficit in the function concept. The Brain activates `math.func.function-concept` Protocol B (Procedural Carrier), resolves the function misconception, and returns the student to the kinematics protocol with the prerequisite repaired. This is possible only because both protocols exist in the Brain.

**Example 2 — The English-Math Bridge:**  
A student learning mathematical language struggles with abstract noun usage (e.g., "the sum OF five AND three" vs. "the sum IS five AND three"). The Brain detects a grammar misconception about noun phrases and activates `eng.grammar.nouns` Protocol A before returning to the mathematical language protocol.

**Example 3 — The Cross-Misconception Engine:**  
A student's error pattern in both fractions and ratios activates a shared misconception engine (part-whole confusion). The Brain identifies this as a single root misconception, not two separate problems, and applies a single schema-repair sequence rather than two independent remediation sequences.

Cross-subject teaching intelligence is not possible until Phase 2 is complete for all three subjects. It is the ultimate expression of the Educational Brain's value proposition — intelligence that emerges from the intersection of deeply authored subjects.

---

## SECTION 9: RISKS, BLIND SPOTS, AND MISSING PIECES

### Risk 1: Authoring Speed vs. Quality Tension

**Risk:** The six-month roadmap requires 49 additional protocols after the reference implementation. The reference implementation took significant time. If authoring speed is prioritised, quality degrades. If quality is maintained, the roadmap slips.

**Mitigation:** Enforce a minimum quality floor per tier. Full Protocol requires all 5 components. Standard Protocol requires 3. Starter Protocol requires 1. Never reduce the quality floor — instead, reduce the concept count if authoring speed is insufficient.

**Red line:** If by Month 3, fewer than 12 Full Protocols are complete, the Month 6 target of 50 protocols is at risk. Do not add new concepts to compensate — deepen existing ones instead.

---

### Risk 2: English Phonics as a Distinct Teaching Domain

**Risk:** The English Phonics domain has extreme TD values (12 concepts with TD≥170) but requires fundamentally different teaching approaches than Mathematics or Physics. The CPA framework (Concrete → Pictorial → Abstract) does not map cleanly to phonics instruction. Phonics requires its own sequence: Phonemic (sound-only) → Graphemic (sound-letter) → Orthographic (letter pattern) → Lexical (word meaning).

**Blind spot:** The current Primitive Library was reverse-engineered primarily from the math.func.function-concept protocol, which is a conceptual understanding domain. Phonics is a procedural decoding domain. Some primitives (P28 COGNITIVE CONFLICT) apply in both. Others (P08 ABSTRACT REPRESENTATION) may not apply in the same way.

**Required action before Month 4 English authoring:** Audit the 91-primitive library against phonics teaching research. Identify which primitives require modification for decoding instruction. Document the Phonemic→Graphemic→Orthographic→Lexical equivalent of CPA as a new composition grammar rule.

---

### Risk 3: Student State Classification Gaps

**Risk:** The 10 student states (S0–S9) were defined from the reference protocol (math.func.function-concept). They may not fully cover the student types encountered in Physics and English. Specifically:

- Physics may require a new state: S10 = "Intuition Carrier" — a student who has correct folk physics (e.g., "heavier objects fall faster") that conflicts with Newtonian mechanics. This is distinct from S2 (Misconception Carrier) because intuition carriers do not know they have a misconception — they have never been told their intuition is wrong.

- English may require new states for EFL/ESL learners (different from S9 Second-Language Learner in math), early literacy learners (age-distinct from adult S8), and students with specific phonological processing difficulties.

**Required action:** Extend the Student State classification to at minimum S11 before Physics protocols are authored. Document the diagnostic battery additions required to detect each new state.

---

### Risk 4: Misconception Co-occurrence Complexity

**Risk:** The math.func.function-concept protocol handles 6 misconceptions independently. In reality, students often hold multiple misconceptions simultaneously (MC1 + MC3, for example). The current protocol architecture has a note about this as a "missing element" — it does not specify what happens when two misconception engines trigger simultaneously.

**Blind spot:** A student with MC1 (Formula Dependency) AND MC3 (Injectivity Confusion) may receive conflicting Teaching Actions if both engines activate: MC1's primary move removes formula dependence, while MC3's primary move relies on the student having a clean function concept. If MC1 is unresolved when MC3 activates, the resolution sequence breaks.

**Required action before Month 3 authoring:** Define the Misconception Co-occurrence Protocol:
- Detection: if two misconception triggers fire within 3 Teaching Actions, flag as co-occurrence
- Priority ordering: resolve MC with higher prerequisite position first
- Inhibition: which misconception engines cannot run simultaneously
- Chain resolution: if MC-A is resolved but evidence of MC-B appears, restart from the MC-A resolution point

---

### Risk 5: The AI Dependency Risk

**Risk:** The AI Removal Test is a quality gate, not a guarantee. Teaching Actions can pass the AI Removal Test individually but still depend on AI interpretation of student responses when assembled into a protocol. Specifically: the protocol's adaptation decision tree requires classification of student responses (correct/partially correct/incorrect/misconception), and this classification step is currently AI-dependent.

**Blind spot:** Response classification has not been specified at the primitive level. A Teaching Action can end with P90 (FORMATIVE ASSESSMENT WITH FEEDBACK), but what happens next depends on how the response is classified. If the classification is done by the AI, the AI Removal Test is weakened.

**Required action:** Specify Response Classification as a formal primitive (P92 or similar) with:
- A finite set of response categories per question type
- Signal mapping: which surface-level signals (exact phrasing, error type, what's missing) map to which category
- Hard routing: which category routes to which next Teaching Action
- AI role: AI can do fuzzy matching to the signal map, but the map itself is deterministic

---

### Risk 6: Missing Pieces in the Evidence Engine

**Risk:** The Evidence Engine design (ADR 13) tracks outcomes per Teaching Action. But the current protocol architecture does not assign stable, unique identifiers to Teaching Actions across protocols. If TA-A01 in `math.func.function-concept` has the same internal code as TA-A01 in `math.found.logic`, the Evidence Engine will conflate their outcomes.

**Required action:** Before Evidence Engine integration (Month 4), assign globally unique Teaching Action identifiers across the entire protocol library. Format: `{concept_id}.{protocol_letter}{action_number}` — for example, `math.func.function-concept.A01`, `math.found.logic.C03`. This enables the Evidence Engine to track effectiveness per specific Teaching Action in the specific concept where it was used.

---

### Risk 7: English KG Not Yet Registered in Runtime

**Risk:** As noted in CLAUDE.md, the English KG (216 concepts, PASS from validator) is not yet registered in the runtime registry (`knowledgeGraph.ts` SUBJECT_ADAPTERS). All English protocols authored in Phase 1 will reference concept IDs (e.g., `eng.phonics.phonemic-awareness`) that the runtime cannot resolve until the English KG is registered.

**Impact on roadmap:** English protocols can be authored correctly and completely. But they cannot be served to students until the English KG registration is approved and implemented (Wave 0 approval item, per CLAUDE.md). This means English launch (Section 7) is gated on that approval.

**Recommended action:** Proceed with English protocol authoring without waiting for runtime registration. The protocol documents are authoritative. The runtime registration can happen in parallel or after authoring is complete. Do not delay authoring due to this runtime gap.

---

### Blind Spot: Interactive and Visual Teaching Actions

The reference protocol (math.func.function-concept) explicitly notes that interactive and visual Teaching Actions are missing. Four of the 36 Teaching Actions reference visual content (e.g., "Draw the arrow diagram"), but none of them are specified as interactive — they are all described from the teacher's perspective, not the student's.

Interactive Teaching Actions require:
- A student action specification (not just a teacher action)
- A response space (what the student can produce: drawing, selection, calculation, explanation)
- A classification protocol for the student's output
- A next-step routing table

Until Interactive Teaching Actions are defined, the Educational Brain's protocols are fundamentally teacher-led. They can be effective in a dialogue format, but they cannot support a student working independently through a protocol. The long-term vision of reducing AI reasoning requires interactive protocols — without them, the AI must bridge every gap between Teaching Actions.

**Recommended action:** Define the Interactive Teaching Action specification before Month 4. Pilot with the phonics domain (phonemic awareness naturally lends itself to interactive auditory exercises).

---

## SECTION 10: FINAL ARCHITECTURAL RECOMMENDATIONS

### Recommendation 1: Freeze the Scope

Do not add subjects, domains, or concepts to the Phase 1 scope. The value of the Educational Brain is depth, not breadth. Every hour spent authoring a Tier C concept in Month 1 is an hour not spent deepening a Tier A protocol. The scope in this document (50 concepts, 3 subjects) is the maximum Phase 1 scope, not the minimum.

### Recommendation 2: The Primitive Library is the Foundation of the Moat

The 91-primitive library is the most reusable asset in the entire Educational Brain. Before authoring the second protocol, publish the complete Primitive Library with full specifications for all 91 primitives. Every subsequent protocol will reference this library. A protocol that introduces a Teaching Action not decomposable into the existing 91 primitives should either:
(a) Decompose it differently, or
(b) Propose a new primitive with evidence that it is domain-independent

New primitives should be rare. If primitive count exceeds 120 by the end of Phase 1, the Library has been polluted with domain-specific primitives that reduce reuse.

### Recommendation 3: Treat the Misconception Engine as Infrastructure

The misconception engines in the reference protocol are the most sophisticated components of the Educational Brain. They are also the hardest to author. Do not treat them as optional. A Teaching Protocol without a misconception engine is incomplete — it can teach a novice, but it cannot repair a student who has already learned incorrectly.

Authoring schedule: misconception engine is authored simultaneously with the protocol, not after. The protocol's Teaching Actions for student states S2 (Misconception Carrier) and S7 (High Confidence Incorrect) depend on the misconception engine existing first.

### Recommendation 4: Evidence Engine Integration is Non-Negotiable for Phase 2

Phase 1 can begin without Evidence Engine data. Phase 2 cannot. Before any Phase 2 concept is authored, the Evidence Engine must have produced at minimum 30 days of outcome data for at least 10 Phase 1 concepts. The data must answer:

- Which Teaching Actions are producing mastery fastest for each student state?
- Which misconception engines are resolving the misconception in one pass vs. requiring multiple passes?
- Which student states are underserved by the current protocols?
- What is the actual failure prevention percentage for the top 20 concepts? (Compare to the 65% estimate in Section 2.)

Without this data, Phase 2 authoring is guesswork. With this data, Phase 2 authoring is intelligence.

### Recommendation 5: The AI Removal Test is the Quality Standard

Every Teaching Protocol that is published to the Educational Brain must pass the AI Removal Test before it is considered complete:

> "If the AI were replaced by a rule engine reading this protocol, would the student still receive effective teaching for their identified student state?"

A protocol that fails this test is not a Teaching Protocol — it is a prompt engineering document. The distinction matters: a prompt engineering document becomes useless when a better AI model arrives. A Teaching Protocol becomes more valuable as the AI's voice gets better at executing it.

### Recommendation 6: Do Not Optimise the AI — Author the Brain

When a protocol produces a poor student outcome, the first instinct is to improve the AI's prompt. This is the wrong instinct. The right action is to improve the protocol. The AI's job is to execute the protocol faithfully, not to compensate for an incomplete protocol.

This recommendation is the most important in this document. It defines the entire development philosophy: every hour spent improving an AI prompt is an hour not spent deepening a Teaching Protocol. Every hour spent deepening a Teaching Protocol is an hour that compounds across every student who ever encounters that concept.

The Educational Brain is the moat. Improve the Brain. Let the AI be the voice.

### Recommendation 7: The Three-Subject Scope Is a Feature, Not a Limitation

When announcing My Tutor to users, do not frame the three-subject scope as a limitation. Frame it as a commitment: "We teach three subjects with a depth of understanding that no other platform can match." This is more compelling than "we teach everything at surface level." The user who needs help with mathematics, physics, or English will receive better instruction from the Educational Brain than from any alternative. That is the promise. That is the moat. That is the launch.

---

## APPENDIX A: AUTHORING REFERENCE

### Minimum Protocol Quality Checklist (30 items)

See `docs/curriculum/TEACHING_ASSET_PHILOSOPHY.md` for the complete 30-item checklist including the AI Removal Test, CPA sequence verification, and all 9 field-level quality criteria.

### Teaching Primitive Library

See `docs/architecture/TEACHING_PRIMITIVE_ARCHITECTURE.md` for the complete 91-primitive library, composition grammar, and universal primitive map.

### Reference Implementation

See `docs/curriculum/protocols/math.func.function-concept.md` for the canonical reference implementation (8 protocols, 36 Teaching Actions, 6 misconception engines, full adaptation tree, 5-item mastery gate).

---

## APPENDIX B: DECISION LOG

| Decision | Rationale | Decided |
|---|---|---|
| 3-subject scope only | Depth is infinitely more valuable than breadth | 2026-07-11 |
| Chemistry/Biology/CS are future expansion | Unproven primitive portability; authoring capacity constraint | 2026-07-11 |
| English protocols proceed despite KG not being runtime-registered | Authoring and runtime registration are independent concerns | 2026-07-11 |
| Phase 2 gated on 30 days of Evidence Engine data | Without real data, Phase 2 priorities would be guesswork | 2026-07-11 |
| AI Removal Test is mandatory quality gate | Prevents prompt-engineering documents from masquerading as protocols | 2026-07-11 |
| Subject expansion order: Chemistry → Biology → CS | Structural overlap with existing subjects; authoring team familiarity | 2026-07-11 |

---

*This document is the canonical roadmap for the first version of the My Tutor Educational Brain. It supersedes all prior planning documents that referenced six subjects. Chemistry, Biology, and Computer Science do not exist in v1. The canon is three subjects. The strategy is depth.*
