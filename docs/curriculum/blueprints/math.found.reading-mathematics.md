# Teaching Blueprint: Reading Mathematics (`math.found.reading-mathematics`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.reading-mathematics` |
| name | Reading Mathematics |
| domain | Foundations |
| difficulty | foundational |
| bloom | understand |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.found.mathematical-notation`, `math.found.mathematical-symbols` |
| unlocks | `math.found.proof` |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | The skill of parsing and interpreting formal mathematical statements, definitions, theorems, and proofs accurately. |
| related | `math.found.writing-mathematics` |
| aliases | interpreting mathematical text, mathematical reading comprehension |

## Component 1 — Learning Objectives

- LO1: Parse a formal mathematical statement into its logical components (quantifiers, conditions, conclusion) and restate it accurately in plain natural language.
- LO2: Correctly determine the SCOPE of nested quantifiers in a compound statement — which variable each quantifier binds, and in what order they apply.
- LO3: Read a stated definition or theorem precisely enough to identify exactly what it does and does NOT claim, resisting the urge to "fill in" plausible-sounding but unstated content.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.mathematical-notation` and `math.found.mathematical-symbols` (the symbolic vocabulary this concept teaches how to PARSE fluently, as opposed to merely recognizing symbols in isolation).

## Component 3 — Core Explanation

**Reading mathematics** is the skill of accurately parsing formal statements — definitions, theorems, and proofs — into their precise logical meaning, rather than skimming for a vague gist. This requires: identifying every quantifier and its SCOPE (which variable it binds and over what range), tracking logical connectives precisely (as in `math.found.mathematical-symbols`), and resisting the temptation to substitute a plausible paraphrase for the statement's EXACT content.

A common failure mode is misreading the ORDER of nested quantifiers: "$\forall x\,\exists y, P(x,y)$" (for every $x$ there is SOME $y$, possibly depending on $x$) is a fundamentally different claim from "$\exists y\,\forall x, P(x,y)$" (there is ONE $y$ that works for every $x$) — swapping the order changes the statement's meaning entirely, not just its phrasing.

## Component 4 — Worked Examples

**Example 1 (LO1 — parsing a formal statement into plain language)**: Parse "$\forall\epsilon>0,\exists\delta>0$ such that $|x-a|<\delta\Rightarrow|f(x)-f(a)|<\epsilon$" (the formal definition of continuity at $a$, offered here purely as a parsing exercise, not requiring calculus background): reading left to right, "for every positive $\epsilon$, there exists a positive $\delta$ [that may depend on $\epsilon$], such that whenever $x$ is within $\delta$ of $a$, $f(x)$ is within $\epsilon$ of $f(a)$." The parsing skill is tracking each quantifier's scope and the final conditional's hypothesis/conclusion structure, independent of whether the reader yet understands "continuity" as a topic.

**Example 2 (LO2 — quantifier order changes meaning, breaking MC-1)**: "$\forall x\in\mathbb{R}\,\exists y\in\mathbb{R}, y>x$" reads "for every real $x$, there is SOME real $y$ greater than it" — TRUE (just take $y=x+1$, a DIFFERENT $y$ for each $x$). Swapping the order: "$\exists y\in\mathbb{R}\,\forall x\in\mathbb{R}, y>x$" reads "there is ONE real $y$ greater than EVERY real $x$" — FALSE (no single $y$ exceeds all reals, since $y+1>y$). The two statements use the exact same symbols and predicate, differing only in quantifier ORDER, yet have opposite truth values.

**Example 3 (LO3 — reading exactly what's claimed, not more, breaking MC-2)**: The definition "a function $f$ is **injective** if $f(a)=f(b)$ implies $a=b$" claims ONLY that DIFFERENT inputs give DIFFERENT outputs — it says NOTHING about whether every possible output is achieved (that would be a separate property, surjectivity). A student who reads "injective" as somehow also implying "covers everything" is importing unstated content the definition never claimed.

## Component 5 — Teaching Actions

### Teaching Action A01 — Parse Quantifier Scope and Structure Explicitly (Primitive P64: Conceptual Shift)

Work Example 1, underlining or bracketing each quantifier and its bound variable before attempting a plain-language restatement, making the parsing process visible and deliberate rather than an intuitive leap.

- **MC-1 hook**: present both orderings from Example 2 side by side and ask whether they mean the same thing (revealing MC-1: treating quantifier order as a stylistic/interchangeable choice rather than a meaning-determining structural feature).

### Teaching Action A02 — Read Exactly What Is Claimed, Not What Seems Plausible (Primitive P06: Contrast Pair)

Work Example 3, contrasting "what the definition of injective literally says" against "what a student might assume it implies (covering all outputs)," making the gap between the two explicit. State the rule: "when reading a formal definition or theorem, mentally list ONLY the conditions actually stated — resist adding conditions that merely 'feel like they should be true' alongside it."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Parse "$\exists x\in\mathbb{N}, x^2=x$" into plain language and determine its truth value (true — $x=0$ or $x=1$ both work).
  2. Given "$\forall x\,\forall y, x+y=y+x$" and "$\exists x\,\exists y, x+y=y+x$," explain why swapping two SAME-type quantifiers ($\forall\forall$ or $\exists\exists$) does NOT change meaning, unlike swapping $\forall$ with $\exists$.
  3. Given the definition "a set $A$ is **bounded above** if there exists $M$ such that $x\le M$ for all $x\in A$," state precisely what this claims and identify one thing it does NOT claim (e.g. it says nothing about a bound below).
  4. Parse a short theorem statement with one nested implication and one quantifier, restating it accurately without adding unstated content.
- **P76 (Transfer Probe, mode = independence)**: "A course syllabus states: '$\forall$ students who submit all homework on time, a bonus point is awarded $\Rightarrow$ [a separate clause reads] $\exists$ at least one bonus opportunity for every student.' (a) Parse each of the two clauses separately, identifying exactly what each promises. (b) A student argues the two clauses together guarantee 'every student who is late even once still gets some bonus.' Using this lesson's precise-reading principle, explain whether the syllabus's stated wording actually supports this conclusion, or whether the student is importing unstated content."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | QUANTIFIER-ORDER-TREATED-AS-INTERCHANGEABLE | Believing $\forall x\,\exists y$ and $\exists y\,\forall x$ mean the same thing, missing that swapping mixed quantifier order changes the statement's truth conditions | Foundational |
| MC-2 | UNSTATED-CONTENT-ASSUMED-FROM-A-DEFINITION | Reading additional, plausible-sounding conditions into a definition or theorem beyond what is literally stated | Foundational |
| MC-3 | STATEMENT-PARAPHRASED-LOOSELY-LOSING-LOGICAL-STRUCTURE | Restating a formal statement in vague natural language that drops the precise conditional/quantifier structure, producing an ambiguous or inaccurate paraphrase | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Quantifier Order Treated as Interchangeable") → P41 (detect: present Example 2's two orderings and ask if they're equivalent) → P64 (conceptual shift: re-derive both truth values explicitly, showing the "one $y$ for all $x$" version genuinely fails while the "different $y$ per $x$" version holds).
- **B02 (targets MC-2)**: P27 ("Unstated Content Assumed from Definition") → P41 (detect: present Example 3's injective definition and ask whether it implies surjectivity) → P64 (conceptual shift: re-read the definition word by word, confirming it says nothing about outputs being covered).
- **B03 (targets MC-3)**: P27 ("Statement Paraphrased Loosely") → P41 (detect: review a submitted plain-language restatement for dropped quantifiers or vague connectives) → P64 (conceptual shift: re-parse the original statement bracket by bracket, per Teaching Action A01, before re-attempting the restatement).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.mathematical-notation`, `math.found.mathematical-symbols`.
- **Unlocks**: `math.found.proof` (reading formal statements accurately is a prerequisite for constructing and verifying proofs about them).
- **Related**: `math.found.writing-mathematics` (the complementary production-side skill, requiring this concept as its own prerequisite).

## Component 8 — Teaching Notes

- estimated_hours = 4 reflects that this concept trains a genuinely distinct comprehension skill (parsing precision) atop the already-mastered symbolic vocabulary, comparable in scope to `math.found.mathematical-modeling`'s translation skill but in the reverse direction (formal-to-plain rather than plain-to-formal).
- MC-1 was ranked most severe because quantifier-order confusion is a well-documented, persistent source of error even among students who have otherwise mastered individual symbols — it specifically targets the STRUCTURAL relationship between symbols, not the symbols themselves.
- The continuity-definition parsing exercise (Example 1) was deliberately chosen despite requiring no calculus background, specifically to demonstrate that formal parsing is a general-purpose skill separable from topic-specific content knowledge — students can parse the quantifier structure correctly without yet understanding what "continuity" means as a mathematical idea.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.mathematical-notation`, `math.found.mathematical-symbols`) |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.found.proof`) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
