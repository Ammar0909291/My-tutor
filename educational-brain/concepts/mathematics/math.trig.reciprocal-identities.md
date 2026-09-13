# math.trig.reciprocal-identities — Reciprocal and Quotient Identities

## Identity
- **KG id**: `math.trig.reciprocal-identities`
- **Domain**: math.trig (Trigonometry)
- **Requires**: `math.trig.trig-identities`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient · **Bloom level**: remember
- **Mastery threshold**: 0.9 · **Estimated hours**: 2

## Learning Objective
The learner states all six reciprocal and quotient identities without prompting ($\csc\theta=\frac1{\sin\theta}$, $\sec\theta=\frac1{\cos\theta}$, $\cot\theta=\frac1{\tan\theta}=\frac{\cos\theta}{\sin\theta}$, $\tan\theta=\frac{\sin\theta}{\cos\theta}$), applies them to simplify expressions and prove identities involving all six functions, and correctly pairs sec with cos (not sin) and csc with sin (not cos).

## Core Understanding
`math.trig.trig-identities` establishes sin, cos, and tan as the three primary functions. This concept introduces the remaining three — csc, sec, cot — as EXACT RECIPROCALS of the three primary functions, never as separate independent facts. The pairing is: $\csc\theta=\frac1{\sin\theta}$ (sine's reciprocal), $\sec\theta=\frac1{\cos\theta}$ (cosine's reciprocal), $\cot\theta=\frac1{\tan\theta}=\frac{\cos\theta}{\sin\theta}$ (tangent's reciprocal, expressible either as the flipped fraction or directly as $\cos/\sin$). Additionally, $\tan\theta=\frac{\sin\theta}{\cos\theta}$ is the quotient identity already known but restated here alongside its own reciprocal partner.

The critical pairing subtlety is that the "co" prefix in cosecant and cotangent does **not** signal a connection to cosine — cosecant is sine's reciprocal, and cotangent is tangent's reciprocal. The safest anchor is the shared letter: **sec**ant and **cos**ine both begin with "c" and are paired together; **csc**ant and **sin**e are the other pair.

Each of the three new functions inherits a domain restriction directly from its reciprocal partner's zeros: $\tan\theta$ and $\sec\theta$ are undefined wherever $\cos\theta=0$ (at $\theta=\frac\pi2+n\pi$); $\cot\theta$ and $\csc\theta$ are undefined wherever $\sin\theta=0$ (at $\theta=n\pi$). Undefined here means genuinely undefined — not zero — since dividing by zero produces no number at all.

The concept's application skill is converting any expression involving csc, sec, or cot back to sin and cos, simplifying using the Pythagorean identity when needed, and converting back if a compact form is required — the same "convert to sin/cos, simplify, convert back" strategy underlies every identity proof involving all six functions.

## Mental Models
- **Same-letter pairing, not "co" pairing.** Secant pairs with cosine (both start with "c"); cosecant pairs with sine (the OTHER one) — the "co" prefix is a trap, not a guide.
- **Reciprocal, not renaming.** Cotangent is not another name for tangent — it is tangent's flipped fraction, and $\tan\theta\cdot\cot\theta=1$ always, confirming the reciprocal relationship directly.
- **Undefined inherits from the denominator's zeros.** Wherever a primary function is zero, its reciprocal is undefined — not a special new fact to memorize per function, but a direct consequence of division by zero.

## Why Students Fail
All three of this Blueprint's misconceptions are independently classified here, since the Blueprint supplies a "Trigger" column rather than a birth-type column:
- **MC-1** is a **Type 3 (language contamination)**: the "co" prefix in cosecant visually and phonetically resembles "cosine," creating a strong but false verbal association that overrides the correct sine pairing.
- **MC-2** is a **Type 1 (overgeneralization)**: having just learned tan and cot as a pair introduced together, a learner may treat them as interchangeable synonyms rather than recognizing the specific reciprocal relationship between them.
- **MC-3** is a **Type 5 (instruction-induced)** gap: once the six formulas are fluent, domain checking becomes an easily-skipped extra step unless explicitly drilled as mandatory before every computation involving csc, sec, or cot.

## Misconceptions
**MC-1 — SECANT-COSECANT-SWAP** *(Foundational)*
- Surface form: writing $\sec\theta=\frac1{\sin\theta}$ and $\csc\theta=\frac1{\cos\theta}$ — the "co" in cosecant misread as pairing with cosine.
- Root cause: the "co" prefix's phonetic resemblance to "cosine" creates a false verbal association.
- Repair: anchor on the SHARED LETTER instead of the "co" prefix — **sec**ant and **cos**ine both start with "c" (paired: $\sec=1/\cos$); **csc**ant and **sin**e are the other pair (the one that does NOT start with the same letter as "cos").

**MC-2 — COT-EQUALS-TAN** *(High)*
- Surface form: treating $\cot\theta$ as another name for $\tan\theta$, rather than as its reciprocal.
- Root cause: overgeneralizing from tan and cot's paired introduction to an assumed interchangeability.
- Repair: given $\tan\theta=\frac34$, compute $\cot\theta=\frac1{\tan\theta}=\frac43$ (the flipped fraction) — verify via $\tan\theta\cdot\cot\theta=\left(\frac34\right)\left(\frac43\right)=1$, confirming the reciprocal relationship directly rather than asserting it.

**MC-3 — DOMAIN-BLINDNESS** *(Moderate)*
- Surface form: computing $\csc(0°)$, $\sec(90°)$, or $\cot(0°)$ without noticing the result is undefined.
- Root cause: domain checking is easily skipped once the six formulas become fluent, unless explicitly drilled as a mandatory first step.
- Repair: before computing any reciprocal function's value, check whether the corresponding primary function is zero at that angle — $\cos(90°)=0$, so $\sec(90°)=\frac10$ is undefined, not a large or small number, simply not a number.

## Analogies
- **The same-letter-pairing analogy**: exactly like `math.trig.trig-identities`' own trap of trusting a memorized rule without an independent verification anchor, the "co" prefix here is a linguistic trap resolved by a different, more reliable anchor (shared first letter).
- **Anti-analogy — "co" does NOT mean "cosine."** This is MC-1's exact error, worth naming explicitly: despite appearing in both "cosine" and "cosecant"/"cotangent," the "co-" prefix here signals "complementary function," not a direct pairing partnership with cosine specifically.

## Demonstrations
1. **The paired-table derivation**: build the full six-function table from the three known primary functions, explicitly stating the same-letter pairing rule (sec↔cos, csc↔sin) — directly breaking MC-1.
2. **The reciprocal-verification check**: given $\tan\theta=\frac34$, compute $\cot\theta$ by flipping and verify $\tan\theta\cdot\cot\theta=1$ — directly breaking MC-2 by making the reciprocal relationship checkable, not merely asserted.
3. **The domain-check-first habit**: work $\sec(\pi/2)$ by first checking $\cos(\pi/2)=0$, concluding "undefined," never a computed numeric value — directly breaking MC-3.

## Discovery Questions
1. "Does 'co' in 'cosecant' mean it's paired with cosine? What does $\csc\theta$ actually equal?"
2. "If $\tan\theta=\frac34$, is $\cot\theta$ also $\frac34$, or something different? Check by multiplying them together."
3. "What is $\sec(90°)$? Before computing, is $\cos(90°)$ zero? What does that tell you?"

## Teaching Sequence
1. **Anchor in `math.trig.trig-identities`**: restate sin, cos, tan as the three known primary functions this concept builds three reciprocal partners onto.
2. **Representation shift (breaks MC-1)**: the paired-table derivation, ending with the same-letter pairing rule as the primary memory anchor.
3. **Pattern induction (breaks MC-2, MC-3)**: a simplification gallery (e.g. $\cot\theta\cdot\sin\theta=\cos\theta$) plus a full identity proof ($\tan\theta+\cot\theta=\sec\theta\csc\theta$), always converting to sin/cos first.
4. **Mastery gate**: 4-item problem set (find csc/sec/cot from given sin/cos; simplify $\cot\theta\cdot\sin\theta$; simplify $(\sec\theta-\cos\theta)/\sin\theta$; identify where sec is undefined) plus 1 independence-mode transfer probe (a full identity proof, $\tan\theta+\cot\theta=\sec\theta\cdot\csc\theta$).

## Tutor Actions
- **Representation shift**: the paired-table derivation with the same-letter pairing rule.
- **Pattern induction**: the simplification gallery plus a full worked identity proof, converting to sin/cos first every time.
- **Mastery gate**, 4-item problem set plus 1 transfer probe requiring a complete identity proof.

## Voice Teaching Notes
- When first introducing cosecant, say explicitly "the 'co' here does NOT mean cosine — cosecant is sine's reciprocal" before stating the formula, pre-empting MC-1 rather than correcting it after the fact.
- For MC-2, say "flip it, then check: multiply tan and cot together — do you get 1?" as a standing verification habit whenever cot is computed from tan.
- For MC-3, say "is the denominator zero here?" as the FIRST spoken question whenever a reciprocal function's value is requested, before any computation begins.

## Assessment Signals
- **Early warning for MC-1**: computing sec or csc using the wrong primary function's reciprocal.
- **Early warning for MC-2**: reporting $\cot\theta$ equal to $\tan\theta$ (the same value, not the reciprocal).
- **Early warning for MC-3**: reporting a numeric value for a reciprocal function at an angle where its denominator is genuinely zero.
- **Mastery evidence**: correctly stating all six functions and their pairings on unprompted recall, and correctly identifying undefined points for a fresh, unseen angle without being asked to check.

## Tutor Recovery Strategy
- On MC-1: re-anchor on the same-letter pairing rule with a fresh recall attempt, rather than simply restating the correct pairing — the misconception is a specific verbal trap, not a missing definition.
- On MC-2: rework the reciprocal-verification check ($\tan\theta\cdot\cot\theta=1$) with fresh numbers, since the misconception is an assumed-equivalence error that a concrete multiplication check directly disproves.
- On MC-3: return to the "is the denominator zero?" question with a fresh angle, treating domain-checking as a standing habit to rebuild rather than a one-off correction.
- If a learner correctly recalls all six formulas but fails simplification problems, treat the convert-to-sin/cos strategy as a distinct application-skill gap and route to dedicated simplification practice.

## Memory Hooks
- "Sec pairs with cos — same first letter" — for MC-1.
- "Flip it, then check: tan times cot should equal 1" — for MC-2.
- "Is the denominator zero? Check before you compute" — for MC-3.

## Transfer Connections
- **`math.trig.trig-identities`** (prerequisite, already authored): the three primary functions and the Pythagorean identity this concept's simplification strategy relies on repeatedly.
- **`math.trig.sum-difference-formulas`** (sibling, authored this same batch): a parallel case of formulas serving as a GENERATIVE foundation — reciprocal identities are the algebraic tool that converts any six-function expression back to the two-function (sin, cos) form those formulas operate on.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`); the Blueprint's own transfer probe is a pure identity proof with no cross-subject application context, consistent with the KG's own record.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.trig.reciprocal-identities.md` (primitive-numbered format — P11/P04/P91/P27/P41/P64/P89 scaffolding, 2 main TAs appropriate for a 2-hour retrieval-tier concept per the Blueprint's own Teaching Notes). All worked examples (the paired-table derivation, the $\cot\theta\cdot\sin\theta$ and $(\sec\theta-\cos\theta)/\sin\theta$ simplifications, the $\tan\theta+\cot\theta=\sec\theta\csc\theta$ proof), the complete misconception registry (MC-1 Foundational, MC-2 High, MC-3 Moderate), and the transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `cross_links: none`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`) verified against the live KG — see Curriculum Feedback below: **zero technical discrepancy** (the Blueprint's own "Unlocks" prose is descriptive, naming no specific concept id, and does not contradict the KG's empty `unlocks` field).
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence`): "Prove the identity: $\tan\theta+\cot\theta=\sec\theta\cdot\csc\theta$." *(Expected: LHS $=\frac{\sin\theta}{\cos\theta}+\frac{\cos\theta}{\sin\theta}=\frac{\sin^2\theta+\cos^2\theta}{\sin\theta\cos\theta}=\frac1{\sin\theta\cos\theta}$ [via the Pythagorean identity]. RHS $=\left(\frac1{\cos\theta}\right)\left(\frac1{\sin\theta}\right)=\frac1{\sin\theta\cos\theta}$. LHS = RHS.)*

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero technical Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata table matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`). The Blueprint's Component 7/completion-note "Unlocks" text ("Identity proofs involving all six functions," "All six-function identity proofs; cotangent in integration contexts") is descriptive prose naming no specific concept id — not counted as a metadata mismatch.

## Version History
- **2026-09-12 (Batch 57)**: authored as part of the Mathematics Educational Brain completion campaign. Unblocked by the already-authored `math.trig.trig-identities` (Batch 55). One of four `math.trig` concepts authored this batch (companions: `math.trig.special-angles`, `math.trig.amplitude-period-phase`, `math.trig.sum-difference-formulas`). `math.trig` moves from 13/25 to 14/25 this batch.
