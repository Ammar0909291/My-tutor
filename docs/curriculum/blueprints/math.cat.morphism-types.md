# Teaching Blueprint: Types of Morphisms (`math.cat.morphism-types`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cat.morphism-types` |
| name | Types of Morphisms |
| domain | Category Theory |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.cat.category` |
| unlocks | none |
| cross_links | `math.abst.group-isomorphism` (not yet authored — see Component 7) |
| CPA_entry_stage | A (Abstract) — direct definitions, grounded immediately in the familiar `Set` category |
| description (KG) | Monomorphism (mono): gf=hf ⟹ g=h (left cancellable; generalizes injective). Epimorphism (epi): fg=fh ⟹ g=h (right cancellable; generalizes surjective). Isomorphism: morphism with a two-sided inverse. Endomorphism: f:A→A. Automorphism: isomorphism A→A. |

## Component 1 — Learning Objectives

- LO1: Define a **monomorphism** $f:A\to B$ as **left-cancellable** ($f\circ g = f\circ h \implies g=h$ for all morphisms $g,h:C\to A$) and an **epimorphism** as **right-cancellable** ($g\circ f = h\circ f \implies g=h$ for all $g,h:B\to C$), and correctly verify each property for a specific morphism in a specific category.
- LO2: Recognize that in $\mathbf{Set}$, monomorphism coincides with **injective** and epimorphism coincides with **surjective**, while explicitly recognizing that this coincidence is a special fact about $\mathbf{Set}$ (and similar "concrete" categories), NOT part of the general categorical definitions themselves — which are stated purely in terms of cancellation, with no reference to elements.
- LO3: Define an **isomorphism** as a morphism possessing a genuine two-sided inverse, and distinguish it from "merely mono AND epi" using a category where a mono-and-epi morphism is NOT an isomorphism; define **endomorphism** ($f:A\to A$) and **automorphism** (an isomorphism $A\to A$) and correctly classify given morphisms into these categories.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cat.category` (objects, morphisms, composition, identity morphisms, and the category axioms).

## Component 3 — Core Explanation

A **monomorphism** ("mono") $f:A\to B$ is **left-cancellable**: for any object $C$ and any pair of morphisms $g,h:C\to A$, if $f\circ g=f\circ h$ then $g=h$. Intuitively, $f$ "doesn't collapse distinct incoming information" — post-composing with $f$ never merges two genuinely different morphisms into $A$.

An **epimorphism** ("epi") $f:A\to B$ is **right-cancellable**: for any object $C$ and any pair $g,h:B\to C$, if $g\circ f = h\circ f$ then $g=h$. Intuitively, $f$ "carries enough information forward" — pre-composing with $f$ never merges two genuinely different morphisms out of $B$.

**Element-free definitions**: crucially, neither definition mentions elements of $A$ or $B$ at all — they are stated purely in terms of morphisms and composition, making them meaningful in ANY category, including categories whose objects are not sets with elements (e.g. categories of algebraic structures viewed abstractly, or more exotic categories with no underlying-set functor at all).

**Coincidence in $\mathbf{Set}$ (a special fact, not a definitional identity)**: in the category $\mathbf{Set}$, one can PROVE that $f$ is mono iff $f$ is injective (as a function), and $f$ is epi iff $f$ is surjective. This is a genuine theorem about $\mathbf{Set}$ specifically — derived from the categorical definitions by choosing clever test morphisms $g,h$ (e.g. from a one-point set, or from $B$ itself) — not a restatement of the categorical definitions, which say nothing about elements.

**Isomorphism, endomorphism, automorphism**: $f:A\to B$ is an **isomorphism** if there exists $f^{-1}:B\to A$ with $f^{-1}\circ f=\mathrm{id}_A$ and $f\circ f^{-1}=\mathrm{id}_B$ (a genuine two-sided inverse, not merely "invertible in some weaker sense"). Every isomorphism is both mono and epi, but the **converse fails in general** — a morphism can be simultaneously mono and epi without possessing an inverse (a category-dependent phenomenon). An **endomorphism** is any morphism $f:A\to A$ (same source and target, no invertibility required); an **automorphism** is specifically an isomorphism $A\to A$.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying mono/epi via cancellation, in $\mathbf{Set}$)**: Let $f:\{1,2\}\to\{a,b,c\}$, $f(1)=a,f(2)=b$ (an injective, non-surjective function). Verify mono directly: for any $g,h:C\to\{1,2\}$ with $f\circ g=f\circ h$, since $f$ is injective as a function, $f(g(c))=f(h(c))$ forces $g(c)=h(c)$ for every $c\in C$, so $g=h$ — mono confirmed via the cancellation property, not merely asserted from injectivity. Is $f$ epi? Take $g,h:\{a,b,c\}\to\{0,1\}$ with $g(c)=0,h(c)=1$ but $g(a)=h(a)=0,g(b)=h(b)=0$ — then $g\circ f = h\circ f$ (both send $1\mapsto0,2\mapsto0$) yet $g\neq h$ (they disagree at $c$, which $f$ never hits) — cancellation FAILS, so $f$ is NOT epi, exactly matching its failure to be surjective.

**Example 2 (LO2 — the coincidence, and why it's a theorem not a tautology, breaking MC-1)**: To prove "mono $\iff$ injective" in $\mathbf{Set}$ (the $\Leftarrow$ direction, injective $\implies$ mono, was essentially shown in Example 1's method). For $\Rightarrow$: suppose $f:A\to B$ is mono but (for contradiction) NOT injective, so $f(a_1)=f(a_2)$ for some $a_1\neq a_2\in A$. Define $g,h:\{*\}\to A$ (from a one-point set) by $g(*)=a_1,h(*)=a_2$. Then $f\circ g=f\circ h$ (both equal $f(a_1)=f(a_2)$) but $g\neq h$ (since $a_1\neq a_2$) — this CONTRADICTS $f$ being mono. So $f$ must be injective. This proof genuinely uses the structure of $\mathbf{Set}$ (the existence of a one-point set, and functions out of it corresponding exactly to elements) — a category lacking such objects would need an entirely different argument, or the coincidence might fail outright.

**Example 3 (LO3 — mono-and-epi without being an isomorphism, breaking MC-2)**: In the category of rings (with ring homomorphisms as morphisms), the inclusion $\iota:\mathbb{Z}\hookrightarrow\mathbb{Q}$ is both mono and epi (mono: injective as a function, hence left-cancellable by an argument like Example 2's; epi: a genuine but less obvious ring-theoretic fact — any two ring homomorphisms out of $\mathbb{Q}$ agreeing on $\mathbb{Z}$ must agree everywhere, since every rational is a ratio of integers and ring homomorphisms are forced to respect division once denominators are invertible). Yet $\iota$ has NO inverse ring homomorphism $\mathbb{Q}\to\mathbb{Z}$ (there is no ring homomorphism $\mathbb{Q}\to\mathbb{Z}$ sending $1/2$ to anything consistent, since $2\cdot(1/2)=1$ forces the image of $1/2$ to be a rational inverse of 2 inside $\mathbb{Z}$, which doesn't exist) — so $\iota$ is mono and epi but genuinely NOT an isomorphism, refuting the assumption that "mono + epi = iso" holds in every category.

## Component 5 — Teaching Actions

### Teaching Action A01 — Cancellation-Based Definitions via `Set` (Primitive P11: Representation Shift)

State the element-free cancellation definitions directly, then immediately ground them: "in the familiar category $\mathbf{Set}$, we can PROVE these coincide with injective/surjective — but the definitions themselves never mention elements at all." Work Example 1's direct cancellation verification for both mono and (failed) epi.

Shift representation to Example 2's proof that mono $\implies$ injective in $\mathbf{Set}$, emphasizing the one-point-set trick as the specific piece of $\mathbf{Set}$'s structure the proof exploits.

- **MC-1 hook**: ask "is 'monomorphism means injective' true by DEFINITION, or is it something that has to be PROVEN, and if so, in which categories?" — an answer of "by definition, always" reveals MC-1 (conflating the general cancellation definition with the $\mathbf{Set}$-specific coincidence theorem).

### Teaching Action A02 — Mono+Epi Without Isomorphism (Primitive P16: Counterexample)

Present Example 3's ring-inclusion counterexample directly: $\iota:\mathbb{Z}\hookrightarrow\mathbb{Q}$ is mono and epi, yet has no inverse ring homomorphism. Walk through WHY no inverse can exist (the $1/2$ argument), making the failure concrete rather than asserted.

- **MC-2 hook**: ask "if a morphism is both mono and epi, must it be an isomorphism?" — an answer of "yes" reveals MC-2 (over-generalizing from $\mathbf{Set}$, where mono+epi actually DOES imply bijective-hence-isomorphism, to categories in general, where it does not).

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Let $f:\{1,2,3\}\to\{a,b\}$, $f(1)=f(2)=a,f(3)=b$ (surjective, not injective). Determine whether $f$ is mono, epi, both, or neither, justifying via cancellation (not just "it looks surjective").
  2. Classify $\mathrm{id}_A:A\to A$ — is it mono? epi? an isomorphism? an endomorphism? an automorphism? Justify each.
  3. In $\mathbf{Set}$, explain (informally, referencing Example 2's argument) why every injective function is automatically mono.
  4. Give an example (can be Example 3's, restated in your own words, or a new one) of a morphism that is mono and epi but not an isomorphism, and explain specifically what property fails.
- **P76 (Transfer Probe, mode = cross-link probe against `math.abst.group-isomorphism`, not yet authored → treated as independence for now)**: "Recall (from general algebra) that a group isomorphism is a bijective group homomorphism. (a) Using this lesson's categorical definitions, explain why a bijective group homomorphism is automatically both mono and epi when viewed as a morphism in the category of groups. (b) Explain why, unlike the ring-inclusion example from this lesson, a group homomorphism that is mono and epi in the category of groups CAN be shown to always be an isomorphism (this is a genuine fact about groups specifically, worth noting as a contrast to Example 3's ring counterexample) — i.e., different categories can behave differently regarding whether 'mono + epi' implies 'isomorphism.'"
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | MONO-EPI-CONFLATED-WITH-DEFINITIONAL-INJECTIVE-SURJECTIVE | Believing "monomorphism = injective" and "epimorphism = surjective" are true by definition in every category, rather than a provable, $\mathbf{Set}$-specific (or concrete-category-specific) theorem | Foundational |
| MC-2 | MONO-AND-EPI-ASSUMED-TO-IMPLY-ISOMORPHISM | Believing a morphism that is both mono and epi must automatically be an isomorphism in every category, over-generalizing from $\mathbf{Set}$ where this happens to hold | Foundational |
| MC-3 | ENDOMORPHISM-CONFLATED-WITH-AUTOMORPHISM | Believing every endomorphism ($f:A\to A$) is automatically an automorphism (an isomorphism $A\to A$), missing that endomorphism only requires matching source/target, with no invertibility implied | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Mono/Epi Conflated with Definitional Injective/Surjective") → P41 (detect: ask whether "mono = injective" holds by definition or requires proof) → P64 (conceptual shift: re-walk Example 2's one-point-set proof, showing the coincidence is derived, not assumed).
- **B02 (targets MC-2)**: P27 (name it: "Mono-and-Epi Assumed to Imply Isomorphism") → P41 (detect: present $\iota:\mathbb{Z}\hookrightarrow\mathbb{Q}$ and ask if it's an isomorphism, given it is mono and epi) → P64 (conceptual shift: re-walk Example 3's non-invertibility argument directly).
- **B03 (targets MC-3)**: P27 (name it: "Endomorphism Conflated with Automorphism") → P41 (detect: ask whether a non-invertible endomorphism, e.g. $f:\mathbb{Z}\to\mathbb{Z},f(n)=2n$ under addition, viewed as a morphism, is automatically an automorphism) → P64 (conceptual shift: re-anchor on "endomorphism only constrains source=target; automorphism additionally requires a two-sided inverse").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cat.category` (objects, morphisms, composition, and identity — the basic vocabulary in which mono/epi/iso are all defined).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.abst.group-isomorphism` as a cross-link, checked via `ls docs/curriculum/blueprints/` and confirmed NOT YET authored. $P76_{mode}=$ **independence** (with the P76 probe above still engaging the group-isomorphism concept directly at the level of general algebraic knowledge, since the connection is pedagogically central even before that Blueprint exists — consistent with this corpus's established rule that transfer probes may reference a cross-linked concept without requiring its Blueprint to already exist).

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/understand tag places this at the "2 main TAs + gate" tier — A01 (cancellation definitions grounded in `Set`, establishing the coincidence-is-a-theorem distinction) and A02 (the mono+epi-without-isomorphism counterexample) jointly cover all three LOs, with LO3's endomorphism/automorphism distinction folded into the gate's problem set (P77 #2) rather than requiring a dedicated third TA, since it is a comparatively lightweight vocabulary distinction once mono/epi/iso are solid.
- The ring-inclusion counterexample ($\mathbb{Z}\hookrightarrow\mathbb{Q}$) was chosen over more exotic category-theoretic counterexamples (e.g. in $\mathbf{Top}$ or $\mathbf{Ring}$ with more esoteric morphisms) because both $\mathbb{Z}$ and $\mathbb{Q}$ are already fully familiar objects to any student reaching expert-tier category theory, keeping the counterexample's NOVELTY isolated to the categorical point being made (mono+epi $\not\Rightarrow$ iso) rather than requiring the student to also learn a new mathematical object.
- The group-isomorphism cross-link probe was deliberately framed to ALSO surface a genuine, separate fact (mono+epi DOES imply isomorphism in the category of groups specifically) as a direct contrast to Example 3's ring counterexample — reinforcing LO2/MC-2's core lesson that whether "mono+epi ⟹ iso" holds is a category-by-category fact, never a universal law, while giving the student a second concrete case (this time a positive one) to calibrate against.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.cat.category`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.abst.group-isomorphism` confirmed unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract, grounded directly in `Set`) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
