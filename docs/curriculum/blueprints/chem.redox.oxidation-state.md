# chem.redox.oxidation-state — Assigning Oxidation States

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.redox.oxidation-state` |
| Domain | Redox Reactions |
| Requires | `chem.period.valency` |
| Unlocks | `chem.redox.balancing` |
| Difficulty | developing |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 3 |

## 1. Concept Spine

Oxidation state is a CALCULATED number derived from formal rules and the overall charge-balance sum rule — never an observable, physical ion charge (Mn in KMnO₄ has OS=+7, computed from K=+1, O=−2 (×4), summing to zero overall, entirely distinct from any literal, physically-measurable charge on the Mn atom); oxygen is NOT always −2 — the peroxide exception (O–O bond present, as in H₂O₂) gives O an oxidation state of −1, confirmed directly by the sum rule; the oxidizing agent CAUSES oxidation in another species while ITSELF being REDUCED (never "gets oxidized" itself, despite the superficially confusing name) — in 2H₂+O₂→2H₂O, O₂ (going from OS 0 to −2, gaining electrons, being reduced) is the oxidizing agent, while H₂ (going from OS 0 to +1, losing electrons, being oxidized) is the reducing agent; and hydrogen is NOT always +1 — in metal hydrides (like NaH), where the metal is more electropositive than hydrogen, hydrogen becomes the more electronegative species and receives formal electron ownership, giving OS(H)=−1.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Computing Mn's oxidation state in KMnO₄ explicitly using the sum rule (K=+1, O=−2×4, solving for Mn=+7), discovering this "+7" is a calculated bookkeeping result, not an observable physical charge.

**Representational**: A side-by-side comparison of H₂O (O=−2, the normal case) against H₂O₂ (O=−1, the peroxide exception), visually anchoring the rule's exception via the O–O bond structure.

**Abstract**: The general principle that oxidizing agents are themselves reduced (gain electrons, OS decreases) while causing oxidation elsewhere; the general exception logic for hydrogen (usually +1, but −1 in metal hydrides where the metal is more electropositive).

**Transfer**: Given an unfamiliar compound, correctly computing any atom's oxidation state using the sum rule and known exceptions (peroxide oxygen, metal hydride hydrogen), and correctly identifying the oxidizing and reducing agents in a redox reaction by tracking which species is reduced (OS decreases) versus oxidized (OS increases).

## 3. Why Beginners Fail

Students treat oxidation state as equivalent to a literal, observable ionic charge on the atom, missing that it's a calculated, formal bookkeeping number derived from charge-balance rules, not a physically measurable quantity; they apply "oxygen is always −2" as an absolute, exception-free rule, missing the well-established peroxide exception (O–O bonds giving O an oxidation state of −1); they assume "the oxidizing agent gets oxidized" from the superficially confusing name itself, missing that the oxidizing agent actually undergoes REDUCTION (gaining electrons) while causing oxidation in the other reactant; and they apply "hydrogen is always +1" as a universal rule, missing the metal-hydride exception, where hydrogen (paired with a more electropositive metal) becomes the more electronegative species and receives OS=−1.

## 4. Misconception Library

### MC-1: Oxidation state is the same as ion charge
- **Probe**: "What is the OS of Mn in KMnO₄?"
- **Characteristic phrase**: "Mn has no charge, so OS = 0."
- **Trigger (Type 4, notation-induced)**: Students conflate "oxidation state" (a formal, calculated bookkeeping number) with "ionic charge" (an observable physical property), assuming that since KMnO₄ isn't a simple binary ionic compound with an obviously charged Mn ion, Mn's oxidation state must default to 0.
- **Conflict evidence [P28]**: Oxidation state is a CALCULATED number, using the sum rule (all oxidation states in a neutral compound must sum to zero) — for KMnO₄: K=+1 (alkali metal rule), O=−2 (×4, standard rule), so +1+OS(Mn)+4(−2)=0, giving OS(Mn)=+7 — an entirely different, formally-derived number from any observable, literal charge on the Mn atom (which doesn't literally carry a +7 physical charge in any measurable sense).
- **Bridge [P30]**: Oxidation state is a formal accounting tool applying rules and a summing procedure to EVERY atom in a compound, regardless of whether the compound is simple ionic, complex, or covalent — it is never "zero by default" just because the compound isn't an obviously simple ionic salt.
- **Replacement [P31]**: Always compute oxidation state using the sum rule and standard element-specific rules, never assume it defaults to zero or equals a literal observable charge.
- **Discrimination pairs [P33]**: A literal ionic charge (an observable physical property, e.g., Na⁺'s +1) vs. a calculated oxidation state (a formal bookkeeping number, e.g., Mn's +7 in KMnO₄, computed via the sum rule).
- **S6 repair path**: Walk through the explicit sum-rule computation for KMnO₄ step by step, arriving at +7 rather than defaulting to 0.

### MC-2: Oxygen is always −2
- **Probe**: "What is the OS of O in H₂O₂?"
- **Characteristic phrase**: "oxygen is always minus two."
- **Trigger (Type 1, overgeneralization)**: The "oxygen is −2" rule is taught early and applies correctly to the vast majority of common compounds, leading students to treat it as universally exception-free.
- **Conflict evidence [P28]**: In H₂O₂ (hydrogen peroxide), there is a genuine O–O bond present (the defining feature of a peroxide) — the standard peroxide exception applies, giving OS(O)=−1, confirmed directly by the sum rule: 2×(+1)+2×OS(O)=0, solving to OS(O)=−1, genuinely different from the standard −2 value.
- **Bridge [P30]**: The "oxygen is −2" rule assumes a specific bonding pattern (oxygen bonded only to other, less electronegative elements) — but when oxygen bonds to ANOTHER oxygen (the O–O peroxide linkage), the electron-sharing arithmetic genuinely changes, since oxygen atoms bonded to each other split that bond's electrons equally (no net electron-ownership shift between them for that specific bond).
- **Replacement [P31]**: Oxygen is usually −2, but is −1 specifically in peroxides (O–O bond present) — always check for an O–O bond before assuming the standard −2 value.
- **Discrimination pairs [P33]**: H₂O (no O–O bond, standard case, O=−2) vs. H₂O₂ (genuine O–O bond, peroxide exception, O=−1).
- **S6 repair path**: Have the student identify the O–O bond explicitly in H₂O₂'s structure before applying the sum rule, confirming the exception applies.

### MC-3: The oxidising agent gets oxidised
- **Probe**: "In 2H₂ + O₂ → 2H₂O, which is the oxidising agent?"
- **Characteristic phrase**: "the oxidising agent does the oxidising so it must get oxidised."
- **Trigger (Type 3, language contamination)**: The name "oxidizing agent" superficially suggests the agent itself undergoes oxidation, a plausible-sounding but incorrect linguistic inference from the term's surface meaning.
- **Conflict evidence [P28]**: The oxidizing agent CAUSES oxidation in ANOTHER species while itself being REDUCED — in 2H₂+O₂→2H₂O, H₂ goes from OS 0 to +1 (losing electrons, being OXIDIZED — meaning H₂ IS the REDUCING agent, since it causes reduction in O₂ by supplying electrons), while O₂ goes from OS 0 to −2 (gaining electrons, being REDUCED — meaning O₂ IS the OXIDIZING agent, since it causes oxidation in H₂ by accepting electrons).
- **Bridge [P30]**: An "oxidizing agent" is named for the EFFECT it produces in the OTHER reactant (causing that other species to be oxidized), not for what happens to the agent itself — the agent's own fate is the OPPOSITE of what it causes: an oxidizing agent is itself reduced, and a reducing agent is itself oxidized.
- **Replacement [P31]**: The oxidizing agent is itself reduced (gains electrons, OS decreases) while causing oxidation in the other reactant; the reducing agent is itself oxidized (loses electrons, OS increases) while causing reduction in the other reactant.
- **Discrimination pairs [P33]**: O₂ (reduced, OS 0→−2, the oxidizing agent) vs. H₂ (oxidized, OS 0→+1, the reducing agent) — the agent's name describes its EFFECT on the other species, not its own fate.
- **S6 repair path**: Track each reactant's OS change explicitly (0→+1 for H₂, 0→−2 for O₂), then apply the naming convention based on which species was reduced (the oxidizing agent) versus oxidized (the reducing agent).

### MC-4: Hydrogen is always +1
- **Probe**: "What is the OS of H in NaH?"
- **Characteristic phrase**: "H is always +1."
- **Trigger (Type 5, instruction-induced)**: The "hydrogen is +1" rule is taught early and applies correctly to the vast majority of common compounds (where H bonds to more electronegative nonmetals), leading students to treat it as universally exception-free.
- **Conflict evidence [P28]**: In metal hydrides (NaH, CaH₂, LiAlH₄), the metal (Na, Ca, Li) is MORE electropositive than hydrogen — hydrogen becomes the relatively MORE electronegative species in this specific pairing, receiving formal electron ownership, giving OS(H)=−1 (the exception explicitly noted in the standard oxidation-state rule set); this is confirmed by real chemical behavior — NaH+H₂O→NaOH+H₂ shows hydrogen going from −1 (in NaH) to 0 (in H₂), meaning hydrogen is being OXIDIZED in this reaction, consistent only with its starting oxidation state being −1, not +1.
- **Bridge [P30]**: Hydrogen's oxidation state depends on its RELATIVE electronegativity compared to whatever it's bonded to — usually +1 (bonded to more electronegative nonmetals like O, Cl, N), but genuinely −1 when bonded to a LESS electronegative metal (making hydrogen the relatively more electronegative partner in that specific bond).
- **Replacement [P31]**: Hydrogen is usually +1 (bonded to more electronegative elements), but is −1 specifically in metal hydrides (bonded to a more electropositive metal) — always check which element is relatively more electronegative in the specific bond before assuming +1.
- **Discrimination pairs [P33]**: H₂O (H bonded to more electronegative O, H=+1, standard case) vs. NaH (H bonded to more electropositive Na, H=−1, metal hydride exception).
- **S6 repair path**: Present the NaH+H₂O reaction explicitly, showing hydrogen's oxidation-state increase from −1 to 0, directly confirming the exception via real reactive behavior.

## 5. Explanation Library

**Primary explanation**: Oxidation state is a calculated, formal bookkeeping number derived from standard rules (elements in their standard state = 0; common values for specific elements; the overall sum rule requiring all oxidation states in a compound to sum to the compound's overall charge) — it is never a literal, observable ionic charge, and must always be computed via these rules, never assumed or defaulted.

**Secondary explanation (exceptions and oxidizing-agent-naming framing)**: Common "default" oxidation states (oxygen=−2, hydrogen=+1) have well-established, structurally-grounded exceptions — oxygen becomes −1 in peroxides (O–O bond present), and hydrogen becomes −1 in metal hydrides (bonded to a more electropositive metal) — always check for these specific structural conditions before applying the default value. Separately, an "oxidizing agent" is named for the effect it causes in the OTHER reactant (oxidation), while the agent itself undergoes the OPPOSITE process (reduction) — the name describes external effect, not the agent's own fate.

## 6. Analogy Library

- **Primary analogy**: A referee who "enforces" penalties on players (the oxidizing agent CAUSES oxidation in another species) while the referee themselves simply does their job unaffected by penalty in the usual sense — but more precisely, imagine a trade where one party GIVES something away (electrons, being oxidized) to a party that RECEIVES it (being reduced) — the "receiving" party (the oxidizing agent) is the one whose own inventory (electron count) INCREASES, not decreases.
- **Breaking point**: The trade analogy conveys the electron-transfer direction well but doesn't naturally capture the sum-rule computation procedure or the specific peroxide/metal-hydride exceptions — those need the explicit rule-based calculation.
- **Anti-analogy**: Do NOT say "the oxidizing agent gets oxidized" — this directly reinforces MC-3.

## 7. Demonstration Library

- **Demonstration 1 (KMnO₄ sum-rule computation)**: Compute Mn's oxidation state in KMnO₄ explicitly using the sum rule, showing the derivation step by step to +7.
- **Demonstration 2 (2H₂+O₂→2H₂O agent identification)**: Track OS changes explicitly for both H₂ and O₂, connecting each change (oxidized vs. reduced) to the correct agent naming.

## 8. Discovery Lesson

**Opening**: "In KMnO₄, does Mn have an observable ionic charge you could measure directly, or is its oxidation state something else?"

**Exploration**: Students compute Mn's oxidation state via the sum rule, discovering it's a calculated bookkeeping result (+7), not a literal physical charge.

**Synthesis**: Guide toward: oxidation state is always computed from formal rules, never assumed or treated as an observable physical property.

**Closure**: "If the oxidizing agent 'does the oxidizing,' does that mean it gets oxidized itself?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit KMnO₄ sum-rule computation.
- **TA-2 (TELL)**: State the peroxide oxygen exception explicitly, worked through for H₂O₂.
- **TA-3 (DO)**: Student identifies the oxidizing and reducing agents in a new redox reaction, tracking OS changes explicitly.
- **TA-4 (TEST-THINKING)**: Present MC-4's NaH probe and ask the student to justify H's −1 oxidation state using relative electronegativity.

## 10. Voice Teaching

Whenever an oxidation state is assigned, narrate the sum-rule computation explicitly, never stating a value without showing the derivation. Whenever "oxidizing agent" is used, immediately clarify "this species is itself REDUCED" to preempt the name-based confusion directly.

## 11. Assessment

**Mastery gate**: Student can (a) correctly compute oxidation states using the sum rule, never assuming a default value without verification, (b) correctly apply the peroxide and metal-hydride exceptions, (c) correctly identify oxidizing and reducing agents by tracking OS changes, not by the agent's name alone.

- **FA-1**: "What is the OS of Mn in KMnO₄?" — targets MC-1.
- **FA-2**: "What is the OS of O in H₂O₂?" — targets MC-2.
- **FA-3**: "In 2H₂+O₂→2H₂O, which is the oxidising agent?" — targets MC-3.
- **FA-4**: "What is the OS of H in NaH?" — targets MC-4.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-3 among students reasoning from the surface meaning of "oxidizing agent" rather than tracking actual OS changes.

**Delayed retrieval**: Re-probe MC-2's peroxide exception and MC-4's metal-hydride exception before `chem.redox.balancing` requires fluent, correct oxidation-state assignment across diverse compounds for redox equation balancing.

## 12. Recovery Notes

- **S3 (stuck)**: For the OS-as-charge confusion, walk through the sum-rule derivation explicitly step by step rather than asking the student to recall a memorized value.
- **S4 (frustrated)**: Normalize — the default rules (O=−2, H=+1) genuinely do work for the vast majority of compounds, making their occasional exceptions a reasonable, common surprise.
- **S6 (collision)**: Use the explicit OS-change tracking for MC-3; use the NaH+H₂O reaction for MC-4.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why the oxidizing agent is itself reduced, not oxidized.

## 13. Memory & Review

Tag as a procedural-computational memory (sum-rule oxidation-state derivation) plus three conceptual-correction memories (peroxide exception; oxidizing-agent-is-reduced naming; metal-hydride hydrogen exception). Schedule a spaced check at ~1 week and again before `chem.redox.balancing`.

## 14. Transfer Map

Feeds directly into `chem.redox.balancing` (redox equation balancing directly requires fluent, correct oxidation-state assignment established here).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
