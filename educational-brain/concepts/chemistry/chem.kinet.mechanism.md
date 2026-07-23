# Reaction Mechanisms — `chem.kinet.mechanism`

## Identity

- **KG ID**: chem.kinet.mechanism
- **Subject**: Chemistry
- **Domain**: Chemical Kinetics (chem.kinet)
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Estimated hours**: 4
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.kinet.rate-law
- **Unlocks**: chem.bio.enzyme-kinetics, chem.surface.heterogeneous-cat
- **Cross-links**: none

## Learning Objective

Students can define elementary steps and molecularity; identify the rate-determining step (RDS) from a proposed mechanism; derive the rate law from the RDS; apply the steady-state approximation (SSA) to derive rate laws involving intermediates; and evaluate whether a proposed mechanism is consistent with an experimentally observed rate law.

## Core Understanding

**Elementary step**: a single molecular event — one collision, one dissociation, one rearrangement. The rate law of an elementary step DOES follow its stoichiometry (unlike overall reactions). For an elementary step aA + bB → products: rate = k[A]^a[B]^b.

**Molecularity** (applies only to elementary steps):
- Unimolecular (1 species): A → products; rate = k[A]
- Bimolecular (2 species): A + B → products; rate = k[A][B]  (most common)
- Termolecular (3 species): A + B + C → products; rate = k[A][B][C]  (rare; three-body collisions uncommon)

**Reaction mechanism**: a sequence of elementary steps that sum to the overall balanced equation. Intermediates are species produced in one step and consumed in a later step — they cancel from the overall equation.

**Rate-determining step (RDS)**: the slowest elementary step in a multi-step mechanism. It limits the overall rate, just as the narrowest point in a traffic tunnel controls throughput. The overall rate law = rate law of the RDS, with any intermediates replaced using prior equilibrium or SSA.

**Method 1 — RDS with fast pre-equilibrium**:
If a fast equilibrium step precedes the RDS, any intermediate in the RDS can be replaced using the equilibrium expression. Example:
- Step 1 (fast): A ⇌ B + C  (K₁ = [B][C]/[A])
- Step 2 (slow, RDS): B + D → E
Rate from RDS: rate = k₂[B][D]. Replace [B] = K₁[A]/[C]: rate = k₂K₁[A][D]/[C] = k_obs[A][D]/[C].

**Method 2 — Steady-State Approximation (SSA)**:
For a reaction intermediate I that is produced slowly and consumed rapidly (so [I] is approximately constant):
d[I]/dt ≈ 0 → set rate of formation of I = rate of consumption of I → solve for [I] → substitute into the rate expression.

The SSA is valid when the intermediate is highly reactive (short-lived), so its concentration never builds up significantly.

**Mechanism-rate law consistency**: a proposed mechanism is consistent with the experimental rate law if:
1. The elementary steps sum to the correct overall equation.
2. The derived rate law from the mechanism (via RDS or SSA) matches the experimental rate law.

A matching rate law is necessary but not sufficient to prove a mechanism — other mechanisms may give the same rate law.

## Mental Models

**The tunnel bottleneck model**: a highway through a mountain has one narrow tunnel. No matter how wide the road is everywhere else, traffic flow equals the tunnel capacity. The RDS is the tunnel. The overall rate = rate of the slowest step.

**The relay race model**: a chemical mechanism is a relay race. Each elementary step hands the baton (reactive intermediate) to the next runner. The slowest runner determines the team's time, regardless of how fast the others run.

## Why Students Fail

1. **Writing the rate law from the overall stoichiometry**: students see the overall equation and write orders from the stoichiometric coefficients. Mechanism is needed to find the true rate law (this is the core lesson from chem.kinet.rate-law, reinforced here).
2. **Including the intermediate in the final rate law**: students derive rate = k₂[B][D] and leave it, forgetting that B is an undetectable intermediate that must be eliminated.
3. **The SSA and pre-equilibrium always give the same result**: they don't — SSA is more general; pre-equilibrium is an approximation (valid when K₁ is truly an equilibrium, not just a fast step).
4. **A mechanism is proved by its rate law**: students say "the mechanism is correct because it gives the right rate law." The rate law is consistent with the mechanism but does not prove it uniquely; many mechanisms can give the same rate law.

## Misconceptions

**MC-1 — The rate law of a mechanism is derived from the overall stoichiometry** (Type 5, instruction-induced; mirrors MC-1 from chem.kinet.rate-law)
- *Mechanism*: students do not yet separate mechanism from stoichiometry in their thinking.
- *Diagnostic probe*: "The mechanism for 2NO + O₂ → 2NO₂ is: (1) 2NO ⇌ N₂O₂ (fast); (2) N₂O₂ + O₂ → 2NO₂ (slow, RDS). Write the rate law."
- *Characteristic phrase*: "The overall equation is 2NO + O₂ → 2NO₂, so rate = k[NO]²[O₂]."
- *Repair*: the rate law comes from the RDS: rate = k₂[N₂O₂][O₂]. Then N₂O₂ is an intermediate — eliminate using the fast equilibrium: K₁ = [N₂O₂]/[NO]² → [N₂O₂] = K₁[NO]². Substitute: rate = k₂K₁[NO]²[O₂] = k_obs[NO]²[O₂]. The final rate law happens to match stoichiometry in this case — a coincidence, not a rule. (This example illustrates both the correct procedure AND why the coincidence trap is dangerous.)

**MC-2 — The intermediate can appear in the final reported rate law** (Type 5, instruction-induced from incomplete procedure)
- *Mechanism*: students correctly identify the rate-law as rate = k_RDS[intermediate][reactant] but stop there.
- *Diagnostic probe*: "You derive rate = k₂[N₂O₂][O₂] for the mechanism above. Is this the final rate law? Why or why not?"
- *Characteristic phrase*: "Yes, rate = k₂[N₂O₂][O₂] is the rate law for this mechanism."
- *Repair*: intermediates are not observed experimentally and cannot be measured in lab; a rate law written in terms of intermediates is not testable. The rate law must contain only measurable species (reactants, sometimes products in complex cases). The final required step is always: "Is there an intermediate? If yes, eliminate it using the pre-equilibrium or SSA."

**MC-3 — A mechanism is proved by giving the correct rate law** (Type 1, overgeneralization)
- *Mechanism*: students learn that mechanisms must be "consistent with" the rate law and then interpret "consistent" as "proved."
- *Diagnostic probe*: "Propose a different mechanism for the same reaction that also gives rate = k[NO]²[O₂]. Does this prove the first mechanism?"
- *Characteristic phrase*: "The mechanism is correct because the derived rate law matches the experimental one."
- *Repair*: a matching rate law is necessary but not sufficient. Other mechanisms can give the same rate law (as the probe demonstrates). Additional evidence — isotopic labelling, identification of intermediates by spectroscopy, stereochemistry of products, crossover experiments — is needed to narrow down to the true mechanism. In practice, no mechanism is ever "proved"; it is "consistent with available evidence" until refuted.

## Analogies

**The production line bottleneck analogy**: a factory with 5 machines in sequence produces widgets. Machine 3 is the slowest — it can only process 100/hour while the others do 1000/hour. The factory output is 100/hour regardless. Speeding up machines 1, 2, 4, 5 changes nothing; only improving machine 3 increases output. The RDS is machine 3.

**The "wanted poster" analogy for intermediates**: an intermediate is a suspect (wanted poster) that appears in the middle of a crime but is never found at the scene. The final rate law must be in terms of "witnessed" species (reactants/products), not suspects (intermediates).

## Demonstrations

**Demonstration 1 — Iodine clock mechanism analysis**
- Run the iodine clock reaction and provide the multi-step mechanism. Students identify intermediates, label steps as slow or fast, and derive the rate law from the RDS. Compare to the experimentally observed rate law from the chem.kinet.rate-law demonstration. This connects mechanism and observed kinetics concretely.

## Discovery Questions

1. "The decomposition of ozone has the mechanism: (1) O₃ ⇌ O₂ + O• (fast, K₁); (2) O• + O₃ → 2O₂ (slow, RDS). Derive the rate law. Express it only in terms of measurable species." (Targets: from RDS: rate = k₂[O•][O₃]. Eliminate O• (intermediate) using K₁ = [O₂][O•]/[O₃] → [O•] = K₁[O₃]/[O₂]. Substitute: rate = k₂K₁[O₃]²/[O₂] = k_obs[O₃]²/[O₂]. Note: this rate law has a negative order in O₂ — increasing O₂ SLOWS the reaction. This is an example of a product inhibiting its own formation.)
2. "The reaction H₂ + Br₂ → 2HBr follows the rate law rate = k[H₂][Br₂]^(1/2). Propose a mechanism consistent with this rate law. (Hint: begin with a reversible Br₂ dissociation step.)" (Targets: Step 1: Br₂ ⇌ 2 Br• (fast, K₁). Step 2: Br• + H₂ → HBr + H• (slow, RDS). Derive: rate = k₂[Br•][H₂]. K₁ = [Br•]²/[Br₂] → [Br•] = K₁^(1/2)[Br₂]^(1/2). Rate = k₂K₁^(1/2)[H₂][Br₂]^(1/2) ✓. This matches the experimental fractional order — the mechanism is consistent.)
3. "Apply the SSA to the following: A → I (rate k₁), I → A (rate k₂), I → P (rate k₃). Derive the rate of product formation." (Targets: d[I]/dt = k₁[A] − k₂[I] − k₃[I] = 0 → [I] = k₁[A]/(k₂ + k₃). Rate = k₃[I] = k₁k₃[A]/(k₂ + k₃). If k₂ >> k₃: rate ≈ k₁k₃[A]/k₂ = k_obs[A]. If k₃ >> k₂: rate ≈ k₁[A]. The SSA interpolates between these two limits.)

## Teaching Sequence

1. Review from chem.kinet.rate-law: orders are experimental, rate law from experiment not stoichiometry. Now: "Where does the experimental rate law come from? The mechanism."
2. Define elementary step, molecularity. Crucially: for elementary steps ONLY, rate = stoichiometry. Contrast with overall reactions.
3. Intermediates and overall equation: work an example (add 2 steps, cancel intermediate, get overall).
4. Rate-determining step: traffic tunnel / relay race model. Rate of slowest step = overall rate. Identify the RDS.
5. Derive rate law via pre-equilibrium: work Discovery Question 1 step by step. Address MC-2 (eliminate intermediate).
6. Address MC-3: a matching rate law is consistent, not proof. Ask students to propose an alternative mechanism.
7. Steady-State Approximation: when to use vs. pre-equilibrium. Work Discovery Question 3.
8. Work Discovery Question 2 (mechanism design from observed rate law).

## Tutor Actions

- If student writes rate law from overall stoichiometry → MC-1 repair: rate law comes from RDS, not overall equation; walk through the pre-equilibrium example.
- If student leaves intermediate in rate law → MC-2 repair: intermediates are unmeasurable; must substitute using K_eq or SSA.
- If student says mechanism is "proved" by matching rate law → MC-3 repair: necessary, not sufficient; ask for an alternative mechanism.
- Advance when student can derive the rate law from a two-step mechanism with fast pre-equilibrium and from a three-step SSA mechanism.

## Voice Teaching Notes

"Elementary steps: rate = stoichiometry. Overall reactions: rate ≠ stoichiometry." Repeat this distinction at every mechanism question. The chem.kinet.rate-law lesson taught 'never from stoichiometry'; this lesson teaches the one exception and why it's an exception (elementary = single collision = mechanism-defined stoichiometry).

For SSA: "Set d[I]/dt = 0. Solve for [I]. Substitute. It's algebra — the physics is just one statement: the intermediate's concentration doesn't accumulate."

## Assessment Signals

**Mastery gate**:
1. Student correctly identifies elementary steps, intermediates, and the RDS in a given mechanism.
2. Student correctly derives the rate law from the RDS, eliminating intermediates via pre-equilibrium.
3. Student correctly applies the SSA to derive a rate law involving a reactive intermediate.
4. Student correctly evaluates whether a proposed mechanism is consistent with an observed rate law.

**FRAGILE signal**: student applies SSA algebra correctly but cannot explain why d[I]/dt = 0 is a valid approximation (no physical justification of the steady-state assumption).

**MISCONCEIVING signal**: student derives rate law from overall stoichiometry. Address MC-1 immediately.

## Tutor Recovery Strategy

If stuck:
1. For pre-equilibrium elimination: "What species in your rate law is an intermediate? Write the equilibrium expression for the fast step that produces it. Solve for [intermediate] in terms of reactants only. Substitute into the rate law. Check: no intermediates left."
2. For SSA: "The intermediate forms at rate r_form. It disappears at rate r_disappear. Write both. Set them equal (SSA: d[I]/dt = r_form − r_disappear = 0). Solve: [I] = r_form / (sum of rate constants consuming I). Plug in."
3. For mechanism consistency check: "Sum the steps. Does the overall equation match? If yes, intermediates cancelled correctly. Write the rate law from the RDS. Does it match the experimental law (after eliminating intermediates)? If yes, the mechanism is consistent."

## Memory Hooks

- **Elementary step rate law = stoichiometry (ONLY for elementary steps, never for overall reactions).**
- **RDS: derive rate law from RDS → eliminate intermediates → express in measurable species only.**
- **SSA: d[I]/dt = 0 → solve for [I] → substitute. Used when intermediate is highly reactive.**
- **Matching rate law = consistent with mechanism. NOT proved.**

## Transfer Connections

- **chem.bio.enzyme-kinetics**: the Michaelis-Menten mechanism (E + S ⇌ ES → E + P) uses the SSA on the enzyme-substrate complex [ES]; the Michaelis constant Km and Vmax derive directly from the SSA — this node is the prerequisite machinery.
- **chem.surface.heterogeneous-cat**: the Langmuir-Hinshelwood mechanism for surface catalysis is a multi-step mechanism (adsorption → surface reaction → desorption) that requires mechanism-analysis tools to derive the observed rate law.

## Cross-Subject Connections

- **Biology (enzyme kinetics and metabolism)**: virtually every metabolic reaction proceeds via enzyme mechanisms with reactive intermediates; Michaelis-Menten kinetics and competitive inhibition are direct applications of mechanism analysis.
- **Organic chemistry**: arrow-pushing mechanisms in organic chemistry are exactly the same concept — each curly arrow represents one elementary step; the rate-determining step of a reaction determines what the rate law depends on.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.kinet.mechanism`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.kinet.mechanism` as of 2026-07-23.

## Curriculum Feedback

The advanced/analyze classification is appropriate — mechanism analysis requires multi-step reasoning (identify RDS → write rate law → eliminate intermediate) that is genuinely beyond the apply level. The two unlocks (enzyme-kinetics, heterogeneous-cat) are well-chosen: both are direct applications of the SSA. The fact that this concept resolves the central puzzle of chem.kinet.rate-law (why stoichiometry ≠ order) makes it a high-transfer node with strong motivational value.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
