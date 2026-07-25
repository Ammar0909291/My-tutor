# chem.hal.sn1 — SN1 Mechanism

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.hal.sn1` |
| Domain | Haloalkanes |
| Requires | `chem.org.reactive-intermediates`, `chem.hal.introduction` |
| Unlocks | `chem.hal.elimination` |
| Difficulty | proficient |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 4 |

## 1. Concept Spine

Theoretical SN1 predicts perfect 50:50 racemization (planar carbocation attacked equally from both faces), but real systems show a SLIGHT EXCESS OF INVERSION because ion pairing between the carbocation and the departing leaving group partially blocks one face — perfect racemization remains the correct exam-level simplified model, while slight inversion excess is the observed practical reality; SN1's rate law is rate=k[R–X] ONLY, because the rate-determining step (ionization) involves only the substrate breaking apart, with the nucleophile entering in a separate, fast, non-rate-determining second step — doubling nucleophile concentration has NO EFFECT on SN1 rate, in sharp contrast to SN2's rate=k[R–X][Nu]; and SN1 is only accessible to substrates capable of forming a sufficiently STABLE carbocation (tertiary, allylic, benzylic, or otherwise resonance-stabilized) — methyl and primary substrates cannot undergo SN1 at all (their carbocations are far too unstable to form), so "SN1 is simpler, therefore always preferred" is false; substrate structure gates which mechanism is even accessible.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing the theoretical 50:50 racemization prediction for a chiral tertiary substrate against the practically-observed slight inversion excess, tied explicitly to ion-pairing.

**Representational**: A two-step energy diagram (ionization, rate-determining, high barrier; nucleophilic capture, fast, low barrier) with the rate law rate=k[R–X] labeled directly beneath the rate-determining first step only.

**Abstract**: The general principle that SN1's rate-determining step involves only the substrate, making the mechanism unimolecular in rate law regardless of nucleophile concentration; the general carbocation-stability gate that determines whether SN1 is even mechanistically accessible for a given substrate.

**Transfer**: Given an unfamiliar substrate/nucleophile combination, correctly predicting whether SN1 is accessible from carbocation stability, correctly predicting the rate law's independence from nucleophile concentration, and correctly predicting a near-racemic (with slight inversion excess) stereochemical outcome when SN1 does occur.

## 3. Why Beginners Fail

Students assume SN1 always gives exactly 50:50 racemization as an absolute, exceptionless rule, missing that the perfectly-planar-carbocation model is a simplification, and real ion pairing between the carbocation and the departing leaving group creates a genuine, if slight, inversion excess in practice; they assume SN1's rate law must depend on nucleophile concentration, by analogy with SN2 or through a general belief that "reaction rate depends on all reactants," missing that the rate-determining step in SN1 is ionization — a process involving ONLY the substrate — so the nucleophile (entering only in the fast, subsequent step) has genuinely zero kinetic effect on the overall rate; and they assume SN1, being conceptually "simpler" (fewer moving parts in one step), must be the generally preferred or default pathway, missing that SN1 requires a sufficiently STABLE carbocation intermediate to form at all — methyl and primary carbocations are so unstable that SN1 simply does not occur for those substrates, making SN2 the only viable pathway regardless of any perceived "simplicity" advantage.

## 4. Misconception Library

### MC-1: SN1 reactions always give complete racemisation, with exactly 50% R and 50% S product
- **Probe**: "In practice, SN1 reactions on chiral tertiary substrates often show slight predominance of one enantiomer. What could cause this departure from perfect 50:50?"
- **Characteristic phrase**: "SN1 = always exactly racemic."
- **Trigger (Type 1, overgeneralization)**: Students learn the simplified "planar carbocation, equal attack from both faces" model as an absolute rule without registering it as a simplification of the real, ion-pairing-influenced outcome.
- **Conflict evidence [P28]**: THEORETICAL SN1 gives racemisation because the planar carbocation is attacked from both faces with equal probability. In practice, ion pairing between the carbocation and the departing X⁻ means X⁻ partially occupies one face of the carbocation, reducing access for the nucleophile from that side → SLIGHT EXCESS OF INVERSION over retention. The degree of ion pairing depends on solvent polarity (more ion pairing in less polar solvents → more inversion) and on carbocation lifetime (longer-lived → more time for the ion pair to separate → more racemisation).
- **Bridge [P30]**: "Perfect 50:50 racemization" describes an idealized planar carbocation fully separated from its departing leaving group — real carbocations often remain transiently associated (ion-paired) with the leaving group immediately after ionization, and this residual association asymmetrically blocks one face, producing the observed slight inversion excess; the idealized model remains the correct simplified answer for exam-level predictions, while the ion-pairing refinement explains the real, measurable deviation.
- **Replacement [P31]**: SN1 gives predominantly racemic product with a slight inversion excess in practice (due to ion pairing) — perfect 50:50 is the simplified theoretical model, not an exceptionless law of real systems.
- **Discrimination pairs [P33]**: Idealized fully-separated carbocation (perfect 50:50) vs. real ion-paired carbocation (slight inversion excess) — the same mechanism, refined by a real physical effect.
- **S6 repair path**: Present the ion-pairing mechanism explicitly, connecting solvent polarity and carbocation lifetime to the degree of inversion excess observed.

### MC-2: The rate equation for SN1 is rate = k[R–X][Nu], the same format as SN2 but with different k values
- **Probe**: "In SN1, which step is rate-determining? Does that step involve the nucleophile?"
- **Characteristic phrase**: "SN1 and SN2 both depend on the nucleophile concentration."
- **Trigger (Type 4, notation-induced)**: Students pattern-match the rate-law FORM from SN2 onto SN1 without re-deriving it from SN1's actual rate-determining step.
- **Conflict evidence [P28]**: SN1 rate = k[R–X] ONLY. The rate-determining step is IONISATION (Step 1), which involves ONLY the substrate (R–X breaking apart) — the nucleophile does NOT participate in this step. The nucleophile enters only in Step 2 (fast, after the carbocation forms) → the nucleophile has no effect on the overall rate. Doubling the nucleophile concentration has NO EFFECT on SN1 rate. Contrast with SN2 (bimolecular): rate=k[R–X][Nu] — both substrate and nucleophile are in the rate-determining (and only) step.
- **Bridge [P30]**: A reaction's rate law is determined entirely by the species present in its RATE-DETERMINING (slowest) step, never by every species that eventually appears somewhere in the overall mechanism — SN1's slow step is pure ionization of the substrate alone, so only [R–X] appears in the rate law, regardless of how fast or important the subsequent nucleophile-capture step is to the overall product.
- **Replacement [P31]**: SN1 rate depends only on [R–X] (unimolecular, from the ionization rate-determining step) — never assume the nucleophile appears in the rate law just because it appears somewhere in the mechanism.
- **Discrimination pairs [P33]**: SN1 (rate=k[R–X], nucleophile absent from rate-determining step) vs. SN2 (rate=k[R–X][Nu], nucleophile present in the single, rate-determining step).
- **S6 repair path**: Walk through the two-step SN1 mechanism explicitly, identifying which step is slow (rate-determining) and which species participate in it.

### MC-3: SN1 is always better than SN2 because it's a simpler, single-step ionisation
- **Probe**: "Would SN1 occur with methyl iodide (CH₃I) in a polar protic solvent? What intermediate would form, and is it stable?"
- **Characteristic phrase**: "SN1 is simpler so it's always preferred."
- **Trigger (Type 5, instruction-induced)**: Students infer a general "simpler mechanism = more favorable" heuristic from limited examples without registering the carbocation-stability precondition that gates SN1's accessibility.
- **Conflict evidence [P28]**: SN1 requires a STABLE CARBOCATION INTERMEDIATE. A methyl (CH₃⁺) or primary (RCH₂⁺) carbocation is EXTREMELY UNSTABLE (virtually no stabilisation, very high energy). SN1 is ONLY preferred for substrates that can form STABLE (tertiary, allylic, benzylic) carbocations. For methyl and primary alkyl halides, the carbocation is too unstable to form → SN1 does NOT occur → SN2 is the only viable pathway.
- **Bridge [P30]**: "Fewer mechanistic steps" is not equivalent to "energetically easier" — SN1's single ionization step must still surmount whatever activation energy that ionization requires, and for methyl/primary substrates this barrier is prohibitively high because the resulting carbocation has essentially no stabilization; SN1 is only accessible when the substrate structure can actually support a sufficiently stable carbocation.
- **Replacement [P31]**: SN1 requires a substrate capable of forming a reasonably stable carbocation (tertiary, allylic, benzylic, or resonance-stabilized) — it is not a universally-available "simpler" shortcut, and is mechanistically inaccessible for methyl/primary substrates.
- **Discrimination pairs [P33]**: Tertiary substrate (stable carbocation, SN1 viable) vs. methyl substrate (carbocation far too unstable, SN1 inaccessible, SN2 is the only pathway).
- **S6 repair path**: Present the explicit carbocation-stability gate, having the student assess whether a given substrate can support a stable enough carbocation before predicting SN1 viability.

## 5. Explanation Library

**Primary explanation**: SN1 proceeds via a two-step mechanism — a slow, rate-determining ionization (forming a planar carbocation) followed by fast nucleophilic capture. Because the nucleophile participates only in the fast second step, the overall rate law is rate=k[R–X] alone, independent of nucleophile concentration, in sharp contrast to SN2's bimolecular rate=k[R–X][Nu]. This mechanism is only accessible when the substrate can form a sufficiently stable carbocation (tertiary, allylic, benzylic) — methyl and primary substrates cannot undergo SN1 at all.

**Secondary explanation (real vs. idealized stereochemistry)**: The idealized SN1 model predicts perfect 50:50 racemization from a fully-planar, symmetric carbocation, but real systems show a slight inversion excess due to residual ion pairing between the carbocation and the departing leaving group, which asymmetrically shields one face of the carbocation from nucleophilic attack.

## 6. Analogy Library

- **Primary analogy**: A relay race with one very slow, exhausting first leg (ionization, rate-determining) followed by a trivially fast final sprint (nucleophile capture) — the team's overall time depends entirely on the slow leg, regardless of how fast the final sprinter is (nucleophile concentration irrelevant to rate).
- **Breaking point**: The relay-race analogy conveys the rate-determining-step concept well but doesn't naturally capture the carbocation-stability gate (MC-3) or the ion-pairing stereochemistry refinement (MC-1) — those need the explicit substrate-comparison and ion-pairing mechanism.
- **Anti-analogy**: Do NOT say "SN1 is the easy, default pathway for any substrate" — this directly reinforces MC-3 by ignoring the carbocation-stability precondition.

## 7. Demonstration Library

- **Demonstration 1 (two-step mechanism with rate-determining step highlighted)**: Draw the SN1 energy diagram explicitly, labeling the ionization step as rate-determining and the capture step as fast, deriving rate=k[R–X] from this.
- **Demonstration 2 (carbocation-stability substrate gate)**: Compare a tertiary substrate (SN1 viable) against methyl iodide (SN1 inaccessible), grounded in explicit carbocation stability reasoning.
- **Demonstration 3 (ion-pairing stereochemistry refinement)**: Present the idealized 50:50 model alongside the real ion-paired slight-inversion-excess outcome, tied to solvent polarity and carbocation lifetime.

## 8. Discovery Lesson

**Opening**: "If SN1 goes through a planar carbocation attacked equally from both sides, should the product always be exactly 50:50?"

**Exploration**: Students examine real experimental data showing a slight inversion excess, discovering ion pairing as the mechanistic cause.

**Synthesis**: Guide toward: the idealized planar-carbocation model is a simplification; real ion pairing asymmetrically shields one face.

**Closure**: "Would methyl iodide undergo SN1? What intermediate would be needed, and is it stable?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the two-step SN1 energy diagram, labeling the rate-determining step explicitly.
- **TA-2 (TELL)**: State the carbocation-stability gate explicitly, anchored to the tertiary-vs-methyl substrate contrast.
- **TA-3 (DO)**: Student predicts SN1 rate law dependence for an unfamiliar substrate/nucleophile-concentration scenario.
- **TA-4 (TEST-THINKING)**: Present the ion-pairing probe and ask the student to justify the observed slight inversion excess from first principles.

## 10. Voice Teaching

Whenever SN1 rate is discussed, narrate "only the substrate matters for rate — the nucleophile enters after the slow step." Whenever SN1 viability is assessed, state "check carbocation stability first — SN1 is not available to every substrate" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly explain the real slight-inversion-excess outcome from ion pairing, (b) correctly derive rate=k[R–X] from the rate-determining ionization step, (c) correctly assess carbocation-stability gating for SN1 accessibility.

- **FA-1**: "Why might a real SN1 reaction show slightly more inversion than retention, rather than perfect 50:50?" — targets MC-1.
- **FA-2**: "Does doubling the nucleophile concentration change the SN1 rate? Justify from the mechanism." — targets MC-2.
- **FA-3**: "Would SN1 occur with methyl iodide? Explain using carbocation stability." — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-2 among students who pattern-match the SN2 rate-law form onto SN1 without re-deriving it.

**Delayed retrieval**: Re-probe MC-2's rate-determining-step reasoning and MC-3's carbocation-stability gate before `chem.hal.elimination` requires fluent competition reasoning between SN1/E1 pathways.

## 12. Recovery Notes

- **S3 (stuck)**: For the rate-law confusion, have the student explicitly identify the rate-determining step and list only the species present in it before writing the rate law.
- **S4 (frustrated)**: Normalize — pattern-matching the SN2 rate-law form onto SN1 is genuinely common on first exposure, since both are called "substitution."
- **S6 (collision)**: Use the explicit tertiary-vs-methyl carbocation-stability contrast for MC-3; use the ion-pairing mechanism for MC-1.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why SN1 is inaccessible to methyl and primary substrates.

## 13. Memory & Review

Tag as one procedural memory (deriving rate law from the rate-determining step) plus two conceptual-correction memories (ion-pairing stereochemistry refinement; carbocation-stability gate for SN1 accessibility). Schedule a spaced check at ~1 week and again before `chem.hal.elimination`.

## 14. Transfer Map

Feeds directly into `chem.hal.elimination` (E1 elimination shares SN1's carbocation intermediate and rate-determining ionization step, requiring fluent reasoning about both established here).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
