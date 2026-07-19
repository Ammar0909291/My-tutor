# Teaching Blueprint: Riemann Surface (`math.cx.riemann-surface`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cx.riemann-surface` |
| name | Riemann Surface |
| domain | Complex Analysis |
| difficulty | research |
| bloom | analyze |
| mastery_threshold | 0.55 → MAMR = ⌈0.55×5⌉ = 3/5 |
| estimated_hours | 10 |
| requires | `math.cx.analytic-continuation`, `math.top.topological-space` |
| unlocks | none |
| cross_links | `math.top.covering-space` (not yet authored at time of writing — see Component 7) |
| CPA_entry_stage | A (Abstract) — research-tier learner already has monodromy from analytic continuation and the general notion of a topological space; the Riemann surface is introduced directly as the resolution |
| description (KG) | A one-dimensional complex manifold; the natural domain for multivalued functions like log z and √z. Riemann surface of log z is an infinite-sheeted helical cover of ℂ\{0}. Compact Riemann surfaces classified by genus. |

## Component 1 — Learning Objectives

- LO1: Recognize the core motivating problem — multivalued functions like $\log z$ (whose value changes by $2\pi i$ after a loop around $0$, per `math.cx.analytic-continuation`'s own monodromy example) and $\sqrt z$ are NOT genuinely single-valued functions on $\mathbb C\setminus\{0\}$ — and recognize a **Riemann surface** as a new domain (a one-dimensional complex manifold) built specifically so these functions BECOME single-valued there.
- LO2: Construct the Riemann surface for $\log z$ as an **infinite-sheeted helical cover** of $\mathbb C\setminus\{0\}$ — each sheet corresponding to adding a multiple of $2\pi i$, stacked so that going around the origin once moves you to the NEXT sheet rather than back to the same point — directly resolving `math.cx.analytic-continuation`'s monodromy issue as a domain-construction problem, not a paradox.
- LO3 (orientation level — full topological treatment deferred to the cross-linked child): recognize that COMPACT Riemann surfaces are classified by **genus** (sphere = genus $0$, torus = genus $1$, etc.), and recognize **branch points** (like $z=0$ for $\sqrt z$, where sheets genuinely merge after finitely many loops) as a distinct phenomenon from $\log z$'s never-closing infinite helical structure — deferred to `math.top.covering-space` for the full topological framework.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cx.analytic-continuation` (the monodromy phenomenon: continuing $\log z$ around a loop enclosing the origin returns to the same point with a different value, $2\pi i$ added) and `math.top.topological-space` (the general notion of a space with open sets, needed to make sense of a "one-dimensional complex manifold").

## Component 3 — Core Explanation

**The multivaluedness problem, reframed as a domain problem**: `math.cx.analytic-continuation` showed that continuing $\log z$ around a loop enclosing $0$ returns to the SAME point with a DIFFERENT value — $\log z$ genuinely fails to be single-valued on $\mathbb C\setminus\{0\}$. Rather than treating this as an unfortunate quirk to patch with an ad-hoc convention (like always choosing a "principal branch"), it signals that $\mathbb C\setminus\{0\}$ is simply the WRONG domain for $\log z$ to live on as a single-valued function — a genuinely different, larger domain is needed.

**Building the helical surface**: stack infinitely many copies ("sheets") of $\mathbb C\setminus\{0\}$, indexed by integers $n$, gluing sheet $n$ to sheet $n+1$ along a cut (say the positive real axis) so that crossing the cut counterclockwise moves you from sheet $n$ to sheet $n+1$ — producing a connected, helical (spiral-staircase-like) surface. Defining $\log z=\ln|z|+i(\theta+2\pi n)$ on sheet $n$ (with $\theta\in(0,2\pi)$ the angle on that copy) makes $\log z$ genuinely SINGLE-VALUED on this new surface: going around the origin once moves you to sheet $n+1$ — a DIFFERENT point on the surface — with its own single, well-defined log-value.

**Branch points and genus (orientation level)**: unlike $\log z$'s infinite, never-closing structure, $\sqrt z$'s surface has exactly TWO sheets that genuinely MERGE at $z=0$ (going around the origin twice returns to the starting value) — $z=0$ is a **branch point**, where sheets meet after finitely many loops rather than stacking forever. COMPACT Riemann surfaces (closed, bounded, unlike $\log z$'s infinite surface) are classified by **genus** — informally, the number of "holes" (sphere = genus $0$, torus = genus $1$, and so on) — a deep classification theorem named here without derivation, with the full topological machinery underlying both constructions (covering spaces) deferred to `math.top.covering-space`.

## Component 4 — Worked Examples

**Example 1 (LO1 — the multivaluedness problem, reusing analytic-continuation's own monodromy example, breaking MC-1)**: recalling `math.cx.analytic-continuation`'s own Example 3, continuing $\log z$ around a loop enclosing the origin returns to the SAME point $z=1$ but with value $2\pi i$ instead of $0$ — $\log z$ is not single-valued on $\mathbb C\setminus\{0\}$. This is not a bug to patch case-by-case; it is a signal that $\mathbb C\setminus\{0\}$ is genuinely the wrong domain for $\log z$ to be treated as an ordinary single-valued function.

**Example 2 (LO2 — constructing the helical surface, breaking MC-2)**: build the new domain described in Component 3 — infinitely many sheets of $\mathbb C\setminus\{0\}$, glued along a cut so crossing it moves between adjacent sheets, with $\log z=\ln|z|+i(\theta+2\pi n)$ defined on sheet $n$. Now $\log z$ genuinely IS single-valued: going around the origin once moves you from sheet $n$ to sheet $n+1$ — a genuinely different point on the surface — with a genuinely different (single) log-value there. This resolves the monodromy issue completely, not by ignoring it, but by correctly identifying $\log z$'s true domain.

**Example 3 (LO3, orientation level — branch points vs. infinite structure, breaking MC-3)**: unlike $\log z$, $\sqrt z$ has exactly TWO sheets: going around the origin once gives $\sqrt z\cdot e^{i\cdot2\pi/2}=\sqrt z\cdot e^{i\pi}=-\sqrt z$ (a DIFFERENT value — the sheets haven't closed up yet), but going around TWICE gives $\sqrt z\cdot e^{i\cdot4\pi/2}=\sqrt z\cdot e^{2\pi i}=\sqrt z$ (back to the ORIGINAL value) — so $z=0$ is a **branch point** where the two sheets genuinely merge after exactly two loops, a fundamentally different structure from $\log z$'s infinite, never-closing helix. Separately, COMPACT Riemann surfaces are classified by **genus** — a deep classification theorem, named here only, with the full covering-space framework underlying both examples developed in `math.top.covering-space`.

## Component 5 — Teaching Actions

### Teaching Action A01 — Multivaluedness Signals the Wrong Domain, Not a Bug to Patch (Primitive P11: Representation Shift)

State: "$\log z$ isn't broken on $\mathbb C\setminus\{0\}$ — it's simply living on the wrong domain. A Riemann surface is the CORRECT domain, built specifically to make it single-valued." Work Example 1's reframing of the monodromy issue.

- **MC-1 hook**: ask "is $\log z$'s multivaluedness best handled by an ad-hoc convention like 'always pick the principal branch,' or does it signal something deeper about the function's true domain?" — an "ad-hoc convention" answer reveals MC-1 (missing that the multivaluedness signals the domain itself needs to change).

### Teaching Action A02 — The Helical Surface Is a Genuine New Geometric Domain (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the concrete gluing construction produces an honest, rigorous new space on which $\log z$ is provably single-valued — not a notational trick. State: "this isn't bookkeeping — it's a genuinely new geometric object, and $\log z$ becomes an ordinary, well-behaved single-valued function once you're standing on it."

- **MC-2 hook**: ask "is the Riemann surface construction just a notational convenience for tracking which branch of $\log z$ you're using, rather than an actual new geometric space?" — a "yes" answer reveals MC-2 (missing that the Riemann surface is a genuine, rigorous new domain, not mere notation).

### Teaching Action A03 — Branch Points Differ Fundamentally From Log z's Infinite Structure (Primitive P06: Contrast Pair)

Contrast $\log z$'s infinite, never-closing helical structure against $\sqrt z$'s two-sheeted surface, which genuinely CLOSES UP after exactly two loops (a branch point at $z=0$). State: "not every multivalued function needs an infinite tower of sheets — some, like $\sqrt z$, have a finite number of sheets that merge back together after a specific number of loops."

- **MC-3 hook**: ask "do all multivalued functions require the same kind of infinite, never-closing Riemann surface that $\log z$ does?" — a "yes" answer reveals MC-3 (missing that branch points produce genuinely different, finite-sheeted structures).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Explain, using `math.cx.analytic-continuation`'s own monodromy example, why $\log z$ cannot be treated as an ordinary single-valued function on $\mathbb C\setminus\{0\}$.
  2. Explain how the helical Riemann surface construction (stacking infinitely many sheets) makes $\log z$ single-valued, referencing what happens when you cross the branch cut.
  3. Verify that going around the origin TWICE with $\sqrt z$ returns to the starting value (a computation confirming $\sqrt z$ has exactly $2$ sheets, not infinitely many).
  4. Explain the difference between a branch point (like $z=0$ for $\sqrt z$) and $\log z$'s own infinite helical structure, in terms of what happens after finitely many loops around the origin.
- **P76 (Transfer Probe, mode = independence)**: "Consider $f(z)=z^{1/3}$ (the cube root function) on $\mathbb C\setminus\{0\}$. (a) Determine how many times you must loop around the origin before $f(z)$ returns to its original value (i.e., how many 'sheets' this function's Riemann surface has), using the same reasoning style as this lesson's $\sqrt z$ analysis. (b) Explain whether $z=0$ is a branch point for $f(z)=z^{1/3}$, and if so, contrast its structure with $\log z$'s own infinite helical structure. (c) Explain, in your own words, why building the correct Riemann surface for a multivalued function is a more honest mathematical solution than simply picking a 'principal branch' convention and ignoring the rest of the surface."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 3/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | MULTIVALUEDNESS-TREATED-AS-PATCHABLE-QUIRK | Believing a multivalued function's misbehavior should be patched with an ad-hoc convention (like a principal branch), missing that it signals the function's true domain must genuinely change | Foundational |
| MC-2 | RIEMANN-SURFACE-ASSUMED-MERELY-NOTATIONAL | Believing the Riemann surface construction is a notational bookkeeping trick, missing that it is a genuine, rigorous new geometric domain on which the function is honestly single-valued | High |
| MC-3 | ALL-MULTIVALUED-FUNCTIONS-ASSUMED-INFINITE-SHEETED | Believing every multivalued function requires an infinite, never-closing Riemann surface like $\log z$'s, missing that branch points (like $\sqrt z$'s) produce genuinely different, finite-sheeted structures | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Multivaluedness Treated as Patchable Quirk") → P41 (detect: ask whether an ad-hoc principal-branch convention is the right way to handle $\log z$'s multivaluedness) → P64 (conceptual shift: re-walk Example 1's reframing, re-anchoring on "the multivaluedness signals the domain itself must change").
- **B02 (targets MC-2)**: P27 (name it: "Riemann Surface Assumed Merely Notational") → P41 (detect: ask whether the Riemann surface is just a bookkeeping convenience) → P64 (conceptual shift: re-walk Example 2's concrete gluing construction, re-anchoring on "this is a genuine new geometric domain, not notation").
- **B03 (targets MC-3)**: P27 (name it: "All Multivalued Functions Assumed Infinite-Sheeted") → P41 (detect: ask whether every multivalued function needs an infinite Riemann surface like $\log z$'s) → P64 (conceptual shift: re-walk Example 3's $\sqrt z$ branch-point analysis, re-anchoring on "branch points produce finite structures that genuinely close up").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cx.analytic-continuation` (the monodromy phenomenon this concept's entire motivation directly resolves) and `math.top.topological-space` (the general notion of a space, needed to make sense of a "one-dimensional complex manifold").
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.top.covering-space`, checked via `ls docs/curriculum/blueprints/` at the time of authoring THIS blueprint and confirmed not yet authored. $P76_{mode}=$ **independence**. (Note: `math.top.covering-space` is authored later in this same batch, and its own blueprint engages this concept as a genuine cross-link probe, directly formalizing the "evenly covered"/universal-cover framework underlying both the log z and √z constructions built here.)

## Component 8 — Teaching Notes

- estimated_hours = 10 with a research/analyze tag and a low mastery_threshold (0.55, MAMR = 3/5) supports the full "3 TAs + gate" tier at a somewhat compact conceptual depth, with LO1 and LO2 at full concrete depth (the monodromy problem and the explicit helical construction) and LO3 kept orientation-level, appropriately surveying branch points and genus without developing the covering-space machinery that properly formalizes them.
- **Division of labor**: `math.cx.analytic-continuation` owns the monodromy PHENOMENON (the observation that continuing $\log z$ around a loop changes its value); this concept owns the RESOLUTION (constructing the correct domain on which the function is genuinely single-valued), deliberately reusing that concept's own worked example rather than introducing an unrelated new multivalued function for LO1.
- Example 3's introduction of $\sqrt z$ alongside $\log z$ was deliberately chosen to set up a genuine contrast (infinite vs. finite sheet structure) rather than treating Riemann surfaces as a monolithic single construction — this also directly seeds the P76 transfer probe's cube-root generalization and the batch's own `math.top.covering-space` cross-link probe.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.top.covering-space` unauthored at time of writing → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.55×5⌉=3) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: research-tier learner already has monodromy and topological spaces; resolution introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
