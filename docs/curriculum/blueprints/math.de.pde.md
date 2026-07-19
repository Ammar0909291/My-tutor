# Teaching Blueprint: Partial Differential Equation (`math.de.pde`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.pde` |
| name | Partial Differential Equation |
| domain | Differential Equations |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.de.ode`, `math.calc.partial-derivatives` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — a familiar physical scenario (heat spreading along a rod) before the formal PDE definition |
| description (KG) | An equation involving partial derivatives of an unknown function of several variables. Classified (for linear second-order) as elliptic, parabolic, or hyperbolic based on the discriminant of the principal part. |

## Component 1 — Learning Objectives

- LO1: Define a **partial differential equation (PDE)** as an equation involving an unknown function of **two or more** independent variables and its **partial derivatives** — directly contrasted with an ODE's single-variable unknown function, extending `math.de.ode`'s framework by adding multiple independent variables (`math.calc.partial-derivatives`'s territory).
- LO2: Apply the discriminant-based classification for **linear second-order** PDEs into **elliptic**, **parabolic**, and **hyperbolic** types (using the discriminant of the principal part, $B^2-4AC$ for a PDE of the general form $Au_{xx}+Bu_{xy}+Cu_{yy}+\cdots=0$), at an orientation level: correctly classify canonical named examples (Laplace's equation as elliptic, the heat equation as parabolic, the wave equation as hyperbolic) rather than deriving full solution theory for each type.
- LO3: Recognize, at an orientation level (per this corpus's established precedent for large-scope research/expert-tier concepts), that each PDE classification corresponds to a qualitatively different kind of physical behavior — elliptic to equilibrium/steady-state phenomena, parabolic to diffusion/smoothing-over-time phenomena, hyperbolic to wave propagation phenomena — directly refuting the misconception that PDE classification is a purely formal/algebraic label with no connection to the physical behavior of solutions.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.ode` (an ODE relates an unknown function of ONE variable to its derivatives; order/degree; general vs. particular solutions) and `math.calc.partial-derivatives` (computing $\partial f/\partial x$, holding other variables fixed, as the rate of change in one coordinate direction).

## Component 3 — Core Explanation

**PDE, defined by extending ODE to multiple variables**: while an ODE relates an unknown function $y(t)$ of one variable to its ordinary derivatives $y',y'',\dots$, a **PDE** relates an unknown function of **two or more** variables, e.g. $u(x,t)$, to its **partial** derivatives $u_x, u_t, u_{xx}, u_{xt},$ etc. This is the direct generalization suggested by combining the two prerequisites: same idea (equation relating a function to its derivatives), but now the function depends on several inputs and the derivatives must specify which variable they're taken with respect to.

**Classification of linear second-order PDEs (orientation level)**: for a linear second-order PDE in two variables of the general form $Au_{xx}+Bu_{xy}+Cu_{yy}+(\text{lower-order terms})=0$, the **discriminant** $B^2-4AC$ (directly analogous to the discriminant of a quadratic equation, or of a conic section $Ax^2+Bxy+Cy^2=\cdots$) classifies the equation into one of three types:
- **Elliptic** ($B^2-4AC<0$): the canonical example is **Laplace's equation**, $u_{xx}+u_{yy}=0$ (here $A=1,B=0,C=1$, so $B^2-4AC=-4<0$).
- **Parabolic** ($B^2-4AC=0$): the canonical example is the **heat equation**, $u_t = u_{xx}$ (rewritten to match the general form, this has a degenerate discriminant).
- **Hyperbolic** ($B^2-4AC>0$): the canonical example is the **wave equation**, $u_{tt}=u_{xx}$ (here the discriminant works out positive).

*(Per this corpus's established precedent for large-scope research/expert-tier concepts — see `math.cat.limits`, `math.nt.analytic-number-theory`, `math.fnal.banach-space` — this blueprint deliberately treats the classification scheme and its physical correspondence at an orientation level: correctly stating the discriminant test and applying it to the three named canonical equations, rather than attempting to derive general solution methods, characteristic curves, or well-posedness theory for each type.)*

**Physical correspondence, orientation level**: each classification corresponds to a genuinely different kind of physical phenomenon, not merely a different algebraic label. **Elliptic** equations (Laplace's equation) describe **equilibrium/steady-state** phenomena — e.g. the final, time-independent temperature distribution once heat has stopped changing, or an electrostatic potential — where there is no time variable at all, just a spatial balance condition. **Parabolic** equations (the heat equation) describe **diffusion/smoothing** phenomena — heat spreading out and sharp initial temperature differences smoothing over time; solutions become smoother as time progresses, and information can be considered to propagate at infinite speed (in the idealized model). **Hyperbolic** equations (the wave equation) describe **propagation** phenomena — a disturbance (like a plucked string's shape) travels through the medium at a finite, well-defined speed, and sharp features (like a corner in the initial shape) can persist rather than smoothing out.

## Component 4 — Worked Examples

**Example 1 (LO1 — PDE vs. ODE, extending the framework)**: The heat equation $u_t = u_{xx}$ describes the temperature $u(x,t)$ along a rod, depending on BOTH position $x$ and time $t$ — a genuine PDE, since it involves partial derivatives with respect to two different variables ($u_t$, the time-derivative holding $x$ fixed, and $u_{xx}$, the second space-derivative holding $t$ fixed). Contrast with the ODE analogue $y'(t)=ky(t)$ (exponential growth/decay, from `math.de.ode`), which involves only ONE independent variable $t$ and ordinary derivatives.

**Example 2 (LO2 — classifying the three canonical equations via the discriminant)**: (a) Laplace's equation $u_{xx}+u_{yy}=0$: $A=1,B=0,C=1$, discriminant $=0^2-4(1)(1)=-4<0$ — **elliptic**. (b) The heat equation, rewritten as $u_{xx}-u_t=0$ to match the general linear-second-order form (treating $t$ as the second variable, with only a first-order term in $t$): the second-order coefficients give $A=1$ (coefficient of $u_{xx}$), $B=0$, $C=0$ (there is no $u_{tt}$ term at all), so the discriminant $B^2-4AC=0$ — **parabolic**, matching the degenerate case exactly. (c) The wave equation $u_{tt}-u_{xx}=0$: treating this as $A=-1$ (coefficient of $u_{xx}$), $B=0$, $C=1$ (coefficient of $u_{tt}$), discriminant $=0^2-4(-1)(1)=4>0$ — **hyperbolic**.

**Example 3 (LO3 — physical correspondence, breaking MC-1)**: The heat equation (parabolic) models a rod with an initially sharp temperature spike at one point — as $t$ increases, the solution **smooths out**, the spike spreading into a bell-curve-like profile with no sharp features remaining. Contrast with the wave equation (hyperbolic) modeling a plucked guitar string with a sharp initial "kink" — the kink **persists** and travels along the string at a fixed wave speed, rather than smoothing away. Two equations, both PDEs, both second-order — yet one erases sharp features over time and the other preserves and propagates them, a direct physical consequence of their different classification, not a coincidence of the specific numbers involved.

## Component 5 — Teaching Actions

### Teaching Action A01 — PDE Extends ODE to Multiple Variables (Primitive P11: Representation Shift)

Picture a rod heating up: at each position $x$ and each time $t$, there's a temperature $u(x,t)$ — a function of TWO variables, unlike the single-variable functions from `math.de.ode`. State: "everything about 'an equation relating a function to its derivatives' carries over — the only change is that now there are multiple independent variables, so the derivatives must be PARTIAL, holding the other variables fixed." Work Example 1's direct PDE-vs-ODE contrast.

### Teaching Action A02 — Classifying via the Discriminant (Primitive P11: Representation Shift, orientation level)

State: "just like the discriminant $B^2-4AC$ of a quadratic (or a conic section) tells you whether you have an ellipse, parabola, or hyperbola, the SAME discriminant formula applied to a linear second-order PDE's leading coefficients tells you its TYPE." Work Example 2's three classifications directly, noting the exact numeric parallel to conic-section discriminants.

### Teaching Action A03 — Classification Reflects Genuine Physical Behavior (Primitive P06: Contrast Pair)

Present Example 3's direct contrast: the heat equation (parabolic) smoothing a sharp spike away, versus the wave equation (hyperbolic) preserving and propagating a sharp kink. State: "this isn't a coincidence of the specific equations chosen — it's a structural consequence of their classification. Parabolic equations diffuse and smooth; hyperbolic equations propagate and preserve; elliptic equations (like Laplace's) don't even have a time variable — they describe a state of equilibrium, already settled."

- **MC-1 hook**: ask "is the elliptic/parabolic/hyperbolic classification just an algebraic label with no connection to how the solutions actually behave?" — a "yes" answer reveals MC-1 (treating the classification as purely formal, missing the genuine correspondence to physical behavior).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Explain, in your own words, what makes an equation a PDE rather than an ODE, using the heat equation $u_t=u_{xx}$ as your example.
  2. Classify $u_{xx}-4u_{yy}=0$ using the discriminant test (identify $A$, $B$, $C$ first).
  3. Without doing any further calculation, state which of the three canonical named equations (Laplace's, heat, wave) you would expect to model each of these physical scenarios, and briefly justify: (a) the final resting shape of a stretched drumhead with no forces changing over time; (b) a scent diffusing through a still room over time; (c) a sound wave traveling down a hallway.
  4. Explain why the heat equation's solutions becoming smoother over time, while the wave equation's solutions can preserve sharp features, is connected to their different discriminant classifications rather than being an unrelated fact about each specific equation.
- **P76 (Transfer Probe, mode = independence)**: "A materials engineer is studying three different physical processes: (1) the steady-state electric potential inside a metal object with no time-dependence, (2) the way pollutant concentration spreads through groundwater over time, and (3) vibrations traveling through a metal beam struck at one end. (a) Match each process to one of the three PDE classifications (elliptic, parabolic, hyperbolic), justifying each match using the physical-behavior correspondence from Example 3. (b) For the groundwater pollutant scenario, explain what physical prediction the parabolic classification makes about how a sharply localized pollutant spill would evolve over time. (c) Explain why scenario (1), having no time variable at all, is a structurally different kind of problem from scenarios (2) and (3), which both describe how something evolves over time."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PDE-CLASSIFICATION-TREATED-AS-PURELY-FORMAL | Believing the elliptic/parabolic/hyperbolic classification is just an algebraic label with no connection to the actual physical behavior of solutions | Foundational |
| MC-2 | PDE-CONFUSED-WITH-MULTIVARIABLE-ODE-SYSTEM | Confusing a single PDE (one equation, partial derivatives, unknown function of several variables) with a SYSTEM of several ODEs (several equations, ordinary derivatives, several unknown functions each of one variable) | Foundational |
| MC-3 | DISCRIMINANT-COEFFICIENTS-MISIDENTIFIED | Misidentifying which terms of a given PDE correspond to $A$, $B$, $C$ in the discriminant formula, especially when the equation isn't already written in the exact canonical $Au_{xx}+Bu_{xy}+Cu_{yy}$ form | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "PDE-Classification-as-Formal-Label Assumption") → P41 (detect: ask whether the heat and wave equations, despite being classified differently, would actually behave differently if simulated) → P64 (conceptual shift: re-walk Example 3's direct contrast — smoothing vs. propagating — as concrete evidence the classification predicts real qualitative differences in solution behavior).
- **B02 (targets MC-2)**: P27 (name it: "PDE-Multivariable-ODE-System Confusion") → P41 (detect: ask a student to distinguish the heat equation $u_t=u_{xx}$ (one PDE, one unknown function of two variables) from a coupled pair of ODEs like $y_1'=y_2, y_2'=-y_1$ (two ODEs, two unknown functions each of one variable)) → P64 (conceptual shift: re-anchor on "a PDE has ONE unknown function taking MULTIPLE inputs; an ODE system has MULTIPLE unknown functions each taking ONE input — these are different structures entirely, even though both involve more than one derivative").
- **B03 (targets MC-3)**: P27 (name it: "Discriminant Coefficient Misidentification") → P41 (detect: give a PDE not already in the exact $Au_{xx}+Bu_{xy}+Cu_{yy}$ form, e.g. the wave equation $u_{tt}-u_{xx}=0$, and ask the student to identify $A$, $B$, $C$ directly) → P64 (conceptual shift: re-walk Example 2(c)'s explicit identification, showing how to match the given equation's second-order terms to the general form's coefficients term by term before applying the discriminant formula).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.ode` (the equation-relating-a-function-to-its-derivatives framework this concept extends to multiple variables), `math.calc.partial-derivatives` (the partial-derivative notation and holding-other-variables-fixed convention this concept's equations are built from).
- **Unlocks**: none listed in the KG.
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 8 with an expert/understand tag places this at a "3 TAs + gate" tier — A01 (PDE as an extension of ODE), A02 (discriminant classification), and A03 (physical correspondence) each target a distinct LO, appropriate for a large-scope concept whose orientation-level treatment (per Component 3's explicit precedent citation) keeps the teaching load matched to the "understand" bloom level rather than attempting full solution-technique coverage.
- LO2/LO3 and their worked examples deliberately use an **orientation-level treatment**, following this corpus's established precedent for large-scope research/expert-tier concepts (`math.cat.limits`, `math.nt.analytic-number-theory`, `math.fnal.banach-space`) — this blueprint does not derive general solution methods (separation of variables, characteristics, Green's functions) for any of the three PDE types, instead correctly stating the classification test and its physical significance, consistent with those prior blueprints' own stated scope decisions.
- The three canonical named equations (Laplace's, heat, wave) were chosen deliberately because they are the standard textbook representative of each class and because their discriminant computations are simple enough to verify by hand, keeping the arithmetic load minimal so the conceptual content (classification and physical meaning) remains the focus.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: heat-along-a-rod scenario before the formal definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
