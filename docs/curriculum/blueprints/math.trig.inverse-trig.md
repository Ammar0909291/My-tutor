# Teaching Blueprint: Inverse Trigonometric Functions (`math.trig.inverse-trig`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.trig.inverse-trig` |
| name | Inverse Trigonometric Functions |
| domain | Trigonometry |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.trig.trig-functions`, `math.func.inverse-functions` |
| unlocks | `math.trig.trig-equations`, `math.calc.derivative-inverse-trig` |
| cross_links | `math.calc.derivative-inverse-trig` |
| CPA_entry_stage | C (Concrete) — showing sin fails injectivity on its full domain, then restricting to a specific interval, before the general arcsin/arccos/arctan definitions are stated abstractly |
| description (KG) | The functions arcsin, arccos, arctan (restrictions of trig functions to make them invertible); their domains and ranges and the identities connecting them. |

## Component 1 — Learning Objectives

- LO1: Recognize that $\sin(x)$, $\cos(x)$, $\tan(x)$ are NOT injective on their full natural domains (periodicity means each output value repeats infinitely often, per `math.func.injectivity`'s own failure criterion), and that $\arcsin$, $\arccos$, $\arctan$ are defined by FIRST restricting each function's domain to a specific interval where it genuinely IS bijective — directly the trigonometric instance of `math.func.inverse-functions`' own domain-restriction requirement.
- LO2: State the specific restricted domains and ranges: $\arcsin$ (domain $[-1,1]$, range $[-\pi/2,\pi/2]$, restricting $\sin$ there), $\arccos$ (domain $[-1,1]$, range $[0,\pi]$, restricting $\cos$ there), $\arctan$ (domain $\mathbb{R}$, range $(-\pi/2,\pi/2)$, restricting $\tan$ there) — and correctly evaluate each at standard values, always returning an answer strictly within the stated restricted range.
- LO3: State the two "undoing" identities and their crucial ASYMMETRY: $\sin(\arcsin(x))=x$ holds for EVERY $x\in[-1,1]$ (arcsin's whole domain), but $\arcsin(\sin(x))=x$ holds ONLY when $x\in[-\pi/2,\pi/2]$ — a genuinely more restricted condition — directly refuting the assumption that both composition directions "simply cancel" with equal reliability.

## Component 2 — Prerequisite Check

Assumes mastery of `math.trig.trig-functions` ($\sin,\cos,\tan$ defined for all real $x$; periodicity, $\sin(x+2\pi)=\sin(x)$; domain and range of each) and `math.func.inverse-functions` (a function must be bijective — restricting the domain if necessary — before a genuine inverse function exists; the general algebraic verification process for an inverse).

## Component 3 — Core Explanation

**Trig functions fail injectivity on their full domains — restriction is required first**: $\sin(x)$ is NOT injective on all of $\mathbb{R}$ — $\sin(0)=\sin(\pi)=\sin(2\pi)=\cdots=0$, infinitely many different inputs sharing the same output, directly failing `math.func.injectivity`'s criterion. The SAME is true of $\cos$ and $\tan$. So none of these functions has a genuine inverse function on their full natural domain — exactly `math.func.inverse-functions`' own gatekeeping requirement (recall that concept's $x^2$ example: restrict the domain until bijectivity genuinely holds).

**The specific restrictions, and their domains/ranges**: restricting $\sin$ to $[-\pi/2,\pi/2]$ makes it genuinely bijective (strictly increasing from $-1$ to $1$) — this restricted sine's inverse is $\arcsin$, with domain $[-1,1]$ and range $[-\pi/2,\pi/2]$. Restricting $\cos$ to $[0,\pi]$ makes it genuinely bijective (strictly decreasing from $1$ to $-1$) — this gives $\arccos$, domain $[-1,1]$, range $[0,\pi]$. Restricting $\tan$ to $(-\pi/2,\pi/2)$ makes it genuinely bijective (strictly increasing across all reals) — this gives $\arctan$, domain $\mathbb{R}$, range $(-\pi/2,\pi/2)$. Every output of $\arcsin$, $\arccos$, or $\arctan$ is ALWAYS confined to its stated restricted range — never outside it, regardless of what input produced it.

**The two identities are NOT equally reliable — a genuine asymmetry**: $\sin(\arcsin(x))=x$ holds for EVERY $x$ in $\arcsin$'s domain $[-1,1]$, with no further restriction, since $\arcsin(x)$'s OUTPUT is always confined to $[-\pi/2,\pi/2]$, and evaluating $\sin$ directly there recovers $x$ cleanly. But $\arcsin(\sin(x))=x$ holds ONLY when $x$ ITSELF is already within $[-\pi/2,\pi/2]$ — for $x$ outside that range, $\sin(x)$ still produces some value in $[-1,1]$, but $\arcsin$ of that value returns whatever angle in $[-\pi/2,\pi/2]$ shares that same sine — which is generally NOT the original $x$ at all.

## Component 4 — Worked Examples

**Example 1 (LO1 — sin fails injectivity, restriction creates arcsin, breaking MC-1)**: $\sin(0)=0$ and $\sin(\pi)=0$ — two different inputs, $0\ne\pi$, sharing the identical output — confirming $\sin$ is NOT injective on $\mathbb{R}$, so no genuine inverse function exists there. Restricting $\sin$'s domain to $[-\pi/2,\pi/2]$: here $\sin$ is strictly increasing (injective) and its range covers exactly $[-1,1]$ (surjective onto that target) — genuinely bijective. $\arcsin$ is defined as this restricted sine's inverse: domain $[-1,1]$, range $[-\pi/2,\pi/2]$.

**Example 2 (LO2 — evaluating within the restricted range, breaking a wrong-branch tendency)**: $\arcsin(\sin(\pi/6))$: $\sin(\pi/6)=1/2$, and $\arcsin(1/2)=\pi/6$ (since $\pi/6\in[-\pi/2,\pi/2]$) — matches directly. Now $\arcsin(\sin(5\pi/6))$: $\sin(5\pi/6)=1/2$ ALSO (same value, since $5\pi/6$ is in the second quadrant where sine is still positive and equals $\sin(\pi-5\pi/6)=\sin(\pi/6)=1/2$). So $\arcsin(\sin(5\pi/6)) = \arcsin(1/2) = \pi/6$ — **NOT** $5\pi/6$! Even though the input was $5\pi/6$, the answer must lie in $\arcsin$'s range $[-\pi/2,\pi/2]$, and $5\pi/6$ is outside that range entirely.

**Example 3 (LO3 — the identities' asymmetry, breaking MC-2 and MC-3)**: Direction 1: $\sin(\arcsin(0.5))$: $\arcsin(0.5)=\pi/6$ (within range), then $\sin(\pi/6)=0.5$ ✓ — recovers $x=0.5$ exactly. This direction works for EVERY $x\in[-1,1]$, since $\arcsin$'s output is guaranteed to already be in $[-\pi/2,\pi/2]$. Direction 2 (from Example 2): $\arcsin(\sin(5\pi/6))=\pi/6\ne5\pi/6$ — this direction FAILS precisely because $5\pi/6\notin[-\pi/2,\pi/2]$. The two identities are genuinely NOT equally reliable: $\sin(\arcsin(x))=x$ holds unconditionally on $\arcsin$'s whole domain, while $\arcsin(\sin(x))=x$ holds only on the much narrower set $[-\pi/2,\pi/2]$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Restriction Is Required Before Inversion (Primitive P11: Representation Shift)

State: "$\sin$, like $x^2$ from `math.func.inverse-functions`, fails to be injective on its full domain — infinitely many inputs share each output. Restricting to $[-\pi/2,\pi/2]$ is exactly the fix that concept's own domain-restriction requirement calls for." Work Example 1's full injectivity-failure-then-restriction argument.

- **MC-1 hook**: ask "does sin(x) have a straightforward inverse function on all of ℝ?" — a "yes" answer reveals MC-1 (missing that periodicity makes sin fail injectivity there, requiring domain restriction first).

### Teaching Action A02 — The Output Is Always Confined to the Restricted Range (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $\arcsin(\sin(5\pi/6))=\pi/6$, not $5\pi/6$, because $\arcsin$'s answer must always lie in $[-\pi/2,\pi/2]$. State: "$\arcsin$ never 'remembers' which specific angle you started with outside its range — it only ever reports the ONE angle inside $[-\pi/2,\pi/2]$ sharing that same sine value."

- **MC-2 hook**: ask "does arcsin(sin(x)) always equal x, for any real number x?" — a "yes" answer reveals MC-2 (missing that this identity only holds when x is already within [-π/2,π/2]).

### Teaching Action A03 — The Two Identities Are Not Equally Reliable (Primitive P06: Contrast Pair)

Contrast Example 3's two directions: $\sin(\arcsin(0.5))=0.5$ (always works, for every $x\in[-1,1]$) versus $\arcsin(\sin(5\pi/6))\ne5\pi/6$ (fails, since $5\pi/6$ is outside $\arcsin$'s range). State: "these two identities look like mirror images of each other, but they are NOT equally safe to use — one holds unconditionally on the whole domain, the other only within the restricted range."

- **MC-3 hook**: ask "are sin(arcsin(x))=x and arcsin(sin(x))=x equally reliable, holding under the same conditions?" — a "yes" answer reveals MC-3 (missing the genuine asymmetry between the two composition directions).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Explain why $\cos(x)$ is not injective on all of $\mathbb{R}$, and state the domain restriction used to define $\arccos$.
  2. Compute $\arccos(\cos(2\pi/3))$ and $\arccos(\cos(-\pi/3))$, being careful about which lies within $\arccos$'s range $[0,\pi]$.
  3. Compute $\tan(\arctan(1))$ and explain why this direction always works for any real number.
  4. Compute $\arctan(\tan(3\pi/4))$, and explain why the answer is NOT $3\pi/4$, referencing $\arctan$'s range $(-\pi/2,\pi/2)$.
- **P76 (Transfer Probe, mode = independence)**: "A surveyor measures the angle of elevation to a tower's top using $\theta=\arctan(\text{height}/\text{distance})$. (a) Explain why using $\arctan$ here is appropriate — i.e., why the surveyor can trust the result is a genuine, well-defined angle, referencing the domain-restriction reasoning from this lesson. (b) A second surveyor, working with a different tower, computes $\tan(\theta)=1$ for some angle $\theta$ measured directly in the field as $\theta=3\pi/4$ (an obtuse angle, from a different geometric setup). Explain why computing $\arctan(\tan(3\pi/4))$ would NOT return $3\pi/4$, and what the surveyor should actually expect this computation to return instead. (c) Explain why, by contrast, computing $\tan(\arctan(1))$ is always completely safe and reliably returns exactly $1$, no matter the context."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | TRIG-FUNCTIONS-ASSUMED-INVERTIBLE-ON-FULL-DOMAIN | Believing sin, cos, or tan have straightforward inverse functions on their full natural domains, missing that periodicity makes them fail injectivity there, requiring domain restriction first | Foundational |
| MC-2 | INVERSE-TRIG-COMPOSITION-ASSUMED-ALWAYS-RETURNS-ORIGINAL-INPUT | Believing arcsin(sin(x)) (or the arccos/arctan analogs) always equals x for any real x, missing that this holds only when x is already within the restricted range | Foundational |
| MC-3 | THE-TWO-COMPOSITION-DIRECTIONS-ASSUMED-EQUALLY-RELIABLE | Believing sin(arcsin(x))=x and arcsin(sin(x))=x are equally reliable identities holding under the same conditions, missing the genuine asymmetry between them | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Trig Functions Assumed Invertible on Full Domain") → P41 (detect: ask a student whether sin has a genuine inverse function on all of ℝ, and check for a "yes") → P64 (conceptual shift: re-walk Example 1's injectivity-failure demonstration ($\sin(0)=\sin(\pi)=0$), re-anchoring on "periodicity guarantees infinitely many repeated outputs — restriction is required first, exactly like `math.func.inverse-functions`' own x² example").
- **B02 (targets MC-2)**: P27 (name it: "Inverse Trig Composition Assumed to Always Return Original Input") → P41 (detect: ask a student to evaluate $\arcsin(\sin(x))$ for an $x$ outside $[-\pi/2,\pi/2]$, and check whether they simply answer $x$) → P64 (conceptual shift: re-walk Example 2's $\arcsin(\sin(5\pi/6))=\pi/6$ computation, re-anchoring on "the answer must always land inside the restricted range — it can never simply be the original input if that input falls outside it").
- **B03 (targets MC-3)**: P27 (name it: "The Two Composition Directions Assumed Equally Reliable") → P41 (detect: ask a student whether both composition directions hold under the same conditions, and check for a "yes") → P64 (conceptual shift: re-walk Example 3's direct contrast, re-anchoring on "$\sin(\arcsin(x))=x$ is unconditional on arcsin's whole domain; $\arcsin(\sin(x))=x$ needs x itself already inside the restricted range — genuinely different reliability").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.trig.trig-functions` (sin, cos, tan's definitions, periodicity, and domains/ranges this concept's restrictions are built from), `math.func.inverse-functions` (the general domain-restriction-then-invert procedure this concept applies specifically to trigonometric functions).
- **Unlocks**: `math.trig.trig-equations` (solving trig equations often requires inverse trig functions to extract a specific solution angle), `math.calc.derivative-inverse-trig` (differentiates arcsin, arccos, arctan via implicit differentiation of the original trig equation).
- **Cross-link**: KG lists `math.calc.derivative-inverse-trig` as a cross-link — **not yet authored** (checked via `ls docs/curriculum/blueprints/` before setting P76_mode). $P76_{mode}=$ **independence**; a future revision may add a genuine cross-link transfer probe into differentiating these inverse functions once that entry exists.

## Component 8 — Teaching Notes

- estimated_hours = 8 with a proficient/understand tag places this among the corpus's larger "3 TAs + gate" concepts — scope was managed by giving full domain/range statements for ALL THREE inverse functions (arcsin, arccos, arctan) in Component 3 and the gate's P77 problems, while concentrating the deep worked-example computation (Examples 1-3) on $\arcsin$ specifically, since the underlying restriction-and-asymmetry reasoning is identical for $\arccos$ and $\arctan$ and does not need to be independently re-derived three times.
- Example 2's $5\pi/6$ was deliberately chosen because it shares $\sin(5\pi/6)=\sin(\pi/6)=1/2$ with an angle genuinely inside $\arcsin$'s range — making the "wrong answer" ($5\pi/6$) and the "right answer" ($\pi/6$) both concrete, nameable angles rather than an abstract assertion that "some angle outside the range" would misbehave.
- This concept directly reuses `math.func.injectivity`'s own periodic-repetition framing and `math.func.inverse-functions`' own domain-restriction procedure by name throughout, rather than re-deriving the "why domain restriction is needed" argument from scratch — the trigonometric case is presented explicitly as an INSTANCE of that general machinery, not a new independent idea.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.calc.derivative-inverse-trig unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: sin's injectivity failure and restriction shown directly before the general definitions) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
