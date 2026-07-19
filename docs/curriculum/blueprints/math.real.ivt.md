# Teaching Blueprint: Intermediate Value Theorem (Rigorous) (`math.real.ivt`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.real.ivt` |
| name | Intermediate Value Theorem (Rigorous) |
| domain | Real Analysis |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.real.connectedness`, `math.real.continuity-rigorous` |
| unlocks | none |
| cross_links | `math.calc.ivt` (not yet authored — see Component 7) |
| CPA_entry_stage | A (Abstract) — expert learner already has the connectedness-preservation theorem and rigorous continuity; the formal IVT statement is introduced directly as a named corollary, not re-derived |
| description (KG) | If $f:[a,b]\to\mathbb{R}$ is continuous and $f(a)<c<f(b)$, then $\exists x\in(a,b)$ with $f(x)=c$. Proof: connected image of connected set is connected; connected subsets of $\mathbb{R}$ are intervals. |

## Component 1 — Learning Objectives

- LO1: State the **Intermediate Value Theorem** formally — if $f:[a,b]\to\mathbb{R}$ is continuous and $f(a)<c<f(b)$, then $\exists x\in(a,b)$ with $f(x)=c$ — and recognize that its PROOF is not new work here, but is exactly `math.real.connectedness`'s own corollary: continuous images of connected sets are connected, and connected subsets of $\mathbb{R}$ are intervals, so $f([a,b])$ must be an interval containing both $f(a)$ and $f(b)$, hence every value between them.
- LO2: APPLY IVT to prove a root EXISTS — e.g. $f(x)=x^3-x-1$ has a root in $(1,2)$ — purely via a sign change ($f(1)<0$, $f(2)>0$), WITHOUT solving for or approximating the root itself, recognizing existence and computation as genuinely separate tasks.
- LO3 (orientation level — full contrast, deferred to the cross-linked child): recognize, without full derivation, that the rigorous connectedness-based proof stands in contrast to the informal "a continuous curve can't jump over a value" picture typically given first in calculus courses — the informal picture is a correct INTUITION but not itself a proof, deferred to `math.calc.ivt`.

## Component 2 — Prerequisite Check

Assumes mastery of `math.real.connectedness` (continuous images of connected sets are connected; connected subsets of $\mathbb{R}$ are exactly the intervals — together the direct proof of IVT) and `math.real.continuity-rigorous` (the $\varepsilon$-$\delta$ definition of continuity this proof's premises rest on).

## Component 3 — Core Explanation

**IVT's proof is not new — it is `math.real.connectedness`'s own corollary, cited rather than re-derived**: `math.real.connectedness` already established two facts: (1) if $f$ is continuous and $S$ is connected, then $f(S)$ is connected; (2) the connected subsets of $\mathbb{R}$ are precisely the intervals. Applying these to $S=[a,b]$ (connected, being an interval) gives that $f([a,b])$ is connected, hence an interval. Since $f(a)$ and $f(b)$ are both in this interval, EVERY value $c$ strictly between them is also in $f([a,b])$ — meaning some $x\in[a,b]$ (in fact $x\in(a,b)$ since $c\ne f(a),f(b)$) satisfies $f(x)=c$. This IS the proof of IVT; this concept's job is to name the theorem formally and show how to USE it, not to re-derive what `math.real.connectedness` already proved.

**Existence is not the same task as computation**: IVT guarantees a root or intermediate value EXISTS, but says nothing about WHERE it is beyond the interval $(a,b)$, nor how to find it. Proving $f(x)=x^3-x-1$ has a root in $(1,2)$ requires only checking the sign change at the endpoints — $f(1)=1-1-1=-1<0$ and $f(2)=8-2-1=5>0$ — and invoking IVT with $c=0$. No algebraic solving, no approximation scheme, is needed for the existence claim itself; those are separate (and generally much harder, or impossible in closed form) tasks.

**Rigor versus the informal picture (orientation level)**: the familiar "a continuous curve can't jump over a value without passing through it" intuition is a genuinely correct MENTAL PICTURE of IVT, but it is not itself a proof — it presupposes exactly what needs justifying (why can't a continuous function skip a value?). The connectedness-based argument above supplies the actual justification, by reducing IVT to a general topological fact about connected sets rather than reasoning informally about curves. Full contrast and calculus-level framing is deferred to `math.calc.ivt`.

## Component 4 — Worked Examples

**Example 1 (LO1 — stating IVT and citing its proof rather than re-deriving, breaking MC-1)**: State IVT for $f(x)=\cos x$ on $[0,\pi]$: $f(0)=1>0$ and $f(\pi)=-1<0$, so for any $c\in(-1,1)$ (in particular $c=0$), IVT guarantees some $x\in(0,\pi)$ with $\cos x=c$. Citing `math.real.connectedness` directly: $f$ continuous + $[0,\pi]$ connected $\Rightarrow f([0,\pi])$ connected $\Rightarrow$ an interval $\Rightarrow$ contains every value between $f(0)$ and $f(\pi)$, including $c=0$ (giving $x=\pi/2$, though IVT itself never needs to name $x$ explicitly). No new proof work is done here — the corollary is simply invoked.

**Example 2 (LO2 — applying IVT to prove root existence without solving, breaking MC-2)**: for $f(x)=x^3-x-1$: $f(1)=1^3-1-1=-1<0$, $f(2)=2^3-2-1=5>0$. Since $f$ is continuous (a polynomial) on $[1,2]$ and $f(1)<0<f(2)$, IVT guarantees some $x\in(1,2)$ with $f(x)=0$ — a root exists in $(1,2)$. This is a COMPLETE, rigorous existence proof; nowhere was the root's actual value computed, approximated, or even estimated more precisely than "somewhere in $(1,2)$" — existence and computation are demonstrated as genuinely separate tasks.

**Example 3 (LO3, orientation level — rigor vs. the informal picture, breaking MC-3)**: the informal claim "a continuous curve from $(1,-1)$ to $(2,5)$ can't jump over $0$ without crossing it" FEELS obviously true, but stating it that way is circular — it just restates IVT's conclusion as a picture, without justifying why continuity forbids such a jump. The connectedness-based proof (Example 1's citation) supplies the actual justification: $f([1,2])$ must be a connected subset of $\mathbb{R}$ (an interval, by `math.real.connectedness`), and an interval containing $-1$ and $5$ cannot skip $0$ by definition of "interval" — the informal picture is a correct intuition pump, but the interval-structure argument is what makes it a proof rather than an assumption. Full development of this contrast, and IVT's calculus-course framing, is deferred to `math.calc.ivt`.

## Component 5 — Teaching Actions

### Teaching Action A01 — IVT's Proof Is Already Done — Cite It, Don't Redo It (Primitive P11: Representation Shift)

State: "you already proved, in `math.real.connectedness`, that continuous images of connected sets are connected, and that connected subsets of $\mathbb{R}$ are intervals — IVT is simply what happens when you apply those two facts to $[a,b]$." Walk Example 1's direct citation.

- **MC-1 hook**: ask "does proving IVT require new argument beyond what `math.real.connectedness` already established?" — a "yes" answer reveals MC-1 (missing that IVT is a direct corollary, not a separately-proved theorem).

### Teaching Action A02 — Existence Without Computation (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: a complete, rigorous existence proof for $f(x)=x^3-x-1$'s root in $(1,2)$ was given with ZERO algebraic solving. State: "IVT proves a root exists without telling you where it is beyond the interval — existence and computation are different tasks, and IVT only ever answers the first."

- **MC-2 hook**: ask "does applying IVT to prove a root exists also require finding or approximating that root's value?" — a "yes" answer reveals MC-2 (missing that IVT's existence claim is complete on its own, with no computation required).

### Teaching Action A03 — A Correct Picture Is Not the Same as a Proof (Primitive P06: Contrast Pair)

Contrast the informal "curve can't jump" picture against the connectedness-based argument (Example 3). State: "the picture is a genuinely correct intuition — but stating 'it can't jump because it's continuous' without justifying why is circular; the connected-subsets-of-$\mathbb{R}$-are-intervals fact is what actually closes that gap."

- **MC-3 hook**: ask "is the informal 'continuous curves can't skip values' picture, by itself, a valid proof of IVT?" — a "yes" answer reveals MC-3 (missing that the picture restates IVT's conclusion rather than justifying it, and that the connectedness argument is what supplies the actual justification).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State IVT formally for a continuous $f:[a,b]\to\mathbb{R}$ with $f(a)<c<f(b)$.
  2. Explain, citing `math.real.connectedness` directly (without re-deriving it), why $f([a,b])$ being connected proves IVT.
  3. Show that $f(x)=x^2-2$ has a root in $(1,2)$ using only a sign check at the endpoints, without solving for the root's value.
  4. Explain what specifically is missing from the informal "a continuous curve can't jump over a value" statement that keeps it from being a rigorous proof on its own.
- **P76 (Transfer Probe, mode = independence)**: "A metal rod of length 1 meter has one end at $30°C$ and the other at $90°C$, with temperature varying continuously along its length, modeled by a continuous function $T:[0,1]\to\mathbb{R}$. (a) Prove, using IVT, that some point on the rod is at exactly $50°C$, citing the connectedness-based justification rather than an informal picture. (b) Explain why this argument proves such a point EXISTS but says nothing about WHERE it is beyond being somewhere on the rod. (c) A colleague claims 'obviously some point is at $50°C$ because temperature can't skip values' — explain precisely what rigorous fact this intuitive claim is silently relying on."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | IVT-ASSUMED-TO-NEED-SEPARATE-PROOF | Believing IVT requires new argument beyond `math.real.connectedness`'s own connectedness-preservation theorem, missing that IVT is a direct corollary of it | Foundational |
| MC-2 | IVT-ASSUMED-TO-REQUIRE-COMPUTATION | Believing an IVT-based existence proof also requires finding or approximating the value it guarantees exists, missing that existence and computation are separate tasks | High |
| MC-3 | INFORMAL-PICTURE-ASSUMED-TO-BE-A-PROOF | Believing the "continuous curve can't jump over a value" picture is itself a valid proof, missing that it restates IVT's conclusion rather than justifying it | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "IVT Assumed to Need Separate Proof") → P41 (detect: ask whether IVT's proof requires new work beyond `math.real.connectedness`) → P64 (conceptual shift: re-walk Example 1's direct citation, re-anchoring on "IVT is what happens when connectedness-preservation is applied to $[a,b]$").
- **B02 (targets MC-2)**: P27 (name it: "IVT Assumed to Require Computation") → P41 (detect: ask whether an IVT existence proof also needs the root's value) → P64 (conceptual shift: re-walk Example 2's zero-computation existence proof, re-anchoring on "existence and computation are separate tasks, and IVT only answers the first").
- **B03 (targets MC-3)**: P27 (name it: "Informal Picture Assumed to Be a Proof") → P41 (detect: ask whether the "curve can't jump" picture is, by itself, a valid proof) → P64 (conceptual shift: re-walk Example 3's circularity diagnosis, re-anchoring on "the connectedness argument is what actually justifies the picture, not the picture itself").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.real.connectedness` (continuous images of connected sets are connected; connected subsets of $\mathbb{R}$ are intervals — together the complete proof this concept cites rather than re-derives) and `math.real.continuity-rigorous` (the $\varepsilon$-$\delta$ continuity definition underlying that proof's premises).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.calc.ivt`, checked via `ls docs/curriculum/blueprints/` and confirmed NOT YET authored. $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 3 with an expert/understand tag supports the "3 TAs + gate" tier, with LO1 kept deliberately LIGHT on derivation (citing rather than re-proving `math.real.connectedness`'s result) and LO2 given full worked computational depth (the concrete root-existence argument), matching the concept's actual scope as a naming-and-application corollary rather than a from-scratch proof.
- **Division of labor**: `math.real.connectedness` owns the actual PROOF machinery (connectedness-preservation under continuous maps; connected subsets of $\mathbb{R}$ are intervals) — its own Example 3 already derived IVT as a direct corollary. This concept deliberately does NOT re-derive that proof; instead it owns (a) formally NAMING and stating IVT as a citable theorem, (b) the APPLICATION skill of using IVT for pure existence arguments without solving, and (c) the rigor-versus-intuition framing, avoiding duplicating `math.real.connectedness`'s own derivation work.
- Example 2's choice of $f(x)=x^3-x-1$ (a cubic with no rational root, so it genuinely CANNOT be solved by elementary factoring) was deliberate, so the existence-without-computation point is not undermined by the root secretly being easy to find directly.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.calc.ivt` confirmed unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already has connectedness-preservation and rigorous continuity; formal statement introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
