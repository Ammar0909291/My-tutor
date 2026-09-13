# math.func.periodic-function — Periodic Functions (Fundamental Period, Period-vs-Frequency, Exact-Repetition Test)

## Identity
- **KG ID:** `math.func.periodic-function`
- **Domain:** math.func (Functions)
- **Requires:** `math.func.function-concept`
- **Unlocks:** none listed in the KG
- **Cross-links:** `math.trig.trig-functions` (confirmed genuinely unauthored — cross-link mode, see Blueprint References)
- **Difficulty:** proficient
- **Bloom level:** understand
- **Mastery threshold:** 0.80 (MAMR 4/5)
- **Estimated hours:** 3

## Learning Objective
By the end of this concept, the student can: (1) identify a function as periodic by verifying $f(x+T)=f(x)$ for ALL $x$ in the domain, where $T>0$ is a period, and find the FUNDAMENTAL period as the smallest such positive $T$; (2) read period from a graph by measuring the horizontal distance between two identical-phase points, never from the location of a single peak; (3) distinguish period $T$ from frequency $f=1/T$, and apply the $2\pi/|B|$ rule to sinusoidal functions of the form $A\sin(Bx-C)+D$; (4) determine whether a sum of periodic functions is itself periodic via the rational-ratio criterion.

## Core Understanding
`math.func.function-concept` supplies the general input-output rule. Periodicity is the special structural property that the rule's OUTPUT PATTERN repeats exactly at regular input intervals.

PERIODICITY IS AN EXACT, UNIVERSAL ALGEBRAIC CONDITION: $f$ is periodic with period $T>0$ iff $f(x+T)=f(x)$ for EVERY $x$ in the domain — not most $x$, not visually similar $x$, but every single one, verified algebraically. The FUNDAMENTAL period is the SMALLEST such positive $T$. $\sin(x)$ has fundamental period $2\pi$; a constant function has every $T>0$ as a period (no smallest one, so "fundamental period" is not meaningfully defined for it); $f(x)=x$ is not periodic at all, since $f(x+T)=x+T\ne x$ for any $T\ne0$.

PERIOD AND FREQUENCY ARE RECIPROCALS, WITH DIFFERENT UNITS AND MEANINGS: period $T$ is the distance (in $x$-units — seconds, radians) for ONE complete cycle. Frequency $f=1/T$ is how many complete cycles occur per unit of $x$ (cycles per second, i.e. Hz). A LONGER period means a LOWER frequency, and vice versa — they move in opposite directions as one changes.

FOR $A\sin(Bx-C)+D$, THE PERIOD IS $2\pi/|B|$ — AND ONLY $B$ AFFECTS IT: the amplitude $|A|$, phase shift $C/B$, and vertical shift $D$ change the wave's height, horizontal position, and baseline respectively — but NONE of them changes how long one cycle takes. Only $|B|$, the coefficient multiplying $x$ inside the argument, determines the period, via $T=2\pi/|B|$. A larger $|B|$ compresses the wave, giving a SHORTER period (faster oscillation).

PERIOD IS A DISTANCE BETWEEN IDENTICAL-PHASE POINTS, NOT A SINGLE LANDMARK: the period is measured as the horizontal distance from any point on the graph to the NEXT point with the same height AND the same slope direction (the same "phase") — commonly measured peak-to-peak, but that is a convenient CHOICE of identical-phase points, not the definition itself. The $x$-coordinate of a single peak is not a period; it is a location.

DAMPING AND IRRATIONAL PERIOD RATIOS DESTROY EXACT PERIODICITY: a function that merely LOOKS like it repeats (such as a damped sinusoid $e^{-x}\sin(x)$, whose amplitude decays) is NOT periodic, because the exact algebraic condition $f(x+T)=f(x)$ fails once the decay is accounted for. Similarly, $\sin(x)+\sin(\sqrt{2}x)$ is not periodic, because the ratio of the two periods, $2\pi/(2\pi/\sqrt2)=1/\sqrt2$, is irrational — the sum of periodic functions is periodic ONLY when the ratio of their individual periods is rational, with the combined period given by the LCM of the two.

## Mental Models
1. **Rung 1 — periodicity is $f(x+T)=f(x)$ for EVERY $x$, checked algebraically — a picture that "looks the same" is not proof.** Verify by substitution, especially when amplitude might be decaying.
2. **Rung 2 — period and frequency are reciprocals; a longer period always means a lower frequency.** Never report one when the other is asked for.
3. **Rung 3 — measure the period as a horizontal DISTANCE between two identical-phase points, never as the location of one landmark like a peak.** Peak-to-peak works because it happens to span exactly one cycle.

## Why Students Fail
Having encountered the everyday word "frequency" meaning "how often something happens" (many times per unit time), students can swap period and frequency in their reported answers — saying "the period is 2 Hz" or "the frequency is 3 seconds" — missing that mathematically frequency is $1/T$ and carries units of cycles-per-time, the reciprocal of the period's time-per-cycle. Having repeatedly seen sine and cosine graphs drawn with a clearly marked, "nice"-looking maximum, students can anchor on that visible landmark and report the maximum's $x$-coordinate as the period, missing that a period is a DISTANCE between two identical-phase points, and the peak's location is merely one convenient reference point, not the measurement itself. Finally, having a strong, compelling visual sense that a function "looks the same" over and over, students can accept nearly-repeating functions like a damped sinusoid as genuinely periodic, missing that periodicity is an EXACT algebraic equality that must hold for every single $x$, and any decay in amplitude — however slow — breaks that equality eventually.

## Misconceptions

### MC-1: PERIOD-VS-FREQUENCY
- **Birth type:** Type 3 (language contamination) — per this Blueprint's own classification, independently confirmed
- **Description:** Conflating period $T$ and frequency $f=1/T$ — saying "the period is 2 Hz" or "the frequency is 3 seconds," mixing units and meaning.
- **Why this birth type:** Language contamination: everyday English uses "frequency" to mean "how often" (a rate, many-per-time), which mathematically corresponds to $1/T$, not $T$ itself — students swap the two because the everyday word's intuitive meaning points toward the reciprocal quantity.
- **Detection probe:** "A signal has period $T=0.01$ seconds. What is its frequency, and in what units?" A student with MC-1 answers with the wrong quantity or units (e.g. "$0.01$ Hz").
- **Repair:** Period $T$ is the TIME for one complete cycle — always measured in seconds, radians, or another $x$-unit, "per cycle." Frequency is HOW MANY complete cycles occur in one unit of $x$ — measured in cycles per second (Hz). They are reciprocals: $f=1/T$, $T=1/f$. A pendulum with $T=2$ seconds per swing has frequency $0.5$ swings per second; a pendulum with $T=0.5$ seconds has frequency $2$ Hz — a LONGER period means a LOWER frequency.
- **Verification of death:** Given either a period or a frequency, the student correctly computes the other via the reciprocal relationship, with the correct units attached to each.

### MC-2: PERIOD-IS-THE-PEAK
- **Birth type:** Type 5 (instruction-induced) — per this Blueprint's own classification, independently confirmed
- **Description:** Identifying the period as the $x$-coordinate of the first maximum, rather than as the horizontal distance to the next identical-phase point.
- **Why this birth type:** Instruction-induced: graphs are typically drawn with the first maximum at a visually "nice" $x$-value, and students anchor on that visible landmark's coordinate rather than performing the actual measurement — the horizontal distance between two matching points.
- **Detection probe:** "For $\sin(x)$, the first peak occurs at $x=\pi/2$. Is $\pi/2$ the period?" A student with MC-2 answers "yes."
- **Repair:** A period is a DISTANCE — measured from any point to the next point with the SAME height AND same phase (direction of travel). For $\sin(x)$: the first peak is at $x=\pi/2$; the SECOND peak is at $x=5\pi/2$. The DISTANCE between them, $5\pi/2-\pi/2=2\pi$, is the period — not the coordinate $\pi/2$ itself, which is merely a location.
- **Verification of death:** Given a graph, the student measures the period as the horizontal distance between two identical-phase points (e.g. two consecutive peaks, or two consecutive same-direction zero-crossings), never reporting a single point's coordinate.

### MC-3: ALMOST-PERIODIC-IS-PERIODIC
- **Birth type:** Type 1 (overgeneralization) — per this Blueprint's own classification, independently confirmed
- **Description:** Accepting "nearly repeating" functions (like a damped sinusoid) as periodic because the shape "looks the same," without verifying the exact algebraic condition $f(x+T)=f(x)$ for all $x$.
- **Why this birth type:** Overgeneralization: visual similarity across successive cycles is compelling and easy to confirm at a glance, so students accept it as sufficient evidence, especially when amplitude decays slowly enough that early cycles genuinely do look nearly identical.
- **Detection probe:** "Is $f(x)=e^{-x}\sin(x)$ periodic?" A student with MC-3 answers "yes" based on the repeating oscillatory shape.
- **Repair:** $f(x)=e^{-x}\sin(x)$: at $x=0$, $f(0)=0$; at $x=2\pi$, $f(2\pi)=e^{-2\pi}\sin(2\pi)=0$ — looks consistent so far. But at $x=1$: $f(1)=e^{-1}\sin(1)\approx0.309$; at $x=1+2\pi$: $f(1+2\pi)=e^{-(1+2\pi)}\sin(1)\approx0.00061$ — NOT equal. The amplitude decay ($e^{-x}$) means the function is NOT periodic, despite the oscillatory shape repeating visually.
- **Verification of death:** Given a function whose shape appears to repeat, the student checks the exact algebraic condition at a specific non-obvious point (not just the first apparent cycle) before concluding periodicity, correctly rejecting decaying-envelope functions.

## Analogies
1. **The odometer-versus-speedometer analogy (targets MC-1).** The odometer's cycle length (how far the display travels before resetting) is like the period; how often it resets per hour is like the frequency — a longer reset distance (bigger period) means fewer resets per hour (lower frequency). They measure opposite-feeling things about the same repeating process.
2. **The relay-race-baton-handoff analogy (targets MC-2).** The finish line of the FIRST lap is a location (like a peak's $x$-coordinate); the LENGTH of one full lap (start to the next identical start) is the period. Reporting where the first lap ends isn't the same as reporting how long a lap is.
3. **The fading-echo analogy (targets MC-3).** An echo that repeats the same word but gets quieter each time is not a perfectly periodic sound — eventually the diminishing volume makes each repetition genuinely different from the last, even though early repetitions sound almost identical. True periodicity requires the repetitions to be EXACTLY the same, forever.

## Demonstrations
### Demonstration 1 — the algebraic test and fundamental period (mirrors Blueprint A01)
$\sin(x+2\pi)=\sin(x)$ for every $x$, and $2\pi$ is the smallest such positive value — the fundamental period of $\sin(x)$. $\tan(x+\pi)=\tan(x)$, with fundamental period $\pi$ (half of sine's, since tangent's own structure restores after a half-revolution). $f(x)=x$: $f(x+T)=x+T\ne x$ for any $T\ne0$ — not periodic at all.

### Demonstration 2 — the $2\pi/|B|$ rule and verification (mirrors Blueprint A02)
For $f(x)=\sin(2x)$: applying the formula, period $=2\pi/|2|=\pi$. Verifying algebraically: $f(x+\pi)=\sin(2(x+\pi))=\sin(2x+2\pi)=\sin(2x)=f(x)$ ✓. Checking that $\pi$ is genuinely the SMALLEST such value: testing $T=\pi/2$ fails ($\sin(2\cdot\pi/4)=\sin(\pi/2)=1\ne\sin(0)=0$), confirming $\pi$ is fundamental.

### Demonstration 3 — damping destroys periodicity; irrational ratios prevent it in sums (mirrors Blueprint A03)
$f(x)=e^{-x}\sin(x)$: checking $x=1$ versus $x=1+2\pi$ gives $f(1)\approx0.309$ but $f(1+2\pi)\approx0.00061$ — NOT equal, so NOT periodic, despite the oscillatory appearance. $f(x)=\sin(x)+\sin(\sqrt2\,x)$: the ratio of the individual periods, $2\pi/(2\pi/\sqrt2)=1/\sqrt2$, is irrational, so the sum never exactly repeats — NOT periodic. Contrast: $\sin(x)+\sin(2x)$ has period ratio $2\pi/\pi=2$ (rational), giving a combined fundamental period of $\text{LCM}(2\pi,\pi)=2\pi$.

## Discovery Questions
1. "Is $\pi/2$ (the location of $\sin(x)$'s first peak) the period of $\sin(x)$, or is the period something else entirely?"
2. "A signal has period $T=0.01$ seconds. What is its frequency? Are period and frequency measuring the same thing, or opposite things?"
3. "Does $f(x)=e^{-x}\sin(x)$ genuinely repeat forever, or does it just look like it does for a little while? Test a specific value far from the start."

## Teaching Sequence
Best taught by the **Concrete CPA entry stage — physical pendulum cycles, clock hands, seasonal temperature graphs, with one complete cycle explicitly identified before the abstract algebraic condition**, matching the Blueprint's own CPA justification.
1. Work Demonstration 1's algebraic test and fundamental-period concept across several functions, posing Discovery Question 1 before confirming the period is a distance, not a landmark's location.
2. Work Demonstration 2's $2\pi/|B|$ rule and its algebraic verification, posing Discovery Question 2 before confirming period and frequency are reciprocals, not the same measurement.
3. Work Demonstration 3's damping and irrational-ratio counterexamples, posing Discovery Question 3 before confirming exact algebraic equality — not visual similarity — decides periodicity.
4. Assess with the P77 problem set and the trigonometric-period transfer probe (P76, cross-link mode against `math.trig.trig-functions`).

## Tutor Actions
1. **On any periodicity claim:** require the student to verify $f(x+T)=f(x)$ algebraically at a specific, non-trivial value of $x$, never accepting visual similarity as sufficient.
2. **On any period-measurement task:** require the student to identify TWO identical-phase points and measure the distance between them, never report a single point's coordinate.
3. **On any period/frequency question:** require the student to state which quantity is being asked for and apply the reciprocal relationship explicitly, with correct units.

## Voice Teaching Notes
1. **Register:** proficient/understand — this concept assumes fluency with the general function concept and develops the periodicity classification skill concretely.
2. **Load-bearing sentence, spoken slowly:** "A period is a distance between two matching points — never just where one peak happens to sit."
3. **Wait time:** pause after Discovery Question 3, letting the student genuinely compute $f$ at a far value before revealing the damped function is not periodic.

## Assessment Signals
1. **Gate concept:** correctly identifies whether a given function is periodic and, if so, finds its fundamental period.
2. **Period/frequency fluency:** correctly converts between period and frequency with correct units, in either direction.
3. **Measurement discipline:** correctly measures the period as a horizontal distance between two identical-phase points, never citing a single landmark's coordinate.
4. **Exact-versus-visual discrimination:** correctly rejects a damped or irrational-ratio function as non-periodic despite superficial visual repetition.
5. **Transfer:** proves the fundamental periods of tangent and sine (P76), applies the LCM rule for sums, and connects sine/cosine's phase relationship to their shared period.

## Tutor Recovery Strategy
If the student swaps period and frequency, require them to state units explicitly and apply the reciprocal on several fresh values until the conversion is automatic. If the student reports a peak's coordinate as the period, require them to identify a SECOND identical-phase point and compute the distance on fresh graphs until measurement (not location) becomes the default response. If the student accepts a decaying or irrational-ratio function as periodic, require them to test a far-away specific value algebraically on fresh examples until the exact-equality discipline is automatic.

## Memory Hooks
1. "Period is a distance between two matching points — not where one peak happens to be."
2. "Period and frequency are opposites — longer period, lower frequency, every time."
3. "If it decays or the ratio's irrational, it's not truly periodic — check a far-away point to be sure."

## Transfer Connections
- **`math.func.function-concept`:** the general rule this concept adds a structural repeating-pattern property to.
- **`math.trig.trig-functions`** (cross-link, currently unauthored): the canonical periodic family — sine and cosine with period $2\pi$, tangent with period $\pi$ — where the fundamental-period-proof techniques developed here apply directly.
- **`math.func.transformations-functions`:** the sinusoidal form $A\sin(B(x-C))+D$ is a direct instance of that concept's transformation vocabulary, with the period specifically controlled by $B$ via $2\pi/|B|$.

## Cross-Subject Connections
- **Physics (oscillations and waves):** pendulum motion, sound waves, and AC electrical signals are all modeled by periodic functions, with period and frequency being the two primary descriptors of any oscillation.
- **Music theory (pitch and frequency):** a musical note's pitch corresponds directly to its frequency (e.g. 440 Hz for concert A), and its period is the reciprocal — the exact period/frequency relationship this concept establishes.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.func.periodic-function.md` — reused by reference throughout (Learning Objectives, worked examples in A01–A03, misconception inventory MC-1–MC-3, transfer probe P76 on trigonometric periods, mode = cross-link per that Blueprint's own Component 8). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. All 3 misconceptions' birth types adopted directly from the Blueprint's own classification (MC-1 Type 3, MC-2 Type 5, MC-3 Type 1), independently confirmed rather than re-derived.
- Cross-link: `math.trig.trig-functions` re-verified genuinely unauthored (Blueprint exists, no Educational Brain entry, `math.trig` domain 0/25 unstarted) — confirmed matching the Blueprint's own cross-link declaration.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly (unlocks empty, cross_links `math.trig.trig-functions`, both confirmed against the live KG).

## Version History
- **Batch 31** (2026-09-12): initial authoring, part 4 of 4 this batch (with `math.func.zero-of-function`, `math.func.even-odd-functions`, `math.func.transformations-functions`), continuing `math.func` as a standalone domain campaign. Blueprint reused by reference; 3 misconceptions adopted at the Blueprint's own classified birth types (MC-1 Type 3, MC-2 Type 5, MC-3 Type 1).
