# chem.kinet.mechanism — Reaction Mechanisms

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.kinet.mechanism` |
| Domain | Chemical Kinetics |
| Requires | `chem.kinet.rate-law` |
| Unlocks | `chem.bio.enzyme-kinetics`, `chem.surface.heterogeneous-cat` |
| Difficulty | advanced |
| Bloom Level | analyze |
| Mastery Threshold | 0.75 |
| Estimated Hours | 4 |

## 1. Concept Spine

A reaction mechanism is a sequence of elementary steps (each with a defined molecularity) that together account for the overall reaction, with the rate-determining step (RDS, the slowest step) setting the overall rate law — derived by writing rate = k[species]^(order) for the RDS, then eliminating any reaction intermediates (species that appear in the mechanism but not in the overall equation) using either the steady-state approximation or a fast pre-equilibrium assumption, since a valid rate law must contain only measurable species; a mechanism that produces a rate law matching experimental data is "consistent with the evidence," never definitively "proved," since multiple distinct mechanisms can produce identical rate laws.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: The two-step mechanism for 2NO + O₂ → 2NO₂ — a fast pre-equilibrium forming an N₂O₂ intermediate, followed by a slow rate-determining reaction with O₂.

**Representational**: A reaction-coordinate energy diagram with two humps (one per elementary step), the taller hump marking the rate-determining step.

**Abstract**: The full derivation procedure — write rate from the RDS, identify any intermediates, eliminate them via pre-equilibrium or steady-state approximation, arrive at a rate law containing only measurable species.

**Transfer**: Given an unfamiliar multi-step mechanism, correctly deriving its rate law by identifying the RDS and eliminating intermediates — and separately, correctly reasoning about what additional evidence (beyond rate-law matching) would be needed to actually distinguish between competing candidate mechanisms.

## 3. Why Beginners Fail

Students derive the rate law directly from the overall balanced equation's stoichiometry rather than from the mechanism's rate-determining step (repeating the same stoichiometry-matching error from `chem.kinet.rate-law` in a mechanism context); they stop the derivation once they've written a rate law containing an intermediate species, without recognizing intermediates can't appear in a valid, testable rate law and must be eliminated; and they treat "the mechanism gives the correct rate law" as proof the mechanism is correct, missing that multiple different mechanisms can produce identical rate laws, making rate-law matching necessary but not sufficient evidence.

## 4. Misconception Library

### MC-1: The rate law of a mechanism is derived from the overall stoichiometry
- **Probe**: "The mechanism for 2NO + O₂ → 2NO₂ is: (1) 2NO ⇌ N₂O₂ (fast); (2) N₂O₂ + O₂ → 2NO₂ (slow, RDS). Write the rate law."
- **Characteristic phrase**: "The overall equation is 2NO + O₂ → 2NO₂, so rate = k[NO]²[O₂]."
- **Trigger (Type 5, instruction-induced; mirrors the analogous MC-1 from `chem.kinet.rate-law`)**: Students haven't yet separated "mechanism-derived rate law" from "overall stoichiometric equation" in their thinking, and reflexively read exponents off the overall balanced equation instead of deriving them from the RDS.
- **Conflict evidence [P28]**: The correct derivation starts from the RDS: rate = k₂[N₂O₂][O₂]; since N₂O₂ is an intermediate, it must be eliminated using the fast pre-equilibrium (K₁ = [N₂O₂]/[NO]² → [N₂O₂] = K₁[NO]²), giving rate = k₂K₁[NO]²[O₂] = k_obs[NO]²[O₂] — this happens to match the naive stoichiometric guess for THIS specific reaction, but only because of the particular mechanism's structure, not because stoichiometry directly determines rate laws in general.
- **Bridge [P30]**: The correct procedure (RDS → eliminate intermediates) can coincidentally produce the same numeric result as reading exponents off stoichiometry, for mechanisms where the coincidence happens to hold — this makes the trap especially dangerous, since the wrong method can appear validated by a correct-looking answer.
- **Replacement [P31]**: Always derive the rate law from the RDS and intermediate elimination, never from the overall equation's coefficients directly — even when the final answer happens to match what stoichiometry alone would have suggested.
- **Discrimination pairs [P33]**: This NO/O₂ example (correct-derivation answer coincidentally matches stoichiometry) vs. the analogous H₂/Br₂ fractional-order case from `chem.kinet.rate-law` (correct-derivation answer does NOT match stoichiometry at all) — proof the coincidence isn't general.
- **S6 repair path**: Walk through the full RDS-plus-elimination derivation explicitly, even though the answer matches the stoichiometric guess, to demonstrate the correct procedure was used regardless of the coincidental outcome.

### MC-2: The intermediate can appear in the final reported rate law
- **Probe**: "You derive rate = k₂[N₂O₂][O₂] for the mechanism above. Is this the final rate law? Why or why not?"
- **Characteristic phrase**: "Yes, rate = k₂[N₂O₂][O₂] is the rate law for this mechanism."
- **Trigger (Type 5, instruction-induced from incomplete procedure)**: Students correctly identify the RDS's rate expression but stop the derivation there, treating that intermediate expression as the final answer without completing the elimination step.
- **Conflict evidence [P28]**: Intermediates like N₂O₂ are not observed or independently measurable in the laboratory (they exist only transiently within the reaction), so a rate law written in terms of an intermediate concentration is not experimentally testable — it must be rewritten in terms of only measurable species (typically the overall reactants) before it counts as a complete, valid rate law.
- **Bridge [P30]**: A rate law is meant to be compared against real experimental concentration-vs-rate data — since intermediates can't be independently measured, any rate-law expression still containing one is definitionally incomplete, not just stylistically unfinished.
- **Replacement [P31]**: The derivation is never complete until every intermediate has been eliminated (via pre-equilibrium or the steady-state approximation) and replaced with expressions in terms of only measurable species.
- **Discrimination pairs [P33]**: rate = k₂[N₂O₂][O₂] (incomplete — contains an unmeasurable intermediate) vs. rate = k_obs[NO]²[O₂] (complete — contains only measurable reactants).
- **S6 repair path**: Ask directly, "could you measure [N₂O₂] in a beaker with a probe?" — the answer (no) makes the incompleteness concrete and motivates the elimination step.

### MC-3: A mechanism is proved by giving the correct rate law
- **Probe**: "Propose a different mechanism for the same reaction that also gives rate = k[NO]²[O₂]. Does this prove the first mechanism?"
- **Characteristic phrase**: "The mechanism is correct because the derived rate law matches the experimental one."
- **Trigger (Type 1, overgeneralization)**: Students learn mechanisms must be "consistent with" the experimental rate law, and interpret "consistent with" as equivalent to "definitively proved by."
- **Conflict evidence [P28]**: Other mechanisms can be constructed that also derive to rate = k[NO]²[O₂] — as the probe itself demonstrates — meaning rate-law matching alone cannot distinguish between competing candidate mechanisms that happen to produce the same overall rate expression.
- **Bridge [P30]**: A matching rate law rules OUT mechanisms that produce a different rate law, but it does not rule IN one specific mechanism among all those that happen to match — additional, independent evidence is needed to narrow further.
- **Replacement [P31]**: A matching rate law is necessary but not sufficient evidence for a mechanism; further evidence — isotopic labelling, direct spectroscopic identification of intermediates, product stereochemistry, crossover experiments — is required to distinguish between mechanisms that all fit the same rate law; in practice, no mechanism is ever fully "proved," only "consistent with all available evidence so far, until refuted."
- **Discrimination pairs [P33]**: "Rate law matches" (necessary condition, rules out wrong mechanisms) vs. "mechanism proved" (a much stronger claim that rate-law matching alone cannot establish).
- **S6 repair path**: Have the student construct or examine an alternative mechanism that also derives to the same rate law, making the non-uniqueness concrete rather than abstract.

## 5. Explanation Library

**Primary explanation**: A reaction mechanism breaks an overall reaction into elementary steps, each with a specific molecularity. The slowest step (the rate-determining step) controls the overall rate — write its rate expression, then eliminate any intermediates (species that appear mid-mechanism but not in the overall equation) using either a fast pre-equilibrium assumption or the steady-state approximation, arriving at a rate law expressed only in terms of measurable species.

**Secondary explanation (evidence framing)**: Because different mechanisms can sometimes produce identical derived rate laws, matching the experimental rate law is necessary but never sufficient to establish a mechanism as correct — chemists treat mechanisms as working hypotheses "consistent with the evidence so far," refined or replaced as new evidence (isotopic labelling, spectroscopic intermediate detection, stereochemistry, crossover experiments) becomes available.

## 6. Analogy Library

- **Primary analogy**: A relay race where only the slowest runner's leg determines the team's overall time (the rate-determining step), regardless of how fast the other legs were run — but you can't officially clock a runner who's still mid-handoff and hasn't crossed a timing mat (an intermediate that can't be independently measured).
- **Breaking point**: The relay-race analogy conveys the RDS concept well but doesn't naturally capture why matching a rate law doesn't prove a specific mechanism — that needs the separate "multiple mechanisms, same rate law" evidence argument.
- **Anti-analogy**: Do NOT say "a matching rate law confirms the mechanism" — this directly reinforces MC-3's overgeneralization.

## 7. Demonstration Library

- **Demonstration 1 (full derivation walkthrough)**: Work the complete NO/O₂ mechanism derivation step by step — write the RDS rate expression, identify N₂O₂ as an intermediate, eliminate it via the pre-equilibrium, and arrive at the final measurable-species rate law.
- **Demonstration 2 (alternative-mechanism construction)**: Have students attempt to construct a different two-step mechanism for the same NO/O₂ reaction that also derives to rate = k[NO]²[O₂], directly demonstrating non-uniqueness.

## 8. Discovery Lesson

**Opening**: "For 2NO + O₂ → 2NO₂, the actual mechanism has two steps, not one. Does the rate law come from the overall equation, or from something else?"

**Exploration**: Students work through the RDS-derivation procedure step by step, discovering they must eliminate the N₂O₂ intermediate before reaching a final, complete rate law.

**Synthesis**: Guide toward: the derivation procedure (RDS, then eliminate intermediates) is the only valid path to a rate law — even when the numeric answer happens to resemble what stoichiometry alone would suggest.

**Closure**: "Could you propose a completely different two-step mechanism that also gives rate = k[NO]²[O₂]? What would that mean for how 'proven' the first mechanism really is?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the full NO/O₂ mechanism derivation, explicitly marking the RDS-then-eliminate-intermediate procedure step by step.
- **TA-2 (TELL)**: State explicitly that a rate law containing an intermediate is incomplete, immediately followed by the "could you measure this in a beaker?" question.
- **TA-3 (DO)**: Student derives a rate law for a new, previously-unseen multi-step mechanism, correctly eliminating any intermediate.
- **TA-4 (TEST-THINKING)**: Present MC-3's alternative-mechanism probe and ask the student to construct or evaluate a second mechanism giving the same rate law.

## 10. Voice Teaching

Never present a mechanism's rate law without first explicitly identifying the RDS and any intermediates by name — narrate the elimination step out loud every time, even when it feels redundant for a coincidentally-matching example. When a mechanism produces a correctly-matching rate law, immediately follow with "this is consistent with the evidence — not proof" as a standing verbal habit, to preempt MC-3 rather than repair it afterward.

## 11. Assessment

**Mastery gate**: Student can (a) derive a rate law from an unfamiliar mechanism's RDS, (b) correctly eliminate an intermediate using pre-equilibrium or steady-state approximation, (c) explain why rate-law matching alone doesn't prove a mechanism.

- **FA-1**: "The mechanism for 2NO + O₂ → 2NO₂ is given as two steps. Write the rate law." — targets MC-1.
- **FA-2**: "You derive rate = k₂[N₂O₂][O₂]. Is this the final rate law?" — targets MC-2.
- **FA-3**: "Propose a different mechanism that also gives rate = k[NO]²[O₂]. Does this prove the first mechanism?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-1 among students who've just come from `chem.kinet.rate-law` and are still consolidating the experimental-determination-only rule in a simpler, single-step context.

**Delayed retrieval**: Re-probe MC-3's evidence-vs-proof distinction before `chem.bio.enzyme-kinetics` and `chem.surface.heterogeneous-cat` introduce specific enzyme/catalytic mechanisms whose validation historically required exactly this kind of additional evidence beyond rate-law matching.

## 12. Recovery Notes

- **S3 (stuck)**: For derivation confusion, isolate the two sub-skills separately — first just identify the RDS and write its rate expression, then as a fully separate step, identify and eliminate any intermediate.
- **S4 (frustrated)**: Normalize — the NO/O₂ example's coincidental stoichiometry match genuinely does make the correct procedure look unnecessary in that one case, which is a reasonable trap, not carelessness.
- **S6 (collision)**: Use the "could you measure this in a beaker?" question for MC-2; use the alternative-mechanism construction exercise for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why a mechanism that correctly predicts the rate law still isn't definitively "proved."

## 13. Memory & Review

Tag as a multi-step procedural memory (RDS identification, intermediate elimination) plus a conceptual-correction memory (evidence vs. proof; stoichiometry-coincidence trap). Schedule a spaced check at ~1 week and again before `chem.bio.enzyme-kinetics`/`chem.surface.heterogeneous-cat`.

## 14. Transfer Map

Feeds directly into `chem.bio.enzyme-kinetics` (Michaelis-Menten kinetics is a specific application of steady-state-approximation mechanism analysis) and `chem.surface.heterogeneous-cat` (catalytic mechanisms are analyzed with the same RDS/intermediate-elimination procedure established here).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
